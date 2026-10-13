"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { generateBookingPdf, BookingPdfData } from "@/lib/generateBookingPdf";

interface BookingItem {
  _id: string;
  bookingId?: string;
  package?: {
    _id?: string;
    name?: string;
    slug?: string;
    images?: string[];
    duration?: { days: number; nights: number } | number;
  };
  destination?: { name?: string; slug?: string } | string;
  travelDate?: string;
  bookingStatus?: string;
  status?: string;
  totalAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
  travellers?: { adults?: number; children?: number };
  createdAt?: string;
}

interface EnquiryItem {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  packageName?: string;
  destinationName?: string;
  travelDate?: string;
  guests?: string;
  status?: string;
  createdAt?: string;
}

interface WishlistPackage {
  _id: string;
  name: string;
  slug?: string;
  destination?: { name?: string; slug?: string } | string;
  images?: string[];
  price?: number;
  duration?: { days?: number; nights?: number } | number;
  rating?: number;
}

interface ReviewItem {
  _id: string;
  package?: { _id?: string; name?: string; slug?: string; images?: string[] };
  rating: number;
  title?: string;
  comment?: string;
  tripType?: string;
  isApproved?: boolean;
  createdAt?: string;
}

const VALID_DASHBOARD_TABS = ["overview", "bookings", "enquiries", "wishlist", "reviews", "profile"] as const;
type DashboardTab = typeof VALID_DASHBOARD_TABS[number];

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout, refreshUser } = useAuth();

  const urlTab = searchParams.get("tab") as DashboardTab | null;
  const initialTab: DashboardTab = urlTab && VALID_DASHBOARD_TABS.includes(urlTab) ? urlTab : "overview";

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as DashboardTab | null;
    if (tabFromUrl && VALID_DASHBOARD_TABS.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    router.replace(`/dashboard?tab=${tab}`, { scroll: false });
  };

  // Data states
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistPackage[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [wishlistRemovingId, setWishlistRemovingId] = useState<string | null>(null);

  // Voucher modal state
  const [selectedVoucherBooking, setSelectedVoucherBooking] = useState<BookingItem | null>(null);

  // Review submission modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewPackageId, setReviewPackageId] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewTripType, setReviewTripType] = useState("Couple");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  // Profile edit states
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setEditFirstName(user.firstName || "");
      setEditLastName(user.lastName || "");
      setEditPhone(user.phone || "");
    }
  }, [user]);

  // Fetch traveler data
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoadingData(true);

        // Fetch bookings
        try {
          const bRes = await api.get("/bookings/my");
          if (bRes.status === "success" && bRes.data) {
            const list = bRes.data.bookings || bRes.data;
            if (Array.isArray(list)) setBookings(list);
          }
        } catch (e) {
          console.error("Failed to load bookings:", e);
        }

        // Fetch enquiries
        try {
          const eRes = await api.get("/enquiries/my");
          if (eRes.status === "success" && eRes.data) {
            const list = eRes.data.enquiries || eRes.data;
            if (Array.isArray(list)) setEnquiries(list);
          }
        } catch (e) {
          console.error("Failed to load enquiries:", e);
        }

        // Fetch wishlist
        try {
          const wRes = await api.get("/users/wishlist");
          if (wRes.status === "success" && wRes.data) {
            const list = wRes.data.wishlist || wRes.data;
            if (Array.isArray(list)) setWishlist(list);
          }
        } catch (e) {
          console.error("Failed to load wishlist:", e);
        }

        // Fetch user reviews
        try {
          const rRes = await api.get("/reviews/me");
          if (rRes.status === "success" && rRes.data) {
            const list = rRes.data.reviews || rRes.data;
            if (Array.isArray(list)) setReviews(list);
          }
        } catch (e) {
          console.error("Failed to load reviews:", e);
        }
      } finally {
        setLoadingData(false);
      }
    }

    loadDashboard();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleRemoveWishlist = async (packageId: string) => {
    setWishlistRemovingId(packageId);
    try {
      await api.del(`/users/wishlist/${packageId}`);
      setWishlist((prev) => prev.filter((p) => p._id !== packageId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    } finally {
      setWishlistRemovingId(null);
    }
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewPackageId || !reviewTitle.trim() || !reviewComment.trim()) {
      setReviewMessage("Please fill in all review fields.");
      return;
    }

    setReviewSubmitting(true);
    setReviewMessage("");

    try {
      const res = await api.post("/reviews", {
        package: reviewPackageId,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
        tripType: reviewTripType,
      });

      if (res.status === "success") {
        setReviewMessage("Review submitted successfully! It will appear once approved.");
        // Refresh reviews
        const rRes = await api.get("/reviews/me");
        if (rRes.status === "success" && rRes.data) {
          setReviews(rRes.data.reviews || rRes.data || []);
        }
        setTimeout(() => {
          setShowReviewModal(false);
          setReviewTitle("");
          setReviewComment("");
          setReviewMessage("");
        }, 1500);
      } else {
        setReviewMessage(res.message || "Failed to submit review.");
      }
    } catch (err) {
      console.error("Review submission error:", err);
      setReviewMessage("An error occurred while publishing your review.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMessage("");
    setProfileError("");

    if (newPassword) {
      if (newPassword.length < 6) {
        setProfileError("New password must be at least 6 characters long.");
        setProfileSaving(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setProfileError("New password and confirmation do not match.");
        setProfileSaving(false);
        return;
      }
    }

    try {
      const res = await api.put("/auth/profile", {
        firstName: editFirstName,
        lastName: editLastName,
        phone: editPhone,
        ...(newPassword ? { currentPassword, newPassword } : {}),
      });

      if (res.status === "success") {
        setProfileMessage("Profile updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // Refresh auth context so header avatar updates
        await refreshUser();
      } else {
        setProfileError(res.message || "Failed to update profile.");
      }
    } catch {
      setProfileError("Unable to save profile changes right now.");
    } finally {
      setProfileSaving(false);
    }
  };

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "TT";

  // Calculate stats
  const totalBookingsCount = bookings.length;
  const now = new Date();
  const upcomingTrips = bookings.filter((b) => b.travelDate && new Date(b.travelDate) >= now);
  const nextTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;

  return (
    <AuthGuard>
      <Header />

      <main className="dash-page-wrapper">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="pkg-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
            <Link href="/">Home</Link>
            <span className="pkg-breadcrumb-sep">/</span>
            <span className="pkg-breadcrumb-active">Traveler Cockpit & Account</span>
          </nav>

          {/* Dashboard Two-Column Layout */}
          <div className="dash-two-col-layout">
            {/* LEFT: Traveler Profile Sidebar */}
            <aside className="dash-sidebar-panel">
              <div className="dash-user-card">
                <div className="dash-user-avatar-wrap">
                  <div className="dash-user-avatar-monogram">
                    {initials}
                  </div>
                  <span className="dash-status-dot" title="Active Traveler Session" />
                </div>

                <h3 className="serif dash-user-name">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="dash-user-email">{user?.email}</p>

                <div className="dash-tier-badge">
                  <span className="material-symbols-rounded">diamond</span>
                  <span>Connoisseur Traveler</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="dash-nav-menu">
                <button
                  type="button"
                  className={`dash-nav-item ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => handleTabChange("overview")}
                >
                  <span className="material-symbols-rounded">dashboard</span>
                  <span>Overview</span>
                </button>

                <button
                  type="button"
                  className={`dash-nav-item ${activeTab === "bookings" ? "active" : ""}`}
                  onClick={() => handleTabChange("bookings")}
                >
                  <span className="material-symbols-rounded">luggage</span>
                  <span>My Bookings</span>
                  {totalBookingsCount > 0 && (
                    <span className="dash-pill-counter">{totalBookingsCount}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`dash-nav-item ${activeTab === "enquiries" ? "active" : ""}`}
                  onClick={() => handleTabChange("enquiries")}
                >
                  <span className="material-symbols-rounded">assignment</span>
                  <span>Bespoke Quotes</span>
                  {enquiries.length > 0 && (
                    <span className="dash-pill-counter">{enquiries.length}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`dash-nav-item ${activeTab === "wishlist" ? "active" : ""}`}
                  onClick={() => handleTabChange("wishlist")}
                >
                  <span className="material-symbols-rounded">favorite</span>
                  <span>Saved Escapes</span>
                  {wishlist.length > 0 && (
                    <span className="dash-pill-counter">{wishlist.length}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`dash-nav-item ${activeTab === "reviews" ? "active" : ""}`}
                  onClick={() => handleTabChange("reviews")}
                >
                  <span className="material-symbols-rounded">rate_review</span>
                  <span>My Reviews</span>
                  {reviews.length > 0 && (
                    <span className="dash-pill-counter">{reviews.length}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`dash-nav-item ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => handleTabChange("profile")}
                >
                  <span className="material-symbols-rounded">manage_accounts</span>
                  <span>Profile & Security</span>
                </button>

                <div style={{ height: 1, background: "var(--border-light)", margin: "14px 0" }} />

                <button
                  type="button"
                  className="dash-nav-item logout"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-rounded">logout</span>
                  <span>Log Out</span>
                </button>
              </nav>

              {/* Private Concierge Box */}
              <div className="dash-concierge-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div className="dash-concierge-icon">
                    <span className="material-symbols-rounded">support_agent</span>
                  </div>
                  <div>
                    <h4 className="serif" style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "var(--brand-brown)" }}>
                      Private Concierge
                    </h4>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>24/7 Priority Travel Desk</span>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: "var(--text-body)", margin: "0 0 14px", lineHeight: 1.45 }}>
                  Need flight updates, villa transfers, or custom culinary reservations?
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Trippy%20Travellerz%2C%20I%20need%20assistance%20with%20my%20dashboard."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dash-concierge-btn"
                >
                  <span>Chat on WhatsApp</span>
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
                </a>
              </div>
            </aside>

            {/* RIGHT: Content Panels */}
            <div className="dash-main-content">
              {/* ─── TAB 1: OVERVIEW ─── */}
              {activeTab === "overview" && (
                <div className="dash-tab-content">
                  {/* Welcome Greeting */}
                  <div className="dash-tab-header">
                    <span className="section-eyebrow">WELCOME BACK</span>
                    <h2 className="serif dash-tab-title">
                      Welcome, {user?.firstName || "Traveler"}
                    </h2>
                    <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                      Here is the real-time summary of your current bookings, saved escapes, and bespoke requests.
                    </p>
                  </div>

                  {/* 4 Stats Cards Grid */}
                  <div className="dash-stats-grid">
                    <div className="dash-stat-card" onClick={() => handleTabChange("bookings")} style={{ cursor: "pointer" }}>
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(88,55,30,0.08)", color: "var(--brand-brown)" }}>
                        <span className="material-symbols-rounded">luggage</span>
                      </div>
                      <span className="dash-stat-num">{totalBookingsCount}</span>
                      <span className="dash-stat-label">Total Reservations</span>
                    </div>

                    <div className="dash-stat-card" onClick={() => handleTabChange("bookings")} style={{ cursor: "pointer" }}>
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(142,95,50,0.1)", color: "var(--brand-ochre)" }}>
                        <span className="material-symbols-rounded">flight_takeoff</span>
                      </div>
                      <span className="dash-stat-num">{upcomingTrips.length}</span>
                      <span className="dash-stat-label">Upcoming Escapes</span>
                    </div>

                    <div className="dash-stat-card" onClick={() => handleTabChange("wishlist")} style={{ cursor: "pointer" }}>
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(225,29,72,0.08)", color: "#E11D48" }}>
                        <span className="material-symbols-rounded">favorite</span>
                      </div>
                      <span className="dash-stat-num">{wishlist.length}</span>
                      <span className="dash-stat-label">Saved Wishlist</span>
                    </div>

                    <div className="dash-stat-card" onClick={() => handleTabChange("enquiries")} style={{ cursor: "pointer" }}>
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(37,211,102,0.1)", color: "#16A34A" }}>
                        <span className="material-symbols-rounded">assignment</span>
                      </div>
                      <span className="dash-stat-num">{enquiries.length}</span>
                      <span className="dash-stat-label">Active Enquiries</span>
                    </div>
                  </div>

                  {/* Next Trip Spotlight Banner */}
                  {nextTrip && (
                    <div className="dash-spotlight-card">
                      <div className="dash-spotlight-photo">
                        <img
                          src={nextTrip.package?.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"}
                          alt={nextTrip.package?.name || "Trip"}
                        />
                      </div>
                      <div className="dash-spotlight-content">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span className="section-eyebrow" style={{ color: "var(--brand-gold)" }}>NEXT CONFIRMED ADVENTURE</span>
                          <span className="dash-confirmed-badge">Ready for Departure</span>
                        </div>
                        <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px" }}>
                          {nextTrip.package?.name || "Bespoke Luxury Odyssey"}
                        </h3>
                        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", margin: "0 0 16px" }}>
                          Departs on <strong>{nextTrip.travelDate?.split("T")[0]}</strong> • Booking Ref: <strong>{nextTrip.bookingId || nextTrip._id.slice(-8).toUpperCase()}</strong>
                        </p>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                          <Link
                            href={`/dashboard/bookings/${nextTrip._id}`}
                            className="btn-dash-voucher"
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>manage_search</span>
                            <span>Manage & Pay Balance</span>
                          </Link>
                          <button
                            type="button"
                            className="btn-dash-outline"
                            onClick={() => generateBookingPdf(nextTrip as unknown as BookingPdfData)}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>download</span>
                            <span>Download PDF</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recent Bookings Table */}
                  <div className="dash-section-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                      <h3 className="serif" style={{ fontSize: 19, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                        Recent Bookings & Receipts
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleTabChange("bookings")}
                        style={{ background: "transparent", border: "none", color: "var(--brand-ochre)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                      >
                        View All ({totalBookingsCount}) →
                      </button>
                    </div>

                    {bookings.length > 0 ? (
                      <div className="dash-table-container">
                        <table className="dash-table">
                          <thead>
                            <tr>
                              <th>Reference</th>
                              <th>Package Journey</th>
                              <th>Travel Date</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.slice(0, 4).map((b) => {
                              const bStat = (b.status || b.bookingStatus || "confirmed").toLowerCase();
                              return (
                                <tr key={b._id}>
                                  <td>
                                    <strong style={{ color: "var(--brand-brown)", fontSize: 13 }}>
                                      {b.bookingId || `TTZ-${b._id.slice(-6).toUpperCase()}`}
                                    </strong>
                                  </td>
                                  <td>
                                    <span style={{ fontWeight: 600, color: "var(--text-dark)", fontSize: 13.5 }}>
                                      {b.package?.name || "Curated Journey"}
                                    </span>
                                  </td>
                                  <td>
                                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                                      {b.travelDate ? b.travelDate.split("T")[0] : "Flexible"}
                                    </span>
                                  </td>
                                  <td>
                                    <strong style={{ color: "var(--text-dark)", fontSize: 13.5 }}>
                                      ₹ {(b.totalAmount || 74999).toLocaleString("en-IN")}
                                    </strong>
                                  </td>
                                  <td>
                                    <span className={`dash-badge-status ${bStat === "confirmed" ? "confirmed" : bStat === "completed" ? "completed" : bStat === "cancelled" ? "cancelled" : "in-progress"}`}>
                                      {bStat.charAt(0).toUpperCase() + bStat.slice(1)}
                                    </span>
                                  </td>
                                  <td>
                                    <div style={{ display: "flex", gap: 6 }}>
                                      <Link
                                        href={`/dashboard/bookings/${b._id}`}
                                        className="dash-action-btn"
                                        style={{ textDecoration: "none" }}
                                      >
                                        Details
                                      </Link>
                                      <button
                                        type="button"
                                        className="dash-action-btn"
                                        onClick={() => setSelectedVoucherBooking(b)}
                                      >
                                        Voucher
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={{ textAlign: "center", padding: "40px 20px" }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 44, color: "var(--brand-ochre)", marginBottom: 8 }}>luggage</span>
                        <h4 className="serif" style={{ fontSize: 18, color: "var(--text-dark)", margin: "0 0 6px" }}>No Bookings Yet</h4>
                        <p style={{ fontSize: 13.5, color: "var(--text-muted)", maxWidth: 360, margin: "0 auto 18px" }}>
                          You have not booked any journeys yet. Explore our curated catalog and start planning!
                        </p>
                        <Link href="/packages" className="btn-dash-primary">
                          Explore Packages
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── TAB 2: MY BOOKINGS ─── */}
              {activeTab === "bookings" && (
                <div className="dash-tab-content">
                  <div className="dash-tab-header">
                    <span className="section-eyebrow">TRAVEL HISTORY</span>
                    <h2 className="serif dash-tab-title">
                      My Booked Journeys
                    </h2>
                    <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                      Access your official confirmation vouchers, pay remaining installments, and review itinerary specifics.
                    </p>
                  </div>

                  {bookings.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      {bookings.map((b) => {
                        const bStat = (b.status || b.bookingStatus || "confirmed").toLowerCase();
                        const total = b.totalAmount || 0;
                        const paid = b.paidAmount ?? total;
                        const remaining = Math.max(0, total - paid);

                        return (
                          <div key={b._id} className="dash-booking-card">
                            <div className="dash-booking-card-head">
                              <div>
                                <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color: "var(--brand-ochre)" }}>
                                  BOOKING REFERENCE
                                </span>
                                <strong style={{ fontSize: 16, color: "var(--brand-brown)", display: "block" }}>
                                  {b.bookingId || `TTZ-${b._id.slice(-6).toUpperCase()}`}
                                </strong>
                              </div>
                              <span className={`dash-badge-status ${bStat === "confirmed" ? "confirmed" : bStat === "completed" ? "completed" : bStat === "cancelled" ? "cancelled" : "in-progress"}`}>
                                {bStat.charAt(0).toUpperCase() + bStat.slice(1)}
                              </span>
                            </div>

                            <div className="dash-booking-card-body">
                              <div className="dash-booking-thumb">
                                <img
                                  src={b.package?.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"}
                                  alt={b.package?.name || "Trip"}
                                />
                              </div>
                              <div className="dash-booking-info">
                                <h4 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 6px" }}>
                                  {b.package?.name || "Curated Luxury Package"}
                                </h4>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
                                  <span>📅 Departure: <strong>{b.travelDate ? b.travelDate.split("T")[0] : "Pending confirmation"}</strong></span>
                                  <span>👥 Travelers: <strong>{b.travellers?.adults || 2} Adults</strong></span>
                                  <span>💵 Total: <strong style={{ color: "var(--brand-brown)" }}>₹ {total.toLocaleString("en-IN")}</strong></span>
                                  {remaining > 0 && bStat !== "cancelled" && (
                                    <span>⚠️ Balance Due: <strong style={{ color: "#DC2626" }}>₹ {remaining.toLocaleString("en-IN")}</strong></span>
                                  )}
                                </div>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                  <Link
                                    href={`/dashboard/bookings/${b._id}`}
                                    className="btn-dash-action-sm"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>manage_search</span>
                                    <span>Manage & Pay Balance</span>
                                  </Link>
                                  <button
                                    type="button"
                                    className="btn-dash-outline-sm"
                                    onClick={() => generateBookingPdf(b as unknown as BookingPdfData)}
                                  >
                                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>download</span>
                                    <span>PDF Voucher</span>
                                  </button>
                                  {b.package?.slug && (
                                    <Link
                                      href={`/itinerary/${b.package.slug}`}
                                      className="btn-dash-outline-sm"
                                    >
                                      View Itinerary
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="dash-empty-box">
                      <span className="material-symbols-rounded" style={{ fontSize: 50, color: "var(--brand-ochre)" }}>luggage</span>
                      <h3 className="serif" style={{ fontSize: 20, margin: "10px 0 6px" }}>No Confirmed Bookings Yet</h3>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
                        Your journey begins here. Explore our handcrafted escapes across Dubai, Bali, and beyond.
                      </p>
                      <Link href="/packages" className="btn-dash-primary">
                        Browse Curated Tours
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 3: BESPOKE QUOTES / ENQUIRIES ─── */}
              {activeTab === "enquiries" && (
                <div className="dash-tab-content">
                  <div className="dash-tab-header">
                    <span className="section-eyebrow">CUSTOM REQUESTS</span>
                    <h2 className="serif dash-tab-title">
                      Bespoke Itinerary Quotes
                    </h2>
                    <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                      Private travel requests currently in review with our travel designers.
                    </p>
                  </div>

                  {enquiries.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {enquiries.map((enq) => (
                        <div key={enq._id} className="dash-enquiry-card">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                            <div>
                              <h4 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--brand-brown)", margin: "0 0 4px" }}>
                                {enq.packageName || enq.destinationName || "Custom Tailored Escape"}
                              </h4>
                              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                Submitted on {enq.createdAt ? enq.createdAt.split("T")[0] : "Recently"}
                              </span>
                            </div>
                            <span className="dash-badge-status in-progress">
                              {enq.status || "Specialist Reviewing"}
                            </span>
                          </div>

                          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--text-body)" }}>
                            <span>Target Date: <strong>{enq.travelDate || "Flexible"}</strong></span>
                            <span>Party: <strong>{enq.guests || "2 Guests"}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="dash-empty-box">
                      <span className="material-symbols-rounded" style={{ fontSize: 50, color: "var(--brand-ochre)" }}>edit_note</span>
                      <h3 className="serif" style={{ fontSize: 20, margin: "10px 0 6px" }}>No Open Enquiries</h3>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
                        Need a 100% custom itinerary tailored to your dates, pace, and passions?
                      </p>
                      <Link href="/packages" className="btn-dash-primary">
                        Request Custom Itinerary
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 4: WISHLIST / SAVED ESCAPES ─── */}
              {activeTab === "wishlist" && (
                <div className="dash-tab-content">
                  <div className="dash-tab-header">
                    <span className="section-eyebrow">FAVORITES</span>
                    <h2 className="serif dash-tab-title">
                      Saved Journeys & Escapes
                    </h2>
                    <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                      Tours and retreats you have bookmarked for future travel plans.
                    </p>
                  </div>

                  {wishlist.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                      {wishlist.map((pkg) => {
                        const destStr = typeof pkg.destination === "object" ? pkg.destination?.name : pkg.destination || "Curated Destination";
                        const durStr = typeof pkg.duration === "object" && pkg.duration
                          ? `${pkg.duration.nights || 0}N / ${pkg.duration.days || 0}D`
                          : typeof pkg.duration === "number" ? `${pkg.duration} Days` : "Multi-day";

                        return (
                          <div
                            key={pkg._id}
                            style={{
                              background: "#FFFFFF",
                              borderRadius: 18,
                              border: "1px solid var(--border-warm)",
                              overflow: "hidden",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div style={{ position: "relative", height: 180, background: "#EAE3D8" }}>
                              <img
                                src={pkg.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"}
                                alt={pkg.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveWishlist(pkg._id)}
                                disabled={wishlistRemovingId === pkg._id}
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                  background: "rgba(255,255,255,0.9)",
                                  border: "none",
                                  width: 34,
                                  height: 34,
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#E11D48",
                                  cursor: "pointer",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                }}
                                title="Remove from wishlist"
                              >
                                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                                  {wishlistRemovingId === pkg._id ? "hourglass_empty" : "favorite"}
                                </span>
                              </button>
                            </div>

                            <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                                <span>{destStr}</span>
                                <span>{durStr}</span>
                              </div>
                              <h4 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--brand-brown)", margin: "0 0 10px" }}>
                                {pkg.name}
                              </h4>
                              {pkg.price ? (
                                <div style={{ marginTop: "auto", marginBottom: 14 }}>
                                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>From</span>
                                  <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)" }}>
                                    ₹ {pkg.price.toLocaleString("en-IN")} <span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-muted)" }}>/ adult</span>
                                  </div>
                                </div>
                              ) : null}

                              <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                                <Link
                                  href={pkg.slug ? `/itinerary/${pkg.slug}` : "/packages"}
                                  className="btn-dash-primary"
                                  style={{ flex: 1, justifyContent: "center", padding: "8px 12px", fontSize: 13 }}
                                >
                                  View Journey
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveWishlist(pkg._id)}
                                  className="btn-dash-outline"
                                  style={{ padding: "8px 12px", fontSize: 13 }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="dash-empty-box">
                      <span className="material-symbols-rounded" style={{ fontSize: 50, color: "#E11D48" }}>favorite</span>
                      <h3 className="serif" style={{ fontSize: 20, margin: "10px 0 6px" }}>Your Wishlist Is Empty</h3>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
                        Click the heart icon on any tour package to save it here for quick comparison and future bookings.
                      </p>
                      <Link href="/packages" className="btn-dash-primary">
                        Explore Handpicked Tours
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 5: MY REVIEWS ─── */}
              {activeTab === "reviews" && (
                <div className="dash-tab-content">
                  <div className="dash-tab-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
                    <div>
                      <span className="section-eyebrow">COMMUNITY & EXPERIENCES</span>
                      <h2 className="serif dash-tab-title">
                        My Reviews & Stories
                      </h2>
                      <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                        Manage reviews and ratings you have shared for completed travel itineraries.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowReviewModal(true)}
                      className="btn-dash-primary"
                    >
                      <span className="material-symbols-rounded">edit</span>
                      <span>Write a Review</span>
                    </button>
                  </div>

                  {reviews.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {reviews.map((rev) => (
                        <div
                          key={rev._id}
                          style={{
                            background: "#FFFFFF",
                            borderRadius: 18,
                            border: "1px solid var(--border-warm)",
                            padding: 24,
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
                            <div>
                              <h4 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--brand-brown)", margin: "0 0 4px" }}>
                                {rev.package?.name || "Curated Journey"}
                              </h4>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ display: "flex", color: "#F59E0B" }}>
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className="material-symbols-rounded" style={{ fontSize: 18 }}>
                                      {i < rev.rating ? "star" : "star_outline"}
                                    </span>
                                  ))}
                                </div>
                                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-dark)" }}>
                                  {rev.rating}.0 / 5.0
                                </span>
                                {rev.tripType && (
                                  <span style={{ fontSize: 11, background: "var(--bg-cream)", padding: "2px 8px", borderRadius: 999, color: "var(--text-muted)" }}>
                                    {rev.tripType} Travel
                                  </span>
                                )}
                              </div>
                            </div>

                            <span className={`dash-badge-status ${rev.isApproved ? "confirmed" : "in-progress"}`}>
                              {rev.isApproved ? "Published" : "Pending Moderation"}
                            </span>
                          </div>

                          {rev.title && (
                            <h5 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)", margin: "8px 0 4px" }}>
                              {rev.title}
                            </h5>
                          )}
                          <p style={{ fontSize: 13.5, color: "var(--text-body)", margin: "0 0 12px", lineHeight: 1.55 }}>
                            {rev.comment}
                          </p>
                          <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                            Reviewed on {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "Recently"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="dash-empty-box">
                      <span className="material-symbols-rounded" style={{ fontSize: 50, color: "#F59E0B" }}>rate_review</span>
                      <h3 className="serif" style={{ fontSize: 20, margin: "10px 0 6px" }}>No Reviews Published Yet</h3>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
                        Completed a journey with Trippy Travellerz? Share your feedback to help fellow travelers.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowReviewModal(true)}
                        className="btn-dash-primary"
                      >
                        Share Your First Review
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 6: PROFILE & SECURITY ─── */}
              {activeTab === "profile" && (
                <div className="dash-tab-content">
                  <div className="dash-tab-header">
                    <span className="section-eyebrow">SETTINGS & SECURITY</span>
                    <h2 className="serif dash-tab-title">
                      Account & Contact Details
                    </h2>
                    <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                      Keep your contact details up to date so your private travel concierge can reach you.
                    </p>
                  </div>

                  <div className="dash-section-card">
                    {profileMessage && (
                      <div style={{ padding: "12px 18px", background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 12, color: "#166534", fontSize: 13.5, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="material-symbols-rounded">check_circle</span>
                        <span>{profileMessage}</span>
                      </div>
                    )}
                    {profileError && (
                      <div style={{ padding: "12px 18px", background: "#FEF2F2", border: "1.5px solid #FCA5A5", borderRadius: 12, color: "#991B1B", fontSize: 13.5, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="material-symbols-rounded">error</span>
                        <span>{profileError}</span>
                      </div>
                    )}

                    <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div className="enq-input-group">
                          <label className="enq-label">First Name</label>
                          <input
                            type="text"
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)}
                            className="enq-input"
                            required
                          />
                        </div>
                        <div className="enq-input-group">
                          <label className="enq-label">Last Name</label>
                          <input
                            type="text"
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                            className="enq-input"
                            required
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div className="enq-input-group">
                          <label className="enq-label">Email Address (Registered)</label>
                          <input
                            type="email"
                            value={user?.email || ""}
                            className="enq-input"
                            disabled
                            style={{ background: "#F5ECE0", cursor: "not-allowed" }}
                          />
                        </div>
                        <div className="enq-input-group">
                          <label className="enq-label">Mobile Phone</label>
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="enq-input"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: 18, marginTop: 6 }}>
                        <h4 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", marginBottom: 14 }}>
                          Change Password (Optional)
                        </h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                          <div className="enq-input-group">
                            <label className="enq-label">Current Password</label>
                            <input
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="enq-input"
                              placeholder="Enter current password"
                            />
                          </div>
                          <div className="enq-input-group">
                            <label className="enq-label">New Password</label>
                            <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="enq-input"
                              placeholder="Min. 6 characters"
                            />
                          </div>
                          <div className="enq-input-group">
                            <label className="enq-label">Confirm New Password</label>
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="enq-input"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                        <button
                          type="submit"
                          disabled={profileSaving}
                          className="btn-dash-primary"
                        >
                          {profileSaving ? "Saving..." : "Save Account Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── REVIEW SUBMISSION MODAL ─── */}
        {showReviewModal && (
          <div className="dash-modal-overlay" onClick={() => setShowReviewModal(false)}>
            <div className="dash-voucher-modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
              <div className="dash-voucher-header">
                <h3 className="serif" style={{ fontSize: 20, margin: 0, fontWeight: 700, color: "var(--brand-brown)" }}>
                  Write a Travel Review
                </h3>
                <button onClick={() => setShowReviewModal(false)} className="btn-dash-modal-close">×</button>
              </div>

              <form onSubmit={handleCreateReview} style={{ padding: 24 }}>
                {reviewMessage && (
                  <div style={{ padding: "10px 14px", background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 10, color: "#166534", fontSize: 13, marginBottom: 16 }}>
                    {reviewMessage}
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <label className="enq-label">Select Completed Package</label>
                  <select
                    className="enq-input"
                    value={reviewPackageId}
                    onChange={(e) => setReviewPackageId(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Journey --</option>
                    {bookings.map((b) => (
                      <option key={b._id} value={b.package?._id || b._id}>
                        {b.package?.name || `Booking ${b.bookingId || b._id}`}
                      </option>
                    ))}
                    {bookings.length === 0 && (
                      <option value="custom">General Experience Review</option>
                    )}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                  <div>
                    <label className="enq-label">Star Rating</label>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: star <= reviewRating ? "#F59E0B" : "#D1D5DB",
                            padding: 2,
                          }}
                        >
                          <span className="material-symbols-rounded" style={{ fontSize: 28 }}>star</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="enq-label">Travel Style</label>
                    <select
                      className="enq-input"
                      value={reviewTripType}
                      onChange={(e) => setReviewTripType(e.target.value)}
                    >
                      <option value="Couple">Couple / Romantic</option>
                      <option value="Family">Family Vacation</option>
                      <option value="Solo">Solo Traveler</option>
                      <option value="Friends">Friends Group</option>
                      <option value="Business">Business / Executive</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label className="enq-label">Review Headline</label>
                  <input
                    type="text"
                    className="enq-input"
                    placeholder="e.g. Unforgettable desert safari & five-star hospitality"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label className="enq-label">Your Experience & Feedback</label>
                  <textarea
                    className="enq-input"
                    style={{ minHeight: 90, resize: "vertical" }}
                    placeholder="Share specific details about accommodation, guides, sights, and pacing..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="btn-dash-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="btn-dash-primary"
                  >
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ─── PRINTABLE BOOKING VOUCHER MODAL ─── */}
        {selectedVoucherBooking && (
          <div className="dash-modal-overlay" onClick={() => setSelectedVoucherBooking(null)}>
            <div className="dash-voucher-modal" onClick={(e) => e.stopPropagation()}>
              <div className="dash-voucher-header">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src="/logo.png" alt="Trippy Travellers" style={{ width: 36, height: 36 }} />
                  <div>
                    <h3 className="serif" style={{ fontSize: 18, margin: 0, fontWeight: 700, color: "var(--brand-brown)" }}>
                      Trippy Travellerz
                    </h3>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Official Reservation Voucher</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-dash-modal-close"
                  onClick={() => setSelectedVoucherBooking(null)}
                >
                  ✕
                </button>
              </div>

              <div className="dash-voucher-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase" }}>VOUCHER REFERENCE</span>
                    <strong style={{ fontSize: 20, color: "var(--brand-brown)", display: "block" }}>
                      {selectedVoucherBooking.bookingId || `TTZ-${selectedVoucherBooking._id.slice(-8).toUpperCase()}`}
                    </strong>
                  </div>
                  <span className="dash-badge-status confirmed">Confirmed</span>
                </div>

                <div style={{ background: "var(--bg-cream)", padding: 18, borderRadius: 14, marginBottom: 20 }}>
                  <h4 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 6px" }}>
                    {selectedVoucherBooking.package?.name || "Curated Signature Journey"}
                  </h4>
                  <p style={{ fontSize: 13, color: "var(--text-body)", margin: 0 }}>
                    Target Travel Date: <strong>{selectedVoucherBooking.travelDate?.split("T")[0] || "Flexible Date"}</strong> • Party: <strong>{selectedVoucherBooking.travellers?.adults || 2} Adults</strong>
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 13, color: "var(--text-body)", marginBottom: 24 }}>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: 11 }}>LEAD PASSENGER</span>
                    <strong>{user?.firstName} {user?.lastName}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: 11 }}>REGISTERED EMAIL</span>
                    <strong>{user?.email}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: 11 }}>TOTAL INVESTMENT</span>
                    <strong>₹ {(selectedVoucherBooking.totalAmount || 74999).toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: 11 }}>EMERGENCY CONCIERGE</span>
                    <strong>+91 98765 43210</strong>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => {
                      generateBookingPdf(selectedVoucherBooking as unknown as BookingPdfData);
                    }}
                    className="btn-dash-voucher"
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>download</span>
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-dash-outline"
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>print</span>
                    <span>Print Page</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </AuthGuard>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 40, color: "var(--brand-ochre)", animation: "spin 1s linear infinite" }}>
            progress_activity
          </span>
        </div>
      }
    >
      <DashboardInner />
    </Suspense>
  );
}
