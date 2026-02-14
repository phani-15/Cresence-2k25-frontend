import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransition } from "../Context/TransitionContext";

const PageTransition = () => {
  const { isActive } = useTransition();

  const containerRef = useRef();
  const leftRockRef = useRef();
  const rightRockRef = useRef();
  const dialogueRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    // Logic for responsiveness
    const gap = window.innerWidth < 768 ? 2 : 2;
    const moveX = window.innerWidth / 2 - gap / 2;


    if (isActive) {
      // CLEAR PREVIOUS ANIMATIONS
      gsap.killTweensOf([leftRockRef.current, rightRockRef.current, dialogueRef.current, ".char"]);

      const tl = gsap.timeline();

      // CLOSE ROCKS (Meet at center with a clean gap)
      tl.to(leftRockRef.current, {
        x: moveX,
        duration: 0.9,
        ease: "power3.inOut",
      })
        .to(rightRockRef.current, {
          x: -moveX,
          duration: 0.9,
          ease: "power3.inOut",
        }, 0)
        .to(dialogueRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.2");

      // Mystical "kulzaaa sim sim !!" animation
      const text = "kulzaaa sim sim !!";
      textRef.current.innerHTML = text.split("").map(char =>
        `<span class="char inline-block translate-y-2 opacity-0 blur-sm">${char === " " ? "&nbsp;" : char}</span>`
      ).join("");

      gsap.to(textRef.current.querySelectorAll(".char"), {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.04,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          // Add a subtle pulse effect after appearing
          gsap.to(textRef.current.querySelectorAll(".char"), {
            opacity: 0.6,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 0.05,
              from: "center"
            },
            ease: "sine.inOut"
          });
        }
      });

    } else {
      // OPEN ROCKS
      const openTl = gsap.timeline();

      openTl.to(dialogueRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.4,
        ease: "power2.in"
      })
        .to([leftRockRef.current, rightRockRef.current], {
          x: 0,
          duration: 0.8,
          ease: "power3.inOut",
          stagger: 0.05
        }, "-=0.2");
    }

    return () => {
      gsap.killTweensOf(".char");
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-9999 overflow-hidden ${isActive ? "pointer-events-auto" : "pointer-events-none"
        }`}
    >
      {/* Background Dim */}
      {isActive && (
        <div className="absolute inset-0  backdrop-blur-[3px] transition-opacity duration-700" />
      )}

      {/* LEFT ROCK */}
      <div
        ref={leftRockRef}
        className="absolute top-0 left-[-50%] h-full w-3/2 md:w-2/3 z-20 flex items-center justify-end"
      >
        <img
          src="/images/rock-left.jpg"
          alt="left rock door"
          className="h-full -translate-x-93 md:-translate-x-63  w-full  pointer-events-none drop-shadow-[10px_0_15px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* RIGHT ROCK */}
      <div
        ref={rightRockRef}
        className="absolute top-0 right-[-50%] h-full w-3/2 md:w-1/2 z-20 flex items-center justify-start"
      >
        <img
          src="/images/rock-right.jpg"
          alt="right rock door"
          className="h-full w-full  translate-x-93 md:translate-x-0 pointer-events-none drop-shadow-[-10px_0_15px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* DIALOGUE BOX (Top Right) */}
      <div
        ref={dialogueRef}
        className="absolute top-8 right-8 md:top-12 md:right-12 z-30 opacity-0 translate-y-4 scale-90 w-56 md:w-80 aspect-[2.5/1] flex items-center justify-center pointer-events-none"
        style={{
          backgroundImage: 'url("/images/kulza.png")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h2
          ref={textRef}
          className="font-arabian text-amber-500 text-base md:text-2xl text-center leading-tight drop-shadow-[0_0_10px_rgba(218,152,12,0.6)] px-8"
        >
          kulzaaa sim sim !!
        </h2>
      </div>
    </div>
  );
};

export default PageTransition;
