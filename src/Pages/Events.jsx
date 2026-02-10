import React, { useState } from 'react'
import { technicalEventsData, nonTechnicalEventsData, eSportsData } from '../assets/Data'

export default function Events() {
	const [selected, setSelected] = useState("");
	const map = {
		"Tech Events": technicalEventsData,
		"Non-Tech Events": nonTechnicalEventsData,
		"E-Sports": eSportsData
	}
	return (
		<div className='event-bg'>
			<div>
				{
					selected === "" ?
						<>
							<h1 className='text-6xl font-serif text-white font-bold text-center py-10'>Events</h1>
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
						<>
							<div className='flex flex-wrap justify-center gap-20 mt-15'>
								{map[selected].map((event, index) => (
									<div key={index} className="bg-[url('/images/workshops-bg.jpg')] bg-no-repeat bg-center bg-contain p-6 rounded-lg shadow-lg w-80 flex items-center justify-center m-5">
										<img src={event.imgSrc} alt={event.name} className='max-w-65 max-h-98'/>
									</div>
								))
								}

							</div>
						</>
				}
			</div>
		</div>
	)
}
