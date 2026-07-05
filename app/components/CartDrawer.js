'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const total = getCartTotal();
  const count = getCartCount();
  const FREE_SHIPPING_THRESHOLD = 2000;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountLeft = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: "fixed", inset: 0, zIndex: 400,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 401,
              width: "min(100vw, 440px)",
              background: "white",
              display: "flex", flexDirection: "column",
              boxShadow: "-8px 0 60px rgba(0,0,0,0.12)",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px", borderBottom: "1px solid #f0f0f0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingBag size={20} color="#1a1c23" />
                <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1a1c23", fontFamily: "'Outfit', sans-serif" }}>Your Bag</h2>
                <span style={{
                  background: "#ff3f6c", color: "white",
                  fontSize: "11px", fontWeight: 800, padding: "2px 8px",
                  borderRadius: "999px",
                }}>
                  {count}
                </span>
              </div>
              <button
                onClick={closeCart}
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: "#f4f6f8", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#636b74", transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#e5e7eb"}
                onMouseLeave={e => e.currentTarget.style.background = "#f4f6f8"}
              >
                <X size={17} />
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div style={{ padding: "16px 24px", background: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: "13px", color: "#636b74", marginBottom: "10px" }}>
                {amountLeft > 0
                  ? <><span style={{ fontWeight: 700, color: "#1a1c23" }}>Rs. {amountLeft.toLocaleString()}</span> more for Free Shipping</>
                  : <span style={{ color: "#059669", fontWeight: 700 }}>🎉 You have Free Shipping!</span>
                }
              </p>
              <div style={{ height: "4px", background: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    height: "100%", borderRadius: "999px",
                    background: progress === 100 ? "#059669" : "#ff3f6c",
                  }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {cartItems.length === 0 ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 20px", gap: "16px" }}>
                  <ShoppingBag size={48} color="#d1d5db" />
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "#1a1c23", marginBottom: "6px" }}>Your bag is empty</p>
                    <p style={{ fontSize: "14px", color: "#8e95a0" }}>Looks like you haven't added anything yet.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    style={{
                      marginTop: "8px", padding: "10px 28px",
                      background: "#1a1c23", color: "white",
                      border: "none", borderRadius: "999px",
                      fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} style={{
                    display: "flex", gap: "14px",
                    padding: "14px", borderRadius: "16px",
                    border: "1px solid #f0f0f0", background: "white",
                  }}>
                    {/* Image */}
                    <div style={{ width: "80px", height: "96px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, background: "#f4f6f8" }}>
                      <img src={item.image || item.image_url} alt={item.name || item.para} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                        <div>
                          <p style={{ fontSize: "12px", fontWeight: 700, color: "#8e95a0", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "3px" }}>{item.brand}</p>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1c23", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.name || item.para}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#8e95a0", padding: "4px", flexShrink: 0, transition: "color 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
                          onMouseLeave={e => e.currentTarget.style.color = "#8e95a0"}
                        >
                          <X size={15} />
                        </button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "16px", fontWeight: 900, color: "#1a1c23" }}>Rs. {item.price?.toLocaleString?.() ?? item.price}</p>
                        {/* Quantity */}
                        <div style={{
                          display: "flex", alignItems: "center",
                          border: "1.5px solid #e5e7eb", borderRadius: "999px", overflow: "hidden",
                        }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            style={{ width: "30px", height: "30px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#636b74" }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ width: "28px", textAlign: "center", fontSize: "13px", fontWeight: 700 }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            style={{ width: "30px", height: "30px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#636b74" }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout section */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: "1px solid #f0f0f0", padding: "20px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#636b74" }}>
                    <span>Subtotal</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#636b74" }}>
                    <span>Shipping</span>
                    <span>{progress === 100 ? "Free" : "Calculated at checkout"}</span>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: "18px", fontWeight: 900, color: "#1a1c23",
                    paddingTop: "12px", borderTop: "1px solid #f0f0f0",
                  }}>
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => { closeCart(); router.push('/checkout'); }}
                  style={{
                    width: "100%", padding: "16px",
                    background: "linear-gradient(135deg, #ff3f6c, #ff6b8b)",
                    color: "white", border: "none", borderRadius: "16px",
                    fontSize: "14px", fontWeight: 800, letterSpacing: "0.5px",
                    cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    boxShadow: "0 8px 24px rgba(255,63,108,0.3)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,63,108,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,63,108,0.3)"; }}
                >
                  Proceed to Checkout <ArrowRight size={17} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
