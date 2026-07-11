"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Minimalist Essentials",
    subtitle: "Clean lines. Perfect fit. Effortless everyday style.",
    badge: "Bestseller",
    badgeColor: "#C9A84C",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d0e?q=80&w=1400&auto=format&fit=crop",
    link: "/menspage",
    span: "tall",
  },
  {
    id: 2,
    title: "Urban Streetwear",
    subtitle: "Bold graphics. Oversized silhouettes. Street credibility.",
    badge: "New Drop",
    badgeColor: "#ff3f6c",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1400&auto=format&fit=crop",
    link: "/womenspage",
    span: "normal",
  },
  {
    id: 3,
    title: "Evening Elegance",
    subtitle: "Sophisticated looks for unforgettable nights.",
    badge: "Premium",
    badgeColor: "#9b59b6",
    image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1400&auto=format&fit=crop",
    link: "/studiopage",
    span: "tall",
  },
];

// Partner logos (text-based as placeholders for loading speed)
const partners = ["PUMA", "H&M", "ZARA", "WROGN", "LEVIS", "ONLY", "AND", "MANGO"];

function CollectionCard({ collection, index, heightStyle }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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
        position: "relative",
        height: heightStyle,
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.9s ease ${index * 0.12}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, box-shadow 0.4s ease`,
        boxShadow: hovered
          ? `0 0 0 1px ${collection.badgeColor}40, 0 36px 80px rgba(0,0,0,0.22)`
          : "0 8px 28px rgba(0,0,0,0.1)",
        border: hovered ? `1px solid ${collection.badgeColor}30` : "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* Image */}
      <img
        src={collection.image}
        alt={collection.title}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1)",
          transform: hovered ? "scale(1.08)" : "scale(1.02)",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)",
        transition: "background 0.5s ease",
      }} />

      {/* Badge */}
      <div style={{
        position: "absolute", top: "20px", left: "20px",
        background: collection.badgeColor,
        color: collection.badgeColor === "#C9A84C" ? "#3a2a00" : "white",
        padding: "4px 14px", borderRadius: "999px",
        fontSize: "9px", fontWeight: 900, letterSpacing: "2px",
        textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: `0 4px 16px ${collection.badgeColor}60`,
      }}>
        {collection.badge}
      </div>

      {/* Content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.4s ease",
      }}>
        <h3 style={{
          color: "white", fontWeight: 900,
          fontSize: "clamp(20px, 2.5vw, 26px)", marginBottom: "8px",
          fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px",
        }}>{collection.title}</h3>
        <p style={{
          color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.55,
          marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>
          {collection.subtitle}
        </p>
        {/* Animated accent bar */}
        <div style={{
          height: "2px",
          background: `linear-gradient(90deg, ${collection.badgeColor}, transparent)`,
          borderRadius: "999px",
          width: hovered ? "56px" : "0px",
          transition: "width 0.45s ease 0.05s",
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
    <section style={{ padding: "110px 0 80px", background: "#F8F5F0" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5vw" }}>

        {/* Section Header */}
        <div ref={headerRef} style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "60px",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <div>
            <span style={{
              display: "block", color: "#C9A84C",
              fontSize: "10px", fontWeight: 800, letterSpacing: "4px",
              textTransform: "uppercase", marginBottom: "14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Curated For You
            </span>
            <h2 style={{
              fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 900,
              color: "#0f0f12", lineHeight: 1.05, letterSpacing: "-1.5px",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Trending <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(38px, 5.5vw, 62px)",
                color: "#5A5A6A",
              }}>Collections</span>
            </h2>
          </div>

          <Link href="/menspage" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#0f0f12", color: "white",
            padding: "14px 28px", borderRadius: "999px",
            fontSize: "12px", fontWeight: 800, letterSpacing: "1.5px",
            textTransform: "uppercase", textDecoration: "none",
            transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.color = "#3a2a00"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = "#0f0f12"; e.currentTarget.style.color = "white"; }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Masonry-style asymmetric 3-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "400px 280px",
          gap: "16px",
        }}>
          {/* Card 1: spans 2 rows (tall) */}
          <div style={{ gridRow: "1 / 3" }}>
            <CollectionCard collection={collections[0]} index={0} heightStyle="100%" />
          </div>
          {/* Card 2: normal */}
          <div>
            <CollectionCard collection={collections[1]} index={1} heightStyle="100%" />
          </div>
          {/* Card 3: spans 2 rows (tall) */}
          <div style={{ gridRow: "1 / 3" }}>
            <CollectionCard collection={collections[2]} index={2} heightStyle="100%" />
          </div>
          {/* Promotional tile */}
          <div style={{
            borderRadius: "24px", overflow: "hidden",
            background: "linear-gradient(135deg, #0c0c0f 0%, #1a1a24 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
            display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "28px",
            position: "relative",
            boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: "200px", height: "200px",
              background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }} />
            <span style={{
              color: "#C9A84C", fontSize: "9px", fontWeight: 800, letterSpacing: "3px",
              textTransform: "uppercase", marginBottom: "10px", display: "block",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Limited Offer</span>
            <p style={{
              color: "white", fontSize: "22px", fontWeight: 900,
              lineHeight: 1.15, marginBottom: "16px",
              fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px",
            }}>Use Code <span style={{ color: "#C9A84C" }}>MYNTRA300</span><br />Save Rs. 300</p>
            <Link href="/menspage" style={{
              color: "#C9A84C", fontWeight: 800, fontSize: "12px",
              display: "inline-flex", alignItems: "center", gap: "6px",
              textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Shop Now <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Partner Brands strip */}
        <div style={{
          marginTop: "80px", paddingTop: "48px",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}>
          <p style={{
            textAlign: "center", fontSize: "10px", fontWeight: 800,
            letterSpacing: "3px", color: "#9a9a9a", textTransform: "uppercase",
            marginBottom: "32px", fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Brands We Carry
          </p>
          <div style={{
            display: "flex", gap: "40px", alignItems: "center",
            justifyContent: "center", flexWrap: "wrap",
          }}>
            {partners.map(brand => (
              <span key={brand} style={{
                color: "#c0bdb8", fontSize: "14px", fontWeight: 900,
                letterSpacing: "3px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
                transition: "color 0.2s",
                cursor: "default",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#0f0f12"}
              onMouseLeave={e => e.currentTarget.style.color = "#c0bdb8"}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
