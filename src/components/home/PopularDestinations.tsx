"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
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

  const getCardStep = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 300;
    const firstCard = el.querySelector(".dest-card-box") as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const computedStyle = window.getComputedStyle(el);
      const gap = parseFloat(computedStyle.gap || computedStyle.columnGap) || 20;
      return cardWidth + gap;
    }
    return 300;
  }, []);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = getCardStep();
    const newIndex = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(destinations.length - 1, Math.max(0, newIndex)));
  }, [destinations.length, getCardStep]);

  const scrollNext = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = getCardStep();
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 25) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const currentIndex = Math.round(el.scrollLeft / step);
      const targetScroll = Math.min(maxScroll, (currentIndex + 1) * step);
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }, [getCardStep]);

  const scrollPrev = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = getCardStep();
    if (el.scrollLeft <= 25) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      const currentIndex = Math.round(el.scrollLeft / step);
      const targetScroll = Math.max(0, (currentIndex - 1) * step);
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }, [getCardStep]);

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const step = getCardStep();
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  // Step-by-step card auto-slide (moves one card at a time with a pause between, pauses on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        scrollNext();
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [scrollNext]);

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
                aria-label="Previous Destination"
                title="Previous Destination"
                onClick={scrollPrev}
                type="button"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="nav-arrow-btn"
                aria-label="Next Destination"
                title="Next Destination"
                onClick={scrollNext}
                type="button"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Card-by-Card Destination Carousel with snap & dots */}
        <div
          className="dest-infinite-carousel-wrap rv delay-1"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          onTouchStart={() => {
            isHoveredRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isHoveredRef.current = false;
            }, 2500);
          }}
        >
          <div
            className="dest-cards-infinite-track"
            id="destInfiniteTrack"
            ref={trackRef}
            onScroll={handleScroll}
          >
            {destinations.map((dest, i) => (
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

          {/* Carousel Dots Navigation */}
          <div className="carousel-dots-row">
            {destinations.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`carousel-dot-btn ${idx === activeIndex ? "active" : ""}`}
                aria-label={`Jump to destination ${idx + 1}`}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
