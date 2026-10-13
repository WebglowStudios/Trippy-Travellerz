"use client";

import Link from "next/link";

interface CustomItineraryBannerProps {
  onOpenEnquiry?: () => void;
}

export default function CustomItineraryBanner({ onOpenEnquiry }: CustomItineraryBannerProps) {
  return (
    <section className="pkg-custom-banner-wrap">
      <div className="pkg-custom-banner-card">
        {/* Background decorative topo contours */}
        <div className="pkg-custom-banner-topo">
          <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,40 C100,10 180,80 280,50 C340,30 380,70 420,40" stroke="#DFCEB5" strokeWidth="1.2" opacity="0.4" fill="none" />
            <path d="M10,80 C90,50 170,120 270,90 C330,70 370,110 410,80" stroke="#DFCEB5" strokeWidth="1.2" opacity="0.3" fill="none" />
            <path d="M0,120 C80,90 160,160 260,130 C320,110 360,150 400,120" stroke="#DFCEB5" strokeWidth="1.2" opacity="0.2" fill="none" />
          </svg>
        </div>

        <div className="pkg-custom-banner-content">
          <div className="pkg-custom-banner-left">
            <div className="pkg-concierge-avatar-badge">
              <span className="material-symbols-rounded">travel_explore</span>
            </div>
            <div>
              <span className="cursive" style={{ fontSize: 18, color: "var(--brand-ochre)", display: "block", marginBottom: 2 }}>
                Private Craftsmanship & Tailored Travel
              </span>
              <h3 className="serif" style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 700, color: "var(--text-dark)", margin: "0 0 8px" }}>
                Can&apos;t Find Your Exact Dream Journey?
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6, maxWidth: 580, margin: 0 }}>
                Every traveler is unique. If our catalog doesn&apos;t match your precise dates, bucket-list activities, or luxury preferences, our master travel designers will handcraft a bespoke 100% custom itinerary for you.
              </p>
            </div>
          </div>

          <div className="pkg-custom-banner-actions">
            {onOpenEnquiry ? (
              <button
                type="button"
                className="btn-custom-quote"
                onClick={onOpenEnquiry}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>edit_note</span>
                <span>Request Custom Itinerary</span>
              </button>
            ) : (
              <Link href="/contact" className="btn-custom-quote" style={{ textDecoration: "none" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>edit_note</span>
                <span>Request Custom Itinerary</span>
              </Link>
            )}

            <a
              href="https://wa.me/917666226649?text=Hi%20Trippy%20Travellerz%2C%20I%20would%20like%20to%20plan%20a%20custom%20luxury%20holiday!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-concierge"
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "#25D366" }}>chat</span>
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
