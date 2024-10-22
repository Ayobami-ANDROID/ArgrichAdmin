
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputField2 from '../../components/InputField'
import SelectField from '../../components/SelectField'
import { updateProduct, getSingleProduct } from '../../features/product/productSlice'
import { getCategory } from '../../features/category/categorySlice'
import { PulseLoader } from 'react-spinners'
import { validateStaff } from '../../services'
import { useFormik } from 'formik'
import { BiArrowBack } from 'react-icons/bi'
import UploadField from '../../components/UploadField'
import apiClient from '../../app/axiosConfig'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from 'react-toastify'

const UpdateStaff = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [toggle, settoggle] = useState(false);
    const [toggle2, settoggle2] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        apiClient.get(`/adminuser/staff/${id}/`)
            .then((res) => {
                formik.setValues({
                    email: res.data.email,
                    name: res.data.name,
                    password: res.data.password,
                    confirmPassword: res.data.password
                })
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
            .finally(() => setIsLoading(false))
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validateStaff,
        onSubmit: async (values) => {
      
            const body = {
                email: values.email,
                name: values.name,
                password: values.password,
                is_staff: true
            }

            setIsLoading(true)
            apiClient.patch(`/adminuser/staff/${id}/`, body)
                .then((res) => {
                    toast.success('successful')
                    navigate(-1)
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
                .finally(() => setIsLoading(false))



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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Staff</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField2
                                label={`Name`}
                                name={`name`}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && formik.errors.name}
                                errorText={formik.errors.name}
                            />

                            <InputField2
                                label={`Email`}
                                name={`email`}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors.email}
                                errorText={formik.errors.email}
                            />

                            <div className="relative">
                                <InputField2
                                    label={`Password`}
                                    name={`password`}
                                    type={toggle ? "text" : "Password"}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && formik.errors.password}
                                    errorText={formik.errors.password}
                                    placeHolder={"••••••••"}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="absolute text-[#008A2F] inset-y-[2.8rem] right-3 text-lg ">
                                    {" "}
                                    {toggle ? (
                                        <RiEyeFill
                                            onClick={() => {
                                                settoggle(!toggle);
                                            }}
                                        />
                                    ) : (
                                        <RiEyeOffFill
                                            onClick={() => {
                                                settoggle(!toggle);
                                            }}
                                        />
                                    )}
                                </div>
                                {/* <div>
                <p className="text-sm text-contentFade">Password must have</p>

                <div className="flex flex-wrap mt-4 gap-3 text-[13px]">
                  <p
                    className={`${
                      /^(?=.*[a-z])/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Lowercase
                  </p>
                  <p
                    className={`${
                      /^(?=.*[A-Z])/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Uppercase
                  </p>
                  <p
                    className={`${
                      /^.{8,}$/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    At least 8 Characters
                  </p>
                  <p
                    className={`${
                      /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/.test(
                        formik.values.password
                      )
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Special Character
                  </p>
                  <p
                    className={`${
                      /^(?=.*\d)/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Number
                  </p>
                </div>
              </div> */}
                            </div>
                            <div className="relative">
                                {" "}
                                <InputField2
                                    label={`Confirm Password`}
                                    name={`confirmPassword`}
                                    type={toggle2 ? "text" : "Password"}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    placeHolder={"••••••••"}
                                    error={
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword
                                    }
                                    errorText={formik.errors.confirmPassword}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="absolute text-[#008A2F] inset-y-[2.8rem] right-3 text-lg ">
                                    {" "}
                                    {toggle2 ? (
                                        <RiEyeFill
                                            onClick={() => {
                                                settoggle2(!toggle2);
                                            }}
                                        />
                                    ) : (
                                        <RiEyeOffFill
                                            onClick={() => {
                                                settoggle2(!toggle2);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>


                        </div>

                        <button type='submit' className="text-white btn w-full bg-[#008A2F] rounded-[10px] px-5 py-2">
                            {isLoading ? 'Updating...' : 'Update Staff'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateStaff