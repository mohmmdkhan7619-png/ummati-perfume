import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Compass, Star, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate merchant registry server
    setSubmitted(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('UMMATI10');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="bg-neutral-950/75 border-t border-b border-gold-600/15 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-br from-emerald-950/50 to-neutral-900 p-8 rounded-3xl border border-gold-600/10 gold-card-shadow relative overflow-hidden">
        
        {/* Subtle decorative dome background arch */}
        <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
          <svg className="w-80 h-80 text-gold-500" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C40 25, 25 40, 0 50 C25 60, 40 75, 50 100 C60 75, 75 60, 100 50 C75 40, 60 25, 50 0 Z" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full text-gold-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Subscribe for Barakah Secrets</span>
          </div>

          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-gold-300">
            Join the Ummati Circle
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Stay enlightened with exclusive notices of limited attar collections, Friday bakhoor recipes, and premium lifestyle values. Sincere blessings only.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
              >
                <div className="relative flex-1">
                  <input
                    id="newsletter_email_input"
                    type="email"
                    required
                    placeholder="Provide your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-gold-600/20 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-gold-300 focus:ring-1 focus:ring-gold-300"
                  />
                  <Mail className="absolute top-1/2 left-3.5 -translate-y-1/2 text-stone-500 w-4 h-4" />
                </div>
                <button
                  id="newsletter_subscribe_btn"
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-400 text-neutral-950 text-xs font-mono font-bold py-3 px-6 rounded-xl cursor-pointer transition-colors shadow-md"
                >
                  Join Circle
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto bg-neutral-950 border border-gold-600/25 p-5 rounded-2xl space-y-3.5 text-center mt-2"
              >
                <span className="text-2xl">🎉</span>
                <h4 className="font-serif text-gold-400 font-bold text-sm">Welcome to Ummati Fragrance House!</h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  We have verified your registry. As a gesture of greeting, please enjoy **10% OFF** your first order of premium attars and accessories.
                </p>

                {/* Voucher code segment */}
                <div className="flex border border-gold-600/25 rounded-xl bg-neutral-900 items-center justify-between p-2">
                  <span className="font-mono font-bold text-gold-300 text-sm ml-2">UMMATI10</span>
                  <button
                    id="copy_coupon_code_btn"
                    onClick={handleCopyCode}
                    className="py-1 px-3 bg-gold-400 hover:bg-gold-300 text-neutral-950 text-[10px] font-mono font-extrabold rounded-lg select-all"
                  >
                    {copied ? 'Copied ✓' : 'Copy Code'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[10px] text-stone-500 font-mono">
            No spam, cancel registry at any Jumuah. We guard your private data honestly.
          </p>
        </div>

      </div>
    </section>
  );
}
