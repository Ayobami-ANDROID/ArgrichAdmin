import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { BiSearch } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import apiClient from '../../App/axiosConfig';
import Modal from './Modal';

const GetAllComplains = () => {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null);
    var idCounter = 1


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setisLoading(true)
        apiClient.get('/adminuser/customers/feedback/')
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

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const close = () => {
        setOpenModal(false)
    }

    

    function TrimText(text) {
        if (text === null) {
            return ''
        }
        const trimmedText = text.length > 30 ? text.substring(0, 30) + '...' : text
        return trimmedText
    }

    useEffect(() => {
        if (!data) return; // Guard clause to prevent errors if products is undefined

        if (searchQuery.trim() === '') {
            setFilteredProducts(data)
        } else {
            const filtered = data.filter((product) => {
                return (
                    data?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    data?.email?.name?.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setFilteredProducts(filtered)
        }
    }, [searchQuery, data])

    const onDeleteSuccess = () => {
        fetchData()
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()} ${date.getFullYear().toString().slice(-2)}`;
    }

    return (
        <div className='flex flex-col'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    {" "}
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}

            {openModal && (<Modal func={close} id={selectedProductId} onDeleteSuccess={onDeleteSuccess}/>)}



            <div className='bg-[#fff] mt-4  p-4 shadow-md overflow-hidden   rounded-[10px]'>


                <div className='flex justify-between mb-4'>

                    <div className="flex  border-2 bg-[#fff] p-2 rounded-lg px-4 items-center">
                        <div className=' mr-2 text-gray-500'>
                            <BiSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by email "
                            value={searchQuery}
                            className=" bg-inherit rounded-md outline-none"
                            onChange={handleSearchInputChange}
                        />
                    </div>

                    {/* <div>
        <Link to="/add/product" className='text-white btn bg-[#2A4F1A] hover:bg-[#005C2D]  hover:bg-primary rounded-[10px] px-5 py-2'>Add Product</Link>
    </div> */}
                </div>

                <div className="overflow-x-scroll no-scrollbar">
                    <div className="min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-x-scroll">

                                <thead className="bg-gray-50 text-[#667085] font-[500] ">
                                    <tr className=" ">
                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            #{' '}
                                        </th>

                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap">
                                            {' '}
                                            Customer Name{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            {' '}
                                            Customer Email{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            {' '}
                                            Complain Message{' '}
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            Complain Date
                                        </th>
                                        <th className="px-4 py-4 text-start text-sm whitespace-nowrap">
                                            Resolved
                                        </th>





                                        <th className="px-4 py-4 text-start text-sm  whitespace-nowrap"></th>

                                    </tr>
                                </thead>

                                {filteredProducts.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {filteredProducts.map((staff, idx) => (
                                            <tr
                                                key={idx}
                                                className="bg-[#fff] text-[#667085]"
                                            >
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {idCounter++}

                                                </td>

                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.user.name}
                                                </td>
                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {staff.user.email}
                                                </td>

                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {TrimText(staff.message)}
                                                </td>


                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    {formatDate(staff.created_at)}
                                                </td>


                                                <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">
                                                    <p className={`px-4 text-[12px] font-medium rounded-md py-2 w-full mx-auto max-w-[69px] font-manrope flex items-center justify-center ${staff.status === "Canceled" ? "text-[#fff] bg-[red]" :
                                                        staff.resolved === false ? "bg-[#FFB3B3] text-[#C50000]" :
                                                            staff.resolved === true ? "text-[#ffff] bg-[#5d9f65]" : ""
                                                        }`}>
                                                        {staff.resolved.toString()}
                                                    </p>
                                                </td>
                                                <td>
                                                    {/* <div className='flex'>

                                                <button
                                                    onClick={() => handleDelete(staff.id)}
                                                    className="text-[#A30D11] hover:text-[#A30D11]/[0.7]"
                                                >
                                                    <MdDelete size={'1.5em'} />
                                                </button>

                                            </div> */}
                                                    <div className='flex'>

                                                        <Link

                                                            to={`/get/complain/${staff.id}`}
                                                            className="text-[rgb(42,79,26)] hover:text-[#2A4F1A] mr-4"
                                                        >
                                                            <IoEyeSharp size={'1.5em'} />
                                                        </Link>

                                                        <button
                                                            onClick={() => {
                                                                setOpenModal(true)
                                                                setSelectedProductId(staff.id)

                                                            }}
                                                            className="text-[#A30D11] hover:text-[#A30D11]/[0.7]"
                                                        >
                                                            <MdDelete size={'1.5em'} />
                                                        </button>

                                                    </div>

                                                </td>








                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <p></p>
                                )}


                            </table>

                        </div>
                    </div>
                </div>

                {/* <div className='flex justify-between p-4'>
                    <div className="flex justify-between">
                        <div></div>
                        <div className='flex items-center justify-end rounded-[5px] border-2 p-2 my-4 mx-2'>
                            <div>
                                <IoFilter />
                            </div>
                            <select
                                value={limit}
                                onChange={(e) => setLimit(parseInt(e.target.value))}
                                className='outline-none'
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>

                    </div>
                    <div className="flex justify-end items-center">
                        <button
                            className={`mr-2 ${offset === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                                }`}
                            // onClick={() => onPageChange(currentPage - 1)}
                            onClick={goToPreviousPage}
                            disabled={offset === 1}
                        >
                            <svg
                                className="w-6 h-6 inline-block align-middle"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Prev
                        </button>
                        <div>
                            {offset} of {totalPages}
                        </div>
                        <button
                            className={`ml-2 ${offset === totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                                }`}
                            onClick={goToNextPage}
                            // disabled={currentPage === totalPages}
                            disabled={offset === totalPages}
                        >
                            Next
                            <svg
                                className="w-6 h-6 inline-block align-middle"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div> */}

                {/* <div className='flex justify-between p-4'>
<div className="flex justify-between">
<div></div>
<div className='flex items-center justify-end rounded-[5px] border-2 p-2 my-4 mx-2'>
    <div>
        <IoFilter />
    </div>
    <select
        value={pagesize}
        onChange={(e) => SetPageSize(parseInt(e.target.value))}
        className='outline-none'
    >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="50">50</option>
    </select>
</div>

</div>
<div className="flex justify-end items-center">
<button
    className={`mr-2 ${pageNumber === 0
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer'
        }`}
    // onClick={() => onPageChange(currentPage - 1)}
    onClick={handlePreviousPage}
    disabled={pageNumber === 0}
>
    <svg
        className="w-6 h-6 inline-block align-middle"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
        />
    </svg>
    Prev
</button>
<div>
    {pageNumber + 1} of {totalPages}
</div>
<button
    className={`ml-2 ${pageNumber + 1 === totalPages
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer'
        }`}
    onClick={handleNextPage}
    // disabled={currentPage === totalPages}
    disabled={pageNumber + 1 === totalPages}
>
    Next
    <svg
        className="w-6 h-6 inline-block align-middle"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
        />
    </svg>
</button>
</div>
</div> */}





            </div>


        </div>
    )
}

export default GetAllComplains