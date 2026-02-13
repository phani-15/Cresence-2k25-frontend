import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const DetailedEventDeck = ({ events }) => {
  const isMobile = window.innerWidth <=768
  const [activeIdx, setActiveIdx] = useState(0);
  const cardsRef = useRef([]);
  const eventList = Object.values(events);

  // Theme-specific Tailwind Classes
  const getThemeClasses = (name) => {
    switch (name) {
      case "Squid Game":
        return " transition-shadow duration-700";
      case "Codemoji":
        return "bg-slate-900";
      case "Tech Nova":
        return "";
      case "Algo Ascent":
        return "";
      default:
        return "";
    }
  };

  const handleCardClick = (i) => {
    if (i !== activeIdx) return;

    const card = cardsRef.current[i];

    // GSAP Fly-Away Animation
    gsap.to(card, {
      x: 600,
      rotation: 30,
      opacity: 0,
      scale: 0.8,
      duration: 0.7,
      ease: "power2.in",
      onComplete: () => {
        setActiveIdx((prev) => (prev + 1) % eventList.length);
        // Reset card for the bottom of the stack
        gsap.set(card, { x: 0, rotation: 0, opacity: 1, scale: 1 });
      }
    });

    // Animate the rest of the stack moving forward
    eventList.forEach((_, index) => {
      if (index !== i) {
        gsap.to(cardsRef.current[index], {
          z: (idx) => (index > i ? (index - i - 1) * -40 : (index + (eventList.length - i - 1)) * -40),
          duration: 0.5,
          ease: "back.out(1.2)"
        });
      }
    });
  };

  return (
    <div>      
      <h1 className='text-7xl font-cinzel bg-gradient-to-b from-[#FDE68A] via-[#F59E0B] to-[#78350F] 
               bg-clip-text text-transparent font-semibold text-center drop-shadow-sm'>Tech Events</h1>
      {isMobile ? 
      <div className="relative w-full h-[600px] flex items-center justify-center [perspective:1200px]">
        {eventList.map((event, i) => {
          const isHidden = i < activeIdx;
          const depth = i - activeIdx;

          return (
            <div
              key={event.name}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={() => handleCardClick(i)}
              className={`absolute w-80 h-[450px] rounded-3xl p-6 flex flex-col justify-end cursor-pointer select-none overflow-hidden transition-colors duration-500
              ${getThemeClasses(event.name)} 
              ${isHidden ? 'pointer-events-none' : 'pointer-events-auto'}`}
              style={{
                zIndex: eventList.length - i,
                transform: `translateZ(${depth * -50}px) translateY(${depth * -10}px)`,
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%), url(${event.imgSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: isHidden ? 'none' : 'flex'
              }}
            >
              {/* Thematic Overlays */}
              {event.name === "Codemoji" && (
                <div className="absolute inset-0 opacity-10 pointer-events-none font-mono text-[10px] break-all animate-pulse p-2">
                  {"🤔💻01😂❓👉🏼✍🏼".repeat(50)}
                </div>
              )}

              {/* Card Content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-2 block">
                  Tech Quest
                </span>
                <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">
                  {event.name}
                </h2>

                <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-2">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Entry Fee</p>
                    <p className="text-lg font-bold">₹{event.fees}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase">Team Size</p>
                    <p className="text-lg font-bold">{event.teamsize}</p>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
      :
      <div className='h-50 text-white flex justify-center text-6xl items-center'>Tech events component is getting designed</div>}
    </div>
  );
};

export default DetailedEventDeck;