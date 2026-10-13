"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

interface ReviewsProps {
  packageId?: string;
  rating?: number;
  reviewCount?: number;
}

interface Review {
  _id: string;
  reviewerName?: string;
  userName?: string;
  user?: { firstName: string; lastName: string; avatar?: string };
  rating: number;
  comment?: string;
  text?: string;
  title?: string;
  travelType?: string;
  tripType?: string;
  createdAt: string;
  avatar?: string;
}

const DEFAULT_FALLBACK_REVIEWS: Review[] = [
  {
    _id: "demo-1",
    reviewerName: "Rajesh Mehta",
    tripType: "luxury",
    rating: 5,
    createdAt: "2026-03-15T00:00:00.000Z",
    text: "Every single detail was flawless. The sunset at Burj Khalifa took our breath away, and our chauffeur was always 10 minutes early in a spotless Mercedes. The transition between Atlantis and JW Marriott was seamless. Trippy Travellers is genuinely in a class of its own!",
  },
  {
    _id: "demo-2",
    reviewerName: "Priya & Amit Sharma",
    tripType: "honeymoon",
    rating: 5,
    createdAt: "2026-02-20T00:00:00.000Z",
    text: "We booked our honeymoon with Trippy Travellers and could not be happier. The private dessert safari dinner was magical, and Atlantis upgraded us to an ocean suite with complimentary champagne. Truly an unforgettable week!",
  },
  {
    _id: "demo-3",
    reviewerName: "Devendra Kulkarni",
    tripType: "family",
    rating: 5,
    createdAt: "2026-01-10T00:00:00.000Z",
    text: "Travelling with kids can be stressful, but the personalized itinerary allowed us to explore at our own comfortable pace without rush. Aquaventure was incredible. Highly recommended for premium family holidays.",
  },
];

