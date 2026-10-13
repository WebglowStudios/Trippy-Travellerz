import Link from "next/link";

interface TravelStyleItem {
  name: string;
  category: string;
  desc: string;
  iconSvg: React.ReactNode;
}

const stylesList: TravelStyleItem[] = [
  {
    name: "Adventure",
    category: "adventure",
    desc: "Thrilling experiences",
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 22 22 22 12 2" />
        <line x1="12" y1="14" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    name: "Family Trips",
    category: "family",
    desc: "Memories together",
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <circle cx="9" cy="13" r="2" />
        <circle cx="15" cy="13" r="2" />
      </svg>
    ),
  },
  {
    name: "Honeymoon",
    category: "honeymoon",
    desc: "Romantic getaways",
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Spiritual",
    category: "spiritual",
    desc: "Inner journeys",
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4C10 8 7 12 3 14C7 16 11 16 12 20C13 16 17 16 21 14C17 12 14 8 12 4Z" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
  },
  {
    name: "Wildlife",
    category: "wildlife",
    desc: "Into the wild",
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="15" r="4" />
        <circle cx="6.5" cy="10" r="2" />
        <circle cx="17.5" cy="10" r="2" />
        <circle cx="9.5" cy="5.5" r="1.8" />
        <circle cx="14.5" cy="5.5" r="1.8" />
      </svg>
    ),
  },
  {
    name: "Beach Holidays",
    category: "beach",
    desc: "Sun, sand & sea",
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 8c0-2.76-2.24-5-5-5S3 5.24 3 8c0 1.66.81 3.13 2.05 4.05L4 21h16l-2-9c1.24-.92 2-2.39 2-4 0-2.76-2.24-5-5-5-1.63 0-3.06.78-3.95 2" />
        <path d="M12 8v13" />
      </svg>
    ),
  },
];

export default function TravelStyles() {
  return (
    <section className="travel-styles-section" id="styles">
      <div className="container">
        <div className="section-head-row">
          <div>
            <span className="section-eyebrow">TRAVEL STYLES</span>
            <h2 className="section-h2">Journeys Tailored to Your Style</h2>
          </div>
          <div className="section-actions">
            <Link href="/packages" className="link-view-all">
              <span>Explore All</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 6 Travel Style Boxes */}
        <div className="styles-grid-six">
          {stylesList.map((style) => (
            <Link
              key={style.name}
              href={`/packages?category=${style.category}`}
              className="style-box-card"
              style={{ textDecoration: "none" }}
            >
              <div className="style-circle-icon">{style.iconSvg}</div>
              <h3 className="style-card-name">{style.name}</h3>
              <p className="style-card-desc">{style.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
