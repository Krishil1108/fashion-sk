'use client';

import React from 'react';
import ProductListPage from '../../components/ProductListPage';
import '../../styles/style.css';

const fallbackHomeLivingProducts = [
  {
    image_url: "https://bit.ly/36VAF6m",
    brand: "DREAM WEAVERZ",
    para: "300 TC Cotton 1 King BedSheet",
    price: "Rs. 623",
    rs: 623,
    strikedoffprice: "Rs. 2599",
    offer: "(65% OFF)",
    category: "home_living"
  },
  {
    image_url: "https://bit.ly/3wJgLGM",
    brand: "KLOTTHE",
    para: "Purple Geometric King Bedsheet",
    price: "Rs. 758",
    rs: 758,
    strikedoffprice: "Rs. 3299",
    offer: "(65% OFF)",
    category: "home_living"
  },
  {
    image_url: "https://bit.ly/3wR8oZJ",
    brand: "SEJ By Nisha Gupta",
    para: "White & Pink King Bedsheet",
    price: "Rs. 759",
    rs: 759,
    strikedoffprice: "Rs. 1999",
    offer: "(65% OFF)",
    category: "home_living"
  },
  {
    image_url: "https://bit.ly/35khX87",
    brand: "JAIPUR FABRIC",
    para: "Pink 180TC Cotton Bedsheet",
    price: "Rs. 1199",
    rs: 1199,
    strikedoffprice: "Rs. 2599",
    offer: "(65% OFF)",
    category: "home_living"
  },
  {
    image_url: "https://bit.ly/3tOYYfr",
    brand: "DREAM WEAVERZ",
    para: "Sea Green & White Bedsheet",
    price: "Rs. 879",
    rs: 879,
    strikedoffprice: "Rs. 2499",
    offer: "(65% OFF)",
    category: "home_living"
  }
];

export default function HomeLivingPage() {
  return (
    <ProductListPage 
      category="home_living" 
      title="Home Furnishings & Living Decor" 
      fallbackProducts={fallbackHomeLivingProducts} 
    />
  );
}
