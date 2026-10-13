"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomItineraryBanner from "@/components/packages/CustomItineraryBanner";
import { getArticleBySlug, ARTICLES_DATA } from "@/lib/articles-data";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

function ArticleDetailInner({ params }: ArticleDetailPageProps) {
  const resolvedParams = use(params);
  const article = getArticleBySlug(resolvedParams.slug);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <>
        <Header />
        <main
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-cream)",
            padding: 24,
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "#FFFFFF",
              padding: 48,
              borderRadius: 24,
              border: "1.5px solid var(--border-warm)",
              maxWidth: 480,
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 52, color: "var(--brand-ochre)", marginBottom: 12 }}
            >
              menu_book
            </span>
            <h1 className="serif" style={{ fontSize: 24, color: "var(--text-dark)", margin: "0 0 10px" }}>
              Story Not Found
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-body)", marginBottom: 24 }}>
              The travel journal dispatch you are looking for may have moved or been updated.
            </p>
            <Link
              href="/articles"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "var(--brand-brown)",
                color: "#FFFFFF",
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: "none",
              }}
            >
              Browse All Journal Stories
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <Header />

      <main style={{ background: "var(--bg-cream)", minHeight: "80vh" }}>
        {/* 1. Article Hero Banner */}
        <section className="article-reader-hero">
          <div className="article-reader-hero-bg">
            <img src={article.heroImage} alt={article.title} />
          </div>
          <div className="article-reader-hero-overlay" />

          <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
            {/* Breadcrumbs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12.5,
                color: "rgba(255, 255, 255, 0.75)",
                marginBottom: 20,
              }}
            >
              <Link href="/" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <Link href="/articles" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}>
                Journal
              </Link>
              <span>/</span>
              <span style={{ color: "var(--brand-gold)" }}>{article.category}</span>
            </div>

            <span
              style={{
                display: "inline-block",
                background: "rgba(223, 185, 128, 0.2)",
                border: "1px solid var(--brand-gold)",
                color: "var(--brand-gold)",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 1,
                padding: "4px 12px",
                borderRadius: 9999,
                marginBottom: 16,
              }}
            >
              {article.category}
            </span>

            <h1
              className="serif"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                lineHeight: 1.25,
                color: "#FFFFFF",
                margin: "0 0 14px",
              }}
            >
              {article.title}
            </h1>

            <p
              style={{
                fontSize: 16.5,
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.6,
                margin: "0 0 24px",
              }}
            >
              {article.subtitle}
            </p>

            {/* Author & Meta Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                paddingTop: 16,
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--brand-gold)",
                  }}
                />
                <div>
                  <strong style={{ display: "block", color: "#FFFFFF", fontSize: 13.5 }}>
                    {article.author.name}
                  </strong>
                  <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 11.5 }}>
                    {article.author.role} • {article.publishedAt}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(6px)",
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: 9999,
                  }}
                >
                  ⏱️ {article.readTime}
                </span>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: 9999,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 15 }}>
                    {copied ? "check" : "share"}
                  </span>
                  <span>{copied ? "Link Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Article Reading Body */}
        <div className="container" style={{ maxWidth: 860, padding: "50px 20px 70px" }}>
          {/* Lead Highlight */}
          <div className="article-reader-lead">
            {article.content.lead}
          </div>

          {/* Formatted Sections */}
          <div className="article-prose">
            {article.content.sections.map((section, idx) => (
              <section key={idx} style={{ marginBottom: 36 }}>
                <h2>{section.heading}</h2>

                {section.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}

                {section.highlight && (
                  <div className="article-pullquote">
                    &ldquo;{section.highlight}&rdquo;
                  </div>
                )}

                {section.image && (
                  <div style={{ margin: "28px 0" }}>
                    <div
                      style={{
                        borderRadius: 18,
                        overflow: "hidden",
                        border: "1.5px solid var(--border-warm)",
                        boxShadow: "0 6px 24px rgba(60, 40, 20, 0.08)",
                        height: 380,
                      }}
                    >
                      <img
                        src={section.image.src}
                        alt={section.image.caption}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <small
                      style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 8,
                        fontSize: 12.5,
                        color: "var(--text-muted)",
                        fontStyle: "italic",
                      }}
                    >
                      {section.image.caption}
                    </small>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways Card */}
          <div className="article-takeaways-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 24, color: "var(--brand-ochre)" }}>
                tips_and_updates
              </span>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                Curator&apos;s Essential Takeaways
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              {article.content.takeaways.map((point, idx) => (
                <li key={idx} style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6 }}>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Related Tour Package Spotlight (if linked) */}
          {article.relatedPackageSlug && (
            <div
              style={{
                background: "linear-gradient(135deg, #FAF4EC 0%, #F5ECE0 100%)",
                border: "1.5px solid #DFCEB5",
                borderRadius: 22,
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20,
                margin: "44px 0",
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
                  Featured Itinerary
                </span>
                <h4 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 6px" }}>
                  {article.relatedPackageTitle}
                </h4>
                <p style={{ fontSize: 13.5, color: "var(--text-body)", margin: 0, maxWidth: 500 }}>
                  Experience every detail described in this journal dispatch with our private bespoke package.
                </p>
              </div>

              <Link
                href={`/itinerary/${article.relatedPackageSlug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 26px",
                  background: "var(--brand-brown)",
                  color: "#FFFFFF",
                  borderRadius: 9999,
                  fontWeight: 700,
                  fontSize: 13.5,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(88, 55, 30, 0.2)",
                }}
              >
                <span>View Full Itinerary</span>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          )}

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "32px 0 48px" }}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--border-warm)",
                  padding: "5px 12px",
                  borderRadius: 9999,
                  fontSize: 12,
                  color: "var(--brand-brown)",
                  fontWeight: 600,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles Row */}
          <div style={{ marginTop: 56, borderTop: "1px solid var(--border-light)", paddingTop: 40 }}>
            <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-dark)", margin: "0 0 24px" }}>
              More from The Trippy Journal
            </h3>

            <div className="article-grid">
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} href={`/articles/${rel.slug}`} className="article-card">
                  <div className="article-card-photo" style={{ height: 180 }}>
                    <img src={rel.heroImage} alt={rel.title} />
                  </div>
                  <div className="article-card-body" style={{ padding: 18 }}>
                    <span className="article-category-badge" style={{ marginBottom: 8, fontSize: 10 }}>
                      {rel.category}
                    </span>
                    <h4
                      className="serif"
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--text-dark)",
                        margin: "0 0 8px",
                        lineHeight: 1.35,
                      }}
                    >
                      {rel.title}
                    </h4>
                    <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                      {rel.readTime} • {rel.publishedAt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Concierge */}
          <div style={{ marginTop: 60 }}>
            <CustomItineraryBanner />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function ArticleDetailPage(props: ArticleDetailPageProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh", background: "var(--bg-cream)" }} />}>
      <ArticleDetailInner {...props} />
    </Suspense>
  );
}
