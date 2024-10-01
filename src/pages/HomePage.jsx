import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const [customer, setCustomers] = useState([])

  const label = ["Delivered Orders", "UnDelivered Orders"]
  const series = [data.deliveredOrders, data.undeliveredOrders]

  useEffect(() => {
    setisLoading(true)
    fetchData()
    fetchData2()
  }, [])

  const fetchData = async () => {
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
  }


  const fetchData2 = async () => {
    apiClient.get(`/adminuser/customers/?limit=10&offset=0`)
      .then((res) => {
        console.log(res.data)
        setCustomers(res.data.results)
        // const result = res.data.count
        // setTotalPages(Math.ceil(result/limit))
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
  }
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
          <img src={test1} className='absolute right-0 bottom-0'></img>
        </div>
        <div className={`bg-[#fff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)] text-white relative`}>
          <div className='absolute top-[15%] left-[8%] flex flex-col z-[1]'>
            <p className='text-[#000000] text-[20px] font-[400]'>Total Product</p>
            <p className='text-[30px] text-[#000000] font-[600]'>{data.totalProducts}</p>
          </div>
          <img src={test2} className='absolute right-0 bottom-0'></img>
        </div>
        <div className={`bg-[#fff] lg:w-[300px] sm:w-[200px] h-[150px] rounded-[10px] overflow-hidden shadow-[0px_1px_7.2px_-2px_rgba(0,_0,_0,_0.25)] text-white relative`}>
          <div className='absolute top-[15%] left-[8%] flex flex-col z-[1]'>
            <p className='text-[#000000] text-[20px] font-[400]'>Total Order</p>
            <p className='text-[30px] text-[#000000] font-[600]'>{data.totalOrders}</p>
          </div>
          <img src={test3} className='absolute right-0 bottom-0'></img>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6 mt-8'>
        <div className='bg-[#fff]  overflow-hidden rounded-lg shadow-md'>
          <SalesChart labels={label} series={series} title={"Orders"} />
        </div>
        <div className=" col-span-2 h-full w-full bg-[#fff] p-4 rounded-lg shadow-md ">
          <div className>
            <table className="h-full w-full">
              <thead className="bg-gray-100">
                <tr className="border-b">
                  <th className="px-4 py-4 text-start text-sm font-bold text-[#000]">#</th>
                  <th className="px-4 py-4 text-start text-sm font-bold text-[#000]">First Name</th>
                  <th className="px-4 py-4 text-start text-sm font-bold text-[#000]">Last Name</th>
                </tr>
              </thead>
              <tbody>

                {customer.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-4 py-4 text-start font-semibold text-gray-400 dark:text-gray-400 text-[.9rem] items-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-start font-semibold text-gray-400 dark:text-gray-400 text-[.9rem] items-center">
                      {data.name}
                    </td>
                    <td className="px-4 py-4 text-start font-semibold text-gray-400 dark:text-gray-400 text-[.9rem] items-center">
                      {data.email}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>
          <div className='mt-4'>
            <Link
              to="/ui/customer/customer-date"
              className="py-2  text-white font-light tracking-wide bg-[#072D56] rounded-md px-4"
            >
              View More
            </Link>
          </div>

        </div>
      </div>




    </div>
  )
}

export default HomePage