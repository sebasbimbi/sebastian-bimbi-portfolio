'use client';

import React, { useState, useEffect } from 'react';

const Founded: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const companies = [
    {
      name: "NOCODE.LAT",
      description: "Leading Community For\nNo-Code Enthusiasts",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
      name: "BIMBI DIGITAL",
      description: "Strategic Digital Growth\nAgency & Consultancy",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      name: "SRC.MX",
      description: "Premium No-Code\nResources & Templates",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    }
  ];

  return (
    <section className="w-full bg-black text-white py-24 md:py-32 flex flex-col items-center overflow-hidden relative cursor-default">

      {/* Floating Video Preview */}
      {hoveredIndex !== null && (
        <div
          className="fixed z-50 pointer-events-none transition-opacity duration-200"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%) rotate(5deg)',
          }}
        >
          <div className="bg-black border-2 border-white w-64 md:w-80 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
            <div className="relative aspect-video">
              <video
                src={companies[hoveredIndex].video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover grayscale opacity-90"
              />
              {/* Overlay UI elements to make it look like a viewfinder */}
              <div className="absolute top-2 left-2 flex gap-1 items-center">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_5px_red]"></div>
                <span className="text-[8px] font-bold text-white uppercase tracking-widest font-mono">REC</span>
              </div>
              <div className="absolute bottom-2 right-2">
                <span className="text-[8px] font-bold text-white uppercase tracking-widest font-mono">00:04:20</span>
              </div>
              {/* Crosshairs */}
              <div className="absolute inset-0 border-[0.5px] border-white/20 pointer-events-none flex items-center justify-center">
                <div className="w-4 h-[1px] bg-white/50"></div>
                <div className="h-4 w-[1px] bg-white/50 absolute"></div>
              </div>
            </div>
            <div className="p-2 border-t border-white bg-black">
              <p className="text-[8px] font-mono text-white uppercase">
                Playing: {companies[hoveredIndex].name}_PROMO.mp4
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-16">
        <div className="border-2 border-white rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
          Founded
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-0 relative z-10">
        {companies.map((company, index) => (
          <h2
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="font-display text-[12vw] leading-[0.8] tracking-tighter text-center hover:text-transparent hover:text-stroke-white transition-all duration-300 cursor-none select-none relative"
            style={{
              WebkitTextStroke: hoveredIndex === index ? '1px white' : '0px',
            }}
          >
            {company.name}
          </h2>
        ))}
      </div>

      <div
        className={`w-full px-4 md:px-8 mt-12 flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 transition-opacity duration-300 ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="whitespace-pre-line">
          {hoveredIndex !== null ? companies[hoveredIndex].description : companies[0].description}
        </span>
        <span className="text-right whitespace-pre-line">
          {hoveredIndex !== null ? companies[hoveredIndex].description : companies[0].description}
        </span>
      </div>
    </section>
  );
};

export default Founded;