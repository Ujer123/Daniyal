import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productSlice';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import productDetailReducer from './features/productDetail/productDetailSlice'

export default configureStore({
    reducer:{
      products: productsReducer,
      user: userReducer,
      cart: cartReducer,
      productDetail: productDetailReducer
    }
  })