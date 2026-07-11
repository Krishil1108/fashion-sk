'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, ChevronRight, Lock, CreditCard, ShoppingBag, Truck, Gift, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

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

  const total = mounted ? getCartTotal() : 0;
  const shipping = total > 2000 ? 0 : 150;
  const discountAmount = promoDiscount;
  const finalTotal = Math.max(0, total + shipping - discountAmount);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div style={{
        minHeight: '70vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-primary)', padding: '40px',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px',
        }}>
          <ShoppingBag size={32} color="var(--text-muted)" />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '12px', fontFamily: "var(--font-primary)", color: 'var(--text-primary)' }}>Your bag is empty</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center', fontFamily: "var(--font-secondary)", lineHeight: 1.6 }}>
          Add some items to your cart before checking out.
        </p>
        <button
          onClick={() => router.push('/menspage')}
          style={{
            background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', cursor: 'pointer',
            padding: '16px 36px', borderRadius: '999px', fontWeight: 800, fontSize: '12px',
            letterSpacing: '1.5px', textTransform: 'uppercase',
            fontFamily: "var(--font-secondary)",
            transition: 'transform 0.3s ease, background 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--text-inverted)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (name === 'cvc') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    setFormData({ ...formData, [name]: value });
  };

  const inputStyle = {
    width: '100%', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)',
    borderRadius: '14px', padding: '15px 18px',
    fontSize: '14px', color: 'var(--text-primary)', outline: 'none',
    fontFamily: "var(--font-secondary)", fontWeight: 500,
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        clearCart();
        setStep(3);
        setIsProcessing(false);
      }, 2200);
    }
  };

  const applyPromo = () => {
    if (promoApplied) return;
    if (promoCode.trim().toUpperCase() === 'MYNTRA300') {
      if (total >= 300) {
        setPromoDiscount(300);
        setPromoApplied(true);
      } else {
        alert('Minimum order Rs. 300 required for this code.');
      }
    } else {
      alert('Invalid code! Try MYNTRA300');
    }
  };

  // ─── Step indicator ───
  const stepIndicator = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '56px', gap: '0' }}>
      {[
        { num: '01', label: 'Shipping' },
        { num: '02', label: 'Payment' },
        { num: '03', label: 'Confirmed' },
      ].map(({ num, label }, i) => {
        const stepNum = i + 1;
        const isDone = step > stepNum;
        const isActive = step === stepNum;
        return (
          <React.Fragment key={num}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: isDone ? 'var(--accent)' : isActive ? 'var(--bg-primary)' : 'transparent',
                border: isDone ? 'none' : isActive ? '2px solid var(--accent)' : '2px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s ease',
                boxShadow: isActive ? 'var(--accent-glow)' : 'none',
              }}>
                {isDone
                  ? <Check size={16} color="white" />
                  : <span style={{ fontSize: '11px', fontWeight: 900, color: isActive ? 'var(--accent)' : 'var(--text-muted)', fontFamily: "var(--font-secondary)" }}>{num}</span>
                }
              </div>
              <span style={{
                fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                color: isActive ? 'var(--text-primary)' : isDone ? 'var(--accent)' : 'var(--text-muted)',
                fontFamily: "var(--font-secondary)",
                transition: 'color 0.4s',
              }}>{label}</span>
            </div>
            {i < 2 && (
              <div style={{
                width: '60px', height: '1px', margin: '0 16px',
                background: step > i + 1 ? 'var(--accent)' : 'var(--border-color)',
                transition: 'background 0.6s ease',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // ─── Order Summary Panel ───
  const orderSummary = (
    <div style={{
      background: 'var(--bg-section-alt)', borderRadius: '28px', padding: '32px',
      border: '1px solid var(--border-color)',
      position: 'sticky', top: '110px',
    }}>
      <h3 style={{ fontSize: '13px', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', fontFamily: "var(--font-secondary)" }}>
        Order Summary
      </h3>

      {/* Cart items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '280px', overflowY: 'auto', marginBottom: '24px' }}>
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{
              width: '56px', height: '68px', borderRadius: '12px', overflow: 'hidden',
              background: 'var(--bg-primary)', border: '1px solid var(--border-color)', flexShrink: 0,
            }}>
              <img src={item.image || item.image_url} alt={item.name || item.para} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "var(--font-secondary)", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.name || item.para}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px', fontFamily: "var(--font-secondary)" }}>
                Size: {item.size || 'M'} · Qty: {item.quantity}
              </p>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: "var(--font-primary)", flexShrink: 0 }}>
              Rs. {(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Promo code */}
      {step !== 3 && (
        <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '20px 0', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Gift size={13} color="var(--gold)" />
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: "var(--font-secondary)" }}>
              Discount Coupon
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Try: MYNTRA300"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
              style={{
                flex: 1, padding: '11px 14px', borderRadius: '10px',
                border: '1.5px solid var(--input-border)', outline: 'none',
                fontSize: '12px', fontFamily: "var(--font-secondary)", fontWeight: 600,
                background: promoApplied ? 'var(--bg-secondary)' : 'var(--input-bg)', color: 'var(--text-primary)',
              }}
            />
            <button
              onClick={applyPromo}
              disabled={promoApplied}
              style={{
                padding: '11px 18px', borderRadius: '10px', border: 'none', cursor: promoApplied ? 'default' : 'pointer',
                background: promoApplied ? 'var(--border-color)' : 'var(--accent)', color: promoApplied ? 'var(--text-muted)' : 'white',
                fontSize: '11px', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase',
                fontFamily: "var(--font-secondary)", transition: 'background 0.2s',
              }}
            >
              {promoApplied ? '✓ Applied' : 'Apply'}
            </button>
          </div>
          {promoApplied && (
            <p style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 700, marginTop: '8px', fontFamily: "var(--font-secondary)" }}>
              ✓ Saved Rs. 300!
            </p>
          )}
        </div>
      )}

      {/* Price breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: "var(--font-secondary)", fontWeight: 500 }}>Subtotal</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "var(--font-primary)" }}>Rs. {total.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: "var(--font-secondary)", fontWeight: 500 }}>Shipping</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: shipping === 0 ? 'var(--success)' : 'var(--text-primary)', fontFamily: "var(--font-primary)" }}>
            {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
          </span>
        </div>
        {promoApplied && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--success)', fontFamily: "var(--font-secondary)", fontWeight: 600 }}>Coupon Discount</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--success)', fontFamily: "var(--font-primary)" }}>− Rs. 300</span>
          </div>
        )}
        <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "var(--font-secondary)" }}>Total</span>
          <span style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: "var(--font-primary)" }}>Rs. {finalTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Trust badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '20px' }}>
        <ShieldCheck size={14} color="var(--success)" />
        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: "var(--font-secondary)" }}>
          Secure & Encrypted Checkout
        </span>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '120px', paddingBottom: '80px', transition: 'background-color 0.4s ease' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Steps */}
        {stepIndicator}

        <AnimatePresence mode="wait">
          {step === 3 ? (
            // ─── SUCCESS ───
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                maxWidth: '480px', margin: '0 auto', textAlign: 'center',
                padding: '60px 40px',
                background: 'var(--bg-secondary)', borderRadius: '32px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{
                width: '88px', height: '88px', background: 'linear-gradient(135deg, var(--success), #34d399)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 28px',
                boxShadow: '0 0 48px rgba(5,150,105,0.35)',
              }}>
                <Check size={40} color="white" strokeWidth={3} />
              </div>
              <h1 style={{
                fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '12px',
                fontFamily: "var(--font-primary)", letterSpacing: '-1px',
              }}>Order Confirmed!</h1>
              <p style={{
                color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px',
                fontFamily: "var(--font-secondary)", fontSize: '14px',
              }}>
                Thank you {formData.firstName && <strong style={{ color: 'var(--text-primary)' }}>{formData.firstName}</strong>}! Your premium order is being processed and will be delivered within 3-5 business days.
              </p>
              <div style={{
                background: 'var(--gold-light)22', border: '1px solid var(--gold)',
                borderRadius: '20px', padding: '20px', marginBottom: '28px',
              }}>
                <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', fontFamily: "var(--font-secondary)" }}>
                  Order ID
                </p>
                <p style={{ fontSize: '28px', fontWeight: 900, color: 'var(--gold)', fontFamily: "var(--font-primary)", letterSpacing: '3px' }}>
                  #AUR-{orderId}
                </p>
              </div>
              <Link href="/Landingpage" style={{
                display: 'block', background: 'var(--text-primary)', color: 'var(--bg-primary)',
                padding: '16px', borderRadius: '16px', textDecoration: 'none',
                fontWeight: 900, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
                fontFamily: "var(--font-secondary)",
                transition: 'transform 0.3s, background 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--text-inverted)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
              >
                Continue Browsing →
              </Link>
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }} className="checkout-grid">

              {/* ─── LEFT: Form ─── */}
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleNextStep}
                  >
                    {/* Contact */}
                    <div style={{
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '24px', padding: '32px', marginBottom: '20px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ width: '36px', height: '36px', background: 'var(--accent-light)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Lock size={16} color="var(--accent)" />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: "var(--font-primary)" }}>Contact Details</h2>
                      </div>
                      <input
                        type="email" name="email" required
                        placeholder="Email Address"
                        value={formData.email} onChange={handleInputChange}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Shipping Address */}
                    <div style={{
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '24px', padding: '32px', marginBottom: '28px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ width: '36px', height: '36px', background: 'rgba(201,168,76,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Truck size={16} color="var(--gold)" />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: "var(--font-primary)" }}>Shipping Address</h2>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <input type="text" name="firstName" required placeholder="First Name" value={formData.firstName} onChange={handleInputChange} style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                          <input type="text" name="lastName" required placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                        </div>
                        <input type="text" name="address" required placeholder="Street Address" value={formData.address} onChange={handleInputChange} style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <input type="text" name="city" required placeholder="City" value={formData.city} onChange={handleInputChange} style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                          <input type="text" name="postalCode" required placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                        </div>
                      </div>
                    </div>

                    <button type="submit" style={{
                      width: '100%', padding: '18px', borderRadius: '16px',
                      background: 'var(--accent-gradient)', color: 'white', border: 'none',
                      fontWeight: 900, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
                      cursor: 'pointer', fontFamily: "var(--font-secondary)",
                      boxShadow: 'var(--accent-glow)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 60px rgba(255,63,108,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--accent-glow)'; }}
                    >
                      Continue to Payment →
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleNextStep}
                  >
                    {/* Live Credit Card */}
                    <div style={{
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                      borderRadius: '24px', padding: '32px',
                      position: 'relative', overflow: 'hidden',
                      aspectRatio: '1.75/1', maxWidth: '420px', margin: '0 auto 28px',
                      border: '1px solid rgba(201,168,76,0.2)',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
                    }}>
                      {/* Ambient glows */}
                      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '180px', height: '180px', background: 'rgba(255,63,108,0.15)', borderRadius: '50%', filter: 'blur(50px)' }} />
                      <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '160px', height: '160px', background: 'rgba(201,168,76,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />

                      {/* Chip */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, marginBottom: '28px' }}>
                        <div style={{
                          width: '48px', height: '36px', background: 'linear-gradient(135deg, #D4AF5A, #C9A84C)',
                          borderRadius: '8px', display: 'flex', flexDirection: 'column',
                          justifyContent: 'center', gap: '4px', padding: '6px 8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}>
                          {[0,1,2].map(i => <div key={i} style={{ height: '1px', background: 'rgba(0,0,0,0.2)' }} />)}
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 900, fontSize: '20px', fontFamily: "var(--font-primary)", fontStyle: 'italic', letterSpacing: '-0.5px' }}>
                          AURA
                        </span>
                      </div>

                      {/* Card number */}
                      <div style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
                        <p style={{
                          fontSize: '22px', fontFamily: 'monospace', letterSpacing: '0.2em',
                          color: formData.cardNumber ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.3)',
                          fontWeight: 600,
                        }}>
                          {formData.cardNumber || '•••• •••• •••• ••••'}
                        </p>
                      </div>

                      {/* Card holder and expiry */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                        <div>
                          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', fontFamily: "var(--font-secondary)" }}>Card Holder</p>
                          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {formData.cardName || `${formData.firstName} ${formData.lastName}`.trim() || 'AURA CUSTOMER'}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', fontFamily: "var(--font-secondary)" }}>Expires</p>
                          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '2px' }}>
                            {formData.expiry || 'MM/YY'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Form */}
                    <div style={{
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '24px', padding: '32px', marginBottom: '20px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', background: 'var(--accent-light)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CreditCard size={16} color="var(--accent)" />
                          </div>
                          <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: "var(--font-primary)" }}>Card Details</h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.25)', padding: '6px 12px', borderRadius: '999px' }}>
                          <ShieldCheck size={12} color="var(--success)" />
                          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--success)', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "var(--font-secondary)" }}>SSL Secure</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <input type="text" name="cardName" required placeholder="Cardholder Name" value={formData.cardName} onChange={handleInputChange} style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                        <input type="text" name="cardNumber" required placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange}
                          style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '2px' }}
                          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <input type="text" name="expiry" required placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange}
                            style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '2px' }}
                            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                          <input type="password" name="cvc" required placeholder="CVC" value={formData.cvc} onChange={handleInputChange}
                            style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '4px' }}
                            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button type="button" onClick={() => setStep(1)} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '18px 24px', borderRadius: '16px', border: '1.5px solid var(--border-color)',
                        background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer',
                        fontWeight: 700, fontSize: '12px', fontFamily: "var(--font-secondary)",
                        transition: 'border-color 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button type="submit" disabled={isProcessing} style={{
                        flex: 1, padding: '18px', borderRadius: '16px',
                        background: isProcessing ? 'var(--border-color)' : 'var(--accent-gradient)',
                        color: isProcessing ? 'var(--text-muted)' : 'white', border: 'none',
                        fontWeight: 900, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
                        cursor: isProcessing ? 'default' : 'pointer', fontFamily: "var(--font-secondary)",
                        boxShadow: isProcessing ? 'none' : 'var(--accent-glow)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        transition: 'all 0.3s ease',
                      }}>
                        {isProcessing ? (
                          <>
                            <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Lock size={14} /> Authorize & Pay Rs. {finalTotal.toLocaleString()}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* ─── RIGHT: Order Summary ─── */}
              {orderSummary}
            </div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
