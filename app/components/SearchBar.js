'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Sparkles, X } from 'lucide-react';
import { client, urlFor } from '../../sanity/client';

const trendingSearches = [
  "Oversized Hoodies",
  "Minimalist Sneakers",
  "Linen Summer Shirts",
  "Wide-leg Trousers",
  "Gold Accessories"
];

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Keyboard shortcut to focus '/'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    }, 300);

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
    router.push(`/search?q=${encodeURIComponent(suggestion.brand)}`);
  };

  const handleTrendingClick = (term) => {
    setQuery(term);
    setIsFocused(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[300px] xl:max-w-[400px]">
      <div className="relative group flex items-center">
        <Search className={`absolute left-4 w-4 h-4 transition-colors ${isFocused ? "text-[#ff3f6c]" : "text-gray-400 group-hover:text-gray-600"}`} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="w-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-full py-2.5 pl-[48px] pr-10 text-sm border border-transparent focus:border-[#ff3f6c]/30 focus:bg-white dark:focus:bg-[#0b0c10] focus:ring-2 focus:ring-[#ff3f6c]/20 outline-none transition-all duration-300"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* DROPDOWN SUGGESTIONS & TRENDING */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full mt-3 w-full bg-white dark:bg-[#0b0c10] rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden z-50"
          >
            {/* Show trending searches when empty query */}
            {!query.trim() && (
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff3f6c]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTrendingClick(term)}
                      className="text-xs bg-gray-100 dark:bg-white/5 hover:bg-[#ff3f6c]/10 hover:text-[#ff3f6c] dark:hover:bg-[#ff3f6c]/20 text-gray-700 dark:text-gray-300 rounded-full px-3.5 py-1.5 transition-all font-medium border border-gray-200/20"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions load logic */}
            {query.trim().length > 1 && (
              <>
                {isLoading ? (
                  <div className="p-6 flex items-center justify-center gap-2.5 text-sm text-gray-500 dark:text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin text-[#ff3f6c]" />
                    Searching Aura catalog...
                  </div>
                ) : suggestions.length > 0 ? (
                  <ul className="flex flex-col">
                    {suggestions.map((item) => (
                      <li
                        key={item._id}
                        onClick={() => handleSuggestionClick(item)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border-b border-gray-100/50 dark:border-white/5 transition-colors"
                      >
                        {item.image && (
                          <img
                            src={urlFor(item.image).width(44).height(44).url()}
                            alt={item.title}
                            className="w-11 h-11 object-cover rounded-lg border border-gray-100 dark:border-white/5"
                          />
                        )}
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {item.brand}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <span className="text-sm font-black text-gray-900 dark:text-white">
                            Rs. {item.price}
                          </span>
                          {item.offer && (
                            <span className="text-[9px] font-bold text-[#ff3f6c] bg-[#ff3f6c]/10 px-1.5 py-0.5 rounded mt-0.5">
                              {item.offer}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                    <li
                      onClick={() => handleKeyDown({ key: 'Enter' })}
                      className="px-4 py-3 bg-[#ff3f6c]/5 hover:bg-[#ff3f6c]/10 text-[#ff3f6c] text-xs font-bold text-center tracking-wider uppercase cursor-pointer transition-colors"
                    >
                      See all results for "{query}"
                    </li>
                  </ul>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No results found for "<span className="font-semibold text-gray-900 dark:text-white">{query}</span>"
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

