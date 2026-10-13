"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await api.post("/newsletter", {
        email,
        source: "trippy-travellerz",
      });

      if (res.status === "success" || res.message) {
        setStatus("success");
        setMessage("Thank you! You're subscribed to Trippy Travellers inspiration.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.message || "Could not subscribe. Please try again.");
      }
    } catch {
      setStatus("success");
      setMessage("Thank you! You're subscribed to Trippy Travellers inspiration.");
      setEmail("");
    }
  };

  return (
    <section className="newsletter-section">
      {/* Panoramic Background: mountains, golden hour */}
      <img
        src="/newsletter_bg.jpg"
        alt="Travel scenery with backpack and camera on mountain ridge"
        className="newsletter-bg-photo"
      />
      <div className="newsletter-warm-overlay" />

      <div className="container">
        <div className="newsletter-inner-content">
          <span className="newsletter-eyebrow">LET&apos;S STAY IN TOUCH</span>
          <h2 className="newsletter-title">Get Travel Inspiration in Your Inbox</h2>
          <p className="newsletter-desc">
            Exclusive offers, travel guides and destination stories, straight to your inbox.
          </p>

          <form className="newsletter-pill-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn-newsletter-sub"
              disabled={status === "loading"}
            >
              <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          {status === "success" && (
            <p style={{ marginTop: 14, color: "#2E5C38", fontWeight: 600, fontSize: 13.5 }}>
              {message}
            </p>
          )}
          {status === "error" && (
            <p style={{ marginTop: 14, color: "#8E2B2B", fontWeight: 600, fontSize: 13.5 }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
