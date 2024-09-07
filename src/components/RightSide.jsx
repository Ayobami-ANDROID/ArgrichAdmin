import {useState} from 'react'
import Navbar from './Navbar'
import HomePage from '../pages/HomePage'
import GetAllProduct from '../pages/Products/GetAllProduct';
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
          </Routes>
        
      </div>
    </div>
    </>
  
  )
}

export default RightSide