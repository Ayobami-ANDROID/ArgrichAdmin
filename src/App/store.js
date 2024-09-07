import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/features/auth/authSlice";
import ProductReducer from "../../src/features/product/productSlice"



const store = configureStore({
  reducer: {
    auth: authReducer,
    product: ProductReducer
  },
});


export default store;
