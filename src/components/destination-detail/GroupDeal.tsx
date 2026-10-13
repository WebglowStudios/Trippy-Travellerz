"use client";

import Link from "next/link";

export interface GroupDealData {
  title: string;
  description: string;
  image?: string;
  discountText?: string;
}

interface GroupDealProps {
  groupDeal?: GroupDealData | null;
  destinationName?: string;
  onOpenEnquiry?: () => void;
}

export default function GroupDeal({
  groupDeal,
  destinationName = "",
  onOpenEnquiry,
}: GroupDealProps) {
  // If destination doesn't have custom group deal from API, provide high-converting curated defaults
  const deal = groupDeal || {
    title: destinationName
      ? `Travelling to ${destinationName} with 6+ Companions?`
      : "Private & Corporate Group Escapes",
    description: `Unlock tailored group discounts, private chauffeur-driven coaches, and dedicated tour directors for your friends, family, or corporate team in ${destinationName || "our luxury destinations"}.`,
    discountText: "Exclusive Group Rates: Up to 20% Off for 6+ Travelers",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1600&q=80",
  };

  return (
    <section
      id="group-deal"
      className="group-deal-section"
      style={{
        padding: "72px 24px",
        background: "linear-gradient(135deg, #3D2312 0%, #58371E 50%, #7A4D29 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        borderTop: "1px solid rgba(234,227,216,0.15)",
        borderBottom: "1px solid rgba(234,227,216,0.15)",
      }}
    >
      {/* Ambient background glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 18% 45%, rgba(223,185,128,0.15) 0%, transparent 55%), radial-gradient(circle at 82% 55%, rgba(255,255,255,0.08) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      {deal.image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${deal.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.14,
            filter: "grayscale(30%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {/* VIP Group Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(8px)",
            color: "#FAF7F2",
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            padding: "7px 20px",
            borderRadius: 9999,
            marginBottom: 20,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--brand-ochre, #DFB980)" }}>
            groups
          </span>
          <span>Bespoke Group Journeys</span>
        </div>

        {/* Title */}
        <h2
          className="serif"
          style={{
            fontSize: "clamp(26px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
            margin: "0 0 16px",
          }}
        >
          {deal.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 15.5,
            color: "rgba(250, 247, 242, 0.88)",
            lineHeight: 1.65,
            marginBottom: 20,
            maxWidth: 620,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {deal.description}
        </p>

        {/* Discount highlight badge */}
        {deal.discountText && (
          <div style={{ marginBottom: 28 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#58371E",
                background: "#DFB980",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 22px",
                borderRadius: 9999,
                boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>local_offer</span>
              <span>{deal.discountText}</span>
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {onOpenEnquiry ? (
            <button
              type="button"
              onClick={onOpenEnquiry}
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "var(--brand-brown, #58371E)",
                background: "#FAF7F2",
                padding: "14px 34px",
                borderRadius: 9999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 28px rgba(0, 0, 0, 0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>mail</span>
              <span>Request Group Quotation</span>
            </button>
          ) : (
            <Link
              href="/contact?type=group"
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "var(--brand-brown, #58371E)",
                background: "#FAF7F2",
                padding: "14px 34px",
                borderRadius: 9999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 28px rgba(0, 0, 0, 0.2)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>mail</span>
              <span>Request Group Quotation</span>
            </Link>
          )}

          <a
            href="https://wa.me/919999999999?text=Hi%20Trippy%20Travellers,%20I%20would%20like%20a%20group%20quote%20for%20our%20trip."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#FAF7F2",
              background: "rgba(255, 255, 255, 0.14)",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              padding: "13px 28px",
              borderRadius: 9999,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              backdropFilter: "blur(6px)",
              transition: "all 0.2s ease",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>chat</span>
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
}
