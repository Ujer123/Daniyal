import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
  products: [],
  loading: false,
  error: null
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_,{rejectWithValue}) => {
    try{
    const {data} = await axios.get('/api/product/list')

    if(data.success){
      return Array.isArray(data.products) ? data.products : [];
    }else{
      return rejectWithValue(data.message);
    }

  }catch(error){
    console.log(error.message);
  }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
        state.products = [];
      });
  }
});

export default productsSlice.reducer;