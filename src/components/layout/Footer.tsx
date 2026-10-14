import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand" style={{ width: "100%" }}>
            <Link href="/" style={{ display: "block", textDecoration: "none", width: "100%" }}>
              <img
                src="/fulllogo.png"
                alt="Trippy Travelerz"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
              />
            </Link>
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

          {/* Col 6: Golden Geometric Mountain & Compass Seal (Right-most) */}
          <div className="footer-seal-container">
            <h4 className="footer-col-title" style={{ marginBottom: 14 }}>Follow Us</h4>
            <div className="footer-social-row" style={{ marginBottom: 18 }}>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
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
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
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
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="X">
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
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
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
            <p className="footer-tagline" style={{ maxWidth: "240px", margin: "14px 0 0 0", lineHeight: 1.65 }}>
              Curated journeys. Real experiences.
              <br />
              Travel beyond the ordinary.
            </p>
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
