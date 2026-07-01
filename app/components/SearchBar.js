'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { client, urlFor } from '../../sanity/client';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 1) {
        setIsLoading(true);
        try {
          const fetched = await client.fetch(
            `*[_type == "product" && (title match $searchTerm || brand match $searchTerm || category match $searchTerm)][0...5]`,
            { searchTerm: `${query}*` }
          );
          setSuggestions(fetched || []);
        } catch (error) {
          console.error("Search fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setIsFocused(false);
    // Navigate to search page with the specific item's exact title or brand
    router.push(`/search?q=${encodeURIComponent(suggestion.brand)}`);
  };

  return (
    <div 
      id="search" 
      ref={dropdownRef}
    >
      <input 
        type="text" 
        id="search_bar" 
        placeholder="Search for products, brands and more" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <i 
        className="fa-solid fa-magnifying-glass" 
        id="search_icon"
      ></i>

      {/* DROPDOWN SUGGESTIONS */}
      {isFocused && query.length > 1 && (
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '0',
          width: '100%',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid var(--border-color)'
        }}>
          {isLoading ? (
            <div style={{ padding: '15px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Searching...
            </div>
          ) : suggestions.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {suggestions.map((item) => (
                <li 
                  key={item._id}
                  onClick={() => handleSuggestionClick(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 15px',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'background-color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
                >
                  {item.image && (
                    <img 
                      src={urlFor(item.image).width(40).url()} 
                      alt={item.title} 
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
                    />
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2px' }}>{item.brand}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</span>
                  </div>
                </li>
              ))}
              {/* Show all results link */}
              <li 
                onClick={() => handleKeyDown({ key: 'Enter' })}
                style={{
                  padding: '12px 15px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--accent-color)',
                  cursor: 'pointer',
                  backgroundColor: 'var(--accent-light)'
                }}
              >
                See all results for "{query}"
              </li>
            </ul>
          ) : (
            <div style={{ padding: '15px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No products found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
