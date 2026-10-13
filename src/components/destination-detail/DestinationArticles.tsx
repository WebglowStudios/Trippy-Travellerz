"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface ArticleItem {
  img: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  slug: string;
}

interface DestinationArticlesProps {
  destinationName: string;
  destinationId?: string;
}

export default function DestinationArticles({
  destinationName,
  destinationId,
}: DestinationArticlesProps) {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!destinationName && !destinationId) {
      setLoading(false);
      return;
    }

    async function fetchArticles() {
      try {
        setLoading(true);
        // Try destination ID first, then destination name tag
        const query = destinationId
          ? `/articles?destination=${encodeURIComponent(destinationId)}&limit=3`
          : `/articles?tag=${encodeURIComponent(destinationName)}&limit=3`;

        const res = await api.get(query);
        if (res.status === "success" && Array.isArray(res.data) && res.data.length > 0) {
          setArticles(
            res.data.map((a: any) => ({
              img:
                a.coverImage ||
                a.image ||
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
              category: a.category || "Travel Guide",
              title: a.title,
              excerpt: a.excerpt || a.description || "",
              readTime: `${a.readTime || 5} min read`,
              slug: a.slug,
            }))
          );
        } else {
          // If 0 specific destination articles, try general articles for luxury inspiration
          const genRes = await api.get("/articles?limit=3");
          if (genRes.status === "success" && Array.isArray(genRes.data) && genRes.data.length > 0) {
            setArticles(
              genRes.data.slice(0, 3).map((a: any) => ({
                img:
                  a.coverImage ||
                  a.image ||
                  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
                category: a.category || "Travel Guide",
                title: a.title,
                excerpt: a.excerpt || a.description || "",
                readTime: `${a.readTime || 5} min read`,
                slug: a.slug,
              }))
            );
          }
        }
      } catch {
        // Silently omit if offline or no articles
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [destinationName, destinationId]);

  if (loading || articles.length === 0) return null;

  return (
    <section
      style={{
        padding: "80px 0",
        background: "#FAF7F2",
        borderTop: "1px solid var(--border-warm, #EAE3D8)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div>
            <span
              className="cursive"
              style={{
                fontSize: 20,
                color: "var(--brand-ochre, #8E5F32)",
                display: "block",
                marginBottom: 4,
              }}
            >
              Curated Travel Stories
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 700,
                color: "var(--text-dark, #2C1810)",
                margin: 0,
              }}
            >
              Notes & Insights from <em>{destinationName}</em>
            </h2>
          </div>

          <Link
            href="/articles"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13.5,
              fontWeight: 700,
              color: "var(--brand-brown, #58371E)",
              textDecoration: "none",
              borderBottom: "1.5px solid var(--brand-brown, #58371E)",
              paddingBottom: 2,
            }}
          >
            <span>Explore All Journals</span>
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Articles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {articles.map((item, idx) => (
            <Link
              key={item.slug || idx}
              href={`/articles/${item.slug}`}
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-lg, 18px)",
                border: "1.5px solid var(--border-warm, #EAE3D8)",
                overflow: "hidden",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-soft, 0 4px 18px rgba(88,55,30,0.06))",
                transition: "all 0.25s ease",
              }}
              className="dest-article-card"
            >
              {/* Image Banner */}
              <div
                style={{
                  height: 200,
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  className="dest-art-img"
                />
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "rgba(88, 55, 30, 0.85)",
                    backdropFilter: "blur(6px)",
                    color: "#FAF7F2",
                    fontSize: 10.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    padding: "4px 10px",
                    borderRadius: 9999,
                  }}
                >
                  {item.category}
                </div>
              </div>

              {/* Text Body */}
              <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  className="serif"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--text-dark, #2C1810)",
                    lineHeight: 1.35,
                    margin: "0 0 10px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--text-body, #5C4A3E)",
                    lineHeight: 1.6,
                    margin: "0 0 16px",
                    flex: 1,
                  }}
                >
                  {item.excerpt.length > 120 ? `${item.excerpt.slice(0, 120)}...` : item.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--border-light, #F4ECE1)",
                    paddingTop: 12,
                    fontSize: 12,
                    color: "var(--text-muted, #7A6960)",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--brand-ochre)" }}>
                      schedule
                    </span>
                    {item.readTime}
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      color: "var(--brand-brown, #58371E)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    Read Journal
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dest-article-card:hover {
          transform: translateY(-4px);
          border-color: var(--brand-brown, #58371E);
          box-shadow: 0 12px 30px rgba(88, 55, 30, 0.12);
        }
        .dest-article-card:hover .dest-art-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
