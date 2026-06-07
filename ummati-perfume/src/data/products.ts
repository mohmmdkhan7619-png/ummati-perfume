import { Product, CategoryType, Testimonial } from '../types';

// Curated collections that serve as featured, best sellers, or new arrivals
const CURATED_PRODUCTS: Product[] = [
  {
    id: 'perfume-01',
    name: 'Dehn Al Oud Amiri',
    category: 'Perfumes',
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    isFeatured: true,
    scentProfile: 'Oud, Warm Woody, Sweet Leather',
    description: 'An exceptional, highly concentrated EDP featuring pure Cambodi Oudh blended with rich, warm spices and subtle hints of sweet leather. The definition of spiritual luxury and timeless Arabic heritage.',
    sizes: ['50ml', '100ml'],
    notes: {
      top: 'Spicy Cardamom, Sun-kissed Saffron, Nutmeg',
      heart: 'Royal Cambodi Oudh, Damascus Rose, Warm Cedar',
      base: 'Deep Patchouli, Sandalwood, Dark Amber, Leather'
    },
    features: ['Sillage: Heavy (12h+)', 'Concentration: Extrait de Parfum', '100% Halal Ingredients']
  },
  {
    id: 'perfume-02',
    name: 'Amir Al Qulub (Prince of Hearts)',
    category: 'Perfumes',
    price: 145,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    isFeatured: true,
    isNewArrival: true,
    scentProfile: 'Amber, Velvet Vanilla, Bergamot',
    description: 'An alluring French-Oriental fragrance capturing hearts with crisp Mediterranean citrus top notes, melting into a majestic heart of amber and smooth vanilla. Designed for the modern gentleman who values elegance.',
    sizes: ['50ml', '100ml', '200ml'],
    notes: {
      top: 'Calabrian Bergamot, Lemon, Sicilian Orange',
      heart: 'Mediterranean Fruits, Warm Ambergris',
      base: 'Madagascar Vanilla, White Musk, Celestial Amber'
    },
    features: ['Sillage: Moderate to High', 'Concentration: Eau de Parfum', 'Fresh yet Deep Scent']
  },
  {
    id: 'perfume-03',
    name: 'Royal Amber Absolute',
    category: 'Perfumes',
    price: 165,
    originalPrice: 195,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    scentProfile: 'Sweet Amber, Myrrh, Honeyed Floral',
    description: 'An opulent journey through ancient spice routes. Rich black amber paired with royal myrrh, coated in a luscious, subtle layer of warm white honey and premium Taif rose.',
    sizes: ['100ml'],
    notes: {
      top: 'Taif Rose, Incense, Bergamot',
      heart: 'Myrrh, Labdanum, Warm Honey',
      base: 'Black Amber, Siam Benzoin, Sandalwood'
    },
    features: ['unisex formulation', '18 Hours Sillage', 'Rich oriental character']
  },
  {
    id: 'attar-01',
    name: 'Musk Tahara Premium',
    category: 'Attars',
    price: 45,
    rating: 4.95,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    isFeatured: true,
    scentProfile: 'Creamy Pure Musk, White Lotus, Powdery',
    description: 'The golden standard of cleanliness and purity. This thick, creamy, alcohol-free white Musk Tahara carries fresh, clean, powdery florals, leaving a highly spiritual and comforting aroma.',
    sizes: ['6ml (1/2 Tola)', '12ml (1 Tola)'],
    notes: {
      top: 'White Lotus, Creamy Accords, Violet Leaf',
      heart: 'White Rose, Powdery Iris, Honey',
      base: 'Pure White Musk, Sandalwood, Coconut Touch'
    },
    features: ['100% Pure Oil (No Alcohol)', 'Highly recommended for Sunnah purity', 'Includes premium glass applicator']
  },
  {
    id: 'attar-02',
    name: 'Miskeen Al-Kaaba Attar',
    category: 'Attars',
    price: 75,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&q=80&w=600',
    isFeatured: true,
    scentProfile: 'Rich Kaaba Accord, Oud, Black Musk, Rose',
    description: 'An authentic formulation inspired by the sacred scent applied to the Holy Kaaba. Infused with absolute black musk, deep agarwood oil, and pure rose damascena. Truly raises spiritual state.',
    sizes: ['6ml (1/2 Tola)', '12ml (1 Tola)'],
    notes: {
      top: 'Black Musk, Royal Saffron, Taif Rose',
      heart: 'Ambergris, Rich Myrrh, Frankincense',
      base: 'Aged Dehn Al Oud, Earthy Patchouli, Sandalwood'
    },
    features: ['Inspired by the Kaaba fragrance', 'Ultra concentrated premium oil', 'Alcohol-free and long-lasting']
  },
  {
    id: 'bakhoor-01',
    name: 'Bakhoor Ummati Royal',
    category: 'Bakhoor',
    price: 55,
    originalPrice: 65,
    rating: 4.8,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    isFeatured: true,
    scentProfile: 'Smoky Agarwood, Oud, Sweet Saffron',
    description: 'Indulge in our signature home scent. Premium agarwood chips deeply saturated with essential perfume oils of Taif rose, musk, and natural ambergris. Unlocks a tranquil, peaceful atmosphere in any room.',
    sizes: ['40g Box', '80g Jar'],
    notes: {
      top: 'Sweet Peach, Saffron, Lavender',
      heart: 'Taif Rose, Jasmine, Cedarwood',
      base: 'Agarwood (Oud) Chips, Pure Musk, Amber'
    },
    features: ['Includes charcoal tablets', 'Slow-burning authentic chips', 'Great for Friday / Eid preparation']
  },
  {
    id: 'bakhoor-02',
    name: 'Medina Rose & Sandalwood Bakhoor',
    category: 'Bakhoor',
    price: 49,
    rating: 4.7,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600',
    isNewArrival: true,
    scentProfile: 'Sweet Rose, Soft Sandalwood, Jasmine',
    description: 'A soothing and refreshing blend of Medina rose petals, luxurious soft sandalwood notes, and grounding white jasmine. Creates an atmosphere of warmth and hospitality specified for families.',
    sizes: ['50g Jar'],
    notes: {
      top: 'Damask Rose, Pink Grapefruit, Bergamot',
      heart: 'Medina Jasmine, Patchouli, Orris Root',
      base: 'Creamy Sandalwood, Agarwood, White Musk'
    },
    features: ['Soft and non-overpowering fragrance', 'Perfect for everyday home use', 'Sourced from natural plant oils']
  },
  {
    id: 'burner-01',
    name: 'Imperial Oud Electric Burner',
    category: 'Bakhoor Burners',
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 61,
    image: 'https://images.unsplash.com/photo-1563211513-efdc76fac9e1?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    scentProfile: 'Gold-plated luxury geometric burner',
    description: 'An elite electronic burner crafted in durable, heat-resistant metal with beautiful gold-plated geometric Arabic calligraphy patterns. Features a temperature control knob for optimal bakhoor heating.',
    sizes: ['Standard Size (Gold)'],
    features: ['Temperature Adjusting Control', 'Automatic Safety Shut-off', 'No Charcoal Required', 'Slick Arabic Art Design']
  },
  {
    id: 'burner-02',
    name: 'Traditional Royal Brass Mabkhara',
    category: 'Bakhoor Burners',
    price: 39,
    rating: 4.6,
    reviewsCount: 37,
    image: 'https://images.unsplash.com/photo-1578996834218-f0761e389b89?auto=format&fit=crop&q=80&w=600',
    scentProfile: 'Heavy-carved brass charcoal burner',
    description: 'A classically styled heavy brass Mabkhara burner for charcoal heating. Beautifully hand-carved in a historical Islamic style, complete with a removable burner tray and ash catcher.',
    sizes: ['Medium Brass', 'Large Brass'],
    features: ['Solid heavy brass construction', 'Removable inner ash tray', 'Heat-insulated wooden base', 'Sourced from Moroccan artisans']
  },
  {
    id: 'gift-01',
    name: 'Ummati Luxury Fragrance Gift Box',
    category: 'Islamic Gifts',
    price: 179,
    originalPrice: 199,
    rating: 5.0,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600',
    isFeatured: true,
    isNewArrival: true,
    scentProfile: 'All-in-one curated luxury set',
    description: 'An premium gift box to present during weddings, Eid, Ramadan, or for a beloved family member. Contains one EDP (50ml), one Attar (12ml), one premium Bakhoor (40g), and a luxury 99-bead Tasbeeh.',
    sizes: ['Classic Gift Box Edition'],
    features: ['Stunning Emerald and Gold packaging', 'Satin-lined premium padding', 'Includes custom handwritten gift message', '100% Satisfaction Guaranteed']
  },
  {
    id: 'mat-01',
    name: 'Kaaba Kiswah Orthopedic Prayer Mat',
    category: 'Prayer Mats',
    price: 95,
    rating: 4.95,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
    isBestSeller: true,
    isFeatured: true,
    scentProfile: 'Extra cushion, Kaaba embroidery',
    description: 'A luxurious prayer rug replicating the beautiful gold embroidery of the Holy Kaaba’s Kiswah. Features dense pressure-relieving foam padding designed to safeguard joints during Sajdah.',
    sizes: ['Large (80cm x 120cm)'],
    features: ['2.5cm Double-Layer Memory Foam', 'High-quality gold silk threadwork', 'Non-slip grip backing', 'Spiritual and supportive design']
  },
  {
    id: 'tasbeeh-01',
    name: 'Royal 99 Jade Stone Tasbeeh',
    category: 'Tasbeeh',
    price: 29,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1542617478-f73cdff3afda?auto=format&fit=crop&q=80&w=600',
    scentProfile: 'Healing Jade Beads, Silk Tassel',
    description: 'Meticulously crafted with 99 hand-polished genuine green Jade beads, punctuated by premium gold-plated separators and finished with a luxury silk tassel. Cool to touch and smooth during prayers.',
    sizes: ['99 beads - 8mm Size'],
    features: ['100% Genuine Natural Jade Stones', 'Durable high-strength nylon thread', 'Comforting cooling touch', 'Exquisite presentation velvet pouch']
  }
];

