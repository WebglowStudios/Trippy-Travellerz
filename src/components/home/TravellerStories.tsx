"use client";

import { useEffect, useState, useRef } from "react";

interface Testimonial {
  name: string;
  trip: string;
  quote: string;
  avatar: string;
  stars: string;
  badge?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rohan Mehta",
    trip: "Traveled to Kashmir",
    quote: "“An unforgettable experience! The houseboat stay on Dal Lake and helicopter ride over Gulmarg were curated beyond expectations.”",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
    badge: "Verified Traveler",
  },
  {
    name: "Priya Sharma",
    trip: "Traveled to Kerala",
    quote: "“The private pool villa in Munnar and luxury houseboat cruise in Alleppey were pristine. Our concierge attended to every little detail.”",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
    badge: "Verified Traveler",
  },
  {
    name: "Amit Verma",
    trip: "Traveled to Ladakh",
    quote: "“Highly professional and personalized service. Driving over Khardung La with their premium support team made us feel completely safe.”",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
    badge: "Verified Traveler",
  },
  {
    name: "Ananya Iyer",
    trip: "Traveled to Dubai",
    quote: "“From the Burj Khalifa VIP lounge to the desert starlight dinner, everything was pure luxury. Truly a 5-star experience throughout.”",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
    badge: "Verified Traveler",
  },
  {
    name: "Vikramaditya Rathore",
    trip: "Traveled to Varanasi",
    quote: "“The private dawn boat tour and evening Ganga Aarti from reserved vantage points were profoundly moving. Flawless cultural curation.”",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
    badge: "Verified Traveler",
  },
  {
    name: "Neha & Siddharth",
    trip: "Traveled to Bali",
    quote: "“Our dream honeymoon come true. The private cliffside dinner in Uluwatu was something we will cherish for the rest of our lives.”",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
    badge: "Verified Traveler",
  },
];

export default function TravellerStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Duplicated for infinite continuous loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  // Continuous infinite glide ticker
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    const speed = 0.75; // Pixels per frame

    const step = () => {
      if (track && !isHoveredRef.current) {
        track.scrollLeft += speed;
        const halfWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollLeft = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section className="stories-section" id="stories">
      {/* Subtle Squiggly Contour Accent (Stories Right Margin) */}
      <div className="stories-topo-accent">
        <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path d="M20,30 C80,10 140,60 200,35 C230,20 250,45 270,30" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.6" fill="none" />
          <path d="M15,55 C75,35 135,85 195,60 C225,45 245,70 265,55" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.5" fill="none" />
          <path d="M10,80 C70,60 130,110 190,85 C220,70 240,95 260,80" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.4" fill="none" />
          <path d="M5,105 C65,85 125,135 185,110 C215,95 235,120 255,105" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.3" fill="none" />
        </svg>
      </div>

      <div className="container">
        <div className="stories-split-layout rv">
          {/* Left Column: Title & Slider Controls */}
          <div className="stories-left-header">
            <span className="section-eyebrow">TRAVELLER STORIES</span>
            <h2 className="section-h2">
              Moments That
              <br />
              Inspire Us
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-body)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              Real stories and candid memories from travelers who explored the world with us.
            </p>
            <div className="slider-arrow-btns">
              <button
                className="nav-arrow-btn"
                aria-label="Previous Review"
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
                aria-label="Next Review"
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

          {/* Right: Infinite Spinning Testimonial Carousel */}
          <div
            className="stories-infinite-wrap rv delay-1"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
          >
            <div
              className="stories-cards-infinite-track"
              id="reviewCardsInfiniteTrack"
              ref={trackRef}
            >
              {doubledTestimonials.map((t, idx) => (
                <div key={`${t.name}-${idx}`} className="story-card-box">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div className="story-quote-symbol">“</div>
                      <div className="story-user-stars" style={{ letterSpacing: 2 }}>{t.stars}</div>
                    </div>
                    <p className="story-quote-text">{t.quote}</p>
                  </div>

                  <div className="story-user-row">
                    <div className="story-user-avatar">
                      <img src={t.avatar} alt={t.name} loading="lazy" />
                    </div>
                    <div className="story-user-meta">
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <h4 className="story-user-name">{t.name}</h4>
                        <span
                          style={{
                            fontSize: "10.5px",
                            padding: "1px 6px",
                            background: "rgba(142, 95, 50, 0.1)",
                            color: "var(--brand-ochre)",
                            borderRadius: "999px",
                            fontWeight: 600,
                          }}
                        >
                          Verified
                        </span>
                      </div>
                      <p className="story-user-trip">{t.trip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
