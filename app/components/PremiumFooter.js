"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, ShieldCheck, RefreshCw } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Men's Collection", href: "/menspage" },
    { label: "Women's Fashion", href: "/womenspage" },
    { label: "Kids Selection", href: "/kidspage" },
    { label: "Home & Living", href: "/homeLiving" },
    { label: "Beauty Hub", href: "/beautypage" },
  ],
  Support: [
    { label: "Track Orders", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Cancellations", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

const socials = [
  { icon: "f", label: "Facebook", color: "#1877f2" },
  { icon: "𝕏", label: "Twitter", color: "#000" },
  { icon: "📸", label: "Instagram", color: "#e1306c" },
  { icon: "▶", label: "YouTube", color: "#ff0000" },
];

export default function PremiumFooter() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer style={{
      background: "#0b0c10", color: "#9297a6",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative orb */}
      <div style={{
        position: "absolute", top: "-200px", right: "-200px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,63,108,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "80px 5vw 40px", position: "relative", zIndex: 1 }}>
        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
          gap: "60px",
          marginBottom: "60px",
          rowGap: "40px",
        }}>
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "linear-gradient(135deg, #ff3f6c, #ff6b8b)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(255,63,108,0.3)",
              }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: "16px" }}>A.</span>
              </div>
              <span style={{ color: "white", fontSize: "22px", fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>Aura</span>
            </div>

            <p style={{ color: "#636b74", fontSize: "14px", lineHeight: 1.8, maxWidth: "320px" }}>
              Experience premium fashion and curated lifestyle shopping online. Discover new trends, top styles, and enjoy seamless, reliable delivery.
            </p>

            {/* Guarantees */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { icon: <ShieldCheck size={18} />, title: "100% Original", sub: "Verified products" },
                { icon: <RefreshCw size={18} />, title: "Easy Return", sub: "30-day window" },
              ].map(({ icon, title, sub }) => (
                <div key={title} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px", padding: "10px 14px",
                }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    background: "rgba(255,63,108,0.12)", color: "#ff3f6c",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ color: "white", fontSize: "13px", fontWeight: 700 }}>{title}</div>
                    <div style={{ color: "#636b74", fontSize: "11px" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "24px" }}>Shop</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {footerLinks.Shop.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{ color: "#636b74", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
                    onMouseLeave={e => e.currentTarget.style.color = "#636b74"}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "24px" }}>Support</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {footerLinks.Support.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={{ color: "#636b74", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
                    onMouseLeave={e => e.currentTarget.style.color = "#636b74"}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "16px" }}>Newsletter</h3>
            <p style={{ color: "#636b74", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>
              Subscribe for exclusive deals and new season drops.
            </p>
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", overflow: "hidden",
            }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  padding: "12px 16px", color: "white", fontSize: "13px", fontFamily: "inherit",
                }}
              />
              <button style={{
                padding: "10px 16px", background: "#ff3f6c", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#e02454"}
              onMouseLeave={e => e.currentTarget.style.background = "#ff3f6c"}
              >
                <ArrowUp size={16} color="white" style={{ transform: "rotate(45deg)" }} />
              </button>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              {["f", "𝕏", "📷", "▶"].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#9297a6", fontSize: "14px", textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#ff3f6c"; e.currentTarget.style.border = "1px solid #ff3f6c"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "16px",
        }}>
          <p style={{ color: "#636b74", fontSize: "13px" }}>
            © 2026 Aura Fashion. Crafted with Next.js.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Sitemap"].map(text => (
              <a key={text} href="#" style={{ color: "#636b74", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "white"}
                onMouseLeave={e => e.currentTarget.style.color = "#636b74"}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        style={{
          position: "absolute", bottom: "32px", right: "32px",
          width: "44px", height: "44px", borderRadius: "50%",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", zIndex: 10, transition: "all 0.3s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#ff3f6c"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,63,108,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
