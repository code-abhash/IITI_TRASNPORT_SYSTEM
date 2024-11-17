import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/iiti_logo.png';
import { AuthContext } from '../PrivateRoutes/AuthProvider'; 
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const isSuperuser = localStorage.getItem('is_superuser') === 'true';
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="h-24 w-full bg-gray-900 flex items-center justify-between px-8">
      <div className="flex items-center">
        <NavLink to="/">
          <img src={logo} className="h-16 w-4/5 md:w-full" alt="IITI Logo" />
        </NavLink>
      </div>
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex space-x-8 mr-12 text-lg font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline')}
        >
          Home
        </NavLink>
        <NavLink
              to="/rent"
              className={({ isActive }) => (isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline')}
            >
              Rates
            </NavLink>
        {isAuthenticated ? (
          <>
            
            {!isSuperuser && (
              <NavLink
                to="/bookings"
                className={({ isActive }) => (isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline')}
              >
                Bookings
              </NavLink>
            )}
           
            
            {/* <NavLink
              to="/rent"
              className={({ isActive }) => (isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline')}
            >
              Rates
            </NavLink> */}
            <NavLink
              to={isSuperuser ? '/admin' : '/profile'}
              className={({ isActive }) => (isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline')}
            >
              {isSuperuser ? 'Admin' : 'My Profile'}
            </NavLink>
            <button className="bg-red-700 text-white text-md hover:bg-red-800 p-1 rounded-md" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'text-gray-400 font-bold' : 'bg-gray-900 text-white hover:underline')}
          >
            <button className="bg-red-700 text-white text-md hover:bg-red-800 p-1 rounded-md">
              Login
            </button>
          </NavLink>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-24 right-8 w-48 bg-gray-900 text-white rounded-md shadow-lg md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <NavLink to="/" className="hover:underline text-left">Home</NavLink>
            <NavLink to="/rent" className="hover:underline text-left">Rates</NavLink>
            
            {isAuthenticated ? (
              <>
                {!isSuperuser && (
                  <NavLink to="/bookings" className="hover:underline text-left">Bookings</NavLink>
                )}
                
               
                <NavLink to={isSuperuser ? '/admin' : '/profile'} className="hover:underline text-left">
                  {isSuperuser ? 'Admin' : 'My Profile'}
                </NavLink>
                <button className="bg-red-700 hover:bg-red-800 p-1 rounded-md text-left" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <NavLink to="/login" className="hover:underline text-left">Log In</NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
