import React, { useState } from 'react'
import { UilTimes } from '@iconscout/react-unicons'
import apiClient from '../../App/axiosConfig'
import { toast } from 'react-toastify'


const UpdateOrderModal = ({ id, func,refresh }) => {
    const [isLoading, setisLoading] = useState(false)
    const [status, setSatus] = useState('')
    const [haspaid,setHasPaid] =useState(false)
    const[delivered,setDelivered] = useState(false)

    const orderUpdate = async () => {
        const body= {
            status:status,
            has_paid:haspaid,
            delivered: delivered
        }
        await apiClient.patch(`/adminuser/orders/${id}/`,body)
        .then((res)=> {
            toast.success(res.data.message)
            refresh()

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
            .finally(() => {
                setisLoading(false)
                func()
            })
    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white  p-4 rounded-lg  mx-auto">
                <div className="flex justify-between">
                    <div></div>
                    <button
                        type="button"
                        className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                        onClick={() => func()}
                    >
                        <span className="sr-only">Close</span>
                        <UilTimes size={24} />
                    </button>
                </div>

                <div className="flex flex-col text-center mt-5 text-[18px]">
                    <p className="uppercase mb-2 dark:text-gray-300">
                        Update Order Status,
                    </p>
                    {/* <p className="uppercase mb-2 dark:text-gray-300">
          the status change will be irreversible
        </p> */}
                </div>

                <div className="flex mb-2 mt-2 items-center">
                    <label className="font-semibold mr-4">Status</label>
                    <select
                        value={status}
                        onChange={(e) => {
                            setSatus(e.target.value)
                        }}
                        className=" rounded-[10px] border-2 p-2 w-full"
                    >
                        <option value="">Select User Type</option>
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
                        \  <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="flex mb-2 mt-2 items-center">
                    <label className="font-semibold mr-4">has paid</label>
                    <input
                        type="checkbox"
                        className="mr-4 h-5 w-5"
                        checked={haspaid}
                        onChange={() => setHasPaid(!haspaid)}
                        style={{ accentColor: 'rgba(0, 138, 47, 1)' }}
                    />
                </div>

                <div className="flex mb-2 mt-2 items-center">
                    <label className="font-semibold mr-4">Delivered</label>
                    <input
                        type="checkbox"
                        className="mr-4 h-5 w-5"
                        checked={delivered}
                        onChange={() => setDelivered(!delivered)}
                        style={{ accentColor: 'rgba(0, 138, 47, 1)' }}
                    />
                </div>
                {/* <label className="font-semibold">Comment</label> */}

                <div className="flex gap-4 justify-end mt-6 w-full">
                    <button onClick={() => func()} className='bg-red-500 text-white text-lg px-8 py-2 rounded-md hover:bg-red-500/[.57] transition-colors duration-300'>
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 text-white text-lg px-8 py-2 rounded-md hover:bg-green-500/[.57] transition-colors duration-300"
                        type="submit"
                      onClick={orderUpdate}
                    >

                        {isLoading ? 'loading...' : 'Update Order'}
                        {/* {loading ? 'loading...' : 'submit'} */}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrderModal