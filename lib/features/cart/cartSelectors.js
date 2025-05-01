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
    let totalAmount = Object.entries(cart).reduce((acc, [id, qty]) => {
      const product = products.find(p => p._id === id);
      return acc + (product?.offerPrice || 0) * qty;
    }, 0);
    // Apply Math.floor and toFixed(2)
    return (Math.floor(totalAmount * 100) / 100).toFixed(2);
  }
);
