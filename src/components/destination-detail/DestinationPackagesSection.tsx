"use client";

import { useState, useMemo } from "react";
import PackageCatalogCard, { PackageItem } from "@/components/packages/PackageCatalogCard";
import { ShowcaseDestination } from "@/lib/showcase-destinations";

interface DestinationPackagesSectionProps {
  destination: ShowcaseDestination;
  packages: PackageItem[];
  onOpenEnquiry: () => void;
}

export default function DestinationPackagesSection({
  destination,
  packages,
  onOpenEnquiry,
}: DestinationPackagesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "duration">("featured");

  const categories = useMemo(() => {
    const set = new Set<string>();
    packages.forEach((p) => {
      if (p.category) set.add(p.category.toLowerCase());
    });
    return Array.from(set);
  }, [packages]);

  const filtered = useMemo(() => {
    let list = [...packages];

    // Filter by Category
    if (selectedCategory !== "all") {
      list = list.filter((p) => (p.category || "").toLowerCase() === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = (p.shortDescription || "").toLowerCase().includes(q);
        const highlightsMatch = p.highlights?.some((h) => h.toLowerCase().includes(q));
        const hotelMatch = (p.hotelRating || "").toLowerCase().includes(q);
        return nameMatch || descMatch || highlightsMatch || hotelMatch;
      });
    }

    // Sort
    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration") {
      list.sort((a, b) => (a.duration?.days || 0) - (b.duration?.days || 0));
    }

    return list;
  }, [packages, selectedCategory, searchQuery, sortBy]);

  return (
    <section
      className="dest-section-wrap"
      id="packages-section"
      style={{
        background: "#FAF7F2",
        borderTop: "1px solid var(--border-warm, #EAE3D8)",
        borderBottom: "1px solid var(--border-warm, #EAE3D8)",
        padding: "60px 0",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div>
            <span
              className="cursive"
              style={{
                fontSize: 20,
                color: "var(--brand-ochre, #8E5F32)",
                display: "block",
                marginBottom: 4,
              }}
            >
              Handcrafted Itineraries • {destination.name}
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 700,
                color: "var(--text-dark, #2C1810)",
                margin: "0 0 6px",
              }}
            >
              Curated Tour Packages
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--text-body, #5C4A3E)", margin: 0 }}>
              Showing {filtered.length} bespoke escapes designed for unforgettable experiences.
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#FFFFFF",
                border: "1.5px solid var(--border-warm, #EAE3D8)",
                borderRadius: 9999,
                padding: "6px 14px",
                width: 240,
                gap: 8,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--brand-ochre)" }}>
                search
              </span>
              <input
                type="text"
                placeholder={`Search ${destination.name} tours...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 13,
                  color: "var(--text-dark)",
                  width: "100%",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>close</span>
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: "8px 16px",
                borderRadius: 9999,
                border: "1.5px solid var(--border-warm, #EAE3D8)",
                background: "#FFFFFF",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--brand-brown, #58371E)",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="duration">Duration: Short to Long</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="pkg-category-pills-bar" style={{ padding: "0 0 24px", display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              type="button"
              className={`pkg-cat-pill ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              <span>All {destination.name} Tours</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`pkg-cat-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ textTransform: "capitalize" }}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        )}

        {/* Packages Grid */}
        {filtered.length > 0 ? (
          <div className="pkg-catalog-grid">
            {filtered.map((pkg) => (
              <PackageCatalogCard
                key={pkg._id || pkg.slug}
                pkg={pkg}
                viewMode="grid"
              />
            ))}
          </div>
        ) : (
          <div className="pkg-empty-state-box">
            <span className="material-symbols-rounded" style={{ fontSize: 48, color: "var(--brand-ochre)" }}>
              explore_off
            </span>
            <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, margin: "10px 0" }}>
              No Itineraries Match Your Criteria
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20, maxWidth: 440 }}>
              {searchQuery
                ? `No tours found matching "${searchQuery}". Try clearing search or let our travel designers craft it.`
                : `Our travel specialists can curate a custom ${selectedCategory} escape for ${destination.name} within 24 hours.`}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 9999,
                    background: "#FFFFFF",
                    border: "1.5px solid var(--border-warm)",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "var(--brand-brown)",
                    cursor: "pointer",
                  }}
                >
                  Clear Search
                </button>
              )}
              <button type="button" onClick={onOpenEnquiry} className="btn-empty-enquiry">
                Request Custom Itinerary
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
