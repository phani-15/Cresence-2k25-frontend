import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Ourteamforhome from "../Components/Ourteamforhome";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import Workshops from "./Workshops";

gsap.registerPlugin(ScrollTrigger);

export default function HomeScene() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const navbarref = useRef(null);
  const overlayRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []); 

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        setAnimationDone(true);
      },
    });

    tl.add("start")
      .fromTo(
        imgRef.current,
        { maskSize: "200px", maskPosition: "50% 50%", scale: 1 },
        {
          maskSize: "580vmax",
          scale: 1,
          maskPosition: "60% 78%",
          duration: 2.0,
          ease: "power2.inOut",
        },
        "start"
      )
      .fromTo(
        overlayRef.current,
        { backgroundSize: "200px", backgroundPosition: "50% 50%", opacity: 1 },
        {
          backgroundSize: "580vmax",
          backgroundPosition: "60% 78%",
          opacity: 0,
          duration: 2.0,
          ease: "power2.inOut",
        },
        "start"
      )
      .add("end")
      .from(navbarref.current, { opacity: 0, duration: 1 }, "end")
      .from(
        "h1 span",
        {
          y: "100%",
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "end"
      )
      .from(".entry-scene-text", { y: 100, opacity: 0, duration: 1 }, "end")
      .to(
        scrollContentRef.current,
        { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
        "end+=0.4"
      );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      id="main"
      className={`relative ${
        animationDone ? "night-bg-mobile md:night-bg" : "bg-black"
      } min-w-screen overflow-x-hidden`}
    >
      <div className="w-full h-screen relative z-0 flex flex-col items-center justify-center">
        <div
          ref={imgRef}
          className={`mask-img ${
            animationDone ? "bg-transparent" : "night-bg-mobile md:night-bg"
          } absolute inset-0 w-full h-full`}
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: "url(./images/lamp.png)",
            backgroundRepeat: "no-repeat",
          }}
        />
        <h1 className="text-white absolute top-0 right-0 md:hidden text-[7vh] mt-80 mr-10 font-arabian z-20">
          {"cresence".split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="absolute font-arabian top-95 right-12 md:hidden text-white text-[20px] entry-scene-text z-20">
          2k26
        </p>
      </div>
      <div
        ref={scrollContentRef}
        className="relative z-10"
        style={{ visibility: "hidden", opacity: 0 }}
      >
      </div>
      <Workshops/>
        <Ourteamforhome />
      <Navbar ref={navbarref} />
    </div>
  );
}