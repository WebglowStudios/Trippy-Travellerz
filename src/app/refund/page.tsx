import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy — Trippy Travellers",
  description:
    "Review our transparent refund schedules, date rescheduling flexibility, and payment reversal timelines for luxury holidays curated by Trippy Travellers.",
};

export default function RefundPage() {
  const refundTiers = [
    {
      notice: "30 or more days before departure",
      refundRate: "85% to 90% of Land Package",
      fee: "10% to 15% administrative & operational handling fee",
      status: "Highest Flexibility",
    },
    {
      notice: "21 to 29 days before departure",
      refundRate: "70% of Land Package",
      fee: "30% cancellation retention",
      status: "Standard Tier",
    },
    {
      notice: "15 to 20 days before departure",
      refundRate: "50% of Land Package",
      fee: "50% cancellation retention",
      status: "Mid Tier",
    },
    {
      notice: "8 to 14 days before departure",
      refundRate: "25% of Land Package",
      fee: "75% cancellation retention",
      status: "Late Notice Tier",
    },
    {
      notice: "0 to 7 days before departure or No-show",
      refundRate: "Non-refundable (0%)",
      fee: "100% full retention",
      status: "Strict Retention",
    },
  ];

  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", background: "var(--bg-cream)" }}>
        {/* Hero */}
        <section className="legal-hero-section text-center">
          <div className="container" style={{ maxWidth: 780 }}>
            <span className="legal-badge-pill">
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                currency_exchange
              </span>
              <span>Fair & Transparent Policy</span>
            </span>
            <h1 className="serif article-hero-title">Cancellation & Refund Policy</h1>
            <p style={{ fontSize: 14.5, color: "var(--text-body)", margin: 0 }}>
              Last updated: October 2026 • Clear timelines, transparent fees, and dedicated concierge assistance.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="container" style={{ maxWidth: 860, padding: "40px 20px 70px" }}>
          <div className="legal-content-card">
            <div className="legal-prose">
              <p>
                We understand that unexpected life events, medical emergencies, and schedule shifts can occasionally alter travel plans. At <strong>Trippy Travelerz</strong>, we strive to offer the maximum flexibility possible while honoring our contractual commitments to independent boutique resorts, private drivers, and luxury aviation providers.
              </p>

              <h2>1. Land Package Refund Schedule</h2>
              <p>
                Cancellations must be communicated in writing via email to <strong>cancellations@trippytravelerz.com</strong> or submitted through your Traveler Dashboard. The effective cancellation date is the timestamp when our operations desk receives written notice:
              </p>

              {/* Responsive Refund Table */}
              <div style={{ overflowX: "auto", margin: "24px 0" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    fontSize: 13.5,
                    border: "1px solid var(--border-warm)",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#F5ECE0", color: "var(--brand-brown)" }}>
                      <th style={{ padding: "12px 16px", fontWeight: 700 }}>Notice Prior to Departure</th>
                      <th style={{ padding: "12px 16px", fontWeight: 700 }}>Land Package Refund Rate</th>
                      <th style={{ padding: "12px 16px", fontWeight: 700 }}>Operational Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refundTiers.map((tier, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid var(--border-light)",
                          background: idx % 2 === 0 ? "#FFFFFF" : "#FAF7F2",
                        }}
                      >
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-dark)" }}>
                          {tier.notice}
                        </td>
                        <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--brand-brown)" }}>
                          {tier.refundRate}
                        </td>
                        <td style={{ padding: "12px 16px", color: "var(--text-body)" }}>
                          {tier.fee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>2. Important Supplier Exceptions</h2>
              <p>
                While the schedule above governs standard land arrangements, certain luxury inclusions carry strict non-refundable terms set by third-party providers:
              </p>
              <ul>
                <li><strong>Commercial Flights:</strong> Domestic and international flight cancellations are governed strictly by airline fare rules. Airline cancellation fees and non-refundable tickets will be deducted before issuing refunds.</li>
                <li><strong>Ultra-Luxury Peak Season Resorts:</strong> Stays during peak holiday windows (Christmas/New Year in the Maldives, Cherry Blossom peak in Japan, Diwali in Rajasthan) often mandate 100% non-refundable deposits 45 to 60 days in advance. These terms will be explicitly highlighted on your quotation voucher.</li>
                <li><strong>Charter Experiences:</strong> Private seaplanes, helicopter charters, and private yacht bookings carry independent supplier cancellation terms.</li>
              </ul>

              <h2>3. Trip Rescheduling vs. Outright Cancellation</h2>
              <p>
                If your dates need to shift, we strongly encourage rescheduling rather than cancelling. In many cases:
              </p>
              <ul>
                <li>We can roll your entire deposit forward into future travel credits valid for up to 12 months.</li>
                <li>Rescheduling requests made 21 or more days prior to departure incur minimal to zero hotel penalties (subject to seasonal rate differentials and airline ticket reissuance fees).</li>
              </ul>

              <h2>4. Refund Processing Timelines & Mechanism</h2>
              <p>
                Once an eligible refund is verified and approved by our finance desk:
              </p>
              <ul>
                <li>Refunds are credited directly back to the <strong>original source of payment</strong> (the exact credit card, debit card, UPI ID, or bank account used for the booking) via our payment gateway (Razorpay).</li>
                <li>Processing typically reflects in your bank statement within <strong>7 to 10 working days</strong> following approval.</li>
                <li>A formal credit note and refund receipt will be emailed to you for your records.</li>
              </ul>

              <h2>5. Medical Emergencies & Travel Insurance</h2>
              <p>
                In verified situations of hospitalization or sudden bereavement of an immediate family member, our concierge desk will submit formal compassionate waivers to partner hotels and airlines to maximize refund recoveries on your behalf.
              </p>
              <p>
                We vigorously remind all guests that travel insurance protects against financial loss for trip interruption, medical cancellations, and emergency repatriations.
              </p>

              <div
                style={{
                  marginTop: 36,
                  padding: "24px 28px",
                  background: "#FAF4EC",
                  border: "1.5px solid #DFCEB5",
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <h4 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 4px" }}>
                    Need to modify or cancel a trip?
                  </h4>
                  <p style={{ fontSize: 13, color: "var(--text-body)", margin: 0 }}>
                    Our dedicated guest relations team will walk you through your options to minimize penalties.
                  </p>
                </div>
                <a
                  href="https://wa.me/917666226649?text=Hi%20Trippy%20Travellerz%2C%20I%20need%20assistance%20with%20rescheduling%20or%20cancelling%20my%20booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-concierge"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18, color: "#25D366" }}>
                    chat
                  </span>
                  <span>Speak with Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
