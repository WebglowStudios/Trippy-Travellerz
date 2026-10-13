"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";
import { api } from "@/lib/api";

interface GalleryPhoto {
  _id: string;
  url: string;
  caption: string;
  category?: string;
  location?: string;
}

const DEFAULT_GALLERY: GalleryPhoto[] = [
  {
    _id: "gal-1",
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    caption: "Burj Khalifa and golden Arabian gulf sunset skyline",
    category: "Landscapes",
    location: "Dubai, UAE",
  },
  {
    _id: "gal-2",
    url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    caption: "Private cliffside infinity villa overlooking the Indian Ocean",
    category: "Stays & Villas",
    location: "Uluwatu, Bali",
  },
  {
    _id: "gal-3",
    url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    caption: "Sunset overwater bungalows suspended above turquoise reef lagoon",
    category: "Stays & Villas",
    location: "Baa Atoll, Maldives",
  },
  {
    _id: "gal-4",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    caption: "Spring cherry blossoms framing Yasaka Pagoda in historic Gion",
    category: "Culture",
    location: "Kyoto, Japan",
  },
  {
    _id: "gal-5",
    url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    caption: "Amber sandstone courtyard of Amer Fort reflecting midday sun",
    category: "Culture",
    location: "Jaipur, Rajasthan",
  },
  {
    _id: "gal-6",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    caption: "Bedouin starlit candlelit dinner across the desert dunes",
    category: "Experiences",
    location: "Al Marmoom, Dubai",
  },
  {
    _id: "gal-7",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    caption: "Pristine white sand sandbank with private catamaran picnic",
    category: "Experiences",
    location: "Ari Atoll, Maldives",
  },
  {
    _id: "gal-8",
    url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    caption: "Morning mist lifting over Tegallalang terraced rice paddies",
    category: "Landscapes",
    location: "Ubud, Bali",
  },
  {
    _id: "gal-9",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    caption: "Snow-capped Mt. Fuji reflected upon Lake Kawaguchiko",
    category: "Landscapes",
    location: "Hakone, Japan",
  },
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(DEFAULT_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await api.get("/gallery?activeOnly=true");
        if (res.status === "success" && Array.isArray(res.data) && res.data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped = res.data.map((item: any, idx: number) => ({
            _id: item._id || `api-${idx}`,
            url: item.url || item.image,
            caption: item.caption || item.title || "Curated Odyssey Moment",
            category: item.category || "Landscapes",
            location: item.location || "World Escape",
          }));
          setPhotos(mapped);
        }
      } catch {
        // Fallback to DEFAULT_GALLERY
      }
    }
    fetchGallery();
  }, []);

  const categories = ["All", "Stays & Villas", "Landscapes", "Culture", "Experiences"];

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", background: "var(--bg-cream)" }}>
        {/* Hero Banner */}
        <section className="article-hero-section text-center">
          <div className="container" style={{ maxWidth: 840 }}>
            <span className="cursive" style={{ fontSize: 24, color: "var(--brand-ochre)" }}>
              Visual Chronicles
            </span>
            <h1 className="serif article-hero-title">A Living Gallery of Moments</h1>
            <p style={{ fontSize: 15.5, color: "var(--text-body)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: 640 }}>
              Glimpse into private overwater sunrise pavilions, candlelit sand dunes, and tea ceremonies captured across our bespoke journeys.
            </p>

            {/* Category Filter Tabs */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: selectedCategory === cat ? "1.5px solid var(--brand-brown)" : "1.5px solid var(--border-warm)",
                    background: selectedCategory === cat ? "var(--brand-brown)" : "#FFFFFF",
                    color: selectedCategory === cat ? "#FFFFFF" : "var(--text-dark)",
                    boxShadow: selectedCategory === cat ? "0 4px 14px rgba(88, 55, 30, 0.2)" : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="container" style={{ padding: "48px 20px 70px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo._id || idx}
                onClick={() => openLightbox(idx)}
                style={{
                  position: "relative",
                  height: 280,
                  borderRadius: 20,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1.5px solid var(--border-warm)",
                  boxShadow: "0 4px 16px rgba(60, 40, 20, 0.04)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                className="gallery-grid-card"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* Dark Gradient Overlay with Caption */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 50%, rgba(20, 10, 5, 0.85) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  {photo.location && (
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--brand-gold)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        marginBottom: 4,
                      }}
                    >
                      📍 {photo.location}
                    </span>
                  )}
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      margin: 0,
                      lineHeight: 1.35,
                      color: "#FFFFFF",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div style={{ marginTop: 60 }}>
            <CustomItineraryBanner />
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(20, 10, 5, 0.92)",
              backdropFilter: "blur(8px)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 900,
                width: "100%",
                background: "#1E120A",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(223, 185, 128, 0.3)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "none",
                  color: "#FFFFFF",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              {/* Image Preview */}
              <div style={{ maxHeight: "70vh", overflow: "hidden", background: "#000" }}>
                <img
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].caption}
                  style={{ width: "100%", height: "100%", maxHeight: "70vh", objectFit: "contain", display: "block" }}
                />
              </div>

              {/* Caption & Controls */}
              <div
                style={{
                  padding: "18px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#FFFFFF",
                }}
              >
                <div>
                  {filteredPhotos[lightboxIndex].location && (
                    <span style={{ fontSize: 11, color: "var(--brand-gold)", fontWeight: 700, textTransform: "uppercase" }}>
                      📍 {filteredPhotos[lightboxIndex].location}
                    </span>
                  )}
                  <p style={{ margin: "4px 0 0", fontSize: 14.5, color: "#FFFFFF" }}>
                    {filteredPhotos[lightboxIndex].caption}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
