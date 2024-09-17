import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputField2 from '../../components/InputField'
import SelectField from '../../components/SelectField'
import { updateProduct, getSingleProduct } from '../../features/product/productSlice'
import { getCategory } from '../../features/category/categorySlice'
import { PulseLoader } from 'react-spinners'
import { validateProduct } from '../../services'
import { useFormik } from 'formik'
import { BiArrowBack } from 'react-icons/bi'
import UploadField from '../../components/UploadField'
import apiClient from '../../app/axiosConfig'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'react-toastify'

const UpdateProduct = () => {
    const { id } = useParams()
    const { isLoading, product } = useSelector((state) => state.product)
    const { categories } = useSelector((state) => state.category)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null)
    const [base64, setbase64] = useState('')
    const token = secureLocalStorage.getItem("token")
    console.log(token.access)

    const config= {
        headers:{
            Authorization :`Bearer ${token.access}` 
        }
       
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await dispatch(getCategory()).unwrap()
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await dispatch(getSingleProduct(id)).unwrap()
                console.log("Fetched product:", fetchedProduct)
                formik.setValues({
                    name: fetchedProduct.name || '',
                    price: fetchedProduct.price || '',
                    description: fetchedProduct.description || '',
                    category: fetchedProduct.category || '',
                    stock: fetchedProduct.stock || 0,
                    // image: fetchedProduct.image || null
                })
            } catch (error) {
                console.error("Error fetching product:", error)
            }
        }

        fetchCategories()
        fetchProduct()
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
        validationSchema: validateProduct,
        onSubmit: async (values) => {
            console.log("Form values before submission:", values);
    
            // Create FormData object to handle both text data and the image file
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('stock', values.stock);


           
    
            // Append image if available
            if (values.image) {
                console.log('values', values.image)
                formData.append('image', values.image);  // Append the file properly here
            }
            for (let [key, value] of formData.entries()) {
                if (key === 'image') {
                    console.log(`${key}: ${value.name}, ${value.size}, ${value.type}`); // Log image file details
                } else {
                    console.log(`${key}: ${value}`);
                }
            }
    
    
            try {
                // Dispatch with FormData as payload
                console.log("image vale", values.image)
                const result = await dispatch(updateProduct({ id: id, userData: formData })).unwrap();
                // await axios.patch(`adminuser/products/${id}/`,formData,config).then((res) => {
                //      toast.success('Updated succefully')
                // })

                console.log("Update result:", result);
                navigate(-1);
            } catch (error) {
                console.error("Error updating product:", error);
            }
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);
        
        // Update Formik state with the image file
        formik.setFieldValue('image', file);
    };

    const cart = categories.map((items) => ({
        label: items.category,
        value: items.category
    }))

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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Product</h2>
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
                                <UploadField
                                    name={"image"}
                                    fieldName={`Upload product image in JPG or JPEG format`}
                                    onChange={handleImageChange}
                                    error={formik.touched.image && formik.errors.image}
                                    errorText={formik.errors.image}
                                    uploadedFile={formik}
                                    uploadFileName={formik.values.image?.name }
                                />
                                {/* {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs" />
                                )} */}
                            </div>
                        </div>
                        <button type='submit' className="text-white btn w-full bg-[#008A2F] rounded-[10px] px-5 py-2">
                            {isLoading ? 'Updating...' : 'Update Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct