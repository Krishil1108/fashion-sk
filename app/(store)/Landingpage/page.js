'use client';

import React from 'react';
import HeroBanner from '../../components/HeroBanner';
import TrendingCollections from '../../components/TrendingCollections';
import CategoryNavigation from '../../components/CategoryNavigation';

export default function Landingpage() {
  return (
    <div style={{ width: "100%", overflow: "hidden", marginTop: "-72px" }}>
      <HeroBanner />
      <CategoryNavigation />
      <TrendingCollections />
    </div>
  );
}
