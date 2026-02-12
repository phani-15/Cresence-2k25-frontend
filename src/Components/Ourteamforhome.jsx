import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Instagram } from "lucide-react";

const coordinators = [
    {
        id: 1,
        name: "srinivas ",
        role: "Fest Coordinator",
        image: "/images/phani.jpeg", // Using phani.jpeg as per user's recent file changes
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
    },
    {
        id: 2,
        name: "vinay",
        role: "Management Head",
        image: "/images/nari.jpeg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
    },
    {
        id: 3,
        name: "narendra",
        role: "Tech Lead",
        image: "/images/phani.jpeg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
    },
    {
        id: 3,
        name: "srujana",
        role: "Tech Lead",
        image: "/images/nari.jpeg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
    },
    {
        id: 3,
        name: "tejasatwika",
        role: "Tech Lead",
        image: "/images/phani.jpeg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
    },
    // Add more members as needed
];

export default function Ourteamforhome() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const cardRef = useRef(null);
    const textRef = useRef(null);

    const nextMember = () => {
        setCurrentIndex((prev) => (prev + 1) % coordinators.length);
    };

    const prevMember = () => {
        setCurrentIndex((prev) => (prev - 1 + coordinators.length) % coordinators.length);
    };

    useGSAP(() => {
        // Initial entry animation
        gsap.from(carouselRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
        });
    }, { scope: carouselRef });

    useEffect(() => {
        // Transition animation when currentIndex changes
        const tl = gsap.timeline();

        tl.to([cardRef.current, textRef.current], {
            opacity: 0,
            x: -20,
            duration: 0.3,
            ease: "power2.in"
        })
            .set([cardRef.current, textRef.current], {
                x: 20
            })
            .to([cardRef.current, textRef.current], {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out"
            });

    }, [currentIndex]);

    const activeMember = coordinators[currentIndex];

    return (
        <div ref={carouselRef} className="w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center py-20 px-6 md:px-20 gap-10 md:gap-20 bg-transparent relative z-10">

            {/* LEFT SIDE: BRIEF INFO */}
            <div className="w-full md:w-1/3 text-left space-y-6">
                <h2 className="text-4xl md:text-6xl text-white font-cinzel font-bold tracking-wider">
                    Our Team
                </h2>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed opacity-80">
                    CreSencE 2K26 is powered by a passionate team of students and faculty
                    dedicated to making this tech fest a success. From organizing workshops
                    to managing logistics, we ensure a seamless and engaging experience.
                    Together, we bring innovation, creativity, and technology to life.
                </p>
            </div>

            {/* CENTER: CAROUSEL CARD */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-10 md:gap-16">

                {/* MEMBER IMAGE WITH ARABIAN BORDERS */}
                <div ref={cardRef} className="relative w-64 h-96 md:w-72 md:h-[108] group shrink-0">
                    {/* Top Right Border */}
                    <img
                        src="/images/border .png"
                        alt="Border"
                        className="absolute -top-3 -right-3 w-36 h-36 z-20 rotate-180 pointer-events-none"
                    />
                    {/* Bottom Left Border */}
                    <img
                        src="/images/border .png"
                        alt="Border"
                        className="absolute -bottom-3 -left-3 w-36 h-36 z-20  pointer-events-none"
                    />

                    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 relative">
                        <img
                            src={activeMember.image}
                            alt={activeMember.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay for name on image */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                </div>

                {/* MEMBER INFO & SOCIALS */}
                <div ref={textRef} className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-3xl md:text-5xl text-white font-cinzel tracking-wide font-bold">
                            {activeMember.name}
                        </h3>
                        <p className="text-amber-500 font-medium text-lg md:text-xl font-arabian uppercase tracking-widest">
                            {activeMember.role}
                        </p>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="flex items-center gap-6">
                        <a href={activeMember.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Github size={28} />
                        </a>
                        <a href={activeMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Linkedin size={28} />
                        </a>
                        <a href={activeMember.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Instagram size={28} />
                        </a>
                    </div>
                </div>
            </div>

            {/* NAVIGATION ARROWS (Placed at bottom center or absolute sides depending on design) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-12 z-30">
                <button
                    onClick={prevMember}
                    className="hover:scale-110 transition-transform active:scale-95 group focus:outline-none cursor-pointer"
                >
                    <img src="/images/nav.png" alt="Prev" className="w-12 h-12 md:w-14 md:h-14 rotate-180 brightness-75 group-hover:brightness-100" />
                </button>
                <button
                    onClick={nextMember}
                    className="hover:scale-110 transition-transform active:scale-95 group focus:outline-none cursor-pointer"
                >
                    <img src="/images/nav.png" alt="Next" className="w-12 h-12 md:w-14 md:h-14 brightness-75 group-hover:brightness-100" />
                </button>
            </div>

        </div>
    );
}
