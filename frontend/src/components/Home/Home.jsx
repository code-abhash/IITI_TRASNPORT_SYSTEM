import React from 'react'
import Navbar from '../Navbar/Navbar'
import img1 from '../../assets/slide_pic_1.png'
import img2 from '../../assets/slide_pic_2.jpg'
import img3 from '../../assets/slide_pic_3.png'

function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <div className="slideshow absolute inset-0 flex h-full w-full">
          <img
            src={img1}
            alt="Slideshow Image 1"
            className="object-cover w-full h-full opacity-0 animate-fade duration-5000"
          />
          <img
            src={img2}
            alt="Slideshow Image 2"
            className="object-cover w-full h-full opacity-0 animate-fade duration-5000"
          />
          <img
            src={img3}
            alt="Slideshow Image 3"
            className="object-cover w-full h-full opacity-0 animate-fade duration-5000"
          />
        </div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center">
        <div className="text-white text-6xl font-bold mb-8">
          IIT INDORE TRANSPORT SYSTEM
        </div>
        
        {/* Card */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-1/3 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Transport Details</h2>
          <p className="text-gray-700">
            Explore routes, schedules, and other transport information here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
