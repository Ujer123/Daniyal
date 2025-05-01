import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, { payload: itemId }) => {
      state[itemId] = (state[itemId] || 0) + 1;
    },
    updateCartQty: (state, { payload: { itemId, quantity } }) => {
      if (quantity === 0) {
        delete state[itemId];
      } else {
        state[itemId] = quantity;
      }
    },
    clearCart: () => ({})
  }
});

export const { addToCart, updateCartQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;