"use client";

interface MobileCtaBarProps {
  price?: number;
  onBookNow: () => void;
  onSendEnquiry: () => void;
}

export default function MobileCtaBar({
  price = 124999,
  onBookNow,
  onSendEnquiry,
}: MobileCtaBarProps) {
  return (
    <div className="mobile-cta-bar">
      <div>
        <div style={{ fontSize: 10.5, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5 }}>
          Starting From
        </div>
        <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--brand-brown)", lineHeight: 1.1 }}>
          ₹ {price.toLocaleString("en-IN")}
          <small style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)", marginLeft: 4 }}>/person</small>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={onSendEnquiry}
          style={{
            padding: "10px 16px",
            background: "#FFFFFF",
            color: "var(--brand-brown)",
            border: "1.5px solid var(--border-warm)",
            borderRadius: 9999,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Enquiry
        </button>

        <button
          type="button"
          onClick={onBookNow}
          style={{
            padding: "10px 20px",
            background: "var(--brand-brown)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 9999,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(88, 55, 30, 0.28)",
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
