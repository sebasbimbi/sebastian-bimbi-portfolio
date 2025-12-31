'use client';

import React, { useEffect, useRef } from 'react';

const Footer: React.FC = () => {
  // Refs for animations
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // 3. Big Title Entrance (Staggered Character Reveal)
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        // Check if element is coming into view
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Progress: 0 (top enters viewport) -> 1 (fully inside viewport/scrolled past)
          const distance = windowHeight - rect.top;
          // We assume the animation should finish when the element is fully visible
          const progress = Math.min(Math.max(distance / rect.height, 0), 1);

          const spans = titleRef.current.querySelectorAll('span');
          const total = spans.length;

          spans.forEach((span, i) => {
            // Stagger logic:
            // Map global progress (0..1) to local progress for each letter.
            // We want a wave effect. 
            // Start point for letter i: (i / total) * 0.5
            // Duration for letter i: 0.5 (in terms of global progress units)

            const start = (i / total) * 0.5;
            const end = start + 0.5;

            // Local progress 0 -> 1
            let localProgress = (progress - start) / (end - start);
            localProgress = Math.min(Math.max(localProgress, 0), 1);

            // Cubic Ease Out
            const ease = 1 - Math.pow(1 - localProgress, 3);

            (span as HTMLElement).style.opacity = `${ease}`;
            // Slide up from 100% (below its line) to 0%
            (span as HTMLElement).style.transform = `translateY(${(1 - ease) * 100}%)`;
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial triggering to set positions
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const yearDisplay = currentYear.toString().slice(-2);
  const titleText = `SEBASTIAN BIMBI © ${yearDisplay}`;

  return (
    <footer id="contact" ref={footerRef} className="w-full bg-white text-black">
      {/* Links Footer */}
      <div className="w-full bg-black text-white px-4 md:px-8 pt-10 pb-32 md:pb-40 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] md:text-xs uppercase tracking-widest gap-6 md:gap-0">
        <div className="flex gap-2">
          <span className="font-bold text-white">Email</span>
          <a href="mailto:s@bimbi.co" className="text-gray-500 italic hover:text-white transition-all duration-300 hover:scale-105 origin-left inline-block">s@bimbi.co</a>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-white">TikTok</span>
          <a href="https://www.tiktok.com/@sebasbimbi" target="_blank" rel="noopener noreferrer" className="text-gray-500 italic hover:text-white transition-all duration-300 hover:scale-105 origin-left inline-block">(1.5M+ Followers)</a>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-white">LinkedIn</span>
          <a href="https://www.linkedin.com/in/sebasbimbi/" target="_blank" rel="noopener noreferrer" className="text-gray-500 italic hover:text-white transition-all duration-300 hover:scale-105 origin-left inline-block">(11K+ Followers)</a>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-white">By</span>
          <a href="https://www.hasnainkhagan.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 italic hover:text-white transition-all duration-300 hover:scale-105 origin-left inline-block">HK©</a>
        </div>
      </div>

      <div className="w-full bg-black text-white pb-4 text-center overflow-hidden">
        <h1
          ref={titleRef}
          className="leading-[0.8] uppercase tracking-tighter whitespace-nowrap"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: '11vw' }}
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block transition-none will-change-transform"
              style={{ opacity: 0, transform: 'translateY(100%)' }} // Initial state
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;