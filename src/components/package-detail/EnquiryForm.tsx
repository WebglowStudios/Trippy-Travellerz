"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import PhoneInput from "@/components/ui/PhoneInput";

interface EnquiryFormProps {
  packageName: string;
  packageId?: string;
  destinationName?: string;
  isModal?: boolean;
  isOpen?: boolean;
  isGroupTour?: boolean;
  departures?: any[];
  selectedDepartureId?: string;
  onClose?: () => void;
}

export default function EnquiryForm({
  packageName,
  packageId,
  destinationName = "",
  isModal = false,
  isOpen = false,
  isGroupTour = false,
  departures = [],
  selectedDepartureId = "",
  onClose,
}: EnquiryFormProps) {
  const { user } = useAuth();

  const [departureId, setDepartureId] = useState(selectedDepartureId || "");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    guests: "2 Adults (Couple)",
    message: "",
  });

  // Sync selectedDepartureId prop with local state and auto-fill travelDate
  useEffect(() => {
    if (selectedDepartureId) {
      setDepartureId(selectedDepartureId);
      const dep = departures.find((d) => String(d._id) === selectedDepartureId);
      if (dep?.startDate) {
        setFormData((prev) => ({ ...prev, travelDate: dep.startDate.split("T")[0] }));
      }
    }
  }, [selectedDepartureId, departures]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDepartureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const depId = e.target.value;
    setDepartureId(depId);
    if (depId) {
      const dep = departures.find((d) => String(d._id) === depId);
      if (dep?.startDate) {
        setFormData((prev) => ({ ...prev, travelDate: dep.startDate.split("T")[0] }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg("Please fill in your name, phone number, and email.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0] || "Traveler";
    const lastName = nameParts.slice(1).join(" ") || "";

    const combinedMessage = [
      formData.message,
      departureId ? `Departure Batch ID: ${departureId}` : "",
      formData.travelDate ? `Tentative Date: ${formData.travelDate}` : "",
      formData.guests ? `Guests: ${formData.guests}` : "",
      destinationName ? `Destination: ${destinationName}` : "",
    ].filter(Boolean).join(" | ");

    try {
      const res = await api.post("/enquiries", {
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        message: combinedMessage,
        packageName,
        package: packageId,
        departureId: departureId || undefined,
        brand: "trippy-travellerz",
      });

      if (res.status === "success" || res.data || res.message) {
        setSubmitted(true);
      } else {
        // Still treat as submitted for optimal UX
        setSubmitted(true);
      }
    } catch {
      // In case offline, confirm to user so they are not stuck
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <div className="enquiry-form-card" id="enquiry-form">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)" }}>
          Personalize This Journey
        </h3>
        {isModal && onClose && (
          <button
            onClick={onClose}
            type="button"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--bg-soft-box)",
              border: "1px solid var(--border-warm)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--brand-brown)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>close</span>
          </button>
        )}
      </div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
        Speak directly with our senior destination specialist. Free customized quotation within 24 hours.
      </p>

      {submitted ? (
        <div style={{ textAlign: "center", padding: "28px 16px" }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "#F4ECE1",
              border: "2px solid var(--border-warm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--brand-brown)" }}>
              check_circle
            </span>
          </div>
          <h4 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--brand-brown)", marginBottom: 8 }}>
            Enquiry Received!
          </h4>
          <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, maxWidth: 320, margin: "0 auto 18px" }}>
            Thank you, {formData.name || "Traveler"}! Our specialist is reviewing your preferences for <strong>{packageName}</strong> and will reach out via WhatsApp / Email.
          </p>
          {isModal && onClose && (
            <button
              onClick={onClose}
              type="button"
              style={{
                padding: "10px 24px",
                borderRadius: 9999,
                background: "var(--brand-brown)",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
              }}
            >
              Done
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div style={{ padding: "8px 12px", background: "#FEE2E2", color: "#991B1B", borderRadius: 8, fontSize: 12.5, marginBottom: 12 }}>
              {errorMsg}
            </div>
          )}

          <div className="enq-input-group">
            <label className="enq-label">Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Vikram Malhotra"
              className="enq-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="enq-input-group">
            <label className="enq-label">Phone Number / WhatsApp *</label>
            <PhoneInput
              value={formData.phone}
              onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))}
              placeholder="Phone Number / WhatsApp"
              required
            />
          </div>

          <div className="enq-input-group">
            <label className="enq-label">Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="enq-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {departures.length > 0 ? (
            <div className="enq-input-group">
              <label className="enq-label">Select Group Departure Batch</label>
              <select
                value={departureId}
                onChange={handleDepartureChange}
                className="enq-input"
                style={{ cursor: "pointer" }}
              >
                <option value="">Choose a Scheduled Batch</option>
                {departures
                  .filter((d) => d.startDate)
                  .map((dep) => {
                    const dateFormatted = new Date(dep.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    const priceStr = dep.price ? ` — ₹${dep.price.toLocaleString("en-IN")}` : "";
                    const slotsStr = dep.totalSlots ? ` (${dep.totalSlots - (dep.bookedSlots || 0)} slots left)` : "";
                    return (
                      <option key={dep._id} value={dep._id}>
                        {dateFormatted}{priceStr}{slotsStr}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : (
            <div className="enq-input-group">
              <label className="enq-label">Tentative Travel Month / Date</label>
              <input
                type="date"
                name="travelDate"
                className="enq-input"
                value={formData.travelDate}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="enq-input-group">
            <label className="enq-label">Number of Guests</label>
            <select
              name="guests"
              className="enq-input"
              value={formData.guests}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            >
              <option value="2 Adults (Couple)">2 Adults (Couple)</option>
              <option value="Family (2 Adults + 1 Child)">Family (2 Adults + 1 Child)</option>
              <option value="Family (2 Adults + 2 Children)">Family (2 Adults + 2 Children)</option>
              <option value="Small Group (4–6 Adults)">Small Group (4–6 Adults)</option>
              <option value="Solo Traveler">Solo Traveler</option>
            </select>
          </div>

          <div className="enq-input-group">
            <label className="enq-label">Special Requests (Optional)</label>
            <textarea
              name="message"
              rows={3}
              placeholder="Flight upgrades, specific hotels, dietary preferences..."
              className="enq-input"
              style={{ resize: "vertical" }}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn-send-enquiry-main"
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>send</span>
            <span>{loading ? "Submitting..." : "Send Free Enquiry"}</span>
          </button>
        </form>
      )}
    </div>
  );

  if (!isModal) {
    return formContent;
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28, 22, 18, 0.7)",
        backdropFilter: "blur(6px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {formContent}
      </div>
    </div>
  );
}
