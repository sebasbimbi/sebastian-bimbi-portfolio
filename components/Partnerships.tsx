'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface Partnership {
    company: string;
    logo: string;
    type: string; // "Sponsored Post", "Content Creation", etc.
    description: string;
    impressions: number;
    url: string;
}

interface PartnershipsProps {
    partnerships: Partnership[];
}

const Partnerships: React.FC<PartnershipsProps> = ({ partnerships }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const formatImpressions = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <section className="w-full bg-black text-white py-16 md:py-24 px-4 md:px-8">
            <div className="mb-12 flex justify-center">
                <div className="border-2 border-white rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
                    Partnerships
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {partnerships.map((partnership, idx) => (
                    <a
                        key={idx}
                        href={partnership.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`
              group relative border-2 border-white p-6 transition-all duration-300 cursor-pointer flex flex-col
              ${hoveredIndex === idx ? 'bg-white text-black' : 'bg-black text-white'}
              ${hoveredIndex !== null && hoveredIndex !== idx ? 'opacity-50' : 'opacity-100'}
              hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]
            `}
                    >
                        {/* Logo */}
                        <div className={`relative w-16 h-16 mb-4 flex items-center justify-center overflow-hidden rounded-lg ${hoveredIndex === idx ? 'bg-gray-100' : 'bg-white'}`}>
                            <Image
                                src={partnership.logo}
                                alt={`${partnership.company} logo`}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </div>

                        {/* Company Name */}
                        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${hoveredIndex === idx ? 'text-gray-500' : 'text-gray-400'}`}>
                            {partnership.company}
                        </p>

                        {/* Type Badge */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs font-bold uppercase tracking-wide ${hoveredIndex === idx ? 'text-black' : 'text-white'}`}>
                                {partnership.type}
                            </span>
                        </div>

                        {/* Description */}
                        <p className={`text-sm mb-4 flex-1 ${hoveredIndex === idx ? 'text-gray-600' : 'text-gray-300'}`}>
                            {partnership.description}
                        </p>

                        {/* Impressions */}
                        <div className={`flex items-center gap-2 text-xs ${hoveredIndex === idx ? 'text-gray-500' : 'text-gray-400'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{formatImpressions(partnership.impressions)} Impressions</span>
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

export default Partnerships;
