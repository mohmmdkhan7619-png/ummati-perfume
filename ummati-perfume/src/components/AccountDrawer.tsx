import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Bookmark, Award, Calendar, ChevronRight, MapPin } from 'lucide-react';
import { Order, Product } from '../types';

interface AccountDrawerProps {
  isOpen: boolean;
  orders: Order[];
  wishlist: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onClearHistory: () => void;
}

export default function AccountDrawer({
  isOpen,
  orders,
  wishlist,
  onClose,
  onSelectProduct,
  onClearHistory
}: AccountDrawerProps) {
  if (!isOpen) return null;

  const [searchTracking, setSearchTracking] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorSearch, setErrorSearch] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTracking.trim()) return;

    const matched = orders.find(
      (o) => o.trackingNumber.toLowerCase() === searchTracking.trim().toLowerCase()
    );

    if (matched) {
      setSearchedOrder(matched);
      setErrorSearch(false);
    } else {
      setSearchedOrder(null);
      setErrorSearch(true);
      setTimeout(() => setErrorSearch(false), 3000);
    }
  };

  // Calculate Loyalty points (1 point per dollar spent!)
  const totalSpend = orders.reduce((acc, o) => acc + o.total, 0);
  const loyaltyPoints = Math.floor(totalSpend);

  return (
    <div id="account_drawer_mask" className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/80 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        className="w-full max-w-md h-full bg-neutral-900 border-l border-gold-600/25 shadow-2xl flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gold-600/15 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gold-500" />
            <h3 className="font-serif font-bold text-lg text-gold-300">Your Account & Orders Dashboard</h3>
          </div>
          <button id="close_account_drawer_btn" onClick={onClose} className="p-1 px-2.5 rounded-lg bg-neutral-900 text-stone-400 hover:text-white border border-gold-600/10 cursor-pointer">
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Loyalty Banner */}
          <div className="bg-gradient-to-r from-emerald-950 to-neutral-800 p-4 rounded-xl border border-gold-600/15 relative overflow-hidden shadow-inner">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">Loyalty Account</span>
                <span className="font-serif text-lg text-white font-semibold">Ummati Barakah Club</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Loyalty Points</span>
                <span className="font-serif text-2xl text-gold-300 font-bold">{loyaltyPoints} Pts</span>
              </div>
            </div>
            {/* Tiny stars decorations */}
            <div className="absolute right-4 bottom-2 opacity-15 text-gold-500 text-2xl font-black">✧ ✦</div>
          </div>

          {/* Live Order Tracker Lookup */}
          <div className="space-y-3 p-4 bg-neutral-950/70 rounded-xl border border-gold-600/10">
            <h4 className="text-xs font-mono text-gold-400 uppercase tracking-widest">Instant Order Tracking lookup</h4>
            
            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                id="order_tracking_search_input"
                type="text"
                required
                placeholder="Enter Tracking No: e.g. UMT-123456"
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className="flex-1 bg-neutral-900 border border-gold-600/15 rounded-xl py-2 px-3 text-xs uppercase text-white focus:outline-none"
              />
              <button
                id="lookup_order_btn"
                type="submit"
                className="py-2 px-4 bg-gold-600 hover:bg-gold-500 text-neutral-950 font-mono text-xs rounded-xl font-bold cursor-pointer"
              >
                Track
              </button>
            </form>

            <AnimatePresence>
              {errorSearch && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-400 text-xs font-mono"
                >
                  No active tracking file matched this number. Check spelling.
                </motion.p>
              )}
            </AnimatePresence>

            {searchedOrder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 bg-neutral-950 border border-gold-600/15 rounded-xl space-y-2 text-xs overflow-hidden"
              >
                <div className="flex justify-between font-mono font-bold text-gold-300">
                  <span>Tracking: {searchedOrder.trackingNumber}</span>
                  <span className="bg-gold-500/15 text-gold-400 px-1.5 py-0.5 rounded text-[10px]">
                    {searchedOrder.status}
                  </span>
                </div>
                
                {/* Progress flow map */}
                <div className="grid grid-cols-4 gap-0.5 text-[8px] text-center font-mono py-1.5 border-t border-b border-gold-600/10">
                  <div className={`p-1 rounded ${searchedOrder.status === 'Processing' ? 'bg-gold-500 text-neutral-950 font-bold' : 'bg-neutral-900 text-stone-500'}`}>1. Processing</div>
                  <div className={`p-1 rounded ${searchedOrder.status === 'Shipped' ? 'bg-gold-500 text-neutral-950 font-bold' : 'bg-neutral-900 text-stone-500'}`}>2. Shipped</div>
                  <div className={`p-1 rounded ${searchedOrder.status === 'Out for Delivery' ? 'bg-gold-500 text-neutral-950 font-bold' : 'bg-neutral-900 text-stone-500'}`}>3. Courier Out</div>
                  <div className={`p-1 rounded ${searchedOrder.status === 'Delivered' ? 'bg-gold-500 text-neutral-950 font-bold' : 'bg-neutral-900 text-stone-500'}`}>4. Received</div>
                </div>

                <div className="text-[11px] text-stone-300">
                  <div>Delivery Address: {searchedOrder.shippingAddress.addressLine}, {searchedOrder.shippingAddress.city}</div>
                  <div className="font-semibold text-white mt-1">Receipt Total: ${searchedOrder.total.toFixed(1)}</div>
                </div>
                
                <button
                  id="dismiss_search_btn"
                  onClick={() => setSearchedOrder(null)}
                  className="w-full text-center text-stone-500 hover:text-stone-300 text-[10px] font-mono pt-1"
                >
                  Dismiss tracker view
                </button>
              </motion.div>
            )}
          </div>

          {/* Historical Order Logs */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">Active & Past Orders</span>
              {orders.length > 0 && (
                <button
                  id="clear_order_history_btn"
                  onClick={onClearHistory}
                  className="text-[10px] text-red-400 font-mono hover:underline"
                >
                  Clear Logs
                </button>
              )}
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8 bg-neutral-950/20 border border-gold-600/5 p-4 rounded-xl space-y-1.5">
                <ShoppingBag className="w-8 h-8 text-stone-600 mx-auto" />
                <p className="text-xs text-stone-400 italic">No perfumes ordered yet under this browser session.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-neutral-950/40 border border-gold-600/10 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-stone-400">{order.date}</span>
                      <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-lg text-[9px] font-mono font-bold tracking-wider uppercase">
                        {order.status}
                      </span>
                    </div>

                    <div className="divide-y divide-gold-600/5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-1.5">
                          <span className="text-stone-300 truncate max-w-[200px]">{item.productName} ({item.size})</span>
                          <span className="font-mono text-stone-400">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gold-600/10 pt-2 flex items-center justify-between font-mono">
                      <span className="text-gold-400">Track ID: {order.trackingNumber}</span>
                      <span className="font-serif font-black text-white text-sm">${order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick-Access Bookmark Wishlist */}
          <div className="space-y-3.5 pt-2">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-2">Bookmarked Wishlist</span>
            {wishlist.length === 0 ? (
              <div className="text-center py-6 bg-neutral-950/20 border border-gold-600/5 rounded-xl text-xs text-stone-400 italic">
                Your luxury fragrance wishlist is currently empty.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                    }}
                    className="p-2 border border-gold-600/10 hover:border-gold-500/40 bg-neutral-950/50 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-stone-100 text-[11px] font-semibold block truncate hover:text-gold-300">{item.name}</span>
                      <span className="font-serif text-gold-400 text-xs font-bold block">${item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
