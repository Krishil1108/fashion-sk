"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, RefreshCw, Truck, Heart, ShoppingBag, Ruler, Check, ChevronRight, Flame, X } from "lucide-react";
import { client, urlFor } from "../../../../sanity/client";
import { useCartStore } from "../../../store/useCartStore";

const mockLookItems = [
  { 
    id: "look-1", 
    name: "Premium Leather Watch", 
    price: 2499, 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop",
    fallback: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop"
  },
  { 
    id: "look-2", 
    name: "Minimalist Retro Sneakers", 
    price: 3499, 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop",
    fallback: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop"
  },
  { 
    id: "look-3", 
    name: "Classic Metal Sunglasses", 
    price: 1299, 
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=200&auto=format&fit=crop",
    fallback: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=200&auto=format&fit=crop"
  },
];

const fallbackImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop"
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("specs");

  const { addToCart, wishlistItems, toggleWishlist } = useCartStore();
  const isWishlisted = product ? wishlistItems.some(item => item.id === product.id) : false;

  // Zoomable Gallery State
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center', transform: 'scale(1)' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.6)'
    });
  };

  const handleMouseLeaveImage = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  // Fit Predictor States
  const [showFitPredictor, setShowFitPredictor] = useState(false);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [fitResult, setFitResult] = useState("");

  // Bundle Addons
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const query = `*[_type == "product" && _id == $id][0]`;
        const fetched = await client.fetch(query, { id });

        if (fetched) {
          const formatted = {
            id: fetched._id,
            brand: fetched.brand,
            title: fetched.title,
            price: fetched.price,
            strikedPrice: fetched.strikedPrice,
            offer: fetched.offer,
            images: [
              urlFor(fetched.image).url(),
              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop",
            ],
            rating: 4.3,
            reviewsCount: 88,
            sustainability: true,
            material: "100% Organic Cotton",
            care: "Machine wash cold, tumble dry low"
          };
          setProduct(formatted);
        } else {
          setProduct({
            id: "fallback-product",
            brand: "Aura Premium",
            title: "Classic Oversized Textured Tee",
            price: 1899,
            strikedPrice: 2999,
            offer: "35% OFF",
            images: fallbackImages,
            rating: 4.6,
            reviewsCount: 142,
            sustainability: true,
            material: "100% Cotton",
            care: "Cold gentle wash, do not bleach"
          });
        }
      } catch (err) {
        console.error("PDP Load error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist({
        id: product.id,
        brand: product.brand,
        para: product.title,
        price: product.price,
        image_url: product.images[0]
      });
    }
  };

  const handleFitPredictor = (e) => {
    e.preventDefault();
    const bmi = weight / ((height / 100) * (height / 100));
    let size = "M";
    if (bmi < 20) size = "S";
    else if (bmi >= 20 && bmi < 25) size = "M";
    else if (bmi >= 25 && bmi < 30) size = "L";
    else size = "XL";

    setFitResult(size);
  };

  const toggleAddon = (itemId) => {
    setSelectedAddons(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const addToBag = (e) => {
    if (!selectedSize) {
      alert("Please select a size before adding to bag.");
      return;
    }

    addToCart(
      {
        id: product.id,
        brand: product.brand,
        para: product.title,
        price: product.price,
        image_url: product.images[0],
      },
      selectedSize,
      1
    );

    selectedAddons.forEach(addonId => {
      const addonItem = mockLookItems.find(item => item.id === addonId);
      if (addonItem) {
        addToCart(
          {
            id: addonItem.id,
            brand: "Aura Essentials",
            para: addonItem.name,
            price: addonItem.price,
            image_url: addonItem.image,
          },
          "OS",
          1
        );
      }
    });

    const btn = e.currentTarget;
    const oldHTML = btn.innerHTML;
    btn.innerHTML = "✓ ADDED TO BAG";
    btn.style.background = "var(--success)";
    btn.style.boxShadow = "none";
    setTimeout(() => {
      btn.innerHTML = oldHTML;
      btn.style.background = "";
      btn.style.boxShadow = "";
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--accent)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", gap: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>Product not found</h2>
        <button onClick={() => router.push("/Landingpage")} style={{ background: "var(--accent)", color: "white", padding: "12px 28px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: 700 }}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", transition: "background-color 0.4s ease, color 0.4s ease" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "40px 5vw 80px" }}>
        
        {/* PDP Split View */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "56px", alignItems: "start" }}>
          
          {/* Left Side: Images Gallery */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeaveImage}
              style={{
                position: "relative", aspectRatio: "3/4", overflow: "hidden", 
                borderRadius: "24px", background: "var(--bg-secondary)", 
                border: "1px solid var(--border-light)", cursor: "zoom-in"
              }}
            >
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                src={product.images[selectedImage]}
                alt={product.title}
                onError={e => { e.currentTarget.src = fallbackImages[0]; }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: zoomStyle.transform,
                  transformOrigin: zoomStyle.transformOrigin,
                  transition: "transform 0.1s ease-out"
                }}
              />
              <div style={{
                position: "absolute", bottom: "16px", right: "16px", 
                background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", 
                color: "white", px: "12px", py: "4px", borderRadius: "999px", 
                fontSize: "11px", fontWeight: 800, padding: "5px 12px", pointerEvents: "none",
                letterSpacing: "1px", textTransform: "uppercase"
              }}>
                Hover to Zoom
              </div>
            </div>
            
            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "12px" }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: "80px", aspectRatio: "3/4", borderRadius: "14px", overflow: "hidden", 
                    border: selectedImage === idx ? "2px solid var(--accent)" : "2px solid transparent",
                    background: "var(--bg-secondary)", opacity: selectedImage === idx ? 1 : 0.6,
                    cursor: "pointer", transition: "all 0.25s", padding: 0
                  }}
                >
                  <img 
                    src={img} 
                    alt="thumb" 
                    onError={e => { e.currentTarget.src = fallbackImages[idx % fallbackImages.length]; }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Side: Product Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--accent)", uppercase: "true", tracking: "widest", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2.5px" }}>
                {product.brand}
              </span>
              <h1 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, letterSpacing: "-1px", color: "var(--text-primary)", fontFamily: "var(--font-primary)", lineHeight: 1.15 }}>
                {product.title}
              </h1>
              
              {/* Rating summary */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={15}
                      fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} 
                      color={i < Math.floor(product.rating) ? "#fbbf24" : "var(--border-color)"}
                    />
                  ))}
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-secondary)", fontFamily: "var(--font-secondary)" }}>
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div style={{ borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", py: "24px", display: "flex", alignItems: "baseline", gap: "16px", padding: "18px 0" }}>
              <span style={{ fontSize: "36px", fontWeight: 900, color: "var(--text-primary)", fontFamily: "var(--font-primary)" }}>
                Rs. {product.price.toLocaleString()}
              </span>
              {product.strikedPrice && (
                <span style={{ fontSize: "16px", color: "var(--text-muted)", textDecoration: "line-through", fontFamily: "var(--font-primary)" }}>
                  Rs. {product.strikedPrice.toLocaleString()}
                </span>
              )}
              {product.offer && (
                <span style={{ fontSize: "11px", fontWeight: 900, color: "var(--accent)", background: "var(--accent-light)", padding: "3px 10px", borderRadius: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {product.offer}
                </span>
              )}
            </div>

            {/* Sizing Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 900, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  Select Size
                </span>
                <button 
                  onClick={() => setShowFitPredictor(true)}
                  style={{
                    fontSize: "11px", color: "var(--accent)", fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "1px", background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "6px", textDecoration: "underline"
                  }}
                >
                  <Ruler size={14} />
                  Find Your Fit
                </button>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {["S", "M", "L", "XL"].map(size => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        width: "48px", height: "48px", borderRadius: "50%", border: active ? "none" : "1.5px solid var(--border-color)",
                        background: active ? "var(--accent)" : "var(--bg-card)",
                        color: active ? "white" : "var(--text-primary)",
                        fontWeight: 800, fontSize: "13px", cursor: "pointer", transition: "all 0.2s",
                        boxShadow: active ? "var(--accent-glow)" : "none", display: "flex", alignItems: "center", justifyContent: "center"
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "16px", padding: "14px" }}>
                <Truck size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: "11px", fontWeight: 800, color: "var(--text-primary)" }}>Free Delivery</h4>
                  <p style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "2px" }}>On all orders</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "16px", padding: "14px" }}>
                <RefreshCw size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: "11px", fontWeight: 800, color: "var(--text-primary)" }}>Easy Returns</h4>
                  <p style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "2px" }}>30-day window</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "16px", padding: "14px" }}>
                <ShieldCheck size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: "11px", fontWeight: 800, color: "var(--text-primary)" }}>Original</h4>
                  <p style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "2px" }}>100% verified</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <button
                onClick={addToBag}
                style={{
                  flex: 1, background: "var(--accent-gradient)", color: "white",
                  padding: "16px", borderRadius: "16px", border: "none", fontWeight: 900,
                  fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "10px", boxShadow: "var(--accent-glow)", transition: "all 0.3s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}
              >
                <ShoppingBag size={16} />
                Add to Bag
              </button>
              <button
                onClick={handleToggleWishlist}
                style={{
                  padding: "16px", borderRadius: "16px", border: "1.5px solid var(--border-color)",
                  background: isWishlisted ? "var(--accent-light)" : "var(--bg-card)",
                  color: isWishlisted ? "var(--accent)" : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center"
                }}
              >
                <Heart size={16} fill={isWishlisted ? "var(--accent)" : "none"} />
              </button>
            </div>

            {/* Rating breakdown progress bars */}
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "24px", padding: "24px" }}>
              <h4 style={{ fontSize: "11px", fontWeight: 900, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Customer Reviews</h4>
              <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "44px", fontWeight: 900, color: "var(--text-primary)", fontFamily: "var(--font-primary)", display: "block" }}>{product.rating}</span>
                  <div style={{ display: "flex", justifyContent: "center", gap: "2px", margin: "4px 0" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <span style={{ fontSize: "11px", textSecondary: "true", color: "var(--text-muted)" }}>{product.reviewsCount} Ratings</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", minWidth: "160px" }}>
                  {[
                    { stars: 5, pct: 75 },
                    { stars: 4, pct: 15 },
                    { stars: 3, pct: 6 },
                    { stars: 2, pct: 3 },
                    { stars: 1, pct: 1 }
                  ].map(({ stars, pct }) => (
                    <div key={stars} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", fontWeight: 700 }}>
                      <span style={{ width: "32px", color: "var(--text-secondary)" }}>{stars} Star</span>
                      <div style={{ flex: 1, height: "6px", background: "var(--border-color)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "#fbbf24", borderRadius: "999px" }} style={{ width: `${pct}%`, height: "100%", background: "#fbbf24", borderRadius: "999px" }} />
                      </div>
                      <span style={{ width: "28px", textAlign: "right", color: "var(--text-muted)" }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detail Tabs */}
            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
              <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid var(--border-light)", pb: "8px", marginBottom: "16px" }}>
                <button onClick={() => setActiveTab("specs")} style={{ fontSize: "13px", fontWeight: 800, paddingBottom: "10px", border: "none", borderBottom: activeTab === "specs" ? "2px solid var(--accent)" : "2px solid transparent", color: activeTab === "specs" ? "var(--accent)" : "var(--text-muted)", background: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Specifications
                </button>
                <button onClick={() => setActiveTab("care")} style={{ fontSize: "13px", fontWeight: 800, paddingBottom: "10px", border: "none", borderBottom: activeTab === "care" ? "2px solid var(--accent)" : "2px solid transparent", color: activeTab === "care" ? "var(--accent)" : "var(--text-muted)", background: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Material & Care
                </button>
              </div>
              <div style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {activeTab === "specs" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <span style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Material</span>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{product.material}</span>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Product Code</span>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>AURA-{id?.slice(0, 8)}</span>
                    </div>
                  </div>
                ) : (
                  <p>{product.care}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look Section */}
        <section style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid var(--border-light)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <Flame size={20} color="var(--accent)" />
            <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-primary)", tracking: "tight", fontFamily: "var(--font-primary)" }}>
              Complete the Look
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", background: "var(--bg-secondary)", padding: "28px", borderRadius: "28px", border: "1px solid var(--border-light)" }}>
            {mockLookItems.map(item => {
              const active = selectedAddons.includes(item.id);
              return (
                <div key={item.id} style={{ bg: "var(--bg-card)", border: "1px solid var(--border-light)", borderRadius: "20px", padding: "16px", display: "flex", gap: "14px", alignItems: "center", background: "var(--bg-card)" }}>
                  <img src={item.image} alt={item.name} onError={e => { e.currentTarget.src = item.fallback; }} style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "12px" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</h4>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", block: "true", marginTop: "4px" }}>Rs. {item.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => toggleAddon(item.id)}
                    style={{
                      width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      border: active ? "none" : "1.5px solid var(--border-color)", background: active ? "var(--success)" : "transparent",
                      color: active ? "white" : "var(--text-secondary)", cursor: "pointer", transition: "all 0.2s"
                    }}
                  >
                    <Check size={14} />
                  </button>
                </div>
              );
            })}

            <div style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Bundle Price</span>
              <span style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-primary)", marginTop: "4px", fontFamily: "var(--font-primary)" }}>
                Rs. {(product.price + selectedAddons.reduce((sum, id) => sum + mockLookItems.find(item => item.id === id).price, 0)).toLocaleString()}
              </span>
              <button
                onClick={addToBag}
                style={{
                  marginTop: "16px", background: "var(--accent)", color: "white", padding: "12px 20px",
                  borderRadius: "12px", textTransform: "uppercase", fontSize: "11px", fontWeight: 800,
                  letterSpacing: "1px", cursor: "pointer", border: "none", transition: "background 0.2s"
                }}
              >
                Add Bundle to Bag
              </button>
            </div>
          </div>
        </section>

        {/* FIT PREDICTOR MODAL */}
        <AnimatePresence>
          {showFitPredictor && (
            <div style={{ position: "fixed", inset: 0, zIndex: 350, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }} onClick={() => setShowFitPredictor(false)} />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border-light)",
                  borderRadius: "28px", padding: "32px", maxWidth: "400px", width: "100%",
                  position: "relative", zIndex: 1, boxShadow: "var(--shadow-lg)"
                }}
              >
                <button onClick={() => setShowFitPredictor(false)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  <X size={20} />
                </button>

                <h2 style={{ fontSize: "20px", fontWeight: 900, display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)", marginBottom: "24px", fontFamily: "var(--font-primary)" }}>
                  <Ruler size={20} color="var(--accent)" /> Fit Predictor
                </h2>

                <form onSubmit={handleFitPredictor} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)" }}>Your Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)" }}>Your Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(parseInt(e.target.value))}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%", background: "var(--accent)", color: "white", py: "14px",
                      borderRadius: "16px", fontWeight: 800, fontSize: "12px", letterSpacing: "1.5px",
                      textTransform: "uppercase", cursor: "pointer", border: "none", padding: "14px 0",
                      boxShadow: "var(--accent-glow)", marginTop: "8px"
                    }}
                  >
                    Predict My Size
                  </button>
                </form>

                {fitResult && (
                  <div style={{ marginTop: "24px", padding: "16px", background: "var(--accent-light)", border: "1px solid var(--accent)", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                      Recommended Size
                    </span>
                    <span style={{ fontSize: "36px", fontWeight: 900, color: "var(--accent)", marginTop: "6px", fontFamily: "var(--font-primary)" }}>
                      {fitResult}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedSize(fitResult);
                        setShowFitPredictor(false);
                      }}
                      style={{
                        marginTop: "14px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase",
                        color: "white", background: "var(--accent)", border: "none", padding: "10px 20px",
                        borderRadius: "10px", cursor: "pointer"
                      }}
                    >
                      Select Recommended Size
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
