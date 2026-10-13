"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.status === "success") {
        setSuccess(true);
      } else {
        setError(res.message || "Could not process request. Please check your email address.");
      }
    } catch {
      setError("Network or server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-wrapper">
      {/* LEFT: Atmospheric Photography Banner */}
      <div className="auth-left-panel">
        <div className="auth-left-bg">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Scenic mountain lake sunrise"
          />
        </div>
        <div className="auth-left-overlay" />

        <div className="auth-left-content">
          <Link href="/" className="auth-brand-badge">
            <img src="/logo.png" alt="Trippy Travellers Logo" className="auth-brand-logo-img" />
            <span className="auth-brand-logo-text">
              Trippy <span className="highlight">Travellers</span>
            </span>
          </Link>

          <span className="cursive" style={{ fontSize: 22, color: "var(--brand-gold)", display: "block", marginBottom: 6 }}>
            Account Security & Recovery
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, margin: "0 0 16px" }}>
            Reclaim Access to Your Journeys
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 36px" }}>
            Enter your registered email address and our security concierge will send you a secure password reset link.
          </p>
        </div>
      </div>

      {/* RIGHT: Forgot Password Form */}
      <div className="auth-right-panel">
        <div className="auth-form-card">
          {!success ? (
            <>
              <div className="auth-form-head">
                <span className="section-eyebrow">RECOVERY DESK</span>
                <h1 className="serif auth-form-title">Forgot Password?</h1>
                <p className="auth-form-subtitle">
                  No worries. Enter your email and we&apos;ll send instructions to reset your password.
                </p>
              </div>

              {error && (
                <div className="auth-error-banner">
                  <span className="material-symbols-rounded">error</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-actual-form">
                <div className="enq-field">
                  <label className="enq-label">Registered Email Address</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="enq-input auth-styled-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                    <span
                      className="material-symbols-rounded"
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--text-muted)",
                        fontSize: 20,
                        pointerEvents: "none",
                      }}
                    >
                      mail
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-auth-submit"
                  style={{ marginTop: 8 }}
                >
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          border: "2px solid #fff",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Sending Recovery Link...
                    </span>
                  ) : (
                    "Send Password Reset Link"
                  )}
                </button>
              </form>

              <div className="auth-form-footer">
                <p style={{ fontSize: 14, color: "var(--text-body)", margin: 0 }}>
                  Remembered your password?{" "}
                  <Link href="/login" className="auth-accent-link">
                    Back to Sign In
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#E8F5E9",
                  border: "1.5px solid #A5D6A7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 18px",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 36, color: "#2E7D32" }}>
                  mark_email_read
                </span>
              </div>

              <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
                Check Your Inbox
              </span>
              <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 12px" }}>
                Reset Link Sent!
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 24px" }}>
                We have emailed a password reset link to <strong style={{ color: "var(--text-dark)" }}>{email}</strong>. Please check your inbox and spam folders.
              </p>

              <Link
                href="/login"
                className="btn-auth-submit"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  textAlign: "center",
                  padding: "13px 32px",
                }}
              >
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
