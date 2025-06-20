import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductById = createAsyncThunk(
  'productDetail/fetchProductById',
  async (id, { rejectWithValue }) => {  // Change _id to id
    try {
      const { data } = await axios.get(`/api/product/${id}`);
      
      if (data.success) {
        return data.product;
      } else {
        return rejectWithValue(data.message || 'Failed to fetch product');
      }
    } catch (error) {
      const message = error.response?.data?.message || 
                     error.message || 
                     'Network error occurred';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;