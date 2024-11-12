import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BookingDetail from './Confirm';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search query

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/bookings/');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  // Filter bookings based on search query
  const filteredBookings = bookings.filter((booking) =>
    booking.name_user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    booking.booking_id.toString().includes(searchQuery)
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-6">
        <h1 className="text-4xl font-bold text-[#586994] mb-10 text-center">Booking List</h1>

        {/* Search Bar */}
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by Name or Booking ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
            className="border px-4 py-2 rounded-lg w-1/2"
          />
        </div>

        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">No bookings found</td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td className="border px-4 py-2">{booking.booking_id}</td>
                  <td className="border px-4 py-2">{booking.name_user}</td>
                  <td className="border px-4 py-2">{booking.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Update Booking
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <BookingDetail
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      <Footer />
    </>
  );
}

export default BookingList;
