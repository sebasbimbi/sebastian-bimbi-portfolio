'use client';

import React, { useEffect, useRef, useState } from 'react';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const desc = descRef.current;
    if (!header) return;

    // Calculate scale factor: end size / start size
    const startSizeVw = isMobile ? 13 : 14;
    const endSizeRem = isMobile ? 1.25 : 1.5;
    const endSizePx = endSizeRem * 16;
    const startSizePx = (startSizeVw / 100) * window.innerWidth;
    const scaleFactor = endSizePx / startSizePx;

    // Calculate Y translation distance
    const startY = window.innerHeight - (startSizeVw * 0.85 / 100) * window.innerWidth;
    const endY = 34; // ~2.125rem in pixels
    const translateDistance = startY - endY;

    const updateAnimation = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);

      // Only transform and opacity - GPU only, no layout
      const currentScale = 1 - progress * (1 - scaleFactor);
      const currentY = translateDistance * (1 - progress);

      header.style.transform = `translate3d(0, ${currentY}px, 0) scale(${currentScale})`;
      header.style.opacity = '1';

      if (desc) {
        desc.style.opacity = Math.max(0, 1 - progress * 5).toString();
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateAnimation);
      }
    };

    // Initial
    updateAnimation();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const startSize = isMobile ? 13 : 14;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-6 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest text-white mix-blend-difference pointer-events-none">
        <div className="flex gap-4 md:gap-6 pointer-events-auto w-1/3">
          <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
          <a href="#story" className="hover:opacity-70 transition-opacity">Story</a>
        </div>

        <div
          ref={descRef}
          className="absolute left-1/2 -translate-x-1/2 hidden md:block text-center max-w-xl leading-tight"
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
        className="fixed z-50 text-white mix-blend-difference text-center uppercase whitespace-nowrap w-full pointer-events-none font-oswald font-bold"
        style={{
          lineHeight: 0.85,
          fontSize: `${startSize}vw`,
          top: 34,
          transformOrigin: 'center top',
          willChange: 'transform',
          letterSpacing: '-0.02em',
        }}
      >
        Sebastian Bimbi
      </h1>
    </>
  );
};

export default Header;