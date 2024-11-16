import React, { useState, useEffect } from 'react';
import api from '../../api'; // Import your api instance

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    driver: '',
    type: '',
    capacity: '',
    vehicle_status: '',
    vehicle_number: ''
  });

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await api.get('/drivers/'); // Use api.get instead of fetch
        setDrivers(response.data); // Assuming the data is in the response.data
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/add_vehicle/', formData); // Use api.post instead of fetch

      if (response.status === 201) { // 201 is commonly used for successful POST requests
        alert('Vehicle added successfully');
        setFormData({
          driver: '',
          type: '',
          capacity: '',
          vehicle_status: '',
          vehicle_number: ''
        });
        window.location.reload();
      } else {
        alert('Failed to add vehicle');
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert('Error while adding vehicle');
    }
  };

  return (
    <div className="bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-lg p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Add Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Driver</label>
          <select
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.driver_id} value={driver.driver_id}>
                {driver.driver_id} - {driver.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Enter vehicle type"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Enter vehicle capacity"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Vehicle Status</label>
          <input
            type="text"
            name="vehicle_status"
            value={formData.vehicle_status}
            onChange={handleChange}
            placeholder="Enter vehicle status"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Vehicle Number</label>
          <input
            type="text"
            name="vehicle_number"
            value={formData.vehicle_number}
            onChange={handleChange}
            placeholder="Enter vehicle number"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
