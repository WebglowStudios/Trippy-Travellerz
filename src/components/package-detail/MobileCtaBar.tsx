"use client";

interface MobileCtaBarProps {
  price?: number;
  onSendEnquiry: () => void;
  onBookNow?: () => void;
}

export default function MobileCtaBar({
  price = 124999,
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

      <div>
        <button
          type="button"
          onClick={onSendEnquiry}
          style={{
            padding: "11px 22px",
            background: "var(--brand-brown)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(88, 55, 30, 0.28)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>mail</span>
          <span>Send Enquiry</span>
        </button>
      </div>
    </div>
  );
}
