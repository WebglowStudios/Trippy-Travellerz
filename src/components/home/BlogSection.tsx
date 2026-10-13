import Link from "next/link";

interface ArticleItem {
  title: string;
  slug: string;
  date: string;
  image: string;
}

const articlesList: ArticleItem[] = [
  {
    title: "10 Hidden Gems in Himachal You Must Visit",
    slug: "10-hidden-gems-in-himachal-you-must-visit",
    date: "Jul 15, 2024",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "A Guide to Budget Travel in Southeast Asia",
    slug: "a-guide-to-budget-travel-in-southeast-asia",
    date: "Jul 10, 2024",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "How to Plan Your First International Trip",
    slug: "how-to-plan-your-first-international-trip",
    date: "Jul 5, 2024",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
  },
];

export default function BlogSection() {
  return (
    <section className="travel-blog-section" id="blog">
      <div className="container">
        <div className="section-head-row rv">
          <div>
            <span className="section-eyebrow">TRAVEL BLOG</span>
            <h2 className="section-h2">
              Stories, Guides
              <br />
              and Travel Tips
            </h2>
          </div>
          <div className="section-actions">
            <Link href="/articles" className="link-view-all">
              <span>Read All Articles</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="blog-cards-grid rv delay-1">
          {articlesList.map((art) => (
            <Link
              key={art.slug}
              href={`/articles/${art.slug}`}
              className="blog-item-card"
              style={{ textDecoration: "none" }}
            >
              <div className="blog-photo-frame">
                <img src={art.image} alt={art.title} loading="lazy" />
              </div>
              <div className="blog-text-container">
                <h3 className="blog-heading-link">{art.title}</h3>
                <span className="blog-publish-date">{art.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
