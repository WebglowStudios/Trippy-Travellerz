"use client";

import { useMemo } from "react";

export interface FilterState {
  search: string;
  destination: string;
  category: string;
  duration: string; // "all" | "short" | "medium" | "long" | "extended"
  maxPrice: number;
  flightsOnly: boolean;
  groupToursOnly: boolean;
  internationalOnly: boolean;
  sort: string;
}

interface PackagesFilterSidebarProps {
  filters: FilterState;
  onChangeFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  availableDestinations: { id: string; name: string; count: number }[];
  categories: { id: string; label: string; icon: string; count: number }[];
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  totalFilteredCount: number;
}

export default function PackagesFilterSidebar({
  filters,
  onChangeFilter,
  onResetFilters,
  availableDestinations,
  categories,
  isMobileOpen,
  onCloseMobile,
  totalFilteredCount,
}: PackagesFilterSidebarProps) {
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.destination !== "all") count++;
    if (filters.category !== "all") count++;
    if (filters.duration !== "all") count++;
    if (filters.maxPrice < 250000) count++;
    if (filters.flightsOnly) count++;
    if (filters.groupToursOnly) count++;
    if (filters.internationalOnly) count++;
    return count;
  }, [filters]);

  const sidebarContent = (
    <div className="pkg-sidebar-box">
      {/* Sidebar Header */}
      <div className="pkg-sidebar-head">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="material-symbols-rounded" style={{ color: "var(--brand-ochre)", fontSize: 20 }}>
            tune
          </span>
          <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
            Filter Tours
          </h3>
          {activeFiltersCount > 0 && (
            <span className="pkg-filter-count-badge">{activeFiltersCount}</span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="pkg-reset-btn"
          >
            Reset All
          </button>
        )}
      </div>

      {/* 1. Destination Filter */}
      <div className="pkg-filter-group">
        <h4 className="pkg-filter-title">
          <span className="material-symbols-rounded">location_on</span>
          Destination
        </h4>
        <div className="pkg-filter-options-list">
          <label className="pkg-filter-radio-item">
            <input
              type="radio"
              name="destination"
              checked={filters.destination === "all"}
              onChange={() => onChangeFilter("destination", "all")}
            />
            <span className="pkg-radio-label">All Destinations</span>
          </label>
          {availableDestinations.map((dest) => (
            <label key={dest.id} className="pkg-filter-radio-item">
              <input
                type="radio"
                name="destination"
                checked={filters.destination.toLowerCase() === dest.name.toLowerCase()}
                onChange={() => onChangeFilter("destination", dest.name.toLowerCase())}
              />
              <span className="pkg-radio-label">{dest.name}</span>
              {dest.count > 0 && <span className="pkg-item-count">{dest.count}</span>}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Budget Price Slider */}
      <div className="pkg-filter-group">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h4 className="pkg-filter-title" style={{ margin: 0 }}>
            <span className="material-symbols-rounded">payments</span>
            Budget Range
          </h4>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-brown)" }}>
            ₹ {filters.maxPrice >= 250000 ? "2.5L+" : filters.maxPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
          Maximum price per traveler
        </p>
        <input
          type="range"
          min="10000"
          max="250000"
          step="5000"
          value={filters.maxPrice}
          onChange={(e) => onChangeFilter("maxPrice", Number(e.target.value))}
          className="pkg-price-slider"
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
          <span>₹ 10,000</span>
          <span>₹ 1,25,000</span>
          <span>₹ 2,50,000+</span>
        </div>
      </div>

      {/* 3. Duration Filter */}
      <div className="pkg-filter-group">
        <h4 className="pkg-filter-title">
          <span className="material-symbols-rounded">schedule</span>
          Trip Duration
        </h4>
        <div className="pkg-filter-options-list">
          {[
            { id: "all", label: "Any Duration" },
            { id: "short", label: "1 - 4 Days (Short Breaks)" },
            { id: "medium", label: "5 - 7 Days (Classic 1-Week)" },
            { id: "long", label: "8 - 11 Days (Extended Odysseys)" },
            { id: "extended", label: "12+ Days (Grand Expeditions)" },
          ].map((dur) => (
            <label key={dur.id} className="pkg-filter-radio-item">
              <input
                type="radio"
                name="duration"
                checked={filters.duration === dur.id}
                onChange={() => onChangeFilter("duration", dur.id)}
              />
              <span className="pkg-radio-label">{dur.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Travel Style / Theme */}
      <div className="pkg-filter-group">
        <h4 className="pkg-filter-title">
          <span className="material-symbols-rounded">local_activity</span>
          Travel Style
        </h4>
        <div className="pkg-filter-options-list">
          <label className="pkg-filter-radio-item">
            <input
              type="radio"
              name="category"
              checked={filters.category === "all"}
              onChange={() => onChangeFilter("category", "all")}
            />
            <span className="pkg-radio-label">All Styles</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="pkg-filter-radio-item">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.id}
                onChange={() => onChangeFilter("category", cat.id)}
              />
              <span className="pkg-radio-label">{cat.label}</span>
              {cat.count > 0 && <span className="pkg-item-count">{cat.count}</span>}
            </label>
          ))}
        </div>
      </div>

      {/* 5. Special Inclusions & Tour Type */}
      <div className="pkg-filter-group">
        <h4 className="pkg-filter-title">
          <span className="material-symbols-rounded">verified</span>
          Special Inclusions
        </h4>
        <div className="pkg-filter-checkboxes">
          <label className="pkg-filter-check-item">
            <input
              type="checkbox"
              checked={filters.flightsOnly}
              onChange={(e) => onChangeFilter("flightsOnly", e.target.checked)}
            />
            <span>✈️ Flights Included</span>
          </label>
          <label className="pkg-filter-check-item">
            <input
              type="checkbox"
              checked={filters.groupToursOnly}
              onChange={(e) => onChangeFilter("groupToursOnly", e.target.checked)}
            />
            <span>👥 Group Departures</span>
          </label>
          <label className="pkg-filter-check-item">
            <input
              type="checkbox"
              checked={filters.internationalOnly}
              onChange={(e) => onChangeFilter("internationalOnly", e.target.checked)}
            />
            <span>🌐 International Escapes</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="pkg-desktop-sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Modal */}
      {isMobileOpen && (
        <div className="pkg-mobile-filter-overlay" onClick={onCloseMobile}>
          <div className="pkg-mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="pkg-mobile-drawer-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ color: "var(--brand-ochre)" }}>tune</span>
                <h3 className="serif" style={{ fontSize: 18, margin: 0, fontWeight: 700 }}>Filter Tours</h3>
              </div>
              <button type="button" onClick={onCloseMobile} className="pkg-drawer-close-btn">
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            <div className="pkg-mobile-drawer-body">
              {sidebarContent}
            </div>
            <div className="pkg-mobile-drawer-footer">
              <button
                type="button"
                className="btn-apply-filters"
                onClick={onCloseMobile}
              >
                Show {totalFilteredCount} Tours
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
