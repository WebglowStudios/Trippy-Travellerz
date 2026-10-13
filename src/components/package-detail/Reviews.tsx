"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface ReviewsProps {
  packageId?: string;
  rating?: number;
  reviewCount?: number;
}

const DEFAULT_REVIEWS = [
  {
    author: "Rajesh Mehta",
    tag: "Travelled in March 2026 · Verified Traveler",
    rating: 5,
    avatar: "R",
    avatarBg: "var(--brand-brown)",
    text: "Every single detail was flawless. The sunset at Burj Khalifa took our breath away, and our chauffeur was always 10 minutes early in a spotless Mercedes. The transition between Atlantis and JW Marriott was seamless. Trippy Travellers is genuinely in a class of its own!",
  },
  {
    author: "Priya & Amit Sharma",
    tag: "Honeymoon Trip · February 2026",
    rating: 5,
    avatar: "P",
    avatarBg: "var(--brand-ochre)",
    text: "We booked our honeymoon with Trippy Travellers and could not be happier. The private dessert safari dinner was magical, and Atlantis upgraded us to an ocean suite with complimentary champagne. Truly an unforgettable week!",
  },
  {
    author: "Devendra Kulkarni",
    tag: "Family Trip · January 2026",
    rating: 5,
    avatar: "D",
    avatarBg: "#2B6CB0",
    text: "Travelling with kids can be stressful, but the personalized itinerary allowed us to explore at our own comfortable pace without rush. Aquaventure was incredible. Highly recommended for premium family holidays.",
  },
];

export default function Reviews({
  packageId,
  rating = 4.9,
  reviewCount = 312,
}: ReviewsProps) {
  const [reviewsList, setReviewsList] = useState(DEFAULT_REVIEWS);

  useEffect(() => {
    if (!packageId) return;
    async function loadReviews() {
      try {
        const res = await api.get(`/reviews/package/${packageId}`);
        if (res.status === "success" && res.data && res.data.length > 0) {
          const mapped = res.data.map((r: any) => ({
            author: r.userName || r.user?.name || "Verified Traveler",
            tag: `Travelled ${r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Recently"}`,
            rating: r.rating || 5,
            avatar: (r.userName || r.user?.name || "V").charAt(0).toUpperCase(),
            avatarBg: "var(--brand-brown)",
            text: r.comment || r.review || "Wonderful experience curated by Trippy Travellers.",
          }));
          setReviewsList(mapped);
        }
      } catch {
        // Fallback
      }
    }
    loadReviews();
  }, [packageId]);

  return (
    <div style={{ marginTop: 40 }}>
      <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-dark)", marginBottom: 18 }}>
        Traveller Reviews & Ratings
      </h2>

      {/* Score Summary Box */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          background: "#FFFFFF",
          border: "1.5px solid var(--border-warm)",
          borderRadius: "var(--radius-md)",
          padding: 24,
          marginBottom: 20,
          boxShadow: "var(--shadow-soft)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center", paddingRight: 24, borderRight: "1px solid var(--border-warm)", minWidth: 120 }}>
          <div className="serif" style={{ fontSize: 48, fontWeight: 700, color: "var(--brand-brown)", lineHeight: 1 }}>
            {rating}
          </div>
          <div style={{ color: "#D9822B", letterSpacing: 1, fontSize: 16, margin: "6px 0 2px" }}>
            ★★★★★
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{reviewCount} Reviews</div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5 }}>
            <span style={{ width: 50, color: "var(--text-muted)" }}>5 stars</span>
            <div style={{ flex: 1, height: 7, borderRadius: 4, background: "#EAE3D8", overflow: "hidden" }}>
              <div style={{ width: "84%", height: "100%", background: "var(--brand-ochre)" }} />
            </div>
            <span style={{ width: 35, fontWeight: 600, textAlign: "right" }}>84%</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5 }}>
            <span style={{ width: 50, color: "var(--text-muted)" }}>4 stars</span>
            <div style={{ flex: 1, height: 7, borderRadius: 4, background: "#EAE3D8", overflow: "hidden" }}>
              <div style={{ width: "13%", height: "100%", background: "var(--brand-ochre)" }} />
            </div>
            <span style={{ width: 35, fontWeight: 600, textAlign: "right" }}>13%</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5 }}>
            <span style={{ width: 50, color: "var(--text-muted)" }}>3 stars</span>
            <div style={{ flex: 1, height: 7, borderRadius: 4, background: "#EAE3D8", overflow: "hidden" }}>
              <div style={{ width: "3%", height: "100%", background: "var(--brand-ochre)" }} />
            </div>
            <span style={{ width: 35, fontWeight: 600, textAlign: "right" }}>3%</span>
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {reviewsList.map((rev, i) => (
          <div
            key={i}
            style={{
              background: "#FFFFFF",
              border: "1.5px solid var(--border-warm)",
              borderRadius: "var(--radius-md)",
              padding: 22,
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: rev.avatarBg,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {rev.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dark)" }}>{rev.author}</h4>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{rev.tag}</span>
                </div>
              </div>
              <div style={{ color: "#D9822B", letterSpacing: 1 }}>
                {"★".repeat(rev.rating)}
              </div>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.65 }}>
              &quot;{rev.text}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
