import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Rent from './components/Rent/Rent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Bookings from './components/Bookings/Bookings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/bookings" element={<Bookings />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/rent" element={<Rent />} />
      </Routes>
    </Router>
  );
}

export default App;
