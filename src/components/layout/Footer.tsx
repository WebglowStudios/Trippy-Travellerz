import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand">
            <Link href="/" className="brand-logo" style={{ marginBottom: 8 }}>
              <img
                src="/logo.png"
                alt="Trippy Travellers"
                className="brand-logo-img"
                style={{ borderColor: "#DFB980" }}
              />
              <span className="brand-logo-text" style={{ color: "#DFB980" }}>
                Trippy <span style={{ color: "#F3CC5B", fontStyle: "italic" }}>Travellers</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Curated journeys. Real experiences.
              <br />
              Travel beyond the ordinary.
            </p>

            {/* Social Icons Row */}
            <div className="footer-social-row">
              {/* Instagram */}
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="footer-social-link" aria-label="X">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l16 16m0-16L4 20" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/destinations" className="footer-nav-link">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="footer-nav-link">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/visa-free" className="footer-nav-link">
                  Visa-Free Trips
                </Link>
              </li>
              <li>
                <Link href="/articles" className="footer-nav-link">
                  Travel Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-nav-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="footer-nav-link">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/careers" className="footer-nav-link">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div>
            <h4 className="footer-col-title">Popular Destinations</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/destinations/kashmir" className="footer-nav-link">
                  Kashmir
                </Link>
              </li>
              <li>
                <Link href="/destinations/varanasi" className="footer-nav-link">
                  Varanasi
                </Link>
              </li>
              <li>
                <Link href="/destinations/kerala" className="footer-nav-link">
                  Kerala
                </Link>
              </li>
              <li>
                <Link href="/destinations/ladakh" className="footer-nav-link">
                  Ladakh
                </Link>
              </li>
              <li>
                <Link href="/destinations/andaman" className="footer-nav-link">
                  Andaman
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai" className="footer-nav-link">
                  Dubai
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Help & Support */}
          <div>
            <h4 className="footer-col-title">Help & Support</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/faq" className="footer-nav-link">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-nav-link">
                  Booking Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="footer-nav-link">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-nav-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-nav-link">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Us */}
          <div>
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-contact-row">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 98765-43210</span>
            </div>
            <div className="footer-contact-row">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>hello@trippytravelerz.com</span>
            </div>
            <div className="footer-contact-row">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Bengaluru & Pune, India</span>
            </div>
          </div>

          {/* Col 6: Golden Geometric Mountain & Compass Seal */}
          <div className="footer-seal-container">
            <svg
              className="footer-seal-svg"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Mountain Peaks in Golden Lines */}
              <g
                stroke="#DFB980"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M70 12L42 54H98L70 12Z" />
                <path d="M70 12L68 54" />
                <path d="M70 12L56 54" />
                <path d="M70 12L84 54" />
                <path d="M42 32L18 64H62L42 32Z" />
                <path d="M98 32L78 64H122L98 32Z" />
              </g>
              {/* Slogan */}
              <text
                x="70"
                y="78"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontSize="6.5"
                fontWeight="700"
                letterSpacing="0.22em"
                fill="#DFB980"
                textAnchor="middle"
              >
                DREAM · EXPLORE · DISCOVER
              </text>
              {/* Compass Rose */}
              <g transform="translate(70, 110)">
                <circle
                  cx="0"
                  cy="0"
                  r="16"
                  stroke="#DFB980"
                  strokeWidth="1"
                  strokeDasharray="1.5 1.5"
                  opacity="0.5"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="13"
                  stroke="#DFB980"
                  strokeWidth="0.75"
                  opacity="0.3"
                />
                <line x1="0" y1="-16" x2="0" y2="-13" stroke="#DFB980" strokeWidth="1" />
                <line x1="0" y1="13" x2="0" y2="16" stroke="#DFB980" strokeWidth="1" />
                <line x1="-16" y1="0" x2="-13" y2="0" stroke="#DFB980" strokeWidth="1" />
                <line x1="13" y1="0" x2="16" y2="0" stroke="#DFB980" strokeWidth="1" />
                <text
                  x="0"
                  y="-18"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="5"
                  fill="#DFB980"
                  textAnchor="middle"
                  fontWeight="700"
                >
                  N
                </text>
                <text
                  x="0"
                  y="24"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="5"
                  fill="#DFB980"
                  textAnchor="middle"
                >
                  S
                </text>
                <text
                  x="-21"
                  y="2"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="5"
                  fill="#DFB980"
                  textAnchor="middle"
                >
                  W
                </text>
                <text
                  x="21"
                  y="2"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="5"
                  fill="#DFB980"
                  textAnchor="middle"
                >
                  E
                </text>
                <g transform="rotate(-40)">
                  <polygon points="0,-13 3.5,0 0,2 -3.5,0" fill="#DFB980" />
                  <polygon points="0,13 3.5,0 0,-2 -3.5,0" fill="#7E6545" />
                  <circle cx="0" cy="0" r="2" fill="#15100C" stroke="#DFB980" strokeWidth="1" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom Subfooter Bar */}
        <div className="footer-sub-bar">
          <span>© 2026 Trippy Travellers. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20, fontSize: 12.5 }}>
            <Link href="/privacy" style={{ color: "inherit", transition: "var(--transition)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "inherit", transition: "var(--transition)" }}>
              Terms of Service
            </Link>
            <Link href="/contact" style={{ color: "inherit", transition: "var(--transition)" }}>
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
