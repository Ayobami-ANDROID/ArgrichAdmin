import apiClient from "../../app/axiosConfig";


const getCustomer = async () =>{
    const response = await apiClient.get(`/adminuser/customers/`)
    return response.data
}

const getCustomerbyId = async (id) => {
    const response = await apiClient.get(`/adminuser/customers/${id}/`)
    return response.data
}


export const CustomerService = {
    getCustomer,
    getCustomerbyId
}