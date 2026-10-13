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

  const categories = useMemo(() => {
    const set = new Set<string>();
    packages.forEach((p) => {
      if (p.category) set.add(p.category.toLowerCase());
    });
    return Array.from(set);
  }, [packages]);

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return packages;
    return packages.filter((p) => (p.category || "").toLowerCase() === selectedCategory);
  }, [packages, selectedCategory]);

  return (
    <section className="dest-section-wrap" id="packages-section" style={{ background: "#FAF7F2", borderTop: "1px solid var(--border-warm)", borderBottom: "1px solid var(--border-warm)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
          <div>
            <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
              Handcrafted Itineraries • {destination.name}
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--text-dark)", margin: "0 0 6px" }}>
              Curated Tour Packages
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
              Showing {filtered.length} bespoke escapes designed for real moments.
            </p>
          </div>

          {/* Category Tabs */}
          {categories.length > 0 && (
            <div className="pkg-category-pills-bar" style={{ padding: 0 }}>
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
        </div>

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
              flight_takeoff
            </span>
            <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, margin: "10px 0" }}>
              No Specific Tours Under This Category Yet
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
              Our travel specialists can craft a custom {selectedCategory} package for {destination.name} instantly.
            </p>
            <button type="button" onClick={onOpenEnquiry} className="btn-empty-enquiry">
              Request Custom Itinerary
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
