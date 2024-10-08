import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MENU_ITEMS } from '../common/MenuItem';
import logo from '../assets/Argrich Logo Full 00.png'

const Sidebar = ({ isOpen, tog }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastActiveRoute, setLastActiveRoute] = useState(null);



  const toggleDropdown = (key) => {
    setOpenDropdown(prevOpen => prevOpen === key ? null : key);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.url;
    const isParentOfActive = item.children && item.children.some(child => location.pathname === child.url);
    // if (isActive || isParentOfActive) {
    //   setLastActiveRoute(item.url);
    // }
    const activeClass = isActive || isParentOfActive ? "bg-[#F5FFF9] py-2 px-2 text-[#2A4F1A] rounded-lg font-semibold" : 'text-white  hover:bg-[#F5FFF9] hover:text-[#2A4F1A] py-2 px-2 rounded-lg'
    const hasChildren = item.children && item.children.length > 0;
    const Open = openDropdown === item.key;

    

    return (
      <li key={item.key} className={`mb-4 `}>
        {hasChildren ? (
          <div>
            <button
              onClick={() => toggleDropdown(item.key)}
              className={`flex items-center justify-between w-full px-4  rounded-lg transition-colors duration-200 ${activeClass}`}
            >
              <span className="flex items-center">
                {item.icon && <item.icon className="mr-2" size={18} />}
                <span className={`  'block mr-1 '`}>{item.label}</span>
              </span>
              {Open ? <IoChevronUp size={16} className={`  block}`} /> : <IoChevronDown size={16} className={` block`} />}
            </button>
            {/* {Open && (
              <ul className="ml-10 mt-2">
                {item.children.map(renderMenuItem)}
              </ul>
            )} */}
            {Open && (
              <ul className="mt-1 ml-12 space-y-1">
                {item.children.map(child => {
                  const isChildActive = location.pathname === child.url;
                  const childActiveClass = isChildActive ? " text-blue-700 font-semibold" : 'text-gray-600  hover:text-blue-600';
                  return (
                    <li key={child.key}>
                      <Link to={child.url} className={`flex items-center mb-2 ${childActiveClass}`}>
                        {child.icon && <child.icon className="mr-2" size={18} />}
                        <span className={` block mr-1 text-black-400`}>{child.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <Link to={item.url} className={`flex items-center ${activeClass} px-4 `}>
            {item.icon && <item.icon className="mr-2" size={18} />}
            <span className={` block mr-1`}>{item.label}</span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <div className={` w-64  bg-[#005C2D]   h-screen overflow-y-auto fixed lg:flex flex-col  shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]   no-scrollbar   hidden`}>
      <div className='px-4 pt-2' >
        <img src={logo} className='mb-4 '></img>
      </div>

      <nav className="mt-5">
        <ul>
          {MENU_ITEMS.map(renderMenuItem)}
        </ul>
      </nav>

      
    </div>
  );
};

export default Sidebar;