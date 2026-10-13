"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";

interface VisaFreeCountry {
  name: string;
  slug: string;
  region: "South East Asia" | "Indian Ocean & Islands" | "Subcontinent Neighbors" | "Central Asia & Africa";
  stayDuration: string;
  flightTime: string;
  bestSeason: string;
  currency: string;
  image: string;
  tagline: string;
  visaStatus: "100% Visa Free" | "Free Visa on Arrival" | "Easy e-VOA";
  packageCount: number;
}

const VISA_FREE_COUNTRIES: VisaFreeCountry[] = [
  {
    name: "Thailand",
    slug: "thailand",
    region: "South East Asia",
    stayDuration: "Up to 60 Days",
    flightTime: "~4 Hours Direct",
    bestSeason: "Nov – Apr",
    currency: "THB (Thai Baht)",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    tagline: "Tropical beaches, golden temples, and street food paradises.",
    visaStatus: "100% Visa Free",
    packageCount: 5,
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    region: "South East Asia",
    stayDuration: "Up to 30 Days",
    flightTime: "~4.5 Hours Direct",
    bestSeason: "Year-Round",
    currency: "MYR (Malaysian Ringgit)",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    tagline: "Petronas towers, rainforest canopies, and Langkawi island duty-free.",
    visaStatus: "100% Visa Free",
    packageCount: 4,
  },
  {
    name: "Maldives",
    slug: "maldives",
    region: "Indian Ocean & Islands",
    stayDuration: "Up to 30 Days",
    flightTime: "~2.5 Hours Direct",
    bestSeason: "Nov – Apr",
    currency: "USD & MVR",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    tagline: "Private overwater bungalows suspended above turquoise lagoons.",
    visaStatus: "Free Visa on Arrival",
    packageCount: 4,
  },
  {
    name: "Nepal",
    slug: "nepal",
    region: "Subcontinent Neighbors",
    stayDuration: "Freedom of Stay",
    flightTime: "~1.5 Hours Direct",
    bestSeason: "Oct – May",
    currency: "NPR & INR Accepted",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    tagline: "Himalayan panoramic peaks, medieval Kathmandu, and Pokhara lakes.",
    visaStatus: "100% Visa Free",
    packageCount: 3,
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    region: "Subcontinent Neighbors",
    stayDuration: "Up to 30 Days",
    flightTime: "~1.5 Hours Direct",
    bestSeason: "Dec – Apr",
    currency: "LKR (Sri Lankan Rupee)",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80",
    tagline: "Ancient rock fortresses, tea estates, and wild elephant safaris.",
    visaStatus: "Free Visa on Arrival",
    packageCount: 4,
  },
  {
    name: "Mauritius",
    slug: "mauritius",
    region: "Indian Ocean & Islands",
    stayDuration: "Up to 90 Days",
    flightTime: "~6 Hours Direct",
    bestSeason: "May – Dec",
    currency: "MUR (Mauritian Rupee)",
    image: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&q=80",
    tagline: "Sugar-sand beaches, underwater waterfalls, and luxury golf resorts.",
    visaStatus: "100% Visa Free",
    packageCount: 3,
  },
  {
    name: "Seychelles",
    slug: "seychelles",
    region: "Indian Ocean & Islands",
    stayDuration: "Up to 30 Days",
    flightTime: "~4.5 Hours Direct",
    bestSeason: "Apr – May & Oct – Nov",
    currency: "SCR (Seychellois Rupee)",
    image: "https://images.unsplash.com/photo-1534777366675-ab4018d1b804?w=800&q=80",
    tagline: "Granite boulder shorelines, giant tortoises, and Creole living.",
    visaStatus: "100% Visa Free",
    packageCount: 2,
  },
  {
    name: "Bali (Indonesia)",
    slug: "bali",
    region: "South East Asia",
    stayDuration: "Up to 30 Days",
    flightTime: "~6 Hours (1 stop/direct)",
    bestSeason: "Apr – Oct",
    currency: "IDR (Indonesian Rupiah)",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    tagline: "Cliffside temples, private pool villas, and lush Ubud wellness.",
    visaStatus: "Easy e-VOA",
    packageCount: 5,
  },
  {
    name: "Kazakhstan",
    slug: "kazakhstan",
    region: "Central Asia & Africa",
    stayDuration: "Up to 14 Days",
    flightTime: "~3.5 Hours Direct",
    bestSeason: "May – Sep",
    currency: "KZT (Kazakh Tenge)",
    image: "https://images.unsplash.com/photo-1558588942-930faae5a389?w=800&q=80",
    tagline: "Almaty alpine lakes, snowcapped Tian Shan mountains, and canyons.",
    visaStatus: "100% Visa Free",
    packageCount: 2,
  },
  {
    name: "Bhutan",
    slug: "bhutan",
    region: "Subcontinent Neighbors",
    stayDuration: "Entry Permit",
    flightTime: "~2 Hours Direct",
    bestSeason: "Sep – May",
    currency: "BTN & INR",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
    tagline: "Tiger's Nest monastery, sacred valleys, and carbon-negative serenity.",
    visaStatus: "100% Visa Free",
    packageCount: 3,
  },
];

