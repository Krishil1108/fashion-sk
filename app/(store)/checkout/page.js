'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, ChevronRight, Lock, CreditCard, ShoppingBag, Truck, Gift } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  // Form States
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });

  const total = getCartTotal();
  const shipping = total > 2000 ? 0 : 150;
  const discountAmount = promoDiscount;
  const finalTotal = Math.max(0, total + shipping - discountAmount);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-gray-300 dark:text-gray-600" />
        </div>
        <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Your bag is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">Let's add some luxury styles to your cart before proceeding to checkout.</p>
        <button 
          onClick={() => router.push('/menspage')}
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    // Format card details as the user types
    if (name === 'cardNumber') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    }
    if (name === 'expiry') {
      value = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim().slice(0, 5);
      if (value.endsWith('/')) value = value.slice(0, -1);
    }
    if (name === 'cvc') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Simulate payment processing
      const submitBtn = document.getElementById('payment-submit-btn');
      if (submitBtn) {
        submitBtn.innerHTML = "Processing Payment...";
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        clearCart();
        setStep(3);
      }, 2000);
    }
  };

  const applyPromo = () => {
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

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Steps indicator */}
      <div className="flex items-center justify-center mb-16">
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <span className={`flex items-center gap-2 ${step >= 1 ? 'text-[#ff3f6c]' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 transition-all ${step > 1 ? 'bg-[#ff3f6c] border-[#ff3f6c] text-white' : 'border-[#ff3f6c] text-[#ff3f6c]'}`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '01'}
            </span>
            Shipping
          </span>
          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700" />
          <span className={`flex items-center gap-2 ${step >= 2 ? 'text-[#ff3f6c]' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 transition-all ${step > 2 ? 'bg-[#ff3f6c] border-[#ff3f6c] text-white' : (step === 2 ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-gray-300 dark:border-gray-700 text-gray-400')}`}>
              {step > 2 ? <Check className="w-4 h-4" /> : '02'}
            </span>
            Payment
          </span>
          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700" />
          <span className={`flex items-center gap-2 ${step === 3 ? 'text-[#ff3f6c]' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 transition-all ${step === 3 ? 'border-[#ff3f6c] text-[#ff3f6c] bg-[#ff3f6c] text-white' : 'border-gray-300 dark:border-gray-700 text-gray-400'}`}>
              03
            </span>
            Success
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 3 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">Order Confirmed!</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Thank you for choosing Aura, {formData.firstName}. We've processed your premium order and sent details to <span className="font-semibold text-gray-900 dark:text-white">{formData.email}</span>.
            </p>
            <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-6 rounded-3xl mb-8">
              <p className="text-xs uppercase tracking-widest font-extrabold text-gray-400 mb-1">Receipt ID</p>
              <p className="text-2xl font-black tracking-widest text-[#ff3f6c]">#AUR-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <Link href="/Landingpage" className="inline-block w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold uppercase tracking-wider text-xs hover:scale-[1.02] transition-transform shadow-lg">
              Continue Browsing
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    onSubmit={handleNextStep}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Lock className="w-6 h-6 text-[#ff3f6c]" /> Contact details
                      </h2>
                      <div className="relative">
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          placeholder="Email Address" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          className="w-full border border-gray-200 dark:border-white/10 bg-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] focus:ring-2 focus:ring-[#ff3f6c]/10 transition-all font-semibold" 
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Truck className="w-6 h-6 text-[#ff3f6c]" /> Shipping Address
                      </h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" name="firstName" required placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-200 dark:border-white/10 bg-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] focus:ring-2 focus:ring-[#ff3f6c]/10 transition-all font-semibold" />
                          <input type="text" name="lastName" required placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-200 dark:border-white/10 bg-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] focus:ring-2 focus:ring-[#ff3f6c]/10 transition-all font-semibold" />
                        </div>
                        <input type="text" name="address" required placeholder="Street Address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-200 dark:border-white/10 bg-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] focus:ring-2 focus:ring-[#ff3f6c]/10 transition-all font-semibold" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" name="city" required placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-200 dark:border-white/10 bg-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] focus:ring-2 focus:ring-[#ff3f6c]/10 transition-all font-semibold" />
                          <input type="text" name="postalCode" required placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} className="w-full border border-gray-200 dark:border-white/10 bg-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] focus:ring-2 focus:ring-[#ff3f6c]/10 transition-all font-semibold" />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-[#ff3f6c] hover:bg-[#e02454] text-white py-5 rounded-2xl font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-[#ff3f6c]/20 hover:scale-[1.01] transition-all"
                    >
                      Proceed to Payment Info
                    </button>
                  </motion.form>
                ) : (
                  <motion.form 
                    key="step2"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    onSubmit={handleNextStep}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Lock className="w-6 h-6 text-[#ff3f6c]" /> Secure Payment
                      </h2>
                      <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-4 h-4" /> SSL Encrypted
                      </div>
                    </div>

                    {/* LIVE CREDIT CARD DYNAMIC VISUAL MOCKUP */}
                    <div className="relative w-full aspect-[1.7/1] sm:aspect-[1.9/1] max-w-md mx-auto bg-gradient-to-br from-zinc-800 via-zinc-900 to-[#12131a] rounded-3xl p-6 text-white shadow-2xl flex flex-col justify-between overflow-hidden border border-white/15">
                      {/* Ambient background glows */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3f6c]/20 rounded-full blur-[40px] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />

                      <div className="flex justify-between items-start z-10">
                        {/* Chip design */}
                        <div className="w-12 h-9 bg-amber-200/90 rounded-lg relative overflow-hidden flex flex-col justify-between p-1.5 shadow-inner">
                          <div className="border-t border-zinc-900/10 w-full h-[1px]" />
                          <div className="border-t border-zinc-900/10 w-full h-[1px]" />
                          <div className="border-t border-zinc-900/10 w-full h-[1px]" />
                        </div>
                        <span className="text-lg font-black italic tracking-wider text-white/95">AURA</span>
                      </div>

                      {/* Card Number display */}
                      <div className="z-10 text-xl sm:text-2xl font-mono tracking-[0.18em] text-center my-4 font-semibold text-white/90">
                        {formData.cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between items-end z-10 text-xs font-semibold text-white/80">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Card Holder</p>
                          <p className="uppercase tracking-wide truncate max-w-[200px]">
                            {formData.cardName || `${formData.firstName} ${formData.lastName}`.trim() || 'Aura Customer'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Expires</p>
                          <p className="font-mono tracking-wider">{formData.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-100 dark:border-white/5 rounded-3xl p-6 bg-gray-50/50 dark:bg-white/5 space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="w-5 h-5 text-[#ff3f6c]" />
                        <span className="font-extrabold text-sm uppercase tracking-wider">Card Specifications</span>
                      </div>
                      <input 
                        type="text" 
                        name="cardName" 
                        required 
                        placeholder="Cardholder Name" 
                        value={formData.cardName} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] transition-all font-semibold" 
                      />
                      <input 
                        type="text" 
                        name="cardNumber" 
                        required 
                        placeholder="Card Number" 
                        value={formData.cardNumber} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] transition-all font-semibold font-mono tracking-wider" 
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          name="expiry" 
                          required 
                          placeholder="MM/YY" 
                          value={formData.expiry} 
                          onChange={handleInputChange} 
                          className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] transition-all font-semibold font-mono tracking-wider" 
                        />
                        <input 
                          type="password" 
                          name="cvc" 
                          required 
                          placeholder="CVC" 
                          value={formData.cvc} 
                          onChange={handleInputChange} 
                          className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black rounded-2xl px-5 py-4 focus:outline-none focus:border-[#ff3f6c] dark:focus:border-[#ff3f6c] transition-all font-semibold font-mono tracking-wider" 
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="px-8 py-5 rounded-2xl font-bold uppercase tracking-wider text-xs bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        id="payment-submit-btn"
                        type="submit" 
                        className="flex-1 bg-[#ff3f6c] hover:bg-[#e02454] text-white py-5 rounded-2xl font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-[#ff3f6c]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" /> Authorize & Pay Rs. {finalTotal.toLocaleString()}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-6 sm:p-8 sticky top-28 border border-gray-100/50 dark:border-white/5 space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Order Summary</h3>
                
                {/* Cart list items */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                      <div className="w-14 h-18 bg-white dark:bg-black rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-white/5">
                        <img src={item.image || item.image_url} alt={item.name || item.para} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-sm min-w-0">
                        <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.name || item.para}</h4>
                        <p className="text-gray-400 text-xs mt-0.5">Size: {item.size || 'M'} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code input wrapper */}
                {step !== 3 && (
                  <div className="border-t border-b border-gray-200/50 dark:border-white/5 py-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#ff3f6c] uppercase tracking-wider">
                      <Gift className="w-4 h-4" /> Enter Discount Coupon
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="Coupon Code (e.g. MYNTRA300)" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="flex-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-black rounded-xl px-4 py-3 text-xs outline-none focus:border-[#ff3f6c] font-bold" 
                      />
                      <button 
                        type="button" 
                        onClick={applyPromo}
                        disabled={promoApplied}
                        className="bg-[#ff3f6c] hover:bg-[#e02454] disabled:bg-gray-200 dark:disabled:bg-white/10 text-white rounded-xl px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-colors"
                      >
                        {promoApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                        ✓ Promo Code Applied Successfully! Saved Rs. {promoDiscount}
                      </p>
                    )}
                  </div>
                )}

                {/* Receipt Details summary */}
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
                      <span>Discount</span>
                      <span>- Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200/50 dark:border-white/5 pt-4 flex justify-between items-baseline">
                    <span className="text-base text-gray-900 dark:text-white font-extrabold uppercase">Total</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-extrabold pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Checkout Assured
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
