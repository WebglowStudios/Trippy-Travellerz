"use client";

import { FilterState } from "./PackagesFilterSidebar";

interface PackagesToolbarProps {
  totalResults: number;
  filters: FilterState;
  onChangeFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearFilter: (key: keyof FilterState) => void;
  viewMode: "grid" | "list";
  onToggleViewMode: (mode: "grid" | "list") => void;
  onOpenMobileFilters: () => void;
}

export default function PackagesToolbar({
  totalResults,
  filters,
  onChangeFilter,
  onClearFilter,
  viewMode,
  onToggleViewMode,
  onOpenMobileFilters,
}: PackagesToolbarProps) {
  // Collect active filter tags to display chips
  const activeTags = [];
  if (filters.search) {
    activeTags.push({ key: "search" as const, label: `Search: "${filters.search}"` });
  }
  if (filters.destination !== "all") {
    activeTags.push({ key: "destination" as const, label: `Destination: ${filters.destination}` });
  }
  if (filters.category !== "all") {
    activeTags.push({ key: "category" as const, label: `Style: ${filters.category}` });
  }
  if (filters.duration !== "all") {
    const durLabels: Record<string, string> = {
      short: "1-4 Days",
      medium: "5-7 Days",
      long: "8-11 Days",
      extended: "12+ Days",
    };
    activeTags.push({ key: "duration" as const, label: durLabels[filters.duration] || filters.duration });
  }
  if (filters.maxPrice < 250000) {
    activeTags.push({ key: "maxPrice" as const, label: `Under ₹${filters.maxPrice.toLocaleString("en-IN")}` });
  }
  if (filters.flightsOnly) {
    activeTags.push({ key: "flightsOnly" as const, label: "Flights Included" });
  }
  if (filters.groupToursOnly) {
    activeTags.push({ key: "groupToursOnly" as const, label: "Group Tours" });
  }
  if (filters.internationalOnly) {
    activeTags.push({ key: "internationalOnly" as const, label: "International" });
  }

  return (
    <div className="pkg-toolbar-container">
      <div className="pkg-toolbar-row">
        {/* Left: Result Counter & Mobile Filter Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            className="pkg-mobile-filter-btn"
            onClick={onOpenMobileFilters}
          >
            <span className="material-symbols-rounded">tune</span>
            <span>Filters {activeTags.length > 0 && `(${activeTags.length})`}</span>
          </button>

          <p className="pkg-results-count">
            Showing <strong>{totalResults}</strong> {totalResults === 1 ? "tour package" : "tour packages"}
          </p>
        </div>

        {/* Right: Sort Dropdown & View Mode Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="pkg-sort-wrapper">
            <label htmlFor="sort-select" className="pkg-sort-label">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={filters.sort}
              onChange={(e) => onChangeFilter("sort", e.target.value)}
              className="pkg-sort-select"
            >
              <option value="featured">Featured & Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration_asc">Duration: Shortest First</option>
              <option value="duration_desc">Duration: Longest First</option>
            </select>
          </div>

          <div className="pkg-view-switch-box">
            <button
              type="button"
              className={`pkg-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => onToggleViewMode("grid")}
              aria-label="Grid View"
              title="Grid View"
            >
              <span className="material-symbols-rounded">grid_view</span>
            </button>
            <button
              type="button"
              className={`pkg-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => onToggleViewMode("list")}
              aria-label="List View"
              title="List View"
            >
              <span className="material-symbols-rounded">view_list</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeTags.length > 0 && (
        <div className="pkg-active-chips-row">
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Active Filters:
          </span>
          {activeTags.map((tag) => (
            <button
              key={tag.key}
              type="button"
              className="pkg-chip-tag"
              onClick={() => onClearFilter(tag.key)}
            >
              <span>{tag.label}</span>
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>close</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
