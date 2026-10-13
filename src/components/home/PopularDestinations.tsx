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
    tagline: "Spiritual Ghats & Timeless Rituals",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Kerala",
    slug: "kerala",
    tagline: "Backwaters, Palms & Houseboats",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Ladakh",
    slug: "ladakh",
    tagline: "High Passes & Crystal Lakes",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Andaman",
    slug: "andaman",
    tagline: "Tropical White Sand & Coral Reefs",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Dubai",
    slug: "dubai",
    tagline: "Futuristic Luxury & Desert Safaris",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Bali",
    slug: "bali",
    tagline: "Emerald Terraces & Sacred Temples",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    tagline: "Royal Palaces & Golden Sands",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80&auto=format&fit=crop",
  },
];

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<DestinationItem[]>(fallbackDestinations);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await api.get("/destinations?limit=12");
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

  // Continuous infinite gliding loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    const speed = 0.85; // Pixels per frame

    const step = () => {
      if (track && !isHoveredRef.current) {
        track.scrollLeft += speed;
        // Halfway reset for seamless infinite loop
        const halfWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [destinations]);

  const scrollLeft = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Duplicated for seamless infinite ticker glide
  const doubledDestinations = [...destinations, ...destinations];

  return (
    <section className="destinations-section" id="destinations">
      <div className="container">
        <div className="section-head-row rv">
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
              <button
                className="nav-arrow-btn"
                aria-label="Previous Destinations"
                title="Previous"
                onClick={scrollLeft}
                type="button"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="nav-arrow-btn"
                aria-label="Next Destinations"
                title="Next"
                onClick={scrollRight}
                type="button"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Infinite Spinning Carousel Track with hover pause */}
        <div
          className="dest-infinite-carousel-wrap rv delay-1"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
        >
          <div
            className="dest-cards-infinite-track"
            id="destInfiniteTrack"
            ref={trackRef}
          >
            {doubledDestinations.map((dest, i) => (
              <Link
                key={`${dest.slug}-${i}`}
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
      </div>
    </section>
  );
}
