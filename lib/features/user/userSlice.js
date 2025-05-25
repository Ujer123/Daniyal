// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductData = createAsyncThunk(
  'user/fetchProductData',
  async (user, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axios.get('/api/user/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return {
        userData: response.data.user,
        isSeller: user?.publicMetadata?.role === 'seller'
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSeller: false,
    userData: null,
    cartItems: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSeller = action.payload.isSeller;
        state.userData = action.payload.userData;
        state.cartItems = action.payload.userData.cartItems;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;