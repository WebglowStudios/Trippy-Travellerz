"use client";

import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PayInstallmentPageProps {
  params: Promise<{ id: string }>;
}

function PayInstallmentInner({ params }: PayInstallmentPageProps) {
  const resolvedParams = use(params);
  const paymentId = resolvedParams.id;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customAmountToPay, setCustomAmountToPay] = useState<string>("");

  useEffect(() => {
    if (!paymentId) return;

    api
      .get(`/operations/public-payments/${paymentId}/details`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res.status === "success" && res.data) {
          setDetails(res.data);
          setCustomAmountToPay(res.data.amountDue > 0 ? res.data.amountDue.toString() : "");
          if (res.data.status === "paid" || res.data.amountDue <= 0) {
            setSuccess(true);
          }
        } else {
          setError(res.message || "Failed to retrieve payment invoice.");
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        setError(err.message || "Could not connect to payment server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paymentId]);

  const handlePay = async () => {
    if (!details) return;
    const finalAmount = Number(customAmountToPay);
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter a valid amount to pay.");
      return;
    }
    if (finalAmount > details.amountDue) {
      alert("Amount cannot exceed the total balance due.");
      return;
    }

    setPaying(true);
    try {
      const orderRes = await api.post(`/operations/public-payments/${paymentId}/create-order`, {
        customAmount: finalAmount,
      });

      if (orderRes.status !== "success") {
        alert(orderRes.message || "Could not initiate payment order.");
        setPaying(false);
        return;
      }

      const { orderId, amount: amountPaise } = orderRes.data;

      await openRazorpayCheckout({
        key: details.keyId,
        amount: amountPaise,
        currency: "INR",
        name: "Trippy Travelerz",
        description: `${details.packageName || "Tour Booking"} - Balance Settlement`,
        order_id: orderId,
        prefill: {
          name: details.customerName || "",
          email: details.customerEmail || "",
          contact: details.customerPhone || "",
        },
        theme: { color: "#58371E" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          try {
            await api.post(`/operations/public-payments/${paymentId}/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setSuccess(true);
            setDetails({ ...details, amountDue: details.amountDue - finalAmount, status: "paid" });
          } catch {
            alert("Payment received by bank but verification was delayed. Please notify concierge.");
          } finally {
            setPaying(false);
          }
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Payment gateway could not be launched.");
      setPaying(false);
    }
  };

  return (
    <>
      <Header />

      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #F5ECE0 0%, var(--bg-cream) 100%)",
          padding: "50px 20px 80px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 520,
            background: "#FFFFFF",
            borderRadius: 24,
            border: "1.5px solid var(--border-warm)",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(60, 40, 20, 0.08)",
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              background: "var(--brand-brown)",
              color: "#FFFFFF",
              padding: "28px 32px",
              textAlign: "center",
              borderBottom: "1.5px solid #DFCEB5",
            }}
          >
            <span className="cursive" style={{ fontSize: 18, color: "var(--brand-gold)", display: "block", marginBottom: 2 }}>
              Secure Payment Desk
            </span>
            <h1 className="serif" style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
              Settlement & Balance Due
            </h1>
          </div>

          <div style={{ padding: "32px 32px" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: "3px solid #DFCEB5",
                    borderTopColor: "var(--brand-brown)",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto 16px",
                  }}
                />
                <p style={{ fontSize: 14, color: "var(--text-body)", margin: 0 }}>
                  Retrieving reservation payment details...
                </p>
              </div>
            ) : error ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 44, color: "var(--brand-ochre)", marginBottom: 12 }}>
                  receipt_long
                </span>
                <h3 className="serif" style={{ fontSize: 20, color: "var(--text-dark)", margin: "0 0 8px" }}>
                  Invoice Not Found
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-body)", margin: "0 0 24px" }}>
                  {error}
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    background: "var(--brand-brown)",
                    color: "#FFFFFF",
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Contact Concierge Desk
                </Link>
              </div>
            ) : success ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#E8F5E9",
                    border: "2px solid #86EFAC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 36, color: "#15803D" }}>
                    check
                  </span>
                </div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 8px" }}>
                  Payment Complete!
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-body)", margin: "0 0 24px" }}>
                  Thank you. Your balance settlement has been registered. An updated receipt has been issued to your email.
                </p>
                <Link
                  href="/dashboard"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    background: "var(--brand-brown)",
                    color: "#FFFFFF",
                    borderRadius: 9999,
                    fontSize: 13.5,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div>
                {/* Trip Info Box */}
                <div
                  style={{
                    background: "#FAF7F2",
                    borderRadius: 16,
                    padding: "18px 20px",
                    border: "1px solid var(--border-light)",
                    marginBottom: 24,
                  }}
                >
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, color: "var(--text-muted)", fontWeight: 700, marginBottom: 4 }}>
                    Itinerary Booking
                  </div>
                  <strong style={{ fontSize: 16, color: "var(--text-dark)", display: "block", marginBottom: 8 }}>
                    {details.packageName || "Luxury Private Tour"}
                  </strong>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-body)" }}>
                    <span>Guest: <strong>{details.customerName || "Traveler"}</strong></span>
                    <span>Ref: <strong>{details.bookingId || paymentId}</strong></span>
                  </div>
                </div>

                {/* Balance Summary Table */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13.5, color: "var(--text-body)" }}>
                    <span>Total Booking Cost</span>
                    <span>₹ {(details.totalAmount || 0).toLocaleString("en-IN")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13.5, color: "#2E7D32" }}>
                    <span>Amount Paid to Date</span>
                    <span>- ₹ {(details.paidAmount || 0).toLocaleString("en-IN")}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0 0",
                      fontSize: 17,
                      fontWeight: 800,
                      color: "var(--brand-brown)",
                      borderTop: "1.5px dashed var(--border-warm)",
                      marginTop: 4,
                    }}
                  >
                    <span>Remaining Balance Due</span>
                    <span>₹ {(details.amountDue || 0).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Amount to Pay Input */}
                <div className="enq-field" style={{ marginBottom: 24 }}>
                  <label className="enq-label">Amount to Pay Now (INR)</label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontWeight: 700,
                        color: "var(--text-muted)",
                        fontSize: 15,
                      }}
                    >
                      ₹
                    </span>
                    <input
                      type="number"
                      value={customAmountToPay}
                      onChange={(e) => setCustomAmountToPay(e.target.value)}
                      max={details.amountDue}
                      min={1}
                      className="enq-input auth-styled-input"
                      style={{ paddingLeft: 32 }}
                    />
                  </div>
                  <small style={{ display: "block", color: "var(--text-muted)", fontSize: 11.5, marginTop: 4 }}>
                    You can pay the full remaining ₹{(details.amountDue || 0).toLocaleString("en-IN")} or enter a custom amount.
                  </small>
                </div>

                <button
                  type="button"
                  onClick={handlePay}
                  disabled={paying}
                  className="btn-auth-submit"
                  style={{ width: "100%" }}
                >
                  {paying ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          border: "2px solid #fff",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Opening Razorpay...
                    </span>
                  ) : (
                    `Pay ₹${Number(customAmountToPay || 0).toLocaleString("en-IN")} with Razorpay`
                  )}
                </button>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <span style={{ fontSize: 11.5, color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 14, color: "#2E7D32" }}>lock</span>
                    256-Bit Encrypted Payment • UPI, Cards & Netbanking Supported
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function PayInstallmentPage(props: PayInstallmentPageProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh", background: "var(--bg-cream)" }} />}>
      <PayInstallmentInner {...props} />
    </Suspense>
  );
}
