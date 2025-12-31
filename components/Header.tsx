'use client';

import React, { useEffect, useRef, useState } from 'react';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastProgress = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateAnimation = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);

      // Only update if progress changed significantly
      if (Math.abs(progress - lastProgress.current) < 0.001) return;
      lastProgress.current = progress;

      const header = headerRef.current;
      const desc = descRef.current;

      if (header) {
        header.style.setProperty('--progress', progress.toString());
      }
      if (desc) {
        desc.style.opacity = Math.max(0, 1 - progress * 5).toString();
      }
    };

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateAnimation);
    };

    // Initial update
    updateAnimation();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const startSize = isMobile ? 13 : 14;
  const endSize = isMobile ? 1.25 : 1.5;

  return (
    <>
      <style>{`
        .brand-header {
          --progress: 0;
          --start-size: ${startSize}vw;
          --end-size: ${endSize}rem;
          --start-top: calc(100vh - ${startSize * 0.85}vw);
          --end-top: 2.125rem;

          top: calc(var(--start-top) * (1 - var(--progress)) + var(--end-top) * var(--progress));
          font-size: calc(var(--start-size) * (1 - var(--progress)) + var(--end-size) * var(--progress));
          transform: translateY(calc(-50% * var(--progress))) translateZ(0);
          will-change: transform, top, font-size;
          letter-spacing: calc(-0.02em + 0.07em * var(--progress));
        }
        .brand-header .brand-full {
          opacity: calc(1 - var(--progress) * 1.4);
        }
        .brand-header .brand-short {
          opacity: calc(var(--progress) * 1.4 - 0.4);
        }
      `}</style>

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-6 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest text-white mix-blend-difference pointer-events-none">
        <div className="flex gap-4 md:gap-6 pointer-events-auto w-1/3">
          <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
          <a href="#story" className="hover:opacity-70 transition-opacity">Story</a>
        </div>

        <div
          ref={descRef}
          className="absolute left-1/2 -translate-x-1/2 hidden md:block text-center max-w-xl leading-tight"
          style={{ transition: 'opacity 0.1s ease-out' }}
        >
          Webflow Global Community Leader and Notion Ambassador.
        </div>

        <div className="flex gap-4 md:gap-6 pointer-events-auto w-1/3 justify-end">
          <a href="#awards" className="hover:opacity-70 transition-opacity">Awards</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </nav>

      <h1
        ref={headerRef}
        className="brand-header fixed z-50 text-white mix-blend-difference text-center uppercase whitespace-nowrap w-full pointer-events-none font-oswald font-bold"
        style={{ lineHeight: 0.85 }}
      >
        {isMobile ? (
          <span className="relative inline-block">
            <span className="brand-full">Sebastian Bimbi</span>
            <span className="brand-short absolute left-1/2 -translate-x-1/2">SB</span>
          </span>
        ) : (
          'Sebastian Bimbi'
        )}
      </h1>
    </>
  );
};

export default Header;