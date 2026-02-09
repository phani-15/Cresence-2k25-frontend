import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import HomeScene from './Pages/HomeScene'
import Navbar from './Components/Navbar'
import Workshops from './Pages/Workshops'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScene />} />
          <Route path="/workshops" element={<Workshops />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
