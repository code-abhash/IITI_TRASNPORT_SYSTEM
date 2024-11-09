import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user', // default to 'user'
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError('');
    console.log(formData);
  };

  return (
    <>
      <div className="relative min-h-screen w-full bg-gray-900">
        {/* Navbar positioned above content */}
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* <img src={img2} alt="Background" className="object-cover w-full h-full" /> */}
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        {/* Signup Card Positioned Below Navbar */}
        <div className="relative z-10 flex justify-center items-center min-h-screen pt-32 p-4 md:px-0">
          <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  required
                />
              </div>
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

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  required
                />
              </div>

              {/* Password */}
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
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium">Confirm Password</label>
                <input
                  type={showCPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  required
                />
                <div
                  className="absolute right-3 top-9 cursor-pointer"
                  onClick={() => setShowCirmPassword(!showCPassword)}
                >
                  {showCPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">User Type</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                >
                  <option value="user" className="font-bold">--USER--</option>
                  <option value="driver">Driver</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                </select>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit Button */}
              <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
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
