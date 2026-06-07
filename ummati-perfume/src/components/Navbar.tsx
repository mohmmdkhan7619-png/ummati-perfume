import { ShoppingCart, Heart, Search, User, Compass, Crosshair, CircleDot } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenTasbeeh: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export default function Navbar({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenTasbeeh,
  searchTerm,
  setSearchTerm
}: NavbarProps) {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-emerald-950/85 backdrop-blur-md border-b border-gold-600/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -15, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 p-0.5 shadow-md flex items-center justify-center border border-gold-300"
            >
              <span className="text-emerald-950 font-serif font-extrabold text-xl leading-none">ع</span>
            </motion.div>
            
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-gold-300 uppercase gold-text-glow font-serif">
                Ummati Perfume
              </span>
              <span className="text-[10px] font-mono tracking-widest text-stone-300 -mt-0.5 select-none text-emerald-300">
                الْأُمَّةِ • ESSENCE OF FAITH
              </span>
            </div>
          </div>

          {/* Search Bar - Center (Large Devices) */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8 relative">
            <input
              id="navbar_search_input"
              type="text"
              placeholder="Search 150+ fragrances, bakhoor, mats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900/60 border border-gold-600/35 rounded-full py-2 pl-4 pr-10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-gold-300 focus:ring-1 focus:ring-gold-300 transition-all font-sans"
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gold-500">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Action Navigation icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Interactive Tasbeeh Counter Trigger */}
            <button
              id="navbar_tasbeeh_trigger"
              onClick={onOpenTasbeeh}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-gold-600/15 text-gold-400 hover:text-gold-300 transition-all border border-gold-600/15 mr-1 bg-neutral-950/30"
              title="Tasbeeh Al-Barakah Counter"
            >
              <CircleDot className="w-4 h-4 text-gold-400 animate-pulse" />
              <span className="text-xs font-mono font-medium hidden sm:inline">Tasbeeh</span>
            </button>

            {/* Account / Order Tracking Trigger */}
            <button
              id="navbar_account_trigger"
              onClick={onOpenAccount}
              className="p-2 rounded-full hover:bg-neutral-900/50 text-stone-300 hover:text-gold-400 transition-all"
              title="Track Orders & Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              id="navbar_wishlist_trigger"
              onClick={onOpenWishlist}
              className="p-2 rounded-full hover:bg-neutral-900/50 text-stone-300 hover:text-gold-400 transition-all relative"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              id="navbar_cart_trigger"
              onClick={onOpenCart}
              className="p-2 rounded-full hover:bg-neutral-900/50 text-stone-300 hover:text-gold-400 transition-all relative"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-neutral-950 rounded-full w-4 h-4 text-[9px] font-extrabold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="md:hidden pb-4 pt-1 flex relative">
          <input
            id="mobile_navbar_search_input"
            type="text"
            placeholder="Search perfumes, gifts & accessories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900/75 border border-gold-600/35 rounded-full py-2 pl-4 pr-10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-gold-300"
          />
          <div className="absolute top-1/2 right-4 -translate-y-[calc(50%+2px)] text-gold-500">
            <Search className="w-4 h-4" />
          </div>
        </div>

      </div>
    </header>
  );
}
