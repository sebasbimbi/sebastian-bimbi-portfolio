'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Project } from '@/lib/types';

interface ListProps {
  title: string;
  items: (Award | Project)[];
  id?: string;
}

const Lists: React.FC<ListProps> = ({ title, items, id }) => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const hoveredItem = hoveredIndex !== null ? items[hoveredIndex] : null;
  const showPopup = hoveredItem && ('video' in hoveredItem || 'image' in hoveredItem || 'link' in hoveredItem) && (('video' in hoveredItem && hoveredItem.video) || ('image' in hoveredItem && hoveredItem.image) || ('link' in hoveredItem && hoveredItem.link));
  // Show sticker if it's an Award (has year) or just doesn't have an image, link, or video
  const showSticker = hoveredItem && !('video' in hoveredItem) && !('image' in hoveredItem) && !('link' in hoveredItem);

  return (
    <section id={id} className="w-full bg-white text-black py-12 md:py-20 px-4 md:px-8 relative">
      <style>
        {`
          @keyframes scroll-vertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(calc(-100% + 200px)); }
          }
          .animate-scroll-vertical {
            animation: scroll-vertical 8s linear infinite alternate;
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}
      </style>

      {/* Floating Website Preview */}
      {showPopup && (
        <div
          className="fixed z-50 pointer-events-none transition-opacity duration-200"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(20px, -50%)', // Offset to the right of cursor
          }}
        >
          {/* Browser Window Frame */}
          <div className="bg-white border-2 border-black w-64 md:w-80 h-48 md:h-56 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
            {/* Fake Browser Header */}
            <div className="h-6 border-b-2 border-black bg-gray-100 flex items-center px-2 gap-1 shrink-0">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full border border-black"></div>
              <div className="w-full h-3 border border-black ml-2 bg-white"></div>
            </div>
            {/* Scrolling Image/Video Container */}
            <div className="relative w-full flex-1 overflow-hidden bg-gray-200">
              {('video' in hoveredItem && hoveredItem.video) ? (
                <video
                  src={hoveredItem.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover absolute top-0 left-0"
                />
              ) : ('link' in hoveredItem && hoveredItem.link) ? (
                <iframe
                  src={hoveredItem.link}
                  className="w-full h-[400%] absolute top-0 left-0 animate-scroll-vertical border-0 pointer-events-none"
                  title="Project Preview"
                />
              ) : (
                <img
                  src={(hoveredItem as Project).image}
                  alt="Project Preview"
                  className="w-full absolute top-0 left-0 animate-scroll-vertical"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Sticker Popup for Awards */}
      {showSticker && (
        <div
          className="fixed z-50 pointer-events-none mix-blend-difference"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Brutalist Star Badge */}
          <div className="relative w-28 h-28 flex items-center justify-center animate-spin-slow">
            {/* 8-point star formed by two squares */}
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute inset-0 bg-white rotate-45"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-black">
              <span className="font-display font-black text-sm uppercase tracking-widest leading-none">
                Honor
              </span>
              <span className="font-bold text-[10px] leading-none mt-1">
                {'year' in hoveredItem ? hoveredItem.year : 'AWARD'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="w-full border-b-2 border-black pb-2 mb-0 flex justify-between items-end">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{title}</span>
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">({items.length})</span>
      </div>

      <div className="flex flex-col">
        {items.map((item, idx) => {
          const handleClick = () => {
            // If it's a Project, navigate to case study page
            if ('slug' in item) {
              router.push(`/case-studies/${item.slug}`);
            }
            // If it's an Award with a URL, open in new tab
            else if ('url' in item && item.url) {
              window.open(item.url, '_blank', 'noopener,noreferrer');
            }
          };

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={handleClick}
              className="w-full border-b-2 border-black py-3 md:py-5 flex flex-row items-center justify-between hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group px-2 gap-4 relative overflow-hidden"
            >
              <div className="flex items-center relative flex-1 overflow-hidden h-full">
                {/* Arrow Flourish */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-lg md:text-2xl font-display transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  ➔
                </span>

                {/* Title */}
                <h3 className="font-display text-lg md:text-2xl uppercase tracking-tight truncate transform transition-transform duration-300 group-hover:translate-x-8">
                  {'title' in item ? item.title : item.name}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Year Display for Awards */}
                {'year' in item && (
                  <span className="font-display font-bold text-sm md:text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.year}
                  </span>
                )}

                <span className="font-bold text-xs md:text-sm uppercase tracking-widest text-right transition-all duration-300 group-hover:font-black">
                  {'organization' in item ? item.organization : item.category}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default Lists;