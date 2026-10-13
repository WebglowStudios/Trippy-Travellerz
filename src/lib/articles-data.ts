export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: "Destinations" | "Luxury Stays" | "Culture & Heritage" | "Travel Tips";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  heroImage: string;
  tags: string[];
  excerpt: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string[];
      highlight?: string;
      image?: {
        src: string;
        caption: string;
      };
    }[];
    takeaways: string[];
  };
  relatedPackageSlug?: string;
  relatedPackageTitle?: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    slug: "dubai-luxury-beyond-skyscrapers",
    title: "Beyond the Glitz: Private Desert Dinners and Hidden Heritage in Dubai",
    subtitle: "How to experience the United Arab Emirates through an intimate, high-luxury lens far from the mall crowds.",
    category: "Destinations",
    author: {
      name: "Aarav Singhania",
      role: "Lead Middle East Curator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "October 8, 2026",
    readTime: "6 min read",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    tags: ["Dubai", "Luxury Stays", "Desert Safari", "Middle East"],
    excerpt: "While Dubai is globally renowned for architectural superlatives, its true magic reveals itself in the silence of the Al Marmoom desert reserve under starlit skies.",
    content: {
      lead: "Most visitors land in Dubai with a checklist of neon-lit records: the world's tallest tower, the biggest shopping malls, and man-made palm islands. Yet for the discerning traveler, the city's most intoxicating moments unfold when the high-rises fade into the rearview mirror and the golden ripples of the Arabian desert take over.",
      sections: [
        {
          heading: "1. The Soul of the Al Marmoom Desert Reserve",
          body: [
            "Far away from noisy dune-bashing convoys lies the protected Al Marmoom Desert Conservation Reserve. Here, private vintage Land Rovers glide gently along unfrequented dune paths, allowing you to spot Arabian oryx and sand gazelles grazing in the late afternoon glow.",
            "As the crimson sun dips below the horizon, your private Bedouin camp lights handcrafted brass lanterns. Dinner is prepared fresh on hot embers: spiced lamb ouzi, warm saffron flatbreads, and date syrup infusions served beneath an unfiltered canopy of stars."
          ],
          highlight: "True luxury in the desert isn't about horsepower; it is about profound stillness, velvet skies, and warm hospitality.",
          image: {
            src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
            caption: "The tranquil sunset over golden sand dunes in the Arabian desert."
          }
        },
        {
          heading: "2. Al Fahidi: The Scent of Frankincense & Windtowers",
          body: [
            "Cross the historic Dubai Creek in a private wooden abra boat at 7:30 AM before the daytime humidity rises. You will arrive at the Al Fahidi Historical Neighbourhood, where coral-stone courtyard residences have been restored into boutique calligraphy galleries and artisanal coffee museums.",
            "Spend an hour with an Emirati storyteller sipping gahwa infused with cardamom and rosewater, learning how early pearling families survived the summer heat using ingenious barjeel windtowers."
          ]
        },
        {
          heading: "3. Rooftop Dining Above the Clouds",
          body: [
            "When you do return to the skyline, skip the generic observation decks. Opt instead for an evening terrace table at At.mosphere on Level 122 of the Burj Khalifa or Ce La Vi overlooking the illuminated Museum of the Future.",
            "Pairing world-class culinary artistry with panoramic views of the Arabian Gulf makes for an unforgettable crescendo to any Emirati escape."
          ]
        }
      ],
      takeaways: [
        "Book a private conservation reserve tour rather than mass dune-bashing convoys.",
        "Visit Al Fahidi historical district early in the morning for quiet photography.",
        "Opt for sunset dinners in the desert between October and April for pleasant 22°C evenings."
      ]
    },
    relatedPackageSlug: "dubai-luxury-escape-burj-khalifa-desert-safari",
    relatedPackageTitle: "Dubai Luxury Escape: Burj Khalifa & Private Desert Safari"
  },
  {
    slug: "bali-secret-waterfalls-and-clifftop-villas",
    title: "The Connoisseur's Guide to Bali: Secluded Waterfalls & Jungle Sanctuaries",
    subtitle: "From private infinity pools perched over the Ayung River to dawn blessings in remote water temples.",
    category: "Culture & Heritage",
    author: {
      name: "Maya Chen",
      role: "Southeast Asia Travel Designer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "September 24, 2026",
    readTime: "8 min read",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    tags: ["Bali", "Indonesia", "Wellness", "Villas", "Culture"],
    excerpt: "Bali remains one of the world's most spiritual travel destinations when navigated away from congested tourist hotspots. Here is how our curators design the ultimate slow-travel Balinese holiday.",
    content: {
      lead: "There are two Balis. The first is busy beach clubs and traffic jams in Canggu. The second is an ethereal world of misty ravines, sacred banyan trees, and centuries-old subak irrigation canals where time slows down to the cadence of gamelan music.",
      sections: [
        {
          heading: "1. The Sacred Solitude of Ubud's Rainforests",
          body: [
            "Waking up at 6:00 AM in an open-air teak villa surrounded by rainforest mist is a transformative sensory experience. The morning air smells of lemongrass, damp volcanic stone, and frangipani blossoms.",
            "Our private guides escort travelers to Tirta Empul or lesser-known Sebatu water temple before tourist buses arrive, allowing you to participate in a tranquil Melukat purification ritual guided by a local priest."
          ],
          highlight: "The morning mist lifting over Ubud's Ayung valley is a reminder that travel is best enjoyed at the speed of nature.",
          image: {
            src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
            caption: "Emerald rice paddies of Tegallalang bathed in golden morning light."
          }
        },
        {
          heading: "2. Beyond the Crowds: The Hidden Falls of North Bali",
          body: [
            "While southern waterfalls often feature queues for photos, driving north past Lake Beratan reveals untouched cascades like Sekumpul and Banyumala. Reached via lush bamboo bridges and private stepping stones, the spray from these 80-meter falls creates a refreshing microclimate.",
            "Enjoy a gourmet picnic basket prepared by your private villa chef right by the natural pool."
          ]
        },
        {
          heading: "3. Clifftop Sanctuaries in Uluwatu",
          body: [
            "End your journey on the limestone cliffs of Uluwatu. Perched 100 meters above the Indian Ocean, villas here offer uninterrupted horizon views where you can watch pods of spinner dolphins during breakfast and celebrate fiery sunsets with fresh grilled seafood."
          ]
        }
      ],
      takeaways: [
        "Split your stay: 4 nights in Ubud for rainforest wellness, 3 nights in Uluwatu for clifftop ocean vistas.",
        "Engage with a private local Balinese guide for authentic access to village temple ceremonies.",
        "Pre-book private fast-boat transfers if visiting Nusa Penida or the Gili Islands."
      ]
    },
    relatedPackageSlug: "bali-tropical-paradise-ubud-seminyak",
    relatedPackageTitle: "Bali Tropical Paradise: Ubud Villas & Seminyak Coast"
  },
  {
    slug: "maldives-overwater-villas-guide",
    title: "Choosing Your Maldives Atoll: House Reefs, Private Seaplanes & Overwater Living",
    subtitle: "A comprehensive insider blueprint to selecting the perfect private island resort for couples and families.",
    category: "Luxury Stays",
    author: {
      name: "Kabir Mehra",
      role: "Island & Marine Concierge",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "September 15, 2026",
    readTime: "7 min read",
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
    tags: ["Maldives", "Overwater Villa", "Honeymoon", "Diving"],
    excerpt: "With over 1,200 coral islands scattered across 26 atolls, no two Maldivian resorts are identical. Here is how to choose between sunset overwater villas, house reefs, and seaplane transfers.",
    content: {
      lead: "From 3,000 feet in the air aboard a Twin Otter seaplane, the Maldives resembles scattered aquamarine gemstones resting on cobalt silk. Stepping off the pontoon onto wooden jetties surrounded by turquoise shallows, travelers quickly realize why this remains the global pinnacle of barefoot luxury.",
      sections: [
        {
          heading: "1. Seaplane vs. Speedboat: Setting the Stage",
          body: [
            "Resorts located in North or South Male Atolls are reached via 20-45 minute luxury speedboat transfers. This is ideal for late-night arrivals from India or the Middle East, as seaplanes only operate during daylight hours.",
            "However, if you crave true Robinson Crusoe seclusion, an atoll requiring a 35-minute seaplane flight (such as Baa Atoll, a UNESCO Biosphere Reserve) delivers unmatched coral health, manta ray aggregations, and silence."
          ],
          highlight: "A seaplane flight over the atolls isn't merely transit; it is one of the world's most breathtaking scenic aerial flights.",
          image: {
            src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
            caption: "Overwater bungalows extending over turquoise crystal lagoons in the Maldives."
          }
        },
        {
          heading: "2. Sunset vs. Sunrise Overwater Villas",
          body: [
            "Sunset-facing villas capture the golden hour right from your private sundeck and infinity plunge pool, ideal for champagne toasts. However, sunrise villas tend to be cooler during the afternoon heat and offer prime snorkel conditions with calmer morning currents."
          ]
        },
        {
          heading: "3. The House Reef Factor",
          body: [
            "Not every luxury resort has an accessible house reef. If marine life is your passion, prioritize islands where the reef drop-off is within 30 meters of your villa deck. You'll encounter hawksbill turtles, harmless blacktip reef sharks, and schools of blue tang within minutes of slipping into your fins."
          ]
        }
      ],
      takeaways: [
        "Choose Baa or Ari Atoll if snorkeling with whale sharks and mantas is on your wishlist.",
        "Confirm all-inclusive dine-around plans in advance to avoid steep à la carte bills.",
        "Indian passport holders enjoy 30-day free visa on arrival with confirmed hotel bookings."
      ]
    },
    relatedPackageSlug: "maldives-luxury-water-villa-retreat",
    relatedPackageTitle: "Maldives All-Inclusive Overwater Villa Retreat"
  },
  {
    slug: "japan-cherry-blossom-luxury-guide",
    title: "Sakura & Serenity: Experiencing Japan's Cherry Blossoms in Private Ryokans",
    subtitle: "Navigating blooming season with private onsen baths, kaiseki feasts, and exclusive geisha district walks.",
    category: "Destinations",
    author: {
      name: "Elena Rostova",
      role: "East Asia Cultural Specialist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "August 30, 2026",
    readTime: "9 min read",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
    tags: ["Japan", "Sakura", "Ryokan", "Kyoto", "Tokyo"],
    excerpt: "Cherry blossom season in Kyoto and Hakone is celebrated worldwide, but peak crowds can overwhelm. Here is how bespoke planning unlocks private viewing gardens and unforgettable thermal spring retreats.",
    content: {
      lead: "In Japanese culture, cherry blossom (sakura) viewing is known as hanami — a poignant celebration of the ephemeral nature of life. When millions of pale pink petals drift softly through ancient shrine gardens, the country transforms into a living watercolor painting.",
      sections: [
        {
          heading: "1. The Art of the Private Ryokan",
          body: [
            "Nothing compares to checking into a centuries-old ryokan in Hakone or Arashiyama. Tatami-matted suites look out onto moss-carpeted gardens framed by flowering weeping cherry trees.",
            "Soaking in your own private outdoor rotenburo hot spring bath as sakura petals drift onto the steaming mineral water is the pinnacle of Japanese restorative wellness."
          ],
          highlight: "A private ryokan experience engages all five senses: cedar scents, mineral waters, exquisite seasonal cuisine, and total stillness.",
          image: {
            src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
            caption: "Kyoto's historic Yasaka Pagoda framed by blooming spring cherry blossoms."
          }
        },
        {
          heading: "2. The Multi-Course Kaiseki Masterpiece",
          body: [
            "Dinner at a luxury ryokan is a theatrical celebration of seasonality. Kaiseki chefs curate 10 to 12 courses highlighting spring ingredients: bamboo shoots (takenoko), mountain vegetables, melt-in-your-mouth A5 Miyazaki Wagyu, and sashimi carved with surgical precision.",
            "Each lacquerware bowl and ceramic plate is chosen specifically to complement the floral theme of spring."
          ]
        },
        {
          heading: "3. Private Access in Historic Gion",
          body: [
            "While daytime Gion in Kyoto sees heavy foot traffic, our private cultural liaisons arrange private evening tea ceremonies and lantern-lit strolls through private preserved alleys, accompanied by licensed geiko and maiko artists."
          ]
        }
      ],
      takeaways: [
        "Plan cherry blossom itineraries 6–8 months in advance to secure top-tier ryokan suites.",
        "Include the Shinkansen Gran Class bullet train for ultra-smooth travel between Tokyo and Kyoto.",
        "Mid-March to mid-April offers optimal bloom depending on regional latitude."
      ]
    },
    relatedPackageSlug: "japan-golden-route-tokyo-kyoto-osaka",
    relatedPackageTitle: "Japan Golden Route: Tokyo, Kyoto & Mt. Fuji Ryokans"
  },
  {
    slug: "rajasthan-royal-havelis-palace-trains",
    title: "Living Like Royalty: The Restored Heritage Havelis of Rajasthan",
    subtitle: "Step inside centuries-old royal residences where Maharaja hospitality meets bespoke private dining under starry desert skies.",
    category: "Culture & Heritage",
    author: {
      name: "Aarav Singhania",
      role: "Lead Middle East & Heritage Curator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "August 12, 2026",
    readTime: "6 min read",
    heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85",
    tags: ["Rajasthan", "Heritage", "Palaces", "Jaipur", "Udaipur"],
    excerpt: "From the mirrored courtyards of Udaipur's Lake Palace to intimate desert fortress stays in Jaisalmer, experience the royal traditions and culinary secrets of Rajasthan.",
    content: {
      lead: "Rajasthan is India's land of kings — an intoxicating tapestry of amber sandstone fortresses, mirror-mosaic halls, and desert melodies that echo centuries of chivalry and grandeur.",
      sections: [
        {
          heading: "1. The Magic of Udaipur's Floating Palaces",
          body: [
            "Arriving at a white marble palace in the center of Lake Pichola by royal wooden barge is an entrance unlike any other in the world. As rose petals are showered upon your arrival and liveried footmen escort you to your royal suite, the timeless allure of Rajput hospitality comes alive.",
            "Watch the golden sunset reflect across the City Palace while traditional sitar maestros play soulful ragas on the lakeside terrace."
          ],
          highlight: "Rajasthan does not just tell stories of royalty — it invites you to live within their living chambers.",
          image: {
            src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
            caption: "Jaipur's majestic Hawa Mahal reflecting warm pink sandstone tones."
          }
        },
        {
          heading: "2. Private Artisanal Workshops in Jaipur",
          body: [
            "Jaipur's walled Pink City is the gemstone and hand-block printing capital of Asia. Skip commercial bazaars for private atelier visits in 200-year-old havelis, where fifth-generation emerald cutters and natural dye block-printers share master craft secrets."
          ]
        }
      ],
      takeaways: [
        "October through March offers crisp, delightful weather averaging 24°C.",
        "Opt for boutique restored havelis like Samode or Rohet Garh for authentic aristocratic intimacy.",
        "Allow your private chauffeur to navigate winding old-city alleyways stress-free."
      ]
    },
    relatedPackageSlug: "rajasthan-royal-heritage-jaipur-udaipur-jodhpur",
    relatedPackageTitle: "Royal Rajasthan: Forts, Palaces & Desert Havelis"
  },
  {
    slug: "packing-smart-for-luxury-island-getaways",
    title: "The Art of Packing Light: A Masterclass for Luxury Island Escapes",
    subtitle: "How to travel with effortless elegance, protect high-end tech, and comply with strict seaplane baggage allowances.",
    category: "Travel Tips",
    author: {
      name: "Kabir Mehra",
      role: "Island & Marine Concierge",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "July 28, 2026",
    readTime: "5 min read",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=85",
    tags: ["Packing", "Luggage", "Islands", "Travel Tips"],
    excerpt: "Seaplane transfers in the Maldives and boat charters in Southeast Asia carry strict 20kg limits. Here is how our veteran travel designers pack for high luxury with zero stress.",
    content: {
      lead: "True luxury is travel unburdened by heavy bags. When heading to tropical archipelagos like the Maldives, Bali, or Phuket, excessive luggage only hinders your ease of movement. Curating a high-quality capsule wardrobe allows you to look chic from morning beach strolls to candlelit dinners.",
      sections: [
        {
          heading: "1. The Natural Linen Capsule Wardrobe",
          body: [
            "In high-humidity coastal climates, synthetic fabrics trap heat. Invest in European-milled flax linens and featherweight organic cottons in warm earth tones: oatmeal, terracotta, ivory, and olive.",
            "Linen shirts transition effortlessly from a morning catamaran charter to an evening fine-dining pavilion with rolled sleeves and tailored linen trousers."
          ],
          highlight: "Linen's natural wrinkles are part of its relaxed luxury charm — embrace them.",
          image: {
            src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
            caption: "Pristine white sand beaches and aquamarine waters of tropical archipelagos."
          }
        },
        {
          heading: "2. Respecting the 20kg Seaplane Rule",
          body: [
            "Maldivian seaplane operators strictly enforce a 20kg checked baggage plus 5kg hand luggage rule. Heavy hardcover books and excessive footwear are the primary culprits for excess weight fees.",
            "A pair of versatile Italian leather slides, lightweight espadrilles, and reef-safe water shoes are all the footwear you need for an island escape."
          ]
        },
        {
          heading: "3. Tech & Skincare Essentials",
          body: [
            "Always pack non-nano mineral reef-safe sunscreen (SPF 50+) to protect vulnerable coral reefs. Keep your passport, emergency medications, underwater action camera, and noise-cancelling headphones in a waterproof floating dry bag inside your daypack."
          ]
        }
      ],
      takeaways: [
        "Stick to a coordinated neutral color palette for endless outfit combinations.",
        "Always use reef-safe mineral sunscreens to preserve local coral reef ecosystems.",
        "Carry a compact multi-currency Forex card and lightweight waterproof phone pouch."
      ]
    }
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES_DATA.find((a) => a.slug === slug);
}

export function getAllArticleCategories(): string[] {
  return ["All", "Destinations", "Luxury Stays", "Culture & Heritage", "Travel Tips"];
}
