import React, { useState } from 'react'
import { technicalEventsData, nonTechnicalEventsData, eSportsData } from '../assets/Data'

export default function Events() {
	const [selected, setSelected] = useState("");
	const eventsMap = {
		"Tech Events": technicalEventsData,
		"Non-Tech Events": nonTechnicalEventsData,
		"E-Sports": eSportsData
	}
	const [selectedEvent, setSelectedEvent] = useState("");
	return (
		<div className='event-bg'>
			<div>
				{
					selected === "" ?
						<>
							<h1 className='text-6xl font-serif text-slate-50 font-cinzel font-semibold text-center py-10'>Events</h1>
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
								<div className='flex flex-wrap justify-center gap-20 mt-15'>
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
								<h1 key={selected} className='text-6xl font-serif z-40 text-white font-cinzel text-center py-10'>{selectedEvent}</h1>

								<div className="flex justify-center px-6">
									{/* Added items-stretch to ensure both sides have similar height footprint */}
									<div className="flex flex-col lg:flex-row mt-10 items-stretch justify-center gap-10 max-w-7xl">

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
										<div className="ws-bg flex flex-col items-center justify-center text-center">
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
			</div>
		</div>
	)
}
