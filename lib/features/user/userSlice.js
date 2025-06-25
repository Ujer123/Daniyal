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
  async ({ user, getToken, productId }, { rejectWithValue, getState }) => {
    try {
      if(user){
        const token = await getToken();
        const state = getState();
        const currentQuantity = state.user.cartItem[productId]
        const newQuantity = currentQuantity + 1
        const updateCart ={...state.user.cartItem};

        if(newQuantity <=0){
          delete updateCart[productId];
        }else{
          updateCart[productId] = newQuantity;
        }
      
      await axios.post('/api/cart/update', 
        { cartItem: updateCart }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {productId, quantity: newQuantity}    
    }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async({user, getToken, productId, newQuantity}, {rejectWithValue, getState})=>{
    try {
      if(!user) throw new Error('User not authenticated');

      const token = await getToken();
      const state = getState();
      const updateCart = {...state.user.cartItem};

      if(newQuantity <=0){
        delete updateCart[productId]
      }else{
        updateCart[productId]= newQuantity
      }
      await axios.post('/api/cart/update',
        {cartItem: updateCart},
        {headers: {Authorization: `Bearer ${token}`}}
      )
      return {productId, newQuantity};
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeCartOnServer = createAsyncThunk(
  'cart/removeCartOnServer',
  async ({ user, getToken, productId }, { rejectWithValue, getState }) => {
    try {
      if(user){
        const token = await getToken();
        const state = getState();
        const currentQuantity = state.user.cartItem[productId]
        const newQuantity = currentQuantity == 0 
        const updateCart ={...state.user.cartItem}

        if(newQuantity <=0){
          delete updateCart[productId];
        }else{
          updateCart[productId] = newQuantity;
        }
      
      await axios.post('/api/cart/update', 
        { cartItem: updateCart }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {productId, quantity: newQuantity}    
    }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const decreaseCartOnServer = createAsyncThunk(
  'cart/decreaseCartOnServer',
  async ({ user, getToken, productId }, { rejectWithValue, getState }) => {
    try {
      if(user){
        const token = await getToken();
        const state = getState();
        const currentQuantity = state.user.cartItem[productId]
        const newQuantity = currentQuantity - 1
        const updateCart ={...state.user.cartItem}

        if(newQuantity <=0){
          delete updateCart[productId];
        }else{
          updateCart[productId] = newQuantity;
        }
      
      await axios.post('/api/cart/update', 
        { cartItem: updateCart }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {productId, quantity: newQuantity}    
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
      .addCase(updateCartOnServer.fulfilled, (state, action)=>{
        const {productId, quantity} = action.payload;
        state.cartItem={
          ...state.cartItem,
          [productId]: quantity
      }
        toast.success("Item updated to cart");
      })
      .addCase(decreaseCartOnServer.fulfilled, (state, action)=>{
        const {productId, quantity} = action.payload;
         if(quantity <= 0){
          const {[productId]: _, ...rest} = state.cartItem;
          state.cartItem = rest;
        toast.success("Item removed from the cart");
        }else{
        state.cartItem={
          ...state.cartItem,
          [productId]: quantity
        }
        toast.success("Item decrease to cart");
      }
      })
      .addCase(removeCartOnServer.fulfilled, (state, action) => {
        const { productId } = action.payload;
        const { [productId]: _, ...rest } = state.cartItem;
        state.cartItem = rest;
        toast.success("Item removed from cart");
      })
      .addCase(updateCartQuantity.fulfilled, (state, action)=>{
        const {productId, newQuantity} = action.payload;
        if(newQuantity <= 0){
          const {[productId]: _, ...rest} = state.cartItem;
          state.cartItem = rest;
          toast.success('Item removed from cart');
        }else{
          state.cartItem[productId] = newQuantity;
          toast.success('Quantity updated')
        }
      })
  }
});
export const { setIsSeller, setCartItem, } = userSlice.actions;
export default userSlice.reducer;