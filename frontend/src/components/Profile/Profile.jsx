import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import profilePic from '../../assets/profile_pic.png'; // Replace with your actual profile picture
import img2 from '../../assets/slide_pic_2.jpg';

const Profile = () => {
  const [viewDetails, setViewDetails] = useState(null); // Track which booking details are being viewed

  const bookings = [
    { 
      id: 1, 
      title: 'Booking 1', 
      status: 'Confirmed', 
      arrival: '2023-10-01 10:00 AM', 
      departure: '2023-10-05 05:00 PM',
      details: 'Vehicle: Car, Pickup: Location A, Dropoff: Location B'
    },
    { 
      id: 2, 
      title: 'Booking 2', 
      status: 'Pending', 
      arrival: '2023-11-10 02:00 PM', 
      departure: '2023-11-15 04:00 PM',
      details: 'Vehicle: Bus, Pickup: Location C, Dropoff: Location D'
    },
    { 
      id: 3, 
      title: 'Booking 3', 
      status: 'Confirmed', 
      arrival: '2023-12-01 08:00 AM', 
      departure: '2023-12-05 12:00 PM',
      details: 'Vehicle: SUMO, Pickup: Location E, Dropoff: Location F'
    },
    { 
        id: 4, 
        title: 'Booking 4', 
        status: 'Confirmed', 
        arrival: '2023-12-01 08:00 AM', 
        departure: '2023-12-05 12:00 PM',
        details: 'Vehicle: SUMO, Pickup: Location E, Dropoff: Location F'
      },
      { 
        id: 5, 
        title: 'Booking 5', 
        status: 'Confirmed', 
        arrival: '2023-12-01 08:00 AM', 
        departure: '2023-12-05 12:00 PM',
        details: 'Vehicle: SUMO, Pickup: Location E, Dropoff: Location F'
      },
  ];

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
        <h1 className="text-4xl font-bold text-white mb-10 mt-10">Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
          {/* Sidebar */}
          <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col justify-center items-center">
            <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Parth Agarwal</h2>
            <p className="text-gray-700 text-xl mb-4">Student</p>
            <p className="text-gray-600 mb-4">parth@gmail.com</p>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Past Bookings</h2>
            <div className="max-h-[400px] overflow-y-scroll space-y-4 pr-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800">{booking.title}</h3>
                  {viewDetails === booking.id ? (
                    <div className="text-gray-700 mt-2">
                      <p><strong>Status:</strong> {booking.status}</p>
                      <p><strong>Arrival:</strong> {booking.arrival}</p>
                      <p><strong>Departure:</strong> {booking.departure}</p>
                      <p><strong>Details:</strong> {booking.details}</p>
                      <button
                        className="mt-2 bg-red-600 text-white font-bold py-1 px-4 rounded hover:bg-red-700"
                        onClick={() => setViewDetails(null)}
                      >
                        Hide Details
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-2 bg-blue-600 text-white font-bold py-1 px-4 rounded hover:bg-blue-700"
                      onClick={() => setViewDetails(booking.id)}
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
    <div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
