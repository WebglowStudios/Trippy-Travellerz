"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import PackagesHeader from "./PackagesHeader";
import PackagesFilterSidebar, { FilterState } from "./PackagesFilterSidebar";
import PackagesToolbar from "./PackagesToolbar";
import PackageCatalogCard, { PackageItem } from "./PackageCatalogCard";
import CustomItineraryBanner from "./CustomItineraryBanner";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import { DUBAI_SHOWCASE_PACKAGE } from "@/lib/showcase-packages";

const CATEGORY_DEFINITIONS = [
  { id: "luxury", label: "Luxury & 5★", icon: "diamond" },
  { id: "honeymoon", label: "Honeymoon & Romantic", icon: "favorite" },
  { id: "adventure", label: "Adventure & Thrill", icon: "hiking" },
  { id: "heritage", label: "Heritage & Palaces", icon: "temple_hindu" },
  { id: "beach", label: "Beach & Islands", icon: "beach_access" },
  { id: "family", label: "Family & Group", icon: "groups" },
];

const INITIAL_FALLBACK_PACKAGES: PackageItem[] = [
  DUBAI_SHOWCASE_PACKAGE as any,
  {
    _id: "bali-luxury-honeymoon-retreat-6n7d",
    name: "Bali Luxury Honeymoon — Private Pool Villa & Nusa Penida",
    slug: "bali-luxury-honeymoon-retreat-6n7d",
    price: 72999,
    originalPrice: 95000,
    priceUnit: "couple",
    badge: "Most Popular Honeymoon",
    category: "honeymoon",
    destination: { name: "Bali", slug: "bali" },
    duration: { days: 7, nights: 6 },
    rating: 4.9,
    reviewCount: 285,
    flightsIncluded: true,
    isInternational: true,
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    shortDescription: "Private cliffside villa with floral pool breakfast, sunrise speedboat to Nusa Penida, and romantic candlelit Jimbaran Bay dinner.",
    highlights: ["Private Pool Villa in Seminyak & Ubud", "Nusa Penida Kelingking Beach Day Cruise", "Balinese Couples Herbal Spa Therapy"],
  },
  {
    _id: "rajasthan-royal-heritage-tour-jaipur-udaipur-and-jodhpur",
    name: "Rajasthan Royal Heritage — Jaipur, Udaipur & Jodhpur",
    slug: "rajasthan-royal-heritage-tour-jaipur-udaipur-and-jodhpur",
    price: 49999,
    originalPrice: 65000,
    priceUnit: "person",
    badge: "Bestseller",
    category: "heritage",
    destination: { name: "India", slug: "india" },
    duration: { days: 8, nights: 7 },
    rating: 4.8,
    reviewCount: 410,
    flightsIncluded: false,
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    shortDescription: "Stay in restored royal Havelis, explore the Amber Fort on private guided walks, and take sunset boat rides across Lake Pichola.",
    highlights: ["Palace stays with heritage royal dining", "Lake Pichola private boat cruise", "Private chauffeur throughout"],
  },
  {
    _id: "kerala-backwaters-and-ayurveda-retreat-kochi-alleppey-and-munnar",
    name: "Kerala Backwaters & Ayurveda Retreat — Kochi, Alleppey & Munnar",
    slug: "kerala-backwaters-and-ayurveda-retreat-kochi-alleppey-and-munnar",
    price: 74999,
    originalPrice: 89000,
    priceUnit: "couple",
    badge: "Honeymoon Special",
    category: "honeymoon",
    destination: { name: "India", slug: "india" },
    duration: { days: 7, nights: 6 },
    rating: 4.7,
    reviewCount: 310,
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    shortDescription: "Private overnight cruise on a luxury AC houseboat through Alleppey backwaters with personal chef, Ayurvedic spa treatments, and Munnar tea mist.",
    highlights: ["Private luxury houseboat cruise with personal chef", "Full-day authentic Ayurveda rejuvenation", "Munnar tea plantation trek"],
  },
  {
    _id: "maldives-overwater-bungalow-experience",
    name: "Maldives All-Inclusive Overwater Villa Sanctuary",
    slug: "maldives-overwater-bungalow-experience",
    price: 119999,
    originalPrice: 155000,
    priceUnit: "couple",
    badge: "All-Inclusive",
    category: "luxury",
    destination: { name: "Maldives", slug: "maldives" },
    duration: { days: 5, nights: 4 },
    rating: 4.9,
    reviewCount: 198,
    flightsIncluded: true,
    isInternational: true,
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    shortDescription: "Direct lagoon access from your private overwater sundeck, seaplane transfers across turquoise atolls, and sunset champagne catamaran sails.",
    highlights: ["Overwater villa with plunge pool", "Return scenic seaplane transfers", "All-inclusive gourmet dining & beverage package"],
  },
  {
    _id: "japan-cherry-blossom-season-special",
    name: "Japan Grand Odyssey — Tokyo, Kyoto & Mount Fuji",
    slug: "japan-cherry-blossom-season-special",
    price: 114999,
    originalPrice: 145000,
    priceUnit: "person",
    badge: "New",
    category: "luxury",
    destination: { name: "Japan", slug: "japan" },
    duration: { days: 9, nights: 8 },
    rating: 4.9,
    reviewCount: 156,
    flightsIncluded: true,
    isInternational: true,
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    shortDescription: "Shinkansen bullet train journeys, private tea ceremony in Kyoto, luxury ryokan onsen stay with views of Mount Fuji, and neon Tokyo tours.",
    highlights: ["7-Day JR Shinkansen Green Pass", "Luxury Hakone Onsen Ryokan stay", "Kyoto bamboo forest & geisha quarter walk"],
  },
  {
    _id: "bangkok-and-phuket-beach-holiday",
    name: "Thailand Island Explorer — Bangkok, Phuket & Phi Phi",
    slug: "bangkok-and-phuket-beach-holiday",
    price: 54999,
    originalPrice: 69990,
    priceUnit: "person",
    badge: "Bestseller",
    category: "adventure",
    destination: { name: "Thailand", slug: "thailand" },
    duration: { days: 6, nights: 5 },
    rating: 4.8,
    reviewCount: 380,
    flightsIncluded: true,
    isInternational: true,
    heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    shortDescription: "Rooftop lounges in vibrant Bangkok, private longtail boat to Maya Bay, and sunset beachfront resort cocktails in Phuket.",
    highlights: ["Speedboat charter to Phi Phi & Bamboo Island", "Chao Phraya luxury dinner cruise", "Private transfers throughout"],
  },
  {
    _id: "singapore-classic-with-universal-studios",
    name: "Singapore Skyline & Sentosa Island Luxury Escape",
    slug: "singapore-classic-with-universal-studios",
    price: 72999,
    originalPrice: 88000,
    priceUnit: "person",
    badge: "Popular",
    category: "family",
    destination: { name: "Singapore", slug: "singapore" },
    duration: { days: 5, nights: 4 },
    rating: 4.8,
    reviewCount: 290,
    flightsIncluded: true,
    isInternational: true,
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    shortDescription: "Marina Bay Sands SkyPark panoramic access, Gardens by the Bay flower dome, and VIP entry to Universal Studios Singapore.",
    highlights: ["Marina Bay Sands SkyPark pass", "Universal Studios Express VIP entry", "Night Safari tram with animal encounters"],
  },
];

