import React, { useState } from 'react';

const AddDriverForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_no: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/add_driver/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Driver added successfully');
        setFormData({
          name: '',
          phone_no: ''
        });
      } else {
        alert('Failed to add driver');
      }
    } catch (error) {
      console.error(error);
      alert('Error while adding driver');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Driver</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter driver's name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
        >
          Add Driver
        </button>
      </form>
    </div>
  );
};

export default AddDriverForm;