import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquare, Compass, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
  onViewBestSellers: () => void;
  onWhatsAppOrder: () => void;
  onDiscoverNewArrivals: () => void;
}

const HERO_TAGLINES = [
  {
    sub: 'Where Fragrance Meets Spirituality',
    title: 'Discover the Essence of Luxury & Faith',
    desc: 'An exquisite curation of 150+ ultra-premium perfumes, pure white Musks, rare Cambodi Oudh, and comforting Bakhoors designed to elevate your everyday routines.'
  },
  {
    sub: 'Luxury Scents, Timeless Elegance',
    title: 'Dehn Al Oud Amiri & Sunnah Aromas',
    desc: 'Crafted without compromises. Delve into alcohol-free attars, rich gold geometric burners, and supportive prayer mats made exclusively to inspire tranquility.'
  },
  {
    sub: 'Fragrance Inspired by Faith',
    title: 'Premium Perfumes & Islamic Essentials',
    desc: 'Experience our custom olfactory treasures sourced from wild agarwood trees and pure Taif rose gardens, delivered with respect, honor, and values.'
  }
];

export default function Hero({
  onShopNow,
  onExploreCollection,
  onViewBestSellers,
  onWhatsAppOrder,
  onDiscoverNewArrivals
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_TAGLINES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_TAGLINES[currentIndex];

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 border-b border-gold-600/15 py-12 md:py-20 lg:py-24">
      {/* Arabic Calligraphy Style Background Overlay */}
      <div className="absolute inset-0 opacity-15 bg-arabic-pattern pointer-events-none"></div>
      
      {/* Dynamic Golden Floating Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Animated Text Columns (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Sub-Header Sparkle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full text-gold-300 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono tracking-widest uppercase">Ummati Fragrance House</span>
            </div>

            {/* Slider container with precise transition animations */}
            <div className="min-h-[220px] md:min-h-[200px] flex flex-col justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <span className="text-gold-400 italic text-sm md:text-base font-serif font-semibold block tracking-wide">
                    {current.sub}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white leading-tight gold-text-glow">
                    {current.title}
                  </h1>
                  <p className="text-stone-300 text-xs sm:text-sm md:text-base font-normal max-w-xl leading-relaxed">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel navigation dots */}
            <div className="flex gap-2 pt-1">
              {HERO_TAGLINES.map((_, idx) => (
                <button
                  id={`hero_dot_${idx}`}
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-gold-400' : 'w-2 bg-stone-600 hover:bg-stone-500'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Premium Multi-CTA Button Matrix */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-4">
              
              {/* Shop Now Primary Button */}
              <button
                id="hero_btn_shop_now"
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-neutral-950 font-sans font-bold text-sm px-6 py-3 rounded-xl shadow-lg border border-gold-300 transition-all active:scale-98 tracking-wide transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Order on WhatsApp Button */}
              <button
                id="hero_btn_whatsapp"
                onClick={onWhatsAppOrder}
                className="inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-sans font-semibold text-sm px-5 py-3 rounded-xl shadow-lg border border-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>Order on WhatsApp</span>
              </button>

              {/* Explore Collection Button */}
              <button
                id="hero_btn_explore"
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2 bg-neutral-900 border border-gold-600/35 hover:border-gold-300 hover:bg-neutral-800 text-stone-300 hover:text-white font-sans text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Explore Collection</span>
              </button>

              {/* Secondary actions: Best Sellers + New Arrivals */}
              <div className="flex w-full gap-3.5 mt-1">
                <button
                  id="hero_btn_bestsellers"
                  onClick={onViewBestSellers}
                  className="text-xs font-mono text-gold-400 hover:text-gold-300 transition-all flex items-center gap-1 cursor-pointer"
                >
                  ♛ View Best Sellers
                </button>
                <span className="text-stone-700">|</span>
                <button
                  id="hero_btn_newarrivals"
                  onClick={onDiscoverNewArrivals}
                  className="text-xs font-mono text-gold-400 hover:text-gold-300 transition-all flex items-center gap-1 cursor-pointer"
                >
                  ✦ Discover New Arrivals
                </button>
              </div>

            </div>

          </div>

          {/* Luxury Visual Frame (Right Column) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative max-w-sm sm:max-w-md w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden gold-card-shadow border border-gold-600/30">
              
              {/* Premium curated background representing Bakhoor rising smoke */}
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600"
                alt="Ummati Golden Perfume"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none scale-102 hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Embedded Banner with Tagline Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-6">
                <div className="bg-emerald-950/90 border border-gold-500/20 p-4 rounded-2xl backdrop-blur-md space-y-1 text-center">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">OFFICIAL SLOGAN</span>
                  <p className="font-serif text-lg text-white font-semibold">
                    "Discover the Essence of Luxury & Faith"
                  </p>
                  <p className="text-[11px] text-stone-300 font-mono">150+ Premium Fragrances & Islamic Lifestyle</p>
                </div>
              </div>

              {/* Secure Store Trust Badges */}
              <div className="absolute top-4 left-4 bg-neutral-900/85 backdrop-blur-md py-1.5 px-3 rounded-full border border-gold-600/20 text-gold-400 text-[10px] font-mono flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                <span>100% Halal & Pure Scent</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
