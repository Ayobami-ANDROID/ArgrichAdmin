import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  "accounts/signup/",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      toast.success("Registration successful!");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
     
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const login = createAsyncThunk(
  "accounts/login/",
  async (userData, thunkAPI) => {
    secureLocalStorage.clear();
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
     

      // if(error?.response?.data?.detail === "Authentication credentials were not provided."){
      //   toast.error(error?.response?.data?.detail)
      //   window.location.replace('/auth/login')
      // }
    
        toast.error(error?.response?.data?.detail || 'An error Occured')
  
     
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: secureLocalStorage.getItem("user") || "",
    token: secureLocalStorage.getItem("token") || "",
    isLoading: false,
  },
  reducers: {
    authReset: (state) => {
      state.user = null;
      state.token = "";
      state.isLoading = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      secureLocalStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.tokens;  
        secureLocalStorage.setItem("token", action.payload.tokens);
        secureLocalStorage.setItem("user", action.payload.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { authReset, setToken } = authSlice.actions;
export default authSlice.reducer;
