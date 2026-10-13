"use client";

import { useState, useEffect, useCallback } from "react";

interface PackageGalleryProps {
  images: string[];
  heroImage?: string;
  destinationImages?: string[];
  stayImages?: string[];
  activityImages?: string[];
  destinationName?: string;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
  "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
];

export default function PackageGallery({
  images = [],
  heroImage,
  destinationImages = [],
  stayImages = [],
  activityImages = [],
  destinationName = "Dubai & UAE",
}: PackageGalleryProps) {
  // Combine all images into a unique pool
  const allImages = Array.from(
    new Set(
      [
        heroImage,
        ...(images || []),
        ...(destinationImages || []),
        ...(stayImages || []),
        ...(activityImages || []),
      ].filter(Boolean) as string[]
    )
  );

  const galleryPool = allImages.length > 0 ? allImages : FALLBACK_IMAGES;

  // Main 5 slots for the mosaic
  const mainPhoto = galleryPool[0] || FALLBACK_IMAGES[0];
  const stayPhoto = stayImages[0] || galleryPool[1] || FALLBACK_IMAGES[1];
  const activityPhoto = activityImages[0] || galleryPool[2] || FALLBACK_IMAGES[2];
  const secondaryPhoto = galleryPool[3] || FALLBACK_IMAGES[3];

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<"all" | "destination" | "stay" | "activity">("all");

  const getFilteredImages = useCallback(() => {
    switch (activeCategory) {
      case "destination":
        return destinationImages.length > 0 ? destinationImages : galleryPool;
      case "stay":
        return stayImages.length > 0 ? stayImages : galleryPool;
      case "activity":
        return activityImages.length > 0 ? activityImages : galleryPool;
      default:
        return galleryPool;
    }
  }, [activeCategory, destinationImages, stayImages, activityImages, galleryPool]);

  const currentPool = getFilteredImages();

  const openLightbox = (index = 0) => {
    setLightboxIdx(Math.max(0, Math.min(index, currentPool.length - 1)));
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navLightbox = useCallback(
    (step: number) => {
      setLightboxIdx((prev) => {
        const next = prev + step;
        if (next < 0) return currentPool.length - 1;
        if (next >= currentPool.length) return 0;
        return next;
      });
    },
    [currentPool.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navLightbox(-1);
      if (e.key === "ArrowRight") navLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, navLightbox]);

  return (
    <>
      <section className="pkg-gallery" aria-label="Package photo gallery">
        {/* Main Left Image (spans full height) */}
        <div className="gallery-main" onClick={() => openLightbox(0)}>
          <img
            src={mainPhoto}
            alt={destinationName}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGES[0];
            }}
          />
          <div className="gallery-cell-overlay" />
          <div className="gallery-location-badge">
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--brand-ochre)" }}>
              location_on
            </span>
            <span>{destinationName}</span>
          </div>
        </div>

        {/* Right Column: 2 Rows */}
        <div className="gallery-right">
          {/* Top Cell: Stay */}
          <div className="gallery-cell" onClick={() => openLightbox(1)}>
            <img
              src={stayPhoto}
              alt="Accommodation & Stay"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGES[1];
              }}
            />
            <div className="gallery-cell-overlay" />
            <div className="gallery-cell-label">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--brand-gold)",
                  textShadow: "0 1px 6px rgba(0,0,0,.6)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                  hotel
                </span>
                Stay
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.7)" }}>
                Curated Luxury Stays
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cells */}
          <div className="gallery-bottom-row">
            {/* Bottom Left: Activity */}
            <div className="gallery-cell" onClick={() => openLightbox(2)}>
              <img
                src={activityPhoto}
                alt="Activities & Sightseeing"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGES[2];
                }}
              />
              <div className="gallery-cell-overlay" />
              <div className="gallery-cell-label">
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--brand-gold)",
                    textShadow: "0 1px 6px rgba(0,0,0,.6)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                    paragliding
                  </span>
                  Activities
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.7)" }}>
                  Experiences
                </div>
              </div>
            </div>

            {/* Bottom Right: Secondary + "View All Photos" Button */}
            <div className="gallery-cell" onClick={() => openLightbox(3)}>
              <img
                src={secondaryPhoto}
                alt="Scenic Highlights"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGES[3];
                }}
              />
              <div className="gallery-cell-overlay" />
              <button
                type="button"
                className="gallery-view-all-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(0);
                }}
                aria-label="View all photos"
              >
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                  photo_library
                </span>
                <span>View All ({galleryPool.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(18, 12, 8, 0.94)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 24px",
          }}
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 24,
              right: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Filter Tabs */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(
                [
                  { id: "all", label: `All (${galleryPool.length})` },
                  { id: "destination", label: `Destination (${destinationImages.length || 0})` },
                  { id: "stay", label: `Stays (${stayImages.length || 0})` },
                  { id: "activity", label: `Activities (${activityImages.length || 0})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setLightboxIdx(0);
                  }}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: "1px solid",
                    ...(activeCategory === tab.id
                      ? { background: "#DFB980", color: "#352010", borderColor: "#DFB980" }
                      : { background: "rgba(255,255,255,0.1)", color: "#F0E6DC", borderColor: "rgba(255,255,255,0.2)" }),
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 24 }}>
                close
              </span>
            </button>
          </div>

          {/* Main Photo Display */}
          <div
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "75vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPool[lightboxIdx]}
              alt={`Photo ${lightboxIdx + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: 16,
                boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
              }}
            />

            {/* Prev Button */}
            {currentPool.length > 1 && (
              <button
                onClick={() => navLightbox(-1)}
                style={{
                  position: "absolute",
                  left: -60,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 28 }}>
                  chevron_left
                </span>
              </button>
            )}

            {/* Next Button */}
            {currentPool.length > 1 && (
              <button
                onClick={() => navLightbox(1)}
                style={{
                  position: "absolute",
                  right: -60,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 28 }}>
                  chevron_right
                </span>
              </button>
            )}
          </div>

          {/* Bottom Counter */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {lightboxIdx + 1} / {currentPool.length}
          </div>
        </div>
      )}
    </>
  );
}
