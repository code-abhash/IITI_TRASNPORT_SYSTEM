import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import vehicleIcon from '../../assets/vehicle_icon.png';
import electricIcon from '../../assets/electric_icon.png';
import img1 from '../../assets/slide_pic_1.png'
import img2 from '../../assets/slide_pic_2.jpg'
import img3 from '../../assets/slide_pic_3.png'
import electric_schedule from '../../assets/electric_color.png'
import Buses_Schedule from '../../assets/bus.png'


function Rent() {
  return (
    <>
      {/* Main background container */}
      <div
        className="relative flex flex-col min-h-screen bg-gray-50"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        {/* Page content - wrapped in a relative div to layer above the overlay */}
        <div className="relative z-10 flex-1 mt-24 p-6 md:p-12 space-y-12 text-white">
          {/* Navbar */}
          <div className="fixed top-0 left-0 w-full z-20">
            <Navbar />
          </div>

          {/* Page Header */}
          <h1 className="text-4xl font-bold text-center text-gray-100 mb-10">
            RATE LIST OF INSTITUTE VEHICLES
          </h1>

          {/* Institute Vehicles Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Rate list of Institute Vehicles</h2>
              <img src={vehicleIcon} alt="Vehicle Icon" className="w-18 h-12 ml-2 " />
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white bg-opacity-90 border-[3px] border-gray-500 rounded-lg shadow-lg">
                <thead className="bg-gray-400 bg-opacity-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800 border">Sl. No.</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800 border">Details of Vehicles</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800 border">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-gray-600 border">1</td>
                    <td className="px-4 py-2 text-gray-600 border">IIT Indore 50 Seater Bus</td>
                    <td className="px-4 py-2 text-gray-600 border">₹50/- From Campus To city  (₹1000/- per day)</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-gray-600 border">2</td>
                    <td className="px-4 py-2 text-gray-600 border">IIT Indore 80 Seater Bus </td>
                    <td className="px-4 py-2 text-gray-600 border">₹50/- For Campus to city (₹2000/- per day)</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-gray-600 border">3</td>
                    <td className="px-4 py-2 text-gray-600 border">SUV 07 Seaters</td>
                    <td className="px-4 py-2 text-gray-600 border">₹14/- per km (₹1000/- per day)</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-gray-600 border">4</td>
                    <td className="px-4 py-2 text-gray-600 border">
                      For personal use, Small Institute vehicles (SUV/Small car) will be allowed for only pick-up and drop
                      facility between IIT Indore campus and Bhavarkuan with rate of Rs.200/- per trip and Rs.100/-
                      will be extra charges if the vehicle is booked for night.
                    </td>
                    <td className="px-4 py-2 text-gray-600 border">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          
          <h1 className="text-4xl font-bold text-center text-gray-100 mt-2 mb-10">
  Schedule of Vehicles
</h1>

<section>
  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-4 sm:space-y-0">
    {/* Vehicle Box 1 */}
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/3 h-60">
      {/* Insert Image */}
      <img
        src={electric_schedule}
        alt="Electric_vehicle_Schedule"
        className="w-full h-full object-contain rounded-md"
      />
      <div className=" text-center">
        {/* PDF Link */}
        <a
        href="/Public/scheduleEV.pdf"  // Correct path to the file in the public folder
        className="text-blue-400 hover:text-blue-600"
        >
        View Schedule PDF
        </a>
      </div>
    </div>

    {/* Vehicle Box 2 */}
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/3 h-60">
      {/* Insert Image */}
      <img
        src={Buses_Schedule}
        alt="Buses_Schedule"
        className="w-full h-full object-contain rounded-md"
      />
      <div className="text-center">
        {/* PDF Link */}
        <a
          href="/Public/Bus_schedule.pdf" // Replace with the actual PDF path
          target="_blank"
          className="text-blue-400 hover:text-blue-600"
        >
          View Schedule PDF
        </a>
      </div>
    </div>
  </div>
</section>




            



          

          
          
        </div>
      </div>

      {/* Footer - placed outside the background container */}
      <div className="bg-gray-900 text-white py-4">
        <Footer />
      </div>
    </>
  );
}

export default Rent;