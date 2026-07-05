'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import Link from 'next/link';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockOrders = [
    { id: 'AUR-89241', date: 'Oct 12, 2023', status: 'Delivered', total: 3499, items: 2 },
    { id: 'AUR-75122', date: 'Sep 05, 2023', status: 'Processing', total: 1299, items: 1 },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-6 flex flex-col items-center text-center border border-gray-100 dark:border-white/5">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#0b0c10] shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center border-2 border-white dark:border-[#0b0c10]">
                <Edit2 className="w-3 h-3 text-white dark:text-black" />
              </button>
            </div>
            <h2 className="text-xl font-bold">Emma Watson</h2>
            <p className="text-sm text-gray-500">Premium Member</p>
          </div>

          <nav className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-4 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-gray-50 dark:bg-white/10 text-black dark:text-white border-l-4 border-[#ff3f6c]' 
                      : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </button>
              );
            })}
            <button className="w-full flex items-center gap-3 p-4 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-gray-100 dark:border-white/5">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Order History</h2>
                  {mockOrders.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-12 text-center border border-gray-100 dark:border-white/5">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">You haven't placed any orders yet.</p>
                      <Link href="/menspage" className="mt-4 inline-block bg-[#ff3f6c] text-white px-6 py-2 rounded-xl font-medium">Start Shopping</Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockOrders.map(order => (
                        <div key={order.id} className="border border-gray-100 dark:border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0b0c10] hover:shadow-lg transition-shadow">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-lg">{order.id}</span>
                              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Placed on {order.date} • {order.items} items</p>
                          </div>
                          <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                            <span className="font-bold text-xl">Rs. {order.total}</span>
                            <button className="text-sm font-semibold text-[#ff3f6c] hover:underline">View Details</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">My Wishlist</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Placeholder for wishlist items */}
                    <div className="text-center p-12 border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 rounded-3xl col-span-full">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your wishlist is empty.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
                  <div className="bg-white dark:bg-[#0b0c10] border border-gray-100 dark:border-white/5 rounded-3xl p-8 space-y-6 shadow-sm">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">First Name</label>
                        <input type="text" defaultValue="Emma" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#ff3f6c] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Name</label>
                        <input type="text" defaultValue="Watson" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#ff3f6c] transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</label>
                      <input type="email" defaultValue="emma.w@example.com" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#ff3f6c] transition-colors" />
                    </div>
                    <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm mt-4 hover:scale-105 transition-transform shadow-lg shadow-black/10">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
