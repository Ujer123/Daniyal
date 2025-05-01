import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userDummyData } from '@/assets/assets';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async () => {
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
    setIsSeller: (state, action) => {
      state.isSeller = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export const { setIsSeller } = userSlice.actions;
export default userSlice.reducer;