import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlistItems: [],
      isCartOpen: false,
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: (product, size, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id && item.size === size
          );
          
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            cartItems: [...state.cartItems, { ...product, size, quantity }],
          };
        });
      },

      // Convenience method for adding without requiring size
      addItem: (product) => {
        set((state) => {
          const existingItem = state.cartItems.find(item => item.id === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: product.quantity || 1 }],
          };
        });
      },

      removeFromCart: (productId, size) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === productId && item.size === size)
          )
        }));
      },

      updateQuantity: (productId, size, newQuantity) => {
        if (newQuantity < 1) return;
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId && item.size === size
              ? { ...item, quantity: newQuantity }
              : item
          )
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      getCartTotal: () => {
        const state = get();
        return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        const state = get();
        return state.cartItems.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist Actions
      addToWishlist: (product) => {
        set((state) => {
          const exists = state.wishlistItems.some(item => item.id === product.id);
          if (exists) return {};
          return { wishlistItems: [...state.wishlistItems, product] };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(item => item.id !== productId)
        }));
      },

      toggleWishlist: (product) => {
        const state = get();
        const exists = state.wishlistItems.some(item => item.id === product.id);
        if (exists) {
          state.removeFromWishlist(product.id);
        } else {
          state.addToWishlist(product);
        }
      },

      isInWishlist: (productId) => {
        const state = get();
        return state.wishlistItems.some(item => item.id === productId);
      },

      clearWishlist: () => set({ wishlistItems: [] }),

      // Hydration utility for legacy data
      hydrateFromLocalStorage: () => {
        const state = get();
        let updated = false;
        const newCart = [...state.cartItems];
        const newWishlist = [...state.wishlistItems];

        // Hydrate cart if empty
        if (state.cartItems.length === 0) {
          try {
            const legacyBag = JSON.parse(localStorage.getItem('BagListObj')) || [];
            if (legacyBag.length > 0) {
              legacyBag.forEach(item => {
                const priceVal = typeof item.price === 'string' 
                  ? parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0 
                  : item.price;
                const formatted = {
                  id: item.id || item._id,
                  brand: item.brand,
                  para: item.para || item.name,
                  price: priceVal,
                  image_url: item.image_url || item.image,
                  quantity: item.quantity || 1,
                  size: item.size || 'M'
                };
                if (!newCart.find(c => c.id === formatted.id && c.size === formatted.size)) {
                  newCart.push(formatted);
                }
              });
              updated = true;
            }
          } catch(e) {}
        }

        // Hydrate wishlist if empty
        if (state.wishlistItems.length === 0) {
          try {
            const legacyWish = JSON.parse(localStorage.getItem('wishListObj')) || [];
            if (legacyWish.length > 0) {
              legacyWish.forEach(item => {
                const priceVal = typeof item.price === 'string'
                  ? parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0
                  : item.price;
                const formatted = {
                  id: item.id || item._id,
                  brand: item.brand,
                  para: item.para || item.name,
                  price: priceVal,
                  image_url: item.image_url || item.image
                };
                if (!newWishlist.find(w => w.id === formatted.id)) {
                  newWishlist.push(formatted);
                }
              });
              updated = true;
            }
          } catch(e) {}
        }

        if (updated) {
          set({ cartItems: newCart, wishlistItems: newWishlist });
        }
      }
    }),
    {
      name: 'premium-ecommerce-cart', // local storage key
    }
  )
);
