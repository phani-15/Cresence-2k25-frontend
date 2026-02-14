import React from 'react'
import { Routes, Route,useLocation } from 'react-router-dom'
import HomeScene from './Pages/HomeScene'
import Navbar from './Components/Navbar'
import Loader from "./Components/Loader"
import Workshops from './Pages/Workshops'
import Events from './Pages/Events'
import Stay from './Pages/Stay'
import EventTimeline from './Components/TimeLine'
import { timelineItems } from './assets/Data'
import Ourteam from './Components/Ourteam'
import Temp from './Components/Temp'

export default function Routing() {

  const loc = useLocation()
  
  return (
          <>
          {loc.pathname !== '/' &&
    <Navbar/>}
        <Routes>
          {/* <Route element={<Navbar/>}>
          </Route> */}
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/home" element={<HomeScene />} />
          <Route path="/" element={<Loader />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/events" element={<Events />} />
          <Route path='/stay' element={<Stay />} />
          <Route path="/timeline" element={<EventTimeline timelineItems={timelineItems} />} />
          <Route path='/temp' element={<Temp />} />
        </Routes>
        </>
  )
}
