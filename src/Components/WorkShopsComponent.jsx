import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { workshopsData } from '../assets/Data'

export default function Workshops() {
	const [selected, setSelected] = React.useState("practical");
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<div>
			{isMobile ?
				<>
			<h1 className="text-4xl font-serif text-white font-bold text-center pt-10">
				WORKSHOPS
			</h1>
			<div>
					{Object.entries(workshopsData).map(([key, eve], index) => {
						return (
							<div className="flex justify-center mx-10">
								{/* Added items-stretch to ensure both sides have similar height footprint */}
								<div className="flex flex-col mt-10 lg:flex-row mt-2 items-stretch justify-center gap-10 max-w-7xl">
									{/* LEFT : IMAGE & INFO */}
									<div className="ws-bg w-95 h-125 flex flex-col items-center m-4 mx-10 justify-center text-center">
										{/* Content Wrapper: Controls width so text stays inside the scroll gold borders */}
										<div className="w-[70%] flex flex-col gap-4">

											<div className="space-y-2 ">
												<img
											src={eve.image}
											alt={eve.title}
											className=" rounded-xl object-cover shadow-md aspect-video"
											loading="lazy"
										/>
												<p className="text-white italic text-xs">
													{eve.description}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>)
					})}
</div>
				</> :
				<>
			<h1 className="text-6xl font-serif text-white font-bold text-center pt-10">
				WORKSHOPS
			</h1>
					{Object.entries(workshopsData).map(([key, eve], index) => {
						return (
							<div className="flex justify-center px-6">
								{/* Added items-stretch to ensure both sides have similar height footprint */}
								<div className="flex flex-col mt-10 lg:flex-row mt-2 items-stretch justify-center gap-10 max-w-7xl">
									{/* LEFT : IMAGE & INFO */}
									<div className="flex flex-col items-center justify-center w-full lg:w-1/3">
										<img
											src={eve.image}
											alt={eve.title}
											className="w-full rounded-xl object-cover shadow-md aspect-video"
											loading="lazy"
										/>
										<div className="w-full flex flex-col gap-6 mt-6">
											<h2 className="text-2xl lg:text-2xl text-slate-200 font-cinzel font-semibold">
												{eve.title.toUpperCase()}
											</h2>
											<div className="bg-violet-950/50 border border-violet-800 rounded-xl text-slate-100 p-5">
												<p>Date: <span className="font-bold">{eve.date}</span></p>
												<p>Fees: <span className="font-bold">{eve.fees}</span></p>
											</div>
											{/* Registration Button Logic stays here */}
										</div>
									</div>

									{/* RIGHT : THE SCROLL CARD */}
									<div className="ws-bg w-130 h-145 flex flex-col items-center justify-center text-center">
										{/* Content Wrapper: Controls width so text stays inside the scroll gold borders */}
										<div className="w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-4">

											<div className="space-y-2 ">
												<h2 className="text-3xl font-cinzel text-white border-b border-white/20 pb-2 inline-block">
													About
												</h2>
												<p className="text-white italic text-sm">
													{eve.description}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>)
					})}
				</>}
		</div>
	);
}
