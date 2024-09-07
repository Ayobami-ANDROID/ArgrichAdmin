import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/features/auth/authSlice";
import ProductReducer from "../../src/features/product/productSlice"
import categoryReducer from "../../src/features/category/categorySlice"



const store = configureStore({
  reducer: {
    auth: authReducer,
    product: ProductReducer,
    categoty: categoryReducer
  },
});


export default store;
