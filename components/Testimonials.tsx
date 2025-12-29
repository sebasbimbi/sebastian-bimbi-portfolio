'use client';

import React, { useState } from 'react';

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    url?: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="w-full bg-white text-black py-16 md:py-24 px-4 md:px-8">
            <div className="mb-12 flex justify-center">
                <div className="border-2 border-black rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
                    Testimonials
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((testimonial, idx) => (
                    <a
                        key={idx}
                        href={testimonial.url || '#'}
                        target={testimonial.url ? '_blank' : undefined}
                        rel={testimonial.url ? 'noopener noreferrer' : undefined}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`
              group relative border-2 border-black p-6 transition-all duration-300 cursor-pointer
              ${hoveredIndex === idx ? 'bg-black text-white' : 'bg-white text-black'}
              ${hoveredIndex !== null && hoveredIndex !== idx ? 'opacity-50' : 'opacity-100'}
              hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            `}
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
                        </div>

                        {/* Arrow indicator on hover */}
                        <div className={`absolute top-4 right-4 text-lg transform transition-all duration-300 ${hoveredIndex === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                            ↗
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
