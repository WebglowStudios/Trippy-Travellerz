export interface ShowcaseDestination {
  id: string;
  name: string;
  slug: string;
  country: string;
  region: "Middle East" | "South East Asia" | "India & Subcontinent" | "Europe" | "Islands & Africa";
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  startingPrice: number;
  packageCount: number;
  rating: number;
  reviewCount: number;
  bestSeason: string;
  visaType: "free" | "on-arrival" | "e-visa" | "required";
  currency: string;
  language: string;
  highlights: string[];
  travelTips: { question: string; answer: string }[];
  whyVisit: { icon: string; title: string; description: string }[];
}

export const SHOWCASE_DESTINATIONS: ShowcaseDestination[] = [
  {
    id: "dubai",
    name: "Dubai",
    slug: "dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    description: "Where golden red dunes meet futuristic skyline marvels. Dubai offers world-class dining, ultramodern architecture, desert safari camps, and vibrant luxury waterfront promenades.",
    shortDescription: "Futuristic skylines, desert dunes, and ultra-luxury living.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1600&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
    ],
    startingPrice: 59999,
    packageCount: 6,
    rating: 4.9,
    reviewCount: 312,
    bestSeason: "October to April",
    visaType: "on-arrival",
    currency: "AED (UAE Dirham)",
    language: "Arabic & English",
    highlights: ["Burj Khalifa VIP Sunset", "Red Dunes Desert Safari & BBQ", "Dubai Marina Luxury Dhow Cruise", "Palm Jumeirah & Atlantis", "Old Dubai Gold & Spice Souks", "Abu Dhabi Grand Mosque Excursion"],
    travelTips: [
      { question: "When is the best time to visit Dubai?", answer: "Between October and April when temperatures hover pleasantly between 22°C and 30°C. Winters offer prime beach and desert conditions." },
      { question: "What is the visa policy for Indian passport holders?", answer: "Indian citizens with a valid US, UK, or EU visa/green card receive a 14-day Visa on Arrival. Otherwise, a pre-arranged 30-day tourist e-Visa is easily processed within 48–72 hours." },
      { question: "What currency and payment options are accepted?", answer: "The local currency is the UAE Dirham (AED). International credit cards and multi-currency Forex cards work everywhere from luxury boutiques to taxis." },
    ],
    whyVisit: [
      { icon: "apartment", title: "Architectural Marvels", description: "Home to the world's tallest skyscraper, man-made islands, and futuristic skywalks." },
      { icon: "wb_sunny", title: "Year-Round Sunshine", description: "Over 350 days of guaranteed sunshine with pristine beaches and warm waters." },
      { icon: "shopping_bag", title: "Tax-Free Shopping", description: "World-famous mega-malls, traditional gold souks, and global luxury flagships." },
      { icon: "restaurant", title: "Gastronomic Capital", description: "Michelin-starred celebrity chef tables alongside authentic Emirati and Levantine street food." },
    ],
  },
  {
    id: "bali",
    name: "Bali",
    slug: "bali",
    country: "Indonesia",
    region: "South East Asia",
    description: "An enchanted island of mist-shrouded volcanic calderas, emerald rice terraces, cliffside Hindu sea temples, and world-class luxury wellness sanctuaries.",
    shortDescription: "Emerald rice terraces, private cliff villas, and spiritual serenity.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1600&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1600&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=80",
    ],
    startingPrice: 64999,
    packageCount: 5,
    rating: 4.9,
    reviewCount: 420,
    bestSeason: "April to October",
    visaType: "on-arrival",
    currency: "IDR (Indonesian Rupiah)",
    language: "Indonesian & English",
    highlights: ["Uluwatu Sunset Sea Temple & Kecak Dance", "Tegallalang Sacred Rice Terraces", "Private Pool Floating Breakfasts", "Nusa Penida Kelingking Beach Cruise", "Ubud Artisan & Yoga Sanctuaries"],
    travelTips: [
      { question: "What is the best season to visit Bali?", answer: "The dry season from April to October brings gentle offshore breezes, lower humidity, and crystal-clear turquoise waters perfect for beach hopping." },
      { question: "How does the Visa on Arrival work for Bali?", answer: "Indian tourists can obtain a 30-day electronic Visa on Arrival (e-VOA) online prior to departure or directly at Ngurah Rai International Airport (Denpasar) for 500,000 IDR (~₹2,700)." },
      { question: "What should I pack for Bali?", answer: "Light linen clothing, swimwear, reef-safe sunscreen, temple cover-ups (sarongs provided at gates), and comfortable walking footwear for rainforest walks." },
    ],
    whyVisit: [
      { icon: "spa", title: "Holistic Wellness", description: "Renowned holistic Ayurvedic spas, open-air yoga shalas, and flower bath rituals." },
      { icon: "beach_access", title: "Breathtaking Coasts", description: "Surfing breaks in Canggu, turquoise lagoons in Nusa Penida, and dramatic cliff sunsets in Uluwatu." },
      { icon: "temple_hindu", title: "Living Spiritual Culture", description: "Thousands of stone temples, daily floral offerings, and mesmerizing traditional fire dances." },
    ],
  },
  {
    id: "maldives",
    name: "Maldives",
    slug: "maldives",
    country: "Republic of Maldives",
    region: "Islands & Africa",
    description: "The ultimate tropical sanctuary of overwater villas suspended above crystal lagoons, powdery white sands, and kaleidoscopic coral reefs.",
    shortDescription: "Private overwater bungalows, turquoise atolls, and pure seclusion.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    ],
    startingPrice: 119999,
    packageCount: 4,
    rating: 5.0,
    reviewCount: 260,
    bestSeason: "November to April",
    visaType: "free",
    currency: "USD & MVR",
    language: "Dhivehi & English",
    highlights: ["Overwater Villa with Glass Floor Panel", "Scenic Seaplane Transfer over Coral Atolls", "Underwater Coral Reef Snorkeling", "Sunset Champagne Dolphin Catamaran Cruise", "Private Sandbank Candlelit Dinner"],
    travelTips: [
      { question: "Is the Maldives Visa Free for Indians?", answer: "Yes! Indian passport holders receive a 30-day Free Tourist Visa on arrival upon presenting valid hotel booking vouchers and return flights." },
      { question: "How do resort transfers work?", answer: "Depending on your resort's distance from Velana Airport (Malé), transfers are arranged by private speedboat (close atolls) or breathtaking scenic seaplanes." },
    ],
    whyVisit: [
      { icon: "water", title: "Overwater Living", description: "Wake up with direct ocean access straight from your bedroom deck." },
      { icon: "scuba_diving", title: "Marine Wonderland", description: "Swim alongside manta rays, sea turtles, and vibrant coral formations." },
    ],
  },
  {
    id: "japan",
    name: "Japan",
    slug: "japan",
    country: "Japan",
    region: "South East Asia",
    description: "An extraordinary harmony of ancient Zen temples, neon-lit futuristic cityscapes, serene Onsen hot spring ryokans, and sublime culinary artistry.",
    shortDescription: "Cherry blossoms, bullet trains, neon Tokyo, and Zen gardens.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=80",
    ],
    startingPrice: 114999,
    packageCount: 3,
    rating: 4.9,
    reviewCount: 195,
    bestSeason: "March to May & Sept to Nov",
    visaType: "e-visa",
    currency: "JPY (Japanese Yen)",
    language: "Japanese",
    highlights: ["Shinkansen Bullet Train Journeys", "Traditional Kyoto Geisha Quarter & Bamboo Groves", "Mount Fuji Views & Hakone Hot Spring Onsen", "Tokyo High-Tech Shinjuku & Shibuya Crossing"],
    travelTips: [
      { question: "How to get a Japan tourist visa?", answer: "Indian travelers can easily apply for the official Japan tourist eVisa online through VFS Global, typically processed within 5 business days." },
    ],
    whyVisit: [
      { icon: "train", title: "Bullet Train Precision", description: "Glide between ultra-modern cities and rural mountain valleys effortlessly." },
      { icon: "ramen_dining", title: "Culinary Mastery", description: "From authentic Michelin-star kaiseki to sizzling street-side ramen bars." },
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    slug: "rajasthan-royal-heritage-tour-jaipur-udaipur-and-jodhpur",
    country: "India",
    region: "India & Subcontinent",
    description: "The golden land of Maharajas, imposing sandstone fortresses, tranquil royal lakes, and vibrant desert bazaars echoing timeless chivalry.",
    shortDescription: "Palace stays, private lake boats, and majestic desert forts.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80",
    ],
    startingPrice: 49999,
    packageCount: 5,
    rating: 4.8,
    reviewCount: 410,
    bestSeason: "October to March",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi & English",
    highlights: ["Lake Pichola Private Sunset Boat Cruise", "Amber Fort Guided Exploration in Jaipur", "Restored Heritage Palace Stays", "Mehrangarh Fort Skyline Views in Jodhpur"],
    travelTips: [
      { question: "What is the best season for Rajasthan?", answer: "Winter months from October to March offer pleasant sunny days and cool royal evenings." },
    ],
    whyVisit: [
      { icon: "castle", title: "Living Palaces", description: "Experience royal hospitality by staying in authentic ancestral havelis and palaces." },
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    slug: "kerala-backwaters-and-ayurveda-retreat-kochi-alleppey-and-munnar",
    country: "India",
    region: "India & Subcontinent",
    description: "God's Own Country — an oasis of labyrinthine backwater canals, misty tea-carpeted mountains in Munnar, and centuries of authentic Ayurvedic wisdom.",
    shortDescription: "Serene houseboats, tea-scented hills, and Ayurvedic wellness.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1600&q=80",
    ],
    startingPrice: 38999,
    packageCount: 4,
    rating: 4.8,
    reviewCount: 340,
    bestSeason: "September to March",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Malayalam & English",
    highlights: ["Private Houseboat Cruise with Personal Chef", "Full-Day Ayurvedic Wellness Treatments", "Munnar Mountain Tea Estate Trekking"],
    travelTips: [
      { question: "When is the best time for Kerala houseboats?", answer: "September through March offers calm waters, pleasant breezes, and lush post-monsoon greenery." },
    ],
    whyVisit: [
      { icon: "sailing", title: "Backwater Cruises", description: "Drift along palm-fringed lagoons in your personal luxury floating villa." },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    slug: "singapore",
    country: "Singapore",
    region: "South East Asia",
    description: "A garden city of the future, marrying futuristic architecture, Michelin-starred culinary alleys, Sentosa beach retreats, and vibrant cultural enclaves.",
    shortDescription: "Futuristic supertrees, skyline infinity pools, and Sentosa luxury.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=80",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&q=80",
    ],
    startingPrice: 72999,
    packageCount: 4,
    rating: 4.8,
    reviewCount: 290,
    bestSeason: "November to January & June to August",
    visaType: "e-visa",
    currency: "SGD (Singapore Dollar)",
    language: "English, Mandarin & Malay",
    highlights: ["Marina Bay Sands SkyPark Observation Deck", "Gardens by the Bay Supertrees & Flower Dome", "Universal Studios VIP Access", "Night Safari Tram Ride"],
    travelTips: [
      { question: "Is Singapore easy for Indian travelers?", answer: "Yes, Singapore offers an electronic visa processed through authorized agents, and English is universally spoken." },
    ],
    whyVisit: [
      { icon: "forest", title: "City in Nature", description: "Pioneering green architecture where gardens climb skyscrapers and waterfalls flow indoors." },
    ],
  },
  {
    id: "thailand",
    name: "Thailand",
    slug: "thailand",
    country: "Thailand",
    region: "South East Asia",
    description: "The land of smiles, offering vibrant golden temples, dynamic Bangkok rooftop dining, and turquoise limestone karsts in Phuket and Krabi.",
    shortDescription: "Tropical island speedboats, golden temples, and street food.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=80",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1600&q=80",
    ],
    startingPrice: 54999,
    packageCount: 5,
    rating: 4.8,
    reviewCount: 380,
    bestSeason: "November to April",
    visaType: "free",
    currency: "THB (Thai Baht)",
    language: "Thai & English",
    highlights: ["Phi Phi Islands Speedboat Charter", "Chao Phraya Luxury Dinner Cruise", "Bangkok Grand Palace & Wat Arun", "Phuket Beachfront Sunset Lounges"],
    travelTips: [
      { question: "What is the visa policy for Indian tourists in Thailand?", answer: "Thailand currently grants 60-day Visa-Free entry for Indian passport holders for tourism." },
    ],
    whyVisit: [
      { icon: "waves", title: "Iconic Karst Islands", description: "Sail through emerald waters flanked by towering limestone cliffs." },
    ],
  },
];
