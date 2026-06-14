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
    e.target.style.backgroundColor = "var(--successColor)";
    setTimeout(() => {
      e.target.innerText = oldText;
      e.target.style.backgroundColor = "var(--accentColor)";
    }, 1500);
  };

  return (
    <div style={{ marginTop: '0', padding: '0' }}>
      {/* FILTER & SORT PANEL */}
      <div className="filter-sort-panel" style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '20px', 
        marginBottom: '30px', 
        padding: '15px 25px', 
        backgroundColor: 'var(--cardBg)',
        borderRadius: '8px',
        boxShadow: 'var(--shadowLight)',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12px', color: 'var(--textMuted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sort Name:</label>
          <select 
            id="nameSort" 
            value={nameSort} 
            onChange={(e) => { setNameSort(e.target.value); setPriceSort(''); }}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid var(--borderColor)', 
              fontSize: '13px',
              color: 'var(--textColor)',
              backgroundColor: '#ffffff',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <option value="">Default</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12px', color: 'var(--textMuted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sort Price:</label>
          <select 
            id="priceSort" 
            value={priceSort} 
            onChange={(e) => { setPriceSort(e.target.value); setNameSort(''); }}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid var(--borderColor)', 
              fontSize: '13px',
              color: 'var(--textColor)',
              backgroundColor: '#ffffff',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <option value="">Default</option>
            <option value="lth">Low to High</option>
            <option value="htl">High to Low</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12px', color: 'var(--textMuted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Brand:</label>
          <select 
            id="brandFilter" 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid var(--borderColor)', 
              fontSize: '13px',
              color: 'var(--textColor)',
              backgroundColor: '#ffffff',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <option value="all">All Brands</option>
            {brands.map((brand, idx) => (
              <option key={idx} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>

      <h1 style={{ 
        margin: '0 0 25px 0', 
        textTransform: 'uppercase', 
        letterSpacing: '1px', 
        fontSize: '22px',
        fontWeight: '800',
        color: 'var(--primaryColor)',
        fontFamily: 'var(--secondaryFont)'
      }}>
        {title} <span style={{ fontSize: '14px', color: 'var(--textMuted)', fontWeight: '500', textTransform: 'lowercase' }}>({filteredProducts.length} items found)</span>
      </h1>

      {/* PRODUCTS GRID */}
      <div id="container" className="products-grid">
        {filteredProducts.map((elem, idx) => (
          <div className="product-card" key={idx} style={{ 
            backgroundColor: 'var(--cardBg)', 
            borderRadius: 'var(--borderRadius)', 
            overflow: 'hidden', 
            cursor: 'pointer', 
            boxShadow: 'var(--shadowLight)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = 'var(--shadowHover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadowLight)';
          }}
          >
            {/* IMAGE WRAPPER */}
            <div className="product-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
              <img 
                className="product-img"
                src={elem.image_url} 
                alt={elem.para} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
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
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  zIndex: 5,
                  transition: 'background-color 0.2s, transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <i 
                  className={wishlistedMap[elem.image_url] ? "fa-solid fa-heart" : "fa-regular fa-heart"} 
                  style={{ 
                    color: wishlistedMap[elem.image_url] ? 'var(--accentColor)' : '#7e818c', 
                    fontSize: '16px' 
                  }}
                />
              </div>

              {/* DISCOUNT BADGE OVERLAY */}
              {elem.offer && (
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'var(--accentColor)',
                  color: '#ffffff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.5px',
                  zIndex: 5,
                  boxShadow: '0 2px 6px rgba(255, 63, 108, 0.3)'
                }}>
                  {elem.offer.replace(/[()]/g, '')}
                </div>
              )}
            </div>

            {/* CONTENT BOX */}
            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ 
                  fontFamily: 'var(--secondaryFont)', 
                  fontSize: '14px', 
                  fontWeight: '700', 
                  color: 'var(--primaryColor)', 
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>{elem.brand}</h4>
                
                <p style={{ 
                  fontSize: '13px', 
                  color: 'var(--textMuted)', 
                  margin: '0 0 12px 0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{elem.para}</p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', margin: '0 0 15px 0' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primaryColor)' }}>{elem.price}</span>
                  {elem.strikedoffprice && (
                    <span style={{ fontSize: '12px', color: 'var(--textMuted)', textDecoration: 'line-through' }}>{elem.strikedoffprice}</span>
                  )}
                </div>

                <button 
                  onClick={(e) => addToBag(elem, e)}
                  style={{ 
                    width: '100%',
                    padding: '10px 0', 
                    background: 'var(--accentColor)', 
                    border: 'none',
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: '#ffffff', 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s, box-shadow 0.2s',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accentHover)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 63, 108, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accentColor)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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
