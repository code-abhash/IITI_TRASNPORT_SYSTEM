//profile.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import profilePic from '../../assets/profile_pic.png'; // Replace with your actual profile picture
import api from '../../api'; // Import the api instance

const Profile = () => {
  const [viewDetails, setViewDetails] = useState(null); // Track which booking details are being viewed
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [driverDetailsArrival, setDriverDetailsArrival] = useState(null);
  const [driverDetailsDeparture, setDriverDetailsDeparture] = useState(null);
  const [showArrivalDetails, setShowArrivalDetails] = useState(false);
  const [showDepartureDetails, setShowDepartureDetails] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/userdetails/', {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        setUserDetails(response.data);
        console.log('user_details_fteched', response.data)// Assuming the response contains user data with name and email
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/bookingsprofile/', {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchUserDetails();
    fetchBookings();
  }, []);

  const fetchDriverDetailsArrival = async (arrivalId) => {
    try {
      const response = await api.post('http://127.0.0.1:8000/api/driver_details_arrival/', { arrival_id: arrivalId });
      setDriverDetailsArrival(response.data);
      setShowArrivalDetails(true);
    } catch (error) {
      console.error('Error fetching arrival driver details:', error);
    }
  };

  const fetchDriverDetailsDeparture = async (departureId) => {
    try {
      const response = await api.post('http://127.0.0.1:8000/api/driver_details_departure/', { departure_id: departureId });
      setDriverDetailsDeparture(response.data);
      setShowDepartureDetails(true);
    } catch (error) {
      console.error('Error fetching departure driver details:', error);
    }
  };

  const handleViewDetails = (index) => {
    setViewDetails(index);
    setDriverDetailsArrival(null);
    setDriverDetailsDeparture(null);
    setShowArrivalDetails(false);
    setShowDepartureDetails(false);
  };

  return (
    <>
      <div className="relative min-h-screen w-full set_background_image">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-6">
          <h1 className="text-4xl font-bold text-white mb-10 mt-10">Profile</h1>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
            {/* Sidebar */}
            <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col justify-center items-center">
              <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{userDetails ? userDetails[0] : 'Loading...'}</h2>
              <p className="text-gray-700 text-xl mb-4">{userDetails ? userDetails[2] : 'Loading...'}</p>
              <p className="text-gray-600 mb-4">{userDetails ? userDetails[1] : 'Loading...'}</p>
            </div>


            {/* Main Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Past Bookings</h2>
              <div className="max-h-[400px] overflow-y-scroll space-y-4 pr-4">
                {bookings.map((booking, index) => (
                  <div key={booking.id} className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800">Booking {index + 1}</h3>
                    {viewDetails === index ? (
                      <div className="text-gray-700 mt-2">
                        <p><strong>Status:</strong> {booking.status} </p>
                        <p><strong>Type of Booking:</strong> {booking.type_of_booking}</p>

                        {/* Arrival and Departure Details (Aligned horizontally) */}
                        <div className="flex justify-between gap-4">
                          {/* Arrival Details */}
                          <div className="flex-1">
                            <p><strong>Arrival:</strong></p>
                            {booking.arrival_details && booking.arrival_details.length > 0 ? (
                              <ul>
                                <li>Date: {booking.arrival_details[0].date}</li>
                                <li>Time: {booking.arrival_details[0].time}</li>
                                <li>Pick-up Location: {booking.arrival_details[0].pickup_location}</li>
                                <li>Drop-off Location: {booking.arrival_details[0].drop_off_location}</li>
                                <li>Vehicle Type: {booking.arrival_details[0].type_of_vehicle}</li>
                              </ul>
                            ) : (
                              <p>No arrival details available.</p>
                            )}

                            {/* Only show the button if arrival details are available */}
                            {booking.arrival_details && booking.arrival_details.length > 0 && (
                              <button
                                onClick={() => fetchDriverDetailsArrival(booking.arrival_details[0].arrival_id)}
                                className="mt-2 bg-green-600 text-white font-bold py-1 px-4 rounded hover:bg-green-700"
                              >
                                Get Arrival Driver Details
                              </button>
                            )}
                            {showArrivalDetails && driverDetailsArrival && (
                              <div>
                                <p><strong>Driver Name:</strong> {driverDetailsArrival[0]}</p>
                                <p><strong>Driver Contact:</strong> {driverDetailsArrival[1]}</p>
                                <button
                                  onClick={() => setShowArrivalDetails(false)}
                                  className="mt-2 bg-red-600 text-white font-bold py-1 px-4 rounded hover:bg-red-700"
                                >
                                  Hide Arrival Driver Details
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Departure Details */}
                          <div className="flex-1">
                            <p><strong>Departure:</strong></p>
                            {booking.departure_details && booking.departure_details.length > 0 ? (
                              <ul>
                                <li>Date: {booking.departure_details[0].date}</li>
                                <li>Time: {booking.departure_details[0].time}</li>
                                <li>Pick-up Location: {booking.departure_details[0].pickup_location}</li>
                                <li>Drop-off Location: {booking.departure_details[0].drop_off_location}</li>
                                <li>Vehicle Type: {booking.departure_details[0].type_of_vehicle}</li>
                              </ul>
                            ) : (
                              <p>No departure details available.</p>
                            )}

                            {/* Only show the button if departure details are available */}
                            {booking.departure_details && booking.departure_details.length > 0 && (
                              <button
                                onClick={() => fetchDriverDetailsDeparture(booking.departure_details[0].departure_id)}
                                className="mt-2 bg-green-600 text-white font-bold py-1 px-4 rounded hover:bg-green-700"
                              >
                                Get Departure Driver Details
                              </button>
                            )}
                            {showDepartureDetails && driverDetailsDeparture && (
                              <div>
                                <p><strong>Driver Name:</strong> {driverDetailsDeparture[0]}</p>
                                <p><strong>Driver Contact:</strong> {driverDetailsDeparture[1]}</p>
                                <button
                                  onClick={() => setShowDepartureDetails(false)}
                                  className="mt-2 bg-red-600 text-white font-bold py-1 px-4 rounded hover:bg-red-700"
                                >
                                  Hide Departure Driver Details
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          className="mt-2 bg-red-600 text-white font-bold py-1 px-4 rounded hover:bg-red-700"
                          onClick={() => handleViewDetails(null)}
                        >
                          Hide Details
                        </button>
                      </div>
                    ) : (
                      <button
                        className="mt-2 bg-blue-600 text-white font-bold py-1 px-4 rounded hover:bg-blue-700"
                        onClick={() => handleViewDetails(index)}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;