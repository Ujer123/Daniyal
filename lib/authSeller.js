import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (getToken, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    isSeller: false,
    status: 'idle',
    error: null
  },
  reducers: {
    setSellerStatus: (state, action) => {
      state.isSeller = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload.user;
        state.isSeller = action.payload.user?.publicMetadata?.role === 'seller';
        
        // OR if API returns user data directly
        // state.userData = action.payload;
        // state.isSeller = action.payload?.publicMetadata?.role === 'seller';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setSellerStatus } = authSlice.actions;
export default authSlice.reducer;