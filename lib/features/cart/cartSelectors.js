import { createSelector } from '@reduxjs/toolkit';


export const selectCartCount = createSelector(
  (state) => state.user.cartItem,
  (cart) => Object.values(cart).reduce((sum, qty) => sum + qty, 0)
);

export const selectCartTotal = createSelector(
  (state) => state.user.cartItem,
  (state) => state.products.products,
  (cartItems, products) => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const item = products.find(p => p._id === productId);
      if (item && cartItems[productId] > 0) {
        totalAmount += item.offerPrice * cartItems[productId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }
);