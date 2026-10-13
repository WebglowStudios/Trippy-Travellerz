import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Security — Trippy Travellers",
  description:
    "Learn how Trippy Travellers protects your personal data, passport documents, financial transactions, and privacy in compliance with Indian DPDP and global data standards.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", background: "var(--bg-cream)" }}>
        {/* Hero */}
        <section className="legal-hero-section text-center">
          <div className="container" style={{ maxWidth: 780 }}>
            <span className="legal-badge-pill">
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                shield_lock
              </span>
              <span>Data Security & Confidentiality</span>
            </span>
            <h1 className="serif article-hero-title">Privacy Policy</h1>
            <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
              Last updated: October 2026 • Your trust is the bedrock of our bespoke travel services.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="container" style={{ maxWidth: 860, padding: "40px 20px 70px" }}>
          <div className="legal-content-card">
            <div className="legal-prose">
              <p>
                At <strong>Trippy Travellers</strong>, we understand that planning bespoke international journeys requires sharing sensitive information — from passport scans and dietary preferences to flight numbers and payment details. We are deeply committed to maintaining the utmost confidentiality, integrity, and security of your personal data.
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We only collect information strictly necessary to curate, secure, and deliver your travel itinerary:
              </p>
              <ul>
                <li><strong>Identity & Contact Information:</strong> Full legal names (matching passports), email addresses, phone/WhatsApp numbers, dates of birth, and nationality.</li>
                <li><strong>Government Identifiers & Travel Documentation:</strong> Passport copies, visa copies, and Permanent Account Numbers (PAN) strictly required for Reserve Bank of India Liberalised Remittance Scheme (LRS) TCS compliance.</li>
                <li><strong>Preferences & Health Requirements:</strong> Dietary allergies, mobility needs, room preferences (e.g. king bed vs twin, high floor), and special celebration dates (anniversaries, honeymoons).</li>
                <li><strong>Payment Data:</strong> Payment card details and UPI handles are processed directly through our PCI-DSS Level 1 certified gateway partner (Razorpay). Trippy Travellers never stores your credit card numbers, CVVs, or banking passwords on our local servers.</li>
              </ul>

              <h2>2. How We Use Your Data</h2>
              <p>Your personal data is used solely for the following legitimate travel purposes:</p>
              <ul>
                <li>Booking boutique hotels, private villas, flights, trains, and experiential tours under your name.</li>
                <li>Arranging private airport transfers, luxury chauffeur services, and licensed tour naturalists.</li>
                <li>Generating regulatory invoices, tax vouchers, and reporting TCS collections to the Income Tax Department.</li>
                <li>Enabling real-time concierge communication through WhatsApp during your active travels.</li>
                <li>Sending curated travel dispatches or private seasonal offers (which you can opt out of at any time with a single tap).</li>
              </ul>

              <h2>3. How We Share Information with Travel Partners</h2>
              <p>
                We never sell, rent, or trade your personal information to third-party advertising brokers or data mining syndicates. Information is disclosed strictly to vetted operational partners necessary to fulfill your trip:
              </p>
              <ul>
                <li><strong>Airlines & Consulates:</strong> For passenger booking records (PNR) and visa application filings.</li>
                <li><strong>Hotels & Resorts:</strong> To confirm your guest reservations and honor special requests.</li>
                <li><strong>Local Chauffeurs & Guides:</strong> Provided with passenger names and emergency contact details for airport greetings and coordination.</li>
              </ul>

              <h2>4. Data Retention & Encryption</h2>
              <p>
                All data transmitted through our website is encrypted using industry-standard TLS 1.3 protocol. Passport scans and tax documents are stored in encrypted cloud vaults with role-based access restricted solely to authorized travel designers handling your active booking.
              </p>
              <p>
                We retain your records for the minimum period required to satisfy statutory financial audits, legal obligations, and tax reporting requirements under Indian laws, after which documents are securely archived or purged.
              </p>

              <h2>5. Your Rights & Data Portability</h2>
              <p>
                Under the Indian Digital Personal Data Protection Act (DPDP) and international privacy frameworks, you have the right to:
              </p>
              <ul>
                <li>Access a copy of the personal information we hold about you.</li>
                <li>Request corrections of incomplete or inaccurate passport or contact records.</li>
                <li>Request deletion of your non-regulatory personal information once your trip is completed.</li>
                <li>Opt out of marketing communications at any time.</li>
              </ul>

              <h2>6. Cookies & Web Analytics</h2>
              <p>
                We use privacy-conscious session cookies to keep you logged in to your Traveler Dashboard, remember package filter preferences, and understand website performance. You may disable cookies in your browser settings at any time without restricting your ability to browse our catalog.
              </p>

              <h2>7. Contact Our Data Protection Desk</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our privacy desk directly:
              </p>
              <div
                style={{
                  padding: "16px 20px",
                  background: "#FAF7F2",
                  borderRadius: 14,
                  border: "1px solid var(--border-light)",
                  fontSize: 13.5,
                  color: "var(--text-dark)",
                }}
              >
                <strong>Data Privacy Officer — Trippy Travellers</strong>
                <br />
                Email: <span style={{ color: "var(--brand-brown)", fontWeight: 600 }}>privacy@trippytravellers.com</span>
                <br />
                Location: Bengaluru & Pune, India
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
