import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Rent from './components/Rent/Rent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Bookings from './components/Bookings/Bookings';
import Profile from './components/Profile/Profile';
import ForgotPassword from './components/Login/ForgotPassword';
import AuthProvider from './components/PrivateRoutes/AuthProvider';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import Admin from './components/Admin/Admin';
import ViewBookings from './components/Admin/Confirm';
import AddDriverForm from './components/Driver/Driver';
import AddVehicleForm from './components/Driver/Vehicle';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Confirm" element={<ViewBookings />} />
          <Route path="/Driver" element={<AddDriverForm/>} />
          <Route path="/Vehicle" element={< AddVehicleForm/>} />

          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/bookings" element={<PrivateRoutes><Bookings /></PrivateRoutes>} />
          <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path="/rent" element={<Rent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;