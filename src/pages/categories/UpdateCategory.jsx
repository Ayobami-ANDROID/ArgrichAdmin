import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputField2 from '../../components/InputField'
import SelectField from '../../components/SelectField'
import { updateProduct, getSingleProduct } from '../../features/product/productSlice'
import { updateCategory, getCategorybyId } from '../../features/category/categorySlice'
import { PulseLoader } from 'react-spinners'
import { validateCategory } from '../../services'
import { useFormik } from 'formik'
import { BiArrowBack } from 'react-icons/bi'
import UploadField from '../../components/UploadField'

const UpdateCategory = () => {
    const { category } = useParams()

    const { isLoading, categorys } = useSelector((state) => state.category)
    const [base64, setbase64] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchCategory = async () => {
            try {
              const fethedCategory =  await dispatch(getCategorybyId(category)).unwrap()
                formik.setValues({
                    category: fethedCategory.category
                })
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }


        fetchCategory()

    }, [dispatch, category])

    const formik = useFormik({
        initialValues: {
            category: '',
        },
        validationSchema: validateCategory,
        onSubmit: async (values) => {
            console.log(values)

            await dispatch(updateCategory({category:category,userdata:values})).unwrap()
            navigate(-1)
         
        }
    })
    return (
        <div className="  ">
        {isLoading && (
            <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
            </div>
        )}
        <div className=" max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-4">
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-[#072D56] transition-colors">
                    <BiArrowBack className="mr-2" />
                    Back
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Category</h2>
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div className=' gap-4'>
                        <InputField2
                            label={`Category`}
                            name={`category`}
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={formik.touched.category && formik.errors.category}
                            errorText={formik.errors.category}
                        />

                        
                 
                        


                    </div>

                    <button type='submit' className="text-white btn w-full bg-[#008A2F] rounded-[10px] px-5 py-2">
                        {isLoading ? 'Updating...' : 'Update Category'}
                    </button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default UpdateCategory