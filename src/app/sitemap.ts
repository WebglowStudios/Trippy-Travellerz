import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trippytravelerz.com";

  // Core static & hub routes
  const staticRoutes = [
    "",
    "/packages",
    "/destinations",
    "/visa-free",
    "/articles",
    "/about",
    "/gallery",
    "/careers",
    "/contact",
    "/faq",
    "/terms",
    "/privacy",
    "/refund",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/packages") || route.startsWith("/destinations") ? 0.9 : 0.7,
  }));

  // Curated destination pages
  const destinations = [
    "dubai",
    "bali",
    "maldives",
    "japan",
    "rajasthan",
    "kerala",
    "singapore",
    "thailand",
  ].map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Curated showcase package pages
  const packages = [
    "manali-kasol",
    "spiti-summer",
    "delhi-leh-delhi-with-hanle-umlingla-and-demchok-ladakh-trip",
    "the-dubai-diaries",
    "bali",
    "thailand-phuket-krabi",
    "vietnam-festive-escape-new-year-special",
  ].flatMap((slug) => [
    {
      url: `${baseUrl}/itinerary/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/packages/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
  ]);

  // Curated travel journal dispatches
  const articles = [
    "art-of-slow-travel-kyoto",
    "overwater-living-maldives",
    "royal-havelis-rajasthan",
    "hidden-coves-bali",
    "dubai-desert-dune-resorts",
    "kerala-monsoon-wellness",
  ].map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...destinations, ...packages, ...articles];
}
