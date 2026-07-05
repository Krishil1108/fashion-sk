'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, ShoppingBag, Plus } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Style",
      handle: "@sarah.style",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    caption: "Loving this summer coordination! Perfect for the weekend brunch. 🌞✨ #SummerVibes #AuraStyle",
    likes: 1243,
    comments: 89,
    timestamp: "2 hours ago",
    products: [
      {
        id: "prod-1",
        name: "Yellow Co-ord Set",
        price: 2499,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop",
        x: 50, // Hotspot X coordinate %
        y: 60, // Hotspot Y coordinate %
      }
    ]
  },
  {
    id: 2,
    user: {
      name: "Marcus Daily",
      handle: "@marcus.fits",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
    caption: "Denim on denim is back and better than ever. Layering is key for this transitional weather. 🧥🔥",
    likes: 892,
    comments: 45,
    timestamp: "5 hours ago",
    products: [
      {
        id: "prod-2",
        name: "Oversized Denim Jacket",
        price: 2899,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=150&auto=format&fit=crop",
        x: 45,
        y: 40,
      },
      {
        id: "prod-3",
        name: "Classic White Tee",
        price: 899,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=150&auto=format&fit=crop",
        x: 55,
        y: 50,
      }
    ]
  },
  {
    id: 3,
    user: {
      name: "Elena Chic",
      handle: "@elena.vogue",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
    caption: "Elegance is an attitude. Stepping out in this gorgeous white dress tonight. 🤍🍸",
    likes: 2156,
    comments: 134,
    timestamp: "8 hours ago",
    products: [
      {
        id: "prod-4",
        name: "Elegant White Summer Dress",
        price: 3199,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=150&auto=format&fit=crop",
        x: 50,
        y: 55,
      }
    ]
  }
];

export default function StudioFeedPage() {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [activeHotspot, setActiveHotspot] = useState(null);
  const { addToCart } = useCartStore();

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(
      {
        id: product.id,
        brand: "Aura Studio",
        para: product.name,
        price: product.price,
        image_url: product.image,
      },
      "M", // default size
      1
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0b0c10] min-h-screen py-12">
      <div className="max-w-[600px] mx-auto px-4 sm:px-0">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Aura Studio</h1>
          <p className="text-gray-500">Discover and shop the latest trends from our community.</p>
        </div>

        {/* Stories/Categories (Mock) */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-6 scrollbar-hide">
          {["All", "Streetwear", "Party", "Casual", "Formal", "Vacation", "Winter"].map((tag, i) => (
            <button key={tag} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white'}`}>
              {tag}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-10">
          {feedPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
              
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 border-2 border-[#ff3f6c]">
                    <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">{post.user.name}</h3>
                    <p className="text-xs text-gray-500">{post.user.handle}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-black dark:hover:text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Image with Hotspots */}
              <div 
                className="relative aspect-[4/5] bg-gray-100 dark:bg-white/5 overflow-hidden group cursor-pointer"
                onClick={() => setActiveHotspot(null)}
              >
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Shoppable Hotspots */}
                {post.products.map(product => (
                  <div 
                    key={product.id}
                    className="absolute z-10"
                    style={{ left: `${product.x}%`, top: `${product.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(activeHotspot === product.id ? null : product.id);
                      }}
                      className="w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/50 hover:scale-110 hover:border-white transition-all shadow-lg relative"
                    >
                      <Plus className="w-4 h-4" />
                      
                      {/* Ripple effect */}
                      <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" />
                    </button>

                    {/* Popover Card */}
                    <AnimatePresence>
                      {activeHotspot === product.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-white dark:bg-[#0b0c10] rounded-xl p-3 shadow-2xl border border-gray-100 dark:border-white/10"
                        >
                          <div className="flex gap-3 items-center">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold truncate text-gray-900 dark:text-white">{product.name}</h4>
                              <p className="text-[10px] font-bold text-[#ff3f6c] mt-0.5">Rs. {product.price}</p>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => handleQuickAdd(e, product)}
                            className="w-full mt-3 bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" /> Quick Add
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-7 h-7 ${likedPosts.has(post.id) ? 'fill-[#ff3f6c] text-[#ff3f6c]' : 'text-gray-900 dark:text-white'}`} />
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <MessageCircle className="w-7 h-7 text-gray-900 dark:text-white" />
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <Share2 className="w-6 h-6 text-gray-900 dark:text-white" />
                  </button>
                </div>
                <button className="hover:scale-110 transition-transform">
                  <Bookmark className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>
              </div>

              {/* Likes & Captions */}
              <div className="px-4 pb-4">
                <p className="font-bold text-sm mb-1">{likedPosts.has(post.id) ? post.likes + 1 : post.likes} likes</p>
                <p className="text-sm">
                  <span className="font-bold mr-2">{post.user.handle}</span>
                  {post.caption}
                </p>
                <button className="text-gray-500 text-sm mt-1">View all {post.comments} comments</button>
                <p className="text-[10px] text-gray-400 uppercase mt-2">{post.timestamp}</p>
              </div>

              {/* Featured Shop Strip */}
              <div className="bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10 p-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Shop the Look</h4>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {post.products.map(product => (
                    <div key={product.id} className="flex-shrink-0 w-20 flex flex-col gap-2 group cursor-pointer">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
