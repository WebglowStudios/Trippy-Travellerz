"use client";

import React, { useState, useRef, useEffect } from "react";

export const COUNTRIES = [
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲" },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼" },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "Phone Number / WhatsApp",
  required = false,
  className = "",
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dialCode, setDialCode] = useState("+91");
  const [localNumber, setLocalNumber] = useState("");

  useEffect(() => {
    if (value && value !== `${dialCode} ${localNumber}` && value !== `${dialCode}${localNumber}`) {
      let matchedCode = "+91";
      let localPart = value;

      if (value.startsWith("+")) {
        const sorted = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
        for (const country of sorted) {
          if (value.startsWith(country.dialCode + " ") || value.startsWith(country.dialCode)) {
            matchedCode = country.dialCode;
            localPart = value.substring(country.dialCode.length).trim();
            break;
          }
        }
      }

      setDialCode(matchedCode);
      setLocalNumber(localPart);
    }
  }, [value, dialCode, localNumber]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocal = e.target.value.replace(/[^\d\s-]/g, "");
    setLocalNumber(newLocal);
    onChange(`${dialCode} ${newLocal}`);
  };

  const selectCountry = (code: string) => {
    setDialCode(code);
    setIsOpen(false);
    setSearch("");
    onChange(`${code} ${localNumber}`);
  };

  const selectedCountry = COUNTRIES.find((c) => c.dialCode === dialCode) || COUNTRIES[0];
  const filteredCountries = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search)
  );

  return (
    <div
      ref={dropdownRef}
      className={`trippy-phone-input-wrap ${className}`}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "stretch",
        background: "#FAF7F2",
        border: "1.5px solid var(--border-warm)",
        borderRadius: "12px",
        overflow: "visible",
        transition: "border-color 0.2s",
      }}
    >
      {/* Country Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 12px",
          background: "transparent",
          border: "none",
          borderRight: "1px solid var(--border-warm)",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--brand-brown)",
          flexShrink: 0,
        }}
        title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
      >
        <span style={{ fontSize: "17px", lineHeight: 1 }}>{selectedCountry.flag}</span>
        <span style={{ fontSize: "13px" }}>{selectedCountry.dialCode}</span>
        <span className="material-symbols-rounded" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      {/* Actual Phone Number Input */}
      <input
        type="tel"
        value={localNumber}
        onChange={handleNumberChange}
        placeholder={placeholder}
        required={required}
        style={{
          flex: 1,
          padding: "11px 14px",
          border: "none",
          background: "transparent",
          fontSize: "14px",
          color: "var(--text-dark)",
          outline: "none",
          minWidth: 0,
        }}
      />

      {/* Country Dropdown Panel */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            width: 280,
            maxHeight: 280,
            background: "#FFFFFF",
            border: "1.5px solid var(--border-warm)",
            borderRadius: "14px",
            boxShadow: "0 14px 34px -8px rgba(60, 40, 20, 0.18)",
            zIndex: 1100,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Search box inside dropdown */}
          <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--border-light)" }}>
            <input
              type="text"
              placeholder="Search country or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1px solid var(--border-warm)",
                borderRadius: "8px",
                fontSize: "12.5px",
                outline: "none",
                background: "var(--bg-cream)",
              }}
            />
          </div>

          {/* List of countries */}
          <div style={{ overflowY: "auto", flex: 1, padding: "4px 0" }}>
            {filteredCountries.map((c) => (
              <button
                key={`${c.code}-${c.dialCode}`}
                type="button"
                onClick={() => selectCountry(c.dialCode)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 14px",
                  background: c.dialCode === dialCode ? "#FAF6F0" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "13px",
                  color: "var(--text-dark)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{c.flag}</span>
                  <span style={{ fontWeight: 500 }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-ochre)" }}>
                  {c.dialCode}
                </span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div style={{ padding: "16px", textAlign: "center", fontSize: "12.5px", color: "var(--text-muted)" }}>
                No country matched
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
