"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

export interface CountryItem {
  name: string;
  code: string;
  flag: string;
}

export const COUNTRIES_LIST: CountryItem[] = [
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Thailand", code: "TH", flag: "🇹🇭" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩" },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰" },
  { name: "Maldives", code: "MV", flag: "🇲🇻" },
  { name: "Mauritius", code: "MU", flag: "🇲🇺" },
  { name: "Nepal", code: "NP", flag: "🇳🇵" },
  { name: "Bhutan", code: "BT", flag: "🇧🇹" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳" },
  { name: "Philippines", code: "PH", flag: "🇵🇭" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { name: "Qatar", code: "QA", flag: "🇶🇦" },
  { name: "Oman", code: "OM", flag: "🇴🇲" },
  { name: "Kuwait", code: "KW", flag: "🇰🇼" },
  { name: "Bahrain", code: "BH", flag: "🇧🇭" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Hong Kong", code: "HK", flag: "🇭🇰" },
  { name: "Taiwan", code: "TW", flag: "🇹🇼" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
  { name: "Turkey", code: "TR", flag: "🇹🇷" },
  { name: "Egypt", code: "EG", flag: "🇪🇬" },
  { name: "Greece", code: "GR", flag: "🇬🇷" },
  { name: "Portugal", code: "PT", flag: "🇵🇹" },
  { name: "Austria", code: "AT", flag: "🇦🇹" },
  { name: "Belgium", code: "BE", flag: "🇧🇪" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "Norway", code: "NO", flag: "🇳🇴" },
  { name: "Denmark", code: "DK", flag: "🇩🇰" },
  { name: "Finland", code: "FI", flag: "🇫🇮" },
  { name: "Poland", code: "PL", flag: "🇵🇱" },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿" },
  { name: "Hungary", code: "HU", flag: "🇭🇺" },
  { name: "Ireland", code: "IE", flag: "🇮🇪" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Argentina", code: "AR", flag: "🇦🇷" },
  { name: "Kenya", code: "KE", flag: "🇰🇪" },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿" },
  { name: "Seychelles", code: "SC", flag: "🇸🇨" },
  { name: "Fiji", code: "FJ", flag: "🇫🇯" },
  { name: "Cambodia", code: "KH", flag: "🇰🇭" },
  { name: "Laos", code: "LA", flag: "🇱🇦" },
  { name: "Myanmar", code: "MM", flag: "🇲🇲" },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
  { name: "Pakistan", code: "PK", flag: "🇵🇰" },
  { name: "Jordan", code: "JO", flag: "🇯🇴" },
  { name: "Israel", code: "IL", flag: "🇮🇱" },
  { name: "Morocco", code: "MA", flag: "🇲🇦" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬" },
  { name: "Ghana", code: "GH", flag: "🇬🇭" },
  { name: "Chile", code: "CL", flag: "🇨🇱" },
  { name: "Colombia", code: "CO", flag: "🇨🇴" },
  { name: "Peru", code: "PE", flag: "🇵🇪" },
  { name: "Romania", code: "RO", flag: "RO" },
  { name: "Croatia", code: "HR", flag: "🇭🇷" },
  { name: "Iceland", code: "IS", flag: "🇮🇸" },
  { name: "Cyprus", code: "CY", flag: "🇨🇾" },
  { name: "Malta", code: "MT", flag: "🇲🇹" },
  { name: "Luxembourg", code: "LU", flag: "🇱🇺" },
  { name: "Georgia", code: "GE", flag: "🇬🇪" },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿" },
  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿" },
  { name: "Uzbekistan", code: "UZ", flag: "UZ" },
];

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  compact?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function CountrySelect({
  value,
  onChange,
  placeholder = "Select Country",
  required = false,
  compact = false,
  style,
  className = "",
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Selected item matching value (case-insensitive)
  const selectedCountry = useMemo(() => {
    if (!value) return null;
    const lower = value.trim().toLowerCase();
    return COUNTRIES_LIST.find((c) => c.name.toLowerCase() === lower || c.code.toLowerCase() === lower);
  }, [value]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRIES_LIST;
    const q = search.trim().toLowerCase();
    return COUNTRIES_LIST.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [search]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        position: "relative",
        width: "100%",
        ...style,
      }}
    >
      {/* Hidden input for form required validation */}
      {required && (
        <input
          type="text"
          value={value}
          required={required}
          onChange={() => {}}
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}
          tabIndex={-1}
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: compact ? "8px 12px" : "13px 16px",
          background: compact ? "#fff" : "var(--iv, #fbfcfd)",
          border: compact ? "1px solid var(--line2, #e2e8f0)" : "1.5px solid var(--line2, #e2e8f0)",
          borderRadius: compact ? 8 : 12,
          fontSize: compact ? 12 : 14,
          color: value ? "var(--ink, #1a202c)" : "var(--ink4, #a0aec0)",
          outline: "none",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          cursor: "pointer",
          textAlign: "left",
          transition: "border-color .2s, box-shadow .2s",
          borderColor: isOpen ? "var(--gn2, #004d5e)" : undefined,
          boxShadow: isOpen ? "0 0 0 3px rgba(0,77,94,0.08)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
          {selectedCountry ? (
            <>
              <span style={{ fontSize: compact ? 14 : 16, lineHeight: 1 }}>{selectedCountry.flag}</span>
              <span style={{ fontWeight: 600, color: "var(--ink, #1a202c)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {selectedCountry.name}
              </span>
            </>
          ) : value ? (
            <span style={{ fontWeight: 600, color: "var(--ink, #1a202c)" }}>{value}</span>
          ) : (
            <span style={{ color: "var(--ink4, #a0aec0)" }}>{placeholder}</span>
          )}
        </div>

        <svg
          width={compact ? "12" : "14"}
          height={compact ? "12" : "14"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s ease",
            color: "var(--ink4, #a0aec0)",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#ffffff",
            border: "1px solid var(--line2, #e2e8f0)",
            borderRadius: 12,
            boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.04)",
            zIndex: 9999,
            overflow: "hidden",
            minWidth: 220,
            animation: "fadeIn .15s ease",
          }}
        >
          {/* Search Input Box */}
          <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--line, #edf2f7)", background: "#fbfcfd" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                border: "1px solid var(--line2, #e2e8f0)",
                borderRadius: 8,
                padding: "6px 10px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink4, #a0aec0)" }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: 12,
                  color: "var(--ink, #1a202c)",
                  background: "transparent",
                }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--ink4, #a0aec0)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* List of Countries */}
          <div style={{ maxHeight: 240, overflowY: "auto", padding: "4px" }}>
            {filteredCountries.map((country) => {
              const isSelected = value.toLowerCase() === country.name.toLowerCase();
              return (
                <button
                  key={country.code + country.name}
                  type="button"
                  onClick={() => handleSelect(country.name)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "none",
                    background: isSelected ? "rgba(0,77,94,0.08)" : "transparent",
                    color: isSelected ? "var(--gn2, #004d5e)" : "var(--ink, #1a202c)",
                    fontSize: 13,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background .15s",
                    fontWeight: isSelected ? 700 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "#f4f6f8";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ fontSize: 16 }}>{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gn2, #004d5e)" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}

            {filteredCountries.length === 0 && (
              <div style={{ padding: "16px 12px", textAlign: "center", fontSize: 12, color: "var(--ink4, #a0aec0)" }}>
                No country found matching &quot;{search}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
