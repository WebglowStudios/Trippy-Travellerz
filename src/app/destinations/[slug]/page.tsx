"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DestinationHero from "@/components/destination-detail/DestinationHero";
import DestinationHighlights from "@/components/destination-detail/DestinationHighlights";
import DestinationPackagesSection from "@/components/destination-detail/DestinationPackagesSection";
import DestinationTravelGuide from "@/components/destination-detail/DestinationTravelGuide";
import DestinationPhotoMosaic from "@/components/destination-detail/DestinationPhotoMosaic";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import { api } from "@/lib/api";
import { SHOWCASE_DESTINATIONS, ShowcaseDestination } from "@/lib/showcase-destinations";
import { PackageItem } from "@/components/packages/PackageCatalogCard";
import { DUBAI_SHOWCASE_PACKAGE } from "@/lib/showcase-packages";

function DestinationDetailInner() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [destination, setDestination] = useState<ShowcaseDestination | null>(null);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function loadData() {
      try {
        setLoading(true);

        // 1. Fetch Destination
        let destData: ShowcaseDestination | null = null;
        try {
          const res = await api.get(`/destinations/${slug}`);
          if (res.status === "success" && res.data) {
            const d = res.data;
            const showcaseMatch = SHOWCASE_DESTINATIONS.find(
              (s) => s.slug.toLowerCase() === slug.toLowerCase() || s.name.toLowerCase() === d.name?.toLowerCase()
            );

            destData = {
              id: d._id || d.slug,
              name: d.name,
              slug: d.slug,
              country: d.country || showcaseMatch?.country || "International",
              region: (d.region as any) || showcaseMatch?.region || "South East Asia",
              description: d.description || showcaseMatch?.description || "",
              shortDescription: d.shortDescription || showcaseMatch?.shortDescription || "",
              image: d.heroImage || (d.images && d.images[0]) || showcaseMatch?.image || "",
              images: d.images || showcaseMatch?.images || [],
              startingPrice: d.startingPrice || showcaseMatch?.startingPrice || 49999,
              packageCount: d.packageCount || showcaseMatch?.packageCount || 3,
              rating: d.rating || showcaseMatch?.rating || 4.8,
              reviewCount: d.reviewCount || showcaseMatch?.reviewCount || 150,
              bestSeason: d.bestSeason || showcaseMatch?.bestSeason || "October to April",
              visaType: (d.visaType as any) || showcaseMatch?.visaType || "on-arrival",
              currency: showcaseMatch?.currency || "Local Currency",
              language: showcaseMatch?.language || "English",
              highlights: d.highlights || showcaseMatch?.highlights || ["Curated Tours", "Luxury Stays"],
              travelTips: d.travelTips || showcaseMatch?.travelTips || [],
              whyVisit: d.whyVisit || showcaseMatch?.whyVisit || [],
            };
          }
        } catch {
          // Fallback to showcase
        }

        if (!destData) {
          destData = SHOWCASE_DESTINATIONS.find(
            (s) => s.slug.toLowerCase() === slug.toLowerCase() || slug.toLowerCase().includes(s.id)
          ) || null;
        }

        setDestination(destData);

        // 2. Fetch Packages for this destination
        let pkgList: PackageItem[] = [];
        try {
          const pkgRes = await api.get(`/packages/destination/${slug}`);
          if (pkgRes.status === "success" && Array.isArray(pkgRes.data)) {
            pkgList = pkgRes.data.map((p: any) => ({
              _id: p._id,
              name: p.name,
              slug: p.slug,
              price: p.price > 10 ? p.price : 59999,
              originalPrice: p.originalPrice || (p.price > 10 ? Math.round(p.price * 1.25) : 75000),
              priceUnit: p.priceUnit || "person",
              duration: p.duration || { days: 6, nights: 5 },
              destination: p.destination,
              heroImage: p.heroImage || p.images?.[0] || "",
              images: p.images || [],
              badge: p.badge || (p.isFeatured ? "Bestseller" : undefined),
              rating: p.rating || 4.8,
              reviewCount: p.reviewCount || 120,
              highlights: p.highlights || [],
              keyPoints: p.keyPoints || [],
              shortDescription: p.shortDescription || p.description?.slice(0, 160),
              flightsIncluded: Boolean(p.flightsIncluded),
              isGroupTour: Boolean(p.isGroupTour),
              isInternational: Boolean(p.isInternational),
              category: p.category,
            }));
          }
        } catch {
          // Fallback
        }

        // Add showcase packages matching this destination
        if (slug.includes("dubai")) {
          if (!pkgList.some((p) => p.slug === DUBAI_SHOWCASE_PACKAGE.slug)) {
            pkgList.unshift(DUBAI_SHOWCASE_PACKAGE as any);
          }
        }

        // If package list is still empty, fetch general packages and match by name/slug
        if (pkgList.length === 0 && destData) {
          try {
            const allPkgRes = await api.get(`/packages?limit=50`);
            if (allPkgRes.status === "success" && Array.isArray(allPkgRes.data)) {
              const matched = allPkgRes.data.filter((p: any) => {
                const dName = typeof p.destination === "object" ? p.destination?.name : p.destination;
                return (
                  dName?.toLowerCase().includes(destData!.name.toLowerCase()) ||
                  p.name.toLowerCase().includes(destData!.name.toLowerCase()) ||
                  p.slug.toLowerCase().includes(destData!.slug.toLowerCase())
                );
              }).map((p: any) => ({
                _id: p._id,
                name: p.name,
                slug: p.slug,
                price: p.price > 10 ? p.price : 49999,
                originalPrice: p.originalPrice,
                priceUnit: p.priceUnit,
                duration: p.duration,
                destination: p.destination,
                heroImage: p.heroImage || p.images?.[0],
                images: p.images,
                badge: p.badge,
                rating: p.rating,
                reviewCount: p.reviewCount,
                highlights: p.highlights,
                keyPoints: p.keyPoints,
                shortDescription: p.shortDescription,
                flightsIncluded: p.flightsIncluded,
                isGroupTour: p.isGroupTour,
                isInternational: p.isInternational,
                category: p.category,
              }));
              pkgList.push(...matched);
            }
          } catch {
            // No-op
          }
        }

        setPackages(pkgList);
      } catch (err) {
        console.error("Failed to load destination detail:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  const scrollToPackages = () => {
    const el = document.getElementById("packages-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <>
        <Header />
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
          <div style={{ width: 44, height: 44, border: "3px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Loading destination guide...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
        <Footer />
      </>
    );
  }

  /* ─── Not Found State ─── */
  if (!destination) {
    return (
      <>
        <Header />
        <div style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, textAlign: "center", padding: 24 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--brand-ochre)" }}>explore_off</span>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--text-dark)" }}>Destination Not Found</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 440 }}>
            We couldn&apos;t find the destination you were searching for. Explore our complete collection of curated world journeys.
          </p>
          <Link
            href="/destinations"
            style={{ padding: "11px 26px", background: "var(--brand-brown)", color: "#fff", borderRadius: 9999, textDecoration: "none", fontWeight: 700 }}
          >
            All Destinations
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main style={{ backgroundColor: "var(--bg-cream)", minHeight: "100vh" }}>
        {/* 1. Full-Width Panoramic Hero */}
        <DestinationHero
          destination={destination}
          onOpenEnquiry={() => setEnquiryModalOpen(true)}
          onScrollToPackages={scrollToPackages}
        />

        {/* 2. Top Experiences & Why Visit */}
        <DestinationHighlights destination={destination} />

        {/* 3. Filterable Curated Packages for this Destination */}
        <DestinationPackagesSection
          destination={destination}
          packages={packages}
          onOpenEnquiry={() => setEnquiryModalOpen(true)}
        />

        {/* 4. Practical Travel Designer Guide & Mascot Tip */}
        <DestinationTravelGuide
          destination={destination}
          onOpenEnquiry={() => setEnquiryModalOpen(true)}
        />

        {/* 5. 4-Photo Visual Mosaic Gallery */}
        <DestinationPhotoMosaic destination={destination} />

        {/* 6. Tailored Bespoke Concierge Banner */}
        <div className="container" style={{ paddingBottom: 60 }}>
          <CustomItineraryBanner onOpenEnquiry={() => setEnquiryModalOpen(true)} />
        </div>
      </main>

      {/* Embedded Lead Capture Modal */}
      {enquiryModalOpen && (
        <EnquiryForm
          packageId={destination.id}
          packageName={`${destination.name} Luxury Custom Holiday`}
          destinationName={destination.name}
          isModal={true}
          isOpen={true}
          onClose={() => setEnquiryModalOpen(false)}
        />
      )}

      <Footer />
    </>
  );
}

export default function DestinationDetailPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh", background: "var(--bg-cream)" }} />}>
      <DestinationDetailInner />
    </Suspense>
  );
}
