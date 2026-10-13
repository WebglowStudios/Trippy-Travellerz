"use client";

import { useState } from "react";
import Link from "next/link";
import MobileDrawer from "./MobileDrawer";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();

  const focusSearch = () => {
    const input = document.getElementById("destSearchInput");
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav-inner">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo">
            <img src="/logo.png" alt="Trippy Travellers" className="brand-logo-img" />
            <span className="brand-logo-text">
              Trippy <span className="highlight">Travellers</span>
            </span>
          </Link>

          {/* Center Navigation Links with Chevrons */}
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
            {/* Search Outline Icon */}
            <button
              className="nav-icon-btn"
              aria-label="Search"
              onClick={focusSearch}
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

            {/* Wishlist Heart Outline Icon */}
            <Link href="/dashboard?tab=wishlist" className="nav-icon-btn" aria-label="Wishlist">
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

            {/* Account / Login Trigger */}
            {user ? (
              <Link href="/dashboard" className="nav-account-btn" title="Traveler Dashboard">
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--brand-gold)" }}>person</span>
                <span className="nav-user-firstname">{user.firstName || "Account"}</span>
              </Link>
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
