import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { House, Info } from 'lucide-react';
import { timelineItems } from '../assets/Data';

gsap.registerPlugin(ScrollTrigger);

const TechTimeline = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Line Drawing Animation using pathLength logic
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 1 }, 
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 95%",
            scrub: 0.5,
          },
        }
      );

      // 2. Animate items with staggered entrance
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        gsap.from(item, {
          opacity: 0,
          x: isEven ? 50 : -50, // Slide in from their respective sides
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 text-white overflow-hidden min-h-screen"
    >
      {/* Clipped Background Image Container */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none work-bg"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-5xl lg:text-7xl font-bold font-cinzel text-center mb-24 tracking-widest text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500">
          TIMELINE
        </h2>

        <div className="relative">
          {/* The Animated SVG Path */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5">
            <svg
              width="2"
              height="100%"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {/* Background Path */}
              <line
                x1="1" y1="0" x2="1" y2="100"
                stroke="rgba(255,255,255,0.1)" strokeWidth="2"
              />
              {/* Animated Path */}
              <line
                ref={lineRef}
                x1="1" y1="0" x2="1" y2="100"
                stroke="#60a5fa" 
                strokeWidth="2"
                pathLength="1" // This is the secret sauce
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            </svg>
          </div>

          {/* Timeline Items */}
          <div className="space-y-20">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`timeline-item relative flex items-center justify-between md:justify-normal w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card with Glassmorphism */}
                  <div className="w-[85%] md:w-[42%] p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl ml-12 md:ml-0 group hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <item.Icon className="text-blue-400 w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-blue-400 tracking-tighter uppercase">
                        Day {item.date} • {item.time}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {item.heading}
                    </h3>
                  </div>

                  {/* Dot on the line with Glow */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-20 shadow-[0_0_15px_rgba(96,165,250,0.8)] border-2 border-white" />
                  
                  {/* Spacer to maintain layout */}
                  <div className="hidden md:block w-[42%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechTimeline;