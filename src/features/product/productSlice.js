import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
};
export const getProducts = createAsyncThunk(
  "products/",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getProducts();
      return response;
    } catch (error) {
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
        state.products = action.payload.results
        console.log("getProduct", action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        console.log("getProduct", action.payload);
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
        state.products = action.payload.results
      })
      .addCase(getSearchProduct.rejected,(state,action) => {
        state.isLoading = false
      })
  },
});

export const { productReset } = productSlice.actions;
export default productSlice.reducer;
