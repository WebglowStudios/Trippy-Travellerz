"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface PackageCardItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  image: string;
  badge: string;
  badgeType: "bestseller" | "most-popular" | "new" | "adventure";
  durationDays: number;
  price: number;
  rating: number;
  reviewCount: number;
}

const fallbackPackages: PackageCardItem[] = [
  {
    id: "dubai-luxury",
    name: "Dubai Luxury Escape",
    slug: "dubai-luxury-escape-burj-khalifa-desert-safari",
    subtitle: "Burj Khalifa • Safari • Atlantis 5★",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop",
    badge: "Luxury 5★",
    badgeType: "bestseller",
    durationDays: 8,
    price: 124999,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "kashmir-winter",
    name: "Kashmir Winter Escape",
    slug: "kashmir-winter-escape",
    subtitle: "Srinagar • Gulmarg • Pahalgam",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80&auto=format&fit=crop",
    badge: "Bestseller",
    badgeType: "bestseller",
    durationDays: 6,
    price: 24999,
    rating: 4.8,
    reviewCount: 420,
  },
  {
    id: "spiritual-varanasi",
    name: "Spiritual Varanasi",
    slug: "spiritual-varanasi",
    subtitle: "Varanasi • Sarnath • Prayagraj",
    image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&q=80&auto=format&fit=crop",
    badge: "Most Popular",
    badgeType: "most-popular",
    durationDays: 4,
    price: 12999,
    rating: 4.7,
    reviewCount: 310,
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters",
    slug: "kerala-backwaters",
    subtitle: "Munnar • Alleppey • Thekkady",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80&auto=format&fit=crop",
    badge: "New",
    badgeType: "new",
    durationDays: 5,
    price: 18999,
    rating: 4.8,
    reviewCount: 280,
  },
];

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<PackageCardItem[]>(fallbackPackages);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await api.get("/packages/featured");
        if (res.status === "success" && res.data && res.data.length > 0) {
          const mapped = res.data.slice(0, 8).map((p: any) => ({
            id: p._id,
            name: p.name,
            slug: p.slug,
            subtitle: p.shortDescription || p.highlights?.[0] || (p.destination?.name ? `${p.destination.name} Experience` : "Curated Tour"),
            image: p.heroImage || p.images?.[0] || fallbackPackages[0].image,
            badge: p.badge || (p.isFeatured ? "Bestseller" : "Curated"),
            badgeType: (p.badge?.toLowerCase().includes("popular") ? "most-popular" : p.badge?.toLowerCase().includes("new") ? "new" : "bestseller") as any,
            durationDays: p.duration?.days || (p.duration?.nights ? p.duration.nights + 1 : 6),
            price: p.price || 25000,
            rating: p.rating || 4.9,
            reviewCount: p.reviewCount || 150,
          }));
          setPackages(mapped);
        }
      } catch {
        // Fallback to static items
      }
    }
    fetchPackages();
  }, []);

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollLeft = () => {
    gridRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    gridRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="packages-section" id="packages">
      {/* Subtle Squiggly Contour Accent (Packages Right Margin) */}
      <div className="packages-topo-accent">
        <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path d="M10,20 C60,5 110,45 160,25 C190,15 210,35 230,20" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.65" fill="none" />
          <path d="M5,42 C55,27 105,67 155,47 C185,37 205,57 225,42" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.55" fill="none" />
          <path d="M0,64 C50,49 100,89 150,69 C180,59 200,79 220,64" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.45" fill="none" />
          <path d="M-5,86 C45,71 95,111 145,91 C175,81 195,101 215,86" stroke="#DFCEB5" strokeWidth="1.3" opacity="0.35" fill="none" />
          <path d="M50,75 C80,50 120,65 110,95 C100,120 70,110 80,85 C90,60 140,75 180,55" stroke="#C5A475" strokeWidth="1.2" strokeDasharray="3,4" fill="none" opacity="0.45" />
        </svg>
      </div>

      <div className="container">
        <div className="section-head-row">
          <div>
            <span className="section-eyebrow">FEATURED PACKAGES</span>
            <h2 className="section-h2">
              Curated Journeys
              <br />
              for Every Traveler
            </h2>
          </div>
          <div className="section-actions">
            <Link href="/packages" className="link-view-all">
              <span>View All Packages</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <div className="slider-arrow-btns">
              <button className="nav-arrow-btn" aria-label="Previous" onClick={scrollLeft}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="nav-arrow-btn" aria-label="Next" onClick={scrollRight}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Packages Grid */}
        <div className="packages-grid" id="pkgGrid" ref={gridRef}>
          {packages.map((pkg) => {
            const isLiked = !!wishlist[pkg.id];
            return (
              <div key={pkg.id} className="pkg-item-card">
                <Link
                  href={`/itinerary/${pkg.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <div className="pkg-photo-box">
                    <img src={pkg.image} alt={pkg.name} loading="lazy" />
                    <span className={`pkg-tag-badge ${pkg.badgeType}`}>{pkg.badge}</span>
                    <button
                      className={`pkg-fav-btn ${isLiked ? "liked" : ""}`}
                      aria-label="Save to Wishlist"
                      onClick={(e) => toggleWishlist(e, pkg.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="pkg-title-text">{pkg.name}</h3>
                  <p className="pkg-dest-line">{pkg.subtitle}</p>

                  <div className="pkg-details-row">
                    <span className="bag-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      {pkg.durationDays} Days
                    </span>
                    <span className="price">₹ {pkg.price.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="pkg-footer-row">
                    <div className="pkg-rating-val">
                      <span className="star">★</span> {pkg.rating} <span className="count">({pkg.reviewCount})</span>
                    </div>
                    <div className="pkg-circle-arrow-btn" aria-label="Details">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
