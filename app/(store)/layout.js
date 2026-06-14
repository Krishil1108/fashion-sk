'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/navigation';
import '../styles/style.css';
import '../styles/navbar.css';

export default function StoreLayout({ children }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load wishlist and cart counts
  useEffect(() => {
    const updateCounts = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishListObj')) || [];
      const cart = JSON.parse(localStorage.getItem('BagListObj')) || [];
      setWishlistCount(wishlist.length);
      setCartCount(cart.length);
    };

    updateCounts();
    // Set up a listener for storage changes or custom events
    window.addEventListener('storage', updateCounts);
    window.addEventListener('cart-updated', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cart-updated', updateCounts);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* HEADER MENU SECTION */}
      <header>
        <div id="logo" onClick={() => router.push('/Landingpage')}>
          <img src="/Common Files/image/myntra-removebg-preview.png" alt="brandLogo" />
        </div>
        <ul id="nav_bar">
          <li id="megamenu_container">
            <Link href="/menspage">men</Link>
          </li>
          <li>
            <Link href="/womenspage">women</Link>
          </li>
          <li>
            <Link href="/kidspage">kids</Link>
          </li>
          <li>
            <Link href="/homeLiving">home & living</Link>
          </li>
          <li>
            <Link href="/beautypage">beauty</Link>
          </li>
          <li id="studio">
            <Link href="/studiopage">studio<span style={{color: 'var(--accentColor)', fontSize: '10px', fontWeight: '800', marginLeft: '4px', textTransform: 'uppercase'}}>new</span></Link>
          </li>
        </ul>
        <SearchBar />
        <div id="right_icon">
          <div id="reggDropdown">
            <div id="drop">
              <Link href="/Profile/profile" className="dropList">login</Link>
              <Link href="/Profile/signup" className="dropList">sign up</Link>
            </div>
            <i className="fa-regular fa-user"></i>
            <span>profile</span>
          </div>
          <div>
            <i className="fa-regular fa-heart"></i>
            <Link href="/wishlist">
              wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-bag-shopping"></i>
            <Link href="/bag">
              bag {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>

        {/* TOGGLE MENU (Mobile) */}
        <div id="toggle">
          <i className="bx bx-menu dropbtn" onClick={toggleDropdown}></i>
          <div id="myDropdown" className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
            <div className="top">
              <Link href="/menspage" onClick={() => setShowDropdown(false)}>men</Link>
              <Link href="/womenspage" onClick={() => setShowDropdown(false)}>women</Link>
              <Link href="/kidspage" onClick={() => setShowDropdown(false)}>kids</Link>
              <Link href="/homeLiving" onClick={() => setShowDropdown(false)}>home & living</Link>
              <Link href="/beautypage" onClick={() => setShowDropdown(false)}>beauty</Link>
              <Link href="/studiopage" onClick={() => setShowDropdown(false)}>studio</Link>
            </div>
            <div className="bottom">
              <i className="fa-regular fa-user fa_user" onClick={() => { router.push('/Profile/signup'); setShowDropdown(false); }}></i>
              <i className="fa-regular fa-heart fa_wishlist" onClick={() => { router.push('/wishlist'); setShowDropdown(false); }}></i>
              <i className="fa-solid fa-bag-shopping fa_cart" onClick={() => { router.push('/bag'); setShowDropdown(false); }}></i>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px', padding: '20px 40px', backgroundColor: 'var(--bgColor)' }}>
        {children}
      </main>

      {/* FOOTER SECTION */}
      <footer className="modern-footer">
        {/* Wave Divider */}
        <div className="footer-wave-wrapper">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#111217"></path>
          </svg>
        </div>

        <div className="footer-inner-container">
          {/* Footer Top Brand Header Area */}
          <div className="footer-top-row">
            <div className="footer-logo-wrapper">
              <img src="/Common Files/image/myntra-removebg-preview.png" alt="brandLogo" className="footer-brand-logo" />
            </div>
            <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
              <span>Back to Top</span>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>

          <div className="footer-grid-layout">
            {/* Column 1: Guarantee & Brand Info */}
            <div className="footer-grid-col brand-col">
              <p className="brand-pitch">
                Experience premium fashion and curated lifestyle shopping online. Discover new trends, top styles, and enjoy seamless, reliable delivery.
              </p>
              <div className="modern-guarantees">
                <div className="guarantee-pill">
                  <div className="guarantee-icon">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div className="guarantee-info">
                    <span className="g-title">100% Original</span>
                    <span className="g-subtitle">Verified products</span>
                  </div>
                </div>
                <div className="guarantee-pill">
                  <div className="guarantee-icon">
                    <i className="fa-solid fa-rotate-left"></i>
                  </div>
                  <div className="guarantee-info">
                    <span className="g-title">Easy Return</span>
                    <span className="g-subtitle">30-day window</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Online Shopping */}
            <div className="footer-grid-col links-col">
              <h3>Shop Categories</h3>
              <ul>
                <li><Link href="/menspage">Men's Collection</Link></li>
                <li><Link href="/womenspage">Women's Fashion</Link></li>
                <li><Link href="/homeLiving">Home & Living</Link></li>
                <li><a href="#">Kids Selection</a></li>
                <li><a href="#">Beauty Hub</a></li>
              </ul>
            </div>

            {/* Column 3: Help & Policies */}
            <div className="footer-grid-col links-col">
              <h3>Support & FAQ</h3>
              <ul>
                <li><a href="#">Track Orders</a></li>
                <li><a href="#">FAQs Hub</a></li>
                <li><a href="#">Cancellations</a></li>
                <li><a href="#">Shipping Rates</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="footer-grid-col newsletter-box-col">
              <div className="newsletter-card">
                <h3>Newsletter</h3>
                <p>Subscribe to unlock exclusive deals, new season drops, and styling tips.</p>
                <div className="newsletter-input-container">
                  <input type="email" placeholder="Your email address" aria-label="Email Address" />
                  <button className="newsletter-submit-btn" aria-label="Subscribe">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Column 5: Social Community */}
            <div className="footer-grid-col community-col">
              <h3>Join Our Community</h3>
              <p>Follow us on our social platforms for daily style inspiration.</p>
              <div className="social-pill-group">
                <a href="#" className="social-pill facebook" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="social-pill twitter" aria-label="Twitter">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="social-pill youtube" aria-label="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="#" className="social-pill instagram" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-divider"></div>

          <div className="footer-bottom-row">
            <p className="copyright-text">
              © 2026 Myntra Store. All rights reserved. Crafted with Next.js, Sanity CMS & Love.
            </p>
            <div className="bottom-policy-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Sitemap</a>
              <a href="#">Security Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
