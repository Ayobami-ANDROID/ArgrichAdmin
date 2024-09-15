import { useState } from 'react'
import Login from './pages/Login'
import Layout from './components/Layout'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import TransactionTable from './components/Admin';


function App() {


  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />



      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>

    </>
  )
}

export default App
