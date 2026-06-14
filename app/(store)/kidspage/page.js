'use client';

import React from 'react';
import ProductListPage from '../../components/ProductListPage';

const fallbackKidsProducts = [
  {
    image_url: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=600",
    brand: "H&M Kids",
    para: "Boys Blue Printed T-Shirt",
    price: "Rs. 499",
    rs: 499,
    strikedoffprice: "Rs. 799",
    offer: "(30% OFF)",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600",
    brand: "Mothercare",
    para: "Girls Pink Ruffled Dress",
    price: "Rs. 1299",
    rs: 1299,
    strikedoffprice: "Rs. 2499",
    offer: "(45% OFF)",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600",
    brand: "Max",
    para: "Boys Yellow Cotton Shirt",
    price: "Rs. 699",
    rs: 699,
    strikedoffprice: "Rs. 999",
    offer: "(30% OFF)",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600",
    brand: "GAP Kids",
    para: "Girls Denim Overalls",
    price: "Rs. 1899",
    rs: 1899,
    strikedoffprice: "Rs. 2999",
    offer: "(35% OFF)",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=600",
    brand: "Puma",
    para: "Kids Running Shoes",
    price: "Rs. 2199",
    rs: 2199,
    strikedoffprice: "Rs. 3599",
    offer: "(40% OFF)",
    category: "kids"
  },
  {
    image_url: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?auto=format&fit=crop&q=80&w=600",
    brand: "Allen Solly Junior",
    para: "Boys Navy Blue Trousers",
    price: "Rs. 1099",
    rs: 1099,
    strikedoffprice: "Rs. 1599",
    offer: "(30% OFF)",
    category: "kids"
  }
];

export default function KidsPage() {
  return (
    <ProductListPage 
      category="kids" 
      title="Kids Clothing & Footwear" 
      fallbackProducts={fallbackKidsProducts} 
    />
  );
}