export default function VisaFreePage() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = [
    { id: "all", label: "All Destinations" },
    { id: "South East Asia", label: "South East Asia" },
    { id: "Indian Ocean & Islands", label: "Indian Ocean & Islands" },
    { id: "Subcontinent Neighbors", label: "Neighboring Escapes" },
    { id: "Central Asia & Africa", label: "Central Asia & Africa" },
  ];

  const filtered = selectedRegion === "all"
    ? VISA_FREE_COUNTRIES
    : VISA_FREE_COUNTRIES.filter((c) => c.region === selectedRegion);

  return (
    <>
      <Header />

      <main style={{ backgroundColor: "var(--bg-cream)", minHeight: "100vh" }}>
        {/* 1. Hero Section */}
        <section className="visa-hero-section">
          <div className="container" style={{ textAlign: "center" }}>
            <nav className="pkg-breadcrumb" aria-label="Breadcrumb" style={{ justifyContent: "center", marginBottom: 18 }}>
              <Link href="/">Home</Link>
              <span className="pkg-breadcrumb-sep">/</span>
              <span className="pkg-breadcrumb-active">Visa-Free Travel Guide</span>
            </nav>

            <span className="cursive" style={{ fontSize: 22, color: "var(--brand-ochre)", display: "block", marginBottom: 6 }}>
              Pack Your Bags & Go • No Embassy Visits
            </span>
            <h1 className="serif visa-hero-title">
              Visa-Free International Escapes for Indian Passport Holders
            </h1>
            <p className="visa-hero-subtitle">
              Say goodbye to tedious visa application queues, biometric visits, and weeks of waiting. Discover countries where your Indian passport grants you instant access upon arrival.
            </p>

            {/* Region Filter Bar */}
            <div className="pkg-category-pills-bar" style={{ justifyContent: "center", marginTop: 24 }}>
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  type="button"
                  className={`pkg-cat-pill ${selectedRegion === reg.id ? "active" : ""}`}
                  onClick={() => setSelectedRegion(reg.id)}
                >
                  <span>{reg.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Countries Cards Grid */}
        <section className="container" style={{ padding: "40px 20px 70px" }}>
          <div className="visa-country-grid">
            {filtered.map((country) => (
              <div key={country.slug} className="visa-country-card">
                <div className="visa-country-photo">
                  <img src={country.image} alt={country.name} loading="lazy" />
                  <span
                    className={`visa-status-pill ${
                      country.visaStatus.includes("100%")
                        ? "status-free"
                        : country.visaStatus.includes("Arrival")
                        ? "status-voa"
                        : "status-evoa"
                    }`}
                  >
                    {country.visaStatus}
                  </span>
                  <span className="visa-duration-badge">
                    ⏱️ {country.stayDuration}
                  </span>
                </div>

                <div className="visa-country-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.6 }}>
                      {country.region}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      ✈️ {country.flightTime}
                    </span>
                  </div>

                  <h3 className="serif visa-country-name">
                    {country.name}
                  </h3>

                  <p className="visa-country-tagline">
                    {country.tagline}
                  </p>

                  <div className="visa-specs-mini">
                    <div>
                      <small>Best Season</small>
                      <strong>{country.bestSeason}</strong>
                    </div>
                    <div>
                      <small>Currency</small>
                      <strong>{country.currency}</strong>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: "auto" }}>
                    <Link
                      href={`/destinations/${country.slug}`}
                      className="btn-card-details"
                    >
                      Guide & Sights
                    </Link>
                    <Link
                      href={`/packages?search=${encodeURIComponent(country.name)}`}
                      className="btn-card-book"
                    >
                      View Packages
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Essential Checklist for Indian Passport Holders */}
        <section style={{ background: "#FAF4EC", borderTop: "1px solid var(--border-warm)", borderBottom: "1px solid var(--border-warm)", padding: "60px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span className="section-eyebrow">ESSENTIAL ADVICE</span>
              <h2 className="serif" style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 700, color: "var(--text-dark)", margin: "4px 0 8px" }}>
                What You Need to Enter Visa-Free Countries
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--text-body)", maxWidth: 580, margin: "0 auto" }}>
                Even when a country waives visa requirements, immigration checkpoints require these 4 standard travel documents.
              </p>
            </div>

            <div className="visa-checklist-grid">
              <div className="visa-check-card">
                <span className="material-symbols-rounded">badge</span>
                <h4>6 Months Passport Validity</h4>
                <p>Your Indian passport must have at least 6 months validity remaining from your scheduled return flight date.</p>
              </div>

              <div className="visa-check-card">
                <span className="material-symbols-rounded">flight_land</span>
                <h4>Confirmed Return Flight</h4>
                <p>Immigration officers will ask to inspect your return flight ticket or onward transit booking to ensure tourist intent.</p>
              </div>

              <div className="visa-check-card">
                <span className="material-symbols-rounded">hotel</span>
                <h4>Hotel Reservation Proof</h4>
                <p>Trippy Travellers provides official hotel confirmation vouchers which you can show directly on your phone.</p>
              </div>

              <div className="visa-check-card">
                <span className="material-symbols-rounded">credit_card</span>
                <h4>Sufficient Funds / Forex</h4>
                <p>Carry a multi-currency Forex card and a modest cash buffer (~$200–$300 USD or equivalent local currency).</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bottom Concierge Banner */}
        <div className="container" style={{ padding: "50px 20px 60px" }}>
          <CustomItineraryBanner />
        </div>
      </main>

      <Footer />
    </>
  );
}
