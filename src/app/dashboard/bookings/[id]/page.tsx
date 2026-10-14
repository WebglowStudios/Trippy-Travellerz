"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { generateBookingPdf, BookingPdfData } from "@/lib/generateBookingPdf";

interface BookingDetail {
  _id: string;
  bookingId?: string;
  package?: {
    _id?: string;
    name?: string;
    slug?: string;
    destination?: { name?: string; slug?: string } | string;
    duration?: { nights?: number; days?: number } | number;
    images?: string[];
    hotelRating?: string;
  };
  travelDate?: string;
  returnDate?: string;
  status?: string;
  bookingStatus?: string;
  totalAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
  paymentStatus?: string;
  travellers?: { adults?: number; children?: number; infants?: number } | number;
  primaryTraveller?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  specialRequests?: string;
  cancellationReason?: string;
  createdAt?: string;
}

function BookingDetailInner() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const bookingId = params?.id as string;

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Payment states
  const [payingBalance, setPayingBalance] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customAmountToPay, setCustomAmountToPay] = useState<number | "">("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Cancellation modal states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    if (!bookingId) return;

    async function fetchBooking() {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/bookings/${bookingId}`);
        if (res.status === "success" && res.data) {
          setBooking(res.data.booking || res.data);
        } else {
          // If mock or offline fallback
          setError(res.message || "Could not retrieve booking details.");
        }
      } catch (err: unknown) {
        console.error("Failed to load booking details:", err);
        setError("Unable to connect to reservations server. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId]);

  const handlePayBalance = async () => {
    if (!booking || !user) return;
    setPayingBalance(true);

    try {
      const remaining = Math.max(0, (booking.totalAmount || 0) - (booking.paidAmount || 0));
      const amountToCharge = customAmountToPay !== "" && Number(customAmountToPay) > 0
        ? Number(customAmountToPay)
        : remaining;

      const orderRes = await api.post("/payments/create-order", {
        bookingId: booking._id,
        paymentType: "balance",
        amount: amountToCharge,
        customAmount: amountToCharge,
      });

      if (orderRes.status !== "success" || !orderRes.data) {
        alert(orderRes.message || "Failed to initialize payment gateway.");
        setPayingBalance(false);
        return;
      }

      const order = orderRes.data;

      await openRazorpayCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mockKey",
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Trippy Travelerz",
        description: `Installment Payment for ${booking.package?.name || "Curated Journey"}`,
        order_id: order.orderId || order.id,
        prefill: {
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.email,
          contact: user.phone || "",
        },
        theme: { color: "#58371E" },
        handler: async (resp) => {
          try {
            const verifyRes = await api.post("/payments/verify", {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
              bookingId: booking._id,
            });

            if (verifyRes.status === "success") {
              setPaymentSuccess(true);
              setShowPaymentModal(false);
              // Refresh booking data
              const refreshed = await api.get(`/bookings/${booking._id}`);
              if (refreshed.status === "success" && refreshed.data) {
                setBooking(refreshed.data.booking || refreshed.data);
              }
            } else {
              alert(verifyRes.message || "Payment verification failed.");
            }
          } catch (e) {
            console.error("Payment verification error:", e);
            alert("Error verifying payment response.");
          }
        },
      });
    } catch (err) {
      console.error("Payment checkout error:", err);
      alert("Could not initialize Razorpay checkout. Please try again.");
    } finally {
      setPayingBalance(false);
    }
  };

  const handleCancelBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellationReason.trim()) return;

    setCancelling(true);
    try {
      const res = await api.put(`/bookings/${bookingId}/cancel`, {
        cancellationReason,
      });

      if (res.status === "success") {
        setCancelSuccess(true);
        setShowCancelModal(false);
        setBooking((prev) => (prev ? { ...prev, status: "cancelled", cancellationReason } : null));
      } else {
        alert(res.message || "Failed to cancel reservation.");
      }
    } catch (err) {
      console.error("Cancellation error:", err);
      alert("An error occurred while submitting cancellation request.");
    } finally {
      setCancelling(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!booking) return;
    generateBookingPdf(booking as unknown as BookingPdfData);
  };

  const total = booking?.totalAmount || 0;
  const paid = booking?.paidAmount ?? total;
  const remaining = Math.max(0, total - paid);
  const statusStr = (booking?.status || booking?.bookingStatus || "confirmed").toLowerCase();
  const isCancelled = statusStr === "cancelled";

  return (
    <AuthGuard>
      <Header />
      <div style={{ background: "var(--bg-cream)", minHeight: "85vh", padding: "40px 20px 80px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          {/* Breadcrumb / Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/dashboard?tab=bookings"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--brand-ochre)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_back</span>
              <span>Back to My Bookings</span>
            </Link>

            {booking && (
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="btn-dash-voucher"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>download</span>
                  <span>Download Voucher PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-dash-outline"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>print</span>
                  <span>Print Receipt</span>
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div style={{ padding: "80px 20px", textAlign: "center", background: "#FFFFFF", borderRadius: 20, border: "1px solid var(--border-warm)" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 44, color: "var(--brand-ochre)", animation: "spin 1s linear infinite" }}>
                progress_activity
              </span>
              <p style={{ marginTop: 16, fontSize: 15, color: "var(--text-muted)" }}>Loading reservation record...</p>
            </div>
          ) : error || !booking ? (
            <div style={{ padding: "60px 20px", textAlign: "center", background: "#FFFFFF", borderRadius: 20, border: "1px solid var(--border-warm)" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 48, color: "#DC2626" }}>error_outline</span>
              <h2 className="serif" style={{ fontSize: 22, marginTop: 12, marginBottom: 8 }}>Booking Not Found</h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>{error || "We could not find the requested booking reservation."}</p>
              <Link href="/dashboard?tab=bookings" className="btn-dash-primary">
                Return to Bookings
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
              {/* Status Notice Banner */}
              {cancelSuccess && (
                <div style={{ padding: "14px 20px", background: "#FEF2F2", border: "1.5px solid #FCA5A5", borderRadius: 14, color: "#991B1B", display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="material-symbols-rounded">check_circle</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Reservation cancellation requested successfully. Our support desk will process any applicable refund.</span>
                </div>
              )}
              {paymentSuccess && (
                <div style={{ padding: "14px 20px", background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 14, color: "#166534", display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="material-symbols-rounded">check_circle</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Payment received and verified successfully! Your reservation balance has been updated.</span>
                </div>
              )}

              {/* Main Booking Header Card */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  border: "1px solid var(--border-warm)",
                  padding: "28px 32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 20,
                }}
              >
                <div>
                  <span className="section-eyebrow" style={{ color: "var(--brand-ochre)" }}>OFFICIAL RESERVATION</span>
                  <h1 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--brand-brown)", margin: "4px 0" }}>
                    {booking.bookingId || `TTZ-${booking._id.slice(-8).toUpperCase()}`}
                  </h1>
                  <p style={{ fontSize: 13.5, color: "var(--text-muted)", margin: 0 }}>
                    Booked on {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Recently"}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    className={`dash-badge-status ${
                      statusStr === "confirmed" ? "confirmed" : statusStr === "completed" ? "completed" : statusStr === "cancelled" ? "cancelled" : "in-progress"
                    }`}
                    style={{ fontSize: 13, padding: "8px 16px", textTransform: "capitalize" }}
                  >
                    {statusStr === "confirmed" ? "✓ Confirmed Reservation" : statusStr}
                  </span>
                </div>
              </div>

              {/* Two Column Layout: Journey Info & Financial Breakdown */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
                {/* Left Column: Journey Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1px solid var(--border-warm)", padding: 28 }}>
                    <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 18 }}>
                      Itinerary & Travel Plan
                    </h3>

                    <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                      <div
                        style={{
                          width: 110,
                          height: 90,
                          borderRadius: 14,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "#EAE3D8",
                        }}
                      >
                        <img
                          src={
                            booking.package?.images?.[0] ||
                            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"
                          }
                          alt={booking.package?.name || "Tour"}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <h4 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--brand-brown)", margin: "0 0 6px" }}>
                          {booking.package?.name || "Curated Signature Journey"}
                        </h4>
                        <p style={{ fontSize: 13.5, color: "var(--text-body)", margin: "0 0 6px" }}>
                          Destination: <strong>{typeof booking.package?.destination === "object" ? booking.package.destination?.name : booking.package?.destination || "Global"}</strong>
                        </p>
                        {booking.package?.slug && (
                          <Link
                            href={`/itinerary/${booking.package.slug}`}
                            style={{ fontSize: 13, fontWeight: 600, color: "var(--brand-ochre)", display: "inline-flex", alignItems: "center", gap: 4 }}
                          >
                            <span>Inspect Day-by-Day Itinerary</span>
                            <span className="material-symbols-rounded" style={{ fontSize: 15 }}>arrow_forward</span>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 16, borderTop: "1px solid var(--border-light)" }}>
                      <div>
                        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>TRAVEL DATE</span>
                        <p style={{ fontSize: 14.5, fontWeight: 600, color: "var(--text-dark)", margin: "4px 0 0" }}>
                          {booking.travelDate ? new Date(booking.travelDate).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "Flexible Date"}
                        </p>
                      </div>
                      <div>
                        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>PARTY SIZE</span>
                        <p style={{ fontSize: 14.5, fontWeight: 600, color: "var(--text-dark)", margin: "4px 0 0" }}>
                          {typeof booking.travellers === "object" && booking.travellers
                            ? `${booking.travellers.adults || 1} Adult(s)` + (booking.travellers.children ? `, ${booking.travellers.children} Child(ren)` : "")
                            : `${booking.travellers || 1} Traveler(s)`}
                        </p>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div style={{ marginTop: 18, padding: "12px 16px", background: "var(--bg-cream)", borderRadius: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase" }}>Special Preferences</span>
                        <p style={{ fontSize: 13, color: "var(--text-body)", margin: "4px 0 0" }}>{booking.specialRequests}</p>
                      </div>
                    )}
                  </div>

                  {/* Private Concierge Support Box */}
                  <div style={{ background: "linear-gradient(135deg, #FAF6F0 0%, #F5EFEB 100%)", borderRadius: 20, border: "1px solid var(--border-warm)", padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", flexShrink: 0 }}>
                      <span className="material-symbols-rounded">support_agent</span>
                    </div>
                    <div>
                      <h4 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--brand-brown)", margin: "0 0 4px" }}>
                        Dedicated Tour Concierge
                      </h4>
                      <p style={{ fontSize: 13, color: "var(--text-body)", margin: "0 0 12px" }}>
                        Need airport escort details, private transfer updates, or custom dietary arrangements?
                      </p>
                      <a
                        href="https://wa.me/919876543210?text=Hi%20Trippy%20Travellerz%2C%20I%20have%20a%20query%20about%20my%20reservation."
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#166534",
                          background: "#DCFCE7",
                          padding: "7px 14px",
                          borderRadius: 999,
                        }}
                      >
                        <span>Chat via WhatsApp (+91 98765 43210)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Financial & Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1px solid var(--border-warm)", padding: 28 }}>
                    <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 18 }}>
                      Payment Breakdown
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                        <span style={{ color: "var(--text-muted)" }}>Total Investment:</span>
                        <strong style={{ color: "var(--text-dark)" }}>₹ {total.toLocaleString("en-IN")}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                        <span style={{ color: "var(--text-muted)" }}>Amount Paid:</span>
                        <strong style={{ color: "#16A34A" }}>₹ {paid.toLocaleString("en-IN")}</strong>
                      </div>
                      <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                        <span style={{ fontWeight: 600, color: "var(--brand-brown)" }}>Remaining Balance:</span>
                        <strong style={{ color: remaining > 0 ? "#DC2626" : "#16A34A", fontSize: 18 }}>
                          ₹ {remaining.toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>

                    {/* Balance Action */}
                    {remaining > 0 && !isCancelled && (
                      <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--border-light)" }}>
                        <button
                          type="button"
                          onClick={() => setShowPaymentModal(true)}
                          className="btn-dash-primary"
                          style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}
                        >
                          <span className="material-symbols-rounded">payment</span>
                          <span>Pay Remaining Balance</span>
                        </button>
                        <p style={{ fontSize: 11.5, color: "var(--text-muted)", textAlign: "center", marginTop: 8 }}>
                          Secure 256-bit encrypted checkout via Razorpay
                        </p>
                      </div>
                    )}

                    {remaining === 0 && (
                      <div style={{ marginTop: 18, padding: "10px 14px", background: "#F0FDF4", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, color: "#166534", fontSize: 13 }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>verified</span>
                        <span>All installments cleared. Voucher valid for check-in.</span>
                      </div>
                    )}
                  </div>

                  {/* Cancellation Action Box */}
                  {!isCancelled ? (
                    <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1px solid var(--border-warm)", padding: 24 }}>
                      <h4 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 6px" }}>
                        Need to Cancel?
                      </h4>
                      <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: "0 0 14px" }}>
                        Free cancellation up to 7 days before departure as per booking policies.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowCancelModal(true)}
                        style={{
                          background: "transparent",
                          border: "1.5px solid #FCA5A5",
                          color: "#DC2626",
                          padding: "8px 16px",
                          borderRadius: 10,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        Request Reservation Cancellation
                      </button>
                    </div>
                  ) : (
                    <div style={{ background: "#FEF2F2", borderRadius: 20, border: "1px solid #FCA5A5", padding: 20 }}>
                      <span className="dash-badge-status cancelled" style={{ display: "inline-block", marginBottom: 8 }}>
                        Reservation Cancelled
                      </span>
                      {booking.cancellationReason && (
                        <p style={{ fontSize: 13, color: "#7F1D1D", margin: 0 }}>
                          <strong>Reason:</strong> {booking.cancellationReason}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── PAYMENT MODAL ─── */}
      {showPaymentModal && (
        <div className="dash-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="dash-voucher-modal" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-voucher-header">
              <h3 className="serif" style={{ fontSize: 20, margin: 0, fontWeight: 700, color: "var(--brand-brown)" }}>
                Pay Installment Balance
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="btn-dash-modal-close">×</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ background: "var(--bg-cream)", padding: 16, borderRadius: 12, marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 6 }}>
                  <span>Total Pending Balance:</span>
                  <strong style={{ color: "var(--brand-brown)" }}>₹ {remaining.toLocaleString("en-IN")}</strong>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                  You can pay the full remaining amount or choose a partial installment amount.
                </p>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label className="enq-label">Amount to Pay Now (₹)</label>
                <input
                  type="number"
                  className="enq-input"
                  placeholder={`e.g. ${remaining}`}
                  value={customAmountToPay}
                  onChange={(e) => setCustomAmountToPay(e.target.value === "" ? "" : Number(e.target.value))}
                  min={1}
                  max={remaining}
                />
                <span style={{ fontSize: 11.5, color: "var(--text-muted)", display: "block", marginTop: 4 }}>
                  Leave blank to pay full balance of ₹ {remaining.toLocaleString("en-IN")}
                </span>
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="btn-dash-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePayBalance}
                  disabled={payingBalance}
                  className="btn-dash-primary"
                >
                  {payingBalance ? "Opening Gateway..." : "Proceed to Razorpay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CANCELLATION MODAL ─── */}
      {showCancelModal && (
        <div className="dash-modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="dash-voucher-modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-voucher-header">
              <h3 className="serif" style={{ fontSize: 20, margin: 0, fontWeight: 700, color: "#DC2626" }}>
                Cancel Reservation
              </h3>
              <button onClick={() => setShowCancelModal(false)} className="btn-dash-modal-close">×</button>
            </div>
            <form onSubmit={handleCancelBooking} style={{ padding: 24 }}>
              <p style={{ fontSize: 13.5, color: "var(--text-body)", marginBottom: 16 }}>
                Are you sure you wish to cancel this reservation for <strong>{booking?.package?.name || "this tour"}</strong>?
              </p>
              <div style={{ marginBottom: 18 }}>
                <label className="enq-label">Reason for Cancellation (Required)</label>
                <textarea
                  className="enq-input"
                  style={{ minHeight: 90, resize: "vertical" }}
                  placeholder="Please describe why you are requesting cancellation..."
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="btn-dash-outline"
                >
                  Keep Reservation
                </button>
                <button
                  type="submit"
                  disabled={cancelling}
                  style={{
                    background: "#DC2626",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 999,
                    padding: "10px 22px",
                    fontWeight: 600,
                    fontSize: 13.5,
                    cursor: "pointer",
                  }}
                >
                  {cancelling ? "Cancelling..." : "Confirm Cancellation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </AuthGuard>
  );
}

export default function BookingDetailPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-cream)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 40, color: "var(--brand-ochre)", animation: "spin 1s linear infinite" }}>
            progress_activity
          </span>
        </div>
      }
    >
      <BookingDetailInner />
    </Suspense>
  );
}
