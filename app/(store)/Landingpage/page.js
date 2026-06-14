'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client, urlFor } from '../../../sanity/client';
import '../../styles/header.css';

export default function Landingpage() {
  const [banners, setBanners] = useState([]);
  const [grids, setGrids] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch data from Sanity
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch banners
        const fetchedBanners = await client.fetch(`*[_type == "banner" && page == "landingpage"]`);
        if (fetchedBanners && fetchedBanners.length > 0) {
          setBanners(fetchedBanners.map(b => ({ img: urlFor(b.image).url(), link: b.link })));
        }

        // Fetch grid items
        const fetchedGrids = await client.fetch(`*[_type == "dealGrid"]`);
        if (fetchedGrids && fetchedGrids.length > 0) {
          const categorized = {};
          fetchedGrids.forEach(item => {
            const sec = item.section;
            if (!categorized[sec]) categorized[sec] = [];
            categorized[sec].push({ img: urlFor(item.image).url(), link: item.link });
          });
          setGrids(categorized);
        }
      } catch (err) {
        console.error("Sanity load error:", err);
      }
    }
    fetchData();
  }, []);

  // Automatic slideshow timing (3 seconds)
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners]);

  const renderGrid = (sectionKey) => {
    const items = grids[sectionKey] || [];
    if (items.length === 0) return null;
    return (
      <>
        <h1 className="brand_heading">{getSectionTitle(sectionKey)}</h1>
        <div id={sectionKey} className="promo-grid container">
          {items.map((el, index) => (
            <div key={index}>
              <Link href={el.link || '/search?q=fashion'}>
                <img src={el.img} alt={`grid-${sectionKey}-${index}`} style={{ cursor: 'pointer' }} />
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };

  const getSectionTitle = (key) => {
    const titles = {
      deals: "DEALS OF THE DAY",
      best: "BEST OF MYNTRA EXCLUSIVE BRANDS",
      top: "TOP PICKS",
      categories: "CATEGORIES TO BAG",
      dealsTop: "DEALS ON TOP BRANDS",
      unmissable: "UNMISSABLE THIS SEASON",
      colours: "COLOURS OF THE SEASON",
      topInfluencers: "TOP INFLUENCERS EXCLUSIVE STYLE",
      budget: "BUDGET PICKS INFLUENCERS LOVE",
      trending: "TRENDING OUTFIT BY INFLUENCERS"
    };
    return titles[key] || key.toUpperCase();
  };

  return (
    <div style={{ marginTop: '0' }}>
      {/* FLAT DISCOUNT FLOATING PANEL */}
      <div id="flatdiscount">
        <i id="sidePanel" className="fa-solid fa-caret-left"></i>
        <h1>FLAT ₹300 OFF</h1>
      </div>

      {/* CAROUSEL SLIDER */}
      <div className="slider" style={{ marginTop: '10px' }}>
        <div 
          id="slides" 
          className="slides" 
          style={{ 
            transform: `translateX(-${currentSlide * (100 / (banners.length || 1))}%)`,
            transition: 'transform 800ms ease-in-out',
            width: `${(banners.length || 1) * 100}%`
          }}
        >
          {banners.map((slide, idx) => (
            <div 
              className="slide" 
              key={idx} 
              style={{ width: `${100 / (banners.length || 1)}%` }}
            >
              <Link href={slide.link || '/search?q=fashion'}>
                <img src={slide.img} alt={`Slide ${idx + 1}`} style={{ cursor: 'pointer' }} />
              </Link>
            </div>
          ))}
        </div>

        {/* manual navigation */}
        <div className="navigation-manual" style={{ position: 'absolute', bottom: '15px', left: '0', right: '0', display: 'flex', justifyContent: 'center' }}>
          {banners.map((_, idx) => (
            <label 
              key={idx} 
              className="manual-btn" 
              onClick={() => setCurrentSlide(idx)}
              style={{ 
                background: currentSlide === idx ? '#505050' : '#dfe0e3',
                margin: '0 5px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                display: 'inline-block',
                cursor: 'pointer',
                border: '1px solid #aaa'
              }}
            />
          ))}
        </div>
      </div>

      {/* PROMO SECTIONS GRIDS */}
      {renderGrid('deals')}
      {renderGrid('best')}
      {renderGrid('top')}
      {renderGrid('categories')}
      {renderGrid('dealsTop')}
      {renderGrid('unmissable')}
      {renderGrid('colours')}
      {renderGrid('topInfluencers')}
      {renderGrid('budget')}
      {renderGrid('trending')}
    </div>
  );
}
