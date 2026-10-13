import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DestinationsMain from "@/components/destinations/DestinationsMain";

export const metadata: Metadata = {
  title: "Luxury Destinations & Countries — Trippy Travellers",
  description:
    "Discover handcrafted journeys across Dubai, Bali, Japan, Maldives, Switzerland, Singapore, Rajasthan, and Kerala. Explore visa-free getaways and luxury retreats.",
  openGraph: {
    title: "Luxury Destinations & Countries — Trippy Travellers",
    description:
      "Discover handcrafted journeys across Dubai, Bali, Japan, Maldives, Switzerland, Singapore, Rajasthan, and Kerala. Explore visa-free getaways and luxury retreats.",
    type: "website",
  },
};

export default function DestinationsPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
            <div style={{ width: 44, height: 44, border: "3px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Loading luxury destinations...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        }
      >
        <DestinationsMain />
      </Suspense>
      <Footer />
    </>
  );
}
