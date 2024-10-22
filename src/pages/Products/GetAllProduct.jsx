import React, { useEffect, useState } from 'react';
import { PulseLoader } from "react-spinners";
import { BiSearch } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoFilter } from "react-icons/io5";
import { getProducts, productReset, deleteProduct } from '../../features/product/productSlice';
import Modal from './Modal';

const GetAllProduct = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    let idCounter = limit * (offset -1) + 1

    const close = () => {
        setOpenModal(false)
    }

   



    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, products } = useSelector((state) => state.product);
 

    useEffect(() => {
        const fetchProduct = async () => {
            dispatch(productReset());
            try {
              const display =  await dispatch(getProducts({page_size:limit, page:offset})).unwrap();
             
              setTotalPages(Math.ceil(display.count/limit))
              
            } catch (error) {
                
            }
        };

        fetchProduct();
    }, [dispatch,offset,limit]);

    const goToNextPage = () => {
        setOffset((prevPage) => prevPage + 1)
      }
    
      const goToPreviousPage = () => {
        setOffset((prevPage) => prevPage - 1)
      }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    function trimText(text) {
        if (text === null) {
            return '';
        }
        return text.length > 10 ? text.substring(0, 10) + '...' : text;
    }

    useEffect(() => {
        if (!products.results) return;
        

        const filtered = searchQuery.trim() === ''
            ? products.results
            : products.results.filter((product) =>
                product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFilteredProducts(filtered);
    }, [searchQuery, products]);



    return (
        <div className='flex flex-col'>
            {isLoading && (
                <div className="fixed bg-black/[0.6] h-screen w-screen z-50 left-0 top-0 items-center flex justify-center">
                    <PulseLoader speedMultiplier={0.9} color="#fff" size={20} />
                </div>
            )}



            <div className='bg-[#fff] mt-4 shadow-md overflow-hidden p-4 rounded-[10px]'>
            {openModal && (<Modal func={close} id={selectedProductId} />) }
                <div className='flex justify-between mb-4'>
                    <div className="flex border-2 bg-[#fff] p-2 rounded-lg px-4 items-center">
                        <div className='mr-2 text-gray-500'>
                            <BiSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, description, or category"
                            value={searchQuery}
                            className="bg-inherit rounded-md outline-none"
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <div>
                        <Link to="/add/product" className='text-white btn bg-[#2A4F1A] hover:bg-[#005C2D] hover:bg-primary rounded-[10px] px-5 py-2'>Add Product</Link>
                    </div>
                </div>

                <div className="overflow-x-scroll no-scrollbar">
                    <div className="min-w-full inline-block align-middle">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-50 text-[#667085] font-[500]">
                                <tr>
                                    <th className="px-4 py-4 text-start text-sm whitespace-nowrap">#</th>
                                    <th className="px-4 py-4 text-start text-sm whitespace-nowrap">Name</th>
                                    <th className="px-4 py-4 text-start text-sm whitespace-nowrap">Price</th>
                                    <th className="px-4 py-4 text-start text-sm whitespace-nowrap">Category</th>
                                    <th className="px-4 py-4 text-start text-sm whitespace-nowrap">Description</th>
                                    <th className="px-4 py-4 text-start text-sm whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {filteredProducts.map((product, idx) => (
                                    <>
                                       

                                        <tr key={product.id} className="bg-[#fff] text-[#667085]">

                                            <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">{idCounter++}</td>
                                            <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">{product.name}</td>
                                            <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">{product.price}</td>
                                            <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">{product.category}</td>
                                            <td className="px-4 py-4 text-start text-sm font-medium whitespace-nowrap">{trimText(product.description)}</td>
                                            <td>
                                                <div className='flex'>
                                                    <Link to={`/product/update/${product.id}`} className="text-[rgb(42,79,26)] hover:text-[#2A4F1A] mr-4">
                                                        <FaPen size={'1.5em'} />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            setOpenModal(true)
                                                            setSelectedProductId(product.id)
                                                            
                                                        }}
                                                        className="text-[#A30D11] hover:text-[#A30D11]/[0.7]"
                                                    >
                                                        <MdDelete size={'1.5em'} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>


                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-between p-4'>
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
                            className={`ml-2 ${offset  === totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                                }`}
                            onClick={goToNextPage}
                            // disabled={currentPage === totalPages}
                            disabled={offset  === totalPages}
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
                </div>
            </div>
            
        </div>
    );
};

export default GetAllProduct;