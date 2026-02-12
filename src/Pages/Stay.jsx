// src/pages/Stay.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Stay() {
	const navigate = useNavigate();
	const [clicked, setClicked] = useState(false);

	return (
		<div
			className="min-h-screen bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: `url("/images/arabian.webp")` }}
		>
			{clicked ? <>

				{/* How to Reach */}
				<Section >
					<div className="space-y-6 text-slate-200  flex flex-col items-center leading-relaxed">
						<div className="w-full lg:w-3/4 font-cinzel font-semibold">
							<h1 className="text-amber-300 text-4xl">How to Reach JNTUGV</h1>
						</div>
						{/* Intro */}
						<div className="w-full lg:w-3/4">
							<p>
								JNTU Gurajada, Vizianagaram is well-connected by{" "}
								<span className="text-amber-300 font-semibold">road</span> and{" "}
								<span className="text-amber-300 font-semibold">rail</span>, making it easily
								accessible from various parts of the country.
							</p>

							<p>
								The campus is located{" "}
								<span className="font-semibold text-emerald-400">7 km</span> from both{" "}
								<i>Vizianagaram Railway Station</i> and{" "}
								<i>Vizianagaram Bus Station</i>.
							</p>
						</div>

						{/* Train */}
						<div className="w-full lg:w-3/4">
							<h3 className="text-xl font-semibold text-amber-300 mb-2">
								🚆 By Train
							</h3>
							<p>
								Vizianagaram is a major railway junction in Andhra Pradesh with direct
								connectivity to{" "}
								<i>Visakhapatnam, Hyderabad, Chennai, Kolkata, and Bengaluru</i>.
								The nearest railhead is{" "}
								<span className="font-semibold">Vizianagaram Railway Station</span>.
							</p>

							<ul className="mt-3 space-y-2 text-sm pl-4 list-disc list-inside">
								<li>
									<b>Auto-rickshaws & Taxis:</b> Available outside the station,{" "}
									<span className="text-emerald-400">15–20 minutes</span> to campus
								</li>
								<li>
									<b>Buses:</b> APSRTC local buses operate frequently
								</li>
								<li>
									<b>Cabs:</b> App-based or private taxis available
								</li>
							</ul>
						</div>

						{/* Bus */}
						<div className="w-full lg:w-3/4">
							<h3 className="text-xl font-semibold text-amber-300 mb-2">
								🚌 By Bus
							</h3>
							<p>
								Vizianagaram Bus Station is well connected to{" "}
								<i>
									Visakhapatnam, Srikakulam, Rajahmundry, Vijayawada, Hyderabad
								</i>{" "}
								via APSRTC and private bus services.
							</p>

							<ul className="mt-3 space-y-2 text-sm pl-4 list-disc list-inside">
								<li>
									<b>Auto-rickshaws:</b> Shared & private autos (~
									<span className="text-emerald-400">15 minutes</span>)
								</li>
								<li>
									<b>Local Buses:</b> APSRTC city buses run frequently
								</li>
								<li>
									<b>Taxis & Cabs:</b> Direct travel to campus
								</li>
							</ul>
						</div>

						{/* Air */}
						<div className="w-full lg:w-3/4">
							<h3 className="text-xl font-semibold text-amber-300 mb-2">
								✈️ By Air (Nearest Airport)
							</h3>
							<p>
								The nearest airport is{" "}
								<i>Visakhapatnam International Airport (VTZ)</i>, located{" "}
								<span className="font-semibold text-emerald-400">60 km</span> from
								Vizianagaram.
							</p>

							<ul className="mt-3 space-y-2 text-sm pl-4 list-disc list-inside">
								<li>
									<b>Train:</b> Visakhapatnam → Vizianagaram (~
									<span className="text-emerald-400">1 hour</span>)
								</li>
								<li>
									<b>Bus:</b> APSRTC & private buses available
								</li>
								<li>
									<b>Taxi:</b> Direct cab (~
									<span className="text-emerald-400">1.5 hours</span>)
								</li>
							</ul>
						</div>

						{/* Note */}
						<p className="text-sm text-slate-300 italic w-full lg:w-3/4">
							For a smooth journey, it is recommended to pre-book transportation or
							check local transport availability upon arrival.
						</p>

						{/* Map */}
						<div className="mt-6 rounded-xl overflow-hidden border w-full lg:w-3/4 flex justify-center border-emerald-400/30">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.909045423763!2d83.37309837464373!3d18.151107380356674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bef0c7608ce59%3A0x50fbb4a4a04901fa!2sAcademic%20Block%202!5e1!3m2!1sen!2sin!4v1740156332175!5m2!1sen!2sin"
								className="w-full h-[400px]"
								style={{ border: 0 }}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								allowFullScreen
							/>
						</div>

					</div>
				</Section>

			</> :
				<div className="min-h-screen bg-black/70 backdrop-blur-sm px-6 py-12">

					<div className="max-w-6xl mx-auto text-center mb-12">
						<h1 className="text-5xl font-semibold font-cinzel text-amber-300 tracking-wide">
							ACCOMODATION
						</h1>
						<p className="mt-4 text-slate-200 max-w-3xl mx-auto">
							Experience comfort, safety, and hospitality during the grand celebration
							of technology and innovation at JNTU Gurajada, Vizianagaram.
						</p>
					</div>

					<div className="max-w-6xl mx-auto grid gap-8">

						<Section title="About">
							<p>
								<span className="text-emerald-400 font-semibold">CRESENCE Fest 2K26</span>
								is scheduled on <span className="text-amber-300">March 12 & 13</span> at
								JNTU Gurajada, Vizianagaram. We provide secure accommodation for two
								nights and two days, ensuring a smooth and worry-free fest experience.
							</p>
						</Section>

						{/* Timings */}
						<Section title="Timings">
							<ul className="space-y-2">
								<li>🕕 <b>Check-In:</b> 6:00 A.M – 10:00 P.M</li>
								<li>🕘 <b>Check-Out:</b> Anytime on or before your check-out date</li>
							</ul>
						</Section>

						{/* Fees */}
						<Section title="Registration Fees">
							<div className="grid md:grid-cols-2 gap-4">
								<PriceCard title="One-Day Package" price="₹300" />
								<PriceCard title="Two-Day Package" price="₹500" />
							</div>
						</Section>

						{/* Rules */}
						<Section title="Accommodation Rules">
							<ul className="list-decimal list-inside space-y-2 text-sm">
								<li>Respect the property and campus facilities.</li>
								<li>Cooperate with organizers, volunteers, and security.</li>
								<li>Participants are responsible for personal belongings.</li>
								<li>Strict adherence to check-in and check-out timings.</li>
								<li>No alcohol, drugs, or illegal substances.</li>
								<li>Maintain cleanliness and decorum.</li>
								<li>Unauthorized visitors are not allowed.</li>
								<li>Violation may lead to disqualification.</li>
							</ul>
						</Section>

						{/* Register Button */}
						<div className="text-center flex justify-center gap-10 mt-10">
							<button
								onClick={() => navigate("/register")}
								className="px-10 py-4 rounded-full text-lg font-semibold
                         bg-linear-to-r from-amber-400 to-emerald-400
                         text-black hover:scale-105 transition-transform shadow-lg"
							>
								Register for Stay
							</button>
							<button
								onClick={() => setClicked(true)}
								className="px-10 py-4 rounded-full text-lg font-semibold
                         bg-linear-to-r from-amber-400 to-emerald-400
                         text-black hover:scale-105 transition-transform shadow-lg"
							>
								How to Reach
							</button>
						</div>
					</div>
				</div>}
		</div>
	);
}

/* Reusable Components */
function Section({ title, children }) {
	return (
		<div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 text-slate-200 shadow-xl">
			<h2 className="text-2xl font-semibold text-amber-300 mb-4">{title}</h2>
			{children}
		</div>
	);
}

function PriceCard({ title, price }) {
	return (
		<div className="border border-emerald-400/40 rounded-xl p-6 text-center">
			<h3 className="text-xl text-white font-semibold">{title}</h3>
			<p className="mt-2 text-3xl font-bold text-emerald-400">{price}</p>
			<p className="text-sm text-slate-300 mt-1">Stay + Food</p>
		</div>
	);
}
