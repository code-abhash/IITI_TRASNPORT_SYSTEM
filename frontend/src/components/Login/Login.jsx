import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import img1 from '../../assets/slide_pic_1.png';
import { AuthContext } from '../PrivateRoutes/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notyf = new Notyf();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: formData.username,
        password: formData.password
      });
      
      const { access, refresh } = response.data;  
      localStorage.setItem('token', access);     
      localStorage.setItem('refresh_token', refresh);  
      setIsAuthenticated(true); 
      notyf.success('Login Successful')
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
      toast.error(err.response?.data?.detail || "Login failed. Please try again.");
      notyf.error('Login Failed')
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>
      <div className="absolute inset-0 z-0">
        <img src={img1} alt="Background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>
      <div className="relative z-10 flex justify-center items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                required
              />
              <div
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
          <p className="text-center mt-2 text-gray-600">
            <a href="/password_reset" className="text-blue-500">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>

      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
