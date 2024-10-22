import React, { useState, useEffect } from 'react'
import apiClient from '../../../app/axiosConfig'
import { toast } from 'react-toastify'
import { PulseLoader } from "react-spinners";
import { useParams, Route, Routes } from 'react-router-dom';
import ViewOrderHeader from './ViewOrderHeader';
import ViewUserDetails from './ViewUserDetails';
import ViewOrderedItem from './ViewOrderedItem';

const ViewOrdersDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [order, setOrder] = useState([])

  useEffect(() => {
    setIsLoading(true)
    apiClient.get(`/adminuser/orders/${id}`)
      .then((res) => {
        
        setData(res.data.user)
        setOrder(res.data.ordered_items || [])
      })
      .catch((e) => {
       
        if (e?.response?.data?.detail === "Authentication credentials were not provided.") {
          toast.error(e?.response?.data?.detail)
          window.location.replace('/auth/login')
        } else {
          toast.error(e?.response?.data?.detail || 'An error Occurred')
        }
      })
      .finally(() => setIsLoading(false))
  }, [id])
 
  return (
    <div className='flex flex-col p-8'>
      {isLoading && (
        <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
          <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
        </div>
      )}
      <ViewOrderHeader id={id} />
      <Routes>
        <Route path={'/'} element={<ViewUserDetails dat={data} />} />
        <Route path={'/orders'} element={<ViewOrderedItem data={order} />} />
      </Routes>
    </div>
  )
}

export default ViewOrdersDetails