import { X, Plus, Minus, Trash, Ticket, Gift, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  promoApplied: boolean;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
  giftWrap: boolean;
  setGiftWrap: (val: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
}

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  setCouponCode,
  promoApplied,
  onApplyPromo,
  onRemovePromo,
  giftWrap,
  setGiftWrap,
  giftMessage,
  setGiftMessage
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Calculate prices
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = promoApplied ? subtotal * 0.1 : 0;
  const giftWrapFee = giftWrap ? 10 : 0;
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const finalTotal = subtotal - discountAmount + giftWrapFee + shippingFee;

  return (
    <div id="cart_drawer_mask" className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/80 backdrop-blur-sm flex justify-end" onClick={onClose}>
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        className="w-full max-w-md h-full bg-neutral-900 border-l border-gold-600/25 shadow-2xl flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gold-600/15 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg text-gold-300">Your Perfume Selection</span>
            <span className="text-xs bg-gold-500/10 border border-gold-400/20 text-gold-400 py-0.5 px-2.5 rounded-full">
              {cart.length} items
            </span>
          </div>
          <button id="close_cart_drawer" onClick={onClose} className="p-1 px-2.5 rounded-lg bg-neutral-900 text-stone-400 hover:text-white border border-gold-600/10 cursor-pointer">
            ✕
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-950 flex items-center justify-center mx-auto border border-gold-600/10">
                <Ticket className="w-6 h-6 text-stone-500" />
              </div>
              <p className="text-stone-400 font-serif text-sm">Your shopping selection is currently empty.</p>
              <button
                id="empty_cart_shop_btn"
                onClick={onClose}
                className="py-2 px-5 bg-gold-600 hover:bg-gold-500 text-neutral-950 rounded-xl text-xs font-bold font-serif"
              >
                Start Exploring Luxury Scents
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-gold-600/10">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 pt-4 first:pt-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded-lg border border-gold-600/10 bg-neutral-950"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-semibold text-stone-100 text-sm line-clamp-1">{item.product.name}</h4>
                        <button
                          id={`remove_cart_item_${item.product.id}`}
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-stone-500 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex gap-2 items-center text-xs font-mono text-gold-400 mt-0.5">
                        <span className="bg-neutral-950 px-1.5 py-0.5 rounded border border-gold-600/5">{item.selectedSize}</span>
                        <span>•</span>
                        <span>${item.product.price} each</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-lg border border-gold-600/10">
                        <button
                          id={`dec_qty_${item.product.id}`}
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="p-1 rounded bg-neutral-900 border border-gold-600/5 text-stone-300 hover:text-white disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          id={`inc_qty_${item.product.id}`}
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="p-1 rounded bg-neutral-900 border border-gold-600/5 text-stone-300 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <span className="font-serif font-black text-gold-300 text-sm">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-gold-600/15">
              {/* Promo Coupon Module */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-gold-400">
                  <Ticket className="w-4 h-4 text-gold-500" />
                  <span>APPLY BLESSING PROMO CODE</span>
                </div>
                {promoApplied ? (
                  <div className="flex items-center justify-between bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    <span>Active: 10% BARAKAH Coupon applied!</span>
                    <button id="remove_promo_btn" onClick={onRemovePromo} className="text-stone-300 hover:text-red-400 font-bold ml-1">✕</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      id="cart_coupon_input"
                      type="text"
                      placeholder="Enter BARAKAH for 10% off"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs uppercase text-white placeholder-stone-500 focus:outline-none"
                    />
                    <button
                      id="apply_coupon_btn"
                      onClick={() => onApplyPromo(couponCode)}
                      className="py-2 px-4 bg-neutral-950 border border-gold-600/35 hover:border-gold-300 text-gold-400 font-mono text-xs rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Luxury Gift Wrap Module */}
              <div className="bg-neutral-950/40 p-3.5 rounded-xl border border-gold-600/10 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-stone-200 select-none">
                  <input
                    id="gift_wrap_checkbox"
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded border-gold-600/30 text-gold-500 focus:ring-gold-500 accent-gold-500"
                  />
                  <Gift className="w-4 h-4 text-gold-400" />
                  <span>Include Premium Calligraphy Gift-Wrap? (+$10)</span>
                </label>
                
                {giftWrap && (
                  <div className="space-y-1.5 transition-all">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">Gift Card Message Support</span>
                    <input
                      id="gift_message_input"
                      type="text"
                      maxLength={140}
                      placeholder="e.g. May your home be enriched with fragrance and barkah"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-1.5 px-3 text-xs text-white placeholder-stone-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Totals Summary & Button Panel (Cart is loaded) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gold-600/15 bg-neutral-950 space-y-4">
            <div className="space-y-2 text-xs font-mono text-stone-300">
              <div className="flex justify-between">
                <span>Fragrance Subtotal:</span>
                <span className="text-white">${subtotal}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Barakah Off (10%):</span>
                  <span>-${discountAmount.toFixed(1)}</span>
                </div>
              )}
              {giftWrap && (
                <div className="flex justify-between">
                  <span>Calligraphy Gift Wrapping:</span>
                  <span>+$10</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Service:</span>
                <span>{shippingFee === 0 ? 'FREE' : `+$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gold-600/10 text-sm font-serif font-black text-gold-300">
                <span>ESTIMATED TOTAL:</span>
                <span>${finalTotal.toFixed(1)}</span>
              </div>
            </div>

            {/* Proceed to checkout */}
            <button
              id="cart_proceed_to_checkout_btn"
              onClick={onProceedToCheckout}
              className="w-full py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-neutral-950 font-bold font-sans rounded-xl shadow-lg border border-gold-300 text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <CreditCard className="w-4 h-4" />
              <span>Verify and Checkout Securely</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
            <p className="text-[10px] text-center text-stone-500 font-mono">
              Spend $150+ to activate FREE Standard Courier support
            </p>
          </div>
        )}

      </motion.div>
    </div>
  );
}
