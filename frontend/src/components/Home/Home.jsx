import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import img1 from '../../assets/slide_pic_1.png'
import img2 from '../../assets/slide_pic_2.jpg'
import img3 from '../../assets/slide_pic_3.png'
import Footer from '../Footer/Footer';

function Home() {
  const images = [img1, img2, img3]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) 
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative h-screen w-full ">
      <div className="relative z-20">
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
        
        {/* Card */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-1/3 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <p className="text-gray-700">
            Explore routes, schedules, and other transport information here.
          </p>
        </div>
      </div>

      <div className="relative z-2">
        <Footer/>
      </div>
    </div>
  )
}

export default Home