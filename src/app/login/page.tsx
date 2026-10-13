"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirect");

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.error || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-page-container">
      {/* LEFT: Luxury Brand Editorial Panel */}
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
            Handcrafted Luxury • For Real Moments
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, margin: "0 0 16px" }}>
            The World Awaits Your Next Odyssey
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 36px" }}>
            Sign in to review confirmed luxury reservations, retrieve private chauffeur schedules, and discover insider recommendations.
          </p>

          {/* Social Proof Stats */}
          <div className="auth-stats-strip">
            <div className="auth-stat-col">
              <strong>12K+</strong>
              <small>Happy Explorers</small>
            </div>
            <div className="auth-stat-div" />
            <div className="auth-stat-col">
              <strong>50+</strong>
              <small>World Escapes</small>
            </div>
            <div className="auth-stat-div" />
            <div className="auth-stat-col">
              <strong>4.9 ★</strong>
              <small>Guest Rating</small>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Login Form Card */}
      <div className="auth-right-panel">
        <div className="auth-form-card">
          <div className="auth-form-head">
            <span className="section-eyebrow">MEMBER SIGN IN</span>
            <h1 className="serif auth-form-title">
              Welcome Back
            </h1>
            <p className="auth-form-subtitle">
              Enter your credentials to access your trips and bespoke itinerary quotes.
            </p>
          </div>

          {error && (
            <div className="auth-error-banner">
              <span className="material-symbols-rounded">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label className="enq-label" style={{ margin: 0 }}>Password *</label>
                <Link href="/forgot-password" className="auth-forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="auth-input-wrapper">
                <span className="material-symbols-rounded auth-field-icon">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "6px 0 20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-body)", cursor: "pointer", userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: "var(--brand-brown)", width: 16, height: 16, cursor: "pointer" }}
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="auth-accent-link"
                style={{ fontSize: 13, textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-auth-submit"
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  <div style={{ width: 18, height: 18, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  Signing In...
                </span>
              ) : (
                "Sign In to Your Account"
              )}
            </button>
          </form>

          <div className="auth-form-footer">
            <p style={{ fontSize: 14, color: "var(--text-body)", margin: 0 }}>
              Don&apos;t have an account yet?{" "}
              <Link
                href={`/register${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                className="auth-switch-link"
              >
                Create an Account
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
          <div style={{ width: 44, height: 44, border: "3px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Loading login portal...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
