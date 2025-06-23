// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
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
        return {
          userData: data.user,
          cartItem: data.user.cartItem || {}
      };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addtoCart = createAsyncThunk(
  'cart/addtoCart',
  async({user, getToken, productId}, {rejectWithValue, getState})=>{
    try {
       if (!user) {
        throw new Error('User not authenticated');
        console.log('user add')
      }
      if(user){
        const token = await getToken();
        const state = getState();
        const currentQuantity = state.user.cartItem[productId] || 0;
        const newQuantity = currentQuantity + 1;
        const updateCart ={
          ...state.user.cartItem,
          [productId]: newQuantity
        };
        await axios.post('/api/cart/update',
          {cartItem: updateCart},
          {headers: {Authorization: `Bearer ${token}`}}
        );
        return {productId, quantity: newQuantity};        
      }
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.log(error.message)
      return rejectWithValue(error.message)

    }
  }
)

export const updateCartOnServer = createAsyncThunk(
  'cart/updateCartOnServer',
  async ({ user, getToken }, { rejectWithValue, getState }) => {
    try {
      if(user){
        const state = getState();
      const token = await getToken();
      
      await axios.post('/api/cart/update', 
        { cartData: state.user.cartItem }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );}
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
    cartItem: {},
    loading: false,
    error: null
  },
  reducers: {
    setCartItem:(state, action)=>{
      state.cartItem = action.payload;
    },
    setIsSeller: (state, action) => {
      state.isSeller = action.payload;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.userData;
        state.cartItem = action.payload.cartItem;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addtoCart.fulfilled, (state, action)=>{
        const {productId, quantity} = action.payload;
        state.cartItem[productId]= quantity;
        toast.success("Item added to cart");
      })
  }
});
export const { setIsSeller, setCartItem, } = userSlice.actions;
export default userSlice.reducer;