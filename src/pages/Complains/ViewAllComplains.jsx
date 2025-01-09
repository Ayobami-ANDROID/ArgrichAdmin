import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiClient from '../../App/axiosConfig'
import { PulseLoader } from 'react-spinners'
import { ArrowLeft } from 'lucide-react'


const ViewAllComplains = () => {

    const [data, setData] = useState([])
    const { id } = useParams()
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = () => {
        setisLoading(true)
        apiClient.get(`/adminuser/customers/feedback/${id}/`)
            .then((res) => {
               
                setData(res.data)
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
            .finally(() => setisLoading(false))
    }


    const update = () => {

        const body = {
            resolved: true
        }
        setisLoading(true)
        apiClient.patch(`/adminuser/customers/feedback/${id}/`, body)
        then((res) => {
            toast.success(`Updated Successfully`)
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
        .finally(() => setisLoading(false))
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()} ${date.getFullYear().toString().slice(-2)}`;
    }

    return (
        <div className='bg-[#fff] rounded-[10px] shadow-lg overflow-hidden p-8 '>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}
            <div className='flex justify-between mb-8 '>
                <div className='flex'>
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className='font-[500] text-[25px]'>CUSTOMERS DETAILS</h1>
                </div>

                {data.resolved == true ? "" : (
                    <button onClick={update} className=' text-[12px] font-medium rounded-md  px-4 py-2 font-manrope text-[#ffff] bg-[#5d9f65]'>resolve</button>
                )}
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <div className="mb-4 ">
                    <h4 className=" mb-6 dark:text-gray-400 font-[500] text-[16px]   text-gray-500">
                        Name
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.user?.name}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-400 font-[500] text-[16px]   text-gray-500 ">
                        Email
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.user?.email}
                    </h4>
                </div>

                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-700 font-[500] text-[16px]   text-gray-500 ">
                        Message
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.message}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-700 font-[500] text-[16px]   text-gray-500 ">
                        Created At
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {formatDate(data?.created_at)}
                    </h4>
                </div>
                <div className="mb-4">
                    <h4 className=" mb-6 dark:text-gray-700 font-[500] text-[16px]   text-gray-500">
                        Resolved
                    </h4>
                    <h4 className=" font-bold mb-6 text-lg text-gray-500 dark:text-gray-400">
                        {data?.resolved?.toString()}
                    </h4>
                </div>

            </div>
        </div>
    )
}

export default ViewAllComplains