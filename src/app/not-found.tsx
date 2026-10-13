import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <main
        style={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #F5ECE0 0%, var(--bg-cream) 100%)",
          padding: "60px 20px 80px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 580 }}>
          {/* Compass Rose Seal */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#FAF4EC",
              border: "1.5px solid #DFCEB5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 6px 20px rgba(88, 55, 30, 0.08)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--brand-ochre)" }}>
              explore_off
            </span>
          </div>

          <span className="cursive" style={{ fontSize: 24, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
            Uncharted Territory
          </span>

          <div
            className="serif"
            style={{
              fontSize: "clamp(80px, 12vw, 130px)",
              fontWeight: 800,
              lineHeight: 0.9,
              color: "var(--brand-brown)",
              opacity: 0.25,
              letterSpacing: -4,
              userSelect: "none",
            }}
          >
            404
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 700,
              color: "var(--text-dark)",
              margin: "-15px 0 14px",
              lineHeight: 1.25,
            }}
          >
            Lost Along the Way?
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "var(--text-body)",
              lineHeight: 1.65,
              maxWidth: 440,
              margin: "0 auto 28px",
            }}
          >
            The trail you are following may have changed coordinates or no longer exists. Let our travel compass guide you back to our curated journeys.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                background: "var(--brand-brown)",
                color: "#FFFFFF",
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(88, 55, 30, 0.2)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>home</span>
              <span>Return Home</span>
            </Link>

            <Link
              href="/packages"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 26px",
                background: "#FFFFFF",
                color: "var(--brand-brown)",
                border: "1.5px solid var(--border-warm)",
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>travel_explore</span>
              <span>Browse Packages</span>
            </Link>
          </div>

          {/* Quick Route Shortcuts */}
          <div
            style={{
              padding: "18px 24px",
              background: "#FAF7F2",
              borderRadius: 18,
              border: "1px solid var(--border-light)",
            }}
          >
            <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 10 }}>
              Or explore our popular collections:
            </span>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/destinations" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", textDecoration: "none" }}>
                🗺️ Destinations
              </Link>
              <span style={{ color: "var(--border-warm)" }}>•</span>
              <Link href="/visa-free" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", textDecoration: "none" }}>
                🛂 Visa-Free Trips
              </Link>
              <span style={{ color: "var(--border-warm)" }}>•</span>
              <Link href="/articles" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", textDecoration: "none" }}>
                📰 Travel Journal
              </Link>
              <span style={{ color: "var(--border-warm)" }}>•</span>
              <Link href="/contact" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", textDecoration: "none" }}>
                📞 Concierge Desk
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
