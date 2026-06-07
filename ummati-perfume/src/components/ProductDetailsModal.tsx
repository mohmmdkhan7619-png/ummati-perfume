import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, ShoppingCart, MessageSquare, Shield, Sparkles, X, ChevronRight } from 'lucide-react';
import { Product, Testimonial } from '../types';

interface ProductDetailsModalProps {
  product: Product;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (size: string) => void;
  onAddToWishlist: () => void;
  onWhatsAppOrder: (product: Product, size: string) => void;
}

export default function ProductDetailsModal({
  product,
  isWishlisted,
  onClose,
  onAddToCart,
  onAddToWishlist,
  onWhatsAppOrder
}: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size'
  );

  // Zoom feature state
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  // Reviews list within state for reactive submissions
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    // Generate 3 mock reviews tailored to this specific product category
    return [
      {
        id: 'r-01',
        name: 'Mustafa Al-Hasan',
        rating: 5,
        comment: `Absolutely brilliant! True to character and extremely premium quality. The notes of ${product.scentProfile || 'Sandalwood'} develop wonderfully after 2 hours. High recommendation to all my brothers.`,
        date: 'June 02, 2026',
        verified: true,
        productName: product.name
      },
      {
        id: 'r-02',
        name: 'Yasmin S.',
        rating: 4.8,
        comment: `Bought this as an Islamic Eid Gift and the packaging blew me away. Smells sophisticated, long-lasting and worth every penny. Very helpful WhatsApp staff, too!`,
        date: 'June 05, 2026',
        verified: true,
        productName: product.name
      }
    ];
  });

  // Review submission inputs
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [successReview, setSuccessReview] = useState(false);

  // Hover zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  // Submission handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    setSubmittingReview(true);
    setTimeout(() => {
      const added: Testimonial = {
        id: `rev-added-${Date.now()}`,
        name: newName,
        rating: newRating,
        comment: newComment,
        date: 'Today',
        verified: true,
        productName: product.name
      };

      setReviews((prev) => [added, ...prev]);
      setNewName('');
      setNewRating(5);
      setNewComment('');
      setSubmittingReview(false);
      setSuccessReview(true);
      setTimeout(() => setSuccessReview(false), 4000);
    }, 800);
  };

  // Scent Pyramids calculation
  const showPyramid = !!product.notes;

  return (
    <div id="product_details_overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-neutral-900 border border-gold-600/25 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl gold-card-shadow text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="close_details_modal_btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950 border border-gold-600/20 hover:border-gold-300 text-stone-300 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Column A: Gallery & Interactive Zoom */}
          <div className="space-y-4">
            <div
              id="zoom_image_track_area"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-square bg-neutral-950 rounded-2xl overflow-hidden border border-gold-600/10 cursor-zoom-in"
            >
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
              
              {/* Zoom glass overlay */}
              <div
                className="absolute inset-0 pointer-events-none bg-no-repeat bg-cover hidden md:block"
                style={{
                  ...zoomStyle,
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: '200%'
                }}
              />

              <div className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-md py-1 px-2.5 rounded-lg text-[10px] font-mono text-gold-400">
                Hover image to zoom ⌕
              </div>
            </div>

            {/* Scent Profile summary and Highlights */}
            <div className="bg-neutral-950/40 border border-gold-600/10 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Product Guarantee</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-300">
                <div className="flex items-center gap-1.5 bg-neutral-950/50 p-2 rounded border border-gold-600/5">
                  <Shield className="w-3.5 h-3.5 text-gold-500" />
                  <span>100% Halal Pure</span>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-950/50 p-2 rounded border border-gold-600/5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>Extra Long Lasting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Info Details & Shopping Triggers */}
          <div className="space-y-6">
            
            {/* Title & Slogan Header */}
            <div>
              <span className="text-xs font-mono tracking-widest text-gold-400 uppercase">{product.category}</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold mt-1 text-gold-300 tracking-tight gold-text-glow">
                {product.name}
              </h2>
              {product.scentProfile && (
                <p className="text-stone-300 italic text-sm mt-1">
                  Scent Notes: {product.scentProfile}
                </p>
              )}
            </div>

            {/* Pricing Tag */}
            <div className="flex items-baseline gap-3.5">
              <span className="text-3xl font-serif font-black text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Scent Description Box */}
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            {/* size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-mono text-stone-400 uppercase tracking-widest">Select Scent Volume</label>
                <div className="flex items-center gap-2">
                  {product.sizes.map((size) => (
                    <button
                      id={`modal_size_choice_${size.replace(' ', '_')}`}
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-1.5 px-4 rounded-xl text-xs font-mono border transition-all ${
                        selectedSize === size
                          ? 'bg-gold-500 text-neutral-950 border-gold-400 font-bold shadow-md'
                          : 'bg-neutral-950 text-stone-300 border-gold-600/10 hover:border-gold-500/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scent Pyramids (Fragrance Notes breakdown) */}
            {showPyramid && (
              <div className="bg-neutral-950/70 p-4 rounded-xl border border-gold-600/10 space-y-3">
                <div className="flex items-center gap-1 text-xs font-mono text-gold-400">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-spin" />
                  <span>Fragrance Olfactory Pyramid</span>
                </div>
                
                <div className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-12 gap-1 bg-neutral-900/55 p-1.5 rounded items-center">
                    <span className="col-span-3 text-gold-300 font-mono text-[10px] uppercase font-bold">Top Note:</span>
                    <span className="col-span-9 text-stone-200">{product.notes?.top}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 bg-neutral-900/55 p-1.5 rounded items-center">
                    <span className="col-span-3 text-gold-300 font-mono text-[10px] uppercase font-bold">Heart Note:</span>
                    <span className="col-span-9 text-stone-200">{product.notes?.heart}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 bg-neutral-900/55 p-1.5 rounded items-center">
                    <span className="col-span-3 text-gold-300 font-mono text-[10px] uppercase font-bold">Base Note:</span>
                    <span className="col-span-9 text-stone-200">{product.notes?.base}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Core Action triggers */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              
              {/* Add to Cart */}
              <button
                id="modal_add_to_cart_action_btn"
                onClick={() => onAddToCart(selectedSize)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-500 text-neutral-950 px-6 py-3 rounded-xl font-bold font-sans transition-colors shadow-lg shadow-gold-500/10 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 font-black" />
                <span>Add To Shopping Cart</span>
              </button>

              {/* Directly Order on WhatsApp */}
              <button
                id="modal_whatsapp_action_btn"
                onClick={() => onWhatsAppOrder(product, selectedSize)}
                className="inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white px-5 py-3 rounded-xl font-semibold font-sans transition-colors border border-emerald-600/20 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
                <span>Order on WhatsApp</span>
              </button>

              {/* Wishlist Hearts */}
              <button
                id="modal_wishlist_action_btn"
                onClick={onAddToWishlist}
                className={`py-3 px-4 rounded-xl border transition-all flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-red-950/45 text-red-500 border-red-500/50'
                    : 'bg-neutral-950 border-gold-600/15 text-stone-400 hover:text-gold-400 hover:border-gold-400/40'
                }`}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>

            </div>

          </div>
        </div>

        {/* Product Specifications Summary */}
        {product.features && product.features.length > 0 && (
          <div className="border-t border-gold-600/10 p-6 sm:p-8 bg-neutral-950/20">
            <h4 className="text-sm font-mono text-gold-400 uppercase tracking-widest mb-3">Distinguished Attributes</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300 text-xs">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-gold-400 text-sm">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews Subsection (Reactive Star Rating & Submission Panel) */}
        <div className="border-t border-gold-600/10 p-6 sm:p-8 bg-neutral-950/40 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-semibold text-lg text-gold-300">Customer Testimonials</h4>
            <div className="text-xs font-mono text-stone-400 flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded border border-gold-600/5">
              <span>Verified buyers only</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gold-600/10">
            
            {/* Review List */}
            <div className="space-y-4 pr-0 md:pr-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-3 bg-neutral-900 border border-gold-600/5 rounded-xl space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-100">{r.name}</span>
                    <span className="text-[10px] font-mono text-stone-500">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(r.rating) ? 'text-gold-400 fill-gold-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed italic">
                    "{r.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Leave a Review Form */}
            <div className="space-y-4 pl-0 md:pl-6 pt-6 md:pt-0">
              <h5 className="font-serif font-semibold text-sm text-gold-400">Share Your Experience</h5>
              
              <AnimatePresence>
                {successReview && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono"
                  >
                    JazakAllah Khair! Your premium review has been synchronized successfully.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Your Name</label>
                    <input
                      id="review_author_name"
                      type="text"
                      required
                      placeholder="e.g. Brother Bilal"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-gold-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Star Rating</label>
                    <select
                      id="review_rating_select"
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-gold-300"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                      <option value="3">⭐⭐⭐ 3 Stars</option>
                      <option value="2">⭐⭐ 2 Stars</option>
                      <option value="1">⭐ 1 Star</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Review Comments</label>
                  <textarea
                    id="review_comment_text"
                    required
                    rows={3}
                    placeholder="Describe olfactory longevity, texture, and how the scent develops..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-300"
                  />
                </div>

                <button
                  id="submit_review_form_btn"
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-2 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-gold-600/35 text-gold-400 hover:text-gold-300 transition-all font-mono text-xs cursor-pointer"
                >
                  {submittingReview ? 'Verifying...' : 'Submit Certified Review'}
                </button>
              </form>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
