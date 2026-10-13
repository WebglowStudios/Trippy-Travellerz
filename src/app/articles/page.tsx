"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";
import { ARTICLES_DATA, getAllArticleCategories } from "@/lib/articles-data";

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => getAllArticleCategories(), []);

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchCat =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = ARTICLES_DATA[0];

  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", background: "var(--bg-cream)" }}>
        {/* 1. Hero Header */}
        <section className="article-hero-section text-center">
          <div className="container" style={{ maxWidth: 840 }}>
            <span className="cursive" style={{ fontSize: 24, color: "var(--brand-ochre)" }}>
              The Trippy Journal
            </span>
            <h1 className="serif article-hero-title">
              Stories, Guides & Curated Travel Notes
            </h1>
            <p style={{ fontSize: 15.5, color: "var(--text-body)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: 640 }}>
              Immerse yourself in insider travel dispatches, luxury ryokan secrets, desert night escapes, and packing masterclasses crafted by our destination curators.
            </p>

            {/* Search Input */}
            <div style={{ maxWidth: 520, margin: "0 auto", position: "relative" }}>
              <input
                type="text"
                placeholder="Search articles, countries, or travel styles..."
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

        {/* 2. Main Content Container */}
        <section className="container" style={{ padding: "48px 20px 70px" }}>
          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 44,
            }}
          >
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
                  border:
                    selectedCategory === cat
                      ? "1.5px solid var(--brand-brown)"
                      : "1.5px solid var(--border-warm)",
                  background: selectedCategory === cat ? "var(--brand-brown)" : "#FFFFFF",
                  color: selectedCategory === cat ? "#FFFFFF" : "var(--text-dark)",
                  boxShadow:
                    selectedCategory === cat
                      ? "0 4px 14px rgba(88, 55, 30, 0.2)"
                      : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article Card (shown when no search query and All is selected) */}
          {selectedCategory === "All" && !searchQuery && (
            <Link href={`/articles/${featuredArticle.slug}`} className="article-featured-card">
              <div className="article-featured-photo">
                <img src={featuredArticle.heroImage} alt={featuredArticle.title} />
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "var(--brand-gold)",
                    color: "#382310",
                    fontWeight: 800,
                    fontSize: 11,
                    padding: "4px 12px",
                    borderRadius: 9999,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Featured Dispatch
                </span>
              </div>
              <div className="article-featured-content">
                <span className="article-category-badge">{featuredArticle.category}</span>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 30px)",
                    fontWeight: 700,
                    color: "var(--text-dark)",
                    lineHeight: 1.3,
                    margin: "0 0 12px",
                  }}
                >
                  {featuredArticle.title}
                </h2>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "var(--text-body)",
                    lineHeight: 1.6,
                    margin: "0 0 24px",
                  }}
                >
                  {featuredArticle.excerpt}
                </p>
                <div className="article-meta-row">
                  <div className="article-author-info">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="article-author-avatar"
                    />
                    <div>
                      <strong style={{ display: "block", color: "var(--text-dark)", fontSize: 12 }}>
                        {featuredArticle.author.name}
                      </strong>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        {featuredArticle.publishedAt}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, color: "var(--brand-ochre)" }}>
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Articles Grid */}
          <div className="article-grid">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="article-card"
              >
                <div className="article-card-photo">
                  <img src={article.heroImage} alt={article.title} />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      background: "rgba(20, 10, 5, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 9px",
                      borderRadius: 9999,
                    }}
                  >
                    {article.readTime}
                  </span>
                </div>
                <div className="article-card-body">
                  <span className="article-category-badge" style={{ marginBottom: 10 }}>
                    {article.category}
                  </span>
                  <h3 className="article-card-title">{article.title}</h3>
                  <p className="article-card-excerpt">{article.excerpt}</p>
                  <div className="article-meta-row">
                    <div className="article-author-info">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="article-author-avatar"
                      />
                      <span>{article.author.name}</span>
                    </div>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1.5px solid var(--border-warm)",
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{ fontSize: 44, color: "var(--brand-ochre)", marginBottom: 12 }}
              >
                auto_stories
              </span>
              <h3 className="serif" style={{ fontSize: 20, color: "var(--text-dark)", margin: "0 0 8px" }}>
                No stories match your criteria
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-body)", margin: "0 0 20px" }}>
                Try searching for different keywords or reset your category filters.
              </p>
              <button
                type="button"
                className="btn-empty-reset"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Concierge Banner */}
          <div style={{ marginTop: 60 }}>
            <CustomItineraryBanner />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
