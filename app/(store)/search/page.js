'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductListPage from '../../components/ProductListPage';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <ProductListPage 
      title={query ? `Search Results for "${query}"` : "All Products"} 
      searchQuery={query}
      fallbackProducts={[]} // Fallback to empty array if no search matches
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontSize: '18px', color: '#696e79' }}>Loading Search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
