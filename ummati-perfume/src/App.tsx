import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, ShieldCheck, Heart, Trash, AlignJustify, ArrowUpCircle, Award, Volume2, Search, SlidersHorizontal } from 'lucide-react';

import { ALL_PRODUCTS, INITIAL_TESTIMONIALS } from './data/products';
import { Product, CartItem, Order, CategoryType, Testimonial } from './types';

// Importing Custom components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AccountDrawer from './components/AccountDrawer';
import TasbeehWidget from './components/TasbeehWidget';
import Newsletter from './components/Newsletter';

const CATEGORIES: CategoryType[] = [
  'All',
  'Perfumes',
  'Attars',
  'Bakhoor',
  'Bakhoor Burners',
  'Islamic Gifts',
  'Prayer Mats',
  'Tasbeeh',
  'Islamic Accessories'
];

const FAST_SCENT_TAGS = ['All Scents', 'Oud', 'Musk', 'Amber', 'Saffron', 'Rose', 'Woody', 'Spicy', 'Patchouli', 'Lotus'];

export default function App() {
  // --- Persistent Storage State ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ummati_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ummati_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ummati_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // --- Search, Filters & Sorting State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedScentTag, setSelectedScentTag] = useState('All Scents');
  const [priceRange, setPriceRange] = useState<string>('All'); // 'All', 'Under30', '30to70', '70to140', 'Above140'
  const [sortBy, setSortBy] = useState<string>('default'); // 'default', 'priceAsc', 'priceDesc', 'ratingDesc'

  // --- Active Drawers & Modals Layout States ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isTasbeehOpen, setIsTasbeehOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- Promo codes / Cart options ---
  const [couponCode, setCouponCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // --- Notification System ---
  const [snackMessage, setSnackMessage] = useState<string | null>(null);

  // --- Effect Syncers ---
  useEffect(() => {
    localStorage.setItem('ummati_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ummati_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ummati_orders', JSON.stringify(orders));
  }, [orders]);

  // --- Notification Alert triggers ---
  const showSnackbar = (msg: string) => {
    setSnackMessage(msg);
    setTimeout(() => {
      setSnackMessage(null);
    }, 4500);
  };

  // --- Cart operations ---
  const handleAddToCart = (product: Product, size: string = 'One Size') => {
    setCart((prev) => {
      const match = prev.find((item) => item.product.id === product.id && item.selectedSize === size);
      if (match) {
        showSnackbar(`Updated quantity of ${product.name} (${size}) in your shopping cart.`);
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showSnackbar(`Added one ${product.name} (${size}) to your shopping cart.`);
        return [...prev, { product, quantity: 1, selectedSize: size }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, size: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.selectedSize === size
            ? { ...item, quantity: Math.max(item.quantity + change, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
    showSnackbar('Selected item was removed from your cart.');
  };

  // --- Wishlist operations ---
  const handleToggleWishlist = (product: Product) => {
    const isPresent = wishlist.some((item) => item.id === product.id);
    if (isPresent) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showSnackbar(`Removed ${product.name} from your bookmarked wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showSnackbar(`Added ${product.name} to your bookmarked wishlist.`);
    }
  };

  // --- Promo Application ---
  const handleApplyPromo = (code: string) => {
    if (code.trim().toUpperCase() === 'BARAKAH' || code.trim().toUpperCase() === 'UMMATI10') {
      setPromoApplied(true);
      showSnackbar('Success! 10% Barakah blessing discount applied.');
    } else {
      showSnackbar('Invalid discount voucher code. Sincere apologies.');
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setCouponCode('');
    showSnackbar('Coupon discount removed.');
  };

  // --- WhatsApp Order Link Compiler ---
  const executeWhatsAppOrder = (product?: Product, size?: string) => {
    let text = '';
    const phoneNum = '919876543210'; // Client's custom designated WhatsApp channel

    if (product) {
      // Single Item Fast order
      const finalSize = size || (product.sizes ? product.sizes[0] : 'Standard');
      text = `Salam Ummati Perfume House, I would like to order:
- Product: ${product.name}
- Scent Profile: ${product.scentProfile || 'Spiritual Essence'}
- Chosen Size: ${finalSize}
- Price: $${product.price}

Please let me verify shipping and COD options. JazakAllah Khair!`;
    } else {
      // Order direct from current shopping cart list
      if (cart.length === 0) {
        showSnackbar('Your shopping cart is currently empty. Start selecting fragrances first.');
        return;
      }
      const cartItemsStr = cart
        .map((item) => `- ${item.product.name} (${item.selectedSize}) × ${item.quantity} = $${item.product.price * item.quantity}`)
        .join('\n');
      
      const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      const discount = promoApplied ? subtotal * 0.1 : 0;
      const wrapFee = giftWrap ? 10 : 0;
      const finalTotal = subtotal - discount + wrapFee;

      text = `Salam Ummati Perfume House, I would like to purchase these items from my shopping selection:
${cartItemsStr}

- Calligraphy Gift Wrapping: ${giftWrap ? 'Yes' : 'No'}
${giftMessage ? `- Custom Message: "${giftMessage}"` : ''}
- Subtotal: $${subtotal}
${promoApplied ? `- Coupon Off: 10% Applied` : ''}
- Total: $${finalTotal.toFixed(1)}

Please guide me with delivery details. JazakAllah Khair!`;
    }

    const compiledUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
    window.open(compiledUrl, '_blank', 'noopener,noreferrer');
  };

  // --- Order placement successes ---
  const handleOrderSuccessHandler = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]); // Clear active cart
    setCheckoutModalOpen(false);
    showSnackbar(`Alhamdulillah! Your order (${order.trackingNumber}) has been placed successfully.`);
    setIsAccountOpen(true); // Open account drawer directly to track the order!
  };

  const handleClearHistory = () => {
    setOrders([]);
    showSnackbar('Order logs cleared.');
  };

  // --- Filter and Sort Core Logic (Slices across the massive 150+ product arrays) ---
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    // 1. Search term (case insensitive search in titles, categories, profiles)
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.scentProfile && product.scentProfile.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. Category selection
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    // 3. Fast Scent Tags filter
    const matchesScentTag =
      selectedScentTag === 'All Scents' ||
      (product.scentProfile && product.scentProfile.toLowerCase().includes(selectedScentTag.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(selectedScentTag.toLowerCase()));

    // 4. Price range selection
    let matchesPrice = true;
    if (priceRange === 'Under30') matchesPrice = product.price < 30;
    else if (priceRange === '30to70') matchesPrice = product.price >= 30 && product.price <= 70;
    else if (priceRange === '70to140') matchesPrice = product.price > 70 && product.price <= 140;
    else if (priceRange === 'Above140') matchesPrice = product.price > 140;

    return matchesSearch && matchesCategory && matchesScentTag && matchesPrice;
  });

  // Sort list execution
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'ratingDesc') return b.rating - a.rating;
    return 0; // default order
  });

  // --- Subgroup segments for home layout showcase ---
  const featuredProducts = ALL_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = ALL_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = ALL_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  // --- Checkout calculation fields ---
  const activeSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const activeDiscountAmount = promoApplied ? activeSubtotal * 0.1 : 0;
  const activeGiftWrapFee = giftWrap ? 10 : 0;
  const activeShippingFee = activeSubtotal > 150 || activeSubtotal === 0 ? 0 : 15;
  const activeGrandTotal = activeSubtotal - activeDiscountAmount + activeGiftWrapFee + activeShippingFee;

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      {/* Decorative Sophisticated Dotted Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-sophisticated-pattern z-0" />
      
      {/* 🚀 Sticky Header Navigation banner */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenTasbeeh={() => setIsTasbeehOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 🔮 Immersive Hero block featuring sliding quotes and CTAs */}
      <Hero
        onShopNow={() => {
          document.getElementById('bazaar_store_section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreCollection={() => {
          setSelectedCategory('All');
          document.getElementById('bazaar_store_section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewBestSellers={() => {
          setSelectedCategory('Perfumes');
          setSortBy('ratingDesc');
          document.getElementById('bazaar_store_section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onWhatsAppOrder={() => executeWhatsAppOrder()}
        onDiscoverNewArrivals={() => {
          showSnackbar('Filtering standard new arrivals catalog!');
          setSelectedCategory('All');
          setSortBy('default');
          document.getElementById('bazaar_store_section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Core Notification Snackbar */}
      <AnimatePresence>
        {snackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 p-4 bg-gradient-to-r from-emerald-950 to-neutral-900 border border-gold-400 text-stone-100 text-sm font-mono rounded-2xl shadow-2xl flex items-center gap-3 w-fit max-w-sm"
          >
            <div className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span className="flex-1 leading-normal">{snackMessage}</span>
            <button onClick={() => setSnackMessage(null)} className="text-stone-400 hover:text-white px-1">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">

        {/* ♛ SECTION 1: Featured collections (Luxury Bento Cards layout) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-mono tracking-widest text-gold-500 uppercase">PREMIUM CURATED TREASURES</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white gold-text-glow">
              Featured Luxuries
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto italic">
              "Where fragrance meets spirituality" - Discover some of our signature scents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onAddToCart={() => handleAddToCart(product)}
                onAddToWishlist={() => handleToggleWishlist(product)}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </section>


        {/* 🕌 SPECIAL INTERACTIVE CALLOUT: The Sunnah of Fragrance & Digital Tasbeeh widget */}
        <section className="py-12 bg-neutral-950/60 border-t border-b border-gold-600/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-neutral-900 to-emerald-950/20 p-8 sm:p-12 rounded-3xl border border-gold-600/15 gold-card-shadow">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full text-gold-400">
                  <span className="text-[10px] font-mono tracking-widest uppercase">Islamic Lifestyle & Faith</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                  Perfume & Prayer: The Beautiful Sunnah
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                  In Islamic tradition, fragrance is not merely an accessory — it carries deep spiritual value. Applying pleasant aromas like pure white Musk or Oudh wood is a celebrated Sunnah (tradition) of the beloved Prophet (PBUH), bringing peace of mind, focus in prayer, and cleanliness of spirit.
                </p>
                <div className="space-y-2 text-gold-300 italic text-xs font-serif pt-1">
                  <p>• "Beloved to me from this world: women, and pleasant scents, and the comfort of my eye is in prayer." (Nasa'i)</p>
                  <p>• Cleanliness and gentle fragrance enrich gatherings, Friday Jumuah, and home atmospheres.</p>
                </div>
                
                <div className="pt-2">
                  <button
                    id="trigger_tasbeeh_home_btn"
                    onClick={() => setIsTasbeehOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-neutral-950 font-mono text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <span>Launch Digital Tasbeeh Tool</span>
                    <span>📿</span>
                  </button>
                </div>
              </div>

              {/* Sidebar card containing interactive mini-widget */}
              <div className="lg:col-span-6 flex justify-center">
                <TasbeehWidget />
              </div>

            </div>
          </div>
        </section>


        {/* 🛒 MAIN BAZAAR SECTION (Advanced Product Search, Multi-Filter, and full inventory) */}
        <section id="bazaar_store_section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-mono tracking-widest text-gold-500 uppercase">UMMATI FRAGRANCE DIRECTORY</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white gold-text-glow">
              Explore Our Fragrant Bazaar
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto">
              Sift through our authentic collection of over 150 luxury perfumes, long-lasting attars, pure wood bakhoor, prayer mats, and Islamic gifts.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-thin border-b border-gold-600/10">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    id={`category_tab_btn_${cat.replace(' ', '_')}`}
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedScentTag('All Scents');
                    }}
                    className={`py-2 px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-gold-500 text-neutral-950 border-gold-300 font-bold scale-102 shadow-md'
                        : 'bg-neutral-900 text-stone-300 border-gold-600/15 hover:border-gold-500/40'
                    }`}
                  >
                    {cat} {cat === 'Perfumes' ? '(150+)' : ''}
                  </button>
                );
              })}
            </div>

            {/* Scent fast tags & Advanced layout selectors filter row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-neutral-900/60 p-4 rounded-2xl border border-gold-600/10">
              
              {/* Scent profiles pill filter */}
              <div className="md:col-span-6 flex flex-col space-y-1.5">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Scent Profiles / Ingredient Family</span>
                <div className="flex flex-wrap gap-1.5">
                  {FAST_SCENT_TAGS.map((tag) => {
                    const isSelected = selectedScentTag === tag;
                    return (
                      <button
                        id={`scent_tag_btn_${tag}`}
                        key={tag}
                        onClick={() => setSelectedScentTag(tag)}
                        className={`py-1 px-2.5 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? 'bg-gold-500/20 text-gold-300 border border-gold-400 font-semibold'
                            : 'bg-neutral-950 border border-gold-600/5 text-stone-400 hover:text-stone-300'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Tier Selection */}
              <div className="md:col-span-3 flex flex-col space-y-1.5">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Pricing limits</span>
                <select
                  id="bazaar_price_select"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-neutral-950 border border-gold-600/15 rounded-xl py-1.5 px-3 text-xs text-stone-300 focus:outline-none focus:border-gold-300 cursor-pointer"
                >
                  <option value="All">All Pricing Tiers</option>
                  <option value="Under30">Under $30 (Essential Blessings)</option>
                  <option value="30to70">$30 to $70 (Standard Elite)</option>
                  <option value="70to140">$70 to $140 (Royal Oud)</option>
                  <option value="Above140">Above $140 (Grand Collection)</option>
                </select>
              </div>

              {/* Catalog sorting */}
              <div className="md:col-span-3 flex flex-col space-y-1.5">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Sort Catalog</span>
                <select
                  id="bazaar_sort_select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-neutral-950 border border-gold-600/15 rounded-xl py-1.5 px-3 text-xs text-stone-300 focus:outline-none focus:border-gold-300 cursor-pointer"
                >
                  <option value="default">Default Relevance</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="ratingDesc">Ratings: Five Stars first</option>
                </select>
              </div>

            </div>

            {/* Results count indicator */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 px-1 pt-1">
              <span>FOUND: <strong className="text-gold-300">{sortedProducts.length}</strong> PRODUCTS MATCHED</span>
              {searchTerm || selectedCategory !== 'All' || selectedScentTag !== 'All Scents' || priceRange !== 'All' ? (
                <button
                  id="bazaar_reset_all_filters_btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedScentTag('All Scents');
                    setPriceRange('All');
                    setSortBy('default');
                  }}
                  className="text-gold-400 hover:underline hover:text-gold-300"
                >
                  Clear all filters ✕
                </button>
              ) : null}
            </div>

            {/* Actual dynamic grid container */}
            <AnimatePresence>
              {sortedProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-neutral-900 border border-gold-600/10 rounded-2xl space-y-3"
                >
                  <span className="text-3xl">🕌</span>
                  <h4 className="font-serif text-gold-300 font-semibold text-base">Mubarak! Sincere Apologies</h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    No items in our 150+ catalog matched your filters. Click 'Clear all filters' to start browsing again.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.some(item => item.id === product.id)}
                      onAddToCart={() => handleAddToCart(product)}
                      onAddToWishlist={() => handleToggleWishlist(product)}
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>


        {/* ♛ SECTION 3: Best Sellers & New Arrivals Segments */}
        <section className="py-12 bg-neutral-900/40 border-t border-gold-600/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Best Sellers block */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gold-600/15 pb-3">
                <h3 className="font-serif font-bold text-xl text-white flex items-center gap-2">
                  <span>♛ Best Sellers Collection</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bestSellers.map((product) => (
                  <div
                    id={`bestseller_item_row_${product.id}`}
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="flex bg-neutral-950 p-3 rounded-2xl border border-gold-600/5 hover:border-gold-500/20 cursor-pointer shadow-sm items-center gap-3 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-18 object-cover rounded-lg bg-neutral-900"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-mono text-gold-400">{product.category}</span>
                      <span className="font-semibold block truncate leading-tight mt-0.5 text-stone-100">{product.name}</span>
                      <span className="font-serif text-gold-300 font-bold block mt-1">${product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Arrivals block */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gold-600/15 pb-3">
                <h3 className="font-serif font-bold text-xl text-white flex items-center gap-2">
                  <span>✦ New Arrivals Section</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {newArrivals.map((product) => (
                  <div
                    id={`new_arrival_item_row_${product.id}`}
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="flex bg-neutral-950 p-3 rounded-2xl border border-gold-600/5 hover:border-gold-500/20 cursor-pointer shadow-sm items-center gap-3 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-18 object-cover rounded-lg bg-neutral-900"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-mono text-gold-400">{product.category}</span>
                      <span className="font-semibold block truncate leading-tight mt-0.5 text-stone-100">{product.name}</span>
                      <span className="font-serif text-gold-300 font-bold block mt-1">${product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* 💬 SECTION 4: Customer Reviews Board */}
        <section className="py-16 bg-neutral-950/40 border-t border-gold-600/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-mono tracking-widest text-gold-500 uppercase font-bold text-gold-400">FAITHFUL TESTIMONIALS</span>
              <h2 className="font-serif text-3xl font-semibold text-white gold-text-glow">What the Ummah Says</h2>
              <p className="text-stone-400 text-xs sm:text-sm max-w-xs mx-auto italic">Authentic reviews from verified buyers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INITIAL_TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="p-6 bg-neutral-900 border border-gold-600/10 rounded-2xl space-y-3 shadow-md gold-card-shadow">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-gold-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="pt-2 border-t border-gold-600/5 flex justify-between items-center text-xs">
                    <span className="font-semibold text-stone-200">{testimonial.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400">✓ Verified Buyer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 📧 SECTION 5: Beautiful Newsletter Signups */}
        <Newsletter />

      </main>

      {/* 📚 FOOTER & "ABOUT US SECTION" */}
      <footer className="bg-neutral-950 border-t border-gold-600/20 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-600 p-0.5 flex items-center justify-center border border-gold-400 shadow">
                <span className="text-neutral-950 font-serif font-black text-base">ع</span>
              </div>
              <span className="font-serif text-lg font-bold text-gold-300 uppercase letter tracking-widest">UMMATI PERFUME</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              <strong>Ummati Perfume</strong> is your trusted destination for premium fragrances and Islamic lifestyle products. We offer an exclusive collection of over 150 perfumes, authentic bakhoor, stylish bakhoor burners, and carefully selected Islamic essentials. Our mission is to provide quality, elegance, and spiritual value through products that enrich everyday life.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-gold-400 pt-1">
              <span>✦ Fragrance Inspired by Faith</span>
              <span>•</span>
              <span>✦ Luxury Scents, Timeless Elegance</span>
            </div>
          </div>

          {/* Slogans Matrix */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm text-gold-300 uppercase tracking-widest border-b border-gold-600/10 pb-1">Essential Quotes</h4>
            <ul className="space-y-2 text-xs font-serif italic text-stone-300">
              <li>"Where Fragrance Meets Spirituality"</li>
              <li>"Premium Perfumes & Islamic Essentials"</li>
              <li>"The perfect gift for Friday & Eid gatherings"</li>
            </ul>
          </div>

          {/* Quick contact and payments */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif font-bold text-sm text-gold-300 uppercase tracking-widest border-b border-gold-600/10 pb-1">Assistance & Security</h4>
            <div className="space-y-2 text-xs text-stone-300">
              <p>📍 Sourced globally • Packed under absolute Halal hygiene codes.</p>
              <p>💬 WhatsApp Sales Channel: Available 24/7 for custom gift bundles.</p>
              <p>📦 Delivery worldwide with premium tracking numbers.</p>
            </div>
            
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-stone-500 block mb-1">We Honor Multiple Payment Options:</span>
              <div className="flex gap-2 text-stone-400 text-sm select-none">
                <span className="bg-neutral-900 border border-gold-600/10 px-2 py-1 rounded">💳 Cards</span>
                <span className="bg-neutral-900 border border-gold-600/10 px-2 py-1 rounded">💵 Cash on Delivery</span>
                <span className="bg-neutral-900 border border-gold-600/10 px-2 py-1 rounded">💬 WhatsApp</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright declaration */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gold-600/10 mt-12 pt-6 text-center text-xs font-mono text-stone-500 uppercase tracking-widest">
          <span>© 1447 - 2026 UMMATI PERFUME HIERARCHY Inc. JAZAKALLAH KHAIR.</span>
        </div>
      </footer>

      {/* --- DRAWERS & SHEET PANELS SLIDERS (Trigger overlays) --- */}
      
      {/* 1. Shopping Cart Drawer slider */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            promoApplied={promoApplied}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
            giftWrap={giftWrap}
            setGiftWrap={setGiftWrap}
            giftMessage={giftMessage}
            setGiftMessage={setGiftMessage}
            onProceedToCheckout={() => {
              setIsCartOpen(false);
              setCheckoutModalOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. Wishlist Bookmarked items slider (Uses standard account drawer slide-over widget for consistency!) */}
      <AnimatePresence>
        {isWishlistOpen && (
          <AccountDrawer
            isOpen={isWishlistOpen}
            orders={orders}
            wishlist={wishlist}
            onClose={() => setIsWishlistOpen(false)}
            onSelectProduct={(p) => {
              setIsWishlistOpen(false);
              setSelectedProduct(p);
            }}
            onClearHistory={handleClearHistory}
          />
        )}
      </AnimatePresence>

      {/* 3. Account / Order tracking list stats */}
      <AnimatePresence>
        {isAccountOpen && (
          <AccountDrawer
            isOpen={isAccountOpen}
            orders={orders}
            wishlist={wishlist}
            onClose={() => setIsAccountOpen(false)}
            onSelectProduct={(p) => {
              setIsAccountOpen(false);
              setSelectedProduct(p);
            }}
            onClearHistory={handleClearHistory}
          />
        )}
      </AnimatePresence>

      {/* 4. Digital Tasbeeh widget full overlay */}
      <AnimatePresence>
        {isTasbeehOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsTasbeehOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
              <TasbeehWidget onClose={() => setIsTasbeehOpen(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Product Detailed reviews and Olfactory pyramid mapping */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            isWishlisted={wishlist.some(item => item.id === selectedProduct.id)}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(size) => {
              handleAddToCart(selectedProduct, size);
              setSelectedProduct(null);
            }}
            onAddToWishlist={() => handleToggleWishlist(selectedProduct)}
            onWhatsAppOrder={(p, size) => executeWhatsAppOrder(p, size)}
          />
        )}
      </AnimatePresence>

      {/* 6. Checkout Shipping and Mock Card form modalities */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <CheckoutModal
            isOpen={checkoutModalOpen}
            cart={cart}
            subtotal={activeSubtotal}
            discountAmount={activeDiscountAmount}
            giftWrapFee={giftWrap}
            shippingFee={activeShippingFee}
            finalTotal={activeGrandTotal}
            onClose={() => setCheckoutModalOpen(false)}
            onOrderSuccess={handleOrderSuccessHandler}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
