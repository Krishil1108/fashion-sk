'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in login credentials');
      return;
    }
    alert('Logged in successfully!');
    router.push('/Landingpage');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: '60px auto', borderRadius: 'var(--borderRadius)', background: 'var(--cardBg)', boxShadow: 'var(--shadowLight)' }}>
      <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '16px', borderBottom: '1px solid var(--borderColor)', paddingBottom: '15px', color: 'var(--primaryColor)', fontWeight: '800', fontFamily: 'var(--secondaryFont)', marginBottom: '20px' }}>
        Log In
      </h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--textMuted)', marginBottom: '6px', textTransform: 'uppercase' }}>Email</label>
          <input 
            type="email" 
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--textMuted)', marginBottom: '6px', textTransform: 'uppercase' }}>Password</label>
          <input 
            type="password" 
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          LOG IN
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--textMuted)' }}>
        Don't have an account? <a href="/Profile/signup" style={{ color: 'var(--accentColor)', textDecoration: 'none', fontWeight: '700' }}>Sign Up</a>
      </p>
    </div>
  );
}
