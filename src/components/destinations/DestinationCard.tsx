"use client";

import Link from "next/link";
import { ShowcaseDestination } from "@/lib/showcase-destinations";

interface DestinationCardProps {
  destination: ShowcaseDestination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const visaLabel =
    destination.visaType === "free"
      ? "Visa Free"
      : destination.visaType === "on-arrival"
      ? "Visa on Arrival"
      : destination.visaType === "e-visa"
      ? "Fast E-Visa"
      : "Visa Required";

  return (
    <div className="dest-item-card">
      <Link
        href={`/destinations/${destination.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}
      >
        {/* Photo Box */}
        <div className="dest-photo-box">
          <img src={destination.image} alt={destination.name} loading="lazy" />
          
          {/* Badges */}
          <div className="dest-badge-top-left">
            <span className="dest-season-badge">
              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>wb_sunny</span>
              {destination.bestSeason}
            </span>
          </div>

          <div className="dest-badge-top-right">
            <span className={`dest-visa-badge ${destination.visaType}`}>
              {visaLabel}
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="dest-content-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.8 }}>
              {destination.country} • {destination.region}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ color: "#E0A838", fontSize: 14 }}>★</span>
              <strong style={{ fontSize: 13, color: "var(--text-dark)" }}>{destination.rating.toFixed(1)}</strong>
              <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>({destination.reviewCount})</span>
            </div>
          </div>

          <h3 className="serif dest-title-text">
            {destination.name}
          </h3>

          <p className="dest-desc-text">
            {destination.shortDescription || destination.description}
          </p>

          {/* Highlights Mini Pills */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div className="dest-highlights-row">
              {destination.highlights.slice(0, 3).map((h) => (
                <span key={h} className="dest-mini-chip">
                  • {h}
                </span>
              ))}
            </div>
          )}

          {/* Footer Row */}
          <div className="dest-footer-row">
            <div>
              <span style={{ fontSize: 11, color: "var(--text-muted)", display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>
                Starting From
              </span>
              <span className="dest-price-val">
                ₹ {destination.startingPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="dest-tours-count">
                <span className="material-symbols-rounded" style={{ fontSize: 15 }}>hiking</span>
                {destination.packageCount} {destination.packageCount === 1 ? "Tour" : "Tours"}
              </span>

              <div className="dest-circle-arrow-btn" aria-label="Explore Destination">
                <span className="material-symbols-rounded">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
