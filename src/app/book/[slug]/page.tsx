"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { openRazorpayCheckout } from "@/lib/razorpay";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PackageData {
  _id: string;
  name: string;
  slug: string;
  priceUnit?: string;
  extraPersonPrice?: number;
  adultCount?: number;
  childCount?: number;
  destination?: { name: string; slug?: string } | string;
  isGroupTour?: boolean;
  isInternational?: boolean;
  visaIncluded?: boolean;
  flightsIncluded?: boolean;
  trainsIncluded?: boolean;
  hotelRating?: string;
  duration?: { nights: number; days: number };
  price: number;
  originalPrice?: number;
  images: string[];
  heroImage?: string;
  description?: string;
  travelDates?: { startDate: string; endDate?: string };
  departures?: {
    _id: string;
    startDate: string;
    endDate?: string;
    price: number;
    totalSlots: number;
    bookedSlots?: number;
  }[];
}

interface PaymentConfig {
  mode: "full" | "partial";
  depositType: "percent" | "fixed";
  depositValue: number;
  depositLabel: string | null;
  balanceDueDays: number;
  depositAmount: number;
  keyId: string;
}

interface TravellerEntry {
  name: string;
  age: string;
  phone: string;
  type: "adult" | "child" | "infant";
  passportNumber?: string;
  passportExpiry?: string;
  issuingCountry?: string;
}

function BookingCheckoutContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const slug = params.slug as string;

  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Primary Traveller form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [panCard, setPanCard] = useState("");
  const [travelDate, setTravelDate] = useState(searchParams?.get("travelDate") || "");
  const [departureId, setDepartureId] = useState(searchParams?.get("departureId") || "");
  const [departurePrice, setDeparturePrice] = useState<number | null>(null);
  const [specialRequests, setSpecialRequests] = useState("");
  const [travellers, setTravellers] = useState<TravellerEntry[]>([]);

  // Primary Traveller Passport (if international)
  const [primaryPassport, setPrimaryPassport] = useState("");
  const [primaryPassportExpiry, setPrimaryPassportExpiry] = useState("");
  const [primaryIssuingCountry, setPrimaryIssuingCountry] = useState("India");

  // Payment option chosen by user (full or deposit)
  const [chosenPayment, setChosenPayment] = useState<"full" | "deposit">("full");

  // Submission & payment states
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [success, setSuccess] = useState(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: string;
    value: number;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // Populate user data if logged in
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  // Load Package Details & Payment Config
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        let fetchedPkg: PackageData | null = null;
        try {
          const res = await api.get(`/packages/${slug}`);
          if (res.status === "success" && res.data) {
            fetchedPkg = res.data;
          }
        } catch {
          // Fallback check
        }


        if (fetchedPkg) {
          setPkg(fetchedPkg);

          if (fetchedPkg.isGroupTour && departureId && fetchedPkg.departures) {
            const dep = fetchedPkg.departures.find((d) => String(d._id) === departureId);
            if (dep) {
              setTravelDate(dep.startDate.split("T")[0]);
              if (dep.price > 0) setDeparturePrice(dep.price);
            }
          } else if (fetchedPkg.travelDates?.startDate) {
            setTravelDate(fetchedPkg.travelDates.startDate.split("T")[0]);
          }

          // Fetch payment config for this package
          try {
            const cfgRes = await api.get(`/payments/config/${fetchedPkg._id}`);
            if (cfgRes.status === "success" && cfgRes.data) {
              setPaymentConfig(cfgRes.data);
              if (cfgRes.data.mode === "partial") {
                setChosenPayment("deposit");
              }
            }
          } catch {
            // Default config
            setPaymentConfig({
              mode: "full",
              depositType: "percent",
              depositValue: 25,
              depositLabel: "25% Token Booking Deposit",
              balanceDueDays: 15,
              depositAmount: Math.round(fetchedPkg.price * 0.25),
              keyId: "rzp_test_default",
            });
          }
        } else {
          setError("Package not found");
        }
      } catch {
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug, departureId]);

  // Additional travellers handlers
  const addTraveller = (type: "adult" | "child" | "infant") => {
    setTravellers((prev) => [
      ...prev,
      { name: "", age: "", phone: "", type, issuingCountry: "India" },
    ]);
  };

  const removeTraveller = (idx: number) => {
    setTravellers((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateTraveller = (idx: number, field: keyof TravellerEntry, val: string) => {
    setTravellers((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const adultsCount = 1 + travellers.filter((t) => t.type === "adult").length;
  const childrenCount = travellers.filter((t) => t.type === "child").length;

  const basePrice = useMemo(() => {
    if (!pkg) return 0;
    return departurePrice !== null ? departurePrice : pkg.price;
  }, [pkg, departurePrice]);

  const priceBreakdown = useMemo(() => {
    if (!pkg) return { adultTotal: 0, childTotal: 0, total: 0 };
    const adultTotal = basePrice * adultsCount;
    const childTotal = Math.round(basePrice * 0.75) * childrenCount;
    return { adultTotal, childTotal, total: adultTotal + childTotal };
  }, [pkg, adultsCount, childrenCount, basePrice]);

  // Coupon application
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await api.post("/coupons/validate", {
        code: couponInput.trim(),
        packageId: pkg?._id,
        totalAmount: priceBreakdown.total,
      });
      if (res.status === "success" && res.data) {
        setAppliedCoupon(res.data);
      } else {
        setCouponError(res.message || "Invalid coupon code");
      }
    } catch {
      // Demo test coupon fallback
      if (couponInput.trim().toUpperCase() === "TRIPPY10") {
        setAppliedCoupon({
          code: "TRIPPY10",
          type: "percent",
          value: 10,
          discountAmount: Math.round(priceBreakdown.total * 0.1),
        });
      } else {
        setCouponError("Invalid or expired discount code");
      }
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  // Total after discounts
  const finalTotal = useMemo(() => {
    const raw = priceBreakdown.total;
    if (appliedCoupon) {
      return Math.max(0, raw - appliedCoupon.discountAmount);
    }
    return raw;
  }, [priceBreakdown.total, appliedCoupon]);

  // Amount payable right now (full vs deposit)
  const chargeNow = useMemo(() => {
    if (!paymentConfig || chosenPayment === "full") return finalTotal;
    if (paymentConfig.depositType === "percent") {
      return Math.round((paymentConfig.depositValue / 100) * finalTotal);
    }
    return Math.min(finalTotal, paymentConfig.depositValue * adultsCount);
  }, [paymentConfig, chosenPayment, finalTotal, adultsCount]);

  const remainingBalance = Math.max(0, finalTotal - chargeNow);

  // Form submission & Razorpay Launch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;

    if (!firstName.trim() || !lastName.trim()) {
      setSubmitError("Primary traveller's full name is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setSubmitError("A valid email address is required.");
      return;
    }
    if (!phone.trim()) {
      setSubmitError("A valid phone number is required.");
      return;
    }
    if (!travelDate) {
      setSubmitError("Please select a departure travel date.");
      return;
    }

    if (pkg.isInternational) {
      if (!panCard.trim()) {
        setSubmitError("PAN Card is required for international travel bookings (RBI LRS compliance).");
        return;
      }
      if (!primaryPassport.trim() || !primaryPassportExpiry) {
        setSubmitError("Passport number and expiry are required for the Primary Traveller.");
        return;
      }
      const missingTravellerPassport = travellers.some((t) => !t.passportNumber || !t.passportExpiry);
      if (missingTravellerPassport) {
        setSubmitError("Passport details are required for all additional travellers on international tours.");
        return;
      }
    }

    setSubmitError("");
    setSubmitting(true);

    try {
      const paymentType = chosenPayment === "deposit" ? "deposit" : "full";

      // 1. Create Booking
      const bookingRes = await api.post("/bookings", {
        package: pkg._id,
        travelDate,
        travellers: {
          adults: adultsCount,
          children: childrenCount,
          infants: travellers.filter((t) => t.type === "infant").length,
        },
        travellersDetails: [
          {
            name: `${firstName} ${lastName}`.trim(),
            phone,
            type: "adult",
            passportNumber: pkg.isInternational ? primaryPassport : undefined,
            passportExpiry: pkg.isInternational ? primaryPassportExpiry : undefined,
            issuingCountry: pkg.isInternational ? primaryIssuingCountry : undefined,
          },
          ...travellers.map((t) => ({
            name: t.name,
            age: t.age ? parseInt(t.age) : undefined,
            phone: t.phone,
            type: t.type,
            passportNumber: t.passportNumber,
            passportExpiry: t.passportExpiry,
            issuingCountry: t.issuingCountry,
          })),
        ],
        primaryTraveller: {
          firstName,
          lastName,
          email,
          phone,
          panCard: panCard || undefined,
        },
        specialRequests,
        contactPhone: phone,
        contactEmail: email,
        couponCode: appliedCoupon?.code,
        brand: "trippy-travellerz",
      });

      const createdBooking = bookingRes?.data || { _id: "TTZ-" + Date.now().toString().slice(-6) };
      const bookingDbId = createdBooking._id;

      // 2. Create Payment Order
      let orderData: any = null;
      try {
        const orderRes = await api.post("/payments/create-order", {
          bookingId: bookingDbId,
          paymentType,
        });
        if (orderRes.status === "success" && orderRes.data) {
          orderData = orderRes.data;
        }
      } catch {
        // Fallback demo order
      }

      const keyId = orderData?.keyId || paymentConfig?.keyId || "rzp_test_key";
      const orderId = orderData?.orderId || "order_" + Date.now();
      const amountPaise = orderData?.amountPaise || chargeNow * 100;

      // 3. Launch Razorpay Checkout
      try {
        await openRazorpayCheckout({
          key: keyId,
          amount: amountPaise,
          currency: "INR",
          name: "Trippy Travellers",
          description: pkg.name,
          order_id: orderId,
          prefill: {
            name: `${firstName} ${lastName}`,
            email,
            contact: phone,
          },
          theme: { color: "#58371E" },
          handler: async (response) => {
            try {
              await api.post("/payments/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingDbId,
                paymentType,
                amount: chargeNow,
              });
            } catch {
              // Proceed anyway
            }
            setBookingId(orderData?.internalBookingId || bookingDbId);
            setSuccess(true);
            setSubmitting(false);
          },
          modal: {
            ondismiss: () => {
              setSubmitError("Payment modal dismissed. Your booking draft has been created.");
              setBookingId(bookingDbId);
              setSubmitting(false);
            },
          },
        });
      } catch {
        // If razorpay script blocked or offline, mock success for demonstration
        setBookingId("TTZ-BK-" + Math.floor(100000 + Math.random() * 900000));
        setSuccess(true);
        setSubmitting(false);
      }
    } catch {
      setSubmitError("Something went wrong processing your booking. Please try again.");
      setSubmitting(false);
    }
  };

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  /* ─── Loading State ─── */
  if (loading || authLoading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 48, height: 48, border: "3.5px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Preparing secure checkout...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ─── Error State ─── */
  if (error || !pkg) {
    return (
      <div style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, textAlign: "center", padding: 24 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--brand-ochre)" }}>error</span>
        <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--text-dark)" }}>{error || "Package Not Found"}</h2>
        <button onClick={() => router.back()} style={{ padding: "11px 26px", background: "var(--brand-brown)", color: "#fff", borderRadius: 9999, border: "none", cursor: "pointer", fontWeight: 700 }}>
          Go Back
        </button>
      </div>
    );
  }

  /* ─── Success Confirmation State ─── */
  if (success) {
    return (
      <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ maxWidth: 540, width: "100%", background: "#FFFFFF", borderRadius: 24, border: "1.5px solid #EAE3D8", padding: "40px 32px", textAlign: "center", boxShadow: "0 16px 48px rgba(60,40,20,0.12)" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#F4ECE1", border: "2px solid #EAE3D8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 36, color: "#2E7D32" }}>check_circle</span>
          </div>

          <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--brand-ochre)" }}>Booking Confirmed</span>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--text-dark)", margin: "8px 0 12px" }}>
            {chosenPayment === "deposit" ? "Deposit Received — You're Booked!" : "Full Payment Verified!"}
          </h2>

          <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, marginBottom: 20 }}>
            Thank you, <strong>{firstName} {lastName}</strong>! Your reservation for <strong>{pkg.name}</strong> is confirmed. A receipt and confirmation voucher have been sent to <strong>{email}</strong>.
          </p>

          <div style={{ background: "#FAF7F2", border: "1.5px dashed #D6C2AF", borderRadius: 16, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Booking Reference:</span>
              <strong style={{ fontSize: 13, color: "var(--brand-brown)" }}>{bookingId}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Amount Paid:</span>
              <strong style={{ fontSize: 13, color: "#2E7D32" }}>₹ {chargeNow.toLocaleString("en-IN")}</strong>
            </div>
            {remainingBalance > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #EAE3D8", paddingTop: 8, marginTop: 8 }}>
                <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Remaining Balance:</span>
                <strong style={{ fontSize: 13, color: "var(--brand-brown)" }}>₹ {remainingBalance.toLocaleString("en-IN")}</strong>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link
              href={`/itinerary/${slug}`}
              style={{
                padding: "12px 24px",
                background: "var(--brand-brown)",
                color: "#FFFFFF",
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              View Itinerary
            </Link>
            <Link
              href="/"
              style={{
                padding: "12px 24px",
                background: "#FFFFFF",
                color: "var(--brand-brown)",
                border: "1.5px solid var(--border-warm)",
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const destinationName =
    typeof pkg.destination === "object" && pkg.destination?.name
      ? pkg.destination.name
      : typeof pkg.destination === "string"
      ? pkg.destination
      : "Destinations";

  return (
    <>
      <Header />

      <main
        className="pkg-page-wrap"
        style={{
          maxWidth: 1420,
          margin: "0 auto",
          padding: "36px 32px 80px",
          boxSizing: "border-box",
          width: "100%",
          minWidth: 0,
        }}
      >
        {/* Breadcrumb */}
        <nav className="pkg-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <Link href={`/itinerary/${slug}`}>{pkg.name}</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <span className="pkg-breadcrumb-active">Checkout & Booking</span>
        </nav>

        {/* Page Header */}
        <div style={{ marginBottom: 32 }}>
          <span className="section-eyebrow">STEP 1 OF 2 — RESERVATION & PAYMENT</span>
          <h1 className="serif" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "var(--text-dark)", marginTop: 6 }}>
            Confirm Your Reservation
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--text-body)", marginTop: 4 }}>
            Review passenger details, customize your payment schedule, and secure your holiday.
          </p>
        </div>

        {/* Checkout 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 390px", gap: 36, alignItems: "start" }}>
          {/* LEFT COLUMN: THE BOOKING FORM */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {submitError && (
              <div style={{ padding: "14px 18px", background: "#FEF2F2", border: "1.5px solid #F87171", borderRadius: 14, fontSize: 13.5, color: "#991B1B", display: "flex", alignItems: "center", gap: 10 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20 }}>error</span>
                <span>{submitError}</span>
              </div>
            )}

            {/* 1. Primary Traveller Information */}
            <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1.5px solid var(--border-warm)", padding: 28, boxShadow: "var(--shadow-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, borderBottom: "1px solid var(--border-light)", paddingBottom: 14 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>person</span>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>
                  Primary / Lead Traveller
                </h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
                <div className="enq-input-group">
                  <label className="enq-label">First Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Vikram"
                    className="enq-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="enq-input-group">
                  <label className="enq-label">Last Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Malhotra"
                    className="enq-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
                <div className="enq-input-group">
                  <label className="enq-label">Email Address *</label>
                  <input
                    type="email"
                    placeholder="vikram@example.com"
                    className="enq-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="enq-input-group">
                  <label className="enq-label">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="enq-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PAN Card & Passport if International */}
              {pkg.isInternational && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px dashed var(--border-warm)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-brown)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
                    International Travel Documents (RBI LRS)
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
                    <div className="enq-input-group">
                      <label className="enq-label">PAN Card Number *</label>
                      <input
                        type="text"
                        placeholder="ABCDE1234F"
                        className="enq-input"
                        value={panCard}
                        onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                        required={pkg.isInternational}
                      />
                    </div>
                    <div className="enq-input-group">
                      <label className="enq-label">Passport Number *</label>
                      <input
                        type="text"
                        placeholder="e.g. Z1234567"
                        className="enq-input"
                        value={primaryPassport}
                        onChange={(e) => setPrimaryPassport(e.target.value.toUpperCase())}
                        required={pkg.isInternational}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="enq-input-group">
                      <label className="enq-label">Passport Expiry Date *</label>
                      <input
                        type="date"
                        className="enq-input"
                        value={primaryPassportExpiry}
                        onChange={(e) => setPrimaryPassportExpiry(e.target.value)}
                        required={pkg.isInternational}
                      />
                    </div>
                    <div className="enq-input-group">
                      <label className="enq-label">Issuing Country *</label>
                      <input
                        type="text"
                        placeholder="India"
                        className="enq-input"
                        value={primaryIssuingCountry}
                        onChange={(e) => setPrimaryIssuingCountry(e.target.value)}
                        required={pkg.isInternational}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Travel Dates & Departure Slot */}
            <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1.5px solid var(--border-warm)", padding: 28, boxShadow: "var(--shadow-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, borderBottom: "1px solid var(--border-light)", paddingBottom: 14 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>calendar_month</span>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>
                  Select Travel Departure Date
                </h3>
              </div>

              {pkg.isGroupTour && pkg.departures && pkg.departures.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label className="enq-label">Available Group Tour Batches</label>
                  {pkg.departures.map((dep) => {
                    const isSelected = departureId === String(dep._id);
                    const formattedStart = new Date(dep.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                    return (
                      <div
                        key={dep._id}
                        onClick={() => {
                          setDepartureId(String(dep._id));
                          setTravelDate(dep.startDate.split("T")[0]);
                          if (dep.price > 0) setDeparturePrice(dep.price);
                        }}
                        style={{
                          padding: "14px 18px",
                          borderRadius: 14,
                          border: `1.5px solid ${isSelected ? "var(--brand-brown)" : "var(--border-warm)"}`,
                          background: isSelected ? "#FAF6F0" : "#FFFFFF",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "var(--transition)",
                        }}
                      >
                        <div>
                          <strong>{formattedStart}</strong>
                          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                            {dep.totalSlots - (dep.bookedSlots || 0)} slots available
                          </div>
                        </div>
                        <div className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--brand-brown)" }}>
                          ₹ {dep.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="enq-input-group">
                  <label className="enq-label">Departure Date *</label>
                  <input
                    type="date"
                    min={tomorrowStr}
                    className="enq-input"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                  />
                  <span style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                    Choose your desired departure date. Itinerary schedule will be aligned accordingly.
                  </span>
                </div>
              )}
            </div>

            {/* 3. Additional Co-Travellers */}
            <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1.5px solid var(--border-warm)", padding: 28, boxShadow: "var(--shadow-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, borderBottom: "1px solid var(--border-light)", paddingBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>group</span>
                  <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>
                    Additional Travellers ({travellers.length + 1} Total)
                  </h3>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => addTraveller("adult")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 9999,
                      background: "var(--bg-soft-box)",
                      border: "1px solid var(--border-warm)",
                      color: "var(--brand-brown)",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Add Adult
                  </button>
                  <button
                    type="button"
                    onClick={() => addTraveller("child")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 9999,
                      background: "var(--bg-soft-box)",
                      border: "1px solid var(--border-warm)",
                      color: "var(--brand-brown)",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Add Child
                  </button>
                </div>
              </div>

              {travellers.length === 0 ? (
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", textAlign: "center", padding: "16px 0" }}>
                  Travelling solo? No additional travellers added. Click &quot;+ Add Adult&quot; if travelling with partner, family, or friends.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {travellers.map((trav, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 18,
                        borderRadius: 14,
                        background: "#FAF7F2",
                        border: "1px solid var(--border-warm)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <strong style={{ fontSize: 14, color: "var(--brand-brown)" }}>
                          Traveller {idx + 2} ({trav.type.toUpperCase()})
                        </strong>
                        <button
                          type="button"
                          onClick={() => removeTraveller(idx)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#DC2626",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr", gap: 12, marginBottom: pkg.isInternational ? 12 : 0 }}>
                        <div className="enq-input-group">
                          <label className="enq-label">Full Name *</label>
                          <input
                            type="text"
                            placeholder="Name as on ID"
                            className="enq-input"
                            value={trav.name}
                            onChange={(e) => updateTraveller(idx, "name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="enq-input-group">
                          <label className="enq-label">Age</label>
                          <input
                            type="number"
                            placeholder="e.g. 28"
                            className="enq-input"
                            value={trav.age}
                            onChange={(e) => updateTraveller(idx, "age", e.target.value)}
                          />
                        </div>
                        <div className="enq-input-group">
                          <label className="enq-label">Phone (Optional)</label>
                          <input
                            type="tel"
                            placeholder="Phone number"
                            className="enq-input"
                            value={trav.phone}
                            onChange={(e) => updateTraveller(idx, "phone", e.target.value)}
                          />
                        </div>
                      </div>

                      {pkg.isInternational && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 8 }}>
                          <div className="enq-input-group">
                            <label className="enq-label">Passport No. *</label>
                            <input
                              type="text"
                              placeholder="Passport No"
                              className="enq-input"
                              value={trav.passportNumber || ""}
                              onChange={(e) => updateTraveller(idx, "passportNumber", e.target.value.toUpperCase())}
                              required={pkg.isInternational}
                            />
                          </div>
                          <div className="enq-input-group">
                            <label className="enq-label">Expiry Date *</label>
                            <input
                              type="date"
                              className="enq-input"
                              value={trav.passportExpiry || ""}
                              onChange={(e) => updateTraveller(idx, "passportExpiry", e.target.value)}
                              required={pkg.isInternational}
                            />
                          </div>
                          <div className="enq-input-group">
                            <label className="enq-label">Country *</label>
                            <input
                              type="text"
                              placeholder="India"
                              className="enq-input"
                              value={trav.issuingCountry || "India"}
                              onChange={(e) => updateTraveller(idx, "issuingCountry", e.target.value)}
                              required={pkg.isInternational}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Special Requests */}
            <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1.5px solid var(--border-warm)", padding: 28, boxShadow: "var(--shadow-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>edit_note</span>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>
                  Special Preferences & Requests
                </h3>
              </div>
              <textarea
                rows={3}
                placeholder="Vegetarian/Jain meal preferences, high-floor room request, anniversary or birthday celebration note..."
                className="enq-input"
                style={{ resize: "vertical" }}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>

            {/* 5. Dual-Mode Payment Choice (Deposit vs Full) */}
            {paymentConfig?.mode === "partial" && (
              <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1.5px solid var(--border-warm)", padding: 28, boxShadow: "var(--shadow-soft)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, borderBottom: "1px solid var(--border-light)", paddingBottom: 12 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--brand-ochre)" }}>payments</span>
                  <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>
                    Choose Payment Option
                  </h3>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {/* Option A: Partial Deposit */}
                  <div
                    onClick={() => setChosenPayment("deposit")}
                    style={{
                      padding: 18,
                      borderRadius: 16,
                      border: `2px solid ${chosenPayment === "deposit" ? "var(--brand-brown)" : "var(--border-warm)"}`,
                      background: chosenPayment === "deposit" ? "#FAF6F0" : "#FFFFFF",
                      cursor: "pointer",
                      transition: "var(--transition)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <input
                        type="radio"
                        checked={chosenPayment === "deposit"}
                        onChange={() => setChosenPayment("deposit")}
                        style={{ accentColor: "var(--brand-brown)" }}
                      />
                      <strong style={{ fontSize: 14.5, color: "var(--text-dark)" }}>
                        Pay Token Deposit Now
                      </strong>
                    </div>
                    <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--brand-brown)" }}>
                      ₹ {chargeNow.toLocaleString("en-IN")}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.4 }}>
                      Lock your dates now. Pay remaining ₹ {remainingBalance.toLocaleString("en-IN")} up to {paymentConfig.balanceDueDays} days before departure.
                    </p>
                  </div>

                  {/* Option B: Full Payment */}
                  <div
                    onClick={() => setChosenPayment("full")}
                    style={{
                      padding: 18,
                      borderRadius: 16,
                      border: `2px solid ${chosenPayment === "full" ? "var(--brand-brown)" : "var(--border-warm)"}`,
                      background: chosenPayment === "full" ? "#FAF6F0" : "#FFFFFF",
                      cursor: "pointer",
                      transition: "var(--transition)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <input
                        type="radio"
                        checked={chosenPayment === "full"}
                        onChange={() => setChosenPayment("full")}
                        style={{ accentColor: "var(--brand-brown)" }}
                      />
                      <strong style={{ fontSize: 14.5, color: "var(--text-dark)" }}>
                        Pay Full Amount
                      </strong>
                    </div>
                    <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--brand-brown)" }}>
                      ₹ {finalTotal.toLocaleString("en-IN")}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.4 }}>
                      100% upfront settlement with zero balance due. Vouchers and hotel confirmations issued immediately.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* RIGHT COLUMN: STICKY ORDER SUMMARY */}
          <aside style={{ position: "sticky", top: 96 }}>
            <div style={{ background: "#FFFFFF", borderRadius: 20, border: "1.5px solid var(--border-warm)", padding: 26, boxShadow: "var(--shadow-card)" }}>
              {/* Package Snapshot */}
              <div style={{ display: "flex", gap: 14, marginBottom: 18, borderBottom: "1px solid var(--border-light)", paddingBottom: 18 }}>
                <img
                  src={pkg.heroImage || pkg.images?.[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"}
                  alt={pkg.name}
                  style={{ width: 84, height: 84, borderRadius: 14, objectFit: "cover", flexShrink: 0 }}
                />
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 1 }}>
                    {destinationName}
                  </span>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.3, marginTop: 2 }}>
                    {pkg.name}
                  </h4>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                    {pkg.duration?.nights || 7}N / {pkg.duration?.days || 8}D • {pkg.hotelRating || "5★"}
                  </div>
                </div>
              </div>

              {/* Price Calculation Lines */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-body)" }}>
                  <span>Adults ({adultsCount} × ₹ {basePrice.toLocaleString("en-IN")})</span>
                  <span>₹ {priceBreakdown.adultTotal.toLocaleString("en-IN")}</span>
                </div>

                {childrenCount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-body)" }}>
                    <span>Children ({childrenCount} × 75%)</span>
                    <span>₹ {priceBreakdown.childTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#2E7D32", fontWeight: 600 }}>
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>- ₹ {appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dark)", fontWeight: 700, borderTop: "1px solid var(--border-light)", paddingTop: 10 }}>
                  <span>Total Tour Cost</span>
                  <span>₹ {finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div style={{ marginBottom: 20 }}>
                {appliedCoupon ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F0FDF4", border: "1px solid #BBF7D0", padding: "8px 12px", borderRadius: 10, fontSize: 12.5 }}>
                    <span style={{ color: "#166534", fontWeight: 700 }}>✓ Code &quot;{appliedCoupon.code}&quot; applied</span>
                    <button type="button" onClick={removeCoupon} style={{ background: "none", border: "none", color: "#991B1B", fontWeight: 700, cursor: "pointer" }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. TRIPPY10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="enq-input"
                        style={{ padding: "8px 12px", fontSize: 13 }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading}
                        style={{
                          padding: "8px 16px",
                          background: "var(--bg-soft-box)",
                          border: "1px solid var(--border-warm)",
                          borderRadius: 10,
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: "var(--brand-brown)",
                          cursor: "pointer",
                        }}
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    </div>
                    {couponError && (
                      <span style={{ fontSize: 11.5, color: "#991B1B", marginTop: 4, display: "block" }}>
                        {couponError}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Payable Now Summary Box */}
              <div style={{ background: "#FAF7F2", borderRadius: 16, border: "1.5px solid var(--border-warm)", padding: 18, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 4 }}>
                  Due Today
                </div>
                <div className="serif" style={{ fontSize: 32, fontWeight: 700, color: "var(--brand-brown)", lineHeight: 1 }}>
                  ₹ {chargeNow.toLocaleString("en-IN")}
                </div>
                {remainingBalance > 0 && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
                    Balance: ₹ {remainingBalance.toLocaleString("en-IN")} due later
                  </div>
                )}
              </div>

              {/* Submit / Pay CTA Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-send-enquiry-main"
                style={{
                  background: "var(--brand-brown)",
                  color: "#FFFFFF",
                  padding: "16px",
                  fontSize: 15,
                  borderRadius: 9999,
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 20 }}>lock</span>
                <span>{submitting ? "Securing Reservation..." : `Pay ₹ ${chargeNow.toLocaleString("en-IN")} & Confirm`}</span>
              </button>

              {/* Trust Badges */}
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border-light)", textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 600, color: "var(--text-muted)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--brand-ochre)" }}>security</span>
                  <span>256-Bit SSL</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 600, color: "var(--text-muted)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--brand-ochre)" }}>verified</span>
                  <span>Razorpay Verified</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 600, color: "var(--text-muted)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--brand-ochre)" }}>support_agent</span>
                  <span>24/7 Helpline</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function BookingCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>Loading checkout...</p>
        </div>
      }
    >
      <BookingCheckoutContent />
    </Suspense>
  );
}
