import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email_id: '',
    password: '',
    cnf_password: '',
    user_type: 'user'
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const notyf = new Notyf(); // Fix: Notyf should be instantiated as a new object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (formData.password !== formData.cnf_password) {
      setError("Passwords do not match!");
      return;
    }
    setError('');

    try {
      // Send a POST request to the backend API for registration
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email_id: formData.email_id,
        password: formData.password,
        user_type: formData.user_type,
        cnf_password: formData.cnf_password,
      });

      // On success, show a notification and redirect to login page
      notyf.success('Registration Successful');
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed. Please try again.");
      notyf.error("Registration error");
    }
  };

  return (
    <>
      <div className="relative min-h-screen w-full bg-gray-900">
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <div className="relative z-10 flex justify-center items-center min-h-screen pt-32 p-4 md:px-0">
          <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div>
                <label className="block text-gray-700 font-medium">First Name</label>
                <input 
                  type="text" 
                  name="first_name" 
                  value={formData.first_name} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-2 border border-gray-300 rounded" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Last Name</label>
                <input 
                  type="text" 
                  name="last_name" 
                  value={formData.last_name} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-2 border border-gray-300 rounded" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-2 border border-gray-300 rounded" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input 
                  type="email" 
                  name="email_id" 
                  value={formData.email_id} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-2 border border-gray-300 rounded" 
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium">Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-2 border border-gray-300 rounded" 
                />
                <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium">Confirm Password</label>
                <input 
                  type={showCPassword ? 'text' : 'password'} 
                  name="cnf_password" 
                  value={formData.cnf_password} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-2 border border-gray-300 rounded" 
                />
                <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowCPassword(!showCPassword)}>
                  <FontAwesomeIcon icon={showCPassword ? faEyeSlash : faEye} />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">User Type</label>
                <select 
                  name="user_type" 
                  value={formData.user_type} 
                  onChange={handleChange} 
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                type="submit" 
                className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
              Already have an account? <a href="/login" className="text-blue-500">Log in</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
