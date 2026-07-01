'use client';

import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../sanity/client';

export default function ProductListPage({ category, title, fallbackProducts, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [nameSort, setNameSort] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [wishlistedMap, setWishlistedMap] = useState({});

  // Fetch data
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
        if (fetched && fetched.length > 0) {
          const formatted = fetched.map(item => ({
            image_url: urlFor(item.image).url(),
            brand: item.brand,
            para: item.title,
            price: `Rs. ${item.price}`,
            rs: item.price,
            strikedoffprice: item.strikedPrice ? `Rs. ${item.strikedPrice}` : '',
            offer: item.offer ? `(${item.offer})` : '',
            category: item.category
          }));
          setProducts(formatted);
          setFilteredProducts(formatted);
          extractBrands(formatted);
        } else {
          setProducts(fallbackProducts);
          setFilteredProducts(fallbackProducts);
          extractBrands(fallbackProducts);
        }
      } catch (err) {
        console.error("Sanity product load error, using fallbacks:", err);
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        extractBrands(fallbackProducts);
      }
    }
    fetchProducts();
  }, [category, fallbackProducts, searchQuery]);

  // Load wishlist map
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishListObj")) || [];
    const map = {};
    wishlist.forEach(item => {
      map[item.image_url] = true;
    });
    setWishlistedMap(map);
  }, []);

  const extractBrands = (items) => {
    const list = Array.from(new Set(items.map(item => item.brand)));
    setBrands(list);
  };

  // Handle Filtering & Sorting combined
  useEffect(() => {
    let result = [...products];

    // Filter by Brand
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Sort by Name (Brand)
    if (nameSort === 'asc') {
      result.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (nameSort === 'desc') {
      result.sort((a, b) => b.brand.localeCompare(a.brand));
    }

    // Sort by Price
    if (priceSort === 'lth') {
      result.sort((a, b) => a.rs - b.rs);
    } else if (priceSort === 'htl') {
      result.sort((a, b) => b.rs - a.rs);
    }

    setFilteredProducts(result);
  }, [selectedBrand, nameSort, priceSort, products]);

  // Actions
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
    window.dispatchEvent(new Event('cart-updated')); // Notify store layout
  };

  const addToBag = (elem, e) => {
    const bag = JSON.parse(localStorage.getItem("BagListObj")) || [];
    bag.push(elem);
    localStorage.setItem("BagListObj", JSON.stringify(bag));
    window.dispatchEvent(new Event('cart-updated')); // Notify store layout

    // Update button text temporarily
    const oldText = e.target.innerText;
    e.target.innerText = "ADDED TO BAG ✓";
    e.target.style.backgroundColor = "var(--success-color)";
    e.target.style.color = "white";
    setTimeout(() => {
      e.target.innerText = oldText;
      e.target.style.backgroundColor = "";
      e.target.style.color = "";
    }, 1500);
  };

  return (
    <div>
      {/* FILTER & SORT PANEL */}
      <div className="filter-sort-panel">
        <div className="filter-group">
          <label className="filter-label">Sort Name:</label>
          <select 
            className="filter-select"
            value={nameSort} 
            onChange={(e) => { setNameSort(e.target.value); setPriceSort(''); }}
          >
            <option value="">Default</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort Price:</label>
          <select 
            className="filter-select"
            value={priceSort} 
            onChange={(e) => { setPriceSort(e.target.value); setNameSort(''); }}
          >
            <option value="">Default</option>
            <option value="lth">Low to High</option>
            <option value="htl">High to Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Brand:</label>
          <select 
            className="filter-select"
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="all">All Brands</option>
            {brands.map((brand, idx) => (
              <option key={idx} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>

      <h1 className="brand_heading" style={{ textAlign: 'left', margin: '2rem 0' }}>
        {title} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500', textTransform: 'lowercase' }}>({filteredProducts.length} items found)</span>
      </h1>

      {/* PRODUCTS GRID */}
      <div className="products-grid">
        {filteredProducts.map((elem, idx) => (
          <div className="product-card" key={idx}>
            {/* IMAGE WRAPPER */}
            <div className="product-image-wrapper">
              <img 
                className="product-img"
                src={elem.image_url} 
                alt={elem.para} 
              />
              
              {/* WISHLIST OVERLAY */}
              <div 
                onClick={(e) => toggleWishlist(elem, e)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-glass)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  zIndex: 5,
                  transition: 'transform var(--transition-bounce)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <i 
                  className={wishlistedMap[elem.image_url] ? "fa-solid fa-heart" : "fa-regular fa-heart"} 
                  style={{ 
                    color: wishlistedMap[elem.image_url] ? 'var(--accent-color)' : 'var(--text-secondary)', 
                    fontSize: '16px',
                    transition: 'color var(--transition-fast)'
                  }}
                />
              </div>

              {/* DISCOUNT BADGE OVERLAY */}
              {elem.offer && (
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'var(--accent-color)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.5px',
                  zIndex: 5,
                  boxShadow: '0 4px 8px rgba(255, 46, 99, 0.4)'
                }}>
                  {elem.offer.replace(/[()]/g, '')}
                </div>
              )}
            </div>

            {/* CONTENT BOX */}
            <div className="product-info">
              <div>
                <h4 className="product-brand">{elem.brand}</h4>
                <p className="product-desc">{elem.para}</p>
              </div>

              <div>
                <div className="product-price-row">
                  <span className="price-current">{elem.price}</span>
                  {elem.strikedoffprice && (
                    <span className="price-striked">{elem.strikedoffprice}</span>
                  )}
                </div>

                <button 
                  className="add-to-bag-btn"
                  onClick={(e) => addToBag(elem, e)}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
