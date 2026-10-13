"use client";

import Link from "next/link";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
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
            <img src="/logo.png" alt="Trippy Travellers" className="nav-drawer-logo" />
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

        <div className="nav-drawer-links">
          <Link href="/destinations" onClick={onClose}>
            <span className="drawer-icon">🗺️</span>Destinations
          </Link>
          <Link href="/packages" onClick={onClose}>
            <span className="drawer-icon">✈️</span>Featured Packages
          </Link>
          <Link href="/itinerary/dubai-luxury-escape" onClick={onClose}>
            <span className="drawer-icon">✨</span>Dubai Luxury Escape{" "}
            <span className="drawer-badge">Hot</span>
          </Link>
          <Link href="#experiences" onClick={onClose}>
            <span className="drawer-icon">⛵</span>Experiences
          </Link>
          <Link href="#styles" onClick={onClose}>
            <span className="drawer-icon">🎒</span>Travel Styles
          </Link>
          <Link href="#stories" onClick={onClose}>
            <span className="drawer-icon">⭐</span>Traveller Stories
          </Link>
          <Link href="/visa-free" onClick={onClose}>
            <span className="drawer-icon">🛂</span>Visa-Free Trips
          </Link>
          <Link href="/articles" onClick={onClose}>
            <span className="drawer-icon">📰</span>Travel Journal
          </Link>
          <Link href="/about" onClick={onClose}>
            <span className="drawer-icon">🌿</span>Why Trippy Travellers
          </Link>
          <Link href="/contact" onClick={onClose}>
            <span className="drawer-icon">📞</span>Contact Us
          </Link>
        </div>

        <div className="nav-drawer-cta">
          <a href="#search" onClick={onClose} className="btn-drawer-plan">
            Plan Your Journey
          </a>
          <div className="drawer-contact-mini">
            <span>+91 98765-43210</span> • <span>hello@trippytravellers.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
