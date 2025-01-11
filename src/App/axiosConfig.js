import axios from "axios";
import { store } from "./storeInjector";
import { setToken } from "../features/auth/authSlice";

const apiClient = axios.create({
  baseURL: "https://argrich-xsnx.onrender.com/api/v1/",
});

// Request interceptor to add authorization header and set correct Content-Type
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token.access}`;
  }
  
  // Check if the data is FormData
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  
  return config;
});

// Response interceptor to handle expired token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and if we haven't retried already
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().auth.token.refresh;
        if (refreshToken) {
          // Make a request to refresh the token
          const { data } = await axios.post(
            "https://agrich.onrender.com/api/v1/accounts/refresh/",
            { refresh: refreshToken }
          );

          // Update the token in the store
          store.dispatch(setToken(data));

          // Update the original request with the new token and retry it
          apiClient.defaults.headers.common.Authorization = `Bearer ${data.access}`;
          originalRequest.headers.Authorization = `Bearer ${data.access}`;

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        // You may want to log out the user or take other actions
      }
    }

    // Return any other errors that occur
    return Promise.reject(error);
  }
);

export default apiClient;