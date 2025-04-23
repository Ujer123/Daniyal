// features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userDummyData } from '@/assets/assets';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async () => {
    // Replace with actual API call
    return userDummyData;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isSeller: false
  },
  reducers: {
    setSellerStatus: (state, action) => {
      state.isSeller = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export const { setSellerStatus } = userSlice.actions;
export default userSlice.reducer;