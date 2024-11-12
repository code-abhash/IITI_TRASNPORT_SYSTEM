import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import img2 from '../../assets/slide_pic_2.jpg';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import { useNavigate } from 'react-router-dom';

function BookingForm() {
  // Define states for each form section
  const navigate=useNavigate();
  const token = localStorage.getItem('token');
  const [personalDetails, setPersonalDetails] = useState({
    name_user: '',
    type_of_booking: '',
    contact_number: '',
    any_specific_details: ''
  });
  const notyf = new Notyf();
  
  const [arrivalDetails, setArrivalDetails] = useState({
    date: '',
    time: '',
    pickup_location: '',
    drop_off_location: '',
    type_of_vehicle: ''
  });

  const [departureDetails, setDepartureDetails] = useState({
    date: '',
    time: '',
    pickup_location: '',
    drop_off_location: '',
    type_of_vehicle: ''
  });

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrivalDetailsChange = (e) => {
    const { name, value } = e.target;
    setArrivalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartureDetailsChange = (e) => {
    const { name, value } = e.target;
    setDepartureDetails((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   setPersonalDetails((prev) => ({ ...prev, source_of_funding: e.target.files[0] }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build the form data for sending file
    const bookingData = {
      booking: personalDetails,
      arrival_details: arrivalDetails,
      departure_details: departureDetails
    };

    console.log(bookingData)
    // if (personalDetails.source_of_funding) {
    //   formData.append('source_of_funding', personalDetails.source_of_funding);
    // }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookings/', bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Booking created:', response.data);
      notyf.success('Booking COnfirmed')
      setTimeout(() => {
        navigate('/profile')
      }, 1000);
    } catch (error) {
      console.error('Error creating booking:', error.response?.data);
      notyf.error('Booking failed',error)
    }
  };

  return (
    <>
      <div
        className="relative flex flex-col min-h-screen bg-gray-50"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-6">
          <h1 className="text-4xl font-bold text-white mb-10 mt-10">Book a Vehicle</h1>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
            {/* Personal Details Card */}
            <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Details</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name_user"
                  value={personalDetails.name_user}
                  onChange={handlePersonalDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your name"
                />
                <select
                  name="type_of_booking"
                  value={personalDetails.type_of_booking}
                  onChange={handlePersonalDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Booking Type</option>
                  <option value="Personal">Personal</option>
                  <option value="Official">Official</option>
                  <option value="Other">Other</option>
                </select>
                {/* <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                /> */}
                <input
                  type="text"
                  name="contact_number"
                  value={personalDetails.contact_number}
                  onChange={handlePersonalDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Contact Number"
                />
                <input
                  type="text"
                  name="any_specific_details"
                  value={personalDetails.any_specific_details}
                  onChange={handlePersonalDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter any specific requirements"
                />
              </form>
            </div>

            {/* Arrival Details Card */}
            <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Arrival Details</h2>
              <input type="date" name="date" value={arrivalDetails.date} onChange={handleArrivalDetailsChange} className="w-full p-2 border border-gray-300 rounded" />
              <input type="time" name="time" value={arrivalDetails.time} onChange={handleArrivalDetailsChange} className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="pickup_location" value={arrivalDetails.pickup_location} onChange={handleArrivalDetailsChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter pick-up location" />
              <input type="text" name="drop_off_location" value={arrivalDetails.drop_off_location} onChange={handleArrivalDetailsChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter drop-off location" />
              <select name="type_of_vehicle" value={arrivalDetails.type_of_vehicle} onChange={handleArrivalDetailsChange} className="w-full p-2 border border-gray-300 rounded">
                <option>Select Vehicle Type</option>
                <option>Car</option>
                <option>Bus</option>
                <option>SUMO</option>
              </select>
            </div>

            {/* Departure Details Card */}
            <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Departure Details</h2>
              <input type="date" name="date" value={departureDetails.date} onChange={handleDepartureDetailsChange} className="w-full p-2 border border-gray-300 rounded" />
              <input type="time" name="time" value={departureDetails.time} onChange={handleDepartureDetailsChange} className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="pickup_location" value={departureDetails.pickup_location} onChange={handleDepartureDetailsChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter pick-up location" />
              <input type="text" name="drop_off_location" value={departureDetails.drop_off_location} onChange={handleDepartureDetailsChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter drop-off location" />
              <select name="type_of_vehicle" value={departureDetails.type_of_vehicle} onChange={handleDepartureDetailsChange} className="w-full p-2 border border-gray-300 rounded">
                <option>Select Vehicle Type</option>
                <option>Car</option>
                <option>Bus</option>
                <option>SUMO</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button onClick={handleSubmit} className="bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-700">
              Submit Booking
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingForm;