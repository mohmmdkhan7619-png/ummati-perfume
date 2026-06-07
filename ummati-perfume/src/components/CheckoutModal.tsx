import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Lock, Sparkles, ShoppingBag, Truck } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  giftWrapFee: boolean;
  shippingFee: number;
  finalTotal: number;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  cart,
  subtotal,
  discountAmount,
  giftWrapFee,
  shippingFee,
  finalTotal,
  onClose,
  onOrderSuccess
}: CheckoutModalProps) {
  if (!isOpen) return null;

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Card' | 'WhatsApp'>('COD');
  
  // Card input states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingOrder(true);

    // Simulate merchant processing timer
    setTimeout(() => {
      const trackingNum = `UMT-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          size: item.selectedSize,
          price: item.product.price,
          image: item.product.image
        })),
        shippingAddress: {
          fullName,
          email,
          phone,
          addressLine,
          city,
          postalCode
        },
        paymentMethod,
        subtotal,
        shippingFee,
        total: finalTotal,
        status: 'Processing',
        trackingNumber: trackingNum
      };

      onOrderSuccess(newOrder);
      setSubmittingOrder(false);
    }, 1500);
  };

  return (
    <div id="checkout_overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-neutral-900 border border-gold-600/25 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl gold-card-shadow text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-emerald-950 via-neutral-900 to-emerald-950 p-6 border-b border-gold-600/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-500 animate-pulse" />
            <h3 className="font-serif font-bold text-lg text-gold-300">Secure Checkout Verification</h3>
          </div>
          <button id="close_checkout_modal_btn" onClick={onClose} className="p-1 px-2 text-stone-400 hover:text-white bg-neutral-950 rounded-lg cursor-pointer text-xs">
            ✕ Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-gold-600/15 max-h-[82vh] overflow-y-auto">
          
          {/* Shipping Forms Panel (Left Column) */}
          <div className="md:col-span-7 p-6 space-y-4">
            <h4 className="font-serif font-semibold text-sm text-gold-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Truck className="w-4 h-4" /> Shipping Information
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Full Legal Name</label>
                <input
                  id="checkout_full_name"
                  type="text"
                  required
                  placeholder="e.g. Brother Farhan Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-300 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Email Address</label>
                  <input
                    id="checkout_email"
                    type="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-300 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Cell Phone Number</label>
                  <input
                    id="checkout_phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-300 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Delivery Address</label>
                <input
                  id="checkout_address_line"
                  type="text"
                  required
                  placeholder="Building, street name, house number..."
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-300 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">City</label>
                  <input
                    id="checkout_city"
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Medina"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Postal Code</label>
                  <input
                    id="checkout_postal_code"
                    type="text"
                    required
                    maxLength={10}
                    placeholder="e.g. 400001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-neutral-950 border border-gold-600/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-300"
                  />
                </div>
              </div>
            </div>

            {/* Payment Choice Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">Choose Payment Gateway</label>
              <div className="grid grid-cols-3 gap-2">
                
                {/* Cash on Delivery */}
                <button
                  id="checkout_pm_cod"
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`py-2.5 px-2 text-center rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    paymentMethod === 'COD'
                      ? 'bg-gold-500 border-gold-400 text-neutral-950'
                      : 'bg-neutral-950 border-gold-600/15 text-stone-300 hover:border-gold-500/40'
                  }`}
                >
                  <span className="text-sm">💵</span>
                  <span>Cash on Delivery</span>
                </button>

                {/* Credit / Debit Cards mock */}
                <button
                  id="checkout_pm_card"
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`py-2.5 px-2 text-center rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    paymentMethod === 'Card'
                      ? 'bg-gold-500 border-gold-400 text-neutral-950'
                      : 'bg-neutral-950 border-gold-600/15 text-stone-300 hover:border-gold-500/40'
                  }`}
                >
                  <span className="text-sm">💳</span>
                  <span>Credit / Debit Card</span>
                </button>

                {/* Direct WhatsApp Ordering */}
                <button
                  id="checkout_pm_whatsapp"
                  type="button"
                  onClick={() => setPaymentMethod('WhatsApp')}
                  className={`py-2.5 px-2 text-[11px] text-center rounded-xl border font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    paymentMethod === 'WhatsApp'
                      ? 'bg-gold-500 border-gold-400 text-neutral-950'
                      : 'bg-neutral-950 border-gold-600/15 text-stone-300 hover:border-gold-500/40'
                  }`}
                >
                  <span className="text-sm">💬</span>
                  <span>Confirm on WhatsApp</span>
                </button>

              </div>
            </div>

            {/* Simulated Card Info Panel */}
            {paymentMethod === 'Card' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-neutral-950 p-4 rounded-xl border border-gold-600/15 space-y-3 overflow-hidden text-left"
              >
                <div className="flex items-center gap-1.5 text-xs text-gold-300 font-mono">
                  <Lock className="w-3.5 h-3.5 text-gold-500" />
                  <span>SIMULATED CARD TRANSPARENCY</span>
                </div>
                
                <div>
                  <label className="text-[9px] font-mono text-stone-400 uppercase">Card Number</label>
                  <input
                    id="checkout_card_num"
                    type="text"
                    placeholder="4111 •••• •••• 1111"
                    maxLength={19}
                    required={paymentMethod === 'Card'}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-neutral-900 border border-gold-600/15 rounded-lg py-1.5 px-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-mono text-stone-400 uppercase">Expiry (MM/YY)</label>
                    <input
                      id="checkout_card_expiry"
                      type="text"
                      placeholder="12/28"
                      maxLength={5}
                      required={paymentMethod === 'Card'}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-600/15 rounded-lg py-1.5 px-2 text-xs focus:outline-none text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-stone-400 uppercase">Security Code (CVV)</label>
                    <input
                      id="checkout_card_cvv"
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      required={paymentMethod === 'Card'}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-600/15 rounded-lg py-1.5 px-2 text-xs focus:outline-none text-center"
                    />
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Checkout Totals Summary (Right Column) */}
          <div className="md:col-span-5 p-6 bg-neutral-950/65 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-serif font-semibold text-sm text-gold-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" /> Order Summary
              </h4>

              {/* Items List */}
              <div className="max-h-[220px] overflow-y-auto space-y-3 pr-1 divide-y divide-gold-600/10">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-2.5 pt-2.5 first:pt-0 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-12 object-cover rounded border border-gold-600/10 bg-neutral-950"
                    />
                    <div className="flex-1">
                      <span className="font-semibold block line-clamp-1">{item.product.name}</span>
                      <div className="text-[10px] text-stone-400 font-mono">
                        {item.selectedSize} × {item.quantity}
                      </div>
                    </div>
                    <span className="font-semibold text-gold-300 font-serif">${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Financial calculations */}
              <div className="space-y-2 border-t border-gold-600/15 pt-3 text-[11px] font-mono text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Promo Discount:</span>
                    <span>-${discountAmount.toFixed(1)}</span>
                  </div>
                )}
                {giftWrapFee && (
                  <div className="flex justify-between text-stone-300">
                    <span>Calligraphy Gift Wrapping:</span>
                    <span>+$10</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping Cost:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `+$${shippingFee}`}</span>
                </div>
                
                <div className="flex justify-between text-sm font-serif font-black text-gold-300 border-t border-gold-600/10 pt-2.5">
                  <span>GRAND TOTAL:</span>
                  <span>${finalTotal.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Core Action Submit Trigger */}
            <div className="space-y-3">
              <button
                id="checkout_submit_order_btn"
                type="submit"
                disabled={submittingOrder}
                className="w-full py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-neutral-950 font-bold font-sans text-xs rounded-xl shadow-lg border border-gold-300 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-1.5"
              >
                {submittingOrder ? (
                  <span>Processing barakah transaction...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize Order</span>
                    <span>(${finalTotal.toFixed(1)})</span>
                  </>
                )}
              </button>
              
              <div className="text-center text-[10px] text-stone-500 font-mono flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-gold-500" />
                <span>SSL encrypted secure local server</span>
              </div>
            </div>

          </div>

        </form>
      </motion.div>
    </div>
  );
}
