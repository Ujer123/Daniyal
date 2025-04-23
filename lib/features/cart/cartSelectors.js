// features/cart/cartSelectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectCartItems = (state) => state.cart;
export const selectProducts = (state) => state.products;

export const selectCartCount = createSelector(
  [selectCartItems],
  (cart) => Object.values(cart).reduce((sum, qty) => sum + qty, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems, selectProducts],
  (cart, products) => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find(p => p._id === id);
      return total + (product?.offerPrice || 0) * qty;
    }, 0).toFixed(2);
  }
);