// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
  'app/fetchUserData',
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
        console.log(data.message);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.log(error.message);
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
  reducers: {
    setIsSeller: (state, action) => {
      state.isSeller = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSeller = action.payload.isSeller;
        state.userData = action.payload.userData;
        state.cartItems = action.payload.userData.cartItems;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export const { setIsSeller } = userSlice.actions;
export default userSlice.reducer;