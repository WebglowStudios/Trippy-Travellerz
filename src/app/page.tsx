import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import SearchWidget from "@/components/home/SearchWidget";
import PopularDestinations from "@/components/home/PopularDestinations";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import TravelStyles from "@/components/home/TravelStyles";
import TravelDifferently from "@/components/home/TravelDifferently";
import TravellerStories from "@/components/home/TravellerStories";
import VisaFreeSection from "@/components/home/VisaFreeSection";
import BlogSection from "@/components/home/BlogSection";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import DestinationMarquee from "@/components/home/DestinationMarquee";

export default function HomePage() {
  return (
    <>
      {/* 1. Top Navigation */}
      <Header />

      <main>
        {/* 2. Hero Panoramic Banner */}
        <HeroBanner />

        {/* 3. Floating 2-Tier Search Widget & Trust Badges */}
        <SearchWidget />

        {/* Marquee Ticker */}
        <DestinationMarquee />

        {/* 4. Popular Destinations */}
        <PopularDestinations />

        {/* 5. Featured Packages */}
        <FeaturedPackages />

        {/* 6. Travel Styles */}
        <TravelStyles />

        {/* 7. Travel Differently & Stats Strip */}
        <TravelDifferently />

        {/* 8. Traveller Stories */}
        <TravellerStories />

        {/* 9. Visa-Free Travel */}
        <VisaFreeSection />

        {/* 10. Travel Blog Journal */}
        <BlogSection />

        {/* 11. Newsletter Banner */}
        <NewsletterBanner />
      </main>

      {/* 12. Luxury Dark Footer */}
      <Footer />
    </>
  );
}
