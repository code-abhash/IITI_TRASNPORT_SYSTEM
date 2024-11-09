import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import img1 from '../../assets/slide_pic_1.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for email format
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setError('');
    // Here you would typically send a request to the backend to handle the password reset
    // For now, simulate a successful request:
    setSuccessMessage('If the email exists, you will receive a password reset link shortly.');
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

      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="text-blue-500">
              Log in
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