// List of realistic perfumes to expand systematically
const PERFUME_NAMES = [
  'Royal Oudh Supreme', 'Saffron Velvet', 'White Patchouli Royale', 'Kashmiri Saffron Essence',
  'Rose Damascus Intense', 'Midnight Ambergris', 'Islamic Mystic Musc', 'Oud-wa-Ward (Oud & Rose)',
  'Majestic Sandalwood', 'Habibi Musk', 'Medina Jasmine Oud', 'Sultan Al-Gharb',
  'Desert Night Amber', 'Emerald Oudh', 'Golden Sands Nectar', 'Haramain Velvet',
  'Kiswa Al Kaaba Essence', 'Asr Al-Dahab', 'Shaykh Al-Oud', 'Qurashi Royal Musc',
  'Bakhur Musk Bloom', 'Majesty Patchouli', 'Al-Aqsa Saffron Rose', 'Royal Al-Andalus Musk',
  'Makkah Ambergris Gold', 'Sublime Dehn Al Oudh', 'Zulfiqar Musky Woods', 'Layl Al-Arab',
  'Jannat Al Firdous EDP', 'Sufi Soul Sandalwood', 'Amir Velvet Woods', 'Rose de Makkah',
  'Mukhallat Dehn Al Oudh', 'Tears of Taif Rose', 'Sweet Vanilla Oudh', 'Sacred Frankincense Oil',
  'Royal Oud Malaki', 'Pure Black Musk', 'Golden Oudh Musk', 'Whispers of Waqf',
  'Hajar Al-Aswad Accord', 'Anwar Al-Madina Perfume', 'Scent of Zamzam', 'Badr Al-Budur Rose',
  'Al-Kauthar Vetiver', 'Sufi Mystic Whiffs', 'Ruh Khus (Absolute Vetiver)', 'Amber Oudh Elixir',
  'Warm Cardamom Absolute', 'Nurturing Nard'
];

