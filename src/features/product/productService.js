import apiClient from "../../app/axiosConfig";

const getProducts = async () => {
  const response = await apiClient.get(`admin/products/`);
  return response.data;
};

const getSingleProduct = async (id) => {
  const response = await apiClient.get(`products/${id}/`);
  return response.data;
};

const getSearchProduct = async (name,category) => {
  const response = await apiClient.get(`products?name=${name}&category=${category}`)
  return response.data
}

const productService = {
  getProducts,
  getSingleProduct,
  getSearchProduct
};
export default productService;
