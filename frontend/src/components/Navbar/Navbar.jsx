import React, { useState } from 'react';
import logo from '../../assets/iiti_logo.png';
import { Link } from 'react-router-dom';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change this to manage login state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='h-24 w-full bg-gray-900 flex items-center justify-between px-8'>
      <div className='flex items-center'>
        <img src={logo} className='h-16 w-4/5 md:w-full' alt="IITI Logo" />
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className='hidden md:flex space-x-8 mr-12 text-lg font-semibold'>
        {isLoggedIn ? (
          <>
            <Link className='bg-gray-900 text-white hover:underline'>Home</Link>
            <Link className='bg-gray-900 text-white hover:underline'>Bookings</Link>
            <Link className='bg-gray-900 text-white hover:underline'>Rates</Link>
            <Link className='bg-gray-900 text-white hover:underline'>My profile</Link>
            <Link className='bg-red-700 text-white text-md hover:bg-red-800 p-1 rounded-md'>Log out</Link>
          </>
        ) : (
          <>
            <Link className='bg-gray-900 text-white hover:underline'>Home</Link>
            <Link className='bg-gray-900 text-white hover:underline'>Rates</Link>
            <Link className='bg-gray-900 text-white hover:underline'>Login</Link>
            <Link className='bg-gray-900 text-white hover:underline'>Signup</Link>
          </>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-24 right-8 w-48 bg-gray-900 text-white rounded-md shadow-lg md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            {isLoggedIn ? (
              <>
                <button className='hover:underline text-left'>Home</button>
                <button className='hover:underline text-left'>Bookings</button>
                <button className='hover:underline text-left'>Rates</button>
                <button className='hover:underline text-left'>My profile</button>
                <button className='bg-red-700 hover:bg-red-800 p-1 rounded-md text-left'>Log out</button>
              </>
            ) : (
              <>
                <button className='bg-gray-900 text-white hover:underline'>Home</button>
                <button className='bg-gray-900 text-white hover:underline'>Rates</button>
                <button className='hover:underline text-left'>Login</button>
                <button className='hover:underline text-left'>Signup</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;