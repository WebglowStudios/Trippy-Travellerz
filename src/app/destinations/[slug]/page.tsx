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
import GroupDeal from "@/components/destination-detail/GroupDeal";
import DestinationArticles from "@/components/destination-detail/DestinationArticles";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import { api } from "@/lib/api";
import { SHOWCASE_DESTINATIONS, ShowcaseDestination } from "@/lib/showcase-destinations";
import { getCuratedDestination, sanitizeDestinationText, sanitizeBestSeason } from "@/lib/destination-assets";
import { PackageItem } from "@/components/packages/PackageCatalogCard";

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

        // 1. Fetch Destination from Backend with curated overlay
        let destData: ShowcaseDestination | null = null;
        try {
          const res = await api.get(`/destinations/${slug}`);
          if (res.status === "success" && res.data) {
            const d = res.data;
            const curated = getCuratedDestination(slug) || getCuratedDestination(d.name) || getCuratedDestination(d.slug);
            const showcaseMatch = SHOWCASE_DESTINATIONS.find(
              (s) => s.slug.toLowerCase() === slug.toLowerCase() || s.name.toLowerCase() === d.name?.toLowerCase()
            );

            destData = {
              id: d._id || d.slug || curated?.id || slug,
              name: curated?.name || d.name,
              slug: d.slug || curated?.slug || slug,
              country: curated?.country || d.country || showcaseMatch?.country || "India",
              region: (curated?.region as any) || (d.region as any) || showcaseMatch?.region || "India & Subcontinent",
              description: curated?.heroDescription || sanitizeDestinationText(d.description, 280) || showcaseMatch?.description || "",
              shortDescription: curated?.shortDescription || sanitizeDestinationText(d.shortDescription, 120) || showcaseMatch?.shortDescription || "",
              image: curated?.heroImage || d.heroImage || (d.images && d.images[0]) || showcaseMatch?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
              images: (curated?.images && curated.images.length > 0) ? curated.images : (d.images && d.images.length > 0) ? d.images : showcaseMatch?.images || [],
              startingPrice: d.startingPrice || curated?.startingPrice || showcaseMatch?.startingPrice || 49999,
              packageCount: d.packageCount || curated?.packageCount || showcaseMatch?.packageCount || 3,
              rating: d.rating || curated?.rating || showcaseMatch?.rating || 4.8,
              reviewCount: d.reviewCount || curated?.reviewCount || showcaseMatch?.reviewCount || 150,
              bestSeason: curated?.bestSeason || sanitizeBestSeason(d.bestSeason, showcaseMatch?.bestSeason || "October to April"),
              visaType: (curated?.visaType as any) || (d.visaType as any) || showcaseMatch?.visaType || "on-arrival",
              currency: curated?.currency || showcaseMatch?.currency || "INR (₹)",
              language: curated?.language || showcaseMatch?.language || "English",
              highlights: (curated?.highlights && curated.highlights.length > 0) ? curated.highlights : (d.highlights && d.highlights.length > 0) ? d.highlights : showcaseMatch?.highlights || ["Curated Tours", "Luxury Stays"],
              travelTips: curated?.travelTips || d.travelTips || showcaseMatch?.travelTips || [],
              whyVisit: curated?.whyVisit || d.whyVisit || showcaseMatch?.whyVisit || [],
            };
          }
        } catch {
          // Fallback to curated or showcase
        }

        if (!destData) {
          const curated = getCuratedDestination(slug);
          if (curated) {
            destData = {
              id: curated.id,
              name: curated.name,
              slug: curated.slug,
              country: curated.country,
              region: curated.region as any,
              description: curated.heroDescription,
              shortDescription: curated.shortDescription,
              image: curated.heroImage,
              images: curated.images,
              startingPrice: curated.startingPrice,
              packageCount: curated.packageCount,
              rating: curated.rating,
              reviewCount: curated.reviewCount,
              bestSeason: curated.bestSeason,
              visaType: curated.visaType,
              currency: curated.currency,
              language: curated.language,
              highlights: curated.highlights,
              travelTips: curated.travelTips || [],
              whyVisit: curated.whyVisit || [],
            };
          } else {
            destData = SHOWCASE_DESTINATIONS.find(
              (s) => s.slug.toLowerCase() === slug.toLowerCase() || slug.toLowerCase().includes(s.id)
            ) || null;
          }
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
              hotelRating: p.hotelRating,
            }));
          }
        } catch {
          // Fallback
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
                hotelRating: p.hotelRating,
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

        {/* 4. Bespoke Group Travel Deal & Quote */}
        <GroupDeal
          destinationName={destination.name}
          onOpenEnquiry={() => setEnquiryModalOpen(true)}
        />

        {/* 5. Practical Travel Designer Guide & Mascot Tip */}
        <DestinationTravelGuide
          destination={destination}
          onOpenEnquiry={() => setEnquiryModalOpen(true)}
        />

        {/* 6. 4-Photo Visual Mosaic Gallery */}
        <DestinationPhotoMosaic destination={destination} />

        {/* 7. Travel Journal & Destination Stories */}
        <DestinationArticles
          destinationName={destination.name}
          destinationId={destination.id}
        />

        {/* 8. Tailored Bespoke Concierge Banner */}
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
