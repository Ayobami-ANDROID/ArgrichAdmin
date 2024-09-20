import {useState} from 'react'
import Navbar from './Navbar'
import HomePage from '../pages/HomePage'
import GetAllProduct from '../pages/Products/GetAllProduct';
import UpdateProduct from '../pages/Products/UpdateProduct';
import AddProduct from '../pages/Products/AddProduct';
import GetAllCategories from '../pages/categories/getAllCategories';
import UpdateCategory from '../pages/categories/UpdateCategory';
import AddCategory from '../pages/categories/AddCategory';
import GetAllCustomer from '../pages/Customer/GetAllCustomer';
import GetAllStaff from '../pages/staff/GetAllStaff';
import UpdateStaff from '../pages/staff/UpdateStaff';
import AddStaff from '../pages/staff/AddStaff';
import {  Routes, Route, Navigate } from 'react-router-dom';



const RightSide = ({isOpen, tog}) => {
  
  console.log(isOpen)
  return (
    <>
      
      <div className={ ` ml-0  w-full flex flex-col bg-[#F5FFF9]  min-h-screen overflow-hidden   `}>
      <div className=' w-full top-0   '>
      <Navbar isOpen={isOpen} tog={tog} />
      {isOpen && <MobileSidebar isOpen={isOpen} tog={tog} />}
      </div>
      
      <div className='lg:p-6 p-2'>
       
          
      <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path="/product" element={<GetAllProduct/>}></Route>
            <Route path="/add/product" element={<AddProduct/>}></Route>
            <Route path="/product/update/:id" element={<UpdateProduct/>}></Route>
            <Route path="/category" element={<GetAllCategories/>}></Route>
            <Route path="/category/update/:category" element={<UpdateCategory/>}></Route>
            <Route path="/category/add" element={<AddCategory/>}></Route>
            <Route path="/customer" element={<GetAllCustomer/>}></Route>
            <Route path="/staff" element={<GetAllStaff/>}></Route>
            <Route path="/staff/update/:id" element={<UpdateStaff/>}></Route>
            <Route path="/add/staff" element={<AddStaff/>}></Route>
          </Routes>
        
      </div>
    </div>
    </>
  
  )
}

export default RightSide