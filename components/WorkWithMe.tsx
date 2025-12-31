'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Package {
    title: string;
    description: string;
    price: string;
    buttonText: string;
    buttonUrl: string;
}

interface WorkWithMeProps {
    packages: Package[];
}

const WorkWithMe: React.FC<WorkWithMeProps> = ({ packages }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            if (containerRef.current) {
                gsap.set(containerRef.current.children, { autoAlpha: 0, y: '20%' });

                gsap.fromTo(containerRef.current.children,
                    {
                        y: '20%',
                        autoAlpha: 0
                    },
                    {
                        y: '0%',
                        autoAlpha: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 85%',
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="w-full bg-white text-black py-16 md:py-24 px-4 md:px-8">
            <div className="mb-12 flex justify-center">
                <div className="border-2 border-black rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
                    Work With Me
                </div>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {packages.map((pkg, idx) => (
                    <div
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`
              group relative border-2 border-black p-8 transition-all duration-300 flex flex-col opacity-0
              ${hoveredIndex === idx ? 'bg-black text-white' : 'bg-white text-black'}
              ${hoveredIndex !== null && hoveredIndex !== idx ? 'opacity-50' : 'opacity-100'}
              hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            `}
                    >
                        {/* Title */}
                        <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-4">
                            {pkg.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm md:text-base mb-6 flex-1 ${hoveredIndex === idx ? 'text-gray-300' : 'text-gray-600'}`}>
                            {pkg.description}
                        </p>

                        {/* Price */}
                        <p className="font-display text-4xl md:text-5xl font-bold mb-6">
                            {pkg.price}
                        </p>

                        {/* CTA Button */}
                        <a
                            href={pkg.buttonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                inline-flex items-center justify-center px-6 py-3 font-bold uppercase tracking-widest text-sm border-2 transition-all duration-300
                ${hoveredIndex === idx
                                    ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                                    : 'bg-black text-white border-black hover:bg-transparent hover:text-black'}
              `}
                        >
                            {pkg.buttonText}
                            <span className="ml-2">→</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkWithMe;
