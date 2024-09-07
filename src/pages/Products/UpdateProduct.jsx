import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import { updateProduct,deleteProduct,getProducts } from '../../features/product/productSlice'

const UpdateProduct = () => {
  return (
    <div>UpdateProduct</div>
  )
}

export default UpdateProduct