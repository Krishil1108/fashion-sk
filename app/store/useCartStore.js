import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
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
      }
    }),
    {
      name: 'premium-ecommerce-cart', // local storage key
    }
  )
);
