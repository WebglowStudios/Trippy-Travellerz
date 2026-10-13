"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileDrawer from "./MobileDrawer";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine if current route should always have solid navbar
  const alwaysSolidRoutes = [
    "/packages",
    "/destinations",
    "/itinerary",
    "/dashboard",
    "/book",
    "/pay-installment",
    "/articles",
    "/about",
    "/contact",
    "/faq",
    "/careers",
    "/terms",
    "/privacy",
    "/refund",
    "/visa-free",
  ];
  const isAlwaysSolid = alwaysSolidRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (isAlwaysSolid) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAlwaysSolid, pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Close dropdown on pathname change
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.push("/");
  };

  const focusSearch = () => {
    const input = document.getElementById("destSearchInput");
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      router.push("/destinations");
    }
  };

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "TT"
    : "TT";

  return (
    <>
      <header
        className={`site-header ${scrolled ? "scrolled" : ""}`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "all 0.28s cubic-bezier(0.25, 1, 0.5, 1)",
          background: scrolled ? "rgba(250, 247, 242, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-warm)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 20px -2px rgba(60, 40, 20, 0.08)" : "none",
          padding: scrolled ? "10px 0" : "14px 0",
        }}
      >
        <div className="container nav-inner">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo">
            <img src="/logo.png" alt="Trippy Travellers" className="brand-logo-img" />
            <span className="brand-logo-text">
              Trippy <span className="highlight">Travellers</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <ul className="nav-links-list">
            <li>
              <Link href="/destinations" className="nav-link-item">
                Destinations
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="/packages" className="nav-link-item">
                Packages
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="/visa-free" className="nav-link-item">
                Visa-Free
              </Link>
            </li>
            <li>
              <Link href="/articles" className="nav-link-item">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link-item">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link-item">
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Nav Actions */}
          <div className="nav-right-actions">
            {/* Search Button */}
            <button
              className="nav-icon-btn"
              aria-label="Search"
              onClick={focusSearch}
              type="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/dashboard?tab=wishlist"
              className="nav-icon-btn"
              aria-label="Wishlist"
              title="Saved Escapes"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            {/* Account Trigger & Dropdown */}
            {user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "5px 12px 5px 6px",
                    background: "rgba(88, 55, 30, 0.06)",
                    border: "1px solid var(--border-warm)",
                    borderRadius: "999px",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                  title="Traveler Cockpit"
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "var(--brand-brown)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {initials}
                  </div>
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: "var(--brand-brown)",
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.firstName || "Account"}
                  </span>
                  <span
                    className="material-symbols-rounded"
                    style={{
                      fontSize: "16px",
                      color: "var(--brand-ochre)",
                      transition: "transform 0.2s",
                      transform: dropdownOpen ? "rotate(180deg)" : "none",
                    }}
                  >
                    keyboard_arrow_down
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: "250px",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      border: "1.5px solid var(--border-warm)",
                      boxShadow: "0 16px 36px -6px rgba(60, 40, 20, 0.16)",
                      overflow: "hidden",
                      zIndex: 1100,
                      animation: "fadeInDown 0.18s ease-out",
                    }}
                  >
                    {/* Header info */}
                    <div style={{ padding: "14px 16px", background: "var(--bg-cream)", borderBottom: "1px solid var(--border-light)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "var(--brand-brown)",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          {initials}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                          <strong style={{ fontSize: "14px", color: "var(--brand-brown)", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {user.firstName} {user.lastName}
                          </strong>
                          <span style={{ fontSize: "11.5px", color: "var(--text-muted)", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4, background: "#FEF3C7", padding: "2px 8px", borderRadius: 999, fontSize: "11px", color: "#92400E", fontWeight: 600 }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 13 }}>diamond</span>
                        <span>Connoisseur Traveler</span>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div style={{ padding: "6px 0" }}>
                      <Link
                        href="/dashboard?tab=overview"
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          fontSize: "13.5px",
                          color: "var(--text-dark)",
                          textDecoration: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-cream)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--brand-ochre)" }}>dashboard</span>
                        <span>Traveler Cockpit</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=bookings"
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          fontSize: "13.5px",
                          color: "var(--text-dark)",
                          textDecoration: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-cream)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--brand-brown)" }}>luggage</span>
                        <span>My Bookings</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=wishlist"
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          fontSize: "13.5px",
                          color: "var(--text-dark)",
                          textDecoration: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-cream)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: "#E11D48" }}>favorite</span>
                        <span>Saved Escapes</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=reviews"
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          fontSize: "13.5px",
                          color: "var(--text-dark)",
                          textDecoration: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-cream)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: "#F59E0B" }}>rate_review</span>
                        <span>My Reviews</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=profile"
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          fontSize: "13.5px",
                          color: "var(--text-dark)",
                          textDecoration: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-cream)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--text-muted)" }}>manage_accounts</span>
                        <span>Profile & Security</span>
                      </Link>

                      {user.role === "admin" && (
                        <a
                          href="http://localhost:3001"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setDropdownOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "9px 16px",
                            fontSize: "13.5px",
                            color: "#92400E",
                            background: "#FEF3C7",
                            textDecoration: "none",
                            fontWeight: 600,
                          }}
                        >
                          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>admin_panel_settings</span>
                          <span>Admin Control Panel</span>
                        </a>
                      )}
                    </div>

                    {/* Sign out */}
                    <div style={{ borderTop: "1px solid var(--border-light)", padding: "4px 0" }}>
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 16px",
                          fontSize: "13.5px",
                          color: "#DC2626",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>logout</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="nav-login-btn">
                <span>Sign In</span>
              </Link>
            )}

            {/* Plan Your Trip CTA */}
            <a href="#search" className="btn-plan-trip">
              <span>Plan Your Trip</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            {/* Hamburger Menu Button for Mobile */}
            <button
              className="nav-hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              type="button"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
