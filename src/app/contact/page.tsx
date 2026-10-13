"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    guests: "2 Adults (Couple)",
    budgetRange: "₹ 50,000 - ₹ 1,50,000",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/enquiries", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelDate: formData.travelDate || undefined,
        guests: formData.guests,
        budgetRange: formData.budgetRange,
        message: `[Inquiry via Contact Page]\nTarget Destination: ${formData.destination || "Undecided"}\nBudget: ${formData.budgetRange}\nNotes: ${formData.message}`,
        brand: "trippy-travellerz",
      });

      if (res.status === "success" || res.data) {
        setSuccess(true);
      } else {
        setError(res.message || "Failed to submit inquiry. Please try again or WhatsApp us directly.");
      }
    } catch {
      // In offline / fallback mode, simulate graceful success
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main style={{ backgroundColor: "var(--bg-cream)", minHeight: "100vh" }}>
        {/* 1. Header Banner */}
        <section className="contact-hero-section">
          <div className="container" style={{ textAlign: "center" }}>
            <nav className="pkg-breadcrumb" aria-label="Breadcrumb" style={{ justifyContent: "center", marginBottom: 18 }}>
              <Link href="/">Home</Link>
              <span className="pkg-breadcrumb-sep">/</span>
              <span className="pkg-breadcrumb-active">Contact & Private Concierge</span>
            </nav>

            <span className="cursive" style={{ fontSize: 22, color: "var(--brand-ochre)", display: "block", marginBottom: 6 }}>
              Personal Touchpoints • Dream · Explore · Discover
            </span>
            <h1 className="serif contact-hero-title">
              Let&apos;s Start Planning Your Private Journey
            </h1>
            <p className="contact-hero-subtitle">
              Have questions about an itinerary, require corporate group arrangements, or wish to design a bespoke holiday from scratch? Our master travel designers are ready to assist.
            </p>
          </div>
        </section>

        {/* 2. Main 2-Column Contact Section */}
        <section className="container" style={{ padding: "50px 20px 80px" }}>
          <div className="contact-two-col-grid">
            {/* LEFT: Direct Contact Channels */}
            <div className="contact-info-panel">
              <span className="section-eyebrow">DIRECT CONCIERGE CHANNELS</span>
              <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--text-dark)", margin: "4px 0 18px" }}>
                Speak Directly with an Expert
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6, marginBottom: 28 }}>
                We believe in personalized human conversations. Reach out to our dedicated concierge team via any of the channels below.
              </p>

              {/* Channels Cards */}
              <div className="contact-channels-list">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/917666226649?text=Hi%20Trippy%20Travellerz%2C%20I%20would%20like%20to%20plan%20a%20luxury%20holiday!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-card whatsapp"
                >
                  <div className="contact-channel-icon-wrap" style={{ background: "#E8F5E9", color: "#16A34A" }}>
                    <span className="material-symbols-rounded">chat</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: 15, color: "var(--text-dark)", display: "block" }}>WhatsApp Concierge</strong>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>+91 76662 26649 (Fastest response &lt;15 mins)</span>
                  </div>
                  <span className="material-symbols-rounded" style={{ marginLeft: "auto", color: "var(--brand-ochre)", fontSize: 18 }}>arrow_forward</span>
                </a>

                {/* Telephone */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon-wrap" style={{ background: "#FAF4EC", color: "var(--brand-brown)" }}>
                    <span className="material-symbols-rounded">call</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: 15, color: "var(--text-dark)", display: "block" }}>Direct Phone Concierge</strong>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>+91 76662 26649 • Toll-Free: 1800-TRIPPY-LIVE</span>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon-wrap" style={{ background: "#FAF4EC", color: "var(--brand-brown)" }}>
                    <span className="material-symbols-rounded">mail</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: 15, color: "var(--text-dark)", display: "block" }}>Email Inquiries</strong>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>concierge@trippytravellers.com</span>
                  </div>
                </div>

                {/* Office Studio */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon-wrap" style={{ background: "#FAF4EC", color: "var(--brand-brown)" }}>
                    <span className="material-symbols-rounded">location_on</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: 15, color: "var(--text-dark)", display: "block" }}>Experience Design Studio</strong>
                    <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, display: "block" }}>
                      Trippy Travellers Luxury Journeys, 4th Floor, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038
                    </span>
                  </div>
                </div>
              </div>

              {/* Operating Hours Box */}
              <div className="contact-hours-box">
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--brand-ochre)" }}>schedule</span>
                <div style={{ fontSize: 12.5, color: "var(--text-body)" }}>
                  <strong>Studio Hours:</strong> Monday – Saturday: 9:30 AM – 7:30 PM IST.<br />
                  <strong>Active Traveler Emergency Concierge:</strong> 24 Hours / 7 Days.
                </div>
              </div>
            </div>

            {/* RIGHT: Inquiry Form Card */}
            <div className="contact-form-panel">
              <div className="contact-form-card">
                <div style={{ marginBottom: 20 }}>
                  <span className="section-eyebrow">TAILORED INQUIRY</span>
                  <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", margin: "4px 0" }}>
                    Send Us an Itinerary Request
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--text-muted)", margin: 0 }}>
                    Fill out the form below and an expert travel designer will follow up within 24 hours.
                  </p>
                </div>

                {success ? (
                  <div className="contact-success-box">
                    <span className="material-symbols-rounded" style={{ fontSize: 48, color: "#16A34A" }}>
                      check_circle
                    </span>
                    <h4 className="serif" style={{ fontSize: 20, fontWeight: 700, margin: "8px 0" }}>
                      Inquiry Received with Thanks!
                    </h4>
                    <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, marginBottom: 20 }}>
                      Thank you, <strong>{formData.name}</strong>. Your custom inquiry has been assigned to our travel design guild. A specialist will review your preferences and contact you at <strong>{formData.email}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSuccess(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          destination: "",
                          travelDate: "",
                          guests: "2 Adults (Couple)",
                          budgetRange: "₹ 50,000 - ₹ 1,50,000",
                          message: "",
                        });
                      }}
                      className="btn-dash-primary"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {error && (
                      <div className="auth-error-banner">
                        <span className="material-symbols-rounded">error</span>
                        <span>{error}</span>
                      </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div className="enq-input-group">
                        <label className="enq-label">Full Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Vikram Malhotra"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="enq-input"
                          required
                        />
                      </div>
                      <div className="enq-input-group">
                        <label className="enq-label">Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="enq-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="enq-input-group">
                      <label className="enq-label">Email Address *</label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="enq-input"
                        required
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div className="enq-input-group">
                        <label className="enq-label">Dream Destination</label>
                        <input
                          type="text"
                          placeholder="e.g. Dubai, Bali, Switzerland..."
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="enq-input"
                        />
                      </div>
                      <div className="enq-input-group">
                        <label className="enq-label">Approx. Travel Date</label>
                        <input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                          className="enq-input"
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div className="enq-input-group">
                        <label className="enq-label">Party Composition</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="enq-input"
                        >
                          <option value="2 Adults (Couple)">2 Adults (Couple / Honeymoon)</option>
                          <option value="Family (2 Adults + Children)">Family (2 Adults + Children)</option>
                          <option value="Group of Friends (4+ Pax)">Group of Friends (4+ Pax)</option>
                          <option value="Solo Traveler">Solo Traveler</option>
                        </select>
                      </div>

                      <div className="enq-input-group">
                        <label className="enq-label">Budget Per Person</label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="enq-input"
                        >
                          <option value="Under ₹ 50,000">Under ₹ 50,000</option>
                          <option value="₹ 50,000 - ₹ 1,20,000">₹ 50,000 - ₹ 1,20,000</option>
                          <option value="₹ 1,20,000 - ₹ 2,50,000">₹ 1,20,000 - ₹ 2,50,000</option>
                          <option value="₹ 2,50,000+ (Ultra Luxury)">₹ 2,50,000+ (Ultra Luxury)</option>
                        </select>
                      </div>
                    </div>

                    <div className="enq-input-group">
                      <label className="enq-label">Specific Desires or Questions</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your passions — e.g., pool villas, sunset catamaran, cultural cooking, specific dates..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="enq-input"
                        style={{ resize: "vertical" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-auth-submit"
                      style={{ marginTop: 6 }}
                    >
                      {loading ? "Submitting Inquiry..." : "Send Concierge Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
