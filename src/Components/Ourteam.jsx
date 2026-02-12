import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const facultyMembers = [
  { id: 1, name: "Phani Vinay", role: "Team Lead", image: "/images/nari.jpeg" },
  { id: 2, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 3, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
];
const teamMembers = [
  { id: 1, name: "Phani Vinay", role: "Team Lead", image: "/images/phani.jpeg" },
  { id: 2, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 3, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 4, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 5, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 6, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 7, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 8, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 9, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
  { id: 10, name: "Member Name", role: "Coordinator", image: "/images/phani.jpeg" },
];

const TeamMemberCard = ({ member }) => {
  const frameRef = useRef(null);
  return (
    <div className="flex flex-col items-center justify-center space-y-4 group">
      <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
        {/* Rotating Frame */}
        <img
          ref={frameRef}
          src="/images/main frame.png"
          alt="Frame"
          className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Member Image */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-amber-600/30">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-cinzel text-lg md:text-xl tracking-wider">{member.name}</h3>
        <p className="text-amber-500 font-arabian text-xs md:text-sm uppercase tracking-widest">{member.role}</p>
      </div>
    </div>
  );
};

export default function Ourteam() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".team-card", {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full py-20 px-4 md:px-10 overflow-hidden"
    >
      {/* Section Background Overlay */}
      <div
        className="absolute inset-0 z-0  mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('/images/about_frame1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.2)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl text-white font-cinzel mb-4 tracking-[0.2em]">
            OUR TEAM
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full shadow-[0_0_10px_#d97706]" />
        </div>
        <div className='flex flex-col items-center justify-center'>
            <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl text-white font-cinzel mb-4 tracking-[0.2em]">
            Faculty coordinators
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-y-12 gap-x-8">
          {facultyMembers.map((member) => (
            <div key={member.id} className="team-card">
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
        </div>
      <div className='mt-10'>
          <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl text-white font-cinzel mb-4 tracking-[0.2em]">
            student coordinators
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
