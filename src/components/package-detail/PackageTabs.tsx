"use client";

import { useState } from "react";

interface PackageTabsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pkg: any;
  onOpenLightbox?: (imgUrl: string) => void;
}

function cleanItemText(raw: string): string {
  if (!raw) return "";
  return String(raw)
    .replace(/\\u0026amp;/gi, "&")
    .replace(/\\u0026/gi, "&")
    .replace(/&amp;/gi, "&")
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\\r\\n|\\n|\\r/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/^[•\-\*\s–—:]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeList(list: any[]): string[] {
  if (!Array.isArray(list)) return [];
  const res: string[] = [];
  for (const item of list) {
    if (!item) continue;
    const parts = String(item).split(/\\r\\n|\\n|\\r|[\r\n]+/);
    for (const p of parts) {
      const cleaned = cleanItemText(p);
      if (cleaned.length > 2) {
        res.push(cleaned);
      }
    }
  }
  return Array.from(new Set(res));
}

function parseBulletPoints(text: string | null | undefined): { isList: boolean; items: string[] } {
  if (!text) return { isList: false, items: [] };

  const raw = String(text).trim();
  if (!raw) return { isList: false, items: [] };

  const hasBulletChar = /[•●▪■]/.test(raw);
  const hasNewlines = raw.includes("\n") || raw.includes("\\n");

  if (!hasBulletChar && !hasNewlines) {
    return { isList: false, items: [raw] };
  }

  const parts = raw
    .split(/(?:\s*[•●▪■]\s*|\\r\\n|\\n|\\r|[\r\n]+)/)
    .map((s) => cleanItemText(s))
    .filter((s) => s.length > 2);

  if (parts.length > 1 || (parts.length === 1 && (hasBulletChar || raw.startsWith("•")))) {
    return { isList: true, items: parts };
  }

  return { isList: false, items: [raw] };
}

export default function PackageTabs({ pkg, onOpenLightbox }: PackageTabsProps) {
  const [activeTab, setActiveTab] = useState<"itinerary" | "activities" | "flights" | "stay" | "transfers" | "policies">("itinerary");
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({ "day-0": true, "stay-0": true, "trans-0": true, "flight-0": true, "pol-0": true });
  const [heroImgIdx, setHeroImgIdx] = useState(0);
  const [daySliderIndices, setDaySliderIndices] = useState<Record<number, number>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const itinerary = pkg?.itinerary || [];
  const activities = pkg?.activities || [];
  const stays = pkg?.stays || [];
  const transfers = pkg?.transfers || [];
  const flights = pkg?.flights || [];
  const inclusions = sanitizeList(pkg?.inclusions);
  const exclusions = sanitizeList(pkg?.exclusions);
  const duration = pkg?.duration || { nights: 7, days: 8 };
  const destinationName = pkg?.destination?.name || pkg?.customDestinationText || "Dubai & UAE";

  // Image pool for the Itinerary Hero Banner
  const heroImages = [
    pkg?.heroImage,
    ...(pkg?.images || []),
    ...(pkg?.destinationImages || []),
  ].filter(Boolean) as string[];

  const safeHeroImages = heroImages.length > 0 ? heroImages : [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80",
    "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1400&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=80",
  ];

  const handleHeroNav = (dir: number) => {
    setHeroImgIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return safeHeroImages.length - 1;
      if (next >= safeHeroImages.length) return 0;
      return next;
    });
  };

  const handleDaySlide = (dayIdx: number, dir: number, total: number) => {
    setDaySliderIndices((prev) => {
      const current = prev[dayIdx] || 0;
      let next = current + dir;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      return { ...prev, [dayIdx]: next };
    });
  };

  return (
    <div className="pkg-tabs-container">
      {/* 6 Tabs Bar */}
      <div className="pkg-tabs-bar" role="tablist">
        <button
          className={`pkg-tab ${activeTab === "itinerary" ? "active" : ""}`}
          onClick={() => setActiveTab("itinerary")}
          role="tab"
          type="button"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>calendar_month</span>
          Itinerary ({itinerary.length || duration.days} Days)
        </button>
        <button
          className={`pkg-tab ${activeTab === "activities" ? "active" : ""}`}
          onClick={() => setActiveTab("activities")}
          role="tab"
          type="button"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>hiking</span>
          Activities
        </button>
        <button
          className={`pkg-tab ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
          role="tab"
          type="button"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>flight</span>
          Flights
        </button>
        <button
          className={`pkg-tab ${activeTab === "stay" ? "active" : ""}`}
          onClick={() => setActiveTab("stay")}
          role="tab"
          type="button"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>hotel</span>
          Stay ({pkg?.hotelRating || "5★"})
        </button>
        <button
          className={`pkg-tab ${activeTab === "transfers" ? "active" : ""}`}
          onClick={() => setActiveTab("transfers")}
          role="tab"
          type="button"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>directions_car</span>
          Transfers
        </button>
        <button
          className={`pkg-tab ${activeTab === "policies" ? "active" : ""}`}
          onClick={() => setActiveTab("policies")}
          role="tab"
          type="button"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>policy</span>
          Policies
        </button>
      </div>

      {/* =========================================================================
          TAB 1: ITINERARY
          ========================================================================= */}
      {activeTab === "itinerary" && (
        <div className="pkg-tab-panel active">
          {/* Itinerary Hero Banner */}
          <div className="itin-hero">
            <img
              className="itin-hero-img"
              src={safeHeroImages[heroImgIdx]}
              alt={`Itinerary - ${destinationName}`}
            />
            <div className="itin-hero-overlay" />
            <div className="itin-hero-caption">
              <div className="days-num">{duration?.days || itinerary.length} Days</div>
              <div className="days-text">Bespoke Journey across {destinationName}</div>
            </div>
            {safeHeroImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="itin-hero-btn prev"
                  onClick={() => handleHeroNav(-1)}
                  aria-label="Previous image"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 22 }}>chevron_left</span>
                </button>
                <button
                  type="button"
                  className="itin-hero-btn next"
                  onClick={() => handleHeroNav(1)}
                  aria-label="Next image"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 22 }}>chevron_right</span>
                </button>
                <span className="itin-hero-ctr">
                  {heroImgIdx + 1} / {safeHeroImages.length}
                </span>
              </>
            )}
          </div>

          {/* Day-by-Day Accordions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {itinerary.map((day: any, idx: number) => {
              const dayKey = `day-${idx}`;
              const isOpen = !!openAccordions[dayKey];
              const dayImgs = (day.images && day.images.length > 0) ? day.images : safeHeroImages.slice(0, 3);
              const currentSlide = daySliderIndices[idx] || 0;

              return (
                <div key={idx} className={`acc-item ${isOpen ? "open" : ""}`} id={`acc-itin-${idx + 1}`}>
                  <button
                    type="button"
                    className="acc-header"
                    onClick={() => toggleAccordion(dayKey)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span className="acc-badge day">Day {day.day || idx + 1}</span>
                      <span className="acc-title">{day.title || `Day ${day.day || idx + 1} Exploration`}</span>
                    </div>
                    <div className="acc-icon-wrap">
                      <span className="material-symbols-rounded">add</span>
                    </div>
                  </button>

                  <div className="acc-body">
                    <div className="acc-content">
                      <div className="acc-inner">
                        {/* Day flight snippet if day is 1 and flights exist */}
                        {idx === 0 && flights.length > 0 && (
                          <div className="flight-ticket-box">
                            <div className="flight-ticket-head">
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--brand-brown)" }}>flight_takeoff</span>
                                <strong style={{ color: "var(--text-dark)" }}>{flights[0].airline || "Direct Flight"} {flights[0].flightNumber || ""}</strong>
                              </div>
                              <span style={{ fontSize: 11, fontWeight: 700, background: "#EAE3D8", color: "var(--brand-brown)", padding: "3px 10px", borderRadius: 9999 }}>Included</span>
                            </div>
                            <div className="flight-route-box">
                              <div>
                                <span style={{ fontSize: 10, textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>Departure</span>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)" }}>{flights[0].departure || "Morning"}</div>
                                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{flights[0].from || "Origin"}</div>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>Non-stop</span>
                                <div style={{ width: 90, height: 1.5, background: "var(--border-warm)", position: "relative", margin: "4px auto" }}>
                                  <div style={{ position: "absolute", right: 0, top: -3, width: 7, height: 7, borderRadius: "50%", background: "var(--brand-ochre)" }} />
                                </div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <span style={{ fontSize: 10, textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>Arrival</span>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)" }}>{flights[0].arrival || "Afternoon"}</div>
                                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{flights[0].to || destinationName}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Description / Structured Bullet Points */}
                        {(() => {
                          const descText = day.description || "Embark on an extraordinary journey exploring the cultural highlights, natural wonders, and bespoke hospitality of this destination.";
                          const { isList, items } = parseBulletPoints(descText);

                          if (isList && items.length > 1) {
                            return (
                              <ul style={{ display: "flex", flexDirection: "column", gap: 9, margin: "8px 0 16px", padding: 0, listStyle: "none" }}>
                                {items.map((pt: string, pIdx: number) => (
                                  <li key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--text-body)", lineHeight: 1.65 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand-ochre)", flexShrink: 0, marginTop: 7 }} />
                                    <span style={{ flex: 1, minWidth: 0 }}>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            );
                          }

                          return (
                            <p style={{ marginBottom: 14, fontSize: 14.5, lineHeight: 1.7, color: "var(--text-body)" }}>
                              {items[0] || descText}
                            </p>
                          );
                        })()}

                        {/* Day Photo Slider */}
                        {dayImgs.length > 0 && (
                          <div className="day-sl-wrap">
                            <div
                              className="day-sl-track"
                              style={{ transform: `translateX(-${currentSlide * 50}%)` }}
                            >
                              {dayImgs.map((img: string, imgI: number) => (
                                <div key={imgI} className="day-sl-card">
                                  <img
                                    src={img}
                                    alt={`${day.title} - ${imgI + 1}`}
                                    className="day-sl-img"
                                    onClick={() => onOpenLightbox?.(img)}
                                  />
                                  <div className="day-sl-label">
                                    {day.title || `Day ${idx + 1} Highlights`}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {dayImgs.length > 1 && (
                              <>
                                <button
                                  type="button"
                                  className="day-sl-btn prev"
                                  onClick={() => handleDaySlide(idx, -1, dayImgs.length)}
                                  aria-label="Previous"
                                >
                                  <span className="material-symbols-rounded">chevron_left</span>
                                </button>
                                <button
                                  type="button"
                                  className="day-sl-btn next"
                                  onClick={() => handleDaySlide(idx, 1, dayImgs.length)}
                                  aria-label="Next"
                                >
                                  <span className="material-symbols-rounded">chevron_right</span>
                                </button>
                                <span className="day-sl-ctr">
                                  {currentSlide + 1} / {dayImgs.length}
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Activities List */}
                        {day.activities && day.activities.length > 0 && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                            {day.activities.map((act: any, actI: number) => (
                              <div key={actI} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--brand-ochre)", flexShrink: 0, marginTop: 7 }} />
                                <div>
                                  <strong>{typeof act === "string" ? act : act.title}:</strong>
                                  {typeof act !== "string" && act.description && (() => {
                                    const { isList, items } = parseBulletPoints(act.description);
                                    if (isList && items.length > 1) {
                                      return (
                                        <ul style={{ display: "flex", flexDirection: "column", gap: 6, margin: "6px 0 0", padding: 0, listStyle: "none" }}>
                                          {items.map((pt: string, pIdx: number) => (
                                            <li key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>
                                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brand-ochre)", flexShrink: 0, marginTop: 7 }} />
                                              <span style={{ flex: 1, minWidth: 0 }}>{pt}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      );
                                    }
                                    return <span style={{ color: "var(--text-body)" }}> {items[0] || act.description}</span>;
                                  })()}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Mascot Recommendations Thought Bubble */}
                        <div className="bubble-wrapper">
                          <div className="bubble-card">
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                              <span style={{ fontSize: 18 }}>💭</span>
                              <span style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-brown)", textTransform: "uppercase", letterSpacing: 1 }}>
                                Local Storyteller Tip for this Day
                              </span>
                            </div>
                            <ul style={{ margin: "0 0 12px 0", paddingLeft: 18, color: "var(--brand-ochre)" }}>
                              {(day.recommendations && day.recommendations.length > 0) ? (
                                day.recommendations.map((rec: string, recI: number) => (
                                  <li key={recI} style={{ fontSize: 13.5, color: "var(--text-body)", marginBottom: 6 }}>
                                    {rec}
                                  </li>
                                ))
                              ) : (
                                <>
                                  <li style={{ fontSize: 13.5, color: "var(--text-body)", marginBottom: 6 }}>
                                    Keep your camera ready during golden hour for magical sunset perspectives.
                                  </li>
                                  <li style={{ fontSize: 13.5, color: "var(--text-body)", marginBottom: 6 }}>
                                    Ask your local concierge for secret artisan coffee spots off the usual tourist trail.
                                  </li>
                                </>
                              )}
                            </ul>
                            <div style={{ fontSize: 12, color: "var(--text-muted)", borderTop: "1px dashed var(--border-warm)", paddingTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--brand-ochre)" }}>info</span>
                              <span>Curated for leisure time & optional exploration.</span>
                            </div>
                          </div>
                          <div className="bubble-mascot-row">
                            <div className="bubble-dots-col">
                              <span className="bubble-dot-1" />
                              <span className="bubble-dot-2" />
                              <span className="bubble-dot-3" />
                              <img src="/logo.png" alt="Trippy Mascot" className="bubble-avatar" />
                            </div>
                            <div style={{ marginTop: 36 }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-brown)", fontStyle: "italic" }}>
                                Curated by Trippy Travellers Specialist
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Inclusions Footnote */}
                        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border-light)", display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13, color: "var(--text-muted)" }}>
                          {day.meals && day.meals.length > 0 && (
                            <span><strong style={{ color: "var(--text-dark)" }}>Meals:</strong> {Array.isArray(day.meals) ? day.meals.join(", ") : day.meals}</span>
                          )}
                          {day.accommodation && (
                            <span><strong style={{ color: "var(--text-dark)" }}>Stay:</strong> {day.accommodation}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End of Trip Calligraphic Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, margin: "36px 0 12px" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, var(--border-warm))" }} />
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 36, fontWeight: 700, color: "var(--brand-brown)", letterSpacing: 1 }}>
              End Of Trip
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, var(--border-warm))" }} />
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: ACTIVITIES
          ========================================================================= */}
      {activeTab === "activities" && (
        <div className="pkg-tab-panel active">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {activities.length > 0 ? (
              activities.map((act: any, i: number) => {
                const actKey = `act-${i}`;
                const isOpen = openAccordions[actKey] ?? (i === 0);
                return (
                  <div key={i} className={`acc-item ${isOpen ? "open" : ""}`}>
                    <button type="button" className="acc-header" onClick={() => toggleAccordion(actKey)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="acc-badge activity">{act.duration || "Experience"}</span>
                        <span className="acc-title">{act.title}</span>
                      </div>
                      <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
                    </button>
                    <div className="acc-body">
                      <div className="acc-content">
                        <div className="acc-inner">
                          {act.images && act.images[0] && (
                            <div style={{ height: 180, borderRadius: 12, overflow: "hidden", marginBottom: 14, border: "1px solid var(--border-warm)" }}>
                              <img src={act.images[0]} alt={act.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                          )}
                          <p>{act.description || "Immerse yourself in this signature experience with certified guides and VIP skip-the-line privileges."}</p>
                          {act.details && act.details.length > 0 && (
                            <ul style={{ marginTop: 10, paddingLeft: 18, color: "var(--text-body)" }}>
                              {act.details.map((det: string, detI: number) => (
                                <li key={detI} style={{ fontSize: 13.5, marginBottom: 4 }}>{det}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: 24, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--border-warm)", textAlign: "center", color: "var(--text-body)" }}>
                Curated sightseeing, desert excursions, and sunset tours are fully included. View Itinerary tab for day-wise breakdown.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: FLIGHTS
          ========================================================================= */}
      {activeTab === "flights" && (
        <div className="pkg-tab-panel active">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {flights.length > 0 ? (
              flights.map((f: any, i: number) => {
                const fKey = `flight-${i}`;
                const isOpen = openAccordions[fKey] ?? true;
                return (
                  <div key={i} className={`acc-item ${isOpen ? "open" : ""}`}>
                    <button type="button" className="acc-header" onClick={() => toggleAccordion(fKey)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="acc-badge flight">{i === 0 ? "Outbound" : "Inbound"}</span>
                        <span className="acc-title">{f.airline || "Flight"} {f.flightNumber ? `· ${f.flightNumber}` : ""} ({f.from} → {f.to})</span>
                      </div>
                      <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
                    </button>
                    <div className="acc-body">
                      <div className="acc-content">
                        <div className="acc-inner">
                          <div className="flight-route-box" style={{ marginBottom: 14 }}>
                            <div>
                              <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Departure</p>
                              <p style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)" }}>{f.departure || "Morning"}</p>
                              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{f.from || "Origin Airport"}</p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Non-stop</p>
                              <div style={{ width: 100, height: 1.5, background: "var(--border-warm)", position: "relative", margin: "4px auto" }}>
                                <div style={{ position: "absolute", right: 0, top: -3, width: 7, height: 7, borderRadius: "50%", background: "var(--brand-ochre)" }} />
                              </div>
                              <span style={{ fontSize: 11, color: "var(--brand-brown)", fontWeight: 600 }}>{f.airline || "Airway"}</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Arrival</p>
                              <p style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)" }}>{f.arrival || "Evening"}</p>
                              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{f.to || "Destination Airport"}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, fontSize: 13, color: "var(--text-body)" }}>
                            <span style={{ background: "var(--bg-soft-box)", padding: "5px 12px", borderRadius: 6, border: "1px solid var(--border-warm)" }}>🧳 30kg Check-in + 7kg Cabin</span>
                            <span style={{ background: "var(--bg-soft-box)", padding: "5px 12px", borderRadius: 6, border: "1px solid var(--border-warm)" }}>🍽 In-flight Meals Included</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: 28, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--border-warm)", textAlign: "center" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--brand-ochre)", marginBottom: 8 }}>flight</span>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)", marginBottom: 6 }}>Custom Flight Bookings</h4>
                <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 520, margin: "0 auto" }}>
                  Flight bookings can be added from your preferred home city (Mumbai, Delhi, Bangalore, etc.) with group rates or premium cabin upgrades. Contact our concierge during booking.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: STAY
          ========================================================================= */}
      {activeTab === "stay" && (
        <div className="pkg-tab-panel active">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stays.length > 0 ? (
              stays.map((s: any, i: number) => {
                const sKey = `stay-${i}`;
                const isOpen = openAccordions[sKey] ?? (i === 0);
                const stayImg = (pkg?.stayImages && pkg?.stayImages[i]) || safeHeroImages[i % safeHeroImages.length];

                return (
                  <div key={i} className={`acc-item ${isOpen ? "open" : ""}`}>
                    <button type="button" className="acc-header" onClick={() => toggleAccordion(sKey)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="acc-badge stay">{s.nights ? `${s.nights} Nights` : "Stay"}</span>
                        <span className="acc-title">{s.name} ({s.rating || pkg?.hotelRating || "5-Star"})</span>
                      </div>
                      <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
                    </button>
                    <div className="acc-body">
                      <div className="acc-content">
                        <div className="acc-inner">
                          <div style={{ height: 210, borderRadius: 14, overflow: "hidden", marginBottom: 16, border: "1px solid var(--border-warm)" }}>
                            <img src={stayImg} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <p style={{ marginBottom: 12 }}>
                            <strong>{s.roomType || "Deluxe Suite"}:</strong> {s.address || "Centrally positioned luxury property with private swimming pools, wellness spa, and gourmet culinary pavilions."}
                          </p>
                          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                            ✓ Daily buffet breakfast included · Free High-speed Wi-Fi · 24-hr In-room concierge
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: 24, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--border-warm)", textAlign: "center", color: "var(--text-body)" }}>
                5-Star luxury hotels and premium boutique resorts are selected for your journey. Details are provided upon booking confirmation.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: TRANSFERS
          ========================================================================= */}
      {activeTab === "transfers" && (
        <div className="pkg-tab-panel active">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {transfers.length > 0 ? (
              transfers.map((tr: any, i: number) => {
                const trKey = `trans-${i}`;
                const isOpen = openAccordions[trKey] ?? true;
                return (
                  <div key={i} className={`acc-item ${isOpen ? "open" : ""}`}>
                    <button type="button" className="acc-header" onClick={() => toggleAccordion(trKey)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="acc-badge transfer">{tr.transferType || "Private AC Car"}</span>
                        <span className="acc-title">{tr.title || "Chauffeur Transfer"}</span>
                      </div>
                      <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
                    </button>
                    <div className="acc-body">
                      <div className="acc-content">
                        <div className="acc-inner">
                          <div className="route-visual">
                            <div className="route-spine">
                              <div className="route-dot" />
                              <div className="route-line" />
                              <div className="route-dot solid" />
                            </div>
                            <div className="route-cards">
                              <div className="route-card">
                                <div className="route-tag">Origin</div>
                                <div className="route-loc">
                                  <span className="material-symbols-rounded" style={{ color: "var(--brand-ochre)" }}>location_on</span>
                                  {tr.from || "Airport / Hotel Pickup"}
                                </div>
                              </div>
                              <div className="route-card">
                                <div className="route-tag">Destination</div>
                                <div className="route-loc">
                                  <span className="material-symbols-rounded" style={{ color: "var(--brand-ochre)" }}>location_on</span>
                                  {tr.to || "Resort / Sightseeing Hub"}
                                </div>
                              </div>
                            </div>
                          </div>
                          {tr.description && (
                            <p style={{ marginTop: 12, fontSize: 13.5, color: "var(--text-muted)" }}>
                              {tr.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: 24, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--border-warm)", textAlign: "center", color: "var(--text-body)" }}>
                Private AC luxury vehicles (Mercedes-Benz, Toyota Alphard, or equivalent) provide seamless airport and sightseeing transit throughout.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: POLICIES
          ========================================================================= */}
      {activeTab === "policies" && (
        <div className="pkg-tab-panel active">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Payment Schedule */}
            <div className="acc-item open">
              <button type="button" className="acc-header" onClick={() => toggleAccordion("pol-payment")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="acc-badge policy">Payment</span>
                  <span className="acc-title">Payment & Confirmation Schedule</span>
                </div>
                <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
              </button>
              <div className="acc-body">
                <div className="acc-content">
                  <div className="acc-inner">
                    <p>• <strong>Token Booking Deposit:</strong> 25% of total package cost required at confirmation.</p>
                    <p>• <strong>Second Installment:</strong> 50% payable 30 days prior to departure.</p>
                    <p>• <strong>Final Clearance:</strong> 100% full balance settled 15 days before flight date.</p>
                    <p>• <strong>Payment Methods:</strong> UPI, Credit/Debit Cards (Visa, Mastercard, Amex), and NEFT/RTGS Bank Transfers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Schedule */}
            <div className="acc-item">
              <button type="button" className="acc-header" onClick={() => toggleAccordion("pol-cancel")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="acc-badge policy">Cancellation</span>
                  <span className="acc-title">Cancellation & Refund Policy</span>
                </div>
                <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
              </button>
              <div className="acc-body">
                <div className="acc-content">
                  <div className="acc-inner">
                    <p>• <strong>30+ Days Prior:</strong> 10% administrative retention; 90% package cost refunded.</p>
                    <p>• <strong>15 to 29 Days Prior:</strong> 50% cancellation fee applicable across hotels and land services.</p>
                    <p>• <strong>Within 14 Days:</strong> 100% non-refundable due to guaranteed hotel room lock-in commitments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INCLUSIONS & EXCLUSIONS TABLE (Always visible across all tabs below)
          ========================================================================= */}
      <div style={{ marginTop: 36 }}>
        <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", marginBottom: 16 }}>
          Inclusions & Exclusions
        </h2>
        <table className="ie-table">
          <thead>
            <tr>
              <th className="inc-head">✓ &nbsp;What&apos;s Included</th>
              <th className="exc-head">✗ &nbsp;What&apos;s Excluded</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="inc-cell">
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                  {inclusions.length > 0 ? (
                    inclusions.map((inc: string, i: number) => (
                      <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
                        <span style={{ color: "#2E7D32", fontWeight: 700 }}>✓</span>
                        <span>{inc}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
                        <span style={{ color: "#2E7D32", fontWeight: 700 }}>✓</span>
                        <span>{duration.nights} Nights in handpicked luxury accommodation</span>
                      </li>
                      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
                        <span style={{ color: "#2E7D32", fontWeight: 700 }}>✓</span>
                        <span>Daily gourmet breakfast buffet across all hotels</span>
                      </li>
                      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
                        <span style={{ color: "#2E7D32", fontWeight: 700 }}>✓</span>
                        <span>All private transfers & airport pick-up/drop-off</span>
                      </li>
                      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
                        <span style={{ color: "#2E7D32", fontWeight: 700 }}>✓</span>
                        <span>Signature sightseeing entries & guided tours</span>
                      </li>
                    </>
                  )}
                </ul>
              </td>
              <td>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                  {exclusions.length > 0 ? (
                    exclusions.map((exc: string, i: number) => (
                      <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                        <span style={{ color: "#D94E4E", fontWeight: 700 }}>✗</span>
                        <span>{exc}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                        <span style={{ color: "#D94E4E", fontWeight: 700 }}>✗</span>
                        <span>Personal expenses, mini-bar, and laundry</span>
                      </li>
                      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                        <span style={{ color: "#D94E4E", fontWeight: 700 }}>✗</span>
                        <span>Optional adventure sports & unlisted activities</span>
                      </li>
                      <li style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                        <span style={{ color: "#D94E4E", fontWeight: 700 }}>✗</span>
                        <span>Tipping & gratuities for drivers and guides</span>
                      </li>
                    </>
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Know Before You Go & Things to Carry */}
      {(pkg?.knowBeforeYouGo?.length > 0 || pkg?.thingsToCarry?.length > 0) && (
        <div style={{ marginTop: 24, marginBottom: 28, display: "flex", flexDirection: "column", gap: 12 }}>
          {pkg?.knowBeforeYouGo?.length > 0 && (
            <div className={`acc-item ${openAccordions["kbyg"] ? "open" : ""}`}>
              <button type="button" className="acc-header" onClick={() => toggleAccordion("kbyg")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>info</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)" }}>Know Before You Go</span>
                </div>
                <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
              </button>
              <div className="acc-body">
                <div className="acc-content">
                  <div className="acc-inner">
                    <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                      {pkg.knowBeforeYouGo.map((item: string, i: number) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {pkg?.thingsToCarry?.length > 0 && (
            <div className={`acc-item ${openAccordions["ttc"] ? "open" : ""}`}>
              <button type="button" className="acc-header" onClick={() => toggleAccordion("ttc")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>backpack</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)" }}>Things to Carry</span>
                </div>
                <div className="acc-icon-wrap"><span className="material-symbols-rounded">add</span></div>
              </button>
              <div className="acc-body">
                <div className="acc-content">
                  <div className="acc-inner">
                    <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                      {pkg.thingsToCarry.map((item: string, i: number) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
