'use client';

import React from 'react';
import PremiumHeader from '../components/PremiumHeader';
import PremiumFooter from '../components/PremiumFooter';

export default function StoreLayout({ children }) {
  return (
    <>
      <PremiumHeader />
      <main style={{ minHeight: "100vh", paddingTop: "72px" }}>
        {children}
      </main>
      <PremiumFooter />
    </>
  );
}
