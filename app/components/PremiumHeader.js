"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, ArrowRight, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "../store/useCartStore";
import { useTheme } from "./ThemeProvider";

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
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
      link: "/beautypage"
    },
    sections: [
      { title: "Makeup", items: ["Lipstick", "Mascara", "Foundation", "Eyeliner"] },
      { title: "Skincare", items: ["Face Moisturizer", "Cleanser", "Serum", "Sunscreen"] },
      { title: "Fragrances", items: ["Fragrances", "Deodorants", "Body Mists"] }
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

const promoMessages = [
  "🚚  Free Shipping on orders above Rs. 2,000",
  "🏷️  Use code MYNTRA300 · Save Rs. 300 instantly",
  "✨  New Summer '26 collection · Shop Now",
];

export default function PremiumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const pathname = usePathname();
  const { openCart, cartItems, wishlistItems, hydrateFromLocalStorage } = useCartStore();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    hydrateFromLocalStorage();
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    const promoInterval = setInterval(() => {
      setPromoIndex(prev => (prev + 1) % promoMessages.length);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(promoInterval);
    };
  }, []);

  const cartCount = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const wishlistCount = mounted ? (wishlistItems?.length || 0) : 0;

  const isLanding = pathname === "/Landingpage" || pathname === "/";
  const isTransparent = !isScrolled && !activeMegaMenu && isLanding;

  // Let the theme dictate colors based on state
  const headerBg = isTransparent
    ? "transparent"
    : "var(--header-scrolled)";

  const headerBorderBottom = isTransparent
    ? "1px solid transparent"
    : "1px solid var(--header-border)";

  const textColor = isTransparent
    ? "white"
    : "var(--header-text)";

  const iconHoverBg = isTransparent
    ? "rgba(255,255,255,0.1)"
    : "var(--border-light)";

  return (
    <>
      {/* ─────── Promo Announcement Bar ─────── */}
      {isLanding && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 101,
          background: "linear-gradient(90deg, #0c0c0f, #1c1c28 50%, #0c0c0f)",
          height: "36px", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={promoIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{
                color: "rgba(245,243,239,0.85)", fontSize: "11px", fontWeight: 600,
                letterSpacing: "1px", fontFamily: "var(--font-secondary)",
              }}
            >
              {promoMessages[promoIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      <header style={{
        position: "fixed",
        top: isLanding ? "36px" : "0",
        left: 0, right: 0,
        zIndex: 100,
        background: headerBg,
        backdropFilter: isTransparent ? "none" : "blur(24px)",
        WebkitBackdropFilter: isTransparent ? "none" : "blur(24px)",
        borderBottom: headerBorderBottom,
        transition: "background 0.4s ease, border-color 0.4s ease, top 0.3s ease",
        boxShadow: !isTransparent && isScrolled ? "var(--shadow-md)" : "none",
      }}>
        <div style={{
          maxWidth: "1600px", margin: "0 auto",
          padding: "0 5vw",
          height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "24px",
        }}>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: "8px", color: textColor,
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
              width: "36px", height: "36px", borderRadius: "10px",
              background: "var(--accent-gradient)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "var(--accent-glow)",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--gold-glow)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--accent-glow)"}
            >
              <span style={{ color: "white", fontWeight: 900, fontSize: "15px", fontFamily: "var(--font-primary)" }}>A.</span>
            </div>
            <span style={{
              fontSize: "21px", fontWeight: 900, color: textColor,
              fontFamily: "var(--font-primary)", letterSpacing: "-0.5px",
              transition: "color 0.4s ease",
            }}>Aura</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{
            display: "flex", alignItems: "center", gap: "2px", flex: 1,
            justifyContent: "center",
          }} className="desktop-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasMega = menuData[item.name];
              const isMenuActive = activeMegaMenu === item.name;
              return (
                <div
                  key={item.name}
                  style={{ position: "relative", height: "68px", display: "flex", alignItems: "center" }}
                  onMouseEnter={() => hasMega && setActiveMegaMenu(item.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link href={item.href} style={{
                    position: "relative",
                    display: "flex", alignItems: "center", gap: "5px",
                    padding: "8px 13px",
                    color: (isActive || isMenuActive) ? "var(--accent)" : textColor,
                    fontSize: "12.5px", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.8px",
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                    borderRadius: "8px",
                    fontFamily: "var(--font-secondary)",
                  }}>
                    {item.name}
                    {item.isNew && (
                      <span style={{
                        fontSize: "7px", fontWeight: 900,
                        background: "var(--accent)", color: "white",
                        padding: "2px 5px", borderRadius: "4px",
                        letterSpacing: "0.5px",
                      }}>NEW</span>
                    )}
                    {/* Active underline */}
                    <span style={{
                      position: "absolute", bottom: "4px", left: "13px", right: "13px",
                      height: "2px", background: "var(--accent)", borderRadius: "999px",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s ease",
                      transformOrigin: "center",
                    }} />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right action icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`theme-toggle ${theme === "dark" ? "dark" : ""}`}
              style={{
                background: theme === "dark" ? "#1e1e24" : "#e2ddd5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 6px",
              }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <Sun size={12} color={theme === "dark" ? "#8a8a99" : "#B8922A"} />
              <Moon size={12} color={theme === "dark" ? "#C9A84C" : "#8a8a99"} />
              <div className="theme-toggle-thumb" />
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px",
                background: searchOpen ? "var(--accent-light)" : "none",
                border: "none", cursor: "pointer",
                color: searchOpen ? "var(--accent)" : textColor,
                borderRadius: "10px",
                transition: "background 0.2s, color 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = iconHoverBg; }}
              onMouseLeave={e => { e.currentTarget.style.color = searchOpen ? "var(--accent)" : textColor; e.currentTarget.style.background = searchOpen ? "var(--accent-light)" : "none"; }}
            >
              <Search size={19} />
            </button>

            <Link href="/Profile/profile" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "40px", height: "40px",
              color: textColor, borderRadius: "10px",
              transition: "color 0.2s, background 0.2s", textDecoration: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = iconHoverBg; }}
            onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.background = "none"; }}
            >
              <User size={19} />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", width: "40px", height: "40px",
              color: textColor, borderRadius: "10px",
              transition: "color 0.2s, background 0.2s, transform 0.25s", textDecoration: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = iconHoverBg; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.background = "none"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span style={{
                  position: "absolute", top: "5px", right: "5px",
                  width: "15px", height: "15px",
                  background: "var(--accent)", color: "white",
                  borderRadius: "50%", fontSize: "8px", fontWeight: 900,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 8px rgba(255,63,108,0.6)",
                }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", width: "40px", height: "40px",
                background: "none", border: "none", cursor: "pointer",
                color: textColor, borderRadius: "10px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = iconHoverBg; }}
              onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.background = "none"; }}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: "5px", right: "5px",
                  width: "15px", height: "15px",
                  background: "var(--accent)", color: "white",
                  borderRadius: "50%", fontSize: "8px", fontWeight: 900,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 8px rgba(255,63,108,0.6)",
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ─── Mega Menu ─── */}
        <AnimatePresence>
          {activeMegaMenu && menuData[activeMegaMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", left: 0, right: 0,
                background: "var(--mega-bg)", backdropFilter: "blur(24px)",
                borderBottom: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-lg)",
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
                      fontSize: "10px", fontWeight: 900, color: "var(--text-muted)",
                      textTransform: "uppercase", letterSpacing: "2.5px",
                      marginBottom: "16px", paddingBottom: "12px",
                      borderBottom: "1px solid var(--border-color)",
                      fontFamily: "var(--font-secondary)",
                    }}>
                      {section.title}
                    </h4>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "11px" }}>
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link href={`${menuData[activeMegaMenu].href}?q=${encodeURIComponent(item)}`}
                            style={{
                              fontSize: "14px", color: "var(--text-secondary)",
                              textDecoration: "none", transition: "color 0.2s",
                              fontFamily: "var(--font-secondary)",
                              fontWeight: 500,
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured promo */}
                <div style={{ width: "230px" }}>
                  <div style={{ borderRadius: "18px", overflow: "hidden", position: "relative", height: "168px" }}>
                    <img
                      src={menuData[activeMegaMenu].featured.image}
                      alt={menuData[activeMegaMenu].featured.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
                    }} />
                    <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                      <span style={{
                        fontSize: "8px", fontWeight: 900, background: "var(--gold-gradient)",
                        color: "#3a2a00", padding: "2px 8px", borderRadius: "4px",
                        textTransform: "uppercase", letterSpacing: "1px",
                      }}>Featured</span>
                    </div>
                  </div>
                  <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginTop: "12px", fontSize: "15px", fontFamily: "var(--font-primary)" }}>
                    {menuData[activeMegaMenu].featured.title}
                  </h4>
                  <Link href={menuData[activeMegaMenu].featured.link} style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    marginTop: "8px", fontSize: "12px", color: "var(--accent)",
                    fontWeight: 800, textDecoration: "none",
                    fontFamily: "var(--font-secondary)", letterSpacing: "0.5px",
                  }}>
                    Shop Now <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Search Overlay ─── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", left: 0, right: 0,
                background: "var(--mega-bg)", backdropFilter: "blur(24px)",
                borderBottom: "1px solid var(--border-color)",
                padding: "22px 5vw",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div style={{
                maxWidth: "640px", margin: "0 auto",
                display: "flex", alignItems: "center", gap: "12px",
                background: "var(--bg-secondary)", borderRadius: "14px", padding: "13px 20px",
                border: "1px solid var(--border-color)",
              }}>
                <Search size={17} color="var(--text-muted)" />
                <input
                  autoFocus
                  placeholder="Search clothes, brands, styles..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1, background: "none", border: "none", outline: "none",
                    fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-secondary)",
                    fontWeight: 500,
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <button onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  <X size={17} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Mobile Menu ─── */}
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
                background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              style={{
                position: "fixed", top: 0, left: 0, bottom: 0,
                width: "min(80vw, 320px)", zIndex: 201,
                background: "var(--bg-primary)", overflowY: "auto",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "22px 20px", borderBottom: "1px solid var(--border-color)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "8px",
                    background: "var(--accent-gradient)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "white", fontWeight: 900, fontSize: "14px", fontFamily: "var(--font-primary)" }}>A.</span>
                  </div>
                  <span style={{ fontWeight: 900, fontSize: "18px", color: "var(--text-primary)", fontFamily: "var(--font-primary)" }}>Aura</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  <X size={22} />
                </button>
              </div>
              <nav style={{ padding: "12px" }}>
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 14px", borderRadius: "12px",
                      color: "var(--text-primary)", textDecoration: "none",
                      fontWeight: 700, fontSize: "15px",
                      borderBottom: "1px solid var(--border-light)",
                      fontFamily: "var(--font-secondary)",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--border-light)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {item.name}
                      {item.isNew && <span style={{ fontSize: "8px", fontWeight: 900, background: "var(--accent)", color: "white", padding: "2px 5px", borderRadius: "4px" }}>NEW</span>}
                    </span>
                    <ChevronDown size={15} color="var(--text-muted)" style={{ transform: "rotate(-90deg)" }} />
                  </Link>
                ))}
              </nav>
              {/* Gold accent strip at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "3px",
                background: "var(--gold-gradient)",
              }} />
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
