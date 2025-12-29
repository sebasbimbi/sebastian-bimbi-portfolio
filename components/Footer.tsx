'use client';

import React, { useState, useEffect, useRef } from 'react';

const Footer: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs for animations
  const footerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // 1. Parallax Image
      if (imageRef.current) {
        const rect = imageRef.current.parentElement?.getBoundingClientRect();
        if (rect && rect.top < windowHeight && rect.bottom > 0) {
          // Calculate movement based on scroll position relative to viewport center
          // Moving the image slightly against the scroll direction
          const speed = 0.15;
          const offset = (rect.top - windowHeight / 2) * speed;
          imageRef.current.style.transform = `translateY(${offset}px) scale(1.15)`;
        }
      }

      // 2. Text Reveal
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        // Reveal when the top of the text is in the lower 85% of the screen
        if (rect.top < windowHeight * 0.85) {
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translateY(0)';
        }
      }

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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Initial triggering to set positions
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const titleText = "SEBASTIAN BIMBI © 25";

  return (
    <footer id="contact" ref={footerRef} className="w-full bg-white text-black">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
          /* Pause animation when the parent group is hovered */
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 6s linear infinite;
          }
        `}
      </style>

      {/* Floating Sticker Popup */}
      {isHovered && (
        <div
          className="fixed z-50 pointer-events-none mix-blend-difference"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center animate-spin-slow relative">
            <div className="absolute inset-1 border-2 border-dashed border-black rounded-full"></div>
            <div className="text-center transform -rotate-12">
              <p className="font-display font-black text-black text-2xl md:text-3xl leading-none">PDF</p>
              <p className="font-bold text-black text-[10px] uppercase tracking-wider">Download</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid Layout for Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t-2 border-black">
        {/* Left: Image with Parallax */}
        <div className="relative h-[50vh] md:h-[80vh] border-r-2 border-black overflow-hidden">
          <img
            ref={imageRef}
            src="https://picsum.photos/800/1200?grayscale"
            alt="Portrait"
            className="w-full h-full object-cover transition-transform duration-75 ease-linear will-change-transform"
            style={{ transform: 'scale(1.15)' }} // Initial scale to allow movement
          />
          <div className="absolute bottom-0 left-0 bg-black text-white px-4 py-1 font-bold uppercase text-sm z-10">
            Mission
          </div>
          <div className="absolute top-0 left-0 bg-black text-white px-4 py-1 font-bold uppercase text-sm z-10">
            Book A Mentorship Session
          </div>
        </div>

        {/* Right: Text with Reveal Animation */}
        <div className="h-full flex flex-col justify-end p-4 md:p-8 overflow-hidden">
          <div
            ref={textRef}
            className="mt-auto transition-all duration-1000 ease-out opacity-0 translate-y-20"
          >
            <p className="font-bold text-lg md:text-2xl uppercase leading-tight tracking-tight text-right md:text-left">
              My mission started with one simple hope: To help just one person, thinking that if I could save even a single developer from the struggles I faced, it would all be worth it. Then the messages began to arrive—people saying I changed their lives, helped them get their first client, or finally believe in themselves.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Banner */}
      <div
        className="w-full bg-black text-white py-4 md:py-8 overflow-hidden border-y-2 border-white flex group cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* First copy of content */}
        <div className="animate-marquee whitespace-nowrap flex shrink-0 items-center">
          <span className="font-display text-4xl md:text-8xl uppercase tracking-tighter mx-6 md:mx-12 group-hover:opacity-50 transition-opacity duration-300">Download A Full PDF (Who I'm)</span>
          <span className="font-display text-4xl md:text-8xl uppercase tracking-tighter mx-6 md:mx-12 group-hover:opacity-50 transition-opacity duration-300">Download A Full PDF (Who I'm)</span>
        </div>
        {/* Second copy of content for seamless loop */}
        <div className="animate-marquee whitespace-nowrap flex shrink-0 items-center">
          <span className="font-display text-4xl md:text-8xl uppercase tracking-tighter mx-6 md:mx-12 group-hover:opacity-50 transition-opacity duration-300">Download A Full PDF (Who I'm)</span>
          <span className="font-display text-4xl md:text-8xl uppercase tracking-tighter mx-6 md:mx-12 group-hover:opacity-50 transition-opacity duration-300">Download A Full PDF (Who I'm)</span>
        </div>
      </div>

      {/* Links Footer */}
      <div className="w-full bg-black text-white px-4 md:px-8 pt-10 pb-32 md:pb-40 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] md:text-xs uppercase tracking-widest gap-6 md:gap-0">
        <div className="flex gap-2">
          <span className="font-bold text-white">Email</span>
          <a href="mailto:s@bimbi.co" className="text-gray-500 italic hover:text-white transition-all duration-300 hover:scale-105 origin-left inline-block">s@bimbi.co</a>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-white">TikTok</span>
          <a href="#" className="text-gray-500 italic hover:text-white transition-all duration-300 hover:scale-105 origin-left inline-block">(1.5M+ Followers)</a>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-white">LinkedIn</span>
          <a href="#" className="text-gray-500 italic hover:text-white transition-all duration-300 hover:scale-105 origin-left inline-block">(10K+ Followers)</a>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-white">By</span>
          <span className="text-gray-500 italic">HK©</span>
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