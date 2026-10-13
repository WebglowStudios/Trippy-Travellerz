"use client";

import { useState } from "react";
import { ShowcaseDestination } from "@/lib/showcase-destinations";

interface DestinationPhotoMosaicProps {
  destination: ShowcaseDestination;
}

export default function DestinationPhotoMosaic({ destination }: DestinationPhotoMosaicProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const galleryImages =
    destination.images && destination.images.length > 0
      ? destination.images
      : [destination.image];

  return (
    <section className="dest-section-wrap" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="cursive" style={{ fontSize: 19, color: "var(--brand-ochre)", display: "block", marginBottom: 4 }}>
            Moments Captured In Time
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
            {destination.name} Visual Gallery
          </h2>
        </div>

        <div className="dest-gallery-mosaic">
          {galleryImages.slice(0, 4).map((img, idx) => (
            <div
              key={idx}
              className={`dest-mosaic-item dest-mosaic-item-${idx + 1}`}
              onClick={() => setActivePhoto(img)}
            >
              <img src={img} alt={`${destination.name} - ${idx + 1}`} loading="lazy" />
              <div className="dest-mosaic-hover-overlay">
                <span className="material-symbols-rounded">zoom_in</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="dest-lightbox-overlay" onClick={() => setActivePhoto(null)}>
          <div className="dest-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="dest-lightbox-close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close"
            >
              <span className="material-symbols-rounded">close</span>
            </button>
            <img src={activePhoto} alt={destination.name} />
          </div>
        </div>
      )}
    </section>
  );
}
