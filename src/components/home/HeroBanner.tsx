"use client";

import Link from "next/link";

export default function HeroBanner() {
  const handleWatchStory = () => {
    alert("Playing Trippy Travellers cinematic journey...");
  };

  return (
    <section className="hero-banner-section">
      {/* Right Panoramic Scene: Santorini Cliffside Terrace & Woman in Straw Hat */}
      <div className="hero-bg-photo-wrap">
        <img
          src="/santorini_hero.jpg"
          alt="Santorini terrace overlooking caldera at golden hour"
        />
      </div>

      {/* Soft Horizontal Gradient Blend: transitions photo into warm cream canvas */}
      <div className="hero-gradient-mask" />
      <div className="hero-top-vignette" />

      {/* Subtle Squiggly Contour Accent (Hero Bottom Left) */}
      <div className="hero-topo-accent">
        <svg
          viewBox="0 0 580 380"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M-40,160 C80,120 180,240 320,180 C420,135 490,210 590,170"
            stroke="#DFCEB5"
            strokeWidth="1.3"
            opacity="0.7"
            fill="none"
          />
          <path
            d="M-40,205 C90,165 195,285 335,225 C435,180 505,255 605,215"
            stroke="#DFCEB5"
            strokeWidth="1.3"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M-40,250 C100,210 210,330 350,270 C450,225 520,300 620,260"
            stroke="#DFCEB5"
            strokeWidth="1.3"
            opacity="0.5"
            fill="none"
          />
          <path
            d="M-40,295 C110,255 225,375 365,315 C465,270 535,345 635,305"
            stroke="#DFCEB5"
            strokeWidth="1.3"
            opacity="0.4"
            fill="none"
          />
          <path
            d="M-40,340 C120,300 240,420 380,360 C480,315 550,390 650,350"
            stroke="#DFCEB5"
            strokeWidth="1.3"
            opacity="0.3"
            fill="none"
          />
          <path
            d="M70,250 C120,200 180,220 165,275 C150,320 110,300 125,255 C140,210 220,235 290,205"
            stroke="#C5A475"
            strokeWidth="1.2"
            strokeDasharray="4,5"
            fill="none"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="container hero-content-wrap">
        <div className="hero-text-col rv">
          <span className="hero-eyebrow">
            JOURNEYS BEYOND
            <br />
            THE ORDINARY
          </span>

          <h1 className="hero-heading">
            Explore
            <br />
            The World
            <br />
            <span className="differently">Differently</span>
          </h1>

          <p className="hero-subtitle">
            Curated travel experiences to breathtaking destinations, crafted for real moments.
          </p>

          <div className="hero-cta-row">
            <Link href="/destinations" className="btn-explore-dest">
              <span>Explore Destinations</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <div className="btn-watch-story" onClick={handleWatchStory}>
              <div className="play-circle-icon">
                <svg viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="watch-story-text">
                Watch
                <br />
                Our Story
              </div>
            </div>
          </div>
        </div>

        {/* Right Overlay: Handwritten "Travel Explore Belong --->" */}
        <div className="hero-handwritten-text cursive rv-r delay-2">
          Travel
          <br />
          Explore
          <br />
          Belong
          <span className="arrow-doodle">----&gt;</span>
        </div>
      </div>
    </section>
  );
}
