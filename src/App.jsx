import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import HomeScene from './Pages/HomeScene'
import Navbar from './Components/Navbar'
import Loader from "./Components/Loader"
import Workshops from './Pages/Workshops'
import Events from './Pages/Events'
import Stay from './Pages/Stay'
import EventTimeline from './Components/TimeLine'
import { timelineItems } from './assets/Data'
import Temp from './Components/Temp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScene />} />
          <Route path="/" element={<Loader />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/events" element={<Events />} />
          <Route path='/stay' element={<Stay />} />
          <Route path="/timeline" element={<EventTimeline timelineItems={timelineItems} />} />
          <Route path='/temp' element={<Temp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
