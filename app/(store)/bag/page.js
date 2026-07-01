'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('BagListObj')) || [];
    setCartItems(items);
  }, []);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const num = priceStr.toString().replace(/[^0-9]/g, '');
    return parseInt(num, 10) || 0;
  };

  const calculateTotalMRP = () => {
    return cartItems.reduce((sum, item) => {
      const priceVal = parsePrice(item.strikedoffprice || item.price);
      return sum + priceVal;
    }, 0);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((sum, item) => {
      return sum + parsePrice(item.price);
    }, 0);
  };

  const totalMRP = calculateTotalMRP();
  const totalAmount = calculateTotalAmount();
  const standardDiscount = totalMRP - totalAmount;
  const finalPayable = Math.max(0, totalAmount - promoDiscount);

  const removeItem = (idx) => {
    const updated = [...cartItems];
    updated.splice(idx, 1);
    setCartItems(updated);
    localStorage.setItem('BagListObj', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated')); // Update layout header
  };

  const handleApplyPromo = () => {
    if (promoApplied) return;
    if (promoCode.trim().toUpperCase() === 'MYNTRA300') {
      if (totalAmount > 300) {
        setPromoDiscount(300);
        setPromoApplied(true);
      } else {
        alert('Promo code MYNTRA300 is only valid for orders above Rs. 300');
      }
    } else {
      alert('Invalid Promo Code! Try MYNTRA300');
    }
  };

  const handlePlaceOrder = () => {
    localStorage.setItem('payable_amount', finalPayable);
    router.push('/payment');
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
        Shopping Bag <span style={{ fontSize: '14px', color: 'var(--textMuted)', fontWeight: '500', textTransform: 'lowercase' }}>({cartItems.length} items)</span>
      </h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '80px', fontSize: '16px', color: 'var(--textMuted)' }}>
          <p style={{ marginBottom: '15px' }}>Your shopping bag is empty!</p>
          <a href="/Landingpage" style={{ 
            color: 'var(--accentColor)', 
            textDecoration: 'none', 
            fontWeight: '700',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>Shop Now</a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', maxWidth: '1000px', margin: 'auto' }}>
          {/* Cart Items List */}
          <div className="cart-items-list" style={{ flex: '1.6', minWidth: '320px' }}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                gap: '20px', 
                padding: '20px', 
                backgroundColor: 'var(--cardBg)',
                borderRadius: 'var(--borderRadius)',
                boxShadow: 'var(--shadowLight)',
                marginBottom: '20px', 
                position: 'relative'
              }}>
                <div style={{ width: '90px', height: '110px', overflow: 'hidden', borderRadius: '6px' }}>
                  <img src={item.image_url} alt={item.para} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 4px 0', color: 'var(--primaryColor)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.brand}</p>
                    <p style={{ fontSize: '13px', color: 'var(--textMuted)', margin: '0 0 10px 0' }}>{item.para}</p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primaryColor)' }}>{item.price}</span>
                    {item.strikedoffprice && (
                      <span style={{ fontSize: '12px', color: 'var(--textMuted)', textDecoration: 'line-through' }}>{item.strikedoffprice}</span>
                    )}
                    {item.offer && (
                      <span style={{ fontSize: '11px', color: 'var(--accentColor)', fontWeight: '800' }}>{item.offer.replace(/[()]/g, '')}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <button 
                    onClick={() => removeItem(idx)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--textMuted)', 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accentColor)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--textMuted)'}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Details Panel */}
          <div style={{ 
            flex: '1', 
            minWidth: '300px', 
            padding: '25px', 
            backgroundColor: 'var(--cardBg)',
            borderRadius: 'var(--borderRadius)',
            boxShadow: 'var(--shadowLight)',
            height: 'fit-content',
            border: 'none'
          }}>
            <h4 style={{ 
              borderBottom: '1px solid var(--borderColor)', 
              paddingBottom: '12px', 
              fontSize: '12px', 
              fontWeight: '700', 
              color: 'var(--textMuted)', 
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0 0 20px 0'
            }}>
              Price Details ({cartItems.length} Items)
            </h4>
            
            <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--primaryColor)', fontWeight: '500' }}>
              <span>Total MRP</span>
              <span>Rs. {totalMRP}</span>
            </div>

            <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--primaryColor)', fontWeight: '500' }}>
              <span>Discount on MRP</span>
              <span style={{ color: 'var(--successColor)' }}>- Rs. {standardDiscount}</span>
            </div>

            {promoApplied && (
              <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--successColor)', fontWeight: '700' }}>
                <span>Coupon Discount</span>
                <span>- Rs. {promoDiscount}</span>
              </div>
            )}

            <hr style={{ border: 'none', borderTop: '1px solid var(--borderColor)', margin: '20px 0' }} />

            <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: 'var(--primaryColor)' }}>
              <span>Total Amount</span>
              <span>Rs. {finalPayable}</span>
            </div>

            {/* Promo Code Coupon Area */}
            <div style={{ 
              marginTop: '25px', 
              padding: '15px', 
              border: '1px dashed var(--accentColor)', 
              borderRadius: '6px', 
              background: '#fff6f8' 
            }}>
              <p style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accentColor)', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>Apply Coupon (Try: MYNTRA300)</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  style={{ 
                    flex: '1', 
                    padding: '8px 12px', 
                    border: '1px solid var(--borderColor)', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    outline: 'none',
                    fontWeight: '600'
                  }}
                />
                <button 
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  style={{ 
                    padding: '8px 15px', 
                    background: promoApplied ? '#ccc' : 'var(--accentColor)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: '800', 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => { if(!promoApplied) e.target.style.backgroundColor = 'var(--accentHover)'; }}
                  onMouseLeave={(e) => { if(!promoApplied) e.target.style.backgroundColor = 'var(--accentColor)'; }}
                >
                  {promoApplied ? 'APPLIED' : 'APPLY'}
                </button>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              style={{ 
                width: '100%', 
                marginTop: '25px', 
                padding: '12px 0', 
                background: 'var(--accentColor)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                fontSize: '13px', 
                fontWeight: '800', 
                cursor: 'pointer', 
                letterSpacing: '1px',
                transition: 'background-color 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accentHover)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 63, 108, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--accentColor)';
                e.target.style.boxShadow = 'none';
              }}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
