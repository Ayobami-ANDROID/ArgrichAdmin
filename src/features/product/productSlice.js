import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
};
export const getProducts = createAsyncThunk(
  "products/",
  async ({page_size,page}, thunkAPI) => {
    try {
      const response = await productService.getProducts(page_size,page);
      return response;
    } catch (error) {
     
      if(error?.response?.data?.detail === "Authentication credentials were not provided."){
        toast.error(error?.response?.data?.detail)
        window.location.replace('/auth/login')
      }
      else{
        toast.error(error?.response?.data?.detail || 'An error Occured')
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/id/",
  async (id, thunkAPI) => {
    try {
      const response = await productService.getSingleProduct(id);
      return response;
    } catch (error) {
      
      if(error?.response?.data?.detail === "Authentication credentials were not provided."){
        toast.error(error?.response?.data?.detail)
        window.location.replace('/auth/login')
      }
      else{
        toast.error(error?.response?.data?.detail || 'An error Occured')
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getSearchProduct = createAsyncThunk(
  "products/search",
   async({name,search},thunkAPI) => {
    try {
      const response = await productService.getSearchProduct(name,search)
      return response
    } catch (error) {
      
      if(error?.response?.data?.detail === "Authentication credentials were not provided."){
        toast.error(error?.response?.data?.detail)
        window.location.replace('/auth/login')
      }
      else{
        toast.error(error?.response?.data?.detail || 'An error Occured')
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
   }
)

export const updateProduct = createAsyncThunk(
  "products/update",
  async({id,userData},thunkAPI) => {
    try {
      const response = await productService.updateProduct(id,userData)
      return response
    } catch (error) {
      
      if(error?.response?.data?.detail === "Authentication credentials were not provided."){
        toast.error(error?.response?.data?.detail)
        window.location.replace('/auth/login')
      }
      else{
        toast.error(error?.response?.data?.detail || 'An error Occured')
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async(id,thunkAPI) => {
    try {
      const response = await productService.deleteProduct(id)
      return response
    } catch (error) {
     
      if(error?.response?.data?.detail === "Authentication credentials were not provided."){
        toast.error(error?.response?.data?.detail)
        window.location.replace('/auth/login')
      }
      else{
        toast.error(error?.response?.data?.detail || 'An error Occured')
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
)

export const createProduct =createAsyncThunk(
  "product/create",
  async(userData) => {
    try {
      const response = await productService.createProduct(userData)
      return response
    } catch (error) {
      
      if(error?.response?.data?.detail === "Authentication credentials were not provided."){
        toast.error(error?.response?.data?.detail)
        window.location.replace('/auth/login')
      }
      else{
        toast.error(error?.response?.data?.detail || 'An error Occured')
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    isLoading: true,
  },
  reducers: {
    productReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload
        
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
      
      })
      .addCase(getSingleProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSearchProduct.pending,(state,action) => {
        state.isLoading = true;
      }) 
      .addCase(getSearchProduct.fulfilled,(state,action) => {
        state.isLoading = false;
        state.products = action.payload
      })
      .addCase(getSearchProduct.rejected,(state,action) => {
        state.isLoading = false
      })
      .addCase(updateProduct.pending,(state,action)=> {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.isLoading = false
      })
      .addCase(updateProduct.rejected,(state,action) => {
        state.isLoading = false
      })
      .addCase(deleteProduct.pending,(state,action)=>{
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled,(state,action) => {
        state.isLoading = false
      })
      .addCase(deleteProduct.rejected,(state,action)=>{
        state.isLoading = false
      })
      .addCase(createProduct.pending,(state,action)=> {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled,(state,action)=>{
        state.isLoading = false
      })
      .addCase(createProduct.rejected,(state,action)=>{
        state.isLoading = false
      })
  },
});

export const { productReset } = productSlice.actions;
export default productSlice.reducer;
