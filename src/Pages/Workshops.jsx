import React from 'react'
import { Link } from 'react-router-dom'
import { workshopsData } from '../assets/Data'

export default function Workshops() {
  const [selected, setSelected] = React.useState("practical");

  function removeSpaces(str) {
    return str.replace(/\s+/g, "");
  }
  return (
    <div className="event-bg">
      <div>

        <h1 className="text-6xl font-serif text-white font-bold text-center pt-10">
          WORKSHOPS
        </h1>
{/* // ... inside your Workshops component ... */}

<div className="flex justify-center px-6">
  {/* Added items-stretch to ensure both sides have similar height footprint */}
  <div className="flex flex-col lg:flex-row mt-10 items-stretch justify-center gap-10 max-w-7xl">

    {/* LEFT : IMAGE & INFO */}
    <div className="flex flex-col items-center justify-center w-full lg:w-1/3">
      <img
        src={workshopsData[selected].image}
        alt={workshopsData[selected].title}
        className="w-full rounded-xl object-cover shadow-md aspect-video"
        loading="lazy"
      />
      <div className="w-full flex flex-col gap-6 mt-6">
        <h2 className="text-2xl md:text-3xl text-slate-200 font-cinzel font-semibold">
          {workshopsData[selected].title.toUpperCase()}
        </h2>
        <div className="bg-violet-950/50 border border-violet-800 rounded-xl text-slate-100 p-5">
          <p>Date: <span className="font-bold">{workshopsData[selected].date}</span></p>
          <p>Fees: <span className="font-bold">{workshopsData[selected].fees}</span></p>
        </div>
        {/* Registration Button Logic stays here */}
      </div>
    </div>

    {/* RIGHT : THE SCROLL CARD */}
    <div className="ws-bg flex flex-col items-center justify-center text-center">
      {/* Content Wrapper: Controls width so text stays inside the scroll gold borders */}
      <div className="w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-8">
        
        <div className="space-y-2 px-6">
          <h2 className="text-3xl font-cinzel text-white border-b border-white/20 pb-1 inline-block">
            About
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed">
            {workshopsData[selected].description}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-cinzel text-white">Co-ordinators</h2>
          <div className="text-white text-sm">
            {workshopsData[selected].coordinators.map((coordinator, index) => (
              <p key={index} className="opacity-90">
                {coordinator.name}: <span className="font-mono text-cyan-300">{coordinator.contact}</span>
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
      </div>
    </div>
  );
}