//Scent profiling arrays
const SCENT_PROFILES = [
  'Oud, Spicy Saffron, Deep Amber', 'Pure Musk, Damascus Rose, Sweet Amber',
  'Crushed Patchouli, Sandalwood, Fresh Bergamot', 'Warm Cardamom, Leather, Sweet Vanilla',
  'Aged Oudh Wood, Rich Smoke, Incense', 'Taif Rose Petals, Saffron, Sandalwood',
  'White Lotus, Clean Powdery Musk, Creamy Sandalwood', 'Sweet Honey, Ambergris, Soft Vanilla'
];

const FRAGRANCE_NOTES_TEMPLATES = [
  {
    top: 'Bergamot, Pink Pepper, Saffron',
    heart: 'Taif Rose, Jasmine Absolute, Cedarwood',
    base: 'Cambodian Oudh, Sandalwood, Golden Amber, White Musk'
  },
  {
    top: 'Sweet Mandarin, White Tea, Cardamom',
    heart: 'Orange Blossom, Damascus Rose, Saffron',
    base: 'Siam Benzoin, Vetiver, Creamy Sandalwood, Vanilla'
  },
  {
    top: 'Nutmeg, Incense, Lemon Peel',
    heart: 'Clove Buds, Ambergris, Labdanum',
    base: 'Deep Black Musk, Oud, Oakmoss, Leather'
  },
  {
    top: 'Lavender, Honey Nectar, Bergamot',
    heart: 'Geranium, Myrrh, Patchouli',
    base: 'Civet Musk, Cedar, Sandalwood, Vanilla Pods'
  }
];

