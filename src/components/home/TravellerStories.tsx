"use client";

import { useRef } from "react";

interface Testimonial {
  name: string;
  trip: string;
  quote: string;
  avatar: string;
  stars: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rohan Mehta",
    trip: "Traveled to Kashmir",
    quote: "“An unforgettable experience! Everything was perfectly planned and the support team was amazing.”",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
  },
  {
    name: "Priya Sharma",
    trip: "Traveled to Kerala",
    quote: "“The best trip of our lives. Beautiful destinations and seamless arrangements.”",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
  },
  {
    name: "Amit Verma",
    trip: "Traveled to Ladakh",
    quote: "“Highly professional and personalized service. Felt safe and well taken care of.”",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    stars: "★★★★★",
  },
];

export default function TravellerStories() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 320, behavior: "smooth" });
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
        <div className="stories-split-layout">
          {/* Left Column: Title & Slider Controls */}
          <div className="stories-left-header">
            <span className="section-eyebrow">TRAVELLER STORIES</span>
            <h2 className="section-h2">
              Moments That
              <br />
              Inspire Us
            </h2>
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

          {/* Right: 3 Testimonial Cards */}
          <div className="stories-cards-row" id="reviewCardsRow" ref={rowRef}>
            {testimonials.map((t) => (
              <div key={t.name} className="story-card-box">
                <div className="story-quote-symbol">“</div>
                <p className="story-quote-text">{t.quote}</p>
                <div className="story-user-row">
                  <div className="story-user-avatar">
                    <img src={t.avatar} alt={t.name} loading="lazy" />
                  </div>
                  <div className="story-user-meta">
                    <h4 className="story-user-name">{t.name}</h4>
                    <p className="story-user-trip">{t.trip}</p>
                    <div className="story-user-stars">{t.stars}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
