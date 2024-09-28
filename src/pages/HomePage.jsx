import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import apiClient from '../app/axiosConfig'
import { toast } from 'react-toastify'
import test1 from '../assets/Test1.png'
import test2 from '../assets/test2.png'
import test3 from '../assets/test3.png'
import SalesChart from '../components/charts/SalesChart'

const HomePage = () => {
  const [data, setdata] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const name = secureLocalStorage.getItem("name")
  const email = secureLocalStorage.getItem("email")

  const label=["Delivered Orders", "UnDelivered Orders"]
  const series = [data.deliveredOrders, data.undeliveredOrders]

  useEffect(() => {
    setisLoading(true)
    apiClient.get('/adminuser/dashboard/')
      .then((res) => {
        console.log(res.data)
        setdata(res.data)
      })
      .catch((e) => {
        console.log(e?.response?.data?.detail)
        if (e?.response?.data?.detail === "Authentication credentials were not provided.") {
          toast.error(e?.response?.data?.detail)
          window.location.replace('/auth/login')
        }
        else {
          toast.error(e?.response?.data?.detail || 'An error Occured')
        }

      })
      .finally(() => setisLoading(false))
  }, [])
  return (
    <div>
      <div>
        <h1 className='text-[16px] sm:text-left xss:text-center'>Welome Back</h1>
        <p className='text-[26px] sm:text-left xss:text-center'>{email}</p>
      </div>
      <div className='grid grid-cols-3 mt-16'>
        <div className={`bg-[#fff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)] text-white relative`}>
          <div className='absolute top-[15%] left-[8%] flex flex-col z-[1]'>
            <p className='text-[#000000] text-[20px] font-[400]'>Total Customers</p>
            <p className='text-[30px] text-[#000000] font-[600]'>{data.totalCustomers}</p>
          </div>
          <img src={test1}  className='absolute right-0 bottom-0'></img>
        </div>
        <div className={`bg-[#fff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)] text-white relative`}>
          <div className='absolute top-[15%] left-[8%] flex flex-col z-[1]'>
            <p className='text-[#000000] text-[20px] font-[400]'>Total Product</p>
            <p className='text-[30px] text-[#000000] font-[600]'>{data.totalProducts}</p>
          </div>
          <img src={test2}  className='absolute right-0 bottom-0'></img>
        </div>
        <div className={`bg-[#fff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)] text-white relative`}>
          <div className='absolute top-[15%] left-[8%] flex flex-col z-[1]'>
            <p className='text-[#000000] text-[20px] font-[400]'>Total Order</p>
            <p className='text-[30px] text-[#000000] font-[600]'>{data.totalOrders}</p>
          </div>
          <img src={test3}  className='absolute right-0 bottom-0'></img>
        </div>
      </div>

      <div  className='bg-[#fff] mt-8 overflow-hidden rounded-lg shadow-md'>
        <SalesChart labels={label} series={series} title={"Orders"} />
      </div>
    </div>
  )
}

export default HomePage