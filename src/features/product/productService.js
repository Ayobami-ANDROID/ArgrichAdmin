import apiClient from "../../app/axiosConfig";

const getProducts = async () => {
  const response = await apiClient.get(`adminuser/products/`);
  return response.data;
};

const getSingleProduct = async (id) => {
  const response = await apiClient.get(`adminuser/products/${id}/`);
  return response.data;
};

const getSearchProduct = async (name,category) => {
  const response = await apiClient.get(`products?name=${name}&category=${category}`)
  return response.data
}

const updateProduct = async(id,userData) =>{
  const response = await apiClient.patch(`adminuser/products/${id}/`,userData)
  return response.data
}

const deleteProduct = async(id) => {
  const response = await apiClient.delete(`adminuser/products/${id}`)
  return response.data
}

const createProduct= async(userData) => {
  const response = await apiClient.post(`adminuser/products/`,userData)
}

const productService = {
  getProducts,
  getSingleProduct,
  getSearchProduct,
  updateProduct,
  deleteProduct,
  createProduct
};
export default productService;
