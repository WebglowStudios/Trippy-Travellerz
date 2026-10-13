"use client";

import { useState } from "react";
import Link from "next/link";

export interface PackageItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  priceUnit?: string;
  duration?: { days: number; nights: number };
  destination?: { name: string; slug?: string } | string;
  heroImage?: string;
  images?: string[];
  badge?: string;
  rating?: number;
  reviewCount?: number;
  highlights?: string[];
  keyPoints?: string[];
  shortDescription?: string;
  flightsIncluded?: boolean;
  isGroupTour?: boolean;
  isInternational?: boolean;
  category?: string;
}

interface PackageCatalogCardProps {
  pkg: PackageItem;
  viewMode: "grid" | "list";
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export default function PackageCatalogCard({
  pkg,
  viewMode,
  isWishlisted = false,
  onToggleWishlist,
}: PackageCatalogCardProps) {
  const [liked, setLiked] = useState(isWishlisted);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    onToggleWishlist?.(pkg._id);
  };

  const destinationName =
    typeof pkg.destination === "object" && pkg.destination?.name
      ? pkg.destination.name
      : typeof pkg.destination === "string"
      ? pkg.destination
      : "Curated Tour";

  const durationDays = pkg.duration?.days || (pkg.duration?.nights ? pkg.duration.nights + 1 : 6);
  const durationNights = pkg.duration?.nights || (durationDays > 1 ? durationDays - 1 : 1);

  const displayImage =
    pkg.heroImage ||
    (pkg.images && pkg.images.length > 0 ? pkg.images[0] : "") ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80";

  const discountPercent =
    pkg.originalPrice && pkg.originalPrice > pkg.price
      ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
      : null;

  const badgeText = pkg.badge || (pkg.isGroupTour ? "Group Tour" : pkg.category ? pkg.category.toUpperCase() : "Curated");

  if (viewMode === "list") {
    return (
      <div className="pkg-list-card">
        <div className="pkg-list-photo-box">
          <img src={displayImage} alt={pkg.name} loading="lazy" />
          {badgeText && <span className="pkg-tag-badge bestseller">{badgeText}</span>}
          <button
            type="button"
            className={`pkg-fav-btn ${liked ? "liked" : ""}`}
            onClick={handleWishlist}
            aria-label="Save to Wishlist"
          >
            <svg viewBox="0 0 24 24" fill={liked ? "#E11D48" : "none"} stroke={liked ? "#E11D48" : "currentColor"}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="pkg-list-content">
          <div className="pkg-list-meta-top">
            <span className="pkg-meta-loc">
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>location_on</span>
              {destinationName}
            </span>
            <span className="pkg-meta-dur">
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>calendar_month</span>
              {durationDays} Days / {durationNights} Nights
            </span>
            {pkg.rating && (
              <span className="pkg-rating-chip">
                ★ {pkg.rating.toFixed(1)} <small>({pkg.reviewCount || 120})</small>
              </span>
            )}
          </div>

          <Link href={`/itinerary/${pkg.slug}`} style={{ textDecoration: "none" }}>
            <h3 className="serif pkg-list-title">{pkg.name}</h3>
          </Link>

          <p className="pkg-list-desc">
            {pkg.shortDescription || pkg.highlights?.[0] || "Experience unforgettable moments, curated luxury hotels, and private seamless chauffeur excursions."}
          </p>

          <div className="pkg-list-features">
            {pkg.flightsIncluded && <span className="pkg-feat-tag">✈️ Flights Included</span>}
            <span className="pkg-feat-tag">🏨 Curated Stays</span>
            <span className="pkg-feat-tag">🚗 Private Transfers</span>
            <span className="pkg-feat-tag">🍽️ Daily Breakfast</span>
          </div>

          <div className="pkg-list-footer">
            <div className="pkg-price-stack">
              <span className="pkg-price-caption">Starting From</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="pkg-card-price">₹ {pkg.price.toLocaleString("en-IN")}</span>
                {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                  <span className="pkg-original-price">₹ {pkg.originalPrice.toLocaleString("en-IN")}</span>
                )}
                {discountPercent && <span className="pkg-save-tag">Save {discountPercent}%</span>}
              </div>
              <span className="pkg-price-unit">{pkg.priceUnit === "couple" ? "per couple" : "per person"}</span>
            </div>

            <div className="pkg-list-actions">
              <Link href={`/itinerary/${pkg.slug}`} className="btn-pkg-details">
                <span>View Itinerary</span>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
              </Link>
              <Link href={`/book/${pkg.slug}`} className="btn-pkg-book-now">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode Card
  return (
    <div className="pkg-item-card">
      <div className="pkg-photo-box">
        <img src={displayImage} alt={pkg.name} loading="lazy" />
        {badgeText && <span className="pkg-tag-badge bestseller">{badgeText}</span>}
        <button
          type="button"
          className={`pkg-fav-btn ${liked ? "liked" : ""}`}
          onClick={handleWishlist}
          aria-label="Save to Wishlist"
        >
          <svg viewBox="0 0 24 24" fill={liked ? "#E11D48" : "none"} stroke={liked ? "#E11D48" : "currentColor"}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.8 }}>
            {destinationName}
          </span>
          <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 3 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--brand-ochre)" }}>schedule</span>
            {durationDays}D / {durationNights}N
          </span>
        </div>

        <Link href={`/itinerary/${pkg.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          <h3 className="serif pkg-title-text" style={{ fontSize: 18, lineHeight: 1.35, minHeight: 46 }}>
            {pkg.name}
          </h3>
        </Link>

        <p className="pkg-dest-line" style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2, marginBottom: 12 }}>
          {pkg.shortDescription || pkg.highlights?.[0] || "Curated sightseeing, boutique stays, and authentic cultural exploration."}
        </p>

        {/* Feature Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
          {pkg.flightsIncluded && (
            <span style={{ fontSize: 11, background: "rgba(142,95,50,0.08)", color: "var(--brand-brown)", padding: "2px 8px", borderRadius: 9999, fontWeight: 600 }}>
              ✈️ Flights
            </span>
          )}
          <span style={{ fontSize: 11, background: "rgba(142,95,50,0.08)", color: "var(--brand-brown)", padding: "2px 8px", borderRadius: 9999, fontWeight: 600 }}>
            🏨 Stays
          </span>
          <span style={{ fontSize: 11, background: "rgba(142,95,50,0.08)", color: "var(--brand-brown)", padding: "2px 8px", borderRadius: 9999, fontWeight: 600 }}>
            🚗 Transfers
          </span>
        </div>

        <div className="pkg-details-row" style={{ marginTop: "auto", borderTop: "1px solid var(--border-light)", paddingTop: 12 }}>
          <div>
            <span style={{ fontSize: 11, color: "var(--text-muted)", display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Starting From
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="price" style={{ fontSize: 20, fontWeight: 800, color: "var(--brand-brown)" }}>
                ₹ {pkg.price.toLocaleString("en-IN")}
              </span>
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <span style={{ fontSize: 12, textDecoration: "line-through", color: "var(--text-muted)" }}>
                  ₹ {pkg.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="pkg-rating-val" style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end" }}>
              <span className="star" style={{ color: "#E0A838", fontSize: 14 }}>★</span>
              <strong style={{ fontSize: 13, color: "var(--text-dark)" }}>{pkg.rating?.toFixed(1) || "4.9"}</strong>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
              ({pkg.reviewCount || 140} reviews)
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
          <Link href={`/itinerary/${pkg.slug}`} className="btn-card-details">
            View Details
          </Link>
          <Link href={`/book/${pkg.slug}`} className="btn-card-book">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
