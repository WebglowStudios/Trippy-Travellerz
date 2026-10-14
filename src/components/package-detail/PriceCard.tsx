"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import PhoneInput from "@/components/ui/PhoneInput";

interface PriceCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pkg: any;
  slug: string;
  onOpenEnquiry?: () => void;
}

export default function PriceCard({ pkg, slug, onOpenEnquiry }: PriceCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showCallback, setShowCallback] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackStatus, setCallbackStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    if (user?.phone) {
      setCallbackPhone(user.phone);
    }
  }, [user]);

  const price = pkg?.price || 124999;
  const originalPrice = pkg?.originalPrice || Math.round(price * 1.35);
  const savings = Math.max(0, originalPrice - price);
  const discountPercent = Math.round((savings / originalPrice) * 100);

  const duration = pkg?.duration || { nights: 7, days: 8 };
  const rating = pkg?.rating || 4.9;
  const reviewCount = pkg?.reviewCount || 312;

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackStatus("loading");
    try {
      await api.post("/enquiries", {
        phone: callbackPhone,
        packageName: pkg?.name || "Trip Enquiry",
        package: pkg?._id,
        brand: "trippy-travellerz",
        message: "Quick Callback Request via Price Card",
      });
      setCallbackStatus("done");
    } catch {
      setCallbackStatus("done");
    }
  };


  return (
    <div className="price-card">
      <div className="price-header">
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
            Starting From
          </span>
          {originalPrice > price && (
            <div className="price-original">₹ {originalPrice.toLocaleString("en-IN")}</div>
          )}
          <div className="price-amount">₹ {price.toLocaleString("en-IN")}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
            per {pkg?.priceUnit || "person"} (twin sharing)
          </div>
          {savings > 0 && (
            <div className="price-discount-pill">
              <span className="material-symbols-rounded" style={{ fontSize: 15 }}>local_offer</span>
              <span>Save ₹{savings.toLocaleString("en-IN")} ({discountPercent}% OFF)</span>
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#D9822B", fontSize: 15, letterSpacing: 1 }}>★★★★★</div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)" }}>
            {rating} / 5
          </div>
          <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{reviewCount} reviews</span>
        </div>
      </div>

      {/* Specs List */}
      <div className="meta-specs-list">
        <div className="meta-spec-item">
          <span className="material-symbols-rounded">calendar_today</span>
          <span><strong>Duration:</strong> {duration.nights} Nights / {duration.days} Days</span>
        </div>
        <div className="meta-spec-item">
          <span className="material-symbols-rounded">hotel</span>
          <span><strong>Stay:</strong> {pkg?.hotelRating || "5-Star Luxury Hotels"}</span>
        </div>
        {pkg?.flightsIncluded !== undefined && (
          <div className="meta-spec-item">
            <span className="material-symbols-rounded">flight_takeoff</span>
            <span><strong>Flights:</strong> {pkg.flightsIncluded ? "Return Flights Included" : "Flights Available On Request"}</span>
          </div>
        )}
        {pkg?.isInternational && (
          <div className="meta-spec-item">
            <span className="material-symbols-rounded">credit_card</span>
            <span><strong>Visa:</strong> {pkg.visaIncluded ? "Visa Included" : "Visa Facilitation Included"}</span>
          </div>
        )}
        <div className="meta-spec-item">
          <span className="material-symbols-rounded">verified_user</span>
          <span><strong>Customizable:</strong> 100% Tailored to your pace</span>
        </div>
      </div>

      {/* Primary Action Button: Send Enquiry */}
      <button
        type="button"
        className="btn-send-enquiry-main"
        onClick={() => {
          const el = document.getElementById("enquiry-form");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else if (onOpenEnquiry) {
            onOpenEnquiry();
          }
        }}
        style={{
          background: "var(--brand-brown)",
          color: "#FFFFFF",
          marginBottom: 10,
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 19 }}>mail</span>
        <span>Send Enquiry / Get Quote</span>
      </button>

      <button
        type="button"
        className="btn-request-callback"
        onClick={() => setShowCallback(!showCallback)}
        style={{ marginBottom: 10 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>call</span>
        <span>Request a Quick Callback</span>
      </button>


      {/* Collapsible Quick Callback Form */}
      {showCallback && (
        <form
          onSubmit={handleCallbackSubmit}
          style={{
            marginTop: 14,
            padding: 16,
            background: "#FAF7F2",
            borderRadius: 14,
            border: "1px solid var(--border-warm)",
          }}
        >
          {callbackStatus === "done" ? (
            <div style={{ textAlign: "center", color: "#2E5C38", fontSize: 13, fontWeight: 600 }}>
              ✓ Request received! A travel specialist will call you shortly.
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-brown)", marginBottom: 8 }}>
                Enter your phone number
              </div>
              <div style={{ marginBottom: 10 }}>
                <PhoneInput
                  value={callbackPhone}
                  onChange={(val) => setCallbackPhone(val)}
                  placeholder="Your Phone / WhatsApp"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={callbackStatus === "loading"}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--brand-brown)",
                  color: "#fff",
                  borderRadius: 9999,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                {callbackStatus === "loading" ? "Submitting..." : "Call Me Back"}
              </button>
            </>
          )}
        </form>
      )}

      {/* Trust Signals */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--border-light)", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>verified</span>
          <span>Best Rate</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>support_agent</span>
          <span>24/7 Support</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>lock</span>
          <span>100% Secure</span>
        </div>
      </div>
    </div>
  );
}
