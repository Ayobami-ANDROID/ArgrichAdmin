import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryServise from "./categoryService";

export const getCategory = createAsyncThunk(
  "/products/category/",
  async (_, thunkAPI) => {
    try {
      const response = await categoryServise.getCategory();
      return response;
    } catch (error) {
      console.log(error?.response?.data?.detail)
      if(error?.response?.data?.detail === "Authentication credentials were not provided."){
        toast.error(error?.response?.data?.detail)
        window.location.replace('/auth/login')
      }
      else{
        toast.error(error?.response?.data?.detail || 'An error Occured')
      }
      return thunkAPI.rejectWithValue(
        
        error.response?.data?.detail || "An error occurred"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "/category/create",
  async(userdata,thunkAPI) => {
    try {
      const response = await categoryServise.createCategory(userdata)
      return response
    } catch (error) {
      console.log(error?.response?.data?.detail)
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

export const getCategorybyId = createAsyncThunk(
  "/category/getbyId",
  async(category,thunkAPI) => {
    try {
      const response = await categoryServise.getCategoryId(category)
      return response
    } catch (error) {
      console.log(error?.response?.data?.detail)
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

export const updateCategory = createAsyncThunk(
  "/category/update",
  async({category,userdata},thunkAPI) => {
    try {
      const response = await categoryServise.updateCategory(category,userdata)
      return response
    } catch (error) {
      console.log(error?.response?.data?.detail)
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

export const deleteCategory = createAsyncThunk(
  "/category/delete",
  async(category,thunkAPI) => {
    try {
      const response = await categoryServise.deleteCategory(category)
      return response
    } catch (error) {
      console.log(error?.response?.data?.detail)
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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    categorys:{},
    isloading: false,
  },
  reducers: {
    categoryReset: () => initialState,
  },
  extraReducers: (builders) => {
    builders
      .addCase(getCategory.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isloading = false;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isloading = false;
        state.categories = action.payload;
      })
      .addCase(getCategorybyId.pending,(state,action)=>{
        state.isloading = true;
      })
      .addCase(getCategorybyId.rejected,(state,action) => {
        state.isloading = false
      })
      .addCase(getCategorybyId.fulfilled,(state,action)=>{
        state.isloading = false
        state.categorys= action.payload
      })
      .addCase(updateCategory.pending,(state,action) => {
        state.isloading = true;
      })
      .addCase(updateCategory.rejected,(state,action) => {
        state.isloading = false
      })
      .addCase(updateCategory.fulfilled, (state,action) => {
        state.isloading = false
      })
      .addCase(createCategory.pending,(state,action) => {
          state.isloading = true
      })
      .addCase(createCategory.rejected,(state,action) => {
        state.isloading = false
      })
      .addCase(createCategory.fulfilled,(state,action)=> {
        state.isloading = false
      })
      .addCase(deleteCategory.pending,(state,action) => {
        state.isloading = true
      })
      .addCase(deleteCategory.rejected,(state,action)=>{
        state.isloading = false
      })
      .addCase(deleteCategory.fulfilled,(state,action)=> {
        state.isloading = false
      })
  },
});

export const { categoryReset } = categorySlice.actions;
export default categorySlice.reducer;
