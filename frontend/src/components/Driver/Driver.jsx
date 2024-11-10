import React, { useState } from 'react';

const AddDriverForm = () => {
  const [formData, setFormData] = useState({
    user: '',
    phone_no: '',
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
      const response = await fetch('/api/drivers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Driver added successfully');
        setFormData({
          user: '',
          phone_no: '',
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
    <div>
      <h1>Add New Driver</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            placeholder="Enter user ID"
            required
          />
        </div>
        <div>
          <label htmlFor="phone_no">Phone Number</label>
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        <button type="submit">Add Driver</button>
      </form>
    </div>
  );
};

export default AddDriverForm;
