'use client';

import React, { useState, useEffect } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

const Story: React.FC = () => {
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const mousePos = useMousePosition();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Position image on opposite side of cursor for better visibility
  const isLeftSide = mousePos.x < windowWidth / 2;
  const imageOffset = isLeftSide ? 40 : -320; // 320 = image width + padding

  return (
    <section id="story" className="relative w-full bg-white text-black py-24 md:py-40 flex flex-col items-center px-6">

      {/* Floating Memory Image */}
      {activeMemory && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePos.x + imageOffset,
            top: mousePos.y - 120,
            transition: 'left 0.15s ease-out, top 0.15s ease-out',
          }}
        >
          <div
            className="bg-white p-3 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            style={{ transform: isLeftSide ? 'rotate(2deg)' : 'rotate(-2deg)' }}
          >
            <img
              src={activeMemory}
              alt="Memory"
              className="w-64 h-48 object-cover border border-black grayscale contrast-125"
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

      <div className="max-w-5xl text-center relative z-10">
        <p className="text-xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed tracking-normal">
          Started as a struggling graduate, discovered No-Code, posted daily on LinkedIn,
          became a{' '}
          <span
            className="relative inline-block cursor-none font-bold underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
            onMouseEnter={() => setActiveMemory("/images/wf-leader.jpeg")}
            onMouseLeave={() => setActiveMemory(null)}
          >
            Webflow Global Leader
          </span>,{' '}
          <span
            className="relative inline-block cursor-none font-bold underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
            onMouseEnter={() => setActiveMemory("/images/notion-leader.jpeg")}
            onMouseLeave={() => setActiveMemory(null)}
          >
            Notion Ambassador
          </span>, and won the{' '}
          <span
            className="relative inline-block cursor-none font-bold underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
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