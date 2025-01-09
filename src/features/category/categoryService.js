import apiClient from "../../App/axiosConfig";

const getCategory = async () =>{
    const response = await apiClient.get(`/adminuser/categories/`)
    return response.data
}

const createCategory = async (userData) => {
    const response = await apiClient.post(`/adminuser/categories/`,userData)
    return response.data
} 

const getCategoryId = async (category) => {
    const response = await apiClient.get(`/adminuser/categories/${category}/`)
    return response.data
}

const updateCategory = async (category,userData) => {
     const response = await apiClient.patch(`/adminuser/categories/${category}/`,userData)
     return response.data
}

const deleteCategory = async (category) => {
    const response = await apiClient.delete(`/adminuser/categories/${category}/`)
    return response.data
}

const categoryServise= {
    getCategory,
    createCategory,
    getCategoryId,
    updateCategory,
    deleteCategory
}

export default categoryServise