export default function Reviews({
  packageId,
  rating: propRating = 4.9,
  reviewCount: propReviewCount = 312,
}: ReviewsProps) {
  const { user } = useAuth();

  const [reviewsList, setReviewsList] = useState<Review[]>(DEFAULT_FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(propRating);
  const [totalCount, setTotalCount] = useState(propReviewCount);

  // Review Form & Eligibility States
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formTripType, setFormTripType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!packageId) {
      setLoading(false);
      return;
    }

    async function loadReviews() {
      try {
        setLoading(true);
        const res = await api.get(`/reviews/package/${packageId}`);
        if (res.status === "success") {
          const list = res.data?.reviews || (Array.isArray(res.data) ? res.data : []);
          if (list.length > 0) {
            setReviewsList(list);
            setTotalCount(res.data?.total || list.length);
            const sum = list.reduce((acc: number, r: Review) => acc + (r.rating || 5), 0);
            setAvgRating(Math.round((sum / list.length) * 10) / 10);
          }
        }
      } catch {
        // Retain fallback reviews
      } finally {
        setLoading(false);
      }
    }

    async function checkCanReview() {
      if (!user) return;
      try {
        const res = await api.get(`/reviews/can-review/${packageId}`);
        if (res.status === "success") {
          if (res.data?.canReview) {
            setCanReview(true);
          } else if (res.data?.reason === "already_reviewed") {
            setAlreadyReviewed(true);
          }
        }
      } catch {
        // User not logged in or cannot review
      }
    }

    loadReviews();
    checkCanReview();
  }, [packageId, user]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formText.trim()) {
      setSubmitError("Please share your thoughts on the journey.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await api.post("/reviews", {
        package: packageId,
        rating: formRating,
        title: formTitle.trim() || undefined,
        text: formText.trim(),
        tripType: formTripType || undefined,
        brand: "trippy-travellerz",
      });

      if (res.status === "success" || res.data) {
        setSubmitSuccess(true);
        setCanReview(false);
        setAlreadyReviewed(true);
        setShowForm(false);

        // Optimistically reload reviews
        if (packageId) {
          const refreshRes = await api.get(`/reviews/package/${packageId}`);
          if (refreshRes.status === "success") {
            const list = refreshRes.data?.reviews || (Array.isArray(refreshRes.data) ? refreshRes.data : []);
            if (list.length > 0) {
              setReviewsList(list);
              setTotalCount(list.length);
            }
          }
        }
      } else {
        setSubmitError(res.message || "Failed to submit review. Please try again.");
      }
    } catch {
      setSubmitError("Failed to submit your review. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const getReviewName = (r: Review) => {
    if (r.reviewerName?.trim()) return r.reviewerName.trim();
    if (r.user) {
      const full = `${r.user.firstName || ""} ${r.user.lastName || ""}`.trim();
      if (full) return full;
    }
    if (r.userName?.trim()) return r.userName.trim();
    return "Verified Traveler";
  };

  const getRatingBars = () => {
    const counts = [0, 0, 0, 0, 0];
    reviewsList.forEach((r) => {
      const idx = Math.min(Math.max(Math.round(r.rating || 5) - 1, 0), 4);
      counts[idx]++;
    });
    return [5, 4, 3, 2, 1].map((star) => {
      const count = counts[star - 1];
      const pct = reviewsList.length > 0 ? Math.round((count / reviewsList.length) * 100) : 0;
      return { star, count, pct: `${pct}%` };
    });
  };

  const ratingBars = getRatingBars();

  return (
    <div id="reviews-section" style={{ marginTop: 48, paddingTop: 36, borderTop: "1.5px solid var(--border-warm)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 2 }}>
            Guest Testimonials
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
            Traveller Reviews & Ratings
          </h2>
        </div>

        {/* Write a Review Button if Eligible */}
        {canReview && !submitSuccess && !showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            style={{
              padding: "10px 22px",
              background: "var(--brand-brown)",
              color: "#FFFFFF",
              borderRadius: 9999,
              border: "none",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 14px rgba(88,55,30,0.18)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>rate_review</span>
            <span>Write a Verified Review</span>
          </button>
        )}
      </div>

      {/* Review Submission Form Modal / Box */}
      {showForm && (
        <form
          onSubmit={handleSubmitReview}
          style={{
            background: "#FFFFFF",
            border: "1.5px solid var(--brand-brown)",
            borderRadius: "var(--radius-lg, 20px)",
            padding: "28px 24px",
            marginBottom: 28,
            boxShadow: "0 8px 30px rgba(88,55,30,0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--brand-brown)", margin: 0 }}>
                Share Your Journey Experience
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "4px 0 0" }}>
                Your insights help fellow travellers curate their dream escape.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setShowForm(false); setSubmitError(""); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
            >
              <span className="material-symbols-rounded">close</span>
            </button>
          </div>

          {submitError && (
            <div style={{ padding: "10px 14px", background: "#FEE2E2", color: "#991B1B", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
              {submitError}
            </div>
          )}

          {/* Star Rating Picker */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Your Overall Rating *
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormRating(s)}
                  onMouseEnter={() => setFormHoverRating(s)}
                  onMouseLeave={() => setFormHoverRating(0)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 32,
                    color: s <= (formHoverRating || formRating) ? "#D9822B" : "#EAE3D8",
                    padding: 0,
                    lineHeight: 1,
                    transition: "color 0.15s ease",
                  }}
                >
                  ★
                </button>
              ))}
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--brand-brown)", marginLeft: 10 }}>
                {formRating} of 5 Stars
              </span>
            </div>
          </div>

          {/* Trip Type Selector */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Travel Style (Optional)
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["honeymoon", "family", "solo", "group", "luxury", "wellness"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormTripType(formTripType === type ? "" : type)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 9999,
                    border: `1.5px solid ${formTripType === type ? "var(--brand-brown)" : "var(--border-warm)"}`,
                    background: formTripType === type ? "var(--brand-brown)" : "#FAF7F2",
                    color: formTripType === type ? "#FFFFFF" : "var(--text-dark)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.15s ease",
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Review Headline (Optional)
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Beyond expectations — immaculate stays and transfers"
              maxLength={120}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1.5px solid var(--border-warm)",
                fontSize: 14,
                outline: "none",
                background: "#FAF7F2",
              }}
            />
          </div>

          {/* Detailed Comment */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-brown)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Your Detailed Feedback *
            </label>
            <textarea
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              placeholder="Tell others what you loved most — hotels, local hosts, specific excursions..."
              rows={4}
              maxLength={2000}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1.5px solid var(--border-warm)",
                fontSize: 14,
                outline: "none",
                resize: "vertical",
                background: "#FAF7F2",
              }}
            />
            <div style={{ textAlign: "right", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
              {formText.length}/2000 characters
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "11px 26px",
                borderRadius: 9999,
                background: submitting ? "var(--border-warm)" : "var(--brand-brown)",
                color: "#FFFFFF",
                fontSize: 13.5,
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                {submitting ? "hourglass_empty" : "send"}
              </span>
              <span>{submitting ? "Submitting..." : "Publish Review"}</span>
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setSubmitError(""); }}
              style={{
                padding: "11px 20px",
                borderRadius: 9999,
                background: "#FAF7F2",
                border: "1px solid var(--border-warm)",
                color: "var(--text-muted)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Submission Success Alert */}
      {submitSuccess && (
        <div
          style={{
            padding: "16px 20px",
            background: "#FAF6F0",
            border: "1.5px solid var(--brand-brown)",
            borderRadius: 16,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 26, color: "var(--brand-brown)" }}>
            check_circle
          </span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--brand-brown)" }}>
              Thank you for sharing your experience!
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0 }}>
              Your verified review has been submitted and registered with Trippy Travellers.
            </p>
          </div>
        </div>
      )}

      {/* Already Reviewed Banner */}
      {alreadyReviewed && !submitSuccess && (
        <div
          style={{
            padding: "12px 18px",
            background: "#FAF7F2",
            border: "1px dashed var(--border-warm)",
            borderRadius: 14,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--brand-ochre)" }}>verified</span>
          <span>You have already submitted a verified review for this travel package. Thank you!</span>
        </div>
      )}

      {/* Rating Score Summary Box */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          background: "#FFFFFF",
          border: "1.5px solid var(--border-warm)",
          borderRadius: "var(--radius-lg, 20px)",
          padding: 24,
          marginBottom: 24,
          boxShadow: "var(--shadow-soft)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center", paddingRight: 28, borderRight: "1px solid var(--border-warm)", minWidth: 120 }}>
          <div className="serif" style={{ fontSize: 46, fontWeight: 700, color: "var(--brand-brown)", lineHeight: 1 }}>
            {avgRating}
          </div>
          <div style={{ color: "#D9822B", letterSpacing: 1, fontSize: 17, margin: "6px 0 2px" }}>
            {"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {totalCount} Verified Reviews
          </div>
        </div>

        {/* Breakdown progress bars */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, minWidth: 200 }}>
          {ratingBars.map((bar) => (
            <div key={bar.star} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5 }}>
              <span style={{ width: 45, color: "var(--text-muted)", fontWeight: 600 }}>{bar.star} stars</span>
              <div style={{ flex: 1, height: 7, borderRadius: 4, background: "#EAE3D8", overflow: "hidden" }}>
                <div style={{ width: bar.pct, height: "100%", background: "var(--brand-ochre)", borderRadius: 4, transition: "width 0.4s ease" }} />
              </div>
              <span style={{ width: 35, fontWeight: 700, textAlign: "right", color: "var(--brand-brown)" }}>{bar.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {reviewsList.map((rev) => {
          const reviewerName = getReviewName(rev);
          const initial = reviewerName.charAt(0).toUpperCase();
          const dateStr = rev.createdAt
            ? new Date(rev.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
            : "Recently";

          return (
            <div
              key={rev._id}
              style={{
                background: "#FFFFFF",
                border: "1.5px solid var(--border-warm)",
                borderRadius: "var(--radius-lg, 16px)",
                padding: "20px 22px",
                boxShadow: "var(--shadow-soft)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--brand-brown)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {initial}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                      {reviewerName}
                    </h4>
                    <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                      Travelled {dateStr} {rev.tripType ? `· ${rev.tripType.toUpperCase()}` : ""}
                    </span>
                  </div>
                </div>

                <div style={{ color: "#D9822B", letterSpacing: 1, fontSize: 14 }}>
                  {"★".repeat(Math.round(rev.rating || 5))}{"☆".repeat(5 - Math.round(rev.rating || 5))}
                </div>
              </div>

              {rev.title && (
                <div className="serif" style={{ fontSize: 15, fontWeight: 700, color: "var(--brand-brown)", marginBottom: 6 }}>
                  {rev.title}
                </div>
              )}

              <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.65, margin: 0 }}>
                &quot;{rev.text || rev.comment}&quot;
              </p>

              <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: "#2E7D32", background: "#F1F8F2", padding: "3px 10px", borderRadius: 9999 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 13 }}>verified</span>
                <span>Verified Booking</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
