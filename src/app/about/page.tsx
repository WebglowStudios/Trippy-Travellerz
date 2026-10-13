import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";

export const metadata: Metadata = {
  title: "About Trippy Travellers — Artisanal Luxury Travel & Craftsmanship",
  description:
    "Learn about Trippy Travellers' philosophy, our master travel designers, and our commitment to slow, bespoke, and immersive journeys across the globe.",
  openGraph: {
    title: "About Trippy Travellers — Artisanal Luxury Travel & Craftsmanship",
    description:
      "Learn about Trippy Travellers' philosophy, our master travel designers, and our commitment to slow, bespoke, and immersive journeys across the globe.",
    type: "website",
  },
};

export default function AboutPage() {
  const pillars = [
    {
      icon: "diamond",
      title: "Handpicked Luxury Stays",
      description: "We don't book generic hotels. Every property is personally vetted — from restored heritage royal havelis in Rajasthan to overwater sunset villas in the Maldives and secluded cliffside pools in Bali.",
    },
    {
      icon: "directions_car",
      title: "Private Chauffeur Freedom",
      description: "No crowded tour buses or fixed cattle-drive schedules. You travel in private air-conditioned sedans and SUVs with vetted, courteous local drivers who know every scenic overlook.",
    },
    {
      icon: "temple_hindu",
      title: "Living Cultural Immersion",
      description: "Private sunrise access before monument crowds arrive, exclusive culinary workshops with home chefs, and tea ceremonies led by local elders that mass tour agencies cannot offer.",
    },
    {
      icon: "support_agent",
      title: "24/7 Dedicated Concierge",
      description: "From the moment you receive your flight tickets until your flight lands back home, your dedicated travel designer is a single WhatsApp tap away for dinner reservations, itinerary tweaks, and real-time support.",
    },
  ];

  const milestones = [
    { num: "12,000+", label: "Happy Explorers Guided", sub: "Couples, families, and solo seekers" },
    { num: "50+", label: "Curated Destinations", sub: "Across 4 continents & exotic archipelagos" },
    { num: "4.9 ★", label: "Average Guest Rating", sub: "Verified reviews across Google & Trustpilot" },
    { num: "100%", label: "Tailor-Made Craftsmanship", sub: "Zero cookie-cutter group templates" },
  ];

  return (
    <>
      <Header />

      <main style={{ backgroundColor: "var(--bg-cream)", minHeight: "100vh" }}>
        {/* 1. About Hero Section */}
        <section className="about-hero-section">
          <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <nav className="pkg-breadcrumb" aria-label="Breadcrumb" style={{ justifyContent: "center", marginBottom: 20 }}>
              <Link href="/">Home</Link>
              <span className="pkg-breadcrumb-sep">/</span>
              <span className="pkg-breadcrumb-active">Our Story & Philosophy</span>
            </nav>

            <span className="cursive" style={{ fontSize: 22, color: "var(--brand-ochre)", display: "block", marginBottom: 6 }}>
              Crafted for Real Moments • Dream · Explore · Discover
            </span>
            <h1 className="serif about-hero-title">
              We Believe Travel Should Feel Like Poetry, Not a Checklist.
            </h1>
            <p className="about-hero-subtitle">
              Trippy Travellers was founded on a simple truth: the most profound travel memories are never born from crowded bus tours or hurried tourist traps. They happen in the quiet, bespoke spaces between destinations.
            </p>
          </div>
        </section>

        {/* 2. Brand Story & Visual Collage */}
        <section className="container" style={{ padding: "60px 20px" }}>
          <div className="about-story-grid">
            <div className="about-story-content">
              <span className="section-eyebrow">OUR GENESIS</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--text-dark)", margin: "4px 0 16px" }}>
                Born Out of a Passion for the Unhurried and Extraordinary
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.7, marginBottom: 16 }}>
                In 2020, as travelers grew weary of generic package holidays where every group was herded to the same souvenir stalls, our founders set out to resurrect the art of the Grand Tour.
              </p>
              <p style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                We partnered directly with boutique hoteliers, local historians, wildlife naturalists, and private chauffeur networks. Today, Trippy Travellers crafts journeys for couples celebrating milestones, multi-generational families seeking comfort, and travelers who value their peace of mind above all else.
              </p>

              <div className="about-quote-box">
                <p className="serif" style={{ fontSize: 17, fontStyle: "italic", color: "var(--brand-brown)", margin: "0 0 8px", lineHeight: 1.5 }}>
                  &ldquo;A journey is best measured in friends rather than miles, and in unforgettable memories rather than checked boxes.&rdquo;
                </p>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-ochre)", textTransform: "uppercase", letterSpacing: 0.5 }}>
                  — The Trippy Travellers Design Guild
                </span>
              </div>
            </div>

            <div className="about-story-visuals">
              <div className="about-photo-card about-photo-card-1">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                  alt="Tropical Tranquility"
                />
              </div>
              <div className="about-photo-card about-photo-card-2">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                  alt="Desert Elegance"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Four Pillars of Craftsmanship */}
        <section style={{ background: "#FAF4EC", borderTop: "1px solid var(--border-warm)", borderBottom: "1px solid var(--border-warm)", padding: "70px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span className="section-eyebrow">THE TRIPPY DIFFERENCE</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--text-dark)", margin: "4px 0 8px" }}>
                Four Pillars of Our Craft
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-body)", maxWidth: 580, margin: "0 auto" }}>
                Every single itinerary we produce is anchored by our unwavering commitment to quality and intimacy.
              </p>
            </div>

            <div className="about-pillars-grid">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="about-pillar-card">
                  <div className="about-pillar-icon-box">
                    <span className="material-symbols-rounded">{pillar.icon}</span>
                  </div>
                  <h3 className="serif" style={{ fontSize: 19, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 10px" }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--text-body)", lineHeight: 1.6, margin: 0 }}>
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Milestones in Numbers */}
        <section className="container" style={{ padding: "70px 20px" }}>
          <div className="about-milestones-card">
            <div className="about-milestones-grid">
              {milestones.map((m, idx) => (
                <div key={idx} className="about-milestone-item">
                  <span className="about-milestone-num">{m.num}</span>
                  <strong className="about-milestone-label">{m.label}</strong>
                  <span className="about-milestone-sub">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Custom Quote Banner */}
        <div className="container" style={{ paddingBottom: 60 }}>
          <CustomItineraryBanner />
        </div>
      </main>

      <Footer />
    </>
  );
}
