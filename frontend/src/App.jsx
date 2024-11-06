import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import Booking from './components/Booking/Booking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen w-screen'>
        {/* <Home/> */}
        <Booking/>
      </div>
    </>
  )
}

export default App
