import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import HomeScene from './Pages/HomeScene'
import Navbar from './Components/Navbar'
import Workshops from './Pages/Workshops'
import Events from './Pages/Events'
import EventTimeline from './Pages/EventTimeline'
import { timelineItems } from './assets/Data'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScene />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/events" element={<Events />} />
          <Route path="/timeline" element={<EventTimeline timelineItems={timelineItems} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