// Programmatic Generator to add up to 150+ products total!
// Let's generate 140 virtual products beautifully to ensure search, sorting, counts, and category testing is fully authentic.
const generateVirtualProducts = (): Product[] => {
  const list: Product[] = [];
  
  // 1. Generate 140 perfumes and attars to make the Perfumes category huge and impressive!
  for (let i = 0; i < 140; i++) {
    const pName = PERFUME_NAMES[i % PERFUME_NAMES.length];
    const isAttar = i % 4 === 0;
    const cat: CategoryType = isAttar ? 'Attars' : 'Perfumes';
    
    // Add variations so names don't repeat exactly (e.g. "Royal Oudh Supreme No. 3")
    const variation = Math.floor(i / PERFUME_NAMES.length) + 1;
    const finalName = variation > 1 ? `${pName} (No. ${variation})` : pName;
    
    const price = Math.floor(45 + (i * 1.5) % 150);
    const hasDiscount = (i % 3 === 0);
    const originalPrice = hasDiscount ? Math.floor(price * 1.25) : undefined;
    
    const rating = parseFloat((4.4 + (i % 6) * 0.1).toFixed(2));
    const reviewsCount = Math.floor(10 + (i * 7) % 240);
    
    const profile = SCENT_PROFILES[i % SCENT_PROFILES.length];
    const notesTemplate = FRAGRANCE_NOTES_TEMPLATES[i % FRAGRANCE_NOTES_TEMPLATES.length];
    
    // Select an attractive Unsplash perfume image variation
    const imageIds = [
      'photo-1541643600914-78b084683601',
      'photo-1594035910387-fea47794261f',
      'photo-1523293182086-7651a899d37f',
      'photo-1588405748373-122b2321bc31',
      'photo-1592945403244-b3fbafd7f539',
      'photo-1615655096345-61a54750068d',
      'photo-1595425970377-c9703cf48b6d',
      'photo-1519669556878-63bdad8a1a49'
    ];
    const imgUrl = `https://images.unsplash.com/${imageIds[i % imageIds.length]}?auto=format&fit=crop&q=80&w=600`;

    list.push({
      id: `generated-${isAttar ? 'attar' : 'perfume'}-${i}`,
      name: finalName,
      category: cat,
      price,
      originalPrice,
      rating,
      reviewsCount,
      image: imgUrl,
      isBestSeller: i % 15 === 0,
      isNewArrival: i % 12 === 1,
      scentProfile: profile,
      description: `A masterfully formulated authentic ${isAttar ? 'attenuating Attar oil' : 'luxury Eau de Parfum'}. Sourced from the finest ingredients to invoke memories of spiritual tranquility and oriental royalty. Highly recommended for fragrance lovers.`,
      sizes: isAttar ? ['6ml', '12ml'] : ['50ml', '100ml'],
      notes: notesTemplate,
      features: ['Sillage: Highly satisfying', '100% Premium Halal blend', 'Sustainably crafted']
    });
  }

  // 2. Generate a few accessories like more mats, burners, and gift sets to populate categories beautifully
  const categoryTemplates: { cat: CategoryType; name: string; basePrice: number; img: string }[] = [
    {
      cat: 'Bakhoor',
      name: 'Oud Al-Khanjar Scented Powder',
      basePrice: 35,
      img: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600'
    },
    {
      cat: 'Bakhoor Burners',
      name: 'Mini USB Portable pocket burner',
      basePrice: 29,
      img: 'https://images.unsplash.com/photo-1563211513-efdc76fac9e1?auto=format&fit=crop&q=80&w=600'
    },
    {
      cat: 'Islamic Gifts',
      name: 'Kaaba Inspired Deluxe Quran Set',
      basePrice: 120,
      img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600'
    },
    {
      cat: 'Prayer Mats',
      name: 'Silky Pocket-Size Travel Prayer Rug',
      basePrice: 22,
      img: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&q=80&w=600'
    },
    {
      cat: 'Tasbeeh',
      name: 'Warm Olivewood 99-bead Muslim Tasbih',
      basePrice: 19,
      img: 'https://images.unsplash.com/photo-1542617478-f73cdff3afda?auto=format&fit=crop&q=80&w=600'
    },
    {
      cat: 'Islamic Accessories',
      name: 'Silver Calligraphy Car Pendant (Ayat Al-Kursi)',
      basePrice: 15,
      img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600'
    }
  ];

  for (let j = 0; j < 18; j++) {
    const template = categoryTemplates[j % categoryTemplates.length];
    const indexStr = Math.floor(j / categoryTemplates.length) + 1;
    list.push({
      id: `generated-accessory-${j}`,
      name: indexStr > 1 ? `${template.name} (Vol. ${indexStr})` : template.name,
      category: template.cat,
      price: template.basePrice + (j * 3) % 40,
      rating: parseFloat((4.5 + (j % 5) * 0.1).toFixed(2)),
      reviewsCount: 12 + j * 9,
      image: template.img,
      description: `A thoughtfully crafted piece from our selection of premium ${template.cat}. Designed to add a Touch of elegance and spiritual awareness to your daily lifestyle. Makes an incredible gift for loved ones.`,
      sizes: ['One Size'],
      features: ['Hand-checked for absolute quality', 'Authentic materials', 'Designed for the Islamic household']
    });
  }

  return list;
};

