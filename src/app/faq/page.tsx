"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";

interface FAQItem {
  id: string;
  category: "Booking & Payments" | "Customization" | "Visas & Passports" | "On-Trip Support" | "Cancellations";
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "deposit-policy",
    category: "Booking & Payments",
    question: "How does the booking deposit and payment schedule work?",
    answer: "To secure your bespoke luxury holiday, we require an initial deposit of 25% to 30% depending on the destination and boutique resort policies. The remaining balance is payable 21 days prior to your departure date. We accept Razorpay (UPI, RuPay, Visa, Mastercard, Netbanking) as well as direct RTGS/NEFT bank transfers.",
  },
  {
    id: "payment-methods",
    category: "Booking & Payments",
    question: "Are credit card EMI options available for international tours?",
    answer: "Yes. Through our secure Razorpay gateway, travelers can opt for 3, 6, 9, or 12-month EMI tenures with major Indian banks including HDFC, ICICI, SBI, Axis, and American Express cards.",
  },
  {
    id: "tax-tcs-gst",
    category: "Booking & Payments",
    question: "How are GST and TCS (Tax Collected at Source) handled for outbound international packages?",
    answer: "All prices are quoted transparently. For outbound international travel from India, 5% GST is applicable on package components. Under RBI LRS guidelines, TCS of 5% (up to ₹7,00,000 INR per financial year) is collected and credited directly to your PAN number via Form 26AS, which can be fully claimed back or offset against your annual income tax return.",
  },
  {
    id: "customization-scope",
    category: "Customization",
    question: "Can I customize the listed packages or build an itinerary from scratch?",
    answer: "Absolutely. In fact, over 80% of our travelers choose a tailored journey. You can adjust the duration, switch from beachfront pool villas to overwater bungalows, add hot air balloon rides, request vegetarian or Jain culinary arrangements, or combine two countries into a single grand voyage.",
  },
  {
    id: "private-vs-group",
    category: "Customization",
    question: "Will I be traveling in a shared group bus or a private vehicle?",
    answer: "Trippy Travelerz specializes in 100% private travel experiences. You and your travel companions have an exclusive air-conditioned luxury sedan or SUV with a vetted, courteous local chauffeur. You set your own pace without waiting for group tour buses or fixed cattle-drive schedules.",
  },
  {
    id: "visa-assistance",
    category: "Visas & Passports",
    question: "Do you assist with visa filings and embassy appointments?",
    answer: "Yes! Our in-house visa concierge team assists with document verification, itinerary flight dummy reservations, hotel vouchers, cover letters, and scheduling appointments for Schengen, Japan, UK, and US visas. For destinations like Bali, Dubai, Thailand, Sri Lanka, and the Maldives, we handle digital eVisa and arrival registrations.",
  },
  {
    id: "passport-validity",
    category: "Visas & Passports",
    question: "What passport validity is required for international holidays?",
    answer: "International immigration regulations strictly mandate that your passport must have at least 6 months of validity remaining from the date of entry into the destination country, and at least 2 blank visa pages.",
  },
  {
    id: "concierge-support",
    category: "On-Trip Support",
    question: "How does the dedicated 24/7 WhatsApp concierge work while traveling?",
    answer: "Before your departure, we create a private WhatsApp VIP Concierge group with you, your personal Travel Designer, our on-ground logistics coordinator, and a local destination supervisor. Whether you need a sudden dinner table reservation, a weather check, an extra water bottle, or flight delay coordination, our team responds within minutes around the clock.",
  },
  {
    id: "flight-delays",
    category: "On-Trip Support",
    question: "What happens if our airline delays or reschedules our flight?",
    answer: "Because we track your live flight radar status in real time, our airport chauffeur will automatically adjust their pickup timing without any stress or extra waiting fee. If a connection is missed, your concierge team immediately rearranges day-one hotel check-ins and activities.",
  },
  {
    id: "cancellation-terms",
    category: "Cancellations",
    question: "What is your cancellation and refund policy if plans change?",
    answer: "Cancellations made 30 or more days prior to departure receive a full refund minus a nominal administrative processing fee and non-refundable flight/hotel supplier deposits. For 15–29 days, a 50% refund is provided. For detailed terms, please review our Cancellation Policy page.",
  },
  {
    id: "rescheduling",
    category: "Cancellations",
    question: "Can I reschedule my trip dates instead of cancelling?",
    answer: "Yes, date adjustments can be accommodated up to 21 days before departure, subject to seasonal resort rate differences and airline change penalties. We always negotiate on your behalf to minimize or eliminate hotel rescheduling fees.",
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "deposit-policy": true,
    "customization-scope": true,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Booking & Payments",
    "Customization",
    "Visas & Passports",
    "On-Trip Support",
    "Cancellations",
  ];

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQS_DATA.filter((item) => {
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", background: "var(--bg-cream)" }}>
        {/* 1. Hero */}
        <section className="faq-hero-section text-center">
          <div className="container" style={{ maxWidth: 840 }}>
            <span className="cursive" style={{ fontSize: 24, color: "var(--brand-ochre)" }}>
              Clear Answers & Transparency
            </span>
            <h1 className="serif article-hero-title">Frequently Asked Questions</h1>
            <p
              style={{
                fontSize: 15.5,
                color: "var(--text-body)",
                lineHeight: 1.6,
                margin: "0 auto 28px",
                maxWidth: 620,
              }}
            >
              Everything you need to know about booking deposits, private chauffeur logistics, visa processing, and our 24/7 dedicated travel concierge.
            </p>

            {/* Search Box */}
            <div style={{ maxWidth: 520, margin: "0 auto", position: "relative" }}>
              <input
                type="text"
                placeholder="Search FAQs (e.g., deposits, visas, private car)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 20px 13px 44px",
                  borderRadius: 9999,
                  border: "1.5px solid var(--border-warm)",
                  background: "#FFFFFF",
                  fontSize: 14,
                  color: "var(--text-dark)",
                  outline: "none",
                  boxShadow: "0 4px 16px rgba(60, 40, 20, 0.04)",
                }}
              />
              <span
                className="material-symbols-rounded"
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  fontSize: 20,
                }}
              >
                search
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    fontSize: 16,
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 2. FAQ Accordion Container */}
        <section className="container" style={{ padding: "48px 20px 70px" }}>
          {/* Category Tabs */}
          <div className="faq-category-nav">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`faq-category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Items List */}
          <div className="faq-accordion-list">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div key={faq.id} className={`faq-accordion-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="material-symbols-rounded"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                        color: "var(--brand-ochre)",
                        flexShrink: 0,
                      }}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p style={{ margin: 0 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  background: "#FFFFFF",
                  borderRadius: 20,
                  border: "1.5px solid var(--border-warm)",
                }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 40, color: "var(--brand-ochre)", marginBottom: 10 }}
                >
                  help_outline
                </span>
                <h3 className="serif" style={{ fontSize: 19, color: "var(--text-dark)", margin: "0 0 6px" }}>
                  No matching question found
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--text-body)", margin: "0 0 18px" }}>
                  Have an uncommon request? Our travel concierge is ready to chat with you right now.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    background: "var(--brand-brown)",
                    color: "#FFFFFF",
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Ask Our Team
                </Link>
              </div>
            )}
          </div>

          {/* Bottom Direct Concierge Box */}
          <div
            style={{
              maxWidth: 820,
              margin: "56px auto 0",
              background: "#FAF4EC",
              border: "1.5px solid #DFCEB5",
              borderRadius: 22,
              padding: "32px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
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
                Still have questions?
              </span>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 6px" }}>
                Speak Directly with a Master Travel Designer
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--text-body)", margin: 0, maxWidth: 480 }}>
                Get instant answers regarding flight routes, infant arrangements, dietary preferences, or private yacht bookings.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="https://wa.me/917666226649?text=Hi%20Trippy%20Travellerz%2C%20I%20have%20a%20question%20about%20booking%20a%20tour!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-concierge"
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "#25D366" }}>
                  chat
                </span>
                <span>WhatsApp Us</span>
              </a>

              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 24px",
                  background: "var(--brand-brown)",
                  color: "#FFFFFF",
                  borderRadius: 9999,
                  fontSize: 13.5,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <span>Send Enquiry</span>
              </Link>
            </div>
          </div>

          {/* Concierge Banner */}
          <div style={{ marginTop: 50 }}>
            <CustomItineraryBanner />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
