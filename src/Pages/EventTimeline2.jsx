import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SpiralTimeline (Themed for Arabian Nights background)
 * - Designed to sit ON TOP of a clipped background image
 * - Warm gold / sand / soft violet palette to match lantern sunset scene
 * - Items positioned at spiral bends, alternating left and right
 * - Smooth flowing spiral curves
 */

export default function SpiralTimeline({ timelineItems }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const itemsRef = useRef([]);

  // Generate smooth spiral path with bezier curves
  const generateSpiralPath = (itemCount) => {
    const verticalSpacing = 280;
    const svgHeight = 150 + (itemCount * verticalSpacing) + 100;
    
    const centerX = 600;
    const amplitude = 350; // How far left/right the spiral goes
    
    // Start at the first item's position (right side for index 0)
    const startX = centerX + amplitude;
    const startY = 150 + (verticalSpacing / 2);
    
    let pathData = `M${startX} ${startY}`; // Start at first item position
    
    // Create curves connecting all items (stop at itemCount - 1)
    for (let i = 0; i < itemCount ; i++) {
      const currentIsRight = i % 2 === 0;
      const nextIsRight = (i + 1) % 2 === 0;
      
      const currentY = 150 + (verticalSpacing / 2) + (i * verticalSpacing);
      const nextY = 150 + (verticalSpacing / 2) + ((i + 1) * verticalSpacing);
      
      const currentX = currentIsRight ? centerX + amplitude : centerX - amplitude;
      const nextX = nextIsRight ? centerX + amplitude : centerX - amplitude;
      
      // Control points for smooth S-curve
      const cp1X = currentX;
      const cp1Y = currentY + verticalSpacing * 0.25;
      
      const cp2X = currentIsRight ? centerX - amplitude * 0.5 : centerX + amplitude * 0.5;
      const cp2Y = currentY + verticalSpacing * 0.5;
      
      const cp3X = nextX;
      const cp3Y = nextY - verticalSpacing * 0.25;
      
      // Create smooth cubic bezier curve to next position
      pathData += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${cp2X} ${cp2Y}`;
      pathData += ` S ${cp3X} ${cp3Y}, ${nextX} ${nextY}`;
    }
    
    return { pathData, svgHeight };
  };

  const { pathData, svgHeight } = generateSpiralPath(timelineItems.length);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();

    // Animate path drawing
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Position items at the bends of the spiral
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      
      const verticalSpacing = 280;
      const centerX = 600;
      const amplitude = 350;
      
      // Position at the peak of each bend
      const bendY = 150 + (verticalSpacing / 2) + (i * verticalSpacing);
      const isRight = i % 2 === 0;
      const bendX = isRight ? centerX + amplitude : centerX - amplitude;
      
      // Offset the card away from the path
      const offsetDistance = 140;
      const cardX = isRight ? bendX + offsetDistance : bendX - offsetDistance;

      gsap.set(el, {
        x: cardX,
        y: bendY,
      });

      // Animate in
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.7, y: bendY + 30 },
        {
          opacity: 1,
          scale: 1,
          y: bendY,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Animate connector line
      const line = el.querySelector('.connector-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [timelineItems, pathData]);

  return (
    <section
      className="relative bg-cover work-bg bg-center"
      style={{ minHeight: `${svgHeight + 300}px` }}
    >
      {/* subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex justify-center pt-20 pb-20">
        <div className="relative w-[1400px]" style={{ height: `${svgHeight}px` }}>
          {/* Spiral SVG */}
          <svg 
            ref={svgRef} 
            viewBox={`0 0 1400 ${svgHeight}`}
            className="absolute inset-0"
            style={{ height: `${svgHeight}px`, width: '100%' }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main spiral path */}
            <path
              ref={pathRef}
              d={pathData}
              fill="none"
              stroke="#e6c07b"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              opacity="0.9"
            />
          </svg>

          {/* Timeline Items */}
          {timelineItems.map((item, index) => {
            const Icon = item.Icon;
            const isRight = index % 2 === 0;
            
            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className="absolute"
                style={{
                  transformOrigin: 'center center',
                }}
              >
                {/* Connector line from card to spiral */}
                <div 
                  className="connector-line absolute top-1/2 h-0.5 bg-gradient-to-r from-[#e6c07b]/60 to-transparent"
                  style={{
                    width: '140px',
                    [isRight ? 'right' : 'left']: '100%',
                    transformOrigin: isRight ? 'right center' : 'left center',
                  }}
                />
                
                <div 
                  className={`backdrop-blur-md bg-[#2b1d2f]/70 border border-[#e6c07b]/40 rounded-2xl px-5 py-4 w-72 shadow-xl hover:shadow-2xl hover:border-[#e6c07b]/60 hover:bg-[#2b1d2f]/85 transition-all duration-300 ${
                    isRight ? '-translate-x-full' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#e6c07b]/20 p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-[#e6c07b]" />
                    </div>
                    <span className="text-sm text-[#f3e9d2] tracking-wide font-medium">
                      Day {item.date}
                    </span>
                  </div>
                  <h3 className="text-[#fff4d6] font-semibold text-lg mb-1">
                    {item.heading}
                  </h3>
                  <p className="text-sm text-[#f3e9d2]/80">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}