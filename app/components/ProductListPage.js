'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Grid, Eye, Star, SlidersHorizontal, ShoppingBag, Heart, X, ShieldAlert } from 'lucide-react';
import { client, urlFor } from '../../sanity/client';
import { useCartStore } from '../store/useCartStore';

export default function ProductListPage({ category, title, fallbackProducts, searchQuery }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [onlySustainable, setOnlySustainable] = useState(false);
  const [onlyExpress, setOnlyExpress] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [layoutMode, setLayoutMode] = useState('grid');
  const [wishlistedMap, setWishlistedMap] = useState({});
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { openCart, addItem } = useCartStore();

  useEffect(() => {
    async function fetchProducts() {
      try {
        let queryStr = '';
        let params = {};
        if (searchQuery) {
          queryStr = `*[_type == "product" && (title match $searchQuery || brand match $searchQuery || category match $searchQuery)]`;
          params = { searchQuery: `${searchQuery}*` };
        } else {
          queryStr = `*[_type == "product" && category == $category]`;
          params = { category };
        }
        const fetched = await client.fetch(queryStr, params);
        const sourceData = (fetched && fetched.length > 0)
          ? fetched.map(item => ({
              _id: item._id,
              image_url: urlFor(item.image).url(),
              brand: item.brand,
              para: item.title,
              price: `Rs. ${item.price}`,
              rs: item.price,
              strikedoffprice: item.strikedPrice ? `Rs. ${item.strikedPrice}` : '',
              offer: item.offer ? `${item.offer}` : '',
              category: item.category
            }))
          : fallbackProducts;

        const enriched = sourceData.map((item, index) => {
          const colors = ["Black", "White", "Beige", "Blue", "Red", "Olive"];
          const sizes = ["S", "M", "L", "XL"];
          const materials = ["Cotton", "Linen", "Polyester", "Leather"];
          return {
            ...item,
            id: item._id || `product-${index}`,
            colors: [colors[index % colors.length], colors[(index + 2) % colors.length]],
            sizes: [sizes[index % sizes.length], sizes[(index + 1) % sizes.length], sizes[(index + 2) % sizes.length]],
            material: materials[index % materials.length],
            rating: parseFloat((4.0 + (index % 10) * 0.1).toFixed(1)),
            reviewsCount: 12 + (index * 7) % 150,
            sustainability: index % 3 === 0,
            deliverySpeed: index % 2 === 0 ? "express" : "standard",
            popularity: 100 - index
          };
        });

        setProducts(enriched);
        setFilteredProducts(enriched);
        const uniqueBrands = Array.from(new Set(enriched.map(item => item.brand)));
        setBrands(uniqueBrands);
      } catch (err) {
        console.error("Sanity product load error, using fallbacks:", err);
        const enrichedFallbacks = fallbackProducts.map((item, index) => ({
          ...item,
          id: `fallback-${index}`,
          colors: ["Black", "White"],
          sizes: ["M", "L"],
          material: "Cotton",
          rating: 4.5,
          reviewsCount: 42,
          sustainability: true,
          deliverySpeed: "express",
          popularity: 90
        }));
        setProducts(enrichedFallbacks);
        setFilteredProducts(enrichedFallbacks);
        setBrands(Array.from(new Set(enrichedFallbacks.map(item => item.brand))));
      }
    }
    fetchProducts();
  }, [category, fallbackProducts, searchQuery]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishListObj")) || [];
    const map = {};
    wishlist.forEach(item => { map[item.image_url] = true; });
    setWishlistedMap(map);
  }, []);

  useEffect(() => {
    let result = [...products];
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    result = result.filter(p => p.rs <= priceRange);
    if (selectedSizes.length > 0) result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    if (onlySustainable) result = result.filter(p => p.sustainability);
    if (onlyExpress) result = result.filter(p => p.deliverySpeed === 'express');
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    if (sortBy === 'popularity') result.sort((a, b) => b.popularity - a.popularity);
    else if (sortBy === 'price-low') result.sort((a, b) => a.rs - b.rs);
    else if (sortBy === 'price-high') result.sort((a, b) => b.rs - a.rs);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    setFilteredProducts(result);
  }, [selectedBrands, priceRange, selectedSizes, onlySustainable, onlyExpress, minRating, sortBy, products]);

  const toggleWishlist = (elem, e) => {
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem("wishListObj")) || [];
    const isWishlisted = wishlistedMap[elem.image_url];
    if (isWishlisted) {
      wishlist = wishlist.filter(item => item.image_url !== elem.image_url);
      setWishlistedMap(prev => ({ ...prev, [elem.image_url]: false }));
    } else {
      wishlist.push(elem);
      setWishlistedMap(prev => ({ ...prev, [elem.image_url]: true }));
    }
    localStorage.setItem("wishListObj", JSON.stringify(wishlist));
  };

  const handleAddToBag = (elem, e) => {
    e.stopPropagation();
    addItem({
      id: elem.id,
      name: elem.para,
      brand: elem.brand,
      price: elem.rs,
      image: elem.image_url,
      quantity: 1,
    });
    openCart();
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange(10000);
    setSelectedSizes([]);
    setOnlySustainable(false);
    setOnlyExpress(false);
    setMinRating(0);
  };

  // Sidebar content (shared between desktop sidebar and mobile drawer)
  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 24px", borderBottom: "1px solid #f0f0f0",
      }}>
        <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#1a1c23", display: "flex", alignItems: "center", gap: "8px" }}>
          <SlidersHorizontal size={16} color="#ff3f6c" />
          Filters
        </h3>
        <button onClick={clearFilters} style={{
          fontSize: "12px", color: "#8e95a0", background: "none", border: "none",
          cursor: "pointer", fontWeight: 700, fontFamily: "inherit",
        }}>
          Clear All
        </button>
      </div>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Quick toggles */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { label: "🌱 Eco-Friendly", checked: onlySustainable, onChange: setOnlySustainable },
            { label: "⚡ Express Delivery", checked: onlyExpress, onChange: setOnlyExpress },
          ].map(({ label, checked, onChange }) => (
            <label key={label} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div
                onClick={() => onChange(!checked)}
                style={{
                  width: "42px", height: "24px", borderRadius: "999px",
                  background: checked ? "#ff3f6c" : "#e5e7eb",
                  position: "relative", cursor: "pointer", transition: "background 0.3s",
                  flexShrink: 0,
                }}
              >
                <div style={{
                  position: "absolute", top: "3px",
                  left: checked ? "21px" : "3px",
                  width: "18px", height: "18px",
                  background: "white", borderRadius: "50%",
                  transition: "left 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }} />
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1c23" }}>{label}</span>
            </label>
          ))}
        </div>

        {/* Brands */}
        {brands.length > 0 && (
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
            <h4 style={{ fontSize: "11px", fontWeight: 800, color: "#8e95a0", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Brands</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "160px", overflowY: "auto" }}>
              {brands.map(brand => (
                <label key={brand} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <div
                    onClick={() => handleBrandChange(brand)}
                    style={{
                      width: "18px", height: "18px", borderRadius: "5px",
                      border: selectedBrands.includes(brand) ? "none" : "2px solid #d1d5db",
                      background: selectedBrands.includes(brand) ? "#ff3f6c" : "transparent",
                      flexShrink: 0, cursor: "pointer", transition: "all 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {selectedBrands.includes(brand) && (
                      <span style={{ color: "white", fontSize: "10px", fontWeight: 900 }}>✓</span>
                    )}
                  </div>
                  <span style={{ fontSize: "14px", color: "#636b74", fontWeight: 500 }}>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <h4 style={{ fontSize: "11px", fontWeight: 800, color: "#8e95a0", letterSpacing: "1.5px", textTransform: "uppercase" }}>Max Price</h4>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#ff3f6c" }}>Rs. {priceRange.toLocaleString()}</span>
          </div>
          <input
            type="range" min="500" max="10000" step="500"
            value={priceRange}
            onChange={e => setPriceRange(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: "#ff3f6c", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span style={{ fontSize: "11px", color: "#8e95a0" }}>Rs. 500</span>
            <span style={{ fontSize: "11px", color: "#8e95a0" }}>Rs. 10,000</span>
          </div>
        </div>

        {/* Sizes */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
          <h4 style={{ fontSize: "11px", fontWeight: 800, color: "#8e95a0", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Sizes</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["XS", "S", "M", "L", "XL", "XXL"].map(size => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  style={{
                    width: "42px", height: "42px", borderRadius: "10px",
                    border: active ? "none" : "1.5px solid #e5e7eb",
                    background: active ? "#ff3f6c" : "white",
                    color: active ? "white" : "#636b74",
                    fontSize: "12px", fontWeight: 800, cursor: "pointer",
                    transition: "all 0.2s", fontFamily: "inherit",
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rating */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
          <h4 style={{ fontSize: "11px", fontWeight: 800, color: "#8e95a0", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Min Rating</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[4, 3, 2].map(stars => (
              <button
                key={stars}
                onClick={() => setMinRating(stars === minRating ? 0 : stars)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: minRating === stars ? "#fff4f7" : "transparent",
                  border: minRating === stars ? "1px solid #ff3f6c" : "1px solid transparent",
                  borderRadius: "8px", padding: "8px 10px",
                  cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                }}
              >
                <div style={{ display: "flex" }}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <span style={{ fontSize: "13px", color: "#636b74", fontWeight: 600 }}>& Up</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const cols = layoutMode === 'compact' ? 4 : 3;

  return (
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "40px 5vw" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "40px" }}>
        <span style={{ display: "block", color: "#ff3f6c", fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
          Aura Collection
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#1a1c23",
            fontFamily: "'Outfit', sans-serif", letterSpacing: "-1px",
          }}>
            {title}
          </h1>
          <span style={{ fontSize: "15px", color: "#8e95a0", fontWeight: 500 }}>
            {filteredProducts.length} items
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
        {/* Desktop Sidebar */}
        <aside style={{
          width: "280px", flexShrink: 0,
          background: "white", borderRadius: "20px",
          border: "1px solid #f0f0f0",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          position: "sticky", top: "90px",
          overflow: "hidden",
        }} className="desktop-sidebar">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Sort bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "white", borderRadius: "16px", padding: "14px 20px",
            border: "1px solid #f0f0f0", marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            flexWrap: "wrap", gap: "12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "13px", color: "#8e95a0", fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  padding: "8px 12px", borderRadius: "10px",
                  border: "1.5px solid #e5e7eb", fontSize: "13px", fontWeight: 700,
                  color: "#1a1c23", background: "white",
                  cursor: "pointer", fontFamily: "inherit", outline: "none",
                }}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { mode: 'grid', icon: <Grid size={16} /> },
                { mode: 'compact', icon: <LayoutGrid size={16} /> },
              ].map(({ mode, icon }) => (
                <button
                  key={mode}
                  onClick={() => setLayoutMode(mode)}
                  style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    border: "1.5px solid",
                    borderColor: layoutMode === mode ? "#ff3f6c" : "#e5e7eb",
                    background: layoutMode === mode ? "#ff3f6c" : "white",
                    color: layoutMode === mode ? "white" : "#8e95a0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "20px",
          }}>
            <AnimatePresence>
              {filteredProducts.map((elem, i) => (
                <ProductCard
                  key={elem.id}
                  elem={elem}
                  index={i}
                  wishlisted={!!wishlistedMap[elem.image_url]}
                  onWishlist={(e) => toggleWishlist(elem, e)}
                  onAddToBag={(e) => handleAddToBag(elem, e)}
                  onQuickView={() => setSelectedQuickView(elem)}
                  onClick={() => router.push(`/product/${elem.id}`)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <ShieldAlert size={48} color="#ff3f6c" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1a1c23", marginBottom: "8px" }}>No products match</h3>
              <p style={{ color: "#8e95a0", fontSize: "14px" }}>Try adjusting your filters</p>
              <button onClick={clearFilters} style={{
                marginTop: "16px", padding: "10px 24px",
                background: "#ff3f6c", color: "white",
                border: "none", borderRadius: "10px",
                fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedQuickView && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuickView(null)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                position: "relative", background: "white",
                borderRadius: "24px", maxWidth: "700px", width: "100%",
                maxHeight: "90vh", overflowY: "auto", zIndex: 1,
                display: "grid", gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div style={{ position: "relative", borderRadius: "24px 0 0 24px", overflow: "hidden", minHeight: "400px" }}>
                <img src={selectedQuickView.image_url} alt={selectedQuickView.para} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column" }}>
                <button
                  onClick={() => setSelectedQuickView(null)}
                  style={{
                    position: "absolute", top: "16px", right: "16px",
                    width: "32px", height: "32px", borderRadius: "50%",
                    border: "none", background: "#f4f6f8", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <X size={16} />
                </button>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#8e95a0", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
                  {selectedQuickView.brand}
                </span>
                <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#1a1c23", lineHeight: 1.3, marginBottom: "16px" }}>
                  {selectedQuickView.para}
                </h2>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
                  <span style={{ fontSize: "24px", fontWeight: 900, color: "#1a1c23" }}>{selectedQuickView.price}</span>
                  {selectedQuickView.strikedoffprice && (
                    <span style={{ fontSize: "14px", color: "#8e95a0", textDecoration: "line-through" }}>{selectedQuickView.strikedoffprice}</span>
                  )}
                </div>
                {selectedQuickView.offer && (
                  <div style={{ marginBottom: "24px" }}>
                    <span style={{
                      display: "inline-block", background: "#fff4f7",
                      color: "#ff3f6c", fontSize: "12px", fontWeight: 800,
                      padding: "4px 12px", borderRadius: "6px", letterSpacing: "0.5px",
                    }}>
                      {selectedQuickView.offer} OFF
                    </span>
                  </div>
                )}
                <button
                  onClick={(e) => { handleAddToBag(selectedQuickView, e); setSelectedQuickView(null); }}
                  style={{
                    width: "100%", padding: "16px",
                    background: "linear-gradient(135deg, #ff3f6c, #ff6b8b)",
                    color: "white", border: "none", borderRadius: "14px",
                    fontWeight: 800, fontSize: "14px", letterSpacing: "0.5px",
                    cursor: "pointer", fontFamily: "inherit",
                    boxShadow: "0 8px 24px rgba(255,63,108,0.3)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    marginTop: "auto",
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) { .desktop-sidebar { display: none !important; } }
      `}</style>
    </div>
  );
}

function ProductCard({ elem, index, wishlisted, onWishlist, onAddToBag, onQuickView, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white", borderRadius: "20px",
        overflow: "hidden", cursor: "pointer",
        border: "1px solid #f0f0f0",
        display: "flex", flexDirection: "column",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${(index % 12) * 0.04}s, transform 0.6s ease ${(index % 12) * 0.04}s, box-shadow 0.4s ease`,
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#f8f9fa" }}>
        <img
          src={elem.image_url}
          alt={elem.para}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.8s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Discount badge */}
        {elem.offer && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: "#ff3f6c", color: "white",
            fontSize: "9px", fontWeight: 900, letterSpacing: "0.5px",
            padding: "3px 8px", borderRadius: "6px", textTransform: "uppercase",
          }}>
            {elem.offer}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={onWishlist}
          style={{
            position: "absolute", top: "12px", right: "12px",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
            zIndex: 2,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <Heart size={15} fill={wishlisted ? "#ff3f6c" : "none"} color={wishlisted ? "#ff3f6c" : "#636b74"} />
        </button>

        {/* Quick view on hover */}
        <div style={{
          position: "absolute", bottom: "12px", left: "12px", right: "12px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          zIndex: 2,
        }}>
          <button
            onClick={e => { e.stopPropagation(); onQuickView(); }}
            style={{
              width: "100%", padding: "10px",
              background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
              border: "none", borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              fontSize: "11px", fontWeight: 800, letterSpacing: "0.5px",
              color: "#1a1c23", cursor: "pointer", fontFamily: "inherit",
              textTransform: "uppercase",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#ff3f6c"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.color = "#1a1c23"; }}
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "10px", fontWeight: 800, color: "#8e95a0", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            {elem.brand}
          </span>
          <div style={{
            display: "flex", alignItems: "center", gap: "3px",
            background: "#fafafa", padding: "2px 6px", borderRadius: "6px",
          }}>
            <Star size={11} fill="#fbbf24" color="#fbbf24" />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#636b74" }}>{elem.rating}</span>
          </div>
        </div>
        <p style={{
          fontSize: "14px", fontWeight: 600, color: "#1a1c23",
          lineHeight: 1.4,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {elem.para}
        </p>
        <div style={{
          marginTop: "auto", paddingTop: "12px",
          borderTop: "1px solid #f4f6f8",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "8px",
        }}>
          <div>
            <div style={{ fontSize: "17px", fontWeight: 900, color: "#1a1c23" }}>{elem.price}</div>
            {elem.strikedoffprice && (
              <div style={{ fontSize: "11px", color: "#8e95a0", textDecoration: "line-through", marginTop: "1px" }}>
                {elem.strikedoffprice}
              </div>
            )}
          </div>
          <button
            onClick={onAddToBag}
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: hovered ? "#ff3f6c" : "#f4f6f8",
              border: "none", cursor: "pointer", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s, color 0.3s",
              color: hovered ? "white" : "#636b74",
              boxShadow: hovered ? "0 4px 16px rgba(255,63,108,0.3)" : "none",
            }}
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
