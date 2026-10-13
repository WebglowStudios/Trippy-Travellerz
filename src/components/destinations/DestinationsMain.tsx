"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import DestinationsHeader from "./DestinationsHeader";
import DestinationCard from "./DestinationCard";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import { SHOWCASE_DESTINATIONS, ShowcaseDestination } from "@/lib/showcase-destinations";

const REGIONS = [
  "Middle East",
  "South East Asia",
  "India & Subcontinent",
  "Islands & Africa",
];

export default function DestinationsMain() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Primary Data States
  const [destinations, setDestinations] = useState<ShowcaseDestination[]>(SHOWCASE_DESTINATIONS);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [selectedRegion, setSelectedRegion] = useState(searchParams?.get("region") || "all");
  const [selectedVisa, setSelectedVisa] = useState(searchParams?.get("visa") || "all");
  const [sort, setSort] = useState(searchParams?.get("sort") || "popular");

  // Fetch Live Destinations from Backend Engine
  useEffect(() => {
    async function loadDestinations() {
      try {
        setLoading(true);
        const res = await api.get("/destinations?limit=100");

        if (res.status === "success" && Array.isArray(res.data)) {
          const mapped: ShowcaseDestination[] = res.data.map((d: any) => {
            // Find existing showcase match for rich tips/photos
            const match = SHOWCASE_DESTINATIONS.find(
              (sd) => sd.slug.toLowerCase() === d.slug?.toLowerCase() || sd.name.toLowerCase() === d.name?.toLowerCase()
            );

            return {
              id: d._id || d.slug,
              name: d.name,
              slug: d.slug,
              country: d.country || match?.country || "International",
              region: (d.region as any) || match?.region || "South East Asia",
              description: d.description || match?.description || "",
              shortDescription: d.shortDescription || match?.shortDescription || "",
              image: d.heroImage || (d.images && d.images[0]) || match?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
              images: d.images || match?.images || [],
              startingPrice: d.startingPrice || match?.startingPrice || 49999,
              packageCount: d.packageCount || match?.packageCount || 3,
              rating: d.rating || match?.rating || 4.8,
              reviewCount: d.reviewCount || match?.reviewCount || 150,
              bestSeason: d.bestSeason || match?.bestSeason || "Year-round",
              visaType: (d.visaType as any) || match?.visaType || "on-arrival",
              currency: match?.currency || "Local Currency",
              language: match?.language || "English",
              highlights: d.highlights || match?.highlights || ["Curated Tours", "Luxury Stays"],
              travelTips: d.travelTips || match?.travelTips || [],
              whyVisit: d.whyVisit || match?.whyVisit || [],
            };
          });

          // Merge backend destinations with showcase destinations (dedupe by slug)
          const map = new Map<string, ShowcaseDestination>();
          SHOWCASE_DESTINATIONS.forEach((s) => map.set(s.slug, s));
          mapped.forEach((m) => map.set(m.slug, m));

          setDestinations(Array.from(map.values()));
        }
      } catch (err) {
        console.error("Failed to load destinations:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, []);

  // Update Filter State & URL Sync
  const updateFilters = (newSearch: string, newRegion: string, newVisa: string, newSort: string) => {
    setSearch(newSearch);
    setSelectedRegion(newRegion);
    setSelectedVisa(newVisa);
    setSort(newSort);

    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newRegion !== "all") params.set("region", newRegion);
    if (newVisa !== "all") params.set("visa", newVisa);
    if (newSort !== "popular") params.set("sort", newSort);

    const query = params.toString();
    router.replace(`/destinations${query ? `?${query}` : ""}`, { scroll: false });
  };

  const handleResetFilters = () => {
    updateFilters("", "all", "all", "popular");
  };

  // Filter & Sort Logic
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // 1. Search Query
      if (search) {
        const q = search.toLowerCase().trim();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesRegion = dest.region.toLowerCase().includes(q);
        const matchesDesc = (dest.description || "").toLowerCase().includes(q);
        const matchesHighlights = (dest.highlights || []).some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesRegion && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }

      // 2. Region Filter
      if (selectedRegion !== "all") {
        if (dest.region.toLowerCase() !== selectedRegion.toLowerCase()) {
          return false;
        }
      }

      // 3. Visa Filter
      if (selectedVisa !== "all") {
        if (dest.visaType !== selectedVisa) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sort === "price_asc") return a.startingPrice - b.startingPrice;
      if (sort === "price_desc") return b.startingPrice - a.startingPrice;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.name.localeCompare(b.name);
      return b.reviewCount - a.reviewCount; // popular
    });
  }, [destinations, search, selectedRegion, selectedVisa, sort]);

  return (
    <div className="pkg-catalog-page-wrapper">
      {/* 1. Header Banner */}
      <DestinationsHeader
        searchQuery={search}
        onSearchChange={(q) => updateFilters(q, selectedRegion, selectedVisa, sort)}
        selectedRegion={selectedRegion}
        onSelectRegion={(reg) => updateFilters(search, reg, selectedVisa, sort)}
        selectedVisa={selectedVisa}
        onSelectVisa={(visa) => updateFilters(search, selectedRegion, visa, sort)}
        regions={REGIONS}
        totalResults={filteredDestinations.length}
      />

      {/* 2. Destination Catalog Section */}
      <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
        {/* Results Toolbar */}
        <div className="pkg-toolbar-container" style={{ marginBottom: 28 }}>
          <div className="pkg-toolbar-row">
            <p className="pkg-results-count">
              Showing <strong>{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? "luxury destination" : "luxury destinations"}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="pkg-sort-wrapper">
                <label htmlFor="sort-dest" className="pkg-sort-label">Sort by:</label>
                <select
                  id="sort-dest"
                  value={sort}
                  onChange={(e) => updateFilters(search, selectedRegion, selectedVisa, e.target.value)}
                  className="pkg-sort-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name">Alphabetical (A - Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Chips */}
          {(search || selectedRegion !== "all" || selectedVisa !== "all") && (
            <div className="pkg-active-chips-row">
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.5 }}>
                Active Filters:
              </span>
              {search && (
                <button type="button" className="pkg-chip-tag" onClick={() => updateFilters("", selectedRegion, selectedVisa, sort)}>
                  <span>Search: &quot;{search}&quot;</span>
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>close</span>
                </button>
              )}
              {selectedRegion !== "all" && (
                <button type="button" className="pkg-chip-tag" onClick={() => updateFilters(search, "all", selectedVisa, sort)}>
                  <span>Region: {selectedRegion}</span>
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>close</span>
                </button>
              )}
              {selectedVisa !== "all" && (
                <button type="button" className="pkg-chip-tag" onClick={() => updateFilters(search, selectedRegion, "all", sort)}>
                  <span>Visa: {selectedVisa}</span>
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>close</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                style={{ background: "transparent", border: "none", color: "var(--brand-ochre)", fontSize: 12.5, fontWeight: 700, textDecoration: "underline", cursor: "pointer", marginLeft: 6 }}
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Destination Cards Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Loading luxury destinations...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="dest-catalog-grid">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id || dest.slug} destination={dest} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="pkg-empty-state-box">
            <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--brand-ochre)" }}>
              location_off
            </span>
            <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-dark)", margin: "12px 0 8px" }}>
              No Destinations Matched Your Criteria
            </h3>
            <p style={{ fontSize: 14.5, color: "var(--text-muted)", maxWidth: 440, lineHeight: 1.6, margin: "0 auto 24px" }}>
              Try clearing your search query or selecting another region or visa type.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button type="button" onClick={handleResetFilters} className="btn-empty-reset">
                Reset All Filters
              </button>
              <button type="button" onClick={() => setEnquiryModalOpen(true)} className="btn-empty-enquiry">
                Request Custom Destination
              </button>
            </div>
          </div>
        )}

        {/* 3. Bottom Concierge Banner */}
        <CustomItineraryBanner onOpenEnquiry={() => setEnquiryModalOpen(true)} />
      </div>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryForm
          packageId="general-custom-destination"
          packageName="Custom Tailored Destination Itinerary"
          destinationName="Bespoke Destination"
          isModal={true}
          isOpen={true}
          onClose={() => setEnquiryModalOpen(false)}
        />
      )}
    </div>
  );
}
