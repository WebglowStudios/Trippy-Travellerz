import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";

export const metadata: Metadata = {
  title: "Careers & Craftsmanship — Trippy Travellers",
  description:
    "Join our collective of master travel designers, luxury concierges, and destination scouts handcrafting extraordinary private journeys across the globe.",
};

export default function CareersPage() {
  const roles = [
    {
      title: "Senior Travel Designer — Middle East & Europe",
      department: "Itinerary Craftsmanship",
      location: "Bengaluru / Pune (Hybrid / Remote)",
      type: "Full-Time",
      description:
        "Handcraft bespoke luxury journeys across Dubai, Japan, Switzerland, and Italy. You will consult with high-net-worth travelers, curate boutique hotel suites, and coordinate private chauffeur logistics.",
      requirements: [
        "3+ years experience designing high-touch luxury international itineraries.",
        "Direct relationships with premium hotel partners and boutique DMCs.",
        "Deep destination knowledge of luxury culinary, wellness, and cultural highlights.",
      ],
    },
    {
      title: "24/7 VIP Concierge Specialist",
      department: "Guest Experience",
      location: "Remote (India)",
      type: "Full-Time (Rotational Shifts)",
      description:
        "Be the guardian angel for active travelers on the road. Manage dedicated WhatsApp VIP groups, coordinate real-time restaurant reservations, handle flight adjustments, and ensure seamless airport welcomes.",
      requirements: [
        "Exceptional empathy, poise, and rapid problem-solving skills under pressure.",
        "Flawless written communication in English (additional languages a plus).",
        "Demonstrated hospitality or high-end concierge experience.",
      ],
    },
    {
      title: "Destination Scout & Experience Curator",
      department: "Product & Sourcing",
      location: "On-Location / Remote",
      type: "Full-Time",
      description:
        "Venture into new and emerging luxury destinations. Personally vet boutique ryokans, private desert camps, catamaran charters, and artisanal cultural workshops before introducing them to our catalog.",
      requirements: [
        "Demonstrated track record of uncovering authentic, slow-travel hidden gems.",
        "Aesthetic eye for high-end photography, styling, and editorial storytelling.",
        "Willingness to travel internationally 30–40% of the year.",
      ],
    },
    {
      title: "Operations & Chauffeur Fleet Coordinator",
      department: "On-Ground Logistics",
      location: "Pune / Bengaluru",
      type: "Full-Time",
      description:
        "Ensure precision execution of every flight pickup, private sedan transit, and train transfer. Manage vendor SLA performance, live flight radar tracking, and vehicle safety inspections.",
      requirements: [
        "2+ years experience in travel logistics, airline operations, or fleet management.",
        "High organizational rigor with extreme attention to detail.",
        "Proven ability to negotiate supplier terms and handle schedule contingencies.",
      ],
    },
  ];

  const perks = [
    {
      icon: "flight_takeoff",
      title: "Annual Travel Discovery Grant",
      description: "Every team member receives an annual travel stipend to explore new destinations and experience our boutique stays firsthand.",
    },
    {
      icon: "home_work",
      title: "Flexible Remote Freedom",
      description: "Work from our boutique studios in Bengaluru/Pune or from your favorite home haven with flexible hours.",
    },
    {
      icon: "health_and_safety",
      title: "Comprehensive Health & Wellness",
      description: "Premium medical insurance covering you and your dependents, plus mental wellness and counseling subscriptions.",
    },
    {
      icon: "trending_up",
      title: "Generous Profit Sharing",
      description: "Transparent bonus tiers tied directly to company growth, luxury traveler satisfaction, and operational excellence.",
    },
  ];

  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", background: "var(--bg-cream)" }}>
        {/* 1. Hero */}
        <section className="article-hero-section text-center">
          <div className="container" style={{ maxWidth: 840 }}>
            <span className="cursive" style={{ fontSize: 24, color: "var(--brand-ochre)" }}>
              Work With Us
            </span>
            <h1 className="serif article-hero-title">
              Craft the Future of Slow, Luxury Travel
            </h1>
            <p style={{ fontSize: 15.5, color: "var(--text-body)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: 640 }}>
              We are a collective of travel artisans, culinary enthusiasts, and obsessive logistics masters who believe journey design is an art form.
            </p>
            <a
              href="#open-roles"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                background: "var(--brand-brown)",
                color: "#FFFFFF",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(88, 55, 30, 0.2)",
              }}
            >
              <span>Explore Open Positions</span>
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_downward</span>
            </a>
          </div>
        </section>

        {/* 2. Perks Grid */}
        <section className="container" style={{ padding: "60px 20px 40px" }}>
          <div className="text-center" style={{ marginBottom: 44 }}>
            <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)" }}>
              Life at Trippy Travellers
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--text-dark)", margin: "4px 0 0" }}>
              The Pillars of Our Culture
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {perks.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid var(--border-warm)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  boxShadow: "0 4px 16px rgba(60, 40, 20, 0.04)",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: "#FAF4EC",
                    border: "1px solid var(--border-warm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 24, color: "var(--brand-ochre)" }}>
                    {p.icon}
                  </span>
                </div>
                <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 8px" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--text-body)", lineHeight: 1.6, margin: 0 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Open Roles */}
        <section id="open-roles" className="container" style={{ padding: "40px 20px 70px" }}>
          <div className="text-center" style={{ marginBottom: 40 }}>
            <span className="cursive" style={{ fontSize: 20, color: "var(--brand-ochre)" }}>
              Join the Crew
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--text-dark)", margin: "4px 0 0" }}>
              Available Openings
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900, margin: "0 auto" }}>
            {roles.map((role, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid var(--border-warm)",
                  borderRadius: 22,
                  padding: "32px",
                  boxShadow: "0 6px 20px rgba(60, 40, 20, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        color: "var(--brand-ochre)",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {role.department} • {role.type}
                    </span>
                    <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                      {role.title}
                    </h3>
                    <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 16 }}>location_on</span>
                      {role.location}
                    </span>
                  </div>

                  <a
                    href={`mailto:careers@trippytravelerz.com?subject=Application for ${encodeURIComponent(role.title)}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 22px",
                      background: "var(--brand-brown)",
                      color: "#FFFFFF",
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                      alignSelf: "flex-start",
                    }}
                  >
                    <span>Apply via Email</span>
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_outward</span>
                  </a>
                </div>

                <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, margin: 0 }}>
                  {role.description}
                </p>

                <div style={{ background: "#FAF7F2", borderRadius: 14, padding: "14px 18px" }}>
                  <strong style={{ fontSize: 12.5, color: "var(--text-dark)", display: "block", marginBottom: 6 }}>
                    Key Qualifications:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
                    {role.requirements.map((req, rIdx) => (
                      <li key={rIdx} style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.5 }}>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Spontaneous Application */}
          <div
            style={{
              maxWidth: 900,
              margin: "44px auto 0",
              background: "linear-gradient(135deg, #FAF4EC 0%, #F5ECE0 100%)",
              border: "1.5px solid #DFCEB5",
              borderRadius: 22,
              padding: "32px",
              textAlign: "center",
            }}
          >
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 8px" }}>
              Don&apos;t See Your Exact Match?
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 520, margin: "0 auto 20px", lineHeight: 1.6 }}>
              We are always on the lookout for visionary storytellers, UI designers, and regional guides. Send your portfolio and pitch to us.
            </p>
            <a
              href="mailto:careers@trippytravelerz.com?subject=Spontaneous Application — Trippy Travelerz"
              className="btn-whatsapp-concierge"
              style={{ display: "inline-flex" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--brand-brown)" }}>mail</span>
              <span>careers@trippytravelerz.com</span>
            </a>
          </div>

          <div style={{ marginTop: 60 }}>
            <CustomItineraryBanner />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
