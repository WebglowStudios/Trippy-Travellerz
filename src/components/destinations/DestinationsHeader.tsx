"use client";

import Link from "next/link";

interface DestinationsHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  selectedVisa: string;
  onSelectVisa: (visa: string) => void;
  regions: string[];
  totalResults: number;
}

export default function DestinationsHeader({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
  selectedVisa,
  onSelectVisa,
  regions,
  totalResults,
}: DestinationsHeaderProps) {
  return (
    <section className="pkg-header-section">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pkg-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
          <Link href="/">Home</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <span className="pkg-breadcrumb-active">All Destinations</span>
        </nav>

        {/* Header Titles */}
        <div className="pkg-header-titles">
          <span className="cursive" style={{ fontSize: "20px", color: "var(--brand-ochre)", display: "block", marginBottom: "4px" }}>
            Curated Escapes & Extraordinary Corners of the Earth
          </span>
          <h1 className="serif pkg-catalog-title">
            Explore Handcrafted Destinations
          </h1>
          <p className="pkg-catalog-subtitle">
            From the sun-drenched red dunes of the Arabian Gulf to the tranquil emerald lagoons of Bali, discover {totalResults}+ handpicked destinations crafted for memory-making.
          </p>
        </div>

        {/* Search Hero Box */}
        <div className="pkg-search-hero-box">
          <div className="pkg-search-input-wrap">
            <span className="material-symbols-rounded pkg-search-icon">search</span>
            <input
              type="text"
              placeholder="Search destinations by country, city, or experience (e.g. Dubai, Bali, Maldives, Safari)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pkg-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="pkg-search-clear-btn"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Region Filter Carousel */}
        <div className="pkg-category-pills-bar" style={{ marginBottom: 14 }}>
          <button
            type="button"
            className={`pkg-cat-pill ${selectedRegion === "all" ? "active" : ""}`}
            onClick={() => onSelectRegion("all")}
          >
            <span className="material-symbols-rounded">public</span>
            <span>All Regions</span>
          </button>
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              className={`pkg-cat-pill ${selectedRegion.toLowerCase() === region.toLowerCase() ? "active" : ""}`}
              onClick={() => onSelectRegion(region.toLowerCase())}
            >
              <span className="material-symbols-rounded">near_me</span>
              <span>{region}</span>
            </button>
          ))}
        </div>

        {/* Visa Filter Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", paddingTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.6 }}>
            Visa Category:
          </span>
          {[
            { id: "all", label: "All Visas" },
            { id: "free", label: "Visa-Free for Indians 🚀" },
            { id: "on-arrival", label: "Visa on Arrival ✨" },
            { id: "e-visa", label: "Fast E-Visa 📄" },
          ].map((visa) => (
            <button
              key={visa.id}
              type="button"
              onClick={() => onSelectVisa(visa.id)}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 9999,
                cursor: "pointer",
                border: "1px solid",
                borderColor: selectedVisa === visa.id ? "var(--brand-brown)" : "var(--border-warm)",
                background: selectedVisa === visa.id ? "var(--brand-brown)" : "#FFFFFF",
                color: selectedVisa === visa.id ? "#FFFFFF" : "var(--text-body)",
                transition: "all 0.2s",
              }}
            >
              {visa.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
