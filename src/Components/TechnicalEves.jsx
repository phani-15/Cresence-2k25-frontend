import React, { useState, useRef, useEffect,useCallback } from 'react';
import { gsap } from 'gsap';
import { technicalEventsData } from '../assets/Data';

  const DesktopEventCard = ({ event }) => (
    <ArabianCard
      className="event-card-desktop"
      style={{ borderRadius: '0.5rem', cursor: 'pointer' }}
      onClick={() => setSelectedEvent(event.name)}
      intensity={15}
      scale={1.05}
    >
      <div
        className="bg-[url('/images/event_frame1.png')] bg-no-repeat bg-center bg-cover rounded-lg shadow-lg w-[300px] h-[450px]"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}
      >
        {/* Event image — 20px padding keeps it inside the frame border art */}
        <div style={{ padding: '30px 25px 5px 25px', width: '100%' }}>
          <img
            src={event.imgSrc}
            alt={event.name}
            className="w-full h-[260px] object-cover rounded-md shadow-inner"
            style={{
              display: 'block',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            }}
          />
        </div>
        <div className="flex-1 flex items-center justify-center px-6 pb-6 w-full">
          <p
            className="font-cinzel text-center text-white text-base font-bold tracking-wide"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)', lineHeight: 1.2 }}
          >
            {event.name}
          </p>
        </div>
      </div>
    </ArabianCard>
  )

  function ArabianCard({
    children,
    className = '',
    style = {},
    onClick,
    intensity = 16,
    scale = 1.06,
  }) {
    const wrapperRef = useRef(null)
    const cardRef = useRef(null)
    const shimmerRef = useRef(null)   // warm sand bands
    const glowRef = useRef(null)   // amber/crimson cursor light
    const borderRef = useRef(null)   // golden border ring
    const shadowRef = useRef(null)   // ember under-glow
  
    const rafRef = useRef(null)
    const state = useRef({ isHovered: false, targetRX: 0, targetRY: 0, currentRX: 0, currentRY: 0 })
  
    const lerp = (a, b, t) => a + (b - a) * t
  
    const updateOverlays = useCallback((rx, ry) => {
      const tiltMag = Math.sqrt(rx * rx + ry * ry) / intensity
  
      if (glowRef.current) {
        const lx = 50 + (ry / intensity) * 42
        const ly = 50 - (rx / intensity) * 42
        glowRef.current.style.background = `
          radial-gradient(
            ellipse 58% 58% at ${lx}% ${ly}%,
            rgba(255, 175,  55, ${0.17 + tiltMag * 0.20}) 0%,
            rgba(210,  75,  20, ${0.08 + tiltMag * 0.10}) 45%,
            rgba(110,  15,  35, 0.04)                     72%,
            transparent                                    90%
          )
        `
        glowRef.current.style.opacity = tiltMag > 0.04 ? '1' : '0'
      }
  
      /* Sand-dust shimmer — warm diagonal cream bands, zero rainbow */
      if (shimmerRef.current) {
        const angle = 28 + (ry / intensity) * 22
        const a = 0.035 + tiltMag * 0.09
        shimmerRef.current.style.backgroundImage = `
          repeating-linear-gradient(
            ${angle}deg,
            transparent                       0px,
            rgba(255, 230, 160, ${a})        16px,
            rgba(255, 210,  90, ${a * 0.5}) 20px,
            transparent                      30px
          )
        `
        shimmerRef.current.style.opacity = String(tiltMag * 0.95)
      }
  
      /* Ember drop-shadow — hot coals beneath the card */
      if (shadowRef.current) {
        const lift = tiltMag * 26
        const spread = tiltMag * 12
        shadowRef.current.style.transform = `translateY(${lift}px) scaleX(${0.82 + tiltMag * 0.12})`
        shadowRef.current.style.opacity = String(0.25 + tiltMag * 0.55)
        shadowRef.current.style.filter = `blur(${10 + spread}px)`
      }
    }, [intensity])
  
    /* ── RAF tick ── */
    const tick = useCallback(() => {
      const s = state.current
      if (!s.isHovered) {
        s.currentRX = lerp(s.currentRX, 0, 0.09)
        s.currentRY = lerp(s.currentRY, 0, 0.09)
        if (Math.abs(s.currentRX) < 0.01 && Math.abs(s.currentRY) < 0.01) {
          s.currentRX = 0; s.currentRY = 0
          rafRef.current = null
          if (cardRef.current) gsap.set(cardRef.current, { rotateX: 0, rotateY: 0 })
          updateOverlays(0, 0)
          return
        }
      } else {
        s.currentRX = lerp(s.currentRX, s.targetRX, 0.13)
        s.currentRY = lerp(s.currentRY, s.targetRY, 0.13)
      }
      if (cardRef.current) {
        gsap.set(cardRef.current, {
          rotateX: s.currentRX, rotateY: s.currentRY,
          transformPerspective: 900, transformOrigin: 'center center',
        })
      }
      updateOverlays(s.currentRX, s.currentRY)
      rafRef.current = requestAnimationFrame(tick)
    }, [updateOverlays])
  
    /* ── mouseenter ── */
    const handleMouseEnter = useCallback(() => {
      state.current.isHovered = true
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
      gsap.to(cardRef.current, { scale, duration: 0.4, ease: 'power2.out', overwrite: true })
      if (borderRef.current) {
        borderRef.current.style.opacity = '1'
        borderRef.current.style.boxShadow = `
          0 0 0 1px rgba(200, 145, 40, 0.6),
          0 0 20px rgba(190,  90, 15, 0.4),
          inset 0 0 14px rgba(160,  60, 10, 0.12)
        `
      }
    }, [scale, tick])
  
    /* ── mousemove ── */
    const handleMouseMove = useCallback((e) => {
      const rect = wrapperRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left, y = e.clientY - rect.top
      const cx = rect.width / 2, cy = rect.height / 2
      const nx = -Math.cos((x / rect.width) * Math.PI)
      const ny = Math.cos((y / rect.height) * Math.PI)
      const str = Math.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2)
      state.current.targetRY = nx * intensity * Math.min(str, 1)
      state.current.targetRX = ny * intensity * Math.min(str, 1)
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    }, [intensity, tick])
  
    /* ── mouseleave ── */
    const handleMouseLeave = useCallback(() => {
      state.current.isHovered = false
      gsap.to(cardRef.current, { scale: 1, duration: 0.55, ease: 'power3.out', overwrite: true })
      if (borderRef.current) {
        borderRef.current.style.boxShadow = ''
        borderRef.current.style.opacity = '0'
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    }, [tick])
  
    useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])
  
    return (
      <div
        ref={wrapperRef}
        className={className}
        style={{ perspective: '900px', display: 'inline-block', position: 'relative', ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* Ember drop-shadow (beneath the card, outside rotating shell) */}
        <div
          ref={shadowRef}
          style={{
            position: 'absolute', bottom: '-6px', left: '10%', width: '80%', height: '18px',
            background: 'radial-gradient(ellipse at center, rgba(200,70,15,0.75) 0%, transparent 70%)',
            opacity: 0, filter: 'blur(12px)', pointerEvents: 'none', zIndex: 0,
            transformOrigin: 'center top', transition: 'opacity 0.3s ease',
          }}
        />
  
        {/* Rotating card shell */}
        <div
          ref={cardRef}
          style={{
            width: '100%', height: '100%', position: 'relative',
            transformStyle: 'preserve-3d', willChange: 'transform',
            borderRadius: 'inherit', zIndex: 1,
          }}
        >
          {children}
  
          {/* Sand shimmer */}
          <div
            ref={shimmerRef}
            style={{
              position: 'absolute', inset: 0, borderRadius: 'inherit',
              pointerEvents: 'none', zIndex: 20, opacity: 0, mixBlendMode: 'screen',
            }}
          />
  
          {/* Amber/crimson cursor glow */}
          <div
            ref={glowRef}
            style={{
              position: 'absolute', inset: 0, borderRadius: 'inherit',
              pointerEvents: 'none', zIndex: 21, opacity: 0, mixBlendMode: 'screen',
            }}
          />
  
          {/* Golden ornate border */}
          <div
            ref={borderRef}
            style={{
              position: 'absolute', inset: 0, borderRadius: 'inherit',
              pointerEvents: 'none', zIndex: 22,
              border: '1px solid rgba(200,140,40,0)',
              opacity: 0, transition: 'opacity 0.35s ease, box-shadow 0.35s ease',
            }}
          />
        </div>
      </div>
    )
  }

const DetailedEventDeck = ({ events,name }) => {
  const isMobile = window.innerWidth <= 768
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
    <div className="overflow-hidden mt-22">
      <h1 className='text-3xl lg:text-7xl font-arabian text-white
               bg-clip-text  font-semibold text-center drop-shadow-sm'>{name}</h1>
        <>
        <div
        className='flex flex-wrap gap-23 mt-10 justify-evenly'
        style={{
                padding: '0 24px 48px',
              }}>
                {Object.values(technicalEventsData).map((event, i) => (
                  <DesktopEventCard key={i} event={event} />
                ))}
              </div>
    </>
    </div>
  );
};

export default DetailedEventDeck;