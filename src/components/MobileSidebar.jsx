import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MENU_ITEMS } from '../common/MenuItem';
import logo from '../assets/Argrich Logo Full 00.png'

const MobileSidebar = ({ isOpen, tog }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const sidebarRef = useRef(null);

  const toggleDropdown = (key) => {
    setOpenDropdown(prevOpen => prevOpen === key ? null : key);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        tog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, tog]);

  const handleLinkClick = () => {
    tog();
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.url;
    const activeClass = isActive ? "bg-[#F5FFF9] py-2 px-2 text-[#2A4F1A] rounded-lg font-semibold" : 'text-white  hover:bg-[#F5FFF9] hover:text-[#2A4F1A] py-2 px-2 rounded-lg'
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openDropdown === item.key;

    return (
      <li key={item.key} className="mb-4">
        {hasChildren ? (
          <div>
            <button 
              onClick={() => toggleDropdown(item.key)} 
              className={`flex items-center justify-between w-full ${activeClass}`}
            >
              <span className="flex items-center">
                {item.icon && <item.icon className="mr-2" size={18} />}
                <span className='mr-1'>{item.label}</span>
              </span>
              {isOpen ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}
            </button>
            {isOpen && (
              <ul className="ml-4 mt-2">
                {item.children.map(renderMenuItem)}
              </ul>
            )}
          </div>
        ) : (
          <Link 
            to={item.url} 
            className={`flex items-center ${activeClass}`}
            onClick={handleLinkClick}
          >
            {item.icon && <item.icon className="mr-2" size={18} />}
            <span>{item.label}</span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black lg:bg-none lg:bg-opacity-0   bg-opacity-50 z-[999]" onClick={tog}></div>
      )}
      <div 
        ref={sidebarRef}
        className={`
          duration-300 sidebar h-screen bg-[#005C2D] overflow-auto flex flex-col leading-normal text-white w-[80%] md:w-[45%] lg:h-[100vh] px-[20px] py-[20px] fixed top-0 ${isOpen ? 'left-0' : 'left-[-100%]'} z-[1000] no-scrollbar lg:hidden
        `}
      >
        <div>
          <img src={logo} className='mb-4' alt="logo" />
        </div>
        
        <nav className="mt-5">
          <ul>
            {MENU_ITEMS.map(renderMenuItem)}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;