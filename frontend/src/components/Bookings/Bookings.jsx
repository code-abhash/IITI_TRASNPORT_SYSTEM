import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import img2 from '../../assets/slide_pic_2.jpg';

function BookingForm() {
  return (<>
    <div
        className="relative flex flex-col min-h-screen bg-gray-50"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0 w-full max-h-screen">
        <img src={img2} alt="Background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div> */}
      
      {/* Form Content */}
      <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-6">
        <h1 className="text-4xl font-bold text-white mb-10 mt-10">Book a Vehicle</h1>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
          {/* Personal Details Card */}
          <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name of Faculty/Official/Student</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Type of Booking</label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Personal</option>
                  <option>Official</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Source of Funding (PDF Only)</label>
                <input type="file" accept=".pdf" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Contact Number</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Contact Number" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Any Special Requirements</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter any specific requirements" />
              </div>
            </form>
          </div>

          {/* Arrival Details Card */}
          <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Arrival Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold">Arrival Date</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Arrival Time</label>
                <input type="time" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Pick up from (Location)</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter pick-up location" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Drop off Location for Departure</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter drop-off location" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Type of Vehicle Required</label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Select Vehicle Type</option>
                  <option>Car</option>
                  <option>Bus</option>
                  <option>SUMO</option>
                </select>
              </div>
            </form>
          </div>

          {/* Departure Details Card */}
          <div className="bg-white bg-opacity-90 border-[3px] border-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Departure Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold">Departure Date</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Departure Time</label>
                <input type="time" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Pick up from (Location)</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter pick-up location" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Drop off Location for Departure</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter drop-off location" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Type of Vehicle Required</label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Select Vehicle Type</option>
                  <option>Car</option>
                  <option>Bus</option>
                  <option>SUMO</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-700">
            Submit Booking
          </button>
        </div>
      </div>
      
    </div>
    <div className=''>
    <Footer />
</div></>
  );
}

export default BookingForm;
