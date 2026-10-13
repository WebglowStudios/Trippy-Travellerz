"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface DestinationItem {
  name: string;
  slug: string;
  tagline?: string;
  image: string;
}

const fallbackDestinations: DestinationItem[] = [
  {
    name: "Kashmir",
    slug: "kashmir",
    tagline: "Snowy Valleys, Timeless Beauty",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Varanasi",
    slug: "varanasi",
    tagline: "Spiritual Journeys",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Kerala",
    slug: "kerala",
    tagline: "Backwaters & Beaches",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Ladakh",
    slug: "ladakh",
    tagline: "Land of High Passes",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Andaman",
    slug: "andaman",
    tagline: "Tropical Paradise",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop",
  },
];

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<DestinationItem[]>(fallbackDestinations);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await api.get("/destinations?limit=8");
        if (res.status === "success" && res.data && res.data.length > 0) {
          const mapped = res.data.map((d: any, idx: number) => ({
            name: d.name,
            slug: d.slug,
            tagline: d.shortDescription || d.description || "Breathtaking Escapes",
            image: d.heroImage || d.images?.[0] || fallbackDestinations[idx % fallbackDestinations.length].image,
          }));
          setDestinations(mapped);
        }
      } catch {
        // Fallback to static items
      }
    }
    fetchDestinations();
  }, []);

  const scrollLeft = () => {
    gridRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    gridRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="destinations-section" id="destinations">
      <div className="container">
        <div className="section-head-row">
          <div>
            <span className="section-eyebrow">POPULAR DESTINATIONS</span>
            <h2 className="section-h2">
              Places That
              <br />
              Stay With You
            </h2>
          </div>
          <div className="section-actions">
            <Link href="/destinations" className="link-view-all">
              <span>View All Destinations</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <div className="slider-arrow-btns">
              <button className="nav-arrow-btn" aria-label="Previous" onClick={scrollLeft}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="nav-arrow-btn" aria-label="Next" onClick={scrollRight}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Destinations Grid */}
        <div className="dest-cards-grid" id="destGrid" ref={gridRef}>
          {destinations.map((dest, i) => (
            <Link
              key={dest.slug || i}
              href={`/destinations/${dest.slug}`}
              className="dest-card-box"
              style={{ display: "block", textDecoration: "none" }}
            >
              <img src={dest.image} alt={dest.name} loading="lazy" />
              <div className="dest-gradient" />
              <div className="dest-meta">
                <div>
                  <h3 className="dest-name">{dest.name}</h3>
                  <p className="dest-tagline">{dest.tagline}</p>
                </div>
                <div className="dest-circle-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
