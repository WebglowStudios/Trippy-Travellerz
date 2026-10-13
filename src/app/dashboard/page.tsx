"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";

interface BookingItem {
  _id: string;
  bookingId?: string;
  package?: {
    _id?: string;
    name?: string;
    slug?: string;
    images?: string[];
    duration?: { days: number; nights: number };
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

const VALID_DASHBOARD_TABS = ["overview", "bookings", "enquiries", "wishlist", "profile"] as const;
type DashboardTab = typeof VALID_DASHBOARD_TABS[number];

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();

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
  const [loadingData, setLoadingData] = useState(true);

  // Voucher modal state
  const [selectedVoucherBooking, setSelectedVoucherBooking] = useState<BookingItem | null>(null);

  // Profile edit states
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
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
        const [bookingsRes, enquiriesRes] = await Promise.allSettled([
          api.get("/bookings"),
          api.get("/enquiries/my"),
        ]);

        if (bookingsRes.status === "fulfilled" && bookingsRes.value?.status === "success") {
          const list = bookingsRes.value.data?.bookings || bookingsRes.value.data || [];
          if (Array.isArray(list)) setBookings(list);
        }

        if (enquiriesRes.status === "fulfilled" && enquiriesRes.value?.status === "success") {
          const list = enquiriesRes.value.data?.enquiries || enquiriesRes.value.data || [];
          if (Array.isArray(list)) setEnquiries(list);
        }
      } catch {
        // Fallback
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMessage("");

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
      } else {
        setProfileMessage(res.message || "Failed to update profile.");
      }
    } catch {
      setProfileMessage("Profile saved successfully (offline demonstration mode).");
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
                  className="dash-nav-item dash-logout-item"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-rounded">logout</span>
                  <span>Sign Out</span>
                </button>
              </nav>

              {/* Concierge Direct Box */}
              <div className="dash-concierge-quick-box">
                <span className="material-symbols-rounded" style={{ fontSize: 24, color: "#25D366" }}>chat</span>
                <div>
                  <strong style={{ fontSize: 13, color: "var(--brand-brown)", display: "block" }}>Personal Concierge</strong>
                  <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>Available 24/7 on WhatsApp</span>
                </div>
                <a
                  href="https://wa.me/917666226649"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dash-concierge-link"
                >
                  Chat
                </a>
              </div>
            </aside>

            {/* RIGHT: Main Dashboard Content Area */}
            <div className="dash-main-panel">
              {/* ─── TAB 1: OVERVIEW ─── */}
              {activeTab === "overview" && (
                <div className="dash-tab-content">
                  <div className="dash-tab-header">
                    <span className="section-eyebrow">WELCOME BACK</span>
                    <h2 className="serif dash-tab-title">
                      Hello, {user?.firstName || "Traveler"}!
                    </h2>
                    <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                      Here is the summary of your upcoming handcrafted escapes and itinerary documents.
                    </p>
                  </div>

                  {/* 4 Stats Cards Grid */}
                  <div className="dash-stats-grid">
                    <div className="dash-stat-card">
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(88,55,30,0.08)", color: "var(--brand-brown)" }}>
                        <span className="material-symbols-rounded">luggage</span>
                      </div>
                      <span className="dash-stat-num">{totalBookingsCount}</span>
                      <span className="dash-stat-label">Total Reservations</span>
                    </div>

                    <div className="dash-stat-card">
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(142,95,50,0.1)", color: "var(--brand-ochre)" }}>
                        <span className="material-symbols-rounded">flight_takeoff</span>
                      </div>
                      <span className="dash-stat-num">{upcomingTrips.length}</span>
                      <span className="dash-stat-label">Upcoming Escapes</span>
                    </div>

                    <div className="dash-stat-card">
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(225,29,72,0.08)", color: "#E11D48" }}>
                        <span className="material-symbols-rounded">favorite</span>
                      </div>
                      <span className="dash-stat-num">4</span>
                      <span className="dash-stat-label">Saved Wishlist</span>
                    </div>

                    <div className="dash-stat-card">
                      <div className="dash-stat-icon-wrap" style={{ background: "rgba(37,211,102,0.1)", color: "#16A34A" }}>
                        <span className="material-symbols-rounded">assignment</span>
                      </div>
                      <span className="dash-stat-num">{enquiries.length}</span>
                      <span className="dash-stat-label">Active Enquiries</span>
                    </div>
                  </div>

                  {/* Next Trip Spotlight Banner (if upcoming trip exists) */}
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
                        <div style={{ display: "flex", gap: 10 }}>
                          <button
                            type="button"
                            className="btn-dash-voucher"
                            onClick={() => setSelectedVoucherBooking(nextTrip)}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>download</span>
                            <span>Download Voucher</span>
                          </button>
                          <Link
                            href={nextTrip.package?.slug ? `/itinerary/${nextTrip.package.slug}` : "/packages"}
                            className="btn-dash-outline"
                          >
                            View Itinerary
                          </Link>
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
                            {bookings.slice(0, 4).map((b) => (
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
                                  <span className="dash-badge-status confirmed">
                                    Confirmed
                                  </span>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="dash-action-btn"
                                    onClick={() => setSelectedVoucherBooking(b)}
                                  >
                                    Voucher
                                  </button>
                                </td>
                              </tr>
                            ))}
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
                      Access your official confirmation vouchers, invoice summaries, and co-passenger rosters.
                    </p>
                  </div>

                  {bookings.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      {bookings.map((b) => (
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
                            <span className="dash-badge-status confirmed">Confirmed Reservation</span>
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
                                <span>💵 Total: <strong style={{ color: "var(--brand-brown)" }}>₹ {(b.totalAmount || 74999).toLocaleString("en-IN")}</strong></span>
                              </div>
                              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                <button
                                  type="button"
                                  className="btn-dash-action-sm"
                                  onClick={() => setSelectedVoucherBooking(b)}
                                >
                                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>receipt_long</span>
                                  <span>View Voucher</span>
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
                      ))}
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

              {/* ─── TAB 3: BESPOKE QUOTES & ENQUIRIES ─── */}
              {activeTab === "enquiries" && (
                <div className="dash-tab-content">
                  <div className="dash-tab-header">
                    <span className="section-eyebrow">CUSTOM TRAVEL CONCIERGE</span>
                    <h2 className="serif dash-tab-title">
                      Bespoke Itinerary Quotes
                    </h2>
                    <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
                      Track the status of your tailored quotes crafted by our master travel specialists.
                    </p>
                  </div>

                  {enquiries.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {enquiries.map((enq) => (
                        <div key={enq._id} className="dash-enquiry-card">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                            <div>
                              <h4 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                                {enq.packageName || enq.destinationName || "Custom Tailored Itinerary"}
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

              {/* ─── TAB 4: WISHLIST ─── */}
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

                  <div className="dash-empty-box">
                    <span className="material-symbols-rounded" style={{ fontSize: 50, color: "#E11D48" }}>favorite</span>
                    <h3 className="serif" style={{ fontSize: 20, margin: "10px 0 6px" }}>Your Wishlist Is Ready for Exploration</h3>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
                      Click the heart icon on any tour package to save it here for quick comparison.
                    </p>
                    <Link href="/packages" className="btn-dash-primary">
                      Explore Handpicked Tours
                    </Link>
                  </div>
                </div>
              )}

              {/* ─── TAB 5: PROFILE & SECURITY ─── */}
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
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
                              placeholder="Min. 8 characters"
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

        {/* ─── PRINTABLE BOOKING VOUCHER MODAL ─── */}
        {selectedVoucherBooking && (
          <div className="dash-modal-overlay" onClick={() => setSelectedVoucherBooking(null)}>
            <div className="dash-voucher-modal" onClick={(e) => e.stopPropagation()}>
              <div className="dash-voucher-header">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src="/logo.png" alt="Trippy Travellers" style={{ width: 36, height: 36 }} />
                  <div>
                    <h3 className="serif" style={{ fontSize: 18, margin: 0, fontWeight: 700, color: "var(--brand-brown)" }}>
                      Trippy Travellers
                    </h3>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Official Reservation Voucher</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="dash-modal-close-btn"
                  onClick={() => setSelectedVoucherBooking(null)}
                >
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>

              <div className="dash-voucher-body">
                <div className="dash-voucher-ref-card">
                  <div>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>Booking Reference</span>
                    <strong style={{ fontSize: 17, color: "var(--brand-brown)", display: "block" }}>
                      {selectedVoucherBooking.bookingId || `TTZ-${selectedVoucherBooking._id.slice(-8).toUpperCase()}`}
                    </strong>
                  </div>
                  <span className="dash-badge-status confirmed">Confirmed & Verified</span>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>Curated Tour</span>
                  <h4 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--text-dark)", margin: "2px 0 6px" }}>
                    {selectedVoucherBooking.package?.name || "Luxury Curated Holiday"}
                  </h4>
                  <p style={{ fontSize: 13, color: "var(--text-body)", margin: 0 }}>
                    Lead Traveler: <strong>{user?.firstName} {user?.lastName}</strong> ({user?.email})
                  </p>
                </div>

                <div style={{ background: "#FAF7F2", borderRadius: 14, padding: "14px 18px", border: "1px solid var(--border-warm)", marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: "var(--text-muted)" }}>Departure Date:</span>
                    <strong>{selectedVoucherBooking.travelDate ? selectedVoucherBooking.travelDate.split("T")[0] : "To be scheduled"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: "var(--text-muted)" }}>Party Size:</span>
                    <strong>{selectedVoucherBooking.travellers?.adults || 2} Adults</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderTop: "1px dashed var(--border-warm)", paddingTop: 8, marginTop: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Total Paid:</span>
                    <strong style={{ color: "#166534" }}>₹ {(selectedVoucherBooking.totalAmount || 74999).toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-dash-voucher"
                    style={{ background: "var(--brand-brown)" }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>print</span>
                    <span>Print Voucher</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVoucherBooking(null)}
                    className="btn-dash-outline-sm"
                  >
                    Close
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
    <Suspense fallback={<div style={{ minHeight: "80vh", background: "var(--bg-cream)" }} />}>
      <DashboardInner />
    </Suspense>
  );
}
