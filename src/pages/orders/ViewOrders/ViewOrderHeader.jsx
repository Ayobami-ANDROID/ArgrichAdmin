
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import UpdateOrderModal from '../UpdateOrderModal';



const ViewOrderHeader = ({id}) => {
    const [openModal, setOpenModal] = useState(false);
    const [activeLink, setActiveLink] = useState("users");
    const navigate = useNavigate()
    const links = [
        { name: 'user Details', value: 'users', path: `/get/order/${id}/` },
        { name: 'Order Items', value: 'kin', path: `/get/order/${id}/orders` },

      ];
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
    {openModal && <UpdateOrderModal id={id} func={() => setOpenModal(false)}  />}
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <button
          onClick={() => navigate('/order')}
          className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Pending Loan Details</h1>
      </div>
     <div>
        <button onClick={() => setOpenModal(true)} className='text-white btn bg-[#2A4F1A] hover:bg-[#005C2D]  hover:bg-primary rounded-[10px] px-5 py-2'> Edit</button>
     </div>
    </div>
    <nav className="flex space-x-1">
      {links.map((link) => (
        <Link
          key={link.value}
          to={link.path}
          onClick={() => setActiveLink(link.value)}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeLink === link.value
              ? 'text-white btn bg-[#2A4F1A] hover:bg-[#005C2D]  hover:bg-primary rounded-[10px] px-5 py-2  font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  </div>
  )
}

export default ViewOrderHeader