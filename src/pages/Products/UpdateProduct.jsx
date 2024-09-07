import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import { updateProduct,getSingleProduct } from '../../features/product/productSlice'
import { getCategory } from '../../features/category/categorySlice'
import { PulseLoader } from 'react-spinners'

const UpdateProduct = () => {

    const {isLoading,product} = useSelector((state) => state.product)
    const {categories} = useSelector((state) => state.category)
   
  return (
    <div>UpdateProduct</div>
  )
}

export default UpdateProduct