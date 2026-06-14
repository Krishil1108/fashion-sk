'use client';

import React from 'react';
import Link from 'next/link';
import '../../../styles/end.css';

export default function OrderSuccessPage() {
  return (
    <div style={{ padding: '40px 30px', textAlign: 'center', maxWidth: '500px', margin: '60px auto', borderRadius: 'var(--borderRadius)', background: 'var(--cardBg)', boxShadow: 'var(--shadowLight)' }}>
      <div style={{ fontSize: '64px', color: 'var(--successColor)', marginBottom: '15px' }}>✓</div>
      <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primaryColor)', marginBottom: '10px', fontFamily: 'var(--secondaryFont)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order Confirmed!</h1>
      <p style={{ fontSize: '14px', color: 'var(--textMuted)', marginBottom: '30px', lineHeight: '1.6' }}>
        Thank you for shopping with us! Your order has been placed successfully and will be delivered within 3-5 business days.
      </p>

      <Link 
        href="/Landingpage"
        style={{ 
          padding: '12px 25px', 
          background: 'var(--accentColor)', 
          color: '#fff', 
          borderRadius: '4px', 
          textDecoration: 'none', 
          fontWeight: '800', 
          fontSize: '13px', 
          letterSpacing: '1px', 
          display: 'inline-block',
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
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}
