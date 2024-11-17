import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import img1 from '../../assets/slide_pic_1.png';
import img2 from '../../assets/slide_pic_2.jpg';
import img3 from '../../assets/slide_pic_3.png';
import Footer from '../Footer/Footer';
import api from '../../api';

function Home() {
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [userDetails, setUserDetails] = useState([]); 

  useEffect(() => {
 

 
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/userdetails/', {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        setUserDetails(response.data);
        console.log('user_details_fteched', response.data[3])
        localStorage.setItem('is_superuser', response.data[3]);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
     
    
    fetchUserDetails();
    

    const fetchAnnouncements = async () => {
      try {
        const response = await api.get('/notifications/');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen">
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      <div className="absolute inset-0 z-0">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-center h-full px-4 md:px-10 space-y-20 md:space-y-0 md:space-x-24 lg:space-x-48 pt-12">
        <div className="text-white text-3xl sm:text-4xl md:text-6xl font-bold text-center md:text-left max-w-full md:max-w-xs">
          IIT INDORE TRANSPORT SYSTEM
        </div>

        
        <div
          className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-4 md:p-6 rounded-lg shadow-lg w-2/3 max-w-md h-96 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Announcements</h2>
          <div
            className={`h-80 pb-6 ${
              isHovered ? 'overflow-y-auto' : 'overflow-y-clip scroll-auto'
            }`}
          >
            <ul
              className={`text-gray-800 space-y-4 ${
                isHovered ? '' : 'animate-scroll'
              }`}
            >
              {announcements.map((announcement) => (
                <li key={announcement.id} className="pb-2 border-b border-gray-500">
                  <span>{announcement.message}</span>
                  <span className="text-gray-500 text-sm"> - {new Date(announcement.date).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
