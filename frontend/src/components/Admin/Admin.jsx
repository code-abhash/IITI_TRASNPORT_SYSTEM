import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import img1 from '../../assets/slide_pic_1.png';
import img2 from '../../assets/slide_pic_2.jpg';
import img3 from '../../assets/slide_pic_3.png';
import { Link } from 'react-router-dom';
import api from '../../api'; // Import the api instance


function Admin() {
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/notifications/');
      setAnnouncements(response.data); // Set the fetched announcements to state
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
    console.log(announcements)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Handle adding a new announcement
  const handleAddAnnouncement = async () => {
    if (newAnnouncement) {
      const currentDate = new Date().toISOString(); // Get the current date in ISO format
      const newAnnouncementObj = { message: newAnnouncement, date: currentDate };

      try {
        // Post the new announcement to the backend
        const response = await api.post('/notifications/', newAnnouncementObj);

        // Update local state after adding the new announcement
        setAnnouncements([response.data, ...announcements]);
        setNewAnnouncement('');
      } catch (error) {
        console.error('Error adding announcement:', error);
      }
    }
  };

  // Handle deleting an announcement
  const handleDeleteAnnouncement = async (id) => {
    try {
      // Send a delete request to the backend for the specific announcement
      await api.delete(`/notifications/${id}/`);

      // Update local state to remove the announcement
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-10 space-y-16 pt-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Admin Dashboard
        </h1>

        {/* Announcements Section */}
        <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-2/3 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Manage Announcements</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Add a new announcement"
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleAddAnnouncement}
              className="bg-[#4DB6B6] text-white p-2 rounded-r-lg hover:bg-[#3AA4A4]"
            >
              Add
            </button>
          </div>
          <ul className="text-gray-800 space-y-2 max-h-64 overflow-y-auto">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="flex justify-between items-center pb-2 border-b border-gray-500">
                <div>
                  <span>{announcement.message}</span>
                  <span className="text-gray-500 text-sm"> - {new Date(announcement.date).toLocaleString()}</span>
                </div>
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.notification_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Transport Management Section */}
        <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-2/3 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Manage Transport</h2>
          <div className="flex flex-col space-y-4">
            <Link to='/Confirm' className="bg-[#4DB6B6] text-white py-2 rounded-lg text-center hover:bg-[#3AA4A4]">
              View Booking Requests
            </Link>
            <Link to='/Driver' className="bg-[#4DB6B6] text-white py-2 rounded-lg text-center hover:bg-[#3AA4A4]">
              Manage Driver
            </Link>
            <Link to='/Vehicle' className="bg-[#4DB6B6] text-white py-2 rounded-lg text-center hover:bg-[#3AA4A4]">
              Manage Vehicles
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Admin;
