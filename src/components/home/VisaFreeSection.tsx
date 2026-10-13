import Link from "next/link";

interface VisaCountry {
  name: string;
  tagline: string;
  photo: string;
  slug: string;
}

const visaCountries: VisaCountry[] = [
  {
    name: "Thailand",
    tagline: "Land of Smiles",
    photo: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80&auto=format&fit=crop",
    slug: "thailand",
  },
  {
    name: "Nepal",
    tagline: "Himalayan Beauty",
    photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80&auto=format&fit=crop",
    slug: "nepal",
  },
  {
    name: "Maldives",
    tagline: "Island Paradise",
    photo: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80&auto=format&fit=crop",
    slug: "maldives",
  },
  {
    name: "Sri Lanka",
    tagline: "Tropical Wonders",
    photo: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=600&q=80&auto=format&fit=crop",
    slug: "sri-lanka",
  },
  {
    name: "Bhutan",
    tagline: "The Last Shangri-La",
    photo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80&auto=format&fit=crop",
    slug: "bhutan",
  },
];

export default function VisaFreeSection() {
  return (
    <section className="visa-free-section" id="visa-free">
      <div className="container">
        <div className="section-head-row rv">
          <div>
            <span className="section-eyebrow">VISA FREE TRAVEL</span>
            <h2 className="section-h2">
              Explore the World
              <br />
              Without the Hassle
            </h2>
          </div>
          <div className="section-actions">
            <Link href="/destinations?visa=free" className="link-view-all">
              <span>View All</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 5 Visa-Free Cards Grid */}
        <div className="visa-free-grid-five rv delay-1">
          {visaCountries.map((c) => (
            <Link
              key={c.name}
              href={`/destinations/${c.slug}`}
              className="visa-country-card"
              style={{ textDecoration: "none" }}
            >
              <div className="visa-country-photo">
                <img src={c.photo} alt={c.name} loading="lazy" />
              </div>
              <div className="visa-country-meta-row">
                <div>
                  <h4 className="visa-country-title">{c.name}</h4>
                  <p className="visa-country-tagline">{c.tagline}</p>
                </div>
                <div className="visa-arrow-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
