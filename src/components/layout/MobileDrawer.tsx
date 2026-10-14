"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Automatically close mobile menu on route change
  useEffect(() => {
    onClose();
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "TT"
    : "TT";

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        className={`nav-backdrop ${isOpen ? "open" : ""}`}
        id="nav-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Drawer Navigation */}
      <div className={`nav-drawer ${isOpen ? "open" : ""}`} id="nav-drawer">
        <div className="nav-drawer-header">
          <div className="nav-drawer-brand">
            <img src="/icon.png" alt="Trippy Travellers" className="nav-drawer-logo" />
            <span className="nav-drawer-title">
              Trippy <span className="highlight">Travellers</span>
            </span>
          </div>
          <button className="nav-drawer-close" onClick={onClose} aria-label="Close menu">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* User Card inside Drawer if logged in */}
        {user ? (
          <div
            style={{
              padding: "16px 20px",
              background: "var(--bg-cream)",
              borderBottom: "1px solid var(--border-warm)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--brand-brown)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ fontSize: 14.5, color: "var(--brand-brown)", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {user.firstName} {user.lastName}
              </strong>
              <span style={{ fontSize: 12, color: "var(--text-muted)", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {user.email}
              </span>
            </div>
            <div style={{ background: "#FEF3C7", padding: "3px 8px", borderRadius: 999, fontSize: 11, color: "#92400E", fontWeight: 700 }}>
              ★ VIP
            </div>
          </div>
        ) : (
          <div style={{ padding: "14px 20px", background: "var(--bg-cream)", borderBottom: "1px solid var(--border-warm)", display: "flex", gap: 10 }}>
            <Link
              href="/login"
              onClick={onClose}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 12px",
                borderRadius: 999,
                background: "var(--brand-brown)",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={onClose}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 12px",
                borderRadius: 999,
                border: "1.5px solid var(--border-warm)",
                background: "#FFFFFF",
                color: "var(--brand-brown)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Join Club
            </Link>
          </div>
        )}

        <div className="nav-drawer-links" style={{ overflowY: "auto" }}>
          {/* Main Explorations */}
          <Link href="/destinations" onClick={onClose}>
            <span className="drawer-icon">🗺️</span>Destinations
          </Link>
          <Link href="/packages" onClick={onClose}>
            <span className="drawer-icon">✈️</span>All Tour Packages
          </Link>
          <Link href="/visa-free" onClick={onClose}>
            <span className="drawer-icon">🛂</span>Visa-Free Escapes
          </Link>
          <Link href="/articles" onClick={onClose}>
            <span className="drawer-icon">📰</span>Travel Journal
          </Link>

          {/* User Specific Links */}
          {user && (
            <>
              <div style={{ padding: "12px 20px 4px", fontSize: 11, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.8 }}>
                Traveler Cockpit
              </div>
              <Link href="/dashboard?tab=overview" onClick={onClose}>
                <span className="drawer-icon">📊</span>Dashboard Overview
              </Link>
              <Link href="/dashboard?tab=bookings" onClick={onClose}>
                <span className="drawer-icon">🧳</span>My Booked Trips
              </Link>
              <Link href="/dashboard?tab=wishlist" onClick={onClose}>
                <span className="drawer-icon">❤️</span>Saved Wishlist
              </Link>
              <Link href="/dashboard?tab=reviews" onClick={onClose}>
                <span className="drawer-icon">⭐</span>My Reviews
              </Link>
              <Link href="/dashboard?tab=profile" onClick={onClose}>
                <span className="drawer-icon">⚙️</span>Profile & Security
              </Link>
            </>
          )}

          {/* Company Links */}
          <div style={{ padding: "12px 20px 4px", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.8 }}>
            About & Care
          </div>
          <Link href="/about" onClick={onClose}>
            <span className="drawer-icon">🌿</span>Why Trippy Travellers
          </Link>
          <Link href="/faq" onClick={onClose}>
            <span className="drawer-icon">❓</span>Frequently Asked Questions
          </Link>
          <Link href="/contact" onClick={onClose}>
            <span className="drawer-icon">📞</span>Concierge Contact
          </Link>

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 20px",
                width: "100%",
                background: "transparent",
                border: "none",
                color: "#DC2626",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span className="drawer-icon">🚪</span>Sign Out
            </button>
          )}
        </div>

        <div className="nav-drawer-cta">
          <Link href="/packages" onClick={onClose} className="btn-drawer-plan">
            Plan Your Journey
          </Link>
          <div className="drawer-contact-mini">
            <span>+91 98765 43210</span> • <span>concierge@trippytravelerz.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
