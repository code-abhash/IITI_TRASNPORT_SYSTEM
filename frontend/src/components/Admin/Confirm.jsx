import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import api from '../../api'; // Import the api instance

function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/');
        console.log("bookings fetched")
        console.log(bookings)
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }

    };

    fetchBookings();
  }, []); // Empty dependency array to run once on component mount
  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-6">
          <h1 className="text-4xl font-bold text-[#586994] mb-10 mt-10">View Bookings</h1>

          {/* Booking Cards */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 mb-6 w-full px-4 md:px-10 lg:px-48">
            {bookings.length === 0 ? (
              <p className="text-gray-700 text-lg">No bookings found</p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.booking_id}
                  className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking ID: {booking.booking_id}</h2>
                  <div className="space-y-4 text-gray-700">
                    {/* Personal Details */}
                    <div>
                      <h3 className="font-bold">Personal Details</h3>
                      <p><strong>Name:</strong> {booking.name_user}</p>
                      <p><strong>Type of Booking:</strong> {booking.type_of_booking}</p>
                      <p><strong>Contact Number:</strong> {booking.contact_number}</p>
                    </div>
                    
                    {/* Funding Source */}
                    <div>
                      <h3 className="font-bold">Funding Source</h3>
                      <p>{booking.source_of_funding ? "PDF Uploaded" : "No PDF"}</p>
                    </div>

                    {/* Special Requirements */}
                    <div>
                      <h3 className="font-bold">Special Requirements</h3>
                      <p>{booking.any_specific_details || "None"}</p>
                    </div>

                    {/* Status */}
                    <div>
                      <h3 className="font-bold">Status</h3>
                      <p>{booking.status}</p>
                    </div>

                    {/* Arrival Details */}
                    <div>
                      <h3 className="font-bold">Arrival Details</h3>
                      <p><strong>Date:</strong> {booking.arrival_details[0].date}</p>
                      <p><strong>Time:</strong> {booking.arrival_details[0].time}</p>
                      <p><strong>Pick-up Location:</strong> {booking.arrival_details[0].pickup_location}</p>
                      <p><strong>Drop-off Location:</strong> {booking.arrival_details[0].drop_off_location}</p>
                      <p><strong>Vehicle Type:</strong> {booking.arrival_details[0].type_of_vehicle}</p>
                    </div>

                    {booking.departure_details && booking.departure_details.length > 0 && (
                      <div>
                        <h3 className="font-bold">Departure Details</h3>
                        <p><strong>Date:</strong> {booking.departure_details[0].date}</p>
                        <p><strong>Time:</strong> {booking.departure_details[0].time}</p>
                        <p><strong>Pick-up Location:</strong> {booking.departure_details[0].pickup_location}</p>
                        <p><strong>Drop-off Location:</strong> {booking.departure_details[0].drop_off_location}</p>
                        <p><strong>Vehicle Type:</strong> {booking.departure_details[0].type_of_vehicle}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ViewBookings;