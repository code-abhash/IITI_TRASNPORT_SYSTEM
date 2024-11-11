import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [arrivalVehicleId, setArrivalVehicleId] = useState();
  const [departureVehicleId, setDepartureVehicleId] = useState();
  // Fetch bookings and vehicles from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/bookings/');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/vehicles/');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchBookings();
    fetchVehicles();
  }, []);

  const handleConfirmBooking = async (bookingId, arrivalVehicleId, departureVehicleId) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/update_booking/', {
        booking_id: bookingId,
        status: 'confirmed',
        arrival_vehicle_id: arrivalVehicleId,
        departure_vehicle_id: departureVehicleId,
      });
      alert('Booking confirmed and vehicles assigned!');
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-6">
          <h1 className="text-4xl font-bold text-[#586994] mb-10 mt-10">View Bookings</h1>

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
                    {/* Booking Details */}
                    <p><strong>Name:</strong> {booking.name_user}</p>
                    <p><strong>Status:</strong> {booking.status}</p>

                    {/* Vehicle Selection for Arrival */}
                    <div className="mt-4">
                      <label className="block font-bold">Select Arrival Vehicle:</label>
                      <select
                        className="border border-gray-300 p-2 rounded mt-1 w-full"
                        onChange={(e) => setArrivalVehicleId(e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Select Vehicle</option>
                        {vehicles.map(vehicle => (
                          <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                            {vehicle.vehicle_number} ({vehicle.type})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vehicle Selection for Departure */}
                    <div className="mt-4">
                      <label className="block font-bold">Select Departure Vehicle:</label>
                      <select
                        className="border border-gray-300 p-2 rounded mt-1 w-full"
                        onChange={(e) => setDepartureVehicleId(e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Select Vehicle</option>
                        {vehicles.map(vehicle => (
                          <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                            {vehicle.vehicle_number} ({vehicle.type})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Confirm Booking Button */}
                    <button
                      onClick={() => handleConfirmBooking(
                        booking.booking_id,
                        arrivalVehicleId,
                        departureVehicleId
                      )}
                      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Confirm Booking
                    </button>
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
