'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { Heart, ShoppingBag, X, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { wishlistItems, removeFromWishlist, addToCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoveToCart = (item, e) => {
    e.stopPropagation();
    // Add to cart with default size 'M'
    addToCart({
      id: item.id,
      brand: item.brand,
      para: item.para,
      price: item.price,
      image_url: item.image_url
    }, 'M', 1);
    
    // Remove from wishlist
    removeFromWishlist(item.id);
  };

  const handleRemove = (item, e) => {
    e.stopPropagation();
    removeFromWishlist(item.id);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[#ff3f6c] text-xs font-extrabold uppercase tracking-widest block mb-2">
          Your Curated List
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center justify-center gap-3">
          My Wishlist
          <span className="text-sm font-semibold bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-gray-500 dark:text-gray-400">
            {wishlistItems.length} items
          </span>
        </h1>
      </div>

      <AnimatePresence mode="popLayout">
        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Explore our collections and save your favorite items here to view them later.
            </p>
            <Link 
              href="/menspage" 
              className="inline-flex items-center gap-2 bg-[#ff3f6c] hover:bg-[#e02454] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg shadow-[#ff3f6c]/20 hover:scale-105 transition-all"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8"
          >
            {wishlistItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => router.push(`/product/${item.id}`)}
                className="bg-white dark:bg-[#0b0c10] border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Image Wrap */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-white/5 relative">
                  <img 
                    src={item.image_url} 
                    alt={item.para} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Remove Button */}
                  <button 
                    onClick={(e) => handleRemove(item, e)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm border-none shadow-md flex items-center justify-center text-gray-500 hover:text-[#ff3f6c] transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Move to Bag Quick Action */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button 
                      onClick={(e) => handleMoveToCart(item, e)}
                      className="w-full py-3 bg-[#ff3f6c] hover:bg-[#e02454] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" /> Move to Bag
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff3f6c]">
                        {item.brand}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-3">
                      {item.para}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-white/5">
                    <span className="text-base font-black text-gray-900 dark:text-white">
                      Rs. {item.price?.toLocaleString?.() ?? item.price}
                    </span>
                    <button 
                      onClick={(e) => handleMoveToCart(item, e)}
                      className="w-8 h-8 rounded-full bg-gray-50 hover:bg-[#ff3f6c]/10 text-gray-600 hover:text-[#ff3f6c] flex items-center justify-center transition-colors sm:hidden"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
