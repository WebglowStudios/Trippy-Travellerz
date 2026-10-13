import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PackagesMain from "@/components/packages/PackagesMain";

export const metadata: Metadata = {
  title: "Curated Luxury Packages & Escapes — Trippy Travellers",
  description:
    "Explore handcrafted luxury tour packages, romantic honeymoon retreats, and cultural expeditions across Dubai, Bali, Rajasthan, Kerala, and beyond.",
  openGraph: {
    title: "Curated Luxury Packages & Escapes — Trippy Travellers",
    description:
      "Explore handcrafted luxury tour packages, romantic honeymoon retreats, and cultural expeditions across Dubai, Bali, Rajasthan, Kerala, and beyond.",
    type: "website",
  },
};

export default function PackagesPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
            <div style={{ width: 44, height: 44, border: "3px solid #EAE3D8", borderTopColor: "var(--brand-brown)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-brown)" }}>Loading luxury packages...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        }
      >
        <PackagesMain />
      </Suspense>
      <Footer />
    </>
  );
}
