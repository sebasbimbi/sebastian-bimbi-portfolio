'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface AmbassadorRole {
    company: string;
    logo: string;
    year?: string;
}

interface AmbassadorProps {
    roles: AmbassadorRole[];
}

const Ambassador: React.FC<AmbassadorProps> = ({ roles }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useScrollReveal<HTMLDivElement>({ staggerDelay: 100 });

    return (
        <section className="w-full bg-white text-black py-16 md:py-24 px-4 md:px-8 border-t-2 border-black">
            <div className="mb-12 flex justify-center">
                <div className="border-2 border-black rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
                    Ambassador
                </div>
            </div>

            <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {roles.map((role, idx) => (
                    <div
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`
              group relative border-2 border-black p-8 transition-colors duration-300 flex flex-col items-center justify-center aspect-square md:aspect-auto md:h-64
              ${hoveredIndex === idx ? 'bg-black text-white' : 'bg-white text-black'}
              hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            `}
                    >
                        {/* Logo */}
                        <div className={`relative w-24 h-24 mb-6 flex items-center justify-center overflow-hidden rounded-xl ${hoveredIndex === idx ? 'bg-white' : 'bg-gray-100'}`}>
                            <Image
                                src={role.logo}
                                alt={`${role.company} logo`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>

                        {/* Company Name */}
                        <h3 className="font-bold text-xl uppercase tracking-widest text-center leading-none">
                            {role.company}
                        </h3>

                        {/* Year */}
                        {role.year && (
                            <p className={`text-sm uppercase tracking-widest mt-2 ${hoveredIndex === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                                {role.year}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Ambassador;
