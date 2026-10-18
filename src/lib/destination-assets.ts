import CURATED_DB_JSON from "./curated-destinations-db.json";

export interface CuratedDestination {
  id: string;
  name: string;
  slug: string;
  country: string;
  region: "Middle East" | "South East Asia" | "India & Subcontinent" | "Europe" | "Islands & Africa" | "Central Asia";
  shortDescription: string;
  heroDescription: string;
  heroImage: string;
  images: string[];
  bestSeason: string;
  visaType: "free" | "on-arrival" | "e-visa" | "required";
  currency: string;
  language: string;
  startingPrice: number;
  packageCount: number;
  rating: number;
  reviewCount: number;
  highlights: string[];
  travelTips?: { question: string; answer: string }[];
  whyVisit?: { icon: string; title: string; description: string }[];
}

export const DESTINATION_ASSETS: Record<string, CuratedDestination> = {
  kashmir: {
    id: "kashmir",
    name: "Kashmir",
    slug: "kashmir",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Dal Lake wooden shikaras, snow-dusted Gulmarg slopes, and timeless Mughal garden beauty.",
    heroDescription: "Known as Paradise on Earth, Kashmir enchants with crystalline mountain rivers, majestic Chinar avenues, and floating wooden houseboats against the snow-capped Pir Panjal range.",
    heroImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
      "https://images.unsplash.com/photo-1626014303757-6466336e4f3a?w=1200&q=80",
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=1200&q=80",
    ],
    bestSeason: "March to October & Dec–Feb (Snow)",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Kashmiri, Urdu & Hindi",
    startingPrice: 18999,
    packageCount: 15,
    rating: 4.9,
    reviewCount: 380,
    highlights: [
      "Dal Lake Shikara Cruise at Sunrise",
      "Gulmarg Gondola Ride to Phase 2 High Pass",
      "Pahalgam Betaab Valley & Aru River Walks",
      "Historic Mughal Gardens & Srinagar Old Souks",
    ],
    whyVisit: [
      { icon: "sailing", title: "Historic Shikara Life", description: "Stay in intricately hand-carved cedarwood houseboats floating on calm waters." },
      { icon: "downhill_skiing", title: "Alpine Snow Wonder", description: "Gulmarg boasts one of the highest cable cars in the world with powdery winter ski runs." },
      { icon: "nature_people", title: "Pristine Valleys", description: "Lush meadows in Pahalgam, gushing trout streams, and fragrant saffron fields." },
    ],
    travelTips: [
      { question: "When is the best season to visit Kashmir?", answer: "March to October offers blooming tulip gardens, apple orchards, and pleasant cool weather. December to February is peak winter for snow and skiing in Gulmarg." },
      { question: "How safe is traveling in Kashmir for families?", answer: "Kashmir is very welcoming to families and honeymooners. Standard tourist corridors (Srinagar, Gulmarg, Pahalgam, Sonamarg) are safe, bustling, and well-managed." },
    ],
  },

  "spiti-valley": {
    id: "spiti-valley",
    name: "Spiti Valley",
    slug: "spiti-valley",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "High-altitude cold desert, ancient Tibetan monasteries, and starlit Himalayan valleys.",
    heroDescription: "A rugged trans-Himalayan wonderland where 1,000-year-old cliffside monasteries overlook lunar desert valleys, turquoise glacial lakes, and some of the clearest stargazing skies on Earth.",
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    ],
    bestSeason: "May to October & Jan–Feb (Snow)",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi & Bhoti",
    startingPrice: 19999,
    packageCount: 29,
    rating: 4.8,
    reviewCount: 340,
    highlights: [
      "Key Monastery Cliffside Prayers",
      "Chandratal Crescent Moon Lake Camp",
      "Hikkim World's Highest Post Office",
      "Kunzum Pass High Himalayan Crossing",
    ],
    whyVisit: [
      { icon: "temple_buddhist", title: "1,000-Year Monasteries", description: "Perched atop dramatic cliff faces holding ancient murals and sacred thangkas." },
      { icon: "nights_stay", title: "Stargazing Heaven", description: "Zero light pollution reveals the full spiral of the Milky Way with razor clarity." },
    ],
  },

  ladakh: {
    id: "ladakh",
    name: "Ladakh",
    slug: "ladakh",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Turquoise glacial lakes, high motorable passes, and Buddhist gompas.",
    heroDescription: "Land of the high passes, where dramatic snowcapped summits frame the deep blue waters of Pangong Tso, golden sand dunes in Nubra Valley, and centuries of serene monastic heritage.",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80",
      "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=1200&q=80",
    ],
    bestSeason: "May to September",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Ladakhi & Hindi",
    startingPrice: 24999,
    packageCount: 26,
    rating: 4.9,
    reviewCount: 410,
    highlights: [
      "Pangong Tso Lake Luxury Glamping",
      "Nubra Valley Double-Humped Camel Safari",
      "Khardung La Pass (17,982 ft) Mountain Crossing",
      "Thiksey & Hemis Monastery Morning Chants",
    ],
    whyVisit: [
      { icon: "landscape", title: "Surreal Geology", description: "From red rock canyons to high-altitude cold sand dunes and shimmering saline lakes." },
      { icon: "directions_car", title: "Iconic Mountain Roads", description: "Drive across legendary mountain passes tested by global overland adventurers." },
    ],
  },

  manali: {
    id: "manali",
    name: "Manali",
    slug: "manali",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Pine-forested alpine valleys, snow adventures, and tranquil riverside mountain cafes.",
    heroDescription: "Nestled in the Pir Panjal range alongside the roaring Beas River, Manali offers the quintessential alpine retreat with snow adventures in Solang, rustic wooden hamlets, and cozy cedarwood lodges.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    bestSeason: "March to June & Dec–Feb (Snow)",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi & Pahari",
    startingPrice: 12999,
    packageCount: 26,
    rating: 4.8,
    reviewCount: 450,
    highlights: [
      "Solang Valley Snow Sports & Paragliding",
      "Atal Tunnel Scenic Drive to Sissu Waterfalls",
      "Old Manali Wooden Cafes & Apple Orchards",
      "Jogini Waterfall Forest Nature Trek",
    ],
  },

  himachal: {
    id: "himachal",
    name: "Himachal Pradesh",
    slug: "himachal",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Misty Himalayan hill stations, colonial architecture, cedar trails, and serene orchards.",
    heroDescription: "From the colonial elegance of Shimla to the bohemian Tibetan spirit of Dharamshala and alpine beauty of Kullu, Himachal offers soul-stirring vistas across northern India's high hills.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    bestSeason: "March to June & Dec–Feb (Snow)",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi",
    startingPrice: 14999,
    packageCount: 20,
    rating: 4.8,
    reviewCount: 390,
    highlights: [
      "Shimla Mall Road & Heritage Ridge",
      "Dharamshala & Dalai Lama Temple Complex",
      "Bir Billing World-Class Paragliding Takeoff",
      "Tirthan Valley River Trout Fishing & Treks",
    ],
  },

  uttarakhand: {
    id: "uttarakhand",
    name: "Uttarakhand",
    slug: "uttarakhand",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Sacred glacial shrines, emerald alpine meadows, white-water rapids, and holy river confluences.",
    heroDescription: "The Land of the Gods, where sacred river confluences meet snowcapped Himalayan sanctums like Kedarnath, high-altitude alpine meadows in Chopta, and the spiritual energy of Rishikesh.",
    heroImage: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    bestSeason: "April to June & Sept to Nov",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi & Garhwali",
    startingPrice: 12999,
    packageCount: 27,
    rating: 4.9,
    reviewCount: 520,
    highlights: [
      "Kedarnath Sacred Shrine Darshan",
      "Chopta Tungnath Meadows & Summit",
      "Rishikesh Ganges Aarti & White Water Rafting",
      "Auli Ski Slopes & Nanda Devi Panoramic Views",
    ],
  },

  kedarnath: {
    id: "kedarnath",
    name: "Kedarnath",
    slug: "kedarnath",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Sacred Himalayan pilgrimage shrine nestled in the high snowcapped Garhwal peaks.",
    heroDescription: "One of the holiest Jyotirlingas, perched at 3,584 meters amidst glacial moraines, offering an unforgettable spiritual journey by scenic mountain trek or helicopter charter.",
    heroImage: "https://res.cloudinary.com/dlvce2nsv/image/upload/v1780989477/letslivetours/heka4gu5ntgftobs4asx.jpg",
    images: [
      "https://res.cloudinary.com/dlvce2nsv/image/upload/v1781082573/letslivetours/gclzckillle3glvppsq9.jpg",
      "https://res.cloudinary.com/dlvce2nsv/image/upload/v1781076011/letslivetours/ml7fzj0heb6qkdtpfc0r.jpg",
      "https://res.cloudinary.com/dlvce2nsv/image/upload/v1781076132/letslivetours/sjwitjnvbpbshoyavwly.jpg",
      "https://res.cloudinary.com/dlvce2nsv/image/upload/v1781000476/letslivetours/z08uilwyt1sexj8mjbrh.jpg",
    ],
    bestSeason: "May to June & Sept to Oct",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi",
    startingPrice: 15999,
    packageCount: 6,
    rating: 4.9,
    reviewCount: 310,
    highlights: [
      "Kedarnath Temple Morning Aarti",
      "Scenic Helicopter Transfer Option from Guptkashi",
      "Gaurikund to Kedarnath River Trail",
      "Bhairavnath Peak Sunrise View",
    ],
  },

  meghalaya: {
    id: "meghalaya",
    name: "Meghalaya",
    slug: "meghalaya",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Living root bridges, crystal-clear Umngot river boating, and dramatic cloud-kissed waterfalls.",
    heroDescription: "The Abode of the Clouds, renowned for ancient living root bridges woven by Khasi tribes, the glass-like transparency of the Umngot River in Dawki, and majestic monsoon cascades.",
    heroImage: "https://images.unsplash.com/photo-1521437620269-f477f5437820?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1742494267580-e026d3737f65?w=1200&q=80",
      "https://images.unsplash.com/photo-1689089526066-c7e6e95ee265?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    ],
    bestSeason: "October to May",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Khasi, Garo & English",
    startingPrice: 21999,
    packageCount: 12,
    rating: 4.9,
    reviewCount: 280,
    highlights: [
      "Double Decker Living Root Bridge Trek in Cherrapunji",
      "Dawki Umngot Transparent River Boating",
      "Nohkalikai Falls & Wei Sawdong Cascades",
      "Mawlynnong Asia's Cleanest Village Walk",
    ],
  },

  vietnam: {
    id: "vietnam",
    name: "Vietnam",
    slug: "vietnam",
    country: "Vietnam",
    region: "South East Asia",
    shortDescription: "Emerald waters of Ha Long Bay, lantern-lit ancient Hoi An, and vibrant street food culture.",
    heroDescription: "A captivating nation where limestone karsts rise from the emerald sea of Ha Long Bay, lantern-lit centuries-old merchant houses line the canals of Hoi An, and world-class street gastronomy awaits in Hanoi.",
    heroImage: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80",
    ],
    bestSeason: "October to April",
    visaType: "e-visa",
    currency: "VND (Vietnamese Dong)",
    language: "Vietnamese & English",
    startingPrice: 48999,
    packageCount: 24,
    rating: 4.9,
    reviewCount: 420,
    highlights: [
      "Luxury Overnight Ha Long Bay Cruise",
      "Hoi An Ancient Lantern Town Evening Walk",
      "Da Nang Golden Hands Bridge & Ba Na Hills",
      "Hanoi Old Quarter Street Food Safari",
    ],
  },

  georgia: {
    id: "georgia",
    name: "Georgia",
    slug: "georgia",
    country: "Georgia",
    region: "Europe",
    shortDescription: "Cobblestone Tbilisi old quarters, dramatic Caucasus mountain peaks, and ancient wine valleys.",
    heroDescription: "At the crossroads of Europe and Asia, Georgia dazzles with wooden balconied streets in Tbilisi, 8,000-year-old subterranean winemaking traditions in Kakheti, and towering snow-capped peaks in Kazbegi.",
    heroImage: "https://images.unsplash.com/photo-1563284223-333497472e88?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1721350389988-774d1060c65a?w=1200&q=80",
      "https://images.unsplash.com/photo-1561781887-40c905aa61cc?w=1200&q=80",
      "https://images.unsplash.com/photo-1584097774515-8657972fdd29?w=1200&q=80",
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80",
    ],
    bestSeason: "May to October & Dec–March (Ski)",
    visaType: "e-visa",
    currency: "GEL (Georgian Lari)",
    language: "Georgian & English",
    startingPrice: 59999,
    packageCount: 5,
    rating: 4.8,
    reviewCount: 190,
    highlights: [
      "Stepantsminda & Gergeti Trinity Church Peak Views",
      "Tbilisi Old Town & Sulfur Bath District Walk",
      "Kakheti Wine Tasting in Traditional Qvevri Cellars",
      "Gudauri Russian-Georgian Friendship Monument",
    ],
  },

  baku: {
    id: "baku",
    name: "Baku",
    slug: "baku",
    country: "Azerbaijan",
    region: "Middle East",
    shortDescription: "Futuristic Flame Towers, Silk Road caravanserais, and Caspian Sea luxury boulevards.",
    heroDescription: "The City of Winds, where ultra-modern Zaha Hadid architecture and illuminated Flame Towers blend seamlessly with ancient UNESCO-walled Silk Road alleys beside the glittering Caspian shoreline.",
    heroImage: "https://res.cloudinary.com/dlvce2nsv/image/upload/v1783946052/letslivetours/Azerbaijan/pexels-zulfugarkarimov-33329106-mrj7f31l.jpg",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&q=80",
    ],
    bestSeason: "April to June & Sept to Nov",
    visaType: "e-visa",
    currency: "AZN (Azerbaijani Manat)",
    language: "Azerbaijani & English",
    startingPrice: 49999,
    packageCount: 6,
    rating: 4.8,
    reviewCount: 220,
    highlights: [
      "Heydar Aliyev Center Architectural Tour",
      "Old City (Icherisheher) & Maiden Tower",
      "Gobustan Ancient Rock Art & Mud Volcanoes",
      "Baku Seaside Boulevard & Ferris Wheel",
    ],
  },

  almaty: {
    id: "almaty",
    name: "Almaty",
    slug: "almaty",
    country: "Kazakhstan",
    region: "Central Asia",
    shortDescription: "Turquoise alpine Big Almaty Lake, Charyn Canyon red cliffs, and Tien Shan mountain peaks.",
    heroDescription: "Framed by the majestic snow-crowned Tien Shan mountains, Almaty offers Central Asian grandeur with turquoise alpine lakes, the dramatic red gorges of Charyn Canyon, and leafy European-style boulevards.",
    heroImage: "https://images.unsplash.com/photo-1727527817255-0c2646cb0587?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1659651117607-d2b397cf100f?w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    ],
    bestSeason: "May to October & Dec–March (Winter)",
    visaType: "free",
    currency: "KZT (Kazakhstani Tenge)",
    language: "Kazakh & Russian",
    startingPrice: 52999,
    packageCount: 7,
    rating: 4.8,
    reviewCount: 180,
    highlights: [
      "Big Almaty Lake Turquoise Glacier Basin",
      "Charyn Canyon Valley of Castles Walk",
      "Kolsai & Kaindy Submerged Forest Lakes",
      "Shymbulak Mountain Cableway to 3,200m",
    ],
  },

  bhutan: {
    id: "bhutan",
    name: "Bhutan",
    slug: "bhutan",
    country: "Bhutan",
    region: "India & Subcontinent",
    shortDescription: "Sacred cliffside Tiger's Nest, peaceful Himalayan valleys, and Gross National Happiness.",
    heroDescription: "The Last Shangri-La, where gross national happiness guides daily life amidst pine-scented valleys, majestic riverside dzongs, and the legendary cliffside Tiger's Nest Monastery.",
    heroImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80",
    ],
    bestSeason: "March to May & Sept to Nov",
    visaType: "free",
    currency: "BTN & INR",
    language: "Dzongkha & English",
    startingPrice: 38999,
    packageCount: 7,
    rating: 4.9,
    reviewCount: 240,
    highlights: [
      "Tiger's Nest (Paro Taktsang) Cliffside Trek",
      "Punakha Dzong Palace at River Confluence",
      "Dochula Pass 108 Memorial Chortens View",
      "Thimphu Giant Golden Buddha Dordenma",
    ],
  },

  andaman: {
    id: "andaman",
    name: "Andaman",
    slug: "andaman",
    country: "India",
    region: "Islands & Africa",
    shortDescription: "Powdery white Radhanagar beaches, turquoise coral reefs, and untouched tropical islands.",
    heroDescription: "An untouched tropical paradise in the Bay of Bengal, celebrated for Asia's finest white-sand beaches on Havelock Island, crystal-clear scuba diving waters, and lush mangrove waterways.",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    ],
    bestSeason: "October to May",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi & English",
    startingPrice: 28999,
    packageCount: 5,
    rating: 4.9,
    reviewCount: 310,
    highlights: [
      "Radhanagar Beach Sunset on Havelock Island",
      "Elephant Beach Snorkeling & Sea Walking",
      "Neil Island Natural Bridge & Coral Reefs",
      "Cellular Jail Historic Light & Sound Show",
    ],
  },

  "sri-lanka": {
    id: "sri-lanka",
    name: "Sri Lanka",
    slug: "sri-lanka",
    country: "Sri Lanka",
    region: "South East Asia",
    shortDescription: "Ancient Sigiriya Lion Rock, Ella blue train tea hills, and golden palm-fringed beaches.",
    heroDescription: "The Pearl of the Indian Ocean, brimming with UNESCO ancient ruins in Sigiriya, the scenic blue train curving through mist-covered tea hills in Ella, and pristine southern surf shores.",
    heroImage: "https://images.unsplash.com/photo-1580794749460-76f97b7180d8?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1734279135113-8bd58bc02b69?w=1200&q=80",
      "https://images.unsplash.com/photo-1603097148068-564d0158227e?w=1200&q=80",
      "https://images.unsplash.com/photo-1779716892231-5a58a7fc67ac?w=1200&q=80",
      "https://images.unsplash.com/photo-1674556275226-47b6b393d623?w=1200&q=80",
    ],
    bestSeason: "December to April",
    visaType: "free",
    currency: "LKR (Sri Lankan Rupee)",
    language: "Sinhala, Tamil & English",
    startingPrice: 34999,
    packageCount: 11,
    rating: 4.8,
    reviewCount: 330,
    highlights: [
      "Sigiriya Ancient Lion Rock Fortress Ascent",
      "Scenic Ella Blue Train through Tea Country",
      "Yala National Park Wild Leopard & Elephant Safari",
      "Galle UNESCO Dutch Fort Ocean Ramparts",
    ],
  },

  goa: {
    id: "goa",
    name: "Goa",
    slug: "goa",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Golden palm beaches, Portuguese heritage villas, beachside shacks, and sunset cruises.",
    heroDescription: "India's coastal paradise, offering golden sun-soaked shores, Portuguese colonial architecture in Fontainhas, beachside seafood dining, and vibrant tropical nightlife.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80",
    ],
    bestSeason: "October to April",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Konkani, Hindi & English",
    startingPrice: 9999,
    packageCount: 4,
    rating: 4.8,
    reviewCount: 480,
    highlights: [
      "South Goa Serene Beaches (Palolem & Agonda)",
      "Fontainhas Colorful Latin Quarter Walk",
      "Mandovi River Catamaran Sunset Cruise",
      "Dudhsagar Four-Tier Jungle Waterfall",
    ],
  },

  dubai: {
    id: "dubai",
    name: "Dubai",
    slug: "dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    shortDescription: "Futuristic skylines, golden desert safari dunes, and ultra-luxury waterfront living.",
    heroDescription: "Where golden red dunes meet futuristic skyline marvels. Dubai offers world-class dining, ultramodern architecture, desert safari camps, and vibrant luxury waterfront promenades.",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
    ],
    bestSeason: "October to April",
    visaType: "on-arrival",
    currency: "AED (UAE Dirham)",
    language: "Arabic & English",
    startingPrice: 59999,
    packageCount: 13,
    rating: 4.9,
    reviewCount: 420,
    highlights: [
      "Burj Khalifa At the Top VIP Sunset",
      "Red Dunes Desert Safari & BBQ Dinner",
      "Dubai Marina Luxury Dhow Cruise",
      "Palm Jumeirah & Atlantis Aquaventure",
    ],
  },

  bali: {
    id: "bali",
    name: "Bali",
    slug: "bali",
    country: "Indonesia",
    region: "South East Asia",
    shortDescription: "Emerald rice terraces, private cliff villas, and spiritual ocean temples.",
    heroDescription: "An enchanted island of mist-shrouded volcanic calderas, emerald rice terraces, cliffside Hindu sea temples, and world-class luxury wellness sanctuaries.",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80",
    ],
    bestSeason: "April to October",
    visaType: "on-arrival",
    currency: "IDR (Indonesian Rupiah)",
    language: "Indonesian & English",
    startingPrice: 64999,
    packageCount: 8,
    rating: 4.9,
    reviewCount: 420,
    highlights: [
      "Uluwatu Sunset Sea Temple & Kecak Dance",
      "Tegallalang Sacred Rice Terraces & Jungle Swing",
      "Private Pool Villa Floating Breakfast",
      "Nusa Penida Kelingking Beach Island Cruise",
    ],
  },

  maldives: {
    id: "maldives",
    name: "Maldives",
    slug: "maldives",
    country: "Republic of Maldives",
    region: "Islands & Africa",
    shortDescription: "Private overwater bungalows, turquoise atolls, and pure coral seclusion.",
    heroDescription: "The ultimate tropical sanctuary of overwater villas suspended above crystal lagoons, powdery white sands, and kaleidoscopic coral reefs.",
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    ],
    bestSeason: "November to April",
    visaType: "free",
    currency: "USD & MVR",
    language: "Dhivehi & English",
    startingPrice: 119999,
    packageCount: 4,
    rating: 5.0,
    reviewCount: 260,
    highlights: [
      "Overwater Villa with Direct Lagoon Access",
      "Scenic Seaplane Transfer over Coral Atolls",
      "House Reef Coral Snorkeling with Turtles",
      "Sunset Dolphin Catamaran Cruise",
    ],
  },

  thailand: {
    id: "thailand",
    name: "Thailand",
    slug: "thailand",
    country: "Thailand",
    region: "South East Asia",
    shortDescription: "Tropical karst islands, golden Bangkok temples, and world-famous street food.",
    heroDescription: "The land of smiles, offering vibrant golden temples, dynamic Bangkok rooftop dining, and turquoise limestone karsts in Phuket and Krabi.",
    heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80",
    ],
    bestSeason: "November to April",
    visaType: "free",
    currency: "THB (Thai Baht)",
    language: "Thai & English",
    startingPrice: 42999,
    packageCount: 27,
    rating: 4.8,
    reviewCount: 490,
    highlights: [
      "Phi Phi Islands Speedboat Charter",
      "Bangkok Grand Palace & Wat Arun",
      "Chao Phraya Luxury Dinner Cruise",
      "Phuket Sunset Beachfront Lounges",
    ],
  },

  japan: {
    id: "japan",
    name: "Japan",
    slug: "japan",
    country: "Japan",
    region: "South East Asia",
    shortDescription: "Cherry blossoms, bullet trains, neon Tokyo, and serene Zen temples.",
    heroDescription: "An extraordinary harmony of ancient Zen temples, neon-lit futuristic cityscapes, serene Onsen hot spring ryokans, and sublime culinary artistry.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
    ],
    bestSeason: "March to May & Sept to Nov",
    visaType: "e-visa",
    currency: "JPY (Japanese Yen)",
    language: "Japanese & English",
    startingPrice: 114999,
    packageCount: 9,
    rating: 4.9,
    reviewCount: 210,
    highlights: [
      "Shinkansen Bullet Train Journeys",
      "Kyoto Arashiyama Bamboo Grove & Geisha District",
      "Mount Fuji Views & Hakone Onsen Experience",
      "Tokyo Shibuya & Shinjuku Neon Nightlife",
    ],
  },

  singapore: {
    id: "singapore",
    name: "Singapore",
    slug: "singapore",
    country: "Singapore",
    region: "South East Asia",
    shortDescription: "Futuristic supertrees, skyline infinity pools, and Sentosa luxury retreats.",
    heroDescription: "A garden city of the future, marrying futuristic architecture, Michelin-starred culinary alleys, Sentosa beach retreats, and vibrant cultural enclaves.",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200&q=80",
    ],
    bestSeason: "November to January & June to August",
    visaType: "e-visa",
    currency: "SGD (Singapore Dollar)",
    language: "English & Mandarin",
    startingPrice: 62999,
    packageCount: 4,
    rating: 4.8,
    reviewCount: 310,
    highlights: [
      "Marina Bay Sands SkyPark Observation Deck",
      "Gardens by the Bay Supertree Grove",
      "Universal Studios Singapore VIP Experience",
      "Night Safari Tram Exploration",
    ],
  },

  rajasthan: {
    id: "rajasthan",
    name: "Rajasthan",
    slug: "rajasthan",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Palace stays, private lake boats, and majestic golden desert forts.",
    heroDescription: "The golden land of Maharajas, imposing sandstone fortresses, tranquil royal lakes in Udaipur, and vibrant desert dunes echoing timeless chivalry.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    ],
    bestSeason: "October to March",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Hindi & Rajasthani",
    startingPrice: 22999,
    packageCount: 15,
    rating: 4.8,
    reviewCount: 440,
    highlights: [
      "Udaipur Lake Pichola Sunset Boat Cruise",
      "Jaipur Amber Fort Royal Guided Walk",
      "Jaisalmer Thar Desert Luxury Camping",
      "Jodhpur Mehrangarh Fort Skyline Views",
    ],
  },

  kerala: {
    id: "kerala",
    name: "Kerala",
    slug: "kerala",
    country: "India",
    region: "India & Subcontinent",
    shortDescription: "Serene backwater houseboats, tea-scented Munnar hills, and Ayurvedic wellness.",
    heroDescription: "God's Own Country — an oasis of labyrinthine backwater canals, misty tea-carpeted mountains in Munnar, and centuries of authentic Ayurvedic wisdom.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    ],
    bestSeason: "September to March",
    visaType: "free",
    currency: "INR (Indian Rupee)",
    language: "Malayalam & English",
    startingPrice: 19999,
    packageCount: 6,
    rating: 4.8,
    reviewCount: 370,
    highlights: [
      "Alleppey Private Houseboat Cruise with Chef",
      "Munnar Mountain Tea Estate Trek",
      "Traditional Ayurvedic Rejuvenation Spa",
      "Kochi Fort Chinese Fishing Nets Sunset",
    ],
  },
};

