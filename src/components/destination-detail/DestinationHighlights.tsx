"use client";

import { ShowcaseDestination } from "@/lib/showcase-destinations";

interface DestinationHighlightsProps {
  destination: ShowcaseDestination;
}

export default function DestinationHighlights({ destination }: DestinationHighlightsProps) {
  return (
    <section className="dest-section-wrap" id="highlights">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
            Unmissable Moments • {destination.name}
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--text-dark)", margin: "0 0 10px" }}>
            Iconic Experiences & Highlights
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--text-body)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Every journey with Trippy Travellers includes insider access to the experiences that define {destination.name}&apos;s soul.
          </p>
        </div>

        {/* Highlights Cards Grid */}
        <div className="dest-highlights-grid">
          {destination.highlights.map((highlight, idx) => (
            <div key={idx} className="dest-highlight-card">
              <div className="dest-highlight-number">
                0{idx + 1}
              </div>
              <div className="dest-highlight-content">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span className="material-symbols-rounded" style={{ color: "var(--brand-ochre)", fontSize: 20 }}>
                    star
                  </span>
                  <h4 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                    {highlight}
                  </h4>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                  Curated with private transfers, timed VIP entries, and specialist local storytelling.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Visit Pillars (if provided) */}
        {destination.whyVisit && destination.whyVisit.length > 0 && (
          <div className="dest-pillars-row" style={{ marginTop: 40 }}>
            {destination.whyVisit.map((item, idx) => (
              <div key={idx} className="dest-pillar-box">
                <div className="dest-pillar-icon-box">
                  <span className="material-symbols-rounded">{item.icon}</span>
                </div>
                <h4 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 6px" }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.5, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
