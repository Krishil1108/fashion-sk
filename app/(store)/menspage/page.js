'use client';

import React from 'react';
import ProductListPage from '../../components/ProductListPage';
import '../../styles/mens.css';

const fallbackMensProducts = [
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10331501/2020/3/18/d4d07c60-88d9-43d9-aa78-9cc7712816321584508934272-US-Polo-Assn-Men-White-Colourblocked-Sneakers-84015845089331-1.jpg",
    brand: "U.S. Polo Assn.",
    para: "Men Colourblocked Sneakers",
    price: "Rs. 1799",
    rs: 1799,
    strikedoffprice: "Rs. 2999",
    offer: "(40% OFF)",
    category: "men"
  },
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13031344/2021/2/15/edb298bb-2c55-4b17-be70-b99fa7da98af1613389238510-US-Polo-Assn-Men-Navy-Blue-Printed-Sliders-7711613389237151-1.jpg",
    brand: "U.S. Polo Assn.",
    para: "Men Printed Sliders",
    price: "Rs. 674",
    rs: 674,
    strikedoffprice: "Rs. 1499",
    offer: "(55% OFF)",
    category: "men"
  },
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13640716/2021/5/24/48e9e3bc-8fb7-4af5-97fa-46927f68fbd81621838454680JeansRoadsterMenJeansRoadsterMenTrackPantsHRXbyHrithikRoshan1.jpg",
    brand: "Roadster",
    para: "Printed Polo Collar Pure Cotton T-Shirt",
    price: "Rs. 1259",
    rs: 1259,
    strikedoffprice: "Rs. 2099",
    offer: "(40% OFF)",
    category: "men"
  },
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10339033/2019/8/6/df9a712b-a5fc-4a65-870a-0854fb50ea221565093150139-US-Polo-Assn-Men-Casual-Shoes-7391565093148433-1.jpg",
    brand: "U.S. Polo Assn.",
    para: "Men Sneakers",
    price: "Rs. 1949",
    rs: 1949,
    strikedoffprice: "Rs. 2999",
    offer: "(35% OFF)",
    category: "men"
  },
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10339001/2020/2/28/5d620291-a732-4d17-9f52-baa24bb7a81f1582871965483-US-Polo-Assn-Men-Flip-Flops-2741582871964051-1.jpg",
    brand: "U.S. Polo Assn.",
    para: "Men Printed Thong Flip-Flops",
    price: "Rs. 599",
    rs: 599,
    strikedoffprice: "Rs. 999",
    offer: "(40% OFF)",
    category: "men"
  },
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11391306/2020/2/12/10b9eea6-35be-4b7d-8c39-826d4d3500c11581485549564-US-Polo-Assn-Men-Casual-Shoes-4671581485548936-1.jpg",
    brand: "Roadster",
    para: "Men Colourblocked Sneakers",
    price: "Rs. 1649",
    rs: 1649,
    strikedoffprice: "Rs. 2999",
    offer: "(45% OFF)",
    category: "men"
  },
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14406190/2021/7/13/c8352e58-003d-464f-a6ce-0428e35870461626156229629-U-S-Polo-Assn-Men-Navy-Blue-PU-Sneakers-4661626156229266-1.jpg",
    brand: "Roadster",
    para: "Men Colourblocked Sneakers",
    price: "Rs. 1799",
    rs: 1799,
    strikedoffprice: "Rs. 2999",
    offer: "(40% OFF)",
    category: "men"
  },
  {
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14367616/2021/8/12/07269c5b-cd27-4716-9709-583e7eac513d1628768262239-US-Polo-Assn-Men-White-LEBRON-20-Walking-Shoes-3021628768261-1.jpg",
    brand: "Roadster",
    para: "Men LEBRON 2.0 Walking Shoes",
    price: "Rs. 1999",
    rs: 1999,
    strikedoffprice: "Rs. 3999",
    offer: "(50% OFF)",
    category: "men"
  }
];

export default function MensPage() {
  return (
    <ProductListPage 
      category="men" 
      title="Men Clothing & Footwear" 
      fallbackProducts={fallbackMensProducts} 
    />
  );
}
