"use client";

import { useState } from "react";
import Link from "next/link";

interface DiffCard {
  id: number;
  badge: string;
  eyebrow: string;
  title: string;
  desc: string;
  photo: string;
  alt: string;
  actionText: string;
  actionType: "film" | "link";
  linkHref?: string;
}

const diffCards: DiffCard[] = [
  {
    id: 0,
    badge: "01 / Real Experiences",
    eyebrow: "TRAVEL DIFFERENTLY",
    title: "Not Just Destinations\nReal Experiences",
    desc: "Immerse in breathtaking landscapes, untouched trails and unforgettable outdoor moments crafted for genuine connection.",
    photo: "/mountain_lake.jpg",
    alt: "Emerald alpine lake surrounded by rugged mountains",
    actionText: "Watch the Film",
    actionType: "film",
  },
  {
    id: 1,
    badge: "02 / Local Experts",
    eyebrow: "AUTHENTIC PERSPECTIVES",
    title: "Travel Deeper\nWith Local Experts",
    desc: "Walk with passionate resident guides who unlock hidden alleyways, family recipes, and untold regional folklore.",
    photo: "/temple_traveler.jpg",
    alt: "Traveler in red patterned shawl admiring ancient stone temple pagoda at sunset",
    actionText: "Know Our Story",
    actionType: "link",
    linkHref: "/about",
  },
  {
    id: 2,
    badge: "03 / Tailored Stays",
    eyebrow: "HANDCRAFTED JOURNEYS",
    title: "Uncharted Paths\n& Unique Stays",
    desc: "Curated boutique heritage retreats, secluded cliffside lodges, and bespoke routes personalized to your rhythm.",
    photo: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=80&auto=format&fit=crop",
    alt: "Hot air balloons floating above Cappadocia at golden hour",
    actionText: "Explore Journeys",
    actionType: "link",
    linkHref: "/packages",
  },
];

export default function TravelDifferently() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handlePlayFilm = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Playing 4K film: Not Just Destinations Real Experiences");
  };

  return (
    <section className="experience-story-section" id="experiences">
      <div className="container">
        {/* 3-Column Expandable Cards Row */}
        <div
          className="travel-diff-row rv"
          id="travelDiffRow"
          onMouseLeave={() => setExpandedIndex(0)}
        >
          {diffCards.map((card) => {
            const isExpanded = expandedIndex === card.id;
            return (
              <div
                key={card.id}
                className={`travel-diff-card ${isExpanded ? "expanded" : ""}`}
                onMouseEnter={() => setExpandedIndex(card.id)}
              >
                <img src={card.photo} alt={card.alt} className="travel-diff-photo" />
                <div className="travel-diff-gradient" />
                <div className="travel-diff-dim" />
                <div className="travel-diff-badge">{card.badge}</div>

                <div className="travel-diff-body">
                  <span className="travel-diff-eyebrow">{card.eyebrow}</span>
                  <h3 className="travel-diff-title" style={{ whiteSpace: "pre-line" }}>
                    {card.title}
                  </h3>
                  <p className="travel-diff-desc">{card.desc}</p>

                  <div className="travel-diff-action">
                    {card.actionType === "film" ? (
                      <div className="btn-watch-film-pill" onClick={handlePlayFilm}>
                        <div className="film-circle">
                          <svg viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        <span>{card.actionText}</span>
                      </div>
                    ) : (
                      <Link href={card.linkHref || "/packages"} className="btn-diff-link">
                        <span>{card.actionText}</span>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Counter Bar Below */}
        <div className="stats-counter-strip rv delay-1">
          {/* 1. 10K+ Happy Travelers */}
          <div className="stat-badge-unit">
            <div className="stat-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div className="stat-digits">10K+</div>
              <div className="stat-caption">Happy Travelers</div>
            </div>
          </div>

          {/* 2. 4.8★ Average Rating */}
          <div className="stat-badge-unit">
            <div className="stat-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 4 14.5 9 20 9.8 16 13.8 17 19.3 12 16.5 7 19.3 8 13.8 4 9.8 9.5 9 12 4" fill="none" />
              </svg>
            </div>
            <div>
              <div className="stat-digits">4.8★</div>
              <div className="stat-caption">Average Rating</div>
            </div>
          </div>

          {/* 3. 25+ Destinations */}
          <div className="stat-badge-unit">
            <div className="stat-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="stat-digits">25+</div>
              <div className="stat-caption">Destinations</div>
            </div>
          </div>

          {/* 4. 100+ Curated Experiences */}
          <div className="stat-badge-unit">
            <div className="stat-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <div>
              <div className="stat-digits">100+</div>
              <div className="stat-caption">Curated Experiences</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
