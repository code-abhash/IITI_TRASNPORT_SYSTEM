import React, { useState } from 'react';
import axios from 'axios';
import api from '../../api';

const PasswordResetRequest = () => {
    // State to store the username input value
    const [username, setUsername] = useState('');
    // State to store success or error message
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Send POST request to API for password reset
            await api.post('password_reset/', { username });
            // Set success message if request is successful
            setMessage('Password reset email sent.');
        } catch (error) {
            // Set error message if request fails
            setMessage('Error sending password reset email.');
            console.error(error); // Log error to console
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                            required // Make input field required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
                    >
                        Send Password Reset Email
                    </button>
                </form>
                {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>} {/* Display message if present */}
            </div>
        </div>
    );
};

export default PasswordResetRequest;