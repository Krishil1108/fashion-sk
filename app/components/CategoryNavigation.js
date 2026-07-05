"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Menswear",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1587&auto=format&fit=crop",
    tag: "New Season",
    link: "/menspage",
    color: "from-blue-900/80",
  },
  {
    name: "Womenswear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1620&auto=format&fit=crop",
    tag: "Trending",
    link: "/womenspage",
    color: "from-purple-900/80",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1587&auto=format&fit=crop",
    tag: "Curated",
    link: "/studiopage",
    color: "from-amber-900/80",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335221946-8692795f5431?q=80&w=1771&auto=format&fit=crop",
    tag: "Best Sellers",
    link: "/beautypage",
    color: "from-rose-900/80",
  },
];

const cardStyle = (hovered, idx) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "20px",
  cursor: "pointer",
  flex: 1,
  minHeight: "520px",
  transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease",
  flex: hovered === idx ? 2.5 : 1,
  boxShadow: hovered === idx ? "0 24px 60px rgba(0,0,0,0.25)" : "0 4px 16px rgba(0,0,0,0.08)",
});

export default function CategoryNavigation() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{
      padding: "100px 0",
      background: "#f4f6f8",
    }}>
      <div style={{
        maxWidth: "1600px", margin: "0 auto",
        padding: "0 5vw",
      }}>
        {/* Section Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "56px",
        }}>
          <div>
            <span style={{
              display: "block", color: "#ff3f6c",
              fontSize: "11px", fontWeight: 800, letterSpacing: "3px",
              textTransform: "uppercase", marginBottom: "12px",
            }}>
              Explore by Category
            </span>
            <h2 style={{
              fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900,
              color: "#1a1c23", lineHeight: 1.1, letterSpacing: "-1.5px",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Discover Your <br />Signature Style.
            </h2>
          </div>
          <Link href="/search" style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "#1a1c23", fontWeight: 700, fontSize: "14px",
            textDecoration: "none", borderBottom: "2px solid #1a1c23",
            paddingBottom: "4px", transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#ff3f6c"; e.currentTarget.style.borderColor = "#ff3f6c"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#1a1c23"; e.currentTarget.style.borderColor = "#1a1c23"; }}
          >
            View All Categories <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Expandable Cards Row */}
        <div style={{ display: "flex", gap: "16px", height: "520px" }}>
          {categories.map((cat, idx) => (
            <Link key={cat.name} href={cat.link}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={cardStyle(hovered, idx)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.8s ease",
                  transform: hovered === idx ? "scale(1.08)" : "scale(1)",
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)`,
              }} />

              {/* Tag */}
              <div style={{
                position: "absolute", top: "20px", left: "20px",
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px", padding: "4px 12px",
                color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}>
                {cat.tag}
              </div>

              {/* Name & Arrow */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              }}>
                <div>
                  <h3 style={{
                    color: "white", fontWeight: 900,
                    fontSize: "clamp(20px, 2.5vw, 26px)",
                    textTransform: "uppercase", letterSpacing: "2px",
                    marginBottom: "4px",
                  }}>{cat.name}</h3>
                  <p style={{
                    color: "rgba(255,255,255,0.7)", fontSize: "13px",
                    opacity: hovered === idx ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    maxWidth: "200px",
                  }}>Shop the latest collection →</p>
                </div>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: hovered === idx ? "#ff3f6c" : "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.3s ease, transform 0.3s ease",
                  transform: hovered === idx ? "rotate(0deg)" : "rotate(-45deg)",
                  flexShrink: 0,
                }}>
                  <ArrowUpRight size={20} color="white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
