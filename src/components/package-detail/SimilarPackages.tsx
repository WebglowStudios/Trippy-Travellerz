"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface SimilarPackagesProps {
  currentSlug: string;
}

const FALLBACK_SIMILAR = [
  {
    name: "Singapore & Sentosa Island Escape",
    slug: "singapore-classic-with-universal-studios",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    nights: 5,
    days: 6,
    price: 72999,
    hotel: "4-Star Luxury",
  },
  {
    name: "Japan Cherry Blossom & Heritage Special",
    slug: "japan-cherry-blossom-season-special",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    nights: 9,
    days: 10,
    price: 114999,
    hotel: "4-Star Deluxe",
  },
  {
    name: "Bali Luxury Honeymoon Private Villa",
    slug: "bali-luxury-honeymoon-retreat-6n7d",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    nights: 6,
    days: 7,
    price: 64999,
    hotel: "5-Star Private Pool",
  },
];

export default function SimilarPackages({ currentSlug }: SimilarPackagesProps) {
  const [packages, setPackages] = useState(FALLBACK_SIMILAR);

  useEffect(() => {
    async function loadSimilar() {
      try {
        const res = await api.get("/packages/featured");
        if (res.status === "success" && res.data && res.data.length > 0) {
          const filtered = res.data
            .filter((p: any) => p.slug !== currentSlug)
            .slice(0, 3)
            .map((p: any) => ({
              name: p.name,
              slug: p.slug,
              image: p.heroImage || p.images?.[0] || FALLBACK_SIMILAR[0].image,
              nights: p.duration?.nights || 5,
              days: p.duration?.days || 6,
              price: p.price || 50000,
              hotel: p.hotelRating || "5-Star Luxury",
            }));

          if (filtered.length > 0) {
            setPackages(filtered);
          }
        }
      } catch {
        // Fallback
      }
    }
    loadSimilar();
  }, [currentSlug]);

  return (
    <section className="similar-packages-section">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <span className="section-eyebrow">EXPLORE MORE DESTINATIONS</span>
          <h2 className="serif" style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: "var(--text-dark)", marginTop: 6 }}>
            You May Also Like
          </h2>
        </div>
        <Link
          href="/packages"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13.5,
            fontWeight: 700,
            color: "var(--brand-brown)",
            textDecoration: "none",
          }}
        >
          <span>All Packages</span>
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
        </Link>
      </div>

      <div className="similar-grid">
        {packages.map((pkg, i) => (
          <Link
            key={pkg.slug || i}
            href={`/itinerary/${pkg.slug}`}
            className="pkg-teaser-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="pkg-teaser-img-wrap">
              <img src={pkg.image} alt={pkg.name} loading="lazy" />
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(6px)",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--brand-brown)",
                }}
              >
                {pkg.nights}N / {pkg.days}D
              </div>
            </div>

            <div className="pkg-teaser-body">
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                {pkg.hotel}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.35, marginBottom: 14 }}>
                {pkg.name}
              </h3>

              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-light)", paddingTop: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase" }}>From</div>
                  <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--brand-brown)" }}>
                    ₹ {pkg.price.toLocaleString("en-IN")}
                  </div>
                </div>
                <span
                  style={{
                    padding: "6px 14px",
                    background: "var(--bg-soft-box)",
                    border: "1px solid var(--border-warm)",
                    borderRadius: 9999,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "var(--brand-brown)",
                  }}
                >
                  View Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
