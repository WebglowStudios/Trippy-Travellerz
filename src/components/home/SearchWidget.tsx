"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface DestinationOption {
  name: string;
  slug: string;
  country?: string;
  packageCount?: number;
}

export default function SearchWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Destinations" | "Packages" | "Experiences">("Destinations");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [datesQuery, setDatesQuery] = useState("Flexible Dates");
  const [guestsQuery, setGuestsQuery] = useState("2 Adults");
  const [destinations, setDestinations] = useState<DestinationOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const res = await api.get("/destinations");
        if (res.status === "success" && res.data) {
          const list = res.data.map((d: any) => ({
            name: d.name,
            slug: d.slug,
            country: d.country,
            packageCount: d.packageCount || 0,
          }));
          setDestinations(list);
          if (list.length > 0 && !destinationQuery) {
            setDestinationQuery(list[0].name + (list[0].country ? `, ${list[0].country}` : ""));
            setSelectedSlug(list[0].slug);
          }
        }
      } catch {
        // Fallback
      }
    }
    loadDestinations();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
    (d.country && d.country.toLowerCase().includes(destinationQuery.toLowerCase()))
  );

  const handleSelectDestination = (dest: DestinationOption) => {
    setDestinationQuery(dest.name + (dest.country ? `, ${dest.country}` : ""));
    setSelectedSlug(dest.slug);
    setIsDropdownOpen(false);
  };

  const handleTabChange = (tab: "Destinations" | "Packages" | "Experiences") => {
    setActiveTab(tab);
  };

  const handleSearch = () => {
    if (activeTab === "Packages") {
      if (selectedSlug) {
        router.push(`/packages?destination=${selectedSlug}`);
      } else {
        router.push(`/packages?q=${encodeURIComponent(destinationQuery)}`);
      }
    } else if (activeTab === "Destinations") {
      if (selectedSlug) {
        router.push(`/destinations/${selectedSlug}`);
      } else {
        router.push(`/destinations?q=${encodeURIComponent(destinationQuery)}`);
      }
    } else {
      router.push(`/packages?experience=${encodeURIComponent(destinationQuery)}`);
    }
  };

  return (
    <section className="search-section-wrap" id="search">
      <div className="container">
        <div className="search-widget-container rv">
          {/* Tier 1: The Tab Header Bar */}
          <div className="search-tabs-tier">
            <div
              className={`search-tab-item ${activeTab === "Destinations" ? "active" : ""}`}
              onClick={() => handleTabChange("Destinations")}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Destinations</span>
            </div>

            <div
              className={`search-tab-item ${activeTab === "Packages" ? "active" : ""}`}
              onClick={() => handleTabChange("Packages")}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              <span>Packages</span>
            </div>

            <div
              className={`search-tab-item ${activeTab === "Experiences" ? "active" : ""}`}
              onClick={() => handleTabChange("Experiences")}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>Experiences</span>
            </div>
          </div>

          {/* Tier 2: The Main Inputs Card */}
          <div className="search-inputs-card">
            {/* Field 1: Where to? */}
            <div className="search-field-unit" ref={dropdownRef} style={{ position: "relative" }}>
              <div className="field-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="field-text-group" style={{ width: "100%" }}>
                <span className="field-heading">Where to?</span>
                <input
                  type="text"
                  id="destSearchInput"
                  className="field-input-text"
                  placeholder="Select destination"
                  value={destinationQuery}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => {
                    setDestinationQuery(e.target.value);
                    setSelectedSlug("");
                    setIsDropdownOpen(true);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  autoComplete="off"
                />

                {/* Autocomplete Dropdown */}
                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: 0,
                      width: "320px",
                      background: "#FFFFFF",
                      borderRadius: 16,
                      border: "1.5px solid #EAE3D8",
                      boxShadow: "0 12px 36px rgba(60, 40, 20, 0.16)",
                      zIndex: 100,
                      maxHeight: "280px",
                      overflowY: "auto",
                      padding: "8px 0",
                    }}
                  >
                    <div style={{ padding: "8px 16px 4px", fontSize: 11, fontWeight: 700, color: "#8A8077", textTransform: "uppercase", letterSpacing: 1 }}>
                      Popular Destinations
                    </div>
                    {filteredDestinations.length > 0 ? (
                      filteredDestinations.map((dest) => (
                        <div
                          key={dest.slug}
                          onClick={() => handleSelectDestination(dest)}
                          style={{
                            padding: "10px 16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF6F0")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span className="material-symbols-rounded" style={{ fontSize: 18, color: "#8E5F32" }}>
                              location_on
                            </span>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1612" }}>
                                {dest.name}
                              </div>
                              {dest.country && (
                                <div style={{ fontSize: 11.5, color: "#8A8077" }}>
                                  {dest.country}
                                </div>
                              )}
                            </div>
                          </div>
                          {dest.packageCount ? (
                            <span style={{ fontSize: 10.5, fontWeight: 700, background: "#F4ECE1", color: "#58371E", padding: "2px 8px", borderRadius: 999 }}>
                              {dest.packageCount} pkgs
                            </span>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: "12px 16px", fontSize: 13, color: "#8A8077" }}>
                        No destinations found for &quot;{destinationQuery}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="search-divider-line" />

            {/* Field 2: When? */}
            <div className="search-field-unit">
              <div className="field-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="field-text-group">
                <span className="field-heading">When?</span>
                <input
                  type="text"
                  className="field-input-text"
                  placeholder="Add dates"
                  value={datesQuery}
                  onChange={(e) => setDatesQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="search-divider-line" />

            {/* Field 3: Travelers */}
            <div className="search-field-unit">
              <div className="field-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <div className="field-text-group">
                <span className="field-heading">Travelers</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    className="field-input-text"
                    placeholder="Add guests"
                    value={guestsQuery}
                    onChange={(e) => setGuestsQuery(e.target.value)}
                  />
                  <span className="field-chevron">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Circular Brown Search Button */}
            <button
              className="btn-search-round"
              aria-label="Search"
              onClick={handleSearch}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="btn-search-mobile-label">Search Trips</span>
            </button>
          </div>
        </div>

        {/* Trust & Service Badges (Horizontal Row of 5) */}
        <div className="trust-badges-row rv delay-1">
          {/* 1. Handpicked Experiences */}
          <div className="trust-badge-col">
            <div className="trust-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="trust-badge-text">
              Handpicked<br />Experiences
            </div>
          </div>

          {/* 2. Local Expertise */}
          <div className="trust-badge-col">
            <div className="trust-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <div className="trust-badge-text">
              Local<br />Expertise
            </div>
          </div>

          {/* 3. Safe & Secure Travel */}
          <div className="trust-badge-col">
            <div className="trust-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="trust-badge-text">
              Safe & Secure<br />Travel
            </div>
          </div>

          {/* 4. 24/7 Support */}
          <div className="trust-badge-col">
            <div className="trust-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <div className="trust-badge-text">
              24/7<br />Support
            </div>
          </div>

          {/* 5. Best Price Guarantee */}
          <div className="trust-badge-col">
            <div className="trust-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div className="trust-badge-text">
              Best Price<br />Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
