"use client";

import { useState } from "react";
import { ShowcaseDestination } from "@/lib/showcase-destinations";

interface DestinationTravelGuideProps {
  destination: ShowcaseDestination;
  onOpenEnquiry: () => void;
}

export default function DestinationTravelGuide({ destination, onOpenEnquiry }: DestinationTravelGuideProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const defaultTips = [
    {
      question: `What is the best time of year to visit ${destination.name}?`,
      answer: `The ideal season to explore ${destination.name} is ${destination.bestSeason}. During these months, you'll experience comfortable temperatures, minimal rainfall, and ideal conditions for sightseeing and outdoor excursions.`,
    },
    {
      question: `How does the visa process work for Indian travelers?`,
      answer: `For ${destination.name}, Indian passport holders enjoy ${destination.visaType === "free" ? "Visa-Free entry for up to 30–60 days" : destination.visaType === "on-arrival" ? "Visa on Arrival upon arrival at the international airport" : "an expedited electronic tourist eVisa processed online within 2–4 working days"}. Our team assists you with complete document checklists and verification.`,
    },
    {
      question: `What currency should I carry, and do credit cards work?`,
      answer: `The official currency is ${destination.currency}. International credit and debit cards (Visa & Mastercard) are widely accepted across luxury hotels, fine dining, and major shopping outlets. We recommend carrying a modest amount of local currency for tips and traditional souks/markets.`,
    },
    {
      question: `Are private chauffeur transfers and guides included?`,
      answer: `Yes! All Trippy Travellers signature itineraries in ${destination.name} include airport meet-and-greet, air-conditioned private vehicle transfers between stays and attractions, and expert local certified guides.`,
    },
  ];

  const tipsList = destination.travelTips && destination.travelTips.length > 0
    ? destination.travelTips
    : defaultTips;

  return (
    <section className="dest-section-wrap" id="travel-guide">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: 40, alignItems: "start" }}>
          {/* Left Column: FAQ Accordion */}
          <div>
            <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
              Practical Insider Knowledge
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 700, color: "var(--text-dark)", margin: "0 0 16px" }}>
              {destination.name} Travel Designer Guide
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6, marginBottom: 28 }}>
              Everything you need to know before packing your bags — from visa guidelines and weather patterns to local customs.
            </p>

            <div className="dest-faq-list">
              {tipsList.map((tip, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className={`dest-faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="dest-faq-btn"
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)", textAlign: "left" }}>
                        {tip.question}
                      </span>
                      <span className="material-symbols-rounded dest-faq-chevron">
                        {isOpen ? "remove" : "add"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="dest-faq-answer">
                        <p style={{ fontSize: 13.5, color: "var(--text-body)", lineHeight: 1.65, margin: 0 }}>
                          {tip.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Mascot Bubble & Concierge Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Mascot Recommendation Bubble */}
            <div className="dest-mascot-card">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div className="dest-mascot-avatar">
                  <span className="material-symbols-rounded">travel_explore</span>
                </div>
                <div>
                  <h4 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                    Insider Specialist Tip
                  </h4>
                  <span style={{ fontSize: 12, color: "var(--brand-ochre)", fontWeight: 600 }}>
                    Trippy Concierge Recommendation
                  </span>
                </div>
              </div>

              <div className="dest-thought-bubble">
                <p style={{ fontSize: 13.5, color: "var(--brand-brown)", lineHeight: 1.6, margin: 0 }}>
                  &ldquo;For {destination.name}, we strongly recommend booking your flights and premier sunset excursion slots at least 3 to 4 weeks ahead during peak season ({destination.bestSeason}). Let us know if you need complimentary early check-in arranged!&rdquo;
                </p>
              </div>
            </div>

            {/* Custom Trip Callout Card */}
            <div className="dest-bespoke-box">
              <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--brand-ochre)", marginBottom: 10 }}>
                villa
              </span>
              <h4 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 8px" }}>
                Need a Custom {destination.name} Plan?
              </h4>
              <p style={{ fontSize: 13.5, color: "var(--text-body)", lineHeight: 1.55, margin: "0 0 20px" }}>
                Traveling with family, on honeymoon, or prefer specific boutique resorts? Our designers will craft a private day-by-day quote within 24 hours.
              </p>
              <button
                type="button"
                className="btn-dest-request-quote"
                onClick={onOpenEnquiry}
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
