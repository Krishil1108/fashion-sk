'use client';

import React, { useState, useEffect } from 'react';
import '../../styles/wishlist.css';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('wishListObj')) || [];
    setWishlist(list);
  }, []);

  const removeFromWishlist = (idx, e) => {
    e.stopPropagation();
    const updated = [...wishlist];
    updated.splice(idx, 1);
    setWishlist(updated);
    localStorage.setItem('wishListObj', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated')); // Update header count
  };

  const moveToBag = (elem, idx, e) => {
    e.stopPropagation();
    // Add to bag
    const bag = JSON.parse(localStorage.getItem('BagListObj')) || [];
    bag.push(elem);
    localStorage.setItem('BagListObj', JSON.stringify(bag));

    // Remove from wishlist
    const updatedWishlist = [...wishlist];
    updatedWishlist.splice(idx, 1);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishListObj', JSON.stringify(updatedWishlist));

    window.dispatchEvent(new Event('cart-updated')); // Update header counts
  };

  return (
    <div style={{ marginTop: '0', padding: '0' }}>
      <h1 style={{ 
        margin: '0 0 25px 0', 
        textTransform: 'uppercase', 
        letterSpacing: '1px', 
        fontSize: '22px',
        fontWeight: '800',
        color: 'var(--primaryColor)',
        fontFamily: 'var(--secondaryFont)',
        textAlign: 'center'
      }}>
        My Wishlist <span style={{ fontSize: '14px', color: 'var(--textMuted)', fontWeight: '500', textTransform: 'lowercase' }}>({wishlist.length} items)</span>
      </h1>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '80px', fontSize: '16px', color: 'var(--textMuted)' }}>
          <p style={{ marginBottom: '15px' }}>Your wishlist is empty!</p>
          <a href="/Landingpage" style={{ 
            color: 'var(--accentColor)', 
            textDecoration: 'none', 
            fontWeight: '700',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>Continue Shopping</a>
        </div>
      ) : (
        <div id="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
          {wishlist.map((elem, idx) => (
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
              <div style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                <img 
                  src={elem.image_url} 
                  alt={elem.para} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                
                {/* REMOVE FROM WISHLIST ICON OVERLAY */}
                <div 
                  onClick={(e) => removeFromWishlist(idx, e)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    zIndex: 5,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#7e818c',
                    transition: 'color 0.2s, transform 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accentColor)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#7e818c';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ✕
                </div>
              </div>

              {/* CONTENT BOX */}
              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
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
                    onClick={(e) => moveToBag(elem, idx, e)}
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
                    MOVE TO BAG
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
