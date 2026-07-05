"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    id: 1,
    title: "Minimalist Essentials",
    subtitle: "Clean lines. Perfect fit. Effortless everyday style.",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1434389678232-0678a58cbd37?q=80&w=1740&auto=format&fit=crop",
    link: "/menspage",
  },
  {
    id: 2,
    title: "Urban Streetwear",
    subtitle: "Bold graphics. Oversized silhouettes. Street credibility.",
    badge: "New Drop",
    image: "https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=1740&auto=format&fit=crop",
    link: "/womenspage",
  },
  {
    id: 3,
    title: "Evening Elegance",
    subtitle: "Sophisticated looks for unforgettable nights out.",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1587&auto=format&fit=crop",
    link: "/studiopage",
  },
];

function CollectionCard({ collection, index }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link href={collection.link}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none",
        borderRadius: "24px", overflow: "hidden",
        position: "relative", aspectRatio: "4/5",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.15}s, box-shadow 0.4s ease`,
        boxShadow: hovered ? "0 32px 80px rgba(0,0,0,0.2)" : "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image */}
      <img
        src={collection.image}
        alt={collection.title}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      />

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
        transition: "background 0.5s ease",
      }} />

      {/* Badge */}
      <div style={{
        position: "absolute", top: "20px", left: "20px",
        background: "#ff3f6c", color: "white",
        padding: "4px 12px", borderRadius: "999px",
        fontSize: "10px", fontWeight: 800, letterSpacing: "1.5px",
        textTransform: "uppercase",
      }}>
        {collection.badge}
      </div>

      {/* Content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "28px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.4s ease",
      }}>
        <h3 style={{
          color: "white", fontWeight: 900,
          fontSize: "24px", marginBottom: "8px",
          fontFamily: "'Outfit', sans-serif",
        }}>{collection.title}</h3>
        <p style={{
          color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.5,
          marginBottom: "16px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>
          {collection.subtitle}
        </p>
        {/* Accent bar */}
        <div style={{
          height: "2px", background: "#ff3f6c",
          borderRadius: "999px",
          width: hovered ? "48px" : "0px",
          transition: "width 0.4s ease 0.1s",
        }} />
      </div>
    </Link>
  );
}

export default function TrendingCollections() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      padding: "100px 0",
      background: "white",
    }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5vw" }}>
        {/* Header */}
        <div ref={headerRef} style={{
          textAlign: "center", marginBottom: "64px",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <span style={{
            display: "block", color: "#ff3f6c",
            fontSize: "11px", fontWeight: 800, letterSpacing: "3px",
            textTransform: "uppercase", marginBottom: "16px",
          }}>
            Curated For You
          </span>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900,
            color: "#1a1c23", lineHeight: 1.1, letterSpacing: "-1px",
            fontFamily: "'Outfit', sans-serif", marginBottom: "20px",
          }}>
            Trending Collections
          </h2>
          <div style={{
            width: "48px", height: "4px",
            background: "linear-gradient(135deg, #ff3f6c, #ff6b8b)",
            borderRadius: "999px", margin: "0 auto",
          }} />
        </div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}>
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
