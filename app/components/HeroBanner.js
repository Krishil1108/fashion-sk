"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  },
  {
    image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?q=80&w=2048&auto=format&fit=crop",
    label: "Women's New Season",
    title1: "Effortless",
    title2: "Elegance.",
    subtitle: "Timeless silhouettes and bold statements for the modern woman.",
    cta: { text: "Shop Womens", href: "/womenspage" },
    cta2: { text: "Explore More", href: "/studiopage" },
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2064&auto=format&fit=crop",
    label: "Premium Accessories",
    title1: "Define Your",
    title2: "Signature.",
    subtitle: "Accessories that complete every look, every day.",
    cta: { text: "Shop Now", href: "/beautypage" },
    cta2: { text: "Browse Studio", href: "/studiopage" },
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = slides[current];

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", minHeight: "600px", overflow: "hidden", background: "#0b0c10" }}>
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s ease",
            zIndex: 0,
          }}
        >
          <img
            src={s.image}
            alt={s.title1}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}

      {/* Overlays */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to top, #0b0c10 0%, rgba(11,12,16,0.6) 40%, rgba(11,12,16,0.2) 70%, rgba(11,12,16,0.1) 100%)"
      }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.25)" }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "25%", right: "10%",
        width: "300px", height: "300px",
        background: "rgba(255,63,108,0.15)", borderRadius: "50%",
        filter: "blur(80px)", zIndex: 1, pointerEvents: "none"
      }} />

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "0 5vw", maxWidth: "1600px", margin: "0 auto",
        left: 0, right: 0,
      }}>
        <div style={{ maxWidth: "700px", paddingTop: "80px" }}>
          {/* Tag line */}
          <motion.div
            key={current + "-tag"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,63,108,0.15)", border: "1px solid rgba(255,63,108,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px"
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff3f6c", display: "inline-block" }} />
            <span style={{ color: "#ff3f6c", fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase" }}>
              {slide.label}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            key={current + "-h1"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              color: "white", fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 900,
              lineHeight: 1.0, marginBottom: "24px",
              letterSpacing: "-2px",
            }}
          >
            {slide.title1} <br />
            <span style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.6)" }}>
              {slide.title2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={current + "-sub"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              color: "rgba(255,255,255,0.75)", fontSize: "clamp(15px, 2vw, 19px)",
              fontWeight: 300, lineHeight: 1.7, maxWidth: "480px", marginBottom: "40px"
            }}
          >
            {slide.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={current + "-cta"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            <Link href={slide.cta.href} style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#ff3f6c", color: "white",
              padding: "16px 36px", borderRadius: "999px",
              fontWeight: 700, fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase",
              textDecoration: "none", boxShadow: "0 8px 32px rgba(255,63,108,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {slide.cta.text}
              <ArrowRight size={16} />
            </Link>
            <Link href={slide.cta2.href} style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)", color: "white",
              padding: "16px 36px", borderRadius: "999px",
              fontWeight: 700, fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              {slide.cta2.text}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{
        position: "absolute", bottom: "40px", left: "5vw",
        display: "flex", gap: "8px", zIndex: 3,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "32px" : "8px", height: "8px",
              borderRadius: "999px", border: "none", cursor: "pointer",
              background: i === current ? "#ff3f6c" : "rgba(255,255,255,0.4)",
              transition: "all 0.4s ease", padding: 0,
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "40px", right: "5vw", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
      }}>
        <span>Scroll</span>
        <ChevronDown size={16} style={{ animation: "bounce 2s infinite" }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}
