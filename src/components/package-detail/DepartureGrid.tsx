"use client";

import React, { useMemo } from "react";

export interface Departure {
  _id: string;
  startDate: string;
  endDate?: string;
  totalSlots: number;
  bookedSlots?: number;
  status?: string;
  priceCategory?: string;
  price: number;
}

interface DepartureGridProps {
  departures: Departure[];
  originalPrice?: number;
  selectedDepartureId?: string;
  onSelectSlot: (departureId: string) => void;
}

export default function DepartureGrid({
  departures,
  originalPrice,
  selectedDepartureId,
  onSelectSlot,
}: DepartureGridProps) {
  // Sort departures chronologically by start date
  const sortedDepartures = useMemo(() => {
    return [...departures].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }, [departures]);

  // Group by Month and Year (e.g., "Nov 2026")
  const groupedDepartures = useMemo(() => {
    const groups: { [key: string]: Departure[] } = {};
    sortedDepartures.forEach((dep) => {
      if (!dep.startDate) return;
      const d = new Date(dep.startDate);
      const monthYear = d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(dep);
    });
    return groups;
  }, [sortedDepartures]);

  if (departures.length === 0) {
    return (
      <div
        style={{
          padding: "36px 20px",
          textAlign: "center",
          background: "#FAF7F2",
          borderRadius: "var(--radius-lg, 16px)",
          border: "1px dashed var(--border-warm, #EAE3D8)",
          marginBottom: 32,
        }}
      >
        <span
          className="material-symbols-rounded"
          style={{ fontSize: 36, color: "var(--brand-ochre, #8E5F32)", marginBottom: 8, display: "block" }}
        >
          event_busy
        </span>
        <h4 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark, #2C1810)", margin: "0 0 4px" }}>
          No Scheduled Fixed Batches
        </h4>
        <p style={{ color: "var(--text-muted, #7A6960)", fontSize: 13.5, margin: 0 }}>
          This tour is available on flexible bespoke dates. Inquire via the panel to customize your schedule.
        </p>
      </div>
    );
  }

  return (
    <div
      className="departure-grid-container"
      style={{
        background: "#FFFFFF",
        borderRadius: "var(--radius-lg, 20px)",
        border: "1.5px solid var(--border-warm, #EAE3D8)",
        padding: "28px 24px",
        boxShadow: "var(--shadow-soft, 0 4px 20px rgba(88,55,30,0.06))",
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 22, borderBottom: "1px solid var(--border-light, #F4ECE1)", paddingBottom: 16 }}>
        <div>
          <span className="cursive" style={{ fontSize: 18, color: "var(--brand-ochre, #8E5F32)", display: "block", marginBottom: 2 }}>
            Group Travel Schedules
          </span>
          <h3 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 700, color: "var(--text-dark, #2C1810)", margin: 0 }}>
            Upcoming Fixed Departures{" "}
            <span style={{ color: "var(--brand-ochre, #8E5F32)", fontWeight: 400, fontSize: 17 }}>
              ({departures.length} Batches)
            </span>
          </h3>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted, #7A6960)", margin: 0 }}>
          Select your departure batch to lock in preferred rates and reserve confirmed slots.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {Object.entries(groupedDepartures).map(([monthYear, deps]) => {
          const [month, year] = monthYear.split(" ");
          return (
            <div
              key={monthYear}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {/* Month Header Pill */}
              <div
                style={{
                  background: "var(--brand-brown, #58371E)",
                  color: "#FAF7F2",
                  borderRadius: 12,
                  padding: "10px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 70,
                  boxShadow: "0 2px 8px rgba(88,55,30,0.15)",
                  flexShrink: 0,
                }}
              >
                <span className="serif" style={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
                  {month}
                </span>
                <span style={{ fontSize: 11, opacity: 0.85, fontWeight: 500 }}>{year}</span>
              </div>

              {/* Batches Grid */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, flex: 1 }}>
                {deps.map((dep) => {
                  const d = new Date(dep.startDate);
                  const dayOfWeek = d.toLocaleDateString("en-IN", { weekday: "short" }).toUpperCase();
                  const dateNum = d.getDate();
                  const isSelected = selectedDepartureId === String(dep._id);
                  const isSoldOut =
                    dep.status === "sold-out" ||
                    dep.status === "completed" ||
                    (dep.totalSlots > 0 && (dep.bookedSlots || 0) >= dep.totalSlots);
                  const priceToUse = dep.price > 0 ? dep.price : originalPrice || 0;
                  const slotsLeft =
                    dep.totalSlots > 0 ? Math.max(0, dep.totalSlots - (dep.bookedSlots || 0)) : null;

                  // Savings computation
                  let savings = 0;
                  if (originalPrice && originalPrice > priceToUse) {
                    savings = originalPrice - priceToUse;
                  }

                  return (
                    <button
                      key={dep._id}
                      type="button"
                      onClick={() => !isSoldOut && onSelectSlot(dep._id)}
                      disabled={isSoldOut}
                      className={`dep-slot-card ${isSelected ? "selected" : ""}`}
                      style={{
                        background: isSelected ? "#FAF6F0" : "#FFFFFF",
                        border: `1.5px solid ${isSelected ? "var(--brand-brown, #58371E)" : "var(--border-warm, #EAE3D8)"}`,
                        borderRadius: 12,
                        minWidth: 96,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: isSoldOut ? "not-allowed" : "pointer",
                        opacity: isSoldOut ? 0.55 : 1,
                        transition: "all 0.2s ease",
                        position: "relative",
                        padding: 0,
                        boxShadow: isSelected ? "0 4px 14px rgba(88,55,30,0.18)" : "0 2px 6px rgba(0,0,0,0.02)",
                      }}
                    >
                      {/* Day of Week Top Bar */}
                      <div
                        style={{
                          width: "100%",
                          padding: "5px 0",
                          background: isSelected ? "var(--brand-brown, #58371E)" : "#F4ECE1",
                          color: isSelected ? "#FFFFFF" : "var(--brand-brown, #58371E)",
                          borderBottom: "1px solid var(--border-warm, #EAE3D8)",
                          fontSize: 10.5,
                          fontWeight: 700,
                          textAlign: "center",
                          letterSpacing: 0.8,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {dayOfWeek}
                      </div>

                      {/* Main Date & Price Body */}
                      <div style={{ padding: "8px 10px", textAlign: "center", width: "100%" }}>
                        <div
                          className="serif"
                          style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: "var(--text-dark, #2C1810)",
                            lineHeight: 1,
                            marginBottom: 4,
                          }}
                        >
                          {dateNum < 10 ? `0${dateNum}` : dateNum}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--brand-brown, #58371E)",
                            marginBottom: slotsLeft !== null && !isSoldOut ? 4 : 0,
                          }}
                        >
                          ₹{priceToUse.toLocaleString("en-IN")}
                        </div>

                        {slotsLeft !== null && !isSoldOut && (
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: slotsLeft <= 3 ? "#D32F2F" : "#2E7D32",
                            }}
                          >
                            {slotsLeft} {slotsLeft === 1 ? "seat left" : "seats left"}
                          </div>
                        )}
                      </div>

                      {/* Status / Discount Footer Pill */}
                      {isSoldOut ? (
                        <div
                          style={{
                            width: "100%",
                            padding: "3px 0",
                            background: "#FEE2E2",
                            color: "#B91C1C",
                            fontSize: 9.5,
                            fontWeight: 800,
                            textAlign: "center",
                            textTransform: "uppercase",
                          }}
                        >
                          Sold Out
                        </div>
                      ) : isSelected ? (
                        <div
                          style={{
                            width: "100%",
                            padding: "3px 0",
                            background: "var(--brand-brown, #58371E)",
                            color: "#FAF7F2",
                            fontSize: 9.5,
                            fontWeight: 800,
                            textAlign: "center",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          ✓ Selected
                        </div>
                      ) : savings > 0 ? (
                        <div
                          style={{
                            width: "100%",
                            padding: "3px 0",
                            background: "#FEF3C7",
                            color: "#92400E",
                            fontSize: 9.5,
                            fontWeight: 800,
                            textAlign: "center",
                          }}
                        >
                          Save ₹{savings.toLocaleString("en-IN")}
                        </div>
                      ) : dep.status === "filling-fast" ? (
                        <div
                          style={{
                            width: "100%",
                            padding: "3px 0",
                            background: "#FFEDD5",
                            color: "#C2410C",
                            fontSize: 9.5,
                            fontWeight: 800,
                            textAlign: "center",
                          }}
                        >
                          Filling Fast
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .dep-slot-card:hover:not(:disabled) {
          border-color: var(--brand-brown, #58371E);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(88, 55, 30, 0.12);
        }
      `}</style>
    </div>
  );
}
