import React from 'react';
import logo from '../../assets/iiti_logo.png';
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo */ }
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img src={logo} alt="IIT Indore  Logo" className="w-80 h-38 mb-2" />
          
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-16 text-center md:text-left">
          <div>
            <p className="font-semibold"></p>
            <p>MR. Shivcharan Patel</p>
            <p>Tranport Officer</p>
            <p>IIT Indore,</p>
            <p>Khandwa Road, Simrol, </p>
            <p>Indore, Madhya Pradesh 453552</p>
            <p className="mt-2">📞 +91-731-660 Ext-3557</p>
            <p  className="mt-2">✉️ iititransport@iiti.ac.in</p>
          </div>
          <div>
            <p className="font-semibold">Staff</p>
            <p>IIT Indore,</p>
            <p>Khandwa Road, Simrol, </p>
            <p>Indore, Madhya Pradesh 453552</p>
            <p className="mt-2">📞 +91-7509062831,
            +91-7509062834</p>
            <p>transport@iiti.ac.in</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-60 h-50">
          <iframe
            title="IIT Roorkee Transportation Section"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14610.17472426957!2d75.915153!3d22.524187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962f8e80e8b62f9%3A0x865b700ed3d8a5b9!2sIndian%20Institute%20of%20Technology%20Indore!5e0!3m2!1sen!2sin!4v1673651245473!5m2!1sen!2sin"
            width="100%"  
            height="100%"
            className="rounded-md border-2 border-gray-700"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        <p>© 2024 | All rights reserved </p>
      </div>
    </footer>
  );
}

export default Footer;
