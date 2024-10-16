import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiClient from '../../app/axiosConfig'

const ViewAllComplains = () => {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const fetchData = async () => {
         setisLoading(true)
         apiClient.get('/adminuser/customers/feedback/')
         .then((res) => {
            console.log(res)
         })
    }
  return (
    <div>ViewAllComplains</div>
  )
}

export default ViewAllComplains