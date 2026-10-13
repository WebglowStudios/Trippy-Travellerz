"use client";

import { use, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>;
}

function ResetPasswordInner({ params }: ResetPasswordPageProps) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please ensure both fields are identical.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      if (res.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      } else {
        setError(res.message || "Invalid, expired, or previously used reset link.");
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
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
            alt="Starry mountain landscape"
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
            Enhanced Credentials
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, margin: "0 0 16px" }}>
            Create Your New Access Key
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 36px" }}>
            Choose a strong password with a mix of letters, numbers, and symbols to protect your bespoke itineraries and bookings.
          </p>
        </div>
      </div>

      {/* RIGHT: Reset Form */}
      <div className="auth-right-panel">
        <div className="auth-form-card">
          {!success ? (
            <>
              <div className="auth-form-head">
                <span className="section-eyebrow">CREDENTIAL UPDATE</span>
                <h1 className="serif auth-form-title">Set New Password</h1>
                <p className="auth-form-subtitle">
                  Please enter and confirm your new secure password below.
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
                  <label className="enq-label">New Password (min. 8 characters)</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="enq-input auth-styled-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="auth-password-toggle-btn"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-rounded">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="enq-field">
                  <label className="enq-label">Confirm New Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat new password"
                      className="enq-input auth-styled-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="auth-password-toggle-btn"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-rounded">
                        {showConfirm ? "visibility_off" : "visibility"}
                      </span>
                    </button>
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
                      Updating Password...
                    </span>
                  ) : (
                    "Update Password & Sign In"
                  )}
                </button>
              </form>

              <div className="auth-form-footer">
                <p style={{ fontSize: 14, color: "var(--text-body)", margin: 0 }}>
                  <Link href="/login" className="auth-accent-link">
                    Return to Sign In
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
                  check_circle
                </span>
              </div>

              <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
                Password Updated!
              </span>
              <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 12px" }}>
                Credentials Successfully Reset
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 24px" }}>
                Your password has been securely updated. Redirecting you to the sign-in portal...
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
                Sign In Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage(props: ResetPasswordPageProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-cream)" }} />}>
      <ResetPasswordInner {...props} />
    </Suspense>
  );
}
