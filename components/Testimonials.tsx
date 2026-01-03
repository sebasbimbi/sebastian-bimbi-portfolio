'use client';

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    url?: string;
    year?: string;
}

interface TestimonialsProps {
    recommendations: Testimonial[];
    menteeTestimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ recommendations, menteeTestimonials }) => {
    const [activeTab, setActiveTab] = useState<'recommendations' | 'mentee'>('recommendations');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useScrollReveal<HTMLDivElement>({ staggerDelay: 80 });

    const activeList = activeTab === 'recommendations' ? recommendations : menteeTestimonials;

    return (
        <section className="w-full bg-white text-black py-16 md:py-24 px-4 md:px-8">
            <div className="mb-12 flex flex-col items-center justify-center gap-6">
                <div className="border-2 border-black rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
                    Testimonials
                </div>

                <div className="flex gap-2 p-1 bg-gray-100 rounded-full">
                    <button
                        onClick={() => setActiveTab('recommendations')}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'recommendations'
                            ? 'bg-black text-white shadow-lg'
                            : 'text-gray-500 hover:text-black'
                            }`}
                    >
                        Recommendations
                    </button>
                    <button
                        onClick={() => setActiveTab('mentee')}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'mentee'
                            ? 'bg-black text-white shadow-lg'
                            : 'text-gray-500 hover:text-black'
                            }`}
                    >
                        Mentee Testimonials
                    </button>
                </div>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeList.map((testimonial, idx) => (
                    <div
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`
              group relative border-2 border-black p-6 flex flex-col justify-between h-full
              ${hoveredIndex === idx ? 'bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black'}
            `}
                        style={{
                            opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 1,
                            transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        {/* Quote Icon */}
                        <div className={`text-4xl md:text-5xl font-display leading-none mb-4 transition-colors ${hoveredIndex === idx ? 'text-white' : 'text-black'}`}>
                            "
                        </div>

                        {/* Quote Text */}
                        <p className="text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                            {testimonial.quote}
                        </p>

                        {/* Author Info */}
                        <div className="mt-auto pt-4 border-t border-current">
                            <p className="font-bold text-sm uppercase tracking-wide">
                                {testimonial.name}
                            </p>
                            <p className={`text-xs uppercase tracking-widest mt-1 ${hoveredIndex === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                                {testimonial.role}
                            </p>
                            <p className={`text-xs uppercase tracking-widest ${hoveredIndex === idx ? 'text-gray-400' : 'text-gray-400'}`}>
                                {testimonial.company}
                            </p>

                            {/* Year */}
                            {testimonial.year && (
                                <p className={`text-xs uppercase tracking-widest mt-1 ${hoveredIndex === idx ? 'text-gray-400' : 'text-gray-400'}`}>
                                    {testimonial.year}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
