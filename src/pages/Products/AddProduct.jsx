import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputField2 from '../../components/InputField'
import SelectField from '../../components/SelectField'
import {createProduct, getSingleProduct,deleteProduct } from '../../features/product/productSlice'
import { getCategory } from '../../features/category/categorySlice'
import { PulseLoader } from 'react-spinners'
import { validateAddProduct } from '../../services'
import { useFormik } from 'formik'
import { BiArrowBack } from 'react-icons/bi'
import UploadField from '../../components/UploadField'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import apiClient from '../../app/axiosConfig'
import { toast } from 'react-toastify'

const AddProduct = () => {

    const { id } = useParams()
    const { isLoading, product } = useSelector((state) => state.product)
    const { categories } = useSelector((state) => state.category)
    const [base64, setbase64] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null)

    const token = secureLocalStorage.getItem("token")
    

    const config= {
        headers:{
            Authorization :`Bearer ${token?.access}` 
        }
       
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await dispatch(getCategory()).unwrap()
            } catch (error) {
               
                if (error?.response?.data?.detail === "Authentication credentials were not provided.") {
                    toast.error(error?.response?.data?.detail)
                    window.location.replace('/auth/login')
                  }
                  else {
                    toast.error(error?.response?.data?.detail || 'An error Occured')
                  }
            }
        }
       

        fetchCategories()
        
    }, [dispatch, id])

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            category: '',
            stock: 0,
            image: null
        },
        validationSchema: validateAddProduct,
        onSubmit: async (values) => {

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('stock', values.stock);
            formData.append('image',values.image);  // Append file to form data
            
         

            try {
                await apiClient.post(`adminuser/products/`,formData)
                .then((res) => {
                    toast.success(`Successfully Added`)
                    navigate(-1);
                })
                .catch((e) => {
                  
                    if (e?.response?.data?.detail === "Authentication credentials were not provided.") {
                        toast.error(e?.response?.data?.detail)
                        window.location.replace('/auth/login')
                    }
                    else {
                        toast.error(e?.response?.data?.detail || 'An error Occured')
                    }
    
                })
                
                
            } catch (error) {
                
                if (error?.response?.data?.detail === "Authentication credentials were not provided.") {
                    toast.error(error?.response?.data?.detail)
                    window.location.replace('/auth/login')
                  }
                  else {
                    toast.error(error?.response?.data?.detail || 'An error Occured')
                  }
            }
        }
    })


 



    const cart = categories.map((items) => {
        return {
            label: items.category,
            value: items.category
        }
    })
  return (
    <div className="  ">
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <div className=" mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                        <BiArrowBack className="mr-2" />
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Product</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField2
                                label={`Product Name`}
                                name={`name`}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && formik.errors.name}
                                errorText={formik.errors.name}
                            />

                            <InputField2
                                label={`Price`}
                                name={`price`}
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && formik.errors.price}
                                errorText={formik.errors.price}
                            />

                            <InputField2
                                label={`Description`}
                                name={`description`}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && formik.errors.description}
                                errorText={formik.errors.description}
                            />
                            <SelectField
                                label={`Category`}
                                name={`category`}
                                options={cart}
                                onChange={formik.handleChange}
                                value={formik.values.category}
                                error={formik.touched.category && formik.errors.category}
                                errorText={formik.errors.category}
                            />
                            <InputField2
                                label={`Stock`}
                                name={`stock`}
                                onChange={formik.handleChange}
                                value={formik.values.stock}
                                error={formik.touched.stock && formik.errors.stock}
                                errorText={formik.errors.stock}
                            />
                            <div className='col-span-2'>
                                {/* <UploadField
                                    name={"image"}
                                    fieldName={`Upload product image in JPG or JPEG format`}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        formik.setFieldValue('image', file); // Set the file in Formik's state
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file)); // Show preview
                                        }
                                    }}

                                    error={
                                        formik.touched.image &&
                                        formik.errors.image
                                    }
                                    errorText={formik.errors.image}
                                    uploadedFile={formik}
                                    uploadFileName={formik.values.image}
                                /> */}

                                <UploadField
                                    name={"image"}
                                    fieldName={`Upload product image in JPG or JPEG format`}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        
                                        formik.setFieldValue("image", file);
                                        setbase64(URL.createObjectURL(file)  )
                                        // Set the image preview
                                    }}
                                    error={formik.touched.image && formik.errors.image}
                                    errorText={formik.errors.image}
                                    uploadedFile={formik}  // Show preview
                                    uploadFileName={ formik.values.image?.name ? formik.values.image.name :  formik.values.image}  // Display the file name
                                />
                            </div>


                        </div>

                        <button type='submit' className="text-white btn w-full bg-[#008A2F] rounded-[10px] px-5 py-2">
                            {isLoading ? 'Updating...' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default AddProduct