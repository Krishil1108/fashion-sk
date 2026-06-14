'use client';

import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../../sanity/client';
import '../../styles/header.css';

// Fallbacks for Banners (if Sanity is empty)
const fallbackBanners = [
  { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/28/4ac3be4b-f02c-4106-8dc9-be1898a81def1648463267842-Desktop-Banner-----1920x504.jpg" },
  { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/8f1a79c7-3f11-4608-9f31-30a03a606cb41647537798522-SS22-DesktopBanners-Unisex.jpg" },
  { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/1439d458-3f9b-4a49-830c-a47a126bb9311647456798699-Roadster_Desk_Banner.jpg" },
  { img: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/52df3f93-8d0f-412d-b416-fc665706199d1647456798690-Casual-Shoes_Dk.jpg" }
];

// Fallbacks for Grid Items
const fallbackGrids = {
  deals: [
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/29/2eaab0d6-e843-4ad2-b1da-2159d1d30e9e1648537708005-WONDERFUL-DEALS-AHEAD-.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/19/aa52212a-f867-4315-9b8b-355261ba0e651647679856552-Shirts---Trousers.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/19/d506dd29-7339-48c5-8a22-a5fbfdfe16951647679856512-Top-Selling-Kurtas-----1.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/19/126557af-2621-4b2d-82e6-692d643798301647679856536-Casual-Tees.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/19/8492fba6-0552-4dfa-923d-e7e667fb92ee1647679856527-Heels.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/19/a183b4a3-5f4c-46c0-98e4-6711f6495af51647679856543-Bath-Essentials.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/19/f391abc2-aae9-4d9b-bc67-caef1676b3611647679856520-Premium-Timepieces.jpg" }
  ],
  best: [
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2022/3/10/b25f89eb-fbeb-4013-829e-32ee5b5daaa01646895183668-Roadster-HRX_Unisex.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/bfa5c871-a5a5-4d81-b46e-18aedccfdc9b1644407437913-Kurta_sets-_Anouk-_AAY_-_more.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/046147d1-1874-4c10-adb9-6dbd88b606e71644407437923-Kurtas-_Anouk-_Sangria_-_more.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/76acf345-fc62-4b49-8b2c-9c0fc9c925311644407437977-Tops_-_Dressberry-_AAY_-_more.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/3923c0c1-2260-4f0e-9598-15b6f9d7731c1644407437960-Roadster_and_H-N_Shirts.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/eb70855e-98c4-412d-bf20-50804546d57e1644407437883-Dresses_-_Dressberry-_Chemistry_-_more.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/eff5a33f-ea24-4e70-84e5-ec4d25ee5c7b1644407437968-Roadster_and_KnK_Tshirts.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/9/667a71f0-c24b-4a00-a98c-cc6a54a815e91644407437985-Tshirts_-_Roadster-_KnK_-_more.jpg" }
  ],
  top: [
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/062cea23-9a6a-44b9-bdd4-87cae6a462311645602543339-Kurta-sets.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/8d65d400-decd-4f42-902c-a40350a16ed11645602543346-Kurtas.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/398ee53b-5899-4a9a-9d0b-b35d60c01cb41645602543325-Dresses.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/2f410d81-7fae-400e-9ecc-b4a8b6df72b91645602543430-Women-Jeans.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/82a9be01-3032-4725-9500-bcc94366b7931645602543399-Mens-Shirts.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/c6b09c0f-5c57-472c-a3fc-854ec506a90e1645602543387-Men-T-shirt.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/f08e2bac-9bed-4f87-b022-0dce8defeded1645602543380-Men-Trousers.jpg" }
  ],
  categories: [
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/aa4658b5-d723-4652-9ea1-00456b355c3a1645602467046-Kurta-Sets.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/aae4be67-e611-47f4-b94e-92a16a36df731645602467007-Hangbags.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/0f0be09e-4155-47bf-82e1-51044e7e7fd11645602467052-Kurtas.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/dd4414f8-4e1b-4a22-997e-8e06c0a5ff861645602467167-T-Shirts.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/f9ca5609-b634-42d4-8c08-a8eaebb818b71645602467085-Sarees.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/0b7869d4-f825-4625-b1db-58ad10a45f301645602467093-Shirts.jpg" }
  ],
  dealsTop: [
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/3/f0dc0024-a8d3-4aec-9e1b-d9b6873b52d51599144996663-Crocs.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/85d5e2e1-fa21-43b0-a352-438e15f1006e1598892141455-Nike.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/22b908fa-38aa-46a6-a3cd-a5ccd46b04ce1598892141560-Puma.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/26/adc58a2c-fa18-4b94-b2d6-4c692a44123d1601115417606-unnamed--6-.jpg" }
  ],
  unmissable: [
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/25/1ec9ffd5-335f-4ecb-a7e9-ea403da9a7df1645805770868-SS22-SeasonChecklist-PricePoints-CleanBlueDenim.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/25/a0e60587-5d1e-41f0-9d5f-f42a925a55921645793729467-SS22-SeasonChecklist-Trending-BlockHeels.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/25/99a29231-2050-4fde-ad40-efa35de66e5b1645805770994-SS22-SeasonChecklist-PricePoints-TrendySneakers.jpg" }
  ],
  colours: [
    { img: "https://assets.myntassets.com/f_webp,w_245,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/53a0e7bc-64e7-4fb3-94fd-a1ada51fbefa1647516450800-SS22-Colours-Metallic-Hues.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_245,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/a6ef0785-eb3c-4726-a6ba-c09f6a44379c1647516450782-SS22-Colours-Elegant-Olive.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_245,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/8/65446aed-c0e9-4bab-af02-3e96c6ad7ab51646753796263-SS22-Colours-Cobalt.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_245,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/26/3b1d43f4-46bf-4e3f-903b-ec5ca5c2bac91645860983331-SS22-Colours-Mens-BreezyWhite.jpg" }
  ],
  topInfluencers: [
    { img: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/c7fff41e-a426-4188-b319-bde1651f109e1647417948711-Studiocontent-HPBanner-Men-FestiveWearBythomson_19071gif.gif" },
    { img: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/ab0ac260-8f5d-4a64-a626-83b58129e3491647417948743-Studiocontent-HPBanner-Women-WeddingOutfitsBy-thankgod_itsfashion.gif" },
    { img: "https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/d210ddcf-73f4-4044-a75d-e8a6665fb9151647417948735-Studiocontent-HPBanner-Women-PartyLooksByiamartichauhan.gif" }
  ],
  budget: [
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/f7dd9f7e-e99d-42ee-b968-22ffa616d8681647418063204-Studiocontent-HPGrid-SummerShirts.png" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/13c90fd6-62ca-459a-86c6-ebdf19617a251647418063195-Studiocontent-HPGrid-ClassicDenim.png" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/973855e5-a1d8-4a4a-810c-60a02068b0cb1647418043970-Studiocontent-HPGrid-TrendyTops.png" }
  ],
  trending: [
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/0d7a22b9-e201-44db-ba04-6dfba8ebd5061647418012721-Studiocontent-HPCarousel-Women-WesternWear.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/d8bee915-9dbd-4cbb-9562-896dd16afdf31647418012563-Studiocontent-HPCarousel-Men-BeyondBasicsCasulaWear.jpg" },
    { img: "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/16/fa1a37d5-db35-4df5-9f3b-dfeebf9a22bd1647418012703-Studiocontent-HPCarousel-Women-IndianWearGuide.jpg" }
  ]
};

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
          setBanners(fetchedBanners.map(b => ({ img: urlFor(b.image).url() })));
        } else {
          setBanners(fallbackBanners);
        }

        // Fetch grid items
        const fetchedGrids = await client.fetch(`*[_type == "dealGrid"]`);
        if (fetchedGrids && fetchedGrids.length > 0) {
          const categorized = {};
          fetchedGrids.forEach(item => {
            const sec = item.section;
            if (!categorized[sec]) categorized[sec] = [];
            categorized[sec].push({ img: urlFor(item.image).url() });
          });
          // Merge with fallbacks if a section is missing
          const finalGrids = {};
          Object.keys(fallbackGrids).forEach(key => {
            finalGrids[key] = (categorized[key] && categorized[key].length > 0) 
              ? categorized[key] 
              : fallbackGrids[key];
          });
          setGrids(finalGrids);
        } else {
          setGrids(fallbackGrids);
        }
      } catch (err) {
        console.error("Sanity load error, using fallback data:", err);
        setBanners(fallbackBanners);
        setGrids(fallbackGrids);
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
    return items.map((el, index) => (
      <div key={index}>
        <img src={el.img} alt={`grid-${sectionKey}-${index}`} />
      </div>
    ));
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
              <img src={slide.img} alt={`Slide ${idx + 1}`} />
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
      <h1>DEALS OF THE DAY</h1>
      <div id="deals">
        {renderGrid('deals')}
      </div>

      <h1>BEST OF MYNTRA EXCLUSIVE BRANDS</h1>
      <div id="best">
        {renderGrid('best')}
      </div>

      <h1>TOP PICKS</h1>
      <div id="top">
        {renderGrid('top')}
      </div>

      <h1>CATEGORIES TO BAG</h1>
      <div id="categories">
        {renderGrid('categories')}
      </div>

      <h1>DEALS ON TOP BRANDS</h1>
      <div id="dealsTop">
        {renderGrid('dealsTop')}
      </div>

      <h1>UNMISSABLE THIS SEASON</h1>
      <div id="unmissable">
        {renderGrid('unmissable')}
      </div>

      <h1>COLOURS OF THE SEASON</h1>
      <div id="colours">
        {renderGrid('colours')}
      </div>

      <h1>TOP INFLUENCERS EXCLUSIVE STYLE</h1>
      <div id="topInfluencers">
        {renderGrid('topInfluencers')}
      </div>

      <h1>BUDGET PICKS INFLUENCERS LOVE</h1>
      <div id="budget">
        {renderGrid('budget')}
      </div>

      <h1>TRENDING OUTFIT BY INFLUENCERS</h1>
      <div id="trending">
        {renderGrid('trending')}
      </div>
    </div>
  );
}
