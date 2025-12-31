'use client';

import React, { useLayoutEffect, useState } from 'react';

const Header: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Animate continuously until the user scrolls past 80% of the first screen
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();
    handleScroll(); // Initialize scroll position on load

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate dynamic styles
  // StartSize: Reduced to 13/14vw to ensure it fits within 100vw in Hero section
  const startSize = isMobile ? 13 : 14;

  // EndSize: Adjusted to fit nicely between nav links (approx 20-24px)
  const endSize = isMobile ? 1.25 : 1.5; // rem

  // Vertical Alignment
  // Nav has py-6 (24px). Center is approx 34px from top.
  const endTop = '2.125rem';
  const startTopCalc = `calc(100vh - ${startSize * 0.85}vw)`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-6 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest text-white mix-blend-difference pointer-events-none">
        {/* Left Links */}
        <div className="flex gap-4 md:gap-6 pointer-events-auto w-1/3">
          <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
          <a href="#story" className="hover:opacity-70 transition-opacity">Story</a>
        </div>

        {/* Description - Positioned absolutely to not take up layout space in the middle */}
        <div
          className="absolute left-1/2 -translate-x-1/2 hidden md:block text-center max-w-xl leading-tight transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          Webflow Global Community Leader and Notion Ambassador.
        </div>

        {/* Right Links */}
        <div className="flex gap-4 md:gap-6 pointer-events-auto w-1/3 justify-end">
          <a href="#awards" className="hover:opacity-70 transition-opacity">Awards</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Animated Brand Name / Logo */}
      <h1
        className="fixed z-50 text-white mix-blend-difference text-center uppercase whitespace-nowrap w-full pointer-events-none font-oswald font-bold"
        style={{
          lineHeight: 0.85,
          // Interpolate Top Position
          // Start: Bottom of screen (startTopCalc)
          // End: Center of Navbar (endTop)
          top: `calc(${startTopCalc} * ${(1 - scrollProgress)} + ${endTop} * ${scrollProgress})`,

          // Interpolate Font Size
          fontSize: `calc(${startSize}vw * ${(1 - scrollProgress)} + ${endSize}rem * ${scrollProgress})`,

          // Interpolate Transform
          // Start: translateY(0) (Baseline alignment logic with startTopCalc)
          // End: translateY(-50%) (Center alignment logic with endTop)
          transform: `translateY(calc(-50% * ${scrollProgress}))`,

          letterSpacing: scrollProgress > 0.8 ? '0.05em' : '-0.02em',
          transition: 'letter-spacing 0.3s'
        }}
      >
        {isMobile ? (
          <span className="relative">
            <span
              className="transition-opacity duration-300"
              style={{ opacity: scrollProgress > 0.7 ? 0 : 1 }}
            >
              Sebastian Bimbi
            </span>
            <span
              className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-300"
              style={{ opacity: scrollProgress > 0.7 ? 1 : 0 }}
            >
              SB
            </span>
          </span>
        ) : (
          'Sebastian Bimbi'
        )}
      </h1>
    </>
  );
};

export default Header;