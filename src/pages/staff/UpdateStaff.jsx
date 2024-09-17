
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

const UpdateStaff = () => {
  return (
    <div>UpdateStaff</div>
  )
}

export default UpdateStaff