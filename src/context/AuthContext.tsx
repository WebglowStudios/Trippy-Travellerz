"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      if (res.status === "success" && res.data) {
        setUser(res.data.user || res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === "success" && res.data) {
        setUser(res.data.user || res.data);
        return { success: true };
      }
      return { success: false, error: res.message || "Login failed" };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
  }) => {
    try {
      const res = await api.post("/auth/register", data);
      if (res.status === "success" && res.data) {
        setUser(res.data.user || res.data);
        return { success: true };
      }
      return {
        success: false,
        error: res.message || res.errors?.map((e: { field: string; message: string }) => e.message).join(", ") || "Registration failed",
      };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
