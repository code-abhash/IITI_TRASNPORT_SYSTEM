import React, { useState } from 'react';

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    driver: '',
    type: '',
    capacity: '',
    vehicle_status: '',
    vehicle_number: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vehicles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Vehicle added successfully');
        setFormData({
          driver: '',
          type: '',
          capacity: '',
          vehicle_status: '',
          vehicle_number: '',
        });
      } else {
        alert('Failed to add vehicle');
      }
    } catch (error) {
      console.error(error);
      alert('Error while adding vehicle');
    }
  };

  return (
    <div>
      <h1>Add New Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="driver">Driver</label>
          <input
            type="text"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            placeholder="Enter driver ID"
            required
          />
        </div>
        <div>
          <label htmlFor="type">Vehicle Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Enter vehicle type"
            required
          />
        </div>
        <div>
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Enter vehicle capacity"
            required
          />
        </div>
        <div>
          <label htmlFor="vehicle_status">Vehicle Status</label>
          <input
            type="text"
            name="vehicle_status"
            value={formData.vehicle_status}
            onChange={handleChange}
            placeholder="Enter vehicle status"
            required
          />
        </div>
        <div>
          <label htmlFor="vehicle_number">Vehicle Number</label>
          <input
            type="text"
            name="vehicle_number"
            value={formData.vehicle_number}
            onChange={handleChange}
            placeholder="Enter vehicle number"
            required
          />
        </div>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
