"use client";

import { use, useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface VerifyEmailPageProps {
  params: Promise<{ token: string }>;
}

function VerifyEmailInner({ params }: VerifyEmailPageProps) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function verify() {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        if (res.status === "success") {
          setStatus("success");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2500);
        } else {
          setStatus("error");
          setErrorMessage(res.message || "Invalid or expired verification link.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Network error verifying your account. Please try again.");
      }
    }
    verify();
  }, [token, router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #F5ECE0 0%, var(--bg-cream) 100%)",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          background: "#FFFFFF",
          borderRadius: 24,
          border: "1.5px solid var(--border-warm)",
          padding: "48px 36px",
          boxShadow: "0 12px 36px rgba(60, 40, 20, 0.06)",
        }}
      >
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 28 }}>
          <img src="/logo.png" alt="Trippy Travellers" style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--border-warm)" }} />
          <span className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>
            Trippy <span style={{ color: "var(--brand-brown)" }}>Travellers</span>
          </span>
        </Link>

        {status === "loading" && (
          <div>
            <div
              style={{
                width: 50,
                height: 50,
                border: "3px solid #DFCEB5",
                borderTopColor: "var(--brand-brown)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 20px",
              }}
            />
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 8px" }}>
              Verifying Your Email...
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-body)", margin: 0 }}>
              Connecting with security desk to activate your traveler profile.
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: "#E8F5E9",
                border: "2px solid #86EFAC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 38, color: "#15803D" }}>
                verified
              </span>
            </div>
            <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
              Passport to Adventure
            </span>
            <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 10px" }}>
              Email Confirmed!
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6, margin: "0 0 24px" }}>
              Your email has been authenticated. Redirecting you to your Traveler Cockpit...
            </p>
            <Link
              href="/dashboard"
              className="btn-auth-submit"
              style={{ display: "inline-block", textDecoration: "none", padding: "12px 32px" }}
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {status === "error" && (
          <div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: "#FFF4ED",
                border: "2px solid #FCD9C6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 38, color: "var(--brand-ochre)" }}>
                link_off
              </span>
            </div>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 10px" }}>
              Verification Link Invalid
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, margin: "0 0 24px" }}>
              {errorMessage}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link
                href="/login"
                className="btn-auth-submit"
                style={{ display: "inline-block", textDecoration: "none", padding: "11px 24px" }}
              >
                Sign In
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  padding: "11px 24px",
                  background: "#FFFFFF",
                  border: "1.5px solid var(--border-warm)",
                  borderRadius: 9999,
                  color: "var(--brand-brown)",
                  fontWeight: 700,
                  fontSize: 13.5,
                }}
              >
                Help Desk
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage(props: VerifyEmailPageProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-cream)" }} />}>
      <VerifyEmailInner {...props} />
    </Suspense>
  );
}
