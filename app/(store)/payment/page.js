'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function PaymentPage() {
  const router = useRouter();
  const [payableAmount, setPayableAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const amt = localStorage.getItem('payable_amount') || '0';
    setPayableAmount(parseInt(amt, 10));
  }, []);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      if (!cardNumber || !cvv) {
        alert('Please fill card details!');
        return;
      }
    }
    // Success - clear cart
    localStorage.removeItem('BagListObj');
    window.dispatchEvent(new Event('cart-updated')); // Update layout header count
    router.push('/payment/end');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: '45px auto', borderRadius: 'var(--borderRadius)', background: 'var(--cardBg)', boxShadow: 'var(--shadowLight)' }}>
      <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '16px', borderBottom: '1px solid var(--borderColor)', paddingBottom: '15px', color: 'var(--primaryColor)', fontWeight: '800', fontFamily: 'var(--secondaryFont)' }}>
        Checkout & Payment
      </h2>

      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '15px' }}>
        <span>Amount Payable:</span>
        <span style={{ color: 'var(--accentColor)' }}>Rs. {payableAmount}</span>
      </div>

      <form onSubmit={handlePaymentSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', fontSize: '12px', color: 'var(--textMuted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Choose Payment Method:</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
              <input 
                type="radio" 
                name="method" 
                value="card" 
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                style={{ marginRight: '8px', accentColor: 'var(--accentColor)' }}
              />
              Credit/Debit Card
            </label>
            <label style={{ fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
              <input 
                type="radio" 
                name="method" 
                value="cod" 
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                style={{ marginRight: '8px', accentColor: 'var(--accentColor)' }}
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div style={{ border: '1px solid var(--borderColor)', padding: '20px', borderRadius: '6px', marginBottom: '25px', background: '#fafafa' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--textMuted)', marginBottom: '6px', textTransform: 'uppercase' }}>Card Number</label>
              <input 
                type="text" 
                placeholder="16-Digit Card Number"
                maxLength="16"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  border: '1px solid var(--borderColor)', 
                  borderRadius: '4px', 
                  fontSize: '13px',
                  outline: 'none',
                  fontWeight: '500'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: '1.2' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--textMuted)', marginBottom: '6px', textTransform: 'uppercase' }}>Expiry (MM/YY)</label>
                <input 
                  type="text" 
                  placeholder="MM/YY"
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '1px solid var(--borderColor)', 
                    borderRadius: '4px', 
                    fontSize: '13px',
                    outline: 'none',
                    fontWeight: '500'
                  }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--textMuted)', marginBottom: '6px', textTransform: 'uppercase' }}>CVV</label>
                <input 
                  type="password" 
                  maxLength="3"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '1px solid var(--borderColor)', 
                    borderRadius: '4px', 
                    fontSize: '13px',
                    outline: 'none',
                    fontWeight: '500'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <p style={{ fontSize: '13px', color: 'var(--textMuted)', marginBottom: '25px', padding: '12px 15px', border: '1px solid var(--borderColor)', borderRadius: '4px', background: '#fafafa', lineHeight: '1.5' }}>
            Please keep exact cash ready upon delivery. Extra charges do not apply.
          </p>
        )}

        <button 
          type="submit"
          style={{ 
            width: '100%', 
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
          CONFIRM ORDER
        </button>
      </form>
    </div>
  );
}