export const ALL_PRODUCTS: Product[] = [
  ...CURATED_PRODUCTS,
  ...generateVirtualProducts()
];

// Default testimonials structure
export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-01',
    name: 'Brother Farhan K.',
    rating: 5,
    comment: 'The Dehn Al Oud Amiri is absolutely phenomenal. I wore it for Jumuah and got multiple questions about what scent I was wearing. The sillage is heavy and extremely rich. It indeed brings a feeling of spiritual tranquility.',
    date: 'May 28, 2026',
    verified: true,
    productName: 'Dehn Al Oud Amiri'
  },
  {
    id: 'rev-02',
    name: 'Sister Aisha M.',
    rating: 5,
    comment: 'I ordered the Musk Tahara and the Kaaba Kiswah Prayer Mat. The mat is so supportive on my knees, and the White Musk Tahara is incredibly clean and thick. Sincere thanks for providing such authentic, high quality products.',
    date: 'June 01, 2026',
    verified: true,
    productName: 'Musk Tahara Premium'
  },
  {
    id: 'rev-03',
    name: 'Anas S.',
    rating: 4,
    comment: 'Exceptional wood chips in the Bakhoor Ummati Royal. Slow burning, authentic aromatic smoke, not chemical at all. The gold packaging is beautiful. Excellent choice for gifting!',
    date: 'June 04, 2026',
    verified: true,
    productName: 'Bakhoor Ummati Royal'
  }
];
