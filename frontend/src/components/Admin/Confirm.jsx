import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingDetail({ booking, onClose }) {
  const [vehicles, setVehicles] = useState([]);
  const [arrivalVehicleId, setArrivalVehicleId] = useState('');
  const [departureVehicleId, setDepartureVehicleId] = useState('');
  const [status, setStatus] = useState(booking.status); // Store the current status
  const [Bookings,setBookings]=useState('')
  console.log(booking);

  useEffect(() => {

    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/vehicles/');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  const handleConfirmBooking = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/update_booking/', {
        booking_id: booking.booking_id,
        status: 'confirmed',
        arrival_vehicle_id: arrivalVehicleId,
        departure_vehicle_id: departureVehicleId,
      });
      setStatus('confirmed'); // Update local status
      alert('Booking confirmed!');
      onClose();
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };
  const handleRejectBooking = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/update_booking/', {
        booking_id: booking.booking_id,
        status: 'rejected',
      });
      setStatus('rejected'); // Update local status
      alert('Booking rejected.');
      onClose();
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Confirm or Reject Booking</h2>
        <p><strong>Booking ID:</strong> {booking.booking_id}</p>
        <p><strong>Name:</strong> {booking.name_user}</p>
        <p><strong>Type of Booking:</strong> {booking.type_of_booking}</p>
        <p><strong>Contact Number:</strong> {booking.contact_number}</p>
        <div>
                      <h3 className="font-bold">Special Requirements</h3>
                      <p>{booking.any_specific_details || "None"}</p>
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
                    {booking.arrival_details && booking.arrival_details.length > 0 && (
                      <div>
                      <h3 className="font-bold">Arrival Details</h3>
                      <p><strong>Date:</strong> {booking.arrival_details[0].date}</p>
                      <p><strong>Time:</strong> {booking.arrival_details[0].time}</p>
                      <p><strong>Pick-up Location:</strong> {booking.arrival_details[0].pickup_location}</p>
                      <p><strong>Drop-off Location:</strong> {booking.arrival_details[0].drop_off_location}</p>
                      <p><strong>Vehicle Type:</strong> {booking.arrival_details[0].type_of_vehicle}</p>
                      </div>
                    )}
        {status !== 'confirmed' && status !== 'rejected' && (
          <>
            {/* Select Arrival Vehicle */}
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

            {/* Select Departure Vehicle */}
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

            {/* Buttons to confirm or reject booking */}
            <div className="flex mt-6 space-x-4">
              <button
                onClick={handleConfirmBooking}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirm Booking
              </button>
              <button
                onClick={handleRejectBooking}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject Booking
              </button>
            </div>
          </>
        )}

        {/* Disable actions if the status is confirmed or rejected */}
        {status === 'confirmed' || status === 'rejected' ? (
          <div className="mt-4">
            <p className="text-gray-500">This booking is already {status}.</p>
          </div>
        ) : null}

        {/* Cancel button */}
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookingDetail;
