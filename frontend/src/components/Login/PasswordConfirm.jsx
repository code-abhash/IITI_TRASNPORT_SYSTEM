import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const PasswordResetConfirm = () => {
   
    const [password, setPassword] = useState('');
    
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [message, setMessage] = useState('');
   
    const { username, token } = useParams();
   
    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
        e.preventDefault(); 

    
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
           
            const response = await api.post(`reset/${username}/${token}/`, { password });
        
            setMessage('Password has been reset successfully.');
           
            navigate('/login');
        } catch (error) {
           
            setMessage('Error resetting password.');
            console.error(error); 
        }
    };

    return (
        <div className="relative h-screen w-full">
            {/* <div className="fixed top-0 left-0 w-full z-20">
                <Navbar />
            </div> */}
            {/* <div className="absolute inset-0 z-0">
                <img src={img1} alt="Background" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black opacity-80"></div>
            </div> */}
            <div className="relative z-10 flex justify-center items-center h-full px-4 sm:px-6 lg:px-8">
                <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Set New Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 transition duration-150 ease-in-out"
                        >
                            Reset Password
                        </button>
                    </form>
                    {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>} 
                </div>
            </div>
          
        </div>
    );
};

export default PasswordResetConfirm;
