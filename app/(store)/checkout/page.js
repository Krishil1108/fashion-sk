'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, ChevronRight, Lock, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form States
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const total = getCartTotal();
  const shipping = total > 150 ? 0 : 15;
  const finalTotal = total + shipping;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Your bag is empty</h1>
        <p className="text-gray-500 mb-8">Let's add some items before you checkout.</p>
        <button 
          onClick={() => router.push('/menspage')}
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    if (step === 2) {
      // Simulate payment processing
      setTimeout(() => {
        clearCart();
        setStep(3);
      }, 1500);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
      {/* Steps indicator */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className={`flex items-center gap-2 ${step >= 1 ? 'text-black dark:text-white' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step > 1 ? 'bg-black text-white' : 'border-2 border-black dark:border-white'}`}>
              {step > 1 ? <Check className="w-3 h-3" /> : 1}
            </span>
            Shipping
          </span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className={`flex items-center gap-2 ${step >= 2 ? 'text-black dark:text-white' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step > 2 ? 'bg-black text-white' : (step === 2 ? 'border-2 border-black dark:border-white' : 'border-2 border-gray-300')}`}>
              {step > 2 ? <Check className="w-3 h-3" /> : 2}
            </span>
            Payment
          </span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className={`flex items-center gap-2 ${step === 3 ? 'text-black dark:text-white' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-black text-white' : 'border-2 border-gray-300'}`}>
              3
            </span>
            Success
          </span>
        </div>
      </div>

      {step === 3 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center py-12"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase, {formData.firstName}. We've received your order and will send a confirmation email to {formData.email}.
          </p>
          <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl mb-8">
            <p className="text-sm font-medium mb-1">Order Number</p>
            <p className="text-xl font-bold tracking-widest text-[#ff3f6c]">#AUR-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          <Link href="/Landingpage" className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform">
            Return to Home
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleNextStep}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div>
                    <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/10 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-6 mt-10">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" required placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/10 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                    <input type="text" name="lastName" required placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/10 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                  </div>
                  <div>
                    <input type="text" name="address" required placeholder="Address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/10 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="city" required placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/10 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                    <input type="text" name="postalCode" required placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/10 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                  </div>
                  <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-wider mt-8 hover:bg-gray-800 transition-colors">
                    Continue to Payment
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleNextStep}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Payment Method</h2>
                    <div className="flex gap-2 text-gray-400">
                      <Lock className="w-5 h-5" />
                      <span className="text-sm font-medium">Secure Encrypted</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-gray-50/50 dark:bg-white/5 space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-6 h-6" />
                      <span className="font-bold">Credit Card</span>
                    </div>
                    <div>
                      <input type="text" name="cardNumber" required placeholder="Card Number" maxLength="16" value={formData.cardNumber} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/20 bg-white dark:bg-black rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="expiry" required placeholder="MM/YY" maxLength="5" value={formData.expiry} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/20 bg-white dark:bg-black rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                      <input type="text" name="cvc" required placeholder="CVC" maxLength="4" value={formData.cvc} onChange={handleInputChange} className="w-full border border-gray-300 dark:border-white/20 bg-white dark:bg-black rounded-xl px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors">
                      Back
                    </button>
                    <button type="submit" className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" /> Pay ${finalTotal.toFixed(2)}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-6 lg:p-8 sticky top-28 border border-gray-100 dark:border-white/10">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-white dark:bg-black rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-white/10">
                      <img src={item.image_url} alt={item.para} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-sm">
                      <h4 className="font-bold line-clamp-2">{item.para}</h4>
                      <p className="text-gray-500 mt-1">Size: {item.size}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-bold">${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-white/10 pt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-white/10 pt-3 mt-3 flex justify-between items-end">
                  <span className="font-bold text-base">Total</span>
                  <span className="text-2xl font-black">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Guaranteed Safe & Secure Checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
