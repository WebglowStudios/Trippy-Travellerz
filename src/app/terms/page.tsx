import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions & Booking Policy — Trippy Travellers",
  description:
    "Read the terms of booking, payment schedules, traveler responsibilities, and legal agreements for private luxury holidays curated by Trippy Travellers.",
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", background: "var(--bg-cream)" }}>
        {/* Hero */}
        <section className="legal-hero-section text-center">
          <div className="container" style={{ maxWidth: 780 }}>
            <span className="legal-badge-pill">
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                gavel
              </span>
              <span>Legal & Booking Agreement</span>
            </span>
            <h1 className="serif article-hero-title">Terms & Conditions</h1>
            <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
              Last updated: October 2026 • Please read carefully prior to confirming your tour reservation.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="container" style={{ maxWidth: 860, padding: "40px 20px 70px" }}>
          <div className="legal-content-card">
            <div className="legal-prose">
              <p>
                Welcome to <strong>Trippy Travellers</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). These Terms and Conditions constitute a legally binding agreement made between you (&quot;Traveler&quot;, &quot;Client&quot;, &quot;you&quot;) and Trippy Travellers concerning your access to and use of our booking portal, mobile services, and customized luxury travel itineraries.
              </p>

              <h2>1. Booking Confirmation & Payment Terms</h2>
              <p>
                A booking is considered confirmed only upon receipt of the designated advance deposit (typically 25% to 30% of the total tour cost, or higher if non-refundable flight/boutique villa deposits are involved) along with written confirmation from our concierge desk.
              </p>
              <ul>
                <li><strong>Advance Deposit:</strong> Due at time of itinerary confirmation to secure room allocations, private chauffeurs, and internal transit tickets.</li>
                <li><strong>Balance Payment:</strong> The remaining balance must be cleared in full at least 21 calendar days prior to the departure date. For peak holiday periods (Christmas, New Year, Golden Week, Diwali), final balances may be required 35 days in advance.</li>
                <li><strong>Late Payments:</strong> Failure to pay the balance by the due date may result in cancellation of reservations, forfeiture of deposit, and cancellation fees according to supplier policies.</li>
              </ul>

              <h2>2. Pricing, Taxes & Exchange Rate Fluctuations</h2>
              <p>
                All prices are quoted in Indian Rupees (INR) or specified foreign currencies. Package quotes are based on prevailing exchange rates, fuel tariffs, and hotel contracted rates at the date of quote creation.
              </p>
              <ul>
                <li><strong>Goods & Services Tax (GST):</strong> Applicable GST of 5% is charged on all travel packages as per Government of India guidelines.</li>
                <li><strong>Tax Collected at Source (TCS):</strong> Under the Reserve Bank of India Liberalised Remittance Scheme (LRS), TCS is applicable on international outbound tours (5% up to ₹7,00,000 INR per traveler per financial year, and 20% thereafter). This is credited to your Form 26AS.</li>
                <li><strong>Price Guarantees:</strong> Once your deposit is paid and your booking voucher is issued, your land package price is 100% frozen against subsequent supplier tariff increases.</li>
              </ul>

              <h2>3. Passports, Visas & Health Documentation</h2>
              <p>
                It is the sole responsibility of the Traveler to ensure that all travel documents are valid, current, and meet the destination country&apos;s statutory immigration laws:
              </p>
              <ul>
                <li>Your passport must have a minimum of <strong>six (6) months validity</strong> from the date of planned return to your home country.</li>
                <li>You must have at least two blank visa pages in your passport.</li>
                <li>While Trippy Travellers provides visa concierge assistance and documentation support, the granting or rejection of any visa or transit permit rests solely with the sovereign embassy or immigration authority of the destination country. The Company shall not be held liable for visa rejections or immigration processing delays.</li>
              </ul>

              <h2>4. Itinerary Adjustments & Force Majeure</h2>
              <p>
                Trippy Travellers reserves the right to make reasonable adjustments to the published schedule, hotel properties, or activity sequence due to circumstances beyond our direct control, including but not limited to severe weather conditions, volcanic eruptions, flight cancellations by airlines, road closures, political unrest, or natural disasters (&quot;Force Majeure&quot;).
              </p>
              <p>
                In such events, our on-ground concierge team will endeavor to provide comparable alternative luxury accommodations and experiences without compromising guest safety and comfort. Any direct unrecoverable supplier costs incurred shall be communicated transparently.
              </p>

              <h2>5. Traveler Conduct & Private Vehicle Rules</h2>
              <p>
                We take immense pride in fostering respectful relationships with our local host communities, private chauffeurs, naturalists, and hotel staff:
              </p>
              <ul>
                <li>Travelers are expected to comply with local laws, cultural dress codes (e.g., temples and mosques), and wildlife conservation guidelines.</li>
                <li>Smoking, consumption of unauthorized substances, or disrespectful behavior towards private chauffeurs or local guides will not be tolerated and may lead to termination of tour services without refund.</li>
              </ul>

              <h2>6. Limitation of Liability & Travel Insurance</h2>
              <p>
                Comprehensive international travel and medical insurance is <strong>mandatory</strong> for all travelers participating in international trips. Insurance should cover trip cancellation, medical emergencies, emergency medical evacuation, and lost baggage.
              </p>
              <p>
                Trippy Travellers acts as an artisanal travel curator and coordinator between the Traveler and third-party independent providers (airlines, boutique resorts, private yacht charters, transfer companies). The Company shall not be held liable for bodily injury, property damage, or losses incurred due to negligent acts or defaults of independent service providers.
              </p>

              <h2>7. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms and Conditions and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru or Pune, India.
              </p>

              <div
                style={{
                  marginTop: 36,
                  padding: "20px 24px",
                  background: "#FAF4EC",
                  border: "1px solid var(--border-warm)",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <strong style={{ display: "block", color: "var(--text-dark)", fontSize: 14 }}>
                    Questions about our booking policies?
                  </strong>
                  <span style={{ fontSize: 13, color: "var(--text-body)" }}>
                    Our legal and operations concierge is available at hello@trippytravellers.com
                  </span>
                </div>
                <Link
                  href="/contact"
                  style={{
                    padding: "9px 20px",
                    background: "var(--brand-brown)",
                    color: "#FFFFFF",
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
