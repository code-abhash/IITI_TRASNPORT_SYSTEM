import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AddVehicleForm from './AddVehicleForm';
import EditVehicleForm from './EditVehicleForm'; // Import EditVehicleForm
import api from '../../api';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [isAddVehiclePopupOpen, setIsAddVehiclePopupOpen] = useState(false);
  const [isEditVehiclePopupOpen, setIsEditVehiclePopupOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Track selected vehicle for editing

  // Fetch the list of vehicles from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/vehicles/');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  const toggleAddVehiclePopup = () => {
    setIsAddVehiclePopupOpen(!isAddVehiclePopupOpen);
  };

  const openEditVehiclePopup = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditVehiclePopupOpen(true);
  };

  const closeEditVehiclePopup = () => {
    setIsEditVehiclePopupOpen(false);
    setSelectedVehicle(null);
  };

  const handleUpdate = (updatedVehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.vehicle_id === updatedVehicle.vehicle_id ? updatedVehicle : vehicle
      )
    );
  };

  return (
    <div className="relative w-full h-screen">
      <Navbar />

      <div className="flex flex-col items-center pt-20">
        <h1 className="text-4xl font-bold mb-4">Vehicle Management</h1>

        <button
          onClick={toggleAddVehiclePopup}
          className="bg-[#4DB6B6] text-white py-2 px-4 rounded-lg mb-6 hover:bg-[#3AA4A4]"
        >
          Add Vehicle
        </button>

        <div className="w-4/5 overflow-x-auto shadow-lg rounded-lg mb-12">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-2 px-4">Vehicle ID</th>
                <th className="py-2 px-4">Driver</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Capacity</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Vehicle Number</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vehicle_id} className="text-center border-b">
                  <td className="py-2 px-4">{vehicle.vehicle_id}</td>
                  <td className="py-2 px-4">{vehicle.driver}</td>
                  <td className="py-2 px-4">{vehicle.type}</td>
                  <td className="py-2 px-4">{vehicle.capacity}</td>
                  <td className="py-2 px-4">{vehicle.vehicle_status}</td>
                  <td className="py-2 px-4">{vehicle.vehicle_number}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => openEditVehiclePopup(vehicle)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddVehiclePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg">
            <button
              onClick={toggleAddVehiclePopup}
              className="text-red-500 font-semibold float-right mb-2"
            >
              X
            </button>
            <AddVehicleForm />
          </div>
        </div>
      )}

      {isEditVehiclePopupOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg">
            <button
              onClick={closeEditVehiclePopup}
              className="text-red-500 font-semibold float-right mb-2"
            >
              X
            </button>
            <EditVehicleForm
              vehicle={selectedVehicle}
              onClose={closeEditVehiclePopup}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default VehicleList;
