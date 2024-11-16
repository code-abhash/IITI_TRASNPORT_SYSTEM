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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Set New Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-sm"
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
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on input change
                            required // Make input field required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>} {/* Display message if present */}
            </div>
        </div>
    );
};

export default PasswordResetConfirm;