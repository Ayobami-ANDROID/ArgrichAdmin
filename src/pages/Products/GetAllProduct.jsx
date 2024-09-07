import React,{useEffect, useState} from 'react'
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { getProducts,productReset } from '../../features/product/productSlice';

const GetAllProduct = () => {
   
    const [searchQuery, setSearchQuery] = useState('')
    const [pagesize, SetPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredUsers, setFilteredUsers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, products } = useSelector((state) => state.product);
  

  useEffect(() => {

    const fetchProduct = async () => {
        dispatch(productReset())
       try {
         
         await dispatch(getProducts()).unwrap();
       } catch (error) {}
     };
 
     fetchProduct();
  },[])


  return (
    <div>GetAllProduct</div>
  )
}

export default GetAllProduct