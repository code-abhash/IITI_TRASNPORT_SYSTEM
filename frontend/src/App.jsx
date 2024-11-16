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
import VehicleList from './components/Driver/VehicleList';
import DriverList from './components/Driver/DriverList';
import BookingList from './components/Admin/Booking_list';
import PasswordResetRequest from './components/Login/ForgotPassword';
import PasswordResetConfirm from './components/Login/PasswordConfirm';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/password_reset"
            element={<PasswordResetRequest />}
          />
          <Route
            path="/reset/:username/:token"
            element={<PasswordResetConfirm />}/>
          <Route path="/Confirm" element={<BookingList />} />
          <Route path="/Driver" element={<DriverList/>} />
          <Route path="/Vehicle" element={< VehicleList/>} />
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