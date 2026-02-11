import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TextAlignJustify, X } from "lucide-react";

// Easing presets for consistent smooth animations
const EASING = {
	smooth_in: "power2.inOut",
	smooth_out: "power3.out",
	smooth_in_fast: "back.in",
	elastic: "elastic.out(1, 0.5)",
};


const AnimatedNavLink = ({ to, children }) => (
	<NavLink to={to}>
		{({ isActive }) => (
			<div className="relative group transition-all duration-300 px-2 py-1 text-black hover:text-gray-300 pointer-events-auto">
				<span className="pointer-events-auto">{children}</span>
				<span
					className={`absolute bottom-0 left-0 w-full h-0.5  transform transition-transform duration-300 origin-left pointer-events-auto 
                ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
						}`}
				></span>
				<span
					className={`absolute -bottom-0.5 left-0 w-full h-0.5  opacity-0 group-hover:opacity-100 transform transition-all duration-300 origin-left pointer-events-none 
              ${isActive ? "scale-x-100 opacity-100" : "scale-x-0"} `}
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

const Navbar = React.forwardRef(() => {
	// Target date for the countdown
	const targetDate = "2026-03-06T00:00:00+05:30";
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
	const [menuOpen, setMenuOpen] = useState(false);
	const lastScrollY = useRef(window.scrollY);
	const timeref = useRef();
	const menuref = useRef();
	const menuIconRef = useRef();
	const navLinksRef = useRef([]); // Initialize for animating nav links

useGSAP(() => {
    gsap.from(".countdown-number", 
        {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5,
        }
    );
}, {scope: timeref});
	// This hook only runs when menuOpen changes
	useGSAP(() => {
		const validNavLinks = navLinksRef.current.filter(el => el !== null);

		if (menuOpen) {
			const timeline = gsap.timeline();
			timeline.to(menuref.current, {
				x: 0,
				opacity: 1,
				duration: 0.6,
				ease: EASING.smooth_out,
				autoAlpha: 1,
				pointerEvents: "auto", // Ensure you can click links
			}, 0)
				.to(menuIconRef.current, {
					rotation: 90,
					scale: 1.1,
					duration: 0.5,
					ease: EASING.smooth_out,
				}, 0)
				.to(validNavLinks, {
					y: 0,
					opacity: 1,
					stagger: 0.12,
					duration: 0.6,
					ease: EASING.smooth_out,
				}, 0.15)
				.to('.menu-title', {
					x: 0,
					opacity: 1,
					duration: 0.5,
					ease: EASING.smooth_out,
				}, 0);
		} else {
			const timeline = gsap.timeline();
			timeline.to(validNavLinks, {
				y: 30,
				opacity: 0,
				stagger: 0.06,
				duration: 0.4,
				ease: "power2.in",
			}, 0)
				.to(menuIconRef.current, {
					rotation: 0,
					scale: 1,
					duration: 0.5,
					ease: EASING.smooth_in_fast,
				}, 0.1)
				.to(menuref.current, {
					x: 100,
					opacity: 0,
					duration: 0.5,
					ease: "power2.in",
					autoAlpha: 0,
					pointerEvents: "none", // Prevent accidental clicks when closed
				}, 0.15);
		}
	}, [menuOpen]); // Only runs when menu toggles

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
		<>
			<div className="flex flex-row">
				<img src="/images/logo.png" alt="" className="absolute top-0 right-0 left-0 h-[6vh] ml-10 mt-10" />
				{/* timebar with blur */}
				<div>
					<div
						ref={timeref}
						className="hidden bottom-0 absolute mb-10 ml-140 border rounded-4xl lg:flex text-center py-1 px-8 pt-2 items-center bg-black/60 backdrop-blur-md"
					>
						<div className="font-arabian text-white flex justify-center space-x-4">
							{[
								{ value: timeLeft.days, label: "Days" },
								{ value: timeLeft.hours, label: "Hours" },
								{ value: timeLeft.minutes, label: "Minutes" },
								{ value: timeLeft.seconds, label: "Seconds" },
							].map((item, idx) => (
								<div key={item.label} className="overflow-hidden text-center">
									<span className=" block">{item.value}</span> {/* Add class here */}
									<p className="text-xs countdown-number opacity-100">
    {item.label}
</p>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* Menu/Cross icon with smooth rotation animation */}
				<div
					ref={menuIconRef}
					className="absolute top-4 right-8 cursor-pointer z-30 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
					onClick={() => setMenuOpen(!menuOpen)}
					style={{ transformOrigin: 'center' }}
				>
					{menuOpen ? (
						<X color="white" size={32} className="text-white" />
					) : (
						<TextAlignJustify color="white" size={32} />
					)}
				</div>
				{/* Animated menubar - GSAP controls all transforms */}
				<div
					ref={menuref}
					className="w-[50vh] min-h-screen absolute top-0 right-0 border border-white/20 bg-black/60 backdrop-blur-xl z-20 overflow-y-auto"
					style={{
						transform: "translateX(100px)",
						opacity: 0,
						pointerEvents: "none",
					}}
				>
					<div className="w-full flex ml-2 lg:h-20 font-medium ">
						<div className="items-start mt-20 pl-3 flex flex-col justify-evenly ">
							<h1
								className="menu-title flex font-arabian flex-col items-start justify-between md:text-2xl lg:text-6xl py-3 text-white"
								style={{
									transform: "translateX(-20px)",
									opacity: 0,
								}}
							>
								cresence
							</h1>
							<div className="flex font-arabian flex-col items-start justify-between md:text-2xl lg:text-2xl inner-content-l py-3">
								{[
									{ to: "/events", label: "Event" },
									{ to: "/workshops", label: "Workshop" },
									{ to: "/About Us", label: "Stay" },
									{ to: "/timeline", label: "Timeline" },
									{ to: "/about", label: "About us" },
									{ to: "/ourteam", label: "our team" },
									{ to: "/sponsers", label: "sponsers" },
								].map((item, idx) => (
									<AnimatedNavLink to={item.to} key={item.to}>
										<h3
											ref={el => {
												if (el && !navLinksRef.current.includes(el)) {
													navLinksRef.current[idx] = el;
												}
											}}
											className="inline-block text-white overflow-hidden"
											style={{
												transform: "translateY(30px)",
												opacity: 0,
											}}
										>
											{item.label.split("").map((char, i) => (
												<span key={i} className="inline-block">
													{char === " " ? "\u00A0" : char}
												</span>
											))}
										</h3>
									</AnimatedNavLink>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

export default Navbar;
