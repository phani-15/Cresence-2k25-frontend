import { workshopsData } from '../assets/Data'
import Navbar from '../Components/Navbar'
import React, { useState, useEffect, useRef } from 'react'
import { technicalEventsData, nonTechnicalEventsData, eSportsData } from '../assets/Data'
import { ChevronLeft, Calendar, IndianRupee } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function Events() {
	const [selectedEvent, setSelectedEvent] = useState("");
	const [selected, setSelected] = useState("");
	const [activeCardIndex, setActiveCardIndex] = useState(1);
	const [isMobile, setIsMobile] = useState(false);
	
	const carouselRef = useRef(null);
	const eventCardsRef = useRef(null);
	const scrollDetailRef = useRef(null);
	
	const eventsMap = {
		"Tech Events": technicalEventsData,
		"Non-Tech Events": nonTechnicalEventsData,
		"E-Sports": eSportsData
	}

	const categories = ["Tech Events", "Non-Tech Events", "E-Sports"];

	// Proper mobile detection with resize listener
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);
		
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Desktop carousel scroll effect
	useEffect(() => {
		if (!isMobile && selected === "" && carouselRef.current) {
			const cards = carouselRef.current.querySelectorAll('.desktop-category-card');
			
			const handleScroll = () => {
				const container = carouselRef.current;
				const containerRect = container.getBoundingClientRect();
				const centerY = containerRect.top + containerRect.height / 2;

				cards.forEach((card, index) => {
					const cardRect = card.getBoundingClientRect();
					const cardCenterY = cardRect.top + cardRect.height / 2;
					const distance = Math.abs(centerY - cardCenterY);
					const maxDistance = containerRect.height / 2;
					const proximity = 1 - Math.min(distance / maxDistance, 1);

					// Scale: from 0.7 (far) to 1.0 (center)
					const scale = 0.7 + (proximity * 0.3);
					// Opacity: from 0.3 (far) to 1.0 (center)
					const opacity = 0.3 + (proximity * 0.7);
					// Blur: from 4px (far) to 0px (center)
					const blur = (1 - proximity) * 4;

					gsap.to(card, {
						scale,
						opacity,
						filter: `blur(${blur}px)`,
						duration: 0.3,
						ease: "power2.out"
					});

					// Update active index when card is centered
					if (proximity > 0.85) {
						setActiveCardIndex(index);
					}
				});
			};

			// Initial setup
			handleScroll();
			
			// Add scroll listener
			container.addEventListener('scroll', handleScroll);
			
			// Cleanup
			return () => {
				container?.removeEventListener('scroll', handleScroll);
			};
		}
	}, [isMobile, selected]);

	// Mobile carousel animation
	useEffect(() => {
		if (isMobile && selected === "" && carouselRef.current) {
			const cards = carouselRef.current.querySelectorAll('.category-card');
			
			// Cleanup previous event listeners
			const handleClick = (index) => () => setActiveCardIndex(index);
			const listeners = [];
			
			cards.forEach((card, index) => {
				const listener = handleClick(index);
				card.addEventListener('click', listener);
				listeners.push({ card, listener });
			});

			gsap.set(cards, { opacity: 0.5, scale: 0.75, y: 100 });
			gsap.set(cards[activeCardIndex], { opacity: 1, scale: 1, y: 0, zIndex: 10 });
			
			if (cards[activeCardIndex - 1]) {
				gsap.set(cards[activeCardIndex - 1], { opacity: 0.6, scale: 0.8, y: 50, zIndex: 5 });
			}
			if (cards[activeCardIndex + 1]) {
				gsap.set(cards[activeCardIndex + 1], { opacity: 0.6, scale: 0.8, y: 50, zIndex: 5 });
			}

			// Cleanup function
			return () => {
				listeners.forEach(({ card, listener }) => {
					card.removeEventListener('click', listener);
				});
			};
		}
	}, [activeCardIndex, selected, isMobile]);

	// Event cards entrance animation
	useEffect(() => {
		if (selected !== "" && selectedEvent === "" && eventCardsRef.current) {
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
	}, [selected, selectedEvent]);

	// Scroll detail animation
	useEffect(() => {
		if (selectedEvent !== "" && scrollDetailRef.current) {
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
	}, [selectedEvent]);

	const handleCategorySelect = (category) => {
		if (isMobile) {
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
		} else {
			// Desktop: animate the active card
			const cards = carouselRef.current?.querySelectorAll('.desktop-category-card');
			const selectedCard = cards?.[activeCardIndex];
			
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
		}
	};

	const handleEventSelect = (eventName) => {
		setSelectedEvent(eventName);
	};

	const handleMobileScroll = (e) => {
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
		<div className='event-bg min-h-screen'>
			{isMobile ? (
				<div className="pb-20">
					{/* MOBILE CATEGORY SELECTION */}
					{selected === "" ? (
						<div className="min-h-screen flex flex-col">
							<h1 className='text-5xl font-serif text-slate-50 font-cinzel font-bold text-center pt-12 pb-8 tracking-wider'>
								Events
							</h1>
							
							<div 
								ref={carouselRef}
								onScroll={handleMobileScroll}
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
											<div className="h-full p-8 flex items-center justify-center backdrop-blur-sm">
												<h2 className="text-3xl font-cinzel text-center font-bold text-white drop-shadow-lg leading-relaxed">
													{category}
												</h2>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="text-center text-slate-400 text-sm pb-4 animate-pulse">
								Scroll to explore categories
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
										className="event-card bg-gradient-to-br from-purple-900/30 to-violet-950/50 backdrop-blur-md border border-violet-800/50 rounded-2xl shadow-xl overflow-hidden active:scale-95 transition-transform"
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
							<h1 className='text-4xl font-serif text-white font-cinzel font-bold text-center pt-10 pb-6 tracking-wide px-4'>
								{selectedEvent}
							</h1>
							<button
								onClick={() => setSelectedEvent("")}
								className='text-slate-300 flex items-center ml-6 mb-8 hover:text-white transition-colors group'
							>
								<ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
								<span className="ml-1">Back to {selected}</span>
							</button>

							<div className="flex justify-center px-4">
								<div 
									ref={scrollDetailRef}
									className="ws-bg w-full max-w-md"
								>
									<div className="py-16 px-8 space-y-8">
										<div className="detail-image flex justify-center">
											<img
												src={eventsMap[selected][selectedEvent].imgSrc}
												alt={eventsMap[selected][selectedEvent].name}
												className="w-full max-w-xs rounded-lg shadow-2xl border-4 border-amber-600/50"
											/>
										</div>

										<div className="detail-content space-y-6">
											<h2 className="text-3xl font-cinzel font-bold text-center text-amber-100 drop-shadow-md">
												{eventsMap[selected][selectedEvent].name.toUpperCase()}
											</h2>

											<div className="bg-gradient-to-br from-amber-900/40 to-red-950/60 backdrop-blur-sm border-2 border-amber-700/60 rounded-xl p-5 space-y-3 shadow-lg">
												<div className="flex items-center justify-between text-amber-50">
													<span className="flex items-center gap-2 font-semibold">
														<Calendar className="w-5 h-5 text-amber-400" />
														Date
													</span>
													<span className="font-bold text-amber-200">
														{eventsMap[selected][selectedEvent].dates}
													</span>
												</div>
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

											<div className="space-y-3">
												<h3 className="text-2xl font-cinzel font-bold text-amber-100 text-center border-b-2 border-amber-700/50 pb-2">
													About
												</h3>
												<p className="text-amber-50/90 text-sm leading-relaxed text-center px-2">
													{eventsMap[selected][selectedEvent].about}
												</p>
											</div>

											<div className="space-y-3">
												<h3 className="text-xl font-cinzel font-bold text-amber-100 text-center">
													Coordinators
												</h3>
												<div className="space-y-2">
													{eventsMap[selected][selectedEvent].coordinators.map((coordinator, index) => (
														<div 
															key={index}
															className="bg-amber-900/30 backdrop-blur-sm border border-amber-700/40 rounded-lg p-3 text-center"
														>
															<p className="text-amber-100 font-semibold text-sm">
																{coordinator.name}
															</p>
															<p className="text-amber-300/90 font-mono text-xs mt-1">
																{coordinator.contact}
															</p>
														</div>
													))}
												</div>
											</div>

											<button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 active:scale-95 font-cinzel text-lg">
												Register Now
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			) : (
				/* DESKTOP VERSION WITH SCROLL CAROUSEL */
				<div>
					{selected === "" ? (
						<div className="min-h-screen flex flex-col">
							<h1 className='text-6xl font-serif text-slate-50 font-cinzel font-semibold text-center py-10'>
								Events
							</h1>
							
							<div 
								ref={carouselRef}
								className="flex-1 overflow-y-auto snap-y snap-mandatory px-6 py-10"
								style={{ scrollSnapType: 'y mandatory' }}
							>
								<div className="flex flex-col items-center gap-20 min-h-screen justify-center">
									{categories.map((category, index) => (
										<div
											key={index}
											className="desktop-category-card snap-center flex items-center justify-center"
											onClick={() => handleCategorySelect(category)}
										>
											<div className="bg-frame text-white p-6 rounded-lg shadow-lg w-80 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-2xl">
												<h2 className="text-3xl font-cinzel mx-10 text-center font-semibold">
													{category}
												</h2>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="text-center text-slate-400 text-sm pb-4 animate-pulse">
								Scroll to explore • Click center card to select
							</div>
						</div>
					) : selectedEvent === "" ? (
						/* DESKTOP EVENT GRID */
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
								className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-10'
							>
								{Object.values(eventsMap[selected]).map((event, index) => (
									<div
										key={index}
										onClick={() => handleEventSelect(event.name)}
										className="event-card bg-gradient-to-br from-purple-900/30 to-violet-950/50 backdrop-blur-md border border-violet-800/50 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
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
						/* DESKTOP EVENT DETAIL */
						<div className="min-h-screen pb-10">
							<h1 className='text-4xl font-serif text-white font-cinzel font-bold text-center pt-10 pb-6 tracking-wide px-4'>
								{selectedEvent}
							</h1>
							<button
								onClick={() => setSelectedEvent("")}
								className='text-slate-300 flex items-center ml-6 mb-8 hover:text-white transition-colors group'
							>
								<ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
								<span className="ml-1">Back to {selected}</span>
							</button>

							<div className="flex justify-center px-4">
								<div 
									ref={scrollDetailRef}
									className="ws-bg max-w-2xl"
								>
									<div className="py-16 px-12 space-y-8">
										<div className="detail-image flex justify-center">
											<img
												src={eventsMap[selected][selectedEvent].imgSrc}
												alt={eventsMap[selected][selectedEvent].name}
												className="w-full max-w-md rounded-lg shadow-2xl border-4 border-amber-600/50"
											/>
										</div>

										<div className="detail-content space-y-6">
											<h2 className="text-4xl font-cinzel font-bold text-center text-amber-100 drop-shadow-md">
												{eventsMap[selected][selectedEvent].name.toUpperCase()}
											</h2>

											<div className="bg-gradient-to-br from-amber-900/40 to-red-950/60 backdrop-blur-sm border-2 border-amber-700/60 rounded-xl p-6 space-y-4 shadow-lg">
												<div className="flex items-center justify-between text-amber-50">
													<span className="flex items-center gap-2 font-semibold text-lg">
														<Calendar className="w-6 h-6 text-amber-400" />
														Date
													</span>
													<span className="font-bold text-amber-200 text-lg">
														{eventsMap[selected][selectedEvent].dates}
													</span>
												</div>
												<div className="flex items-center justify-between text-amber-50">
													<span className="flex items-center gap-2 font-semibold text-lg">
														<IndianRupee className="w-6 h-6 text-amber-400" />
														Fees
													</span>
													<span className="font-bold text-amber-200 text-lg">
														{eventsMap[selected][selectedEvent].fees}
													</span>
												</div>
											</div>

											<div className="space-y-4">
												<h3 className="text-3xl font-cinzel font-bold text-amber-100 text-center border-b-2 border-amber-700/50 pb-2">
													About
												</h3>
												<p className="text-amber-50/90 text-base leading-relaxed text-center px-4">
													{eventsMap[selected][selectedEvent].about}
												</p>
											</div>

											<div className="space-y-4">
												<h3 className="text-2xl font-cinzel font-bold text-amber-100 text-center">
													Coordinators
												</h3>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
													{eventsMap[selected][selectedEvent].coordinators.map((coordinator, index) => (
														<div 
															key={index}
															className="bg-amber-900/30 backdrop-blur-sm border border-amber-700/40 rounded-lg p-4 text-center"
														>
															<p className="text-amber-100 font-semibold">
																{coordinator.name}
															</p>
															<p className="text-amber-300/90 font-mono text-sm mt-1">
																{coordinator.contact}
															</p>
														</div>
													))}
												</div>
											</div>

											<button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-5 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 font-cinzel text-xl">
												Register Now
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}