import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/iiti_logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change this to manage login state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="h-24 w-full bg-gray-900 flex items-center justify-between px-8">
      <div className="flex items-center">
        <img src={logo} className="h-16 w-4/5 md:w-full" alt="IITI Logo" />
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-8 mr-12 text-lg font-semibold">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              Home
            </NavLink>
            <NavLink
              to="/bookings"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              Bookings
            </NavLink>
            <NavLink
              to="/rent"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              Rates
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              My profile
            </NavLink>
            <button className="bg-red-700 text-white text-md hover:bg-red-800 p-1 rounded-md" onClick={handleLogin}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              Home
            </NavLink>
            <NavLink
              to="/rent"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              Rates
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline'}
            >
              Signup
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu (Collapsible) */}
      {isOpen && (
        <div className="absolute top-24 right-8 w-48 bg-gray-900 text-white rounded-md shadow-lg md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            {isLoggedIn ? (
              <>
                <NavLink to="/" className="hover:underline text-left">Home</NavLink>
                <NavLink to="/bookings" className="hover:underline text-left">Bookings</NavLink>
                <NavLink to="/rent" className="hover:underline text-left">Rates</NavLink>
                <NavLink to="/profile" className="hover:underline text-left">My profile</NavLink>
                <button className="bg-red-700 hover:bg-red-800 p-1 rounded-md text-left" onClick={handleLogin}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" className="hover:underline text-left">Home</NavLink>
                <NavLink to="/rent" className="hover:underline text-left">Rates</NavLink>
                <NavLink to="/login" className="hover:underline text-left">Login</NavLink>
                <NavLink to="/signup" className="hover:underline text-left">Signup</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
