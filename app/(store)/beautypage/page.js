'use client';

import React from 'react';
import ProductListPage from '../../components/ProductListPage';

const fallbackBeautyProducts = [
  {
    image_url: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600",
    brand: "MAC",
    para: "Matte Ruby Woo Lipstick",
    price: "Rs. 1950",
    rs: 1950,
    strikedoffprice: "Rs. 2500",
    offer: "(20% OFF)",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    brand: "L'Oreal Paris",
    para: "Hyaluronic Acid Serum",
    price: "Rs. 899",
    rs: 899,
    strikedoffprice: "Rs. 1199",
    offer: "(25% OFF)",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    brand: "Maybelline",
    para: "Fit Me Matte Foundation",
    price: "Rs. 549",
    rs: 549,
    strikedoffprice: "Rs. 699",
    offer: "(20% OFF)",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    brand: "Chanel",
    para: "Coco Mademoiselle Perfume",
    price: "Rs. 12500",
    rs: 12500,
    strikedoffprice: "",
    offer: "",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    brand: "Clinique",
    para: "Moisture Surge 100H",
    price: "Rs. 2950",
    rs: 2950,
    strikedoffprice: "Rs. 3500",
    offer: "(15% OFF)",
    category: "beauty"
  },
  {
    image_url: "https://images.unsplash.com/photo-1580870058882-628469d76378?auto=format&fit=crop&q=80&w=600",
    brand: "Nykaa Cosmetics",
    para: "Eyeshadow Palette",
    price: "Rs. 999",
    rs: 999,
    strikedoffprice: "Rs. 1499",
    offer: "(30% OFF)",
    category: "beauty"
  }
];

export default function BeautyPage() {
  return (
    <ProductListPage 
      category="beauty" 
      title="Beauty & Personal Care" 
      fallbackProducts={fallbackBeautyProducts} 
    />
  );
}
