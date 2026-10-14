"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PackageGallery from "@/components/package-detail/PackageGallery";
import KeyPointsCard from "@/components/package-detail/KeyPointsCard";
import PackageTabs from "@/components/package-detail/PackageTabs";
import PriceCard from "@/components/package-detail/PriceCard";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import DepartureGrid from "@/components/package-detail/DepartureGrid";
import Reviews from "@/components/package-detail/Reviews";
import SimilarPackages from "@/components/package-detail/SimilarPackages";
import MobileCtaBar from "@/components/package-detail/MobileCtaBar";
import { DUBAI_SHOWCASE_PACKAGE } from "@/lib/showcase-packages";

function TourDetailInner() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pkg, setPkg] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchPackageData() {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await api.get(`/packages/${slug}`);

        if (res.status === "success" && res.data) {
          const data = res.data;
          // If package in DB has 0 itinerary days, synthesize structured days so the Itinerary tab is rich
          if (!data.itinerary || data.itinerary.length === 0) {
            const daysCount = data.duration?.days || 5;
            const destName = data.destination?.name || data.name;
            data.itinerary = Array.from({ length: daysCount }).map((_, i) => ({
              day: i + 1,
              title: i === 0
                ? `Arrival in ${destName} & Orientation`
                : i === daysCount - 1
                ? `Leisure Morning & Departure from ${destName}`
                : `Exploring ${destName} — Day ${i + 1} Signature Highlights`,
              description: data.description || `Enjoy a full day discovering the wonders of ${destName} with private sightseeing, local culinary tasting, and relaxation.`,
              images: data.images || [],
              activities: [
                { title: `Day ${i + 1} Guided Tour`, description: `Curated excursions and visits across top rated landmarks in ${destName}.` },
              ],
              recommendations: [
                `Capture golden hour photography and explore local boutiques.`,
                `Savor traditional authentic cuisine at recommended dinner spots.`,
              ],
              meals: ["Breakfast"],
              accommodation: data.hotelRating || "5-Star Hotel",
            }));
          }
          setPkg(data);
        } else if (slug.includes("dubai") || slug === "dubai-luxury-escape-burj-khalifa-desert-safari") {
          setPkg(DUBAI_SHOWCASE_PACKAGE);
        } else {
          setNotFound(true);
        }
      } catch {
        if (slug.includes("dubai") || slug === "dubai-luxury-escape-burj-khalifa-desert-safari") {
          setPkg(DUBAI_SHOWCASE_PACKAGE);
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPackageData();
  }, [slug]);

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <>
        <Header />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "75vh",
            flexDirection: "column",
            gap: 16,
            background: "var(--bg-cream)",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              border: "3.5px solid #EAE3D8",
              borderTopColor: "var(--brand-brown)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--brand-brown)" }}>
            Loading your luxury journey...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
        <Footer />
      </>
    );
  }

  /* ─── Not Found State ─── */
  if (notFound || !pkg) {
    return (
      <>
        <Header />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
            flexDirection: "column",
            gap: 18,
            padding: "40px 24px",
            textAlign: "center",
            background: "var(--bg-cream)",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 60, color: "var(--brand-ochre)" }}>
            explore_off
          </span>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 700, color: "var(--text-dark)" }}>
            Package Not Found
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 440, lineHeight: 1.6 }}>
            The requested tour package may have been updated or moved. Explore our featured destinations or contact our concierge for assistance.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Link
              href="/"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                background: "var(--brand-brown)",
                padding: "12px 28px",
                borderRadius: 9999,
                textDecoration: "none",
              }}
            >
              ← Back to Home
            </Link>
            <Link
              href="/packages"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--brand-brown)",
                background: "#FFFFFF",
                border: "1.5px solid var(--border-warm)",
                padding: "12px 28px",
                borderRadius: 9999,
                textDecoration: "none",
              }}
            >
              Browse Packages
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ─── Derived Properties ─── */
  const packageName = pkg.name || "Curated Tour Package";
  const destinationName =
    pkg.destination?.name ||
    pkg.customDestinationText ||
    (typeof pkg.destination === "string" ? pkg.destination : "Destinations");
  const destinationSlug =
    pkg.destination?.slug ||
    (destinationName ? destinationName.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "destinations");

  const duration = pkg.duration || { nights: 7, days: 8 };
  const rating = pkg.rating || 4.9;
  const reviewCount = pkg.reviewCount || 312;
  const highlights = pkg.highlights || [
    "Exclusive skip-the-line VIP entry privileges to signature landmarks",
    "Scenic off-road adventures and private sunset experiences with dedicated hosts",
    "Gourmet culinary dining and traditional evening entertainment",
    "Curated boutique 5-star hotel and resort sanctuaries with ocean/skyline views",
    "Private chauffeur-driven luxury transit throughout your stay",
  ];

  return (
    <>
      {/* 1. Header Navigation */}
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
        {/* 2. Breadcrumb */}
        <nav className="pkg-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <Link href="/destinations">Destinations</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <Link href={`/destinations/${destinationSlug}`}>{destinationName}</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <span className="pkg-breadcrumb-active">{packageName}</span>
        </nav>

        {/* 3. Photo Mosaic Gallery with Lightbox */}
        <PackageGallery
          images={pkg.images || []}
          heroImage={pkg.heroImage}
          destinationImages={pkg.destinationImages || []}
          stayImages={pkg.stayImages || []}
          activityImages={pkg.activityImages || []}
          destinationName={destinationName}
        />

        {/* 4. Content Grid: Details (Left) vs Sticky Sidebar (Right) */}
        <div className="content-grid">
          {/* LEFT MAIN COLUMN */}
          <div style={{ minWidth: 0 }}>
            {/* Title & Metadata Badges */}
            <h1 className="pkg-title">{packageName}</h1>

            <div className="pkg-meta-row">
              <span className="pkg-badge">
                <span className="material-symbols-rounded" style={{ fontSize: 15 }}>calendar_today</span>
                <span>{duration.nights} Nights / {duration.days} Days</span>
              </span>
              <span className="pkg-badge">
                <span className="material-symbols-rounded" style={{ fontSize: 15 }}>location_on</span>
                <span>{destinationName}</span>
              </span>
              {pkg.hotelRating && (
                <span className="pkg-badge">
                  <span className="material-symbols-rounded" style={{ fontSize: 15 }}>hotel</span>
                  <span>{pkg.hotelRating}</span>
                </span>
              )}
              {pkg.badge && (
                <span className="pkg-badge bestseller">
                  <span className="material-symbols-rounded" style={{ fontSize: 15 }}>verified</span>
                  <span>{pkg.badge}</span>
                </span>
              )}
              <div className="pkg-rating-box">
                <span className="pkg-stars">★★★★★</span>
                <strong>{rating}</strong>
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                  ({reviewCount} verified reviews)
                </span>
              </div>
            </div>

            {/* 6 Specs Key Points Grid */}
            <KeyPointsCard
              duration={duration}
              hotelRating={pkg.hotelRating}
              keyPoints={pkg.keyPoints}
              isInternational={pkg.isInternational}
              flightsIncluded={pkg.flightsIncluded}
            />

            {/* Lead Narrative Description */}
            <p className="pkg-desc-lead">
              {pkg.description ||
                "Experience the pinnacle of luxury travel with this meticulously curated journey. Designed for discerning travelers seeking comfort, authentic cultural immersion, and unforgettable moments, every transfer, stay, and excursion is seamlessly orchestrated by our specialist concierges."}
            </p>

            {/* Trip Highlights Box */}
            {highlights.length > 0 && (
              <div className="highlights-box">
                <h2 className="highlights-title">Trip Highlights</h2>
                <ul className="highlights-list">
                  {highlights.map((h: string, i: number) => (
                    <li key={i} className="highlights-item">
                      <span className="highlights-bullet" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Group Tour Fixed Departure Batches */}
            {(pkg.isGroupTour || (pkg.departures && pkg.departures.length > 0)) && (
              <DepartureGrid
                departures={pkg.departures || []}
                originalPrice={pkg.originalPrice || pkg.price}
                onSelectSlot={(depId) => {
                  router.push(`/book/${slug}?departureId=${depId}`);
                }}
              />
            )}

            {/* 5. The 6 Interactive Tabs (Itinerary, Activities, Flights, Stay, Transfers, Policies) */}
            <PackageTabs pkg={pkg} />

            {/* 6. Traveller Reviews */}
            <Reviews packageId={pkg._id} rating={rating} reviewCount={reviewCount} />
          </div>

          {/* RIGHT STICKY SIDEBAR */}
          <aside className="sidebar-sticky-wrap" aria-label="Booking and Enquiry Panel">
            <PriceCard
              pkg={pkg}
              slug={slug}
              onOpenEnquiry={() => setEnquiryModalOpen(true)}
            />

            <EnquiryForm
              packageName={packageName}
              packageId={pkg._id}
              destinationName={destinationName}
              isGroupTour={Boolean(pkg.isGroupTour)}
              departures={pkg.departures}
            />
          </aside>
        </div>

        {/* 7. Similar Packages ("You May Also Like") */}
        <SimilarPackages currentSlug={slug} />
      </main>

      {/* 8. Luxury Dark Footer */}
      <Footer />

      {/* 9. Floating Enquiry Modal */}
      <EnquiryForm
        packageName={packageName}
        packageId={pkg._id}
        destinationName={destinationName}
        isGroupTour={Boolean(pkg.isGroupTour)}
        departures={pkg.departures}
        isModal={true}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />

      {/* 10. Mobile Sticky Booking Bar */}
      <MobileCtaBar
        price={pkg.price}
        onBookNow={() => router.push(`/book/${slug}`)}
        onSendEnquiry={() => setEnquiryModalOpen(true)}
      />
    </>
  );
}

export default function TourDetailPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh", background: "var(--bg-cream)" }} />}>
      <TourDetailInner />
    </Suspense>
  );
}
