import apiClient from "../../app/axiosConfig";

const register = async (userData) => {
  const response = await apiClient.post("accounts/signup/", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await apiClient.post("accounts/login/", userData);
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
