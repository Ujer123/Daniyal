// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsDummyData } from '@/assets/assets';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    // Replace with actual API call
    return productsDummyData;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (_, action) => action.payload);
  }
});

export default productsSlice.reducer;