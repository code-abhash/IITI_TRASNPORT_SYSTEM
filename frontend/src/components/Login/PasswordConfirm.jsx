import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const PasswordResetConfirm = () => {
    // State to store the new password input value
    const [password, setPassword] = useState('');
    // State to store the confirm password input value
    const [confirmPassword, setConfirmPassword] = useState('');
    // State to store success or error message
    const [message, setMessage] = useState('');
    // Extracting username and token from URL parameters
    const { username, token } = useParams();
    // Navigation hook to redirect after successful password reset
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            // Send POST request to API for password reset
            const response = await api.post(`reset/${username}/${token}/`, { password });
            // Set success message if request is successful
            setMessage('Password has been reset successfully.');
            // Redirect to login page after successful reset
            navigate('/login');
        } catch (error) {
            // Set error message if request fails
            setMessage('Error resetting password.');
            console.error(error); // Log error to console
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
                                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                                required // Make input field required
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
                                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on input change
                                required // Make input field required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 transition duration-150 ease-in-out"
                        >
                            Reset Password
                        </button>
                    </form>
                    {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>} {/* Display message if present */}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default PasswordResetConfirm;