/**
 * Normalizes input slug or name to find the curated destination record.
 */
export function getCuratedDestination(query: string | null | undefined): CuratedDestination | undefined {
  if (!query) return undefined;
  const clean = String(query).toLowerCase().trim().replace(/[^a-z0-9]/g, "");

  // 1. Direct key lookup in full DB JSON
  const dbEntries = Object.entries(CURATED_DB_JSON as Record<string, any>);
  for (const [key, val] of dbEntries) {
    const keyClean = key.replace(/[^a-z0-9]/g, "");
    const nameClean = (val.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const slugClean = (val.slug || "").toLowerCase().replace(/[^a-z0-9]/g, "");

    if (
      clean === keyClean ||
      clean === nameClean ||
      clean === slugClean ||
      (clean.length > 3 && (nameClean.includes(clean) || clean.includes(nameClean)))
    ) {
      const richMatch = (DESTINATION_ASSETS as any)[key] || (DESTINATION_ASSETS as any)[val.slug];
      return {
        id: val.id || val.slug,
        name: val.name,
        slug: val.slug,
        country: val.country || richMatch?.country || "India",
        region: (val.region || richMatch?.region || "India & Subcontinent") as any,
        shortDescription: val.shortDescription || richMatch?.shortDescription || "",
        heroDescription: val.description || richMatch?.heroDescription || "",
        heroImage: val.heroImage,
        images: val.images || richMatch?.images || [],
        bestSeason: val.bestSeason || richMatch?.bestSeason || "October to April",
        visaType: richMatch?.visaType || "on-arrival",
        currency: richMatch?.currency || "INR (₹)",
        language: richMatch?.language || "English",
        startingPrice: val.startingPrice || richMatch?.startingPrice || 24999,
        packageCount: val.packageCount || richMatch?.packageCount || 3,
        rating: richMatch?.rating || 4.9,
        reviewCount: richMatch?.reviewCount || 180,
        highlights: richMatch?.highlights || ["Curated Stays", "Private Chauffeur", "VIP Sightseeing"],
        travelTips: richMatch?.travelTips || [],
        whyVisit: richMatch?.whyVisit || [],
      };
    }
  }

  // 2. Direct key lookup in DESTINATION_ASSETS
  for (const [key, val] of Object.entries(DESTINATION_ASSETS)) {
    const keyClean = key.replace(/[^a-z0-9]/g, "");
    const nameClean = val.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const slugClean = val.slug.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (clean === keyClean || clean === nameClean || clean === slugClean) {
      return val;
    }

    if (clean.includes(keyClean) || keyClean.includes(clean)) {
      return val;
    }
  }

  return undefined;
}

/**
 * Strips competitor brand names, HTML tags, and truncates cleanly.
 */
export function sanitizeDestinationText(raw: string | null | undefined, maxChars = 220): string {
  if (!raw) return "";
  let text = String(raw)
    .replace(/<[^>]*>/g, " ")
    .replace(/Capture\s*A\s*Trip/gi, "Trippy Travellers")
    .replace(/Captureatrip/gi, "Trippy Travellers")
    .replace(/Tripoto/gi, "Trippy Travellers")
    .replace(/Thrillophilia/gi, "Trippy Travellers")
    .replace(/\\n|\\r|\r\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Strip trailing ellipses or incomplete sentences
  text = text.replace(/\.{3,}$/, "").trim();

  if (text.length <= maxChars) {
    return text;
  }

  // Find last clean sentence or word boundary before maxChars
  const truncated = text.slice(0, maxChars);
  const lastPeriod = truncated.lastIndexOf(".");
  if (lastPeriod > 100) {
    return truncated.slice(0, lastPeriod + 1);
  }

  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 60) {
    return truncated.slice(0, lastSpace) + "...";
  }

  return truncated + "...";
}

/**
 * Ensures bestSeason is a clean, concise phrase, never an essay.
 */
export function sanitizeBestSeason(season: string | null | undefined, fallback = "October to April"): string {
  if (!season) return fallback;
  const clean = String(season)
    .replace(/<[^>]*>/g, " ")
    .replace(/\\n|\\r|\r\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // If already concise (under 35 chars) and doesn't look like an essay
  if (clean.length <= 35 && !clean.includes("The temperature") && !clean.includes("season ranges")) {
    return clean;
  }

  // Attempt to extract season months
  const monthsMatch = clean.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(?:to|-)\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*/i);
  if (monthsMatch) {
    return monthsMatch[0];
  }

  return fallback;
}
