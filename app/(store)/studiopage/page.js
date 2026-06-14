'use client';

import React from 'react';
import ProductListPage from '../../components/ProductListPage';

const fallbackStudioProducts = [
  {
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    brand: "Studio Exclusive",
    para: "Trendy Yellow Co-ord Set",
    price: "Rs. 2499",
    rs: 2499,
    strikedoffprice: "Rs. 3999",
    offer: "(35% OFF)",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600",
    brand: "Influencer Pick",
    para: "Urban Chic Leather Jacket",
    price: "Rs. 4599",
    rs: 4599,
    strikedoffprice: "Rs. 6999",
    offer: "(30% OFF)",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600",
    brand: "Fashion Week",
    para: "Elegant White Summer Dress",
    price: "Rs. 3199",
    rs: 3199,
    strikedoffprice: "Rs. 4999",
    offer: "(35% OFF)",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600",
    brand: "Streetwear",
    para: "Oversized Denim Jacket",
    price: "Rs. 2899",
    rs: 2899,
    strikedoffprice: "Rs. 4299",
    offer: "(30% OFF)",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=600",
    brand: "Designer Label",
    para: "Abstract Print Midi Skirt",
    price: "Rs. 1999",
    rs: 1999,
    strikedoffprice: "Rs. 3499",
    offer: "(40% OFF)",
    category: "studio"
  },
  {
    image_url: "https://images.unsplash.com/photo-1509631179647-0c37cb110cf5?auto=format&fit=crop&q=80&w=600",
    brand: "Vogue Collection",
    para: "Metallic Evening Gown",
    price: "Rs. 5999",
    rs: 5999,
    strikedoffprice: "Rs. 8999",
    offer: "(30% OFF)",
    category: "studio"
  }
];

export default function StudioFashionPage() {
  return (
    <ProductListPage 
      category="studio" 
      title="Myntra Studio - Fashion Feed" 
      fallbackProducts={fallbackStudioProducts} 
    />
  );
}
