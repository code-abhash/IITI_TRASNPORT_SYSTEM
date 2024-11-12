import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import api from '../../api'; // Import the api instance
import profilePic from '../../assets/profile_pic.png'; 
const Profile = () => {
  const [viewDetails, setViewDetails] = useState(null); // Track which booking details are being viewed
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [driverDetailsArrival, setDriverDetailsArrival] = useState(null);
  const [driverDetailsDeparture, setDriverDetailsDeparture] = useState(null);
  const [showArrivalDetails, setShowArrivalDetails] = useState(false);
  const [showDepartureDetails, setShowDepartureDetails] = useState(false);

  function extractRollNumber(email) {
    // Regular expression to match the roll number after the course code
    const regex = /\d{9}/;
    const match = email.match(regex);

    // If the email matches the pattern, return the roll number part
    if (match) {
      return match[0]; // match[0] will contain the roll number (9 digits)
    } else {
      return null; // Return null if no roll number is found
    }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/userdetails/', {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        setUserDetails(response.data);
        console.log('user_details_fetched', response.data); // Assuming the response contains user data with name and email
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

  const rollNumber = userDetails ? extractRollNumber(userDetails[1]) : null; // Only call extractRollNumber if userDetails is available

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
              {userDetails && rollNumber > 230001000 && rollNumber < 230001084 ? (
                <img src={`https://cse.iiti.ac.in/stu_pics/btech_2023/${rollNumber}.jpg`} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
              ) : (
                <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
              )}
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
                        {/* Arrival and Departure Details */}
                        {/* ... */}
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
