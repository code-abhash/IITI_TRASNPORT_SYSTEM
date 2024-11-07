import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import img2 from '../../assets/slide_pic_2.jpg';

function Register() {
  return (
    <div className="relative h-screen w-full">
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={img2} alt="Background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-1/3 max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500" />
            </div>
            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">Sign Up</button>
          </form>
          <p className="text-center mt-4 text-gray-600">Already have an account? <a href="/login" className="text-blue-500">Log in</a></p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
