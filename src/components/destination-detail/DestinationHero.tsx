"use client";

import Link from "next/link";
import { ShowcaseDestination } from "@/lib/showcase-destinations";

interface DestinationHeroProps {
  destination: ShowcaseDestination;
  onOpenEnquiry: () => void;
  onScrollToPackages: () => void;
}

export default function DestinationHero({
  destination,
  onOpenEnquiry,
  onScrollToPackages,
}: DestinationHeroProps) {
  const visaLabel =
    destination.visaType === "free"
      ? "Visa Free for Indians 🚀"
      : destination.visaType === "on-arrival"
      ? "Visa on Arrival ✨"
      : destination.visaType === "e-visa"
      ? "Electronic eVisa 📄"
      : "Visa Required";

  return (
    <section className="dest-hero-section">
      {/* Background Image with Warm Gradient */}
      <div className="dest-hero-bg">
        <img src={destination.image} alt={destination.name} />
        <div className="dest-hero-overlay" />
      </div>

      <div className="container dest-hero-content">
        {/* Breadcrumb */}
        <nav className="pkg-breadcrumb dest-hero-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <Link href="/destinations">Destinations</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <span className="pkg-breadcrumb-active">{destination.name}</span>
        </nav>

        {/* Eyebrow & Headline */}
        <div className="dest-hero-badge-row">
          <span className="dest-hero-pill-badge">
            {destination.country} • {destination.region}
          </span>
          <div className="dest-hero-rating-badge">
            <span style={{ color: "#E0A838" }}>★</span>
            <strong>{destination.rating.toFixed(1)}</strong>
            <span>({destination.reviewCount} travelers)</span>
          </div>
        </div>

        <h1 className="serif dest-hero-title">
          Discover {destination.name}
        </h1>

        <p className="dest-hero-description">
          {destination.description}
        </p>

        {/* Quick Specs Ribbon */}
        <div className="dest-specs-ribbon">
          <div className="dest-spec-item">
            <span className="material-symbols-rounded">wb_sunny</span>
            <div>
              <small>Best Season</small>
              <strong>{destination.bestSeason}</strong>
            </div>
          </div>

          <div className="dest-spec-item">
            <span className="material-symbols-rounded">verified</span>
            <div>
              <small>Visa Policy</small>
              <strong>{visaLabel}</strong>
            </div>
          </div>

          <div className="dest-spec-item">
            <span className="material-symbols-rounded">payments</span>
            <div>
              <small>Currency</small>
              <strong>{destination.currency}</strong>
            </div>
          </div>

          <div className="dest-spec-item">
            <span className="material-symbols-rounded">translate</span>
            <div>
              <small>Language</small>
              <strong>{destination.language}</strong>
            </div>
          </div>

          <div className="dest-spec-item">
            <span className="material-symbols-rounded">sell</span>
            <div>
              <small>Starting From</small>
              <strong style={{ color: "var(--brand-gold)" }}>₹ {destination.startingPrice.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="dest-hero-actions">
          <button
            type="button"
            className="btn-dest-explore-tours"
            onClick={onScrollToPackages}
          >
            <span>View Curated Packages ({destination.packageCount})</span>
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_downward</span>
          </button>

          <button
            type="button"
            className="btn-dest-custom-quote"
            onClick={onOpenEnquiry}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>edit_note</span>
            <span>Plan Custom Trip</span>
          </button>
        </div>
      </div>
    </section>
  );
}
