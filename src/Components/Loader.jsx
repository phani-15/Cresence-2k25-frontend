import React, { useEffect, useRef } from 'react';
import {useNavigate} from "react-router-dom"
import gsap from 'gsap';

export default function AladdinLampLoader() {
  const containerRef = useRef(null);
  const revealMaskRef = useRef(null);
  const navigate=useNavigate()

  useEffect(() => {
  const ctx = gsap.context(() => {

    const revealTl = gsap.timeline({
      repeat: 0,
      repeatDelay: 0.5,
      onComplete: () => {
        navigate("/home"); // <-- target route
      }
    });

    revealTl.set(revealMaskRef.current, { y: 1561 });

    revealTl.to(revealMaskRef.current, {
      y: -100,
      duration: 2.5,
      ease: "power2.inOut"
    });

  }, containerRef);

  return () => ctx.revert();
}, [navigate]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-black font-sans overflow-hidden">
      <div
        ref={containerRef}
        className="w-full max-w-60 p-8 relative text-center"
      >
        <svg
          viewBox="0 0 2786 1561"
          xmlns="http://www.w3.org/2000/svg"    
          className="w-full drop-shadow-[0_0_60px_rgba(253,185,49,0.4)] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* WAVE-BASED REVEAL MASK - Ripples up from bottom */}
            <mask id="reveal-mask">
              <rect x="0" y="0" width="2786" height="1561" fill="black" />
              {/* Wave pattern that reveals the lamp - moves up */}
              <g ref={revealMaskRef}>
                <path
                  d="M 0,0
                     Q 200,-80 400,0
                     T 800,0
                     T 1200,0
                     T 1600,0
                     T 2000,0
                     T 2400,0
                     T 2800,0
                     L 2800,2000
                     L 0,2000
                     Z"
                  fill="white"
                />
              </g>
            </mask>

            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="20" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LAYER 1: Ambient Glow Background */}
          <image
            href="/images/lamp.png"
            x="0"
            y="0"
            width="2786"
            height="1561"
            opacity="0.05"
            filter="url(#glow)"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* LAYER 2: The Lamp Image with Wave-Based Progressive Reveal Mask */}
          <image
            href="/images/lamp.png"
            x="0"
            y="0"
            width="2786"
            height="1561"
            mask="url(#reveal-mask)"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
}