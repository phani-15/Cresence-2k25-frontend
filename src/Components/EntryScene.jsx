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
  const navbarref = useRef(null);
  const overlayRef = useRef(null); // Ref for color overlay

  useGSAP(() => {
    const tl = gsap.timeline({
    });
    tl.add("start")
      .fromTo(imgRef.current,
        {
          maskSize: "200px",
          maskPosition: "50% 50%",
          scale: 1,
        },
        {
          maskSize: "580vmax",
          scale: 1,
          maskPosition: "60% 78%",
          duration: 2.0,
          ease: "power2.inOut"
        },
        "start"
      )
      .fromTo(overlayRef.current,
        {
          backgroundSize: "200px",
          backgroundPosition: "50% 50%",
          opacity: 1
        },
        {
          backgroundSize: "580vmax",
          backgroundPosition: "60% 78%",
          opacity: 0,
          duration: 2.0,
          ease: "power2.inOut"
        },
        "start"
      )
      .add("end")
      .from(navbarref.current, {
        opacity: 0,
        duration: 1,
      }, "end")
      .from("h1 span",{
        y:"100%",
        opacity:0,
        duration:0.5,
        stagger:0.08,
        ease:"power2.out"
      },"end")
      .from(".entry-scene-text", { // 👈 Target only the specific p tag
      y: 100,
      opacity: 0,
      duration: 1,
    }, "end")

  },{scope:containerRef});

  return (
    <div ref={containerRef} id="main" className="bg-black relative min-w-screen min-h-screen overflow-hidden">
      <div className="w-full h-screen bg-black relative flex items-center justify-center">
        <div
          ref={imgRef}
          className="mask-img night-bg-mobile md:night-bg w-full h-full object-cover object-right fixed"
          alt="Main Reveal">

        </div>

        {/* Color Overlay Lamp - Synced with Mask */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'url(./images/lamp.png)',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div> 
      <Navbar ref={navbarref} />
      <h1 className="text-white absolute top-0 right-0 md:hidden text-[7vh] mt-80 mr-10 font-arabian">
        {"cresence".split("").map((char, i) => (
										<span key={i} className="inline-block">
											{char === " " ? "\u00A0" : char}
										</span>
      ))}
      </h1>
<p className="absolute font-arabian top-95 right-12 md:hidden text-white text-[20px] entry-scene-text">
  2k26
</p>    </div>
  );
}
