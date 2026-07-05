"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "../store/useCartStore";

const navItems = [
  { name: "Men", href: "/menspage" },
  { name: "Women", href: "/womenspage" },
  { name: "Kids", href: "/kidspage" },
  { name: "Beauty", href: "/beautypage" },
  { name: "Home & Living", href: "/homeLiving" },
  { name: "Studio", href: "/studiopage", isNew: true },
];

const menuData = {
  Men: {
    href: "/menspage",
    featured: {
      title: "New Season Drops",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
      link: "/menspage"
    },
    sections: [
      { title: "Top Wear", items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Jackets"] },
      { title: "Bottom Wear", items: ["Jeans", "Trousers", "Joggers", "Shorts"] },
      { title: "Footwear", items: ["Sneakers", "Casual Shoes", "Formal Shoes", "Running Shoes"] }
    ]
  },
  Women: {
    href: "/womenspage",
    featured: {
      title: "Summer Collection",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
      link: "/womenspage"
    },
    sections: [
      { title: "Indian & Fusion", items: ["Kurtas & Suits", "Sarees", "Ethnic Dresses", "Leggings"] },
      { title: "Western Wear", items: ["Dresses", "Tops & T-Shirts", "Jeans", "Jackets"] },
      { title: "Footwear", items: ["Flats & Casuals", "Heels", "Sneakers", "Boots"] }
    ]
  },
  Kids: {
    href: "/kidspage",
    featured: {
      title: "Active Playwear",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600&auto=format&fit=crop",
      link: "/kidspage"
    },
    sections: [
      { title: "Boys Clothing", items: ["T-Shirts", "Shirts", "Jeans", "Shorts & Trousers"] },
      { title: "Girls Clothing", items: ["Dresses", "Tops", "Jeans", "Ethnic Wear"] },
      { title: "Infants", items: ["Rompers", "Sets", "Winter Wear"] }
    ]
  },
  Beauty: {
    href: "/beautypage",
    featured: {
      title: "Clean Skincare",
      image: "https://images.unsplash.com/photo-1522335221946-8692795f5431?q=80&w=600&auto=format&fit=crop",
      link: "/beautypage"
    },
    sections: [
      { title: "Makeup", items: ["Lipstick", "Mascara", "Foundation", "Eyeliner"] },
      { title: "Skincare", items: ["Face Moisturizer", "Cleanser", "Serum", "Sunscreen"] },
      { title: "Fragrances", items: ["Perfumes", "Deodorants", "Body Mists"] }
    ]
  },
  "Home & Living": {
    href: "/homeLiving",
    featured: {
      title: "Minimalist Decor",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      link: "/homeLiving"
    },
    sections: [
      { title: "Bed & Bath", items: ["Bedsheets", "Blankets", "Towels", "Bath Rugs"] },
      { title: "Decor", items: ["Cushions", "Curtains", "Wall Art", "Vases"] },
      { title: "Kitchen", items: ["Dinnerware", "Cookware", "Cups & Mugs"] }
    ]
  }
};

export default function PremiumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { openCart, cartItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const isLanding = pathname === "/Landingpage" || pathname === "/";

  const headerBg = isScrolled || activeMegaMenu || !isLanding
    ? "rgba(255,255,255,0.95)"
    : "transparent";
  const headerBorder = isScrolled || activeMegaMenu || !isLanding
    ? "1px solid rgba(0,0,0,0.06)"
    : "1px solid transparent";
  const textColor = (isScrolled || activeMegaMenu || !isLanding) ? "#1a1c23" : "white";

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: headerBg,
        backdropFilter: (isScrolled || activeMegaMenu) ? "blur(20px)" : "none",
        WebkitBackdropFilter: (isScrolled || activeMegaMenu) ? "blur(20px)" : "none",
        borderBottom: headerBorder,
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        boxShadow: isScrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={{
          maxWidth: "1600px", margin: "0 auto",
          padding: "0 5vw",
          height: "72px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "32px",
        }}>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: "8px", color: textColor,
              '@media (max-width: 1024px)': { display: "flex" },
            }}
            className="lg-hide"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/Landingpage" style={{
            display: "flex", alignItems: "center", gap: "10px",
            textDecoration: "none", flexShrink: 0,
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "linear-gradient(135deg, #ff3f6c, #ff6b8b)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(255,63,108,0.35)",
            }}>
              <span style={{ color: "white", fontWeight: 900, fontSize: "16px" }}>A.</span>
            </div>
            <span style={{
              fontSize: "22px", fontWeight: 900, color: textColor,
              fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px",
              transition: "color 0.4s ease",
            }}>Aura</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{
            display: "flex", alignItems: "center", gap: "4px", flex: 1,
            justifyContent: "center",
          }} className="desktop-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasMega = menuData[item.name];
              return (
                <div
                  key={item.name}
                  style={{ position: "relative", height: "72px", display: "flex", alignItems: "center" }}
                  onMouseEnter={() => hasMega && setActiveMegaMenu(item.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link href={item.href} style={{
                    position: "relative",
                    display: "flex", alignItems: "center", gap: "4px",
                    padding: "8px 14px",
                    color: isActive || activeMegaMenu === item.name ? "#ff3f6c" : textColor,
                    fontSize: "13px", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.8px",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    borderRadius: "8px",
                  }}>
                    {item.name}
                    {item.isNew && (
                      <span style={{
                        fontSize: "8px", fontWeight: 900,
                        background: "#ff3f6c", color: "white",
                        padding: "2px 5px", borderRadius: "4px",
                        letterSpacing: "0.5px",
                      }}>NEW</span>
                    )}
                    {/* Active underline */}
                    <span style={{
                      position: "absolute", bottom: "2px", left: "14px", right: "14px",
                      height: "2px", background: "#ff3f6c", borderRadius: "999px",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s ease",
                    }} />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px",
                background: "none", border: "none", cursor: "pointer",
                color: textColor, borderRadius: "10px",
                transition: "background 0.2s, color 0.4s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
              onMouseLeave={e => e.currentTarget.style.color = textColor}
            >
              <Search size={20} />
            </button>

            <Link href="/Profile/profile" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "40px", height: "40px",
              color: textColor, borderRadius: "10px",
              transition: "color 0.2s", textDecoration: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
            onMouseLeave={e => e.currentTarget.style.color = textColor}
            >
              <User size={20} />
            </Link>

            <Link href="/wishlist" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "40px", height: "40px",
              color: textColor, borderRadius: "10px",
              transition: "color 0.2s", textDecoration: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
            onMouseLeave={e => e.currentTarget.style.color = textColor}
            >
              <Heart size={20} />
            </Link>

            <button
              onClick={openCart}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", width: "40px", height: "40px",
                background: "none", border: "none", cursor: "pointer",
                color: textColor, borderRadius: "10px",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
              onMouseLeave={e => e.currentTarget.style.color = textColor}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: "4px", right: "4px",
                  width: "16px", height: "16px",
                  background: "#ff3f6c", color: "white",
                  borderRadius: "50%", fontSize: "9px", fontWeight: 900,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu && menuData[activeMegaMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", left: 0, right: 0,
                background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
                zIndex: 99,
              }}
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div style={{
                maxWidth: "1600px", margin: "0 auto",
                padding: "40px 5vw",
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: "48px",
              }}>
                {menuData[activeMegaMenu].sections.map((section) => (
                  <div key={section.title}>
                    <h4 style={{
                      fontSize: "11px", fontWeight: 900, color: "#8e95a0",
                      textTransform: "uppercase", letterSpacing: "2px",
                      marginBottom: "16px", paddingBottom: "12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}>
                      {section.title}
                    </h4>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link href={`${menuData[activeMegaMenu].href}?q=${encodeURIComponent(item)}`}
                            style={{ fontSize: "14px", color: "#636b74", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#ff3f6c"}
                            onMouseLeave={e => e.currentTarget.style.color = "#636b74"}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured promo */}
                <div style={{ width: "220px" }}>
                  <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", height: "160px" }}>
                    <img
                      src={menuData[activeMegaMenu].featured.image}
                      alt={menuData[activeMegaMenu].featured.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
                    }} />
                    <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                      <span style={{ fontSize: "9px", fontWeight: 900, background: "#ff3f6c", color: "white", padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase" }}>Featured</span>
                    </div>
                  </div>
                  <h4 style={{ fontWeight: 800, color: "#1a1c23", marginTop: "12px", fontSize: "15px" }}>
                    {menuData[activeMegaMenu].featured.title}
                  </h4>
                  <Link href={menuData[activeMegaMenu].featured.link} style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    marginTop: "8px", fontSize: "13px", color: "#ff3f6c",
                    fontWeight: 700, textDecoration: "none",
                  }}>
                    Shop Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                position: "absolute", left: 0, right: 0,
                background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                padding: "24px 5vw",
                boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{
                maxWidth: "600px", margin: "0 auto",
                display: "flex", alignItems: "center", gap: "12px",
                background: "#f4f6f8", borderRadius: "12px", padding: "12px 20px",
              }}>
                <Search size={18} color="#8e95a0" />
                <input
                  autoFocus
                  placeholder="Search for clothes, brands, styles..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1, background: "none", border: "none", outline: "none",
                    fontSize: "15px", color: "#1a1c23", fontFamily: "inherit",
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <button onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8e95a0" }}>
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed", top: 0, left: 0, bottom: 0,
                width: "min(80vw, 320px)", zIndex: 201,
                background: "white", overflowY: "auto",
                boxShadow: "8px 0 48px rgba(0,0,0,0.15)",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px", borderBottom: "1px solid #f0f0f0",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "8px",
                    background: "#ff3f6c", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "white", fontWeight: 900, fontSize: "14px" }}>A.</span>
                  </div>
                  <span style={{ fontWeight: 900, fontSize: "18px", color: "#1a1c23" }}>Aura</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#636b74" }}>
                  <X size={22} />
                </button>
              </div>
              <nav style={{ padding: "16px" }}>
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 12px", borderRadius: "10px",
                      color: "#1a1c23", textDecoration: "none",
                      fontWeight: 700, fontSize: "15px",
                      borderBottom: "1px solid #f4f6f8",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {item.name}
                      {item.isNew && <span style={{ fontSize: "8px", fontWeight: 900, background: "#ff3f6c", color: "white", padding: "2px 5px", borderRadius: "4px" }}>NEW</span>}
                    </span>
                    <ChevronDown size={16} color="#8e95a0" style={{ transform: "rotate(-90deg)" }} />
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1025px) { .lg-hide { display: none !important; } }
        @media (max-width: 1024px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
