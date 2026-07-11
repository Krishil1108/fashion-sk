"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    label: "Autumn / Winter 2026",
    title1: "Redefine Your",
    title2: "Aesthetic.",
    subtitle: "Discover the new standard of premium fashion. Curated for those who refuse to blend in.",
    cta: { text: "Shop Collection", href: "/menspage" },
    cta2: { text: "View Lookbook", href: "/studiopage" },
    accent: "#ff3f6c",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    label: "Women's New Season",
    title1: "Effortless",
    title2: "Elegance.",
    subtitle: "Timeless silhouettes and bold statements for the modern woman.",
    cta: { text: "Shop Womens", href: "/womenspage" },
    cta2: { text: "Explore More", href: "/studiopage" },
    accent: "#9b59b6",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2064&auto=format&fit=crop",
    label: "Premium Accessories",
    title1: "Define Your",
    title2: "Signature.",
    subtitle: "Accessories that complete every look, every day.",
    cta: { text: "Shop Now", href: "/beautypage" },
    cta2: { text: "Browse Studio", href: "/studiopage" },
    accent: "#C9A84C",
  },
];

const tickerItems = [
  "✦ NEW ARRIVALS · SUMMER '26",
  "✦ FREE SHIPPING ABOVE RS. 2000",
  "✦ USE CODE MYNTRA300 · SAVE RS. 300",
  "✦ EXCLUSIVE MEMBER DROPS",
  "✦ 40% OFF ON BESTSELLERS",
  "✦ NEW ARRIVALS · SUMMER '26",
  "✦ FREE SHIPPING ABOVE RS. 2000",
  "✦ USE CODE MYNTRA300 · SAVE RS. 300",
  "✦ EXCLUSIVE MEMBER DROPS",
  "✦ 40% OFF ON BESTSELLERS",
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 400);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (idx) => {
    if (idx === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsTransitioning(false);
    }, 400);
  };

  const slide = slides[current];

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", minHeight: "640px", overflow: "hidden", background: "#0c0c0f" }}>
      
      {/* Background Images with scale transition */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            opacity: i === current ? (isTransitioning ? 0 : 1) : 0,
            transform: i === current ? (isTransitioning ? "scale(1.04)" : "scale(1)") : "scale(1.04)",
            transition: "opacity 1.0s ease, transform 1.4s cubic-bezier(0.22,1,0.36,1)",
            zIndex: 0,
          }}
        >
          <img src={s.image} alt={s.title1} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}

      {/* Layered overlays for depth */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, #0c0c0f 0%, rgba(12,12,15,0.7) 35%, rgba(12,12,15,0.2) 65%, rgba(12,12,15,0.05) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(12,12,15,0.65) 0%, transparent 60%)" }} />

      {/* Floating ambient orbs */}
      <div className="animate-float" style={{
        position: "absolute", top: "15%", right: "12%",
        width: "380px", height: "380px",
        background: `radial-gradient(circle, ${slide.accent}22 0%, transparent 70%)`,
        borderRadius: "50%", filter: "blur(60px)", zIndex: 1, pointerEvents: "none",
        transition: "background 1s ease",
      }} />
      <div className="animate-float" style={{
        position: "absolute", bottom: "20%", left: "5%",
        width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(50px)", zIndex: 1, pointerEvents: "none",
        animationDelay: "3s",
      }} />

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "0 5vw", maxWidth: "1600px", margin: "0 auto",
        left: 0, right: 0,
      }}>
        <div style={{ maxWidth: "680px", paddingTop: "72px" }}>

          {/* Eyebrow label */}
          <motion.div
            key={current + "-tag"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: `1px solid ${slide.accent}55`,
              background: `${slide.accent}18`,
              borderRadius: "999px", padding: "6px 18px", marginBottom: "28px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: slide.accent, display: "inline-block", boxShadow: `0 0 8px ${slide.accent}` }} />
            <span style={{ color: slide.accent, fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase" }}>
              {slide.label}
            </span>
          </motion.div>

          {/* Main heading — serif italic accent on second line */}
          <motion.h1
            key={current + "-h1"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "white", fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(54px, 8.5vw, 100px)", fontWeight: 900,
              lineHeight: 0.95, marginBottom: "28px",
              letterSpacing: "-3px",
            }}
          >
            {slide.title1}<br />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(58px, 9vw, 108px)",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.55)",
              letterSpacing: "-2px",
            }}>
              {slide.title2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={current + "-sub"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            style={{
              color: "rgba(255,255,255,0.68)", fontSize: "clamp(15px, 1.8vw, 18px)",
              fontWeight: 300, lineHeight: 1.75, maxWidth: "440px", marginBottom: "44px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {slide.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={current + "-cta"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}
          >
            <Link href={slide.cta.href} style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: slide.accent, color: "white",
              padding: "17px 38px", borderRadius: "999px",
              fontWeight: 800, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: `0 8px 40px ${slide.accent}55`,
              transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = `0 16px 60px ${slide.accent}70`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 8px 40px ${slide.accent}55`; }}
            >
              {slide.cta.text}
              <ArrowRight size={15} />
            </Link>

            <Link href={slide.cta2.href} style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)",
              padding: "17px 38px", borderRadius: "999px",
              fontWeight: 700, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
            >
              {slide.cta2.text}
            </Link>
          </motion.div>

          {/* Gold separator line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{
              marginTop: "44px", height: "1px", width: "120px",
              background: "linear-gradient(90deg, #C9A84C, transparent)",
              transformOrigin: "left",
            }}
          />
        </div>
      </div>

      {/* Slide indicator dots */}
      <div style={{
        position: "absolute", bottom: "100px", left: "5vw",
        display: "flex", gap: "10px", zIndex: 3,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            style={{
              width: i === current ? "36px" : "8px", height: "8px",
              borderRadius: "999px", border: "none", cursor: "pointer",
              background: i === current ? slide.accent : "rgba(255,255,255,0.35)",
              transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)", padding: 0,
              boxShadow: i === current ? `0 0 12px ${slide.accent}` : "none",
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "44px", right: "5vw", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        color: "rgba(255,255,255,0.4)", fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase",
      }}>
        <span>Scroll</span>
        <ChevronDown size={14} className="animate-bounce-y" />
      </div>

      {/* Ticker tape marquee at bottom of hero */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
        background: "rgba(201,168,76,0.1)", backdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(201,168,76,0.2)",
        padding: "10px 0",
        overflow: "hidden",
      }}>
        <div className="marquee-track" style={{
          display: "inline-flex", gap: "48px",
          color: "#C9A84C", fontSize: "10px", fontWeight: 700, letterSpacing: "2px",
        }}>
          {tickerItems.map((item, i) => (
            <span key={i} style={{ flexShrink: 0, whiteSpace: "nowrap" }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
