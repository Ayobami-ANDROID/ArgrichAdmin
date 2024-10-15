import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import apiClient from '../../app/axiosConfig';

const GetAllComplains = () => {
  return (
    <div>GetAllComplains</div>
  )
}

export default GetAllComplains