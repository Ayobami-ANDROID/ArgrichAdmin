import React from 'react'
import { UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from "react-redux";
import { getProducts, productReset, deleteProduct } from '../../features/product/productSlice';
import { deleteCategory, getCategory } from '../../features/category/categorySlice';

const Modal = ({ func, id }) => {
  const dispatch = useDispatch();
  const { isLoading, categories } = useSelector((state) => state.category);


  const handleDeleteCategory = async () => {
    try {
        await dispatch(deleteCategory(id)).unwrap();
        await dispatch(getCategory()).unwrap();
        func()
    } catch (error) {
        console.error("Error deleting product:", error);
        // You might want to show an error message to the user here
    }
};
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-4 rounded-lg  mx-auto">
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
            By clicking this button,
          </p>
          <p className="uppercase mb-2 dark:text-gray-300">
            the status change will be irreversible
          </p>
        </div>

        <div className="flex mb-2 mt-2">
          {/* <label className="font-semibold">Status</label> */}
          {/* <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
          }}
          className=" rounded-[10px] w-full"
        >
          <option value="">Select User Type</option>
          <option value="Approve">Approve</option>
          <option value="Reject">Reject</option>
        </select> */}
        </div>
        {/* <label className="font-semibold">Comment</label> */}

        <div className="flex gap-4 justify-end mt-6 w-full">
          <button onClick={() => func()} className='bg-red-500 text-white text-lg px-8 py-2 rounded-md hover:bg-red-500/[.57] transition-colors duration-300'>
            Cancel
          </button>
          <button
            className="bg-red-500 text-white text-lg px-8 py-2 rounded-md hover:bg-red-500/[.57] transition-colors duration-300"
            type="submit"
            onClick={handleDeleteCategory}
          >

            {isLoading ? 'loading...' : 'Delete'}
            {/* {loading ? 'loading...' : 'submit'} */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal