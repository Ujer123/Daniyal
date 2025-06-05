// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast'

export const fetchProductData = createAsyncThunk(
  'app/fetchProductData',
  async ({ user, getToken }, { rejectWithValue, dispatch }) => {
    try {
      if (user?.publicMetadata?.role === 'seller') {
        dispatch(setIsSeller(true));
      }
      
      const token = await getToken();
      const { data } = await axios.get('/api/user/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (data.success) {
        return data.user;
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
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