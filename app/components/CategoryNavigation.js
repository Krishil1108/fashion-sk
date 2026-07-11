"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const categories = [
  {
    name: "Menswear",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3",
    tag: "New Season",
    link: "/menspage",
    number: "01",
    hoverGlow: "rgba(96, 165, 250, 0.25)",
    hoverBorder: "rgba(96, 165, 250, 0.45)",
    fallback: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Womenswear",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    tag: "Trending",
    link: "/womenspage",
    number: "02",
    hoverGlow: "rgba(167, 139, 250, 0.25)",
    hoverBorder: "rgba(167, 139, 250, 0.45)",
    fallback: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3",
    tag: "Curated",
    link: "/studiopage",
    number: "03",
    hoverGlow: "rgba(201, 168, 76, 0.25)",
    hoverBorder: "rgba(201, 168, 76, 0.45)",
    fallback: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1680&auto=format&fit=crop&ixlib=rb-4.0.3",
    tag: "Best Sellers",
    link: "/beautypage",
    number: "04",
    hoverGlow: "rgba(244, 114, 182, 0.25)",
    hoverBorder: "rgba(244, 114, 182, 0.45)",
    fallback: "https://images.unsplash.com/photo-1522335221946-8692795f5431?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function CategoryNavigation() {
  const [hovered, setHovered] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section style={{
      padding: "100px 0",
      background: "var(--bg-section-dark)",
      transition: "background 0.4s ease",
    }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5vw" }}>

        {/* Section Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "56px",
        }}>
          <div>
            <span style={{
              display: "block", color: "#C9A84C",
              fontSize: "10px", fontWeight: 800, letterSpacing: "4px",
              textTransform: "uppercase", marginBottom: "14px",
              fontFamily: "var(--font-secondary)",
            }}>
              Explore by Category
            </span>
            <h2 style={{
              fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 900,
              color: "var(--text-primary)", lineHeight: 1.05, letterSpacing: "-1.5px",
              fontFamily: "var(--font-primary)",
            }}>
              Discover Your <br />
              <span style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(36px, 5.5vw, 64px)",
                color: "var(--text-secondary)",
              }}>
                Signature Style.
              </span>
            </h2>
          </div>

          <Link href="/search" style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "var(--text-secondary)", fontWeight: 700, fontSize: "13px",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "4px", fontFamily: "var(--font-secondary)", letterSpacing: "0.5px",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.borderColor = "#C9A84C"; }}
          onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; }}
          >
            View All <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Expandable Category Cards */}
        <div style={{ display: "flex", gap: "12px", height: "520px" }}>
          {categories.map((cat, idx) => {
            const isHovered = hovered === idx;
            return (
              <Link
                key={cat.name}
                href={cat.link}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "20px", cursor: "pointer",
                  flex: isHovered ? 2.6 : 1,
                  transition: "flex 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, border-color 0.4s ease",
                  border: isHovered ? `1px solid ${cat.hoverBorder}` : "1px solid var(--card-border)",
                  boxShadow: isHovered
                    ? `0 0 48px ${cat.hoverGlow}, var(--shadow-lg)`
                    : "var(--shadow-sm)",
                  textDecoration: "none",
                }}
              >
                {/* Image with lazy loading + error fallback */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  onError={e => { e.currentTarget.src = cat.fallback; }}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1)",
                    transform: isHovered ? "scale(1.1)" : "scale(1.03)",
                    filter: isHovered ? "brightness(0.82)" : "brightness(0.72)",
                  }}
                />

                {/* Dark gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: isHovered
                    ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.04) 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)",
                  transition: "background 0.5s ease",
                }} />

                {/* Number */}
                <div style={{
                  position: "absolute", top: "18px", left: "18px",
                  color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 900,
                  letterSpacing: "1px", fontFamily: "var(--font-secondary)",
                }}>
                  {cat.number}
                </div>

                {/* Tag */}
                <div style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "999px", padding: "4px 12px",
                  color: "rgba(255,255,255,0.92)", fontSize: "9px", fontWeight: 800,
                  letterSpacing: "2px", textTransform: "uppercase",
                  fontFamily: "var(--font-secondary)",
                }}>
                  {cat.tag}
                </div>

                {/* Bottom content */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "22px", display: "flex", alignItems: "flex-end",
                  justifyContent: "space-between",
                }}>
                  <div>
                    <h3 style={{
                      color: "white", fontWeight: 900,
                      fontSize: "clamp(17px, 1.8vw, 22px)",
                      textTransform: "uppercase", letterSpacing: "2px",
                      marginBottom: "5px", fontFamily: "var(--font-primary)",
                    }}>{cat.name}</h3>
                    <p style={{
                      color: "rgba(255,255,255,0.6)", fontSize: "12px",
                      fontFamily: "var(--font-secondary)",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                      maxWidth: "220px", lineHeight: 1.5,
                    }}>Shop the latest collection →</p>
                  </div>

                  <div style={{
                    width: "42px", height: "42px", borderRadius: "50%", flexShrink: 0,
                    background: isHovered ? "#C9A84C" : "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: isHovered ? "rotate(0deg) scale(1.1)" : "rotate(-45deg) scale(1)",
                    boxShadow: isHovered ? "0 4px 20px rgba(201,168,76,0.5)" : "none",
                  }}>
                    <ArrowUpRight size={18} color={isHovered ? "#3a2a00" : "white"} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
