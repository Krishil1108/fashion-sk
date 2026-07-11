"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, RefreshCw, Truck, Heart, ShoppingBag, Ruler, Check, ChevronRight, MessageSquare, Flame, X } from "lucide-react";
import { client, urlFor } from "../../../../sanity/client";
import { useCartStore } from "../../../store/useCartStore";

// Complete the look mock items
const mockLookItems = [
  { id: "look-1", name: "Premium Leather Watch", price: 2499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop" },
  { id: "look-2", name: "Minimalist Retro Sneakers", price: 3499, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop" },
  { id: "look-3", name: "Classic Metal Sunglasses", price: 1299, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=200&auto=format&fit=crop" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("specs");

  const { addToCart, wishlistItems, toggleWishlist } = useCartStore();
  const isWishlisted = product ? wishlistItems.some(item => item.id === product.id) : false;

  // Zoomable Gallery State
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center', transform: 'scale(1)' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.7)'
    });
  };

  const handleMouseLeaveImage = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  // Fit Predictor States
  const [showFitPredictor, setShowFitPredictor] = useState(false);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [fitResult, setFitResult] = useState("");

  // Bundle Addons
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // Try fetching product by ID from Sanity
        const query = `*[_type == "product" && _id == $id][0]`;
        const fetched = await client.fetch(query, { id });

        if (fetched) {
          const formatted = {
            id: fetched._id,
            brand: fetched.brand,
            title: fetched.title,
            price: fetched.price,
            strikedPrice: fetched.strikedPrice,
            offer: fetched.offer,
            images: [
              urlFor(fetched.image).url(),
              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=600&auto=format&fit=crop",
            ],
            rating: 4.3,
            reviewsCount: 88,
            sustainability: true,
            material: "100% Organic Cotton",
            care: "Machine wash cold, tumble dry low"
          };
          setProduct(formatted);
        } else {
          // Load fallback product if not found in Sanity
          setProduct({
            id: "fallback-product",
            brand: "Aura Premium",
            title: "Classic Oversized Textured Tee",
            price: 1899,
            strikedPrice: 2999,
            offer: "35% OFF",
            images: [
              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1434389678232-0678a58cbd37?q=80&w=600&auto=format&fit=crop",
            ],
            rating: 4.6,
            reviewsCount: 142,
            sustainability: true,
            material: "100% Cotton",
            care: "Cold gentle wash, do not bleach"
          });
        }
      } catch (err) {
        console.error("PDP Load error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist({
        id: product.id,
        brand: product.brand,
        para: product.title,
        price: product.price,
        image_url: product.images[0]
      });
    }
  };

  const handleFitPredictor = (e) => {
    e.preventDefault();
    // Simple fit logic based on height/weight
    const bmi = weight / ((height / 100) * (height / 100));
    let size = "M";
    if (bmi < 20) size = "S";
    else if (bmi >= 20 && bmi < 25) size = "M";
    else if (bmi >= 25 && bmi < 30) size = "L";
    else size = "XL";

    setFitResult(size);
  };

  const toggleAddon = (itemId) => {
    setSelectedAddons(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const addToBag = (e) => {
    if (!selectedSize) {
      alert("Please select a size before adding to bag.");
      return;
    }

    addToCart(
      {
        id: product.id,
        brand: product.brand,
        para: product.title,
        price: product.price,
        image_url: product.images[0],
      },
      selectedSize,
      1
    );

    // Add selected addons
    selectedAddons.forEach(addonId => {
      const addonItem = mockLookItems.find(item => item.id === addonId);
      if (addonItem) {
        addToCart(
          {
            id: addonItem.id,
            brand: "Aura Essentials",
            para: addonItem.name,
            price: addonItem.price,
            image_url: addonItem.image,
          },
          "OS", // One size for accessories
          1
        );
      }
    });

    const btn = e.target;
    const oldText = btn.innerHTML;
    btn.innerHTML = "ADDED TO BAG ✓";
    btn.style.backgroundColor = "#059669";
    setTimeout(() => {
      btn.innerHTML = oldText;
      btn.style.backgroundColor = "";
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0c10]">
        <div className="w-10 h-10 border-4 border-[#ff3f6c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0b0c10]">
        <h2 className="text-xl font-bold">Product not found</h2>
        <button onClick={() => router.push("/Landingpage")} className="mt-4 bg-[#ff3f6c] text-white px-6 py-2 rounded-xl">Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* PDP Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Images Gallery */}
        <div className="flex flex-col gap-6">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveImage}
            className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 dark:border-white/5 cursor-zoom-in"
          >
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images[selectedImage]}
              alt={product.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: zoomStyle.transform,
                transformOrigin: zoomStyle.transformOrigin,
                transition: "transform 0.1s ease-out"
              }}
            />
            {/* Interactive Zoom Overlay indicator */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold pointer-events-none">
              Hover to Zoom
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-24 aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-[#ff3f6c]" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-sm font-bold text-[#ff3f6c] uppercase tracking-widest block mb-1">
              {product.brand}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h1>
            
            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300 dark:text-gray-700"}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-b border-gray-100 dark:border-white/5 py-6 flex items-baseline gap-4">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Rs. {product.price}
            </span>
            {product.strikedPrice && (
              <span className="text-lg text-gray-400 line-through">
                Rs. {product.strikedPrice}
              </span>
            )}
            {product.offer && (
              <span className="text-sm font-bold text-[#ff3f6c] bg-[#ff3f6c]/10 px-2 py-0.5 rounded">
                {product.offer}
              </span>
            )}
          </div>

          {/* Sizing Section */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Select Size
              </span>
              <button 
                onClick={() => setShowFitPredictor(true)}
                className="text-xs text-[#ff3f6c] font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
              >
                <Ruler className="w-4 h-4" />
                Find Your Fit
              </button>
            </div>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map(size => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-sm transition-all ${active ? "bg-[#ff3f6c] border-[#ff3f6c] text-white shadow-lg" : "border-gray-200 dark:border-white/10 hover:border-[#ff3f6c]"}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-2xl p-4">
              <Truck className="w-5 h-5 text-[#ff3f6c]" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Free Delivery</h4>
                <p className="text-[10px] text-gray-400">On all orders</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-2xl p-4">
              <RefreshCw className="w-5 h-5 text-[#ff3f6c]" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Easy Returns</h4>
                <p className="text-[10px] text-gray-400">30-day window</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-2xl p-4">
              <ShieldCheck className="w-5 h-5 text-[#ff3f6c]" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Original</h4>
                <p className="text-[10px] text-gray-400">100% verified products</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={addToBag}
              className="flex-1 bg-[#ff3f6c] hover:bg-[#e02454] text-white py-4 rounded-2xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ff3f6c]/20 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Bag
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-4 border rounded-2xl transition-all ${isWishlisted ? "bg-red-500/10 border-red-500/30 text-[#ff3f6c]" : "border-gray-200 dark:border-white/10 text-gray-500 hover:border-[#ff3f6c]"}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Rating breakdown progress bars */}
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-3xl p-6 my-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Customer Reviews</h4>
            <div className="flex gap-6 items-center">
              <div className="text-center shrink-0">
                <span className="text-5xl font-black text-gray-900 dark:text-white">{product.rating}</span>
                <div className="flex justify-center text-amber-400 mt-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium">{product.reviewsCount} Ratings</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {[
                  { stars: 5, pct: 75 },
                  { stars: 4, pct: 15 },
                  { stars: 3, pct: 6 },
                  { stars: 2, pct: 3 },
                  { stars: 1, pct: 1 }
                ].map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3 text-xs font-semibold">
                    <span className="w-3 text-right">{stars} ★</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-7 text-right text-gray-400">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Tabs */}
          <div className="border-t border-gray-100 dark:border-white/5 pt-6">
            <div className="flex gap-6 border-b border-gray-100 dark:border-white/5 pb-2">
              <button onClick={() => setActiveTab("specs")} className={`text-sm font-bold pb-2 border-b-2 transition-colors ${activeTab === "specs" ? "border-[#ff3f6c] text-[#ff3f6c]" : "border-transparent text-gray-400"}`}>
                Specifications
              </button>
              <button onClick={() => setActiveTab("care")} className={`text-sm font-bold pb-2 border-b-2 transition-colors ${activeTab === "care" ? "border-[#ff3f6c] text-[#ff3f6c]" : "border-transparent text-gray-400"}`}>
                Material & Care
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {activeTab === "specs" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-gray-400">Material</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{product.material}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">Product Code</span>
                    <span className="font-semibold text-gray-900 dark:text-white">AURA-{id?.slice(0, 8)}</span>
                  </div>
                </div>
              ) : (
                <p>{product.care}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look Section */}
      <section className="mt-20 pt-12 border-t border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2 mb-8">
          <Flame className="w-5 h-5 text-[#ff3f6c]" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Complete the Look
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center bg-[#f4f6f8] dark:bg-white/5 p-6 rounded-3xl">
          {mockLookItems.map(item => {
            const active = selectedAddons.includes(item.id);
            return (
              <div key={item.id} className="bg-white dark:bg-[#0b0c10] border border-gray-100 dark:border-white/5 rounded-2xl p-4 flex gap-4 items-center relative">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate text-gray-900 dark:text-white">{item.name}</h4>
                  <span className="text-xs text-gray-500 block mt-1">Rs. {item.price}</span>
                </div>
                <button
                  onClick={() => toggleAddon(item.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${active ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200 hover:border-[#ff3f6c]"}`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          <div className="p-4 flex flex-col justify-center">
            <span className="text-xs text-gray-400">Bundle Price</span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
              Rs. {product.price + selectedAddons.reduce((sum, id) => sum + mockLookItems.find(item => item.id === id).price, 0)}
            </span>
            <button
              onClick={addToBag}
              className="mt-4 bg-[#ff3f6c] hover:bg-[#e02454] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Add Bundle to Bag
            </button>
          </div>
        </div>
      </section>

      {/* FIT PREDICTOR MODAL */}
      <AnimatePresence>
        {showFitPredictor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFitPredictor(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#0b0c10] border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl"
            >
              <button onClick={() => setShowFitPredictor(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-6">
                <Ruler className="w-5 h-5 text-[#ff3f6c]" /> Fit Predictor
              </h2>

              <form onSubmit={handleFitPredictor} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Your Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-[#ff3f6c]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Your Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-[#ff3f6c]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ff3f6c] text-white py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs shadow-lg mt-2"
                >
                  Predict My Size
                </button>
              </form>

              {fitResult && (
                <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    Recommended Size
                  </span>
                  <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                    {fitResult}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedSize(fitResult);
                      setShowFitPredictor(false);
                    }}
                    className="mt-4 text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-xl"
                  >
                    Select Recommended Size
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
