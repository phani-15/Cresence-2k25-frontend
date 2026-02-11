import React, { useRef } from "react";
import Navbar from "./Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger (even if using auto-play, usually good practice in GSAP React setups if scroll is involved later)
gsap.registerPlugin(ScrollTrigger);

export default function HomeScene() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
    });

    // Initial State: Small mask (Lamp size)
    // Animation: Scales up huge to reveal the full image
    tl.fromTo(imgRef.current,
      {
        maskSize: "200px",    // Start small (~200px as requested)
        maskPosition: "50% 50%",
        scale: 1  ,
        color:""          // Slight zoom on image for effect
      },
      {
        maskSize: "580vmax",  // Scale massive to reveal everything (covers viewport)
        scale: 1,
        maskPosition:"60% 78%",             // Zoom out image slightly
        duration: 2.0,
        ease: "power2.inOut"
      }
    );

  }, { scope: containerRef });  

  return (
    <div ref={containerRef} id="main" className="bg-black relative min-w-screen min-h-screen overflow-hidden">
      <div className="w-full h-screen  bg-black">
        <img
          ref={imgRef}
          src="./images/main_img.png"
          className=" mask-img w-full h-full object-right fixed"
          alt="Main Reveal"
        />
      </div>
            <Navbar />
    </div>
  );
}
