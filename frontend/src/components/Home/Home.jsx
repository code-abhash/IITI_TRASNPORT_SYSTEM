import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import img1 from '../../assets/slide_pic_1.png';
import img2 from '../../assets/slide_pic_2.jpg';
import img3 from '../../assets/slide_pic_3.png';
import Footer from '../Footer/Footer';

function Home() {
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const Notifications = [
    "Bus timings updated for route A",
    "New shuttle added for route B.",
    "Weekend service timings have changed.",
    "Maintenance scheduled for the main bus depot.",
    "Traffic delays expected on route C.",
    "New student discount on monthly passes.",
    "Extra buses added during exam week.",
    "Masks required on all transport services.",
    "Route D service is temporarily suspended.",
    "Holiday schedule will be in effect next week.",
    "Limited seats available on Route E.",
    "Night shuttle services extended until midnight.",
    "Transport survey - provide your feedback!",
    "COVID-19 guidelines updated.",
    "Express shuttle added from main gate.",
  ];

  return (
    <div className="relative h-screen w-full">
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
      <div className="relative z-10 flex justify-center items-center h-full px-10 space-x-48">
        <div className="text-white text-6xl font-bold w-96">
          IIT INDORE TRANSPORT SYSTEM
        </div>
        
        {/* Notifications Card */}
        <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-1/3 max-w-md h-96 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Notifications</h2>
          <ul className="text-gray-800 space-y-4">
            {Notifications.map((notification, index) => (
              <li key={index} className="pb-2 border-b border-gray-500">
                {notification}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
