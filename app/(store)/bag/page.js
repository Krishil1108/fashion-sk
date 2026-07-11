'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Minus, Plus, ArrowRight, Gift, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartStore();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getCartTotal();
  const shipping = total > 2000 ? 0 : 150;
  const discount = promoDiscount;
  const finalPayable = Math.max(0, total + shipping - discount);

  const handleApplyPromo = () => {
    if (promoApplied) return;
    if (promoCode.trim().toUpperCase() === 'MYNTRA300') {
      if (total > 300) {
        setPromoDiscount(300);
        setPromoApplied(true);
      } else {
        alert('Promo code MYNTRA300 is only valid for orders above Rs. 300');
      }
    } else {
      alert('Invalid Promo Code! Try MYNTRA300');
    }
  };

  const handlePlaceOrder = () => {
    router.push('/checkout');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-[#ff3f6c] text-xs font-extrabold uppercase tracking-widest block mb-2">
          Your Selection
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center justify-center gap-3">
          Shopping Bag
          <span className="text-sm font-semibold bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-gray-500 dark:text-gray-400">
            {cartItems.length} items
          </span>
        </h1>
      </div>

      <AnimatePresence mode="popLayout">
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your shopping bag is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link 
              href="/menspage" 
              className="inline-flex items-center gap-2 bg-[#ff3f6c] hover:bg-[#e02454] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg shadow-[#ff3f6c]/20 hover:scale-105 transition-all"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex gap-4 p-4 bg-white dark:bg-[#0b0c10] border border-gray-100 dark:border-white/5 rounded-3xl relative shadow-sm"
                  >
                    <div className="w-20 h-24 bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-gray-100 dark:border-white/5">
                      <img src={item.image || item.image_url} alt={item.name || item.para} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff3f6c]">
                            {item.brand}
                          </span>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-gray-400 hover:text-[#ff3f6c] transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate mt-0.5">{item.name || item.para}</h4>
                        <p className="text-xs text-gray-400 mt-1">Size: {item.size || 'M'}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50 dark:border-white/5">
                        <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                          Rs. {item.price?.toLocaleString()}
                        </span>
                        
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-full overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pricing Details Panel */}
            <div className="lg:col-span-5 bg-gray-50 dark:bg-white/5 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-white/5 space-y-6">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Price Details
              </h4>
              
              <div className="space-y-3.5 text-sm font-semibold text-gray-500 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-white">Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Coupon Discount</span>
                    <span>- Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-200/50 dark:border-white/5 pt-4 flex justify-between items-baseline">
                  <span className="text-base text-gray-900 dark:text-white font-extrabold uppercase">Total Amount</span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white">Rs. {finalPayable.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Coupon Area */}
              <div className="border-t border-gray-200/50 dark:border-white/5 pt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ff3f6c] uppercase tracking-wider">
                  <Gift className="w-4 h-4" /> Apply Coupon (Try: MYNTRA300)
                </div>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-black rounded-xl px-4 py-3 text-xs outline-none focus:border-[#ff3f6c] font-bold" 
                  />
                  <button 
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="bg-[#ff3f6c] hover:bg-[#e02454] disabled:bg-gray-200 dark:disabled:bg-white/10 text-white rounded-xl px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-colors"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-[#ff3f6c] hover:bg-[#e02454] text-white py-4.5 rounded-2xl font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-[#ff3f6c]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-extrabold pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Checkout Assured
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