export default function PackagesMain() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Primary Data States
  const [packages, setPackages] = useState<PackageItem[]>(INITIAL_FALLBACK_PACKAGES);
  const [loading, setLoading] = useState(true);
  const [destinationsList, setDestinationsList] = useState<{ id: string; name: string; count: number }[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  // Filter States
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams?.get("search") || "",
    destination: searchParams?.get("destination") || "all",
    category: searchParams?.get("category") || "all",
    duration: searchParams?.get("duration") || "all",
    maxPrice: Number(searchParams?.get("maxPrice")) || 250000,
    flightsOnly: searchParams?.get("flightsOnly") === "true",
    groupToursOnly: searchParams?.get("groupToursOnly") === "true",
    internationalOnly: searchParams?.get("internationalOnly") === "true",
    sort: searchParams?.get("sort") || "featured",
  });

  // Fetch Live Packages from Backend Engine
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Fetch Packages
        const pkgRes = await api.get("/packages?limit=100");
        let fetchedList: PackageItem[] = [];

        if (pkgRes.status === "success" && Array.isArray(pkgRes.data)) {
          fetchedList = pkgRes.data.map((p: any) => ({
            _id: p._id,
            name: p.name,
            slug: p.slug,
            price: p.price > 10 ? p.price : 49999, // normalize test 1 INR data to realistic luxury pricing
            originalPrice: p.originalPrice || (p.price > 10 ? Math.round(p.price * 1.25) : 65000),
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

        // Merge backend packages with initial showcase packages (deduping by slug)
        const combinedMap = new Map<string, PackageItem>();
        INITIAL_FALLBACK_PACKAGES.forEach((item) => combinedMap.set(item.slug, item));
        fetchedList.forEach((item) => combinedMap.set(item.slug, item));

        const finalPackages = Array.from(combinedMap.values());
        setPackages(finalPackages);

        // Fetch Destinations for dynamic filter counts
        try {
          const destRes = await api.get("/destinations?limit=100");
          if (destRes.status === "success" && Array.isArray(destRes.data)) {
            const mappedDest = destRes.data.map((d: any) => {
              const matchingPkgs = finalPackages.filter((p) => {
                const destName = typeof p.destination === "object" ? p.destination?.name : p.destination;
                return (
                  destName?.toLowerCase() === d.name?.toLowerCase() ||
                  p.name.toLowerCase().includes(d.name?.toLowerCase())
                );
              });
              return {
                id: d._id,
                name: d.name,
                count: matchingPkgs.length,
              };
            });
            setDestinationsList(mappedDest);
          }
        } catch {
          // Keep static destinations
        }
      } catch (err) {
        console.error("Failed to load packages:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Sync state changes with URL query parameters
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      const params = new URLSearchParams();

      if (next.search) params.set("search", next.search);
      if (next.destination !== "all") params.set("destination", next.destination);
      if (next.category !== "all") params.set("category", next.category);
      if (next.duration !== "all") params.set("duration", next.duration);
      if (next.maxPrice < 250000) params.set("maxPrice", String(next.maxPrice));
      if (next.flightsOnly) params.set("flightsOnly", "true");
      if (next.groupToursOnly) params.set("groupToursOnly", "true");
      if (next.internationalOnly) params.set("internationalOnly", "true");
      if (next.sort !== "featured") params.set("sort", next.sort);

      const queryString = params.toString();
      router.replace(`/packages${queryString ? `?${queryString}` : ""}`, { scroll: false });
      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      destination: "all",
      category: "all",
      duration: "all",
      maxPrice: 250000,
      flightsOnly: false,
      groupToursOnly: false,
      internationalOnly: false,
      sort: "featured",
    });
    router.replace("/packages", { scroll: false });
  };

  const handleClearSingleFilter = (key: keyof FilterState) => {
    if (key === "maxPrice") {
      updateFilter("maxPrice", 250000);
    } else if (typeof filters[key] === "boolean") {
      updateFilter(key, false as any);
    } else {
      updateFilter(key, (key === "sort" ? "featured" : key === "search" ? "" : "all") as any);
    }
  };

  // Dynamic Category Counts
  const dynamicCategories = useMemo(() => {
    return CATEGORY_DEFINITIONS.map((cat) => {
      const count = packages.filter((p) => {
        const catStr = p.category?.toLowerCase() || "";
        const nameStr = p.name.toLowerCase();
        const badgeStr = p.badge?.toLowerCase() || "";
        return catStr.includes(cat.id) || nameStr.includes(cat.id) || badgeStr.includes(cat.id);
      }).length;
      return { ...cat, count };
    });
  }, [packages]);

  // Client-side filtering & sorting
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // 1. Search Query
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        const destName = (typeof pkg.destination === "object" ? pkg.destination?.name : pkg.destination) || "";
        const matchesName = pkg.name.toLowerCase().includes(q);
        const matchesDest = destName.toLowerCase().includes(q);
        const matchesDesc = (pkg.shortDescription || "").toLowerCase().includes(q);
        const matchesHighlights = (pkg.highlights || []).some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesDest && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }

      // 2. Destination Filter
      if (filters.destination !== "all") {
        const target = filters.destination.toLowerCase();
        const destName = ((typeof pkg.destination === "object" ? pkg.destination?.name : pkg.destination) || "").toLowerCase();
        const pkgName = pkg.name.toLowerCase();
        if (!destName.includes(target) && !pkgName.includes(target)) {
          return false;
        }
      }

      // 3. Category Filter
      if (filters.category !== "all") {
        const catTarget = filters.category.toLowerCase();
        const catStr = (pkg.category || "").toLowerCase();
        const nameStr = pkg.name.toLowerCase();
        const badgeStr = (pkg.badge || "").toLowerCase();
        if (!catStr.includes(catTarget) && !nameStr.includes(catTarget) && !badgeStr.includes(catTarget)) {
          return false;
        }
      }

      // 4. Budget Range
      if (filters.maxPrice < 250000 && pkg.price > filters.maxPrice) {
        return false;
      }

      // 5. Trip Duration
      const days = pkg.duration?.days || 6;
      if (filters.duration === "short" && (days < 1 || days > 4)) return false;
      if (filters.duration === "medium" && (days < 5 || days > 7)) return false;
      if (filters.duration === "long" && (days < 8 || days > 11)) return false;
      if (filters.duration === "extended" && days < 12) return false;

      // 6. Inclusions & Trip Types
      if (filters.flightsOnly && !pkg.flightsIncluded) return false;
      if (filters.groupToursOnly && !pkg.isGroupTour) return false;
      if (filters.internationalOnly && !pkg.isInternational && !pkg.name.toLowerCase().includes("dubai") && !pkg.name.toLowerCase().includes("bali") && !pkg.name.toLowerCase().includes("singapore") && !pkg.name.toLowerCase().includes("maldives") && !pkg.name.toLowerCase().includes("japan") && !pkg.name.toLowerCase().includes("thailand")) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (filters.sort === "price_asc") return a.price - b.price;
      if (filters.sort === "price_desc") return b.price - a.price;
      if (filters.sort === "rating") return (b.rating || 0) - (a.rating || 0);
      if (filters.sort === "duration_asc") return (a.duration?.days || 6) - (b.duration?.days || 6);
      if (filters.sort === "duration_desc") return (b.duration?.days || 6) - (a.duration?.days || 6);
      return 0; // default featured
    });
  }, [packages, filters]);

  return (
    <div className="pkg-catalog-page-wrapper">
      {/* 1. Header Banner with Search & Category Pills */}
      <PackagesHeader
        searchQuery={filters.search}
        onSearchChange={(q) => updateFilter("search", q)}
        activeCategory={filters.category}
        onSelectCategory={(cat) => updateFilter("category", cat)}
        categories={CATEGORY_DEFINITIONS}
        totalResults={filteredPackages.length}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="container" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <div className="pkg-catalog-two-col">
          {/* Left: Filter Sidebar */}
          <PackagesFilterSidebar
            filters={filters}
            onChangeFilter={updateFilter}
            onResetFilters={handleResetFilters}
            availableDestinations={destinationsList}
            categories={dynamicCategories}
            isMobileOpen={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
            totalFilteredCount={filteredPackages.length}
          />

          {/* Right: Toolbar & Packages Grid/List */}
          <main className="pkg-catalog-main-content">
            <PackagesToolbar
              totalResults={filteredPackages.length}
              filters={filters}
              onChangeFilter={updateFilter}
              onClearFilter={handleClearSingleFilter}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
              onOpenMobileFilters={() => setMobileFilterOpen(true)}
            />

            {/* Packages Grid or Empty State */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ width: 44, height: 44, border: "3px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Loading curated journeys...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : filteredPackages.length > 0 ? (
              <div className={viewMode === "grid" ? "pkg-catalog-grid" : "pkg-catalog-list"}>
                {filteredPackages.map((pkg) => (
                  <PackageCatalogCard
                    key={pkg._id || pkg.slug}
                    pkg={pkg}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="pkg-empty-state-box">
                <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--brand-ochre)" }}>
                  explore_off
                </span>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-dark)", margin: "12px 0 8px" }}>
                  No Journeys Matched Your Filters
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--text-muted)", maxWidth: 440, lineHeight: 1.6, margin: "0 auto 24px" }}>
                  Try adjusting your price range, clearing some filters, or search for another destination.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="btn-empty-reset"
                  >
                    Reset All Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnquiryModalOpen(true)}
                    className="btn-empty-enquiry"
                  >
                    Plan Custom Tour
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* 3. Bottom Custom Concierge Banner */}
        <CustomItineraryBanner onOpenEnquiry={() => setEnquiryModalOpen(true)} />
      </div>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryForm
          packageId="general-custom-quote"
          packageName="Custom Luxury Tailored Itinerary"
          destinationName="Bespoke Destination"
          isModal={true}
          isOpen={true}
          onClose={() => setEnquiryModalOpen(false)}
        />
      )}
    </div>
  );
}
