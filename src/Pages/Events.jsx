import { workshopsData } from '../assets/Data'
import Navbar from '../Components/Navbar'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { technicalEventsData, nonTechnicalEventsData, eSportsData } from '../assets/Data'
import { ChevronLeft, Calendar, IndianRupee } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)
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

/* ══════════════════════════════════════════════
   Main Events Component
══════════════════════════════════════════════ */
export default function Events() {
  const [selected, setSelected] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("")
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const eventsMap = {
    "Tech Events": technicalEventsData,
    "Non-Tech Events": nonTechnicalEventsData,
    "E-Sports": eSportsData,
  }
  const categories = ["Tech Events", "Non-Tech Events", "E-Sports"]

  const carouselRef = useRef(null)
  const eventCardsRef = useRef(null)
  const scrollDetailRef = useRef(null)
  const navigate = useNavigate()

  /* ── responsive ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ── desktop category scroll-trigger ── */
  useEffect(() => {
    if (isMobile || !carouselRef.current) return
    const cards = gsap.utils.toArray(".category-card")
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0.25, scale: 0.7, y: 120, zIndex: 1 },
        {
          opacity: 1, scale: 1, y: 0, zIndex: 10, ease: "none",
          scrollTrigger: { trigger: card, start: "top 75%", end: "top 35%", scrub: true }
        }
      )
      gsap.to(card, {
        opacity: 0.25, scale: 0.7, y: -120, zIndex: 1, ease: "none",
        scrollTrigger: { trigger: card, start: "top 35%", end: "top -10%", scrub: true }
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [isMobile])

  /* ── mobile event cards entrance ── */
  useEffect(() => {
    if (isMobile && selected !== "" && selectedEvent === "" && eventCardsRef.current) {
      const cards = eventCardsRef.current.querySelectorAll('.event-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" }
      )
    }
  }, [selected, selectedEvent, isMobile])

  /* ── mobile detail entrance ── */
  useEffect(() => {
    if (isMobile && selectedEvent !== "" && scrollDetailRef.current) {
      const scroll = scrollDetailRef.current
      const image = scroll.querySelector('.detail-image')
      const content = scroll.querySelector('.detail-content')
      gsap.fromTo(scroll, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" })
      if (image) gsap.fromTo(image, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" })
      if (content?.children) gsap.fromTo(content.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" })
    }
  }, [selectedEvent, isMobile])

  /* ── desktop event cards entrance ── */
  useEffect(() => {
    if (!isMobile && selected !== "" && selectedEvent === "") {
      const cards = document.querySelectorAll('.event-card-desktop')
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(1.4)" }
      )
    }
  }, [selected, selectedEvent, isMobile])

  const handleCategorySelect = (category) => {
    const cards = carouselRef.current?.querySelectorAll('.category-card')
    const selectedCard = cards?.[categories.indexOf(category)]
    if (selectedCard) {
      gsap.to(selectedCard, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => setSelected(category) })
    } else {
      setSelected(category)
    }
  }

  const handleScroll = (e) => {
    const container = e.currentTarget
    const cards = container.querySelectorAll('.category-card')
    const containerRect = container.getBoundingClientRect()
    const centerY = containerRect.top + containerRect.height / 2
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenterY = cardRect.top + cardRect.height / 2
      const proximity = 1 - Math.min(Math.abs(centerY - cardCenterY) / (containerRect.height / 2), 1)
      gsap.to(card, { scale: 0.75 + proximity * 0.25, opacity: 0.5 + proximity * 0.5, y: (1 - proximity) * 50, zIndex: Math.round(proximity * 10), duration: 0.3, ease: "power2.out" })
      if (proximity > 0.8) setActiveCardIndex(index)
    })
  }

  const handleBackToCategories = () => {
    const cards = eventCardsRef.current?.querySelectorAll('.event-card')
    if (cards?.length > 0) {
      gsap.to(cards, { opacity: 0, scale: 0.9, y: -30, duration: 0.3, stagger: 0.05, onComplete: () => setSelected("") })
    } else {
      setSelected("")
    }
  }

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
            className="w-full h-[220px] object-cover rounded-md shadow-inner"
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

  /* ─── Desktop Category Card ─── */
  const DesktopCategoryCard = ({ category }) => (
    <div
      className="category-card cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95"
      onClick={() => setSelected(category)}
    >
      <div className="bg-frame text-white p-6 rounded-lg  w-80 h-[40vh] flex items-center justify-center">
        <h2 className="text-3xl font-arabian mx-10 text-center font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{category}</h2>
      </div>
    </div>
  )

  /* ─── Mobile Category Card ─── */
  const MobileCategoryCard = ({ category }) => (
    <div className="category-card snap-center flex items-center justify-center min-h-[350px]" onClick={() => handleCategorySelect(category)}>
      <div className="bg-frame w-full max-w-sm h-[40vh]   overflow-hidden flex items-center justify-center transform transition-transform duration-300 active:scale-95">
        <h2 className="text-3xl px-15 pt-15 font-cinzel text-center font-bold text-white drop-shadow-lg leading-relaxed tracking-wider">{category}</h2>
      </div>
    </div>
  )

  /* ─── Mobile Event Card ─── */
  const MobileEventCard = ({ event }) => (
    <div className="event-card backdrop-blur-md rounded-2xl shadow-xl overflow-visible">
      <ArabianCard style={{ borderRadius: '1rem', width: '100%', display: 'block', cursor: 'pointer' }} intensity={13} scale={1.03} onClick={() => setSelectedEvent(event.name)}>
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <img src={event.imgSrc} alt={event.name} className="w-full h-56 object-cover" style={{ display: 'block' }} />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3 className="text-2xl font-cinzel font-bold text-white mb-2 drop-shadow-lg">{event.name}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.dates}</span>
              <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4" />{event.fees}</span>
            </div>
          </div>
        </div>
      </ArabianCard>
    </div>
  )

  /* ══════════════════════════════════════════
     Render
  ══════════════════════════════════════════ */
  return (
    <div className='event-bg'>
      <Navbar />

      {isMobile ? (
        /* ── MOBILE ── */
        <div className="pb-20 mt-10">
          {selected === "" ? (
            <div className="min-h-screen flex flex-col">
              <h1 className='text-5xl font-serif text-slate-50 font-cinzel font-bold text-center pt-12 pb-8 tracking-wider'>Events</h1>
              <div ref={carouselRef} onScroll={handleScroll} className="flex-1 overflow-y-auto snap-y snap-mandatory px-6 py-10 space-y-8" style={{ scrollSnapType: 'y mandatory' }}>
                {categories.map((cat, i) => <MobileCategoryCard key={i} category={cat} />)}
              </div>
            </div>

          ) : selectedEvent === "" ? (
            <div>
              <h1 className='text-4xl font-serif text-white font-cinzel font-bold text-center pt-10 pb-6 tracking-wide'>{selected}</h1>
              <button onClick={handleBackToCategories} className='text-slate-300 flex items-center ml-6 mb-6 hover:text-white transition-colors group'>
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="ml-1">Back to All Events</span>
              </button>
              <div ref={eventCardsRef} className='grid grid-cols-1 gap-8 px-6 pb-10'>
                {Object.values(eventsMap[selected]).map((event, i) => <MobileEventCard key={i} event={event} />)}
              </div>
            </div>

          ) : (
            <div className="min-h-screen pb-10">
              <h1 className='text-4xl font-serif text-white font-cinzel font-bold text-center pt-10 pb-6 tracking-wide'>{selectedEvent}</h1>
              <button onClick={() => setSelectedEvent("")} className='text-slate-300 flex items-center ml-6 mb-8 hover:text-white transition-colors group'>
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="ml-1">Back to {selected}</span>
              </button>
              <div className="flex justify-center">
                <div ref={scrollDetailRef} className="ws-bg w-[80vh] max-w-md">
                  <div className="py-15 px-8">
                    <div className="detail-image flex justify-center">
                      <img src={eventsMap[selected][selectedEvent].imgSrc} alt={eventsMap[selected][selectedEvent].name} className="w-full max-w-[50vw] max-h-[20vh] object-cover mt-7 rounded-lg shadow-2xl" />
                    </div>
                    <div className="detail-content space-y-2">
                      {/* <h2 className="text-xl px-7 font-cinzel font-semibold text-center text-amber-100 drop-shadow-md">{eventsMap[selected][selectedEvent].name.toUpperCase()}</h2> */}
                      <p className="text-amber-50/90 text-xs  text-center italic px-11">{eventsMap[selected][selectedEvent].about}</p>
                      <div className="space-t-3">
                        <h3 className="text-lg font-cinzel font-bold text-amber-100 text-center">Coordinators</h3>
                        {eventsMap[selected][selectedEvent].coordinators.map((c, i) => (
                          <p key={i} className="text-amber-100 text-center italic text-xs">{c.name+" " + c.contact}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br text-xs from-amber-900/40 to-red-950/60 backdrop-blur-sm border-2 border-amber-700/60 rounded-xl mx-7 p-2 shadow-lg">
                <div className="flex items-center justify-between text-amber-50">
                  <span className="flex items-center gap-2 font-semibold"><IndianRupee className="w-5 h-5 text-amber-400" />Fees</span>
                  <span className="font-bold text-amber-200">{eventsMap[selected][selectedEvent].fees}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 active:scale-95 font-cinzel text-lg">
                Register Now
              </button>
            </div>
          )}
        </div>

      ) : (
        /* ── DESKTOP ── */
        <div className='backdrop-blur-xs'>
          {selected === "" ? (
            <>
              <h1 className='text-6xl font-serif text-slate-50 font-cinzel font-semibold text-center py-10'>Events</h1>
              <div className='flex flex-wrap justify-center gap-20 mt-15'>
                {categories.map((cat, i) => <DesktopCategoryCard key={i} category={cat} />)}
              </div>
            </>

          ) : selectedEvent === "" ? (
            <>
              <h1 className='text-6xl font-serif text-white font-cinzel font-semibold text-center py-10'>{selected}</h1>
              <p onClick={() => setSelected("")} className='text-slate-300 flex ml-10 cursor-pointer hover:text-white transition-colors mb-5'>
                <span><ChevronLeft /></span> Back to All events
              </p>

              {/* ── 3 cards per row ── */}
              <div style={{
                
                padding: '0 24px 48px',
              }} className='flex flex-wrap gap-23 justify-evenly'>
                {Object.values(eventsMap[selected]).map((event, i) => (
                  <DesktopEventCard key={i} event={event} />
                ))}
              </div>
            </>

          ) : (
            <>
              <h1 className='text-6xl font-serif z-40 text-white font-cinzel text-center pt-10 pb-5'>{selectedEvent}</h1>
              <p onClick={() => setSelectedEvent("")} className='text-slate-300 flex ml-10 cursor-pointer hover:text-white transition-colors'>
                <span><ChevronLeft /></span> Back to all {selected}
              </p>
              <div className="flex justify-center px-6">
                <div className="flex flex-col lg:flex-row mt-2 items-stretch justify-center gap-10 max-w-7xl">

                  {/* LEFT: IMAGE & INFO */}
                  <div className="flex flex-col items-center justify-center w-full lg:w-1/3">
                    <img src={eventsMap[selected][selectedEvent].imgSrc} alt={eventsMap[selected][selectedEvent].name} className="w-full rounded-xl object-cover shadow-md " loading="lazy" />
                    <div className="w-full flex flex-col gap-6 mt-6">
                      <h2 className="text-2xl md:text-3xl text-slate-200 font-cinzel font-semibold">{eventsMap[selected][selectedEvent].name.toUpperCase()}</h2>
                      <div className="bg-violet-950/50 border border-violet-800 rounded-xl text-slate-100 p-5">
                        <p>Date: <span className="font-bold">{eventsMap[selected][selectedEvent].dates}</span></p>
                        <p>Fees: <span className="font-bold">{eventsMap[selected][selectedEvent].fees}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: SCROLL CARD */}
                  <div className="ws-bg w-225  flex flex-col items-center justify-center text-center">
                    <div className="w-[80%] md:w-[60%] lg:w-[59%] flex flex-col gap-8">
                      <div className="space-y-2 mt-37 ">
                        <h2 className="text-3xl font-cinzel text-white border-b border-white/20 pb-1 inline-block">About</h2>
                        <p className="text-white text-xs md:text-base ">{eventsMap[selected][selectedEvent].about}</p>
                      </div>
                      <div className="space-y-2 mt-2 px-6">
                        <h2 className="text-3xl font-cinzel text-white border-b border-white/20 pb-1 inline-block">Rules</h2>
                        <p className="text-white text-xs md:text-base  text-left" style={{whiteSpace:"pre-line"}}>{eventsMap[selected][selectedEvent].rules}</p>
                      </div>
                      <div className="space-y-2 mb-44">
                        <h2 className="text-2xl font-cinzel text-white">Co-ordinators</h2>
                        <div className="text-white text-sm">
                          {eventsMap[selected][selectedEvent].coordinators.map((c, i) => (
                            <p key={i} className="opacity-90 font-arabian ">{c.name}: <span className="font-mon text-cyan-300">{c.contact}</span></p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}