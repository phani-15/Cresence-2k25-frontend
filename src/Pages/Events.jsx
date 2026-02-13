import { workshopsData } from '../assets/Data'
import Navbar from '../Components/Navbar'
import React, { useState, useEffect, useRef } from 'react'
import { technicalEventsData, nonTechnicalEventsData, eSportsData } from '../assets/Data'
import { ChevronLeft, Calendar, IndianRupee } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function Events() {
	const [selected, setSelected] = useState("");
	const eventsMap = {
		"Tech Events": technicalEventsData,
		"Non-Tech Events": nonTechnicalEventsData,
		"E-Sports": eSportsData
	}

	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	const carouselRef = useRef(null);
	const eventCardsRef = useRef(null);
	const scrollDetailRef = useRef(null);

	const categories = ["Tech Events", "Non-Tech Events", "E-Sports"];
	const [selectedEvent, setSelectedEvent] = useState("");

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Carousel animation for main categories
	useEffect(() => {
		if (isMobile || !carouselRef.current) return;

		const cards = gsap.utils.toArray(".category-card");

		cards.forEach((card) => {
			gsap.fromTo(
				card,
				{
					opacity: 0.25,
					scale: 0.7,
					y: 120,
					zIndex: 1,
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					zIndex: 10,
					ease: "none",
					scrollTrigger: {
						trigger: card,
						start: "top 75%",
						end: "top 35%",
						scrub: true,
					},
				}
			);

			// Leaving center → going UP
			gsap.to(card, {
				opacity: 0.25,
				scale: 0.7,
				y: -120,
				zIndex: 1,
				ease: "none",
				scrollTrigger: {
					trigger: card,
					start: "top 35%",
					end: "top -10%",
					scrub: true,
				},
			});
		});

		return () => ScrollTrigger.getAll().forEach(t => t.kill());
	}, [isMobile]);



	// Event cards entrance animation
	useEffect(() => {
		if (isMobile && selected !== "" && selectedEvent === "" && eventCardsRef.current) {
			const cards = eventCardsRef.current.querySelectorAll('.event-card');

			gsap.fromTo(cards,
				{ opacity: 0, y: 60, scale: 0.9 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.6,
					stagger: 0.1,
					ease: "back.out(1.4)"
				}
			);
		}
	}, [selected, selectedEvent, isMobile]);

	// Scroll detail animation
	useEffect(() => {
		if (isMobile && selectedEvent !== "" && scrollDetailRef.current) {
			const scroll = scrollDetailRef.current;
			const image = scroll.querySelector('.detail-image');
			const content = scroll.querySelector('.detail-content');

			gsap.fromTo(scroll,
				{ opacity: 0, scale: 0.95 },
				{ opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
			);

			if (image) {
				gsap.fromTo(image,
					{ opacity: 0, y: -30 },
					{ opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
				);
			}

			if (content && content.children) {
				gsap.fromTo(content.children,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.1,
						delay: 0.4,
						ease: "power2.out"
					}
				);
			}
		}
	}, [selectedEvent, isMobile]);

	const handleCategorySelect = (category) => {
		const cards = carouselRef.current?.querySelectorAll('.category-card');
		const selectedCard = cards?.[categories.indexOf(category)];

		if (selectedCard) {
			gsap.to(selectedCard, {
				scale: 1.1,
				duration: 0.2,
				yoyo: true,
				repeat: 1,
				onComplete: () => setSelected(category)
			});
		} else {
			setSelected(category);
		}
	};

	const handleEventSelect = (eventName) => {
		setSelectedEvent(eventName);
	};

	const navigate = useNavigate()

	const handleScroll = (e) => {
		const container = e.currentTarget;
		const cards = container.querySelectorAll('.category-card');
		const containerRect = container.getBoundingClientRect();
		const centerY = containerRect.top + containerRect.height / 2;

		cards.forEach((card, index) => {
			const cardRect = card.getBoundingClientRect();
			const cardCenterY = cardRect.top + cardRect.height / 2;
			const distance = Math.abs(centerY - cardCenterY);
			const maxDistance = containerRect.height / 2;
			const proximity = 1 - Math.min(distance / maxDistance, 1);

			const scale = 0.75 + (proximity * 0.25);
			const opacity = 0.5 + (proximity * 0.5);
			const y = (1 - proximity) * 50;

			gsap.to(card, {
				scale,
				opacity,
				y,
				zIndex: Math.round(proximity * 10),
				duration: 0.3,
				ease: "power2.out"
			});

			if (proximity > 0.8) {
				setActiveCardIndex(index);
			}
		});
	};

	const handleBackToCategories = () => {
		const cards = eventCardsRef.current?.querySelectorAll('.event-card');
		if (cards && cards.length > 0) {
			gsap.to(cards, {
				opacity: 0,
				scale: 0.9,
				y: -30,
				duration: 0.3,
				stagger: 0.05,
				onComplete: () => setSelected("")
			});
		} else {
			setSelected("");
		}
	};

	return (
		<div className='event-bg'>
			<Navbar/>
			{isMobile ? <>

				<div className="pb-20 mt-10">
					{/* MAIN CATEGORY SELECTION */}
					{selected === "" ? (
						<div className="min-h-screen flex flex-col">
							<h1 className='text-5xl font-serif text-slate-50 font-cinzel font-bold text-center pt-12 pb-8 tracking-wider'>
								Events
							</h1>
							<div
								ref={carouselRef}
								onScroll={handleScroll}
								className="flex-1 overflow-y-auto snap-y snap-mandatory px-6 py-10 space-y-8"
								style={{ scrollSnapType: 'y mandatory' }}
							>
								{categories.map((category, index) => (
									<div
										key={index}
										className="category-card snap-center flex items-center justify-center min-h-[350px]"
										onClick={() => handleCategorySelect(category)}
									>
										<div className="bg-frame w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 active:scale-95">
											<div className="h-full p-8 flex items-center justify-center">
												<h2 className="text-3xl px-2 font-cinzel text-center font-bold text-white drop-shadow-lg leading-relaxed">
													{category}
												</h2>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : selectedEvent === "" ? (
						/* EVENT GRID */
						<div>
							<h1 className='text-4xl font-serif text-white font-cinzel font-bold text-center pt-10 pb-6 tracking-wide'>
								{selected}
							</h1>
							<button
								onClick={handleBackToCategories}
								className='text-slate-300 flex items-center ml-6 mb-6 hover:text-white transition-colors group'
							>
								<ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
								<span className="ml-1">Back to All Events</span>
							</button>

							<div
								ref={eventCardsRef}
								className='grid grid-cols-1 gap-8 px-6 pb-10'
							>
								{Object.values(eventsMap[selected]).map((event, index) => (
									<div
										key={index}
										onClick={() => handleEventSelect(event.name)}
										className="event-card backdrop-blur-md rounded-2xl shadow-xl overflow-hidden active:scale-95 transition-transform"
									>
										<div className="relative">
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
											<img
												src={event.imgSrc}
												alt={event.name}
												className='w-full h-56 object-cover'
											/>
											<div className="absolute bottom-0 left-0 right-0 p-6 z-20">
												<h3 className="text-2xl font-cinzel font-bold text-white mb-2 drop-shadow-lg">
													{event.name}
												</h3>
												<div className="flex items-center gap-4 text-sm text-slate-200">
													<span className="flex items-center gap-1">
														<Calendar className="w-4 h-4" />
														{event.dates}
													</span>
													<span className="flex items-center gap-1">
														<IndianRupee className="w-4 h-4" />
														{event.fees}
													</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						/* EVENT DETAIL - RED SCROLL */
						<div className="min-h-screen pb-10">
							<h1 className='text-4xl font-serif text-white font-cinzel font-bold text-center pt-10 pb-6 tracking-wide'>
								{selectedEvent}
							</h1>
							<button
								onClick={() => setSelectedEvent("")}
								className='text-slate-300 flex items-center ml-6 mb-8 hover:text-white transition-colors group'
							>
								<ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
								<span className="ml-1">Back to {selected}</span>
							</button>

							<div className="flex justify-center">
								<div
									ref={scrollDetailRef}
									className="ws-bg w-[80vh] h-[120vh]  max-w-md"
								>
									{/* Content wrapper with proper padding to stay within scroll borders */}
									<div className="py-30 px-8">

										{/* Event Image */}
										<div className="detail-image flex justify-center">
											<img
												src={eventsMap[selected][selectedEvent].imgSrc}
												alt={eventsMap[selected][selectedEvent].name}
												className="w-full max-w-[50vw] max-h-[20vh] object-cover mt-7 rounded-lg shadow-2xl"
											/>
										</div>

										{/* Event Details */}
										<div className="detail-content space-y-2">
											{/* Title */}
											<h2 className="text-xl px-7 font-cinzel font-semibold text-center text-amber-100 drop-shadow-md">
												{eventsMap[selected][selectedEvent].name.toUpperCase()}
											</h2>

											{/* About Section */}
											<div className="space-y-3">
												<p className="text-amber-50/90 text-xs leading-relaxed text-center italic px-11">
													{eventsMap[selected][selectedEvent].about}
												</p>
											</div>

											{/* Coordinators Section */}
											<div className="space-t-3">
												<h3 className="text-lg font-cinzel font-bold text-amber-100 text-center">
													Coordinators
												</h3>
												<div className="">

													{eventsMap[selected][selectedEvent].coordinators.map((coordinator, index) => (
														<p className="text-amber-100 text-center italic text-xs">
															{coordinator.name}
														</p>
														// <div
														// 	key={index}
														// 	className="bg-amber-900/30 backdrop-blur-sm border border-amber-700/40 rounded-lg p-3 text-center"
														// >
														// 	<p className="text-amber-100 font-semibold text-sm">
														// 		{coordinator.name}
														// 	</p>
														// 	<p className="text-amber-300/90 font-mono text-xs mt-1">
														// 		{coordinator.contact}
														// 	</p>
														// </div>
													))}
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
							{/* Info Box */}
							<div className="bg-gradient-to-br  text-xs text- from-amber-900/40 to-red-950/60 backdrop-blur-sm border-2 border-amber-700/60 rounded-xl mx-7 p-2 space-y- shadow-lg">
								<div className="flex items-center justify-between text-amber-50">
									<span className="flex items-center gap-2 font-semibold">
										<IndianRupee className="w-5 h-5 text-amber-400" />
										Fees
									</span>
									<span className="font-bold text-amber-200">
										{eventsMap[selected][selectedEvent].fees}
									</span>
								</div>
								
							</div>
							
											{/* Register Button */}
											<button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 active:scale-95 font-cinzel text-lg">
												Register Now
											</button>
						</div>
					)}
				</div>
			</> :
				<div>
					{
						selected === "" ?
							<>
								<h1 className='text-6xl font-serif text-slate-50 font-cinzel font-semibold text-center py-10'>Events</h1>
								
							{/* <button 
							onClick={()=>navigate('/')}
							className='bg-linear-to-r cursor-pointer from-blue-500 to-green-600 text-slate-300 px-4 mx-2 py-2 rounded-3xl flex w-fit'>
								<ArrowBigLeft /><span>Back</span>
							</button> */}
								<div className='flex flex-wrap justify-center gap-20 mt-15'>
									{["Tech Events", "Non-Tech Events", "E-Sports"].map((category, index) => (
										<div
											onClick={() => setSelected(category)}
											className="bg-frame text-white p-6 rounded-lg shadow-lg w-80 flex items-center justify-center ">
											<h2 className="text-3xl font-cinzel mx-10 text-center font-semibold">{category}</h2>
										</div>
									))}
								</div>
							</>
							:
							selectedEvent === "" ?
								<>
									<h1 className='text-6xl font-serif text-white font-cinzel font-semibold text-center py-10'>{selected}</h1>
									<p
										onClick={() => setSelected("")}
										className='text-slate-300 flex ml-10'
									> <span><ChevronLeft /></span> Back to All events</p>
									<div className='flex flex-wrap justify-center gap-20 mt-5'>
										{Object.values(eventsMap[selected]).map((event, index) => (
											<div
												key={index}
												onClick={() => setSelectedEvent(event.name)}
												className="bg-[url('/images/workshops-bg.jpg')] bg-no-repeat bg-center bg-contain rounded-lg shadow-lg w-80 flex items-center justify-center m-5"
											>
												<img
													src={event.imgSrc}
													alt={event.name}
													className='max-w-65 p-7 max-h-98'
												/>
											</div>
										))}
									</div>

								</>
								:
								<>
									<h1 key={selected} className='text-6xl font-serif z-40 text-white font-cinzel text-center pt-10 pb-5'>{selectedEvent}</h1>
									<p
										onClick={() => setSelectedEvent("")}
										className='text-slate-300 flex ml-10'
									>
										<span><ChevronLeft /></span> Back to all {selected}
									</p>
									<div className="flex justify-center px-6">
										{/* Added items-stretch to ensure both sides have similar height footprint */}
										<div className="flex flex-col lg:flex-row mt-2 items-stretch justify-center gap-10 max-w-7xl">

											{/* LEFT : IMAGE & INFO */}
											<div className="flex flex-col items-center justify-center w-full lg:w-1/3">
												<img
													src={eventsMap[selected][selectedEvent].imgSrc}
													alt={eventsMap[selected][selectedEvent].name}
													className="w-full rounded-xl object-cover shadow-md aspect-video"
													loading="lazy"
												/>
												<div className="w-full flex flex-col gap-6 mt-6">
													<h2 className="text-2xl md:text-3xl text-slate-200 font-cinzel font-semibold">
														{eventsMap[selected][selectedEvent].name.toUpperCase()}
													</h2>
													<div className="bg-violet-950/50 border border-violet-800 rounded-xl text-slate-100 p-5">
														<p>Date: <span className="font-bold">{eventsMap[selected][selectedEvent].dates}</span></p>
														<p>Fees: <span className="font-bold">{eventsMap[selected][selectedEvent].fees}</span></p>
													</div>
													{/* Registration Button Logic stays here */}
												</div>
											</div>

											{/* RIGHT : THE SCROLL CARD */}
											<div className="ws-bg w-250 h-225 flex flex-col items-center justify-center text-center">
												{/* Content Wrapper: Controls width so text stays inside the scroll gold borders */}
												<div className="w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-8">

													<div className="space-y-2 px-6">
														<h2 className="text-3xl font-cinzel text-white border-b border-white/20 pb-1 inline-block">
															About
														</h2>
														<p className="text-white text-xs md:text-base leading-relaxed">
															{eventsMap[selected][selectedEvent].about}
														</p>
													</div>

													<div className="space-y-2">
														<h2 className="text-2xl font-cinzel text-white">Co-ordinators</h2>
														<div className="text-white text-sm">
															{eventsMap[selected][selectedEvent].coordinators.map((coordinator, index) => (
																<p key={index} className="opacity-90">
																	{coordinator.name}: <span className="font-mono text-cyan-300">{coordinator.contact}</span>
																</p>
															))}
														</div>
													</div>

												</div>
											</div>

										</div>
									</div>
								</>
					}
				</div>}
		</div>
	)
}
