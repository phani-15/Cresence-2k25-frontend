import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import HomeScene from './Pages/HomeScene'
import Navbar from './Components/Navbar'
import Loader from "./Components/Loader"
import Workshops from './Pages/Workshops'
import Events from './Pages/Events'
import EventTimeline from './Pages/EventTimeline'
import { timelineItems } from './assets/Data'
import Ourteam from './Components/Ourteam'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScene />} />
          <Route path="/" element={<Loader />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/events" element={<Events />} />
          <Route path="/timeline" element={<EventTimeline timelineItems={timelineItems} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
