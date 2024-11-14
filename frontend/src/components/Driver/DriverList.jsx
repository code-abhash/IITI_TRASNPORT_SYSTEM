import React, { useEffect, useState } from 'react';
import api from '../../api';
import AddDriverForm from './Driver';
import EditDriverForm from './EditDriver';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [driverToEdit, setDriverToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await api.get('/get_drivers/'); // Use the API instance
                setDrivers(response.data); // Assuming response.data is the list of drivers
            } catch (error) {
                console.error('Failed to fetch driver details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const openEditModal = (driver) => {
        setDriverToEdit(driver);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    // Filter drivers based on search query
    const filteredDrivers = drivers.filter(
        (driver) =>
            driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.phone_no.includes(searchQuery)
    );

    return (
        <div className="relative w-full h-screen flex flex-col items-center pt-20">
            <h1 className="text-4xl font-bold mb-4">Driver Management</h1>

            {/* Search Bar */}
            <div className="mb-6 w-4/5">
                <input
                    type="text"
                    placeholder="Search by Name or Phone Number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full"
                />
            </div>

            <button
                onClick={openAddModal}
                className="bg-[#4DB6B6] text-white py-2 px-4 rounded-lg mb-6 hover:bg-[#3AA4A4]"
            >
                Add Driver
            </button>

            {loading ? (
                <p>Loading drivers...</p>
            ) : (
                <div className="w-4/5 overflow-x-auto shadow-lg rounded-lg mb-12">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200 text-gray-600">
                            <tr>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Phone Number</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDrivers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-2 px-4 text-center">No drivers found</td>
                                </tr>
                            ) : (
                                filteredDrivers.map((driver) => (
                                    <tr key={driver.driver_id} className="text-center border-b">
                                        <td className="py-2 px-4">{driver.driver_id}</td>
                                        <td className="py-2 px-4">{driver.name}</td>
                                        <td className="py-2 px-4">{driver.phone_no}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => openEditModal(driver)}
                                                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Driver Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg">
                        <button
                            onClick={closeAddModal}
                            className="text-red-500 font-semibold float-right mb-2"
                        >
                            X
                        </button>
                        <AddDriverForm />
                    </div>
                </div>
            )}

            {/* Edit Driver Modal */}
            {isEditModalOpen && driverToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg">
                        <button
                            onClick={closeEditModal}
                            className="text-red-500 font-semibold float-right mb-2"
                        >
                            X
                        </button>
                        <EditDriverForm driver={driverToEdit} onClose={closeEditModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverList;
