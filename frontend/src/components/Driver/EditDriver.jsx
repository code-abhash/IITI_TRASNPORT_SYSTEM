import React, { useState, useEffect } from 'react';
import api from '../../api'; 

const EditDriverForm = ({ driver, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone_no: '',
  });

  useEffect(() => {
    setFormData({
      name: driver.name,
      phone_no: driver.phone_no,
    });
  }, [driver]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/drivers/update/${driver.driver_id}/`, formData); 

      if (response.status === 200) { 
        alert('Driver updated successfully');
        onClose();
        window.location.reload();
      } 
      else {
        alert('Failed to update driver');
      }
    } catch (error) {
      console.error("Error updating driver:", error);
      alert('Error while updating driver');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Driver</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
        >
          Update Driver
        </button>
      </form>
    </div>
  );
};

export default EditDriverForm;
