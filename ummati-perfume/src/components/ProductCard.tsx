import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  isWishlisted: boolean;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  onClick: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onAddToWishlist,
  onClick
}: ProductCardProps) {
  // Check if product has discount
  const hasDiscount = !!product.originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col justify-between bg-neutral-900 border border-gold-600/15 rounded-2xl overflow-hidden hover:border-gold-400/40 transition-all duration-300 shadow-md hover:shadow-xl gold-card-shadow h-full"
    >
      {/* Upper Media Part */}
      <div className="relative aspect-[4/5] bg-neutral-950 overflow-hidden cursor-pointer" onClick={onClick}>
        
        {/* Discount Tag */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-600 border border-red-500 text-white font-mono text-[10px] font-bold py-1 px-2.5 rounded-lg z-10 shadow-md">
            -{discountPercent}% OFF
          </span>
        )}

        {/* BestSeller or NewArrival Tags */}
        {!hasDiscount && product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-gold-500 border border-gold-400 text-neutral-950 font-mono text-[9px] font-black py-1 px-2 rounded-lg z-10 uppercase tracking-widest shadow-md">
            Best Seller
          </span>
        )}
        {!hasDiscount && !product.isBestSeller && product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-emerald-700 border border-emerald-600 text-white font-mono text-[9px] font-semibold py-1 px-2 rounded-lg z-10 uppercase tracking-widest shadow-md">
            New
          </span>
        )}

        {/* Product Spec Image with referrerPolicy */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 select-none"
        />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            id={`quick_view_btn_${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="p-3 bg-gold-500 text-neutral-950 hover:bg-gold-400 rounded-full transition-all hover:scale-105 shadow-md"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4 font-bold" />
          </button>
        </div>
      </div>

      {/* Product Information Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Scent profile header info */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider">{product.category}</span>
            <span className="text-[11px] font-mono font-bold text-stone-500 flex items-center gap-0.5">
              <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
              {product.rating}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={onClick}
            className="font-serif font-semibold text-stone-100 text-sm sm:text-base cursor-pointer hover:text-gold-300 transition-colors line-clamp-1 mt-0.5"
          >
            {product.name}
          </h3>

          {/* Scent notes summary */}
          {product.scentProfile ? (
            <p className="text-stone-400 text-xs line-clamp-1 italic text-stone-400 font-sans mt-0.5">
              {product.scentProfile}
            </p>
          ) : (
            <p className="text-stone-400 text-xs line-clamp-1 italic text-stone-400 font-sans mt-0.5">
              Premium Islamic Lifestyle
            </p>
          )}
        </div>

        {/* Action Panel Footer */}
        <div className="flex items-end justify-between pt-1 border-t border-gold-600/10">
          
          {/* Price Tag with discount */}
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-stone-500 line-through -mb-0.5">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-base font-serif font-black text-gold-300">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Wishlist Hearts */}
            <button
              id={`wishlist_toggle_${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToWishlist();
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                isWishlisted
                  ? 'bg-red-950/45 text-red-500 border-red-500/50'
                  : 'bg-neutral-950 border-gold-600/15 text-stone-400 hover:text-gold-400 hover:border-gold-400/40'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>

            {/* Quick Add To Cart Button */}
            <button
              id={`add_to_cart_btn_${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="py-1.5 px-3 rounded-lg bg-gold-600 hover:bg-gold-500 text-neutral-950 transition-colors text-xs font-serif font-black flex items-center gap-1.5 shadow-md cursor-pointer"
              title="Add to Shopping Cart"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
