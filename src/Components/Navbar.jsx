import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AnimatedNavLink = ({ to, children }) => (
	<NavLink to={to}>
		{({ isActive }) => (
			<div className="relative group transition-all duration-300 px-2 py-1 text-white hover:text-gray-300 pointer-events-auto">
				<span className="pointer-events-auto">{children}</span>
				<span
					className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#8000FF] transform transition-transform duration-300 origin-left pointer-events-auto 
                ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
						}`}
				></span>
				<span
					className={`absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#8000FF] opacity-0 group-hover:opacity-100 transform transition-all duration-300 origin-left pointer-events-none 
              ${isActive ? "scale-x-100 opacity-100" : "scale-x-0"} blur-sm`}
				></span>
			</div>
		)}
	</NavLink>
);

const calculateTimeLeft = (targetDate) => {
	const now = new Date();
	const difference = new Date(targetDate) - now;
	return {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor(
			(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		),
		minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((difference % (1000 * 60)) / 1000),
	};
};

const Navbar = () => {
	// Target date for the countdown
	const targetDate = "2026-03-06T00:00:00+05:30";
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
	const [isVisible, setIsVisible] = useState(true);
	const lastScrollY = useRef(window.scrollY);
	const navigate = useNavigate();

	// Update countdown every second
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(calculateTimeLeft(targetDate));
		}, 1000);
		return () => clearInterval(interval);
	}, [targetDate]);

	// Hide or show navbar on scroll
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > lastScrollY.current) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			lastScrollY.current = window.scrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`md:fixed top-0 left-0 w-full text-white z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
				}`}
		>
			<div className="w-full hidden md:flex justify-center lg:h-20 font-medium">
				<div className="flex justify-center">
					{/* Left container with skewed border */}
					<div className="skewed-container-l border-b-2 border-l-2 border-[#8000FF] px-3 flex items-center">
						<div className="flex items-center justify-evenly md:w-28 lg:w-52 xl:w-[20rem] md:text-xs lg:text-base inner-content-l py-3">
							<AnimatedNavLink to="/events">
								Events
							</AnimatedNavLink>
							<AnimatedNavLink to="/workshops">
								Workshops
							</AnimatedNavLink>
						</div>
					</div>

					{/* Countdown display */}
					<div className="hidden text-center py-1 px-8 border-b-2 border-[#8000FF] items-center">
						<div className="flex justify-center space-x-4">
							<div className="transition-transform duration-300">
								<span>{timeLeft.days}</span>
								<p className="text-xs">Days</p>
							</div>
							<div className="transition-transform duration-300">
								<span>{timeLeft.hours}</span>
								<p className="text-xs">Hours</p>
							</div>
							<div className="transition-transform duration-300">
								<span>{timeLeft.minutes}</span>
								<p className="text-xs">Minutes</p>
							</div>
							<div className="transition-transform duration-300">
								<span>{timeLeft.seconds}</span>
								<p className="text-xs">Seconds</p>
							</div>
						</div>
					</div>

					{/* Right container with skewed border */}
					<div className="skewed-container-r border-r-2 border-b-2 border-[#8000FF] px-3 flex items-center">
						<div className="flex items-center justify-evenly md:w-28 lg:w-52 xl:w-[20rem] md:text-xs lg:text-base inner-content-r py-3">
							<AnimatedNavLink to="/timeline">
								Timeline
							</AnimatedNavLink>
							<AnimatedNavLink to="/stay">Stay</AnimatedNavLink>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
