"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "#DC2626", width: "25%" };
  if (score === 2) return { label: "Fair", color: "#D97706", width: "50%" };
  if (score === 3) return { label: "Good", color: "var(--brand-ochre)", width: "75%" };
  return { label: "Strong", color: "#15803D", width: "100%" };
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirect");

  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify both fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);

    const result = await register({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      password,
    });

    setLoading(false);

    if (result.success) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.error || "Registration failed. An account with this email may already exist.");
    }
  };

  return (
    <div className="auth-page-container">
      {/* LEFT: Editorial Brand Panel */}
      <div className="auth-left-editorial">
        <div className="auth-editorial-bg" />
        <div className="auth-editorial-overlay" />
        
        <div className="auth-editorial-content">
          <Link href="/" className="auth-brand-logo-wrap">
            <img src="/logo.png" alt="Trippy Travellers" className="auth-brand-logo-img" />
            <span className="auth-brand-logo-text">
              Trippy <span className="highlight">Travellers</span>
            </span>
          </Link>

          <span className="cursive" style={{ fontSize: 22, color: "var(--brand-gold)", display: "block", marginBottom: 6 }}>
            Crafted for Curious Souls • Dream · Explore · Discover
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, margin: "0 0 16px" }}>
            Begin Your Private Travel Story
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 36px" }}>
            Join our private circle of discerning travelers. Save your dream itineraries, enjoy personalized member pricing, and receive bespoke travel consultations.
          </p>

          <div className="auth-perks-list">
            <div className="auth-perk-item">
              <span className="material-symbols-rounded">verified</span>
              <span>Direct access to master itinerary concierges</span>
            </div>
            <div className="auth-perk-item">
              <span className="material-symbols-rounded">confirmation_number</span>
              <span>Real-time payment tracking & instant booking vouchers</span>
            </div>
            <div className="auth-perk-item">
              <span className="material-symbols-rounded">loyalty</span>
              <span>Exclusive invitations to private group departures</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Register Form Card */}
      <div className="auth-right-panel">
        <div className="auth-form-card">
          <div className="auth-form-head">
            <span className="section-eyebrow">NEW TRAVELER MEMBERSHIP</span>
            <h1 className="serif auth-form-title">
              Create Your Account
            </h1>
            <p className="auth-form-subtitle">
              Join Trippy Travellers in less than a minute.
            </p>
          </div>

          {error && (
            <div className="auth-error-banner">
              <span className="material-symbols-rounded">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="enq-input-group">
                <label className="enq-label">First Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Vikram"
                  className="enq-input auth-styled-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="enq-input-group">
                <label className="enq-label">Last Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Malhotra"
                  className="enq-input auth-styled-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="enq-input-group">
              <label className="enq-label">Email Address *</label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-rounded auth-field-icon">mail</span>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="enq-input auth-styled-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="enq-input-group">
              <label className="enq-label">Mobile Phone (Optional)</label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-rounded auth-field-icon">phone</span>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="enq-input auth-styled-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="enq-input-group">
              <label className="enq-label">Password *</label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-rounded auth-field-icon">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
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

              {/* Password strength indicator */}
              {password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                    <span>Strength: <strong style={{ color: strength.color }}>{strength.label}</strong></span>
                    <span>Min. 8 characters</span>
                  </div>
                  <div style={{ height: 4, background: "#EAE3D8", borderRadius: 9999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: strength.width, background: strength.color, transition: "all 0.3s ease" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="enq-input-group">
              <label className="enq-label">Confirm Password *</label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-rounded auth-field-icon">lock_reset</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="enq-input auth-styled-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ margin: "10px 0 20px" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--text-body)", cursor: "pointer", lineHeight: 1.5 }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ accentColor: "var(--brand-brown)", width: 16, height: 16, marginTop: 2, cursor: "pointer" }}
                />
                <span>
                  I agree to Trippy Travellers&apos;{" "}
                  <Link href="/terms" className="auth-inline-link">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="auth-inline-link">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-auth-submit"
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  <div style={{ width: 18, height: 18, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  Creating Account...
                </span>
              ) : (
                "Join Trippy Travellers"
              )}
            </button>
          </form>

          <div className="auth-form-footer">
            <p style={{ fontSize: 14, color: "var(--text-body)", margin: 0 }}>
              Already have an account?{" "}
              <Link
                href={`/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                className="auth-switch-link"
              >
                Sign In
              </Link>
            </p>

            <Link href="/" className="auth-return-home-link">
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_back</span>
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
          <div style={{ width: 44, height: 44, border: "3px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Loading sign-up portal...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
