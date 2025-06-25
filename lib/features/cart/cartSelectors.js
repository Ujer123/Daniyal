import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectCartItems = (state) => state.user.cartItem;
export const selectProducts = (state) => state.products.products;

// Memoized selectors
export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => Object.values(cartItems).reduce((total, qty) => total + qty, 0)
);

export const selectCartItemsWithDetails = createSelector(
  [selectCartItems, selectProducts],
  (cartItems, products) => {
    return Object.entries(cartItems)
      .map(([productId, quantity]) => {
        const product = products.find(p => p._id === productId);
        if (!product || quantity <= 0) return null;
        
        return {
          productId,
          product,
          quantity,
          subtotal: product.offerPrice * quantity
        };
      })
      .filter(item => item !== null);
  }
);

export const selectCartTotal = createSelector(
  [selectCartItemsWithDetails],
  (cartItems) => cartItems.reduce((total, item) => total + item.subtotal, 0)
);