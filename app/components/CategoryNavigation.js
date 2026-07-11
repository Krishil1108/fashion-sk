"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Menswear",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1587&auto=format&fit=crop",
    tag: "New Season",
    link: "/menspage",
    number: "01",
    hoverGlow: "rgba(96, 165, 250, 0.3)",
    hoverBorder: "rgba(96, 165, 250, 0.5)",
  },
  {
    name: "Womenswear",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    tag: "Trending",
    link: "/womenspage",
    number: "02",
    hoverGlow: "rgba(167, 139, 250, 0.3)",
    hoverBorder: "rgba(167, 139, 250, 0.5)",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1587&auto=format&fit=crop",
    tag: "Curated",
    link: "/studiopage",
    number: "03",
    hoverGlow: "rgba(201, 168, 76, 0.3)",
    hoverBorder: "rgba(201, 168, 76, 0.5)",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1680&auto=format&fit=crop",
    tag: "Best Sellers",
    link: "/beautypage",
    number: "04",
    hoverGlow: "rgba(244, 114, 182, 0.3)",
    hoverBorder: "rgba(244, 114, 182, 0.5)",
  },
];

export default function CategoryNavigation() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ padding: "110px 0", background: "#0e0e12" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5vw" }}>

        {/* Section Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "60px",
        }}>
          <div>
            <span style={{
              display: "block", color: "#C9A84C",
              fontSize: "10px", fontWeight: 800, letterSpacing: "4px",
              textTransform: "uppercase", marginBottom: "14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Explore by Category
            </span>
            <h2 style={{
              fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900,
              color: "#f5f3ef", lineHeight: 1.05, letterSpacing: "-1.5px",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Discover Your <br />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(38px, 5.5vw, 66px)",
                color: "rgba(245,243,239,0.7)",
              }}>
                Signature Style.
              </span>
            </h2>
          </div>

          <Link href="/search" style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "rgba(245,243,239,0.55)", fontWeight: 700, fontSize: "13px",
            textDecoration: "none", borderBottom: "1px solid rgba(245,243,239,0.2)",
            paddingBottom: "4px", transition: "color 0.25s, border-color 0.25s",
            fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.5px",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.borderColor = "#C9A84C"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,243,239,0.55)"; e.currentTarget.style.borderColor = "rgba(245,243,239,0.2)"; }}
          >
            View All <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Expandable Category Cards */}
        <div style={{ display: "flex", gap: "12px", height: "540px" }}>
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
                  transition: "flex 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease",
                  border: isHovered ? `1px solid ${cat.hoverBorder}` : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isHovered ? `0 0 48px ${cat.hoverGlow}, 0 28px 60px rgba(0,0,0,0.5)` : "0 4px 20px rgba(0,0,0,0.35)",
                  textDecoration: "none",
                }}
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1)",
                    transform: isHovered ? "scale(1.1)" : "scale(1.03)",
                    filter: isHovered ? "brightness(0.85)" : "brightness(0.7)",
                  }}
                />

                {/* Dark gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: isHovered
                    ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                  transition: "background 0.5s ease",
                }} />

                {/* Number indicator top-left */}
                <div style={{
                  position: "absolute", top: "20px", left: "20px",
                  color: "rgba(255,255,255,0.25)", fontSize: "11px", fontWeight: 900,
                  letterSpacing: "1px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {cat.number}
                </div>

                {/* Tag pill top-right */}
                <div style={{
                  position: "absolute", top: "18px", right: "18px",
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "999px", padding: "4px 12px",
                  color: "rgba(255,255,255,0.9)", fontSize: "9px", fontWeight: 800, letterSpacing: "2px",
                  textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {cat.tag}
                </div>

                {/* Bottom content */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                }}>
                  <div>
                    <h3 style={{
                      color: "white", fontWeight: 900,
                      fontSize: "clamp(18px, 2vw, 24px)",
                      textTransform: "uppercase", letterSpacing: "2.5px",
                      marginBottom: "6px", fontFamily: "'Outfit', sans-serif",
                    }}>{cat.name}</h3>
                    <p style={{
                      color: "rgba(255,255,255,0.6)", fontSize: "12px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                      maxWidth: "220px", lineHeight: 1.5,
                    }}>Shop the latest collection →</p>
                  </div>

                  {/* Arrow button */}
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
                    background: isHovered ? "#C9A84C" : "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: isHovered ? "rotate(0deg) scale(1.1)" : "rotate(-45deg) scale(1)",
                    boxShadow: isHovered ? "0 4px 20px rgba(201,168,76,0.5)" : "none",
                  }}>
                    <ArrowUpRight size={20} color={isHovered ? "#3a2a00" : "white"} />
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
