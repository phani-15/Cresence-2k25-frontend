import React, { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Ourteam from "../Components/Ourteam";
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

  useGSAP(() => {
    // Phase 1: Morphing animation — mask expands from lamp shape to full screen
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationDone(true);
      },
    });

    tl.add("start")
      // Expand the masked background image (the reveal)
      .fromTo(
        imgRef.current,
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
          ease: "power2.inOut",
        },
        "start"
      )
      // Shrink and fade the lamp overlay in sync
      .fromTo(
        overlayRef.current,
        {
          backgroundSize: "200px",
          backgroundPosition: "50% 50%",
          opacity: 1,
        },
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
      // Fade in navbar after reveal
      .from(
        navbarref.current,
        {
          opacity: 0,
          duration: 1,
        },
        "end"
      )
      // Stagger in the heading letters
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
      // Slide in the subtitle text
      .from(
        ".entry-scene-text",
        {
          y: 100,
          opacity: 0,
          duration: 1,
        },
        "end"
      )
      // Reveal the scroll content from invisible → visible (no positional shift)
      .to(
        scrollContentRef.current,
        {
          autoAlpha: 1, // visibility + opacity together, avoids DOM removal
          duration: 0.6,
          ease: "power2.out",
        },
        "end+=0.4" // slight delay so it doesn't clash with the reveal
      );
  }, { scope: containerRef });

  return (
    /*
      OUTER WRAPPER
      ─────────────
      • overflow-x-hidden stops horizontal bleed
      • overflow-y-auto lets the page scroll
      • The background classes are applied here so the fixed ::before pseudo-element
        acts as the persistent backdrop across all scroll positions.
    */
    <div
      ref={containerRef}
      id="main"
      className={`relative ${
        animationDone ? "night-bg-mobile md:night-bg" : "bg-black"
      } min-w-screen overflow-x-hidden overflow-y-auto`}
    >
      {/*
        HERO VIEWPORT SECTION
        ──────────────────────
        Exactly one viewport tall. Contains the mask animation target and overlay.
        position:relative + z-index:0 so it sits above the fixed ::before bg.
      */}
      <div className="w-full h-screen relative z-0 flex flex-col items-center justify-center">

        {/*
          MASK TARGET DIV
          ───────────────
          • The mask-img utility class applies the lamp mask via CSS mask-image.
          • GSAP animates maskSize and maskPosition on this element to create the
            morphing reveal effect.
          • It does NOT contain child components — that was the original bug.
            Children inside a masked element inherit the mask and become invisible
            until the mask fully expands. They now live in scrollContentRef below.
          • bg-transparent once animation done — the fixed ::before on the parent
            provides the persistent background.
        */}
        <div
          ref={imgRef}
          className={`mask-img ${
            animationDone ? "bg-transparent" : "night-bg-mobile md:night-bg"
          } absolute inset-0 w-full h-full`}
        />

        {/*
          LAMP COLOUR OVERLAY
          ────────────────────
          Starts at full opacity, fades to 0 in sync with the mask expanding.
          pointer-events-none so it never blocks interaction.
        */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: "url(./images/lamp.png)",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Hero text — only visible on mobile, fades in after reveal */}
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

      {/*
        SCROLL CONTENT
        ──────────────
        • Lives OUTSIDE the mask div — critical fix.
        • visibility:hidden + opacity:0 (autoAlpha:0) hides it while the
          morphing animation plays, then GSAP reveals it cleanly.
        • position:relative + z-index:1 ensures it renders above the fixed bg.
        • The background of each child component should be transparent so the
          fixed ::before background on #main shows through → parallax effect.
        • As the user scrolls down, the fixed bg stays put while this content
          travels over it — classic CSS parallax with zero JS overhead.
      */}
      <div
        ref={scrollContentRef}
        className="relative z-10"
        style={{ visibility: "hidden", opacity: 0 }} // GSAP autoAlpha controls this
      >
        <Ourteam />
        {/* Add more sections here — keep their backgrounds transparent */}
      </div>

      {/* Navbar always on top */}
      <Navbar ref={navbarref} />
      <Workshops/>
    </div>
  );
}