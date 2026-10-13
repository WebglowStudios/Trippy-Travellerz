"use client";

import Link from "next/link";

interface PackagesHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: { id: string; label: string; icon: string }[];
  totalResults: number;
}

export default function PackagesHeader({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  categories,
  totalResults,
}: PackagesHeaderProps) {
  return (
    <section className="pkg-header-section">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pkg-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
          <Link href="/">Home</Link>
          <span className="pkg-breadcrumb-sep">/</span>
          <span className="pkg-breadcrumb-active">All Tour Packages</span>
        </nav>

        {/* Header Titles */}
        <div className="pkg-header-titles">
          <span className="cursive" style={{ fontSize: "20px", color: "var(--brand-ochre)", display: "block", marginBottom: "4px" }}>
            Handcrafted Journeys • Dream · Explore · Discover
          </span>
          <h1 className="serif pkg-catalog-title">
            Curated Luxury Packages & Escapes
          </h1>
          <p className="pkg-catalog-subtitle">
            Explore {totalResults}+ private retreats, cultural odysseys, and signature group departures crafted by master travel designers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="pkg-search-hero-box">
          <div className="pkg-search-input-wrap">
            <span className="material-symbols-rounded pkg-search-icon">search</span>
            <input
              type="text"
              placeholder="Search by destination, package name, activity, or keyword (e.g. Dubai, Safari, Houseboat)..."
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

        {/* Quick Category Carousel / Pills */}
        <div className="pkg-category-pills-bar">
          <button
            type="button"
            className={`pkg-cat-pill ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => onSelectCategory("all")}
          >
            <span className="material-symbols-rounded">travel_explore</span>
            <span>All Journeys</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`pkg-cat-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="material-symbols-rounded">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
