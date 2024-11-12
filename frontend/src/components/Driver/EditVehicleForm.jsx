import React, { useState, useEffect } from 'react';

const EditVehicleForm = ({ vehicle, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    driver: '',
    type: '',
    capacity: '',
    vehicle_status: '',
    vehicle_number: ''
  });

  const [drivers, setDrivers] = useState([]);

  // Load the vehicle's current details for editing
  useEffect(() => {
    if (vehicle) {
      setFormData({
        driver: vehicle.driver,
        type: vehicle.type,
        capacity: vehicle.capacity,
        vehicle_status: vehicle.vehicle_status,
        vehicle_number: vehicle.vehicle_number
      });
    }
  }, [vehicle]);

  // Fetch drivers from backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/drivers/');
        const data = await response.json();
        setDrivers(data);
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
      const response = await fetch(`http://127.0.0.1:8000/api/update_vehicle/${vehicle.vehicle_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Vehicle updated successfully');
        onUpdate(formData);
        onClose();
      } else {
        alert('Failed to update vehicle');
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert('Error while updating vehicle');
    }
  };

  return (
    <div className="bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-lg p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit Vehicle</h1>
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
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default EditVehicleForm;
