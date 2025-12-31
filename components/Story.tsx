'use client';

import React, { useState, useEffect } from 'react';

const Story: React.FC = () => {
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="story" className="relative w-full bg-white text-black py-24 md:py-40 flex flex-col items-center px-6">

      {/* Floating Memory Image */}
      {activeMemory && (
        <div
          className="fixed z-50 pointer-events-none transition-opacity duration-200"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -110%) rotate(-3deg)',
          }}
        >
          <div className="bg-white p-3 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <img
              src={activeMemory}
              alt="Memory"
              className="w-48 h-32 md:w-64 md:h-48 object-cover border border-black grayscale contrast-125"
            />
            <div className="mt-2 text-center font-bold text-xs uppercase tracking-widest">
              {activeMemory.includes('wf-leader') ? '2023' : activeMemory.includes('notion-leader') ? '2025' : activeMemory.includes('wf-mvp') ? '2025' : ''}
            </div>
          </div>
        </div>
      )}

      <div className="mb-16">
        <div className="border-2 border-black rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
          Story
        </div>
      </div>

      <div className="max-w-6xl text-center relative z-10">
        <p className="font-display text-2xl md:text-5xl lg:text-6xl uppercase leading-[1.15] md:leading-[0.9] tracking-tight">
          Started as a struggling graduate, discovered No-Code, posted daily on LinkedIn,
          became a{' '}
          <span
            className="relative inline-block cursor-none underline decoration-4 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
            onMouseEnter={() => setActiveMemory("/images/wf-leader.jpeg")}
            onMouseLeave={() => setActiveMemory(null)}
          >
            Webflow Global Leader
          </span>,{' '}
          <span
            className="relative inline-block cursor-none underline decoration-4 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
            onMouseEnter={() => setActiveMemory("/images/notion-leader.jpeg")}
            onMouseLeave={() => setActiveMemory(null)}
          >
            Notion Ambassador
          </span>, and won the{' '}
          <span
            className="relative inline-block cursor-none underline decoration-4 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
            onMouseEnter={() => setActiveMemory("/images/wf-mvp.jpeg")}
            onMouseLeave={() => setActiveMemory(null)}
          >
            Webflow Community MVP
          </span>.
          Now I partner with growth-focused companies and give back to the community that changed my life.
        </p>
      </div>
    </section>
  );
};

export default Story;