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
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/bookings" element={<PrivateRoutes><Bookings /></PrivateRoutes>} />
          <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path="/rent" element={<PrivateRoutes><Rent /></PrivateRoutes>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
