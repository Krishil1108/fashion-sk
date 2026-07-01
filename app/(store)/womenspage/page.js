'use client';

import React from 'react';
import ProductListPage from '../../components/ProductListPage';
const fallbackWomensProducts = [
  {
    image_url: "https://bit.ly/3uHGEnN",
    brand: "Anouk",
    para: "Women Pink Self Design Kurta with Trousers & Dupatta",
    price: "Rs. 791",
    rs: 791,
    strikedoffprice: "Rs. 3298",
    offer: "(76% OFF)",
    category: "women"
  },
  {
    image_url: "https://bit.ly/3uLGTyi",
    brand: "Anouk",
    para: "Women yellow Self Design Kurta with Trousers & Dupatta",
    price: "Rs. 758",
    rs: 758,
    strikedoffprice: "Rs. 3299",
    offer: "(65% OFF)",
    category: "women"
  },
  {
    image_url: "https://bit.ly/3Dldqit",
    brand: "Anouk",
    para: "Green Ethnic Motifs Pure Cotton Printed Fit and Flare Dress",
    price: "Rs. 749",
    rs: 749,
    strikedoffprice: "Rs. 1299",
    offer: "(65% OFF)",
    category: "women"
  },
  {
    image_url: "https://bit.ly/3iNMWwx",
    brand: "Chevron",
    para: "Black & Grey Chevron Geometric Printed Wrap Dress",
    price: "Rs. 1199",
    rs: 1199,
    strikedoffprice: "Rs. 2599",
    offer: "(65% OFF)",
    category: "women"
  },
  {
    image_url: "https://bit.ly/3IQuE8v",
    brand: "Anouk",
    para: "Women Olive Green Ethnic Motifs Yoke Design Kurta with Palazzos & With Dupatta",
    price: "Rs. 879",
    rs: 879,
    strikedoffprice: "Rs. 2499",
    offer: "(65% OFF)",
    category: "women"
  },
  {
    image_url: "https://bit.ly/3IRLbJa",
    brand: "MFB",
    para: "Women Maroon Analogue Watch MFB-PN-SNT-C30-1",
    price: "Rs. 674",
    rs: 674,
    strikedoffprice: "Rs. 1499",
    offer: "(65% OFF)",
    category: "women"
  }
];

export default function WomensPage() {
  return (
    <ProductListPage 
      category="women" 
      title="Women Clothing & Accessories" 
      fallbackProducts={fallbackWomensProducts} 
    />
  );
}
