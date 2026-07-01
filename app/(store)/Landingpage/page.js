'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client, urlFor } from '../../../sanity/client';

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
      <div key={sectionKey}>
        <h1 className="brand_heading">{getSectionTitle(sectionKey)}</h1>
        <div id={sectionKey} className="promo-grid">
          {items.map((el, index) => (
            <div key={index} className="grid-item">
              <Link href={el.link || '/search?q=fashion'}>
                <img src={el.img} alt={`grid-${sectionKey}-${index}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>
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
    <div className="landing-container">
      {/* CAROUSEL SLIDER */}
      <div className="slider">
        <div 
          id="slides" 
          className="slides" 
          style={{ 
            transform: `translateX(-${currentSlide * (100 / (banners.length || 1))}%)`,
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
                <img src={slide.img} alt={`Slide ${idx + 1}`} />
              </Link>
            </div>
          ))}
        </div>

        {/* manual navigation */}
        <div className="navigation-manual">
          {banners.map((_, idx) => (
            <div
              key={idx} 
              className={`manual-btn ${currentSlide === idx ? 'active' : ''}`} 
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* PROMO SECTIONS GRIDS */}
      <div className="promotions-container" style={{ padding: '0 2rem' }}>
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
    </div>
  );
}
