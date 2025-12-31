'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface PartnershipPost {
    type: string;
    description: string;
    impressions: number;
    likes: number;
    url: string;
    campaign?: string; // Optional campaign name for grouping
}

export interface Partnership {
    company: string;
    logo: string;
    posts: PartnershipPost[];
}

interface PartnershipsProps {
    partnerships: Partnership[];
}

const Partnerships: React.FC<PartnershipsProps> = ({ partnerships }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const formatImpressions = (num: number) => {
        return num.toLocaleString();
    };

    const getTotalStats = (posts: PartnershipPost[]) => {
        return {
            totalImpressions: posts.reduce((sum, post) => sum + post.impressions, 0),
            totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
            postCount: posts.length
        };
    };

    const groupPostsByCampaign = (posts: PartnershipPost[]) => {
        const grouped: { [key: string]: PartnershipPost[] } = {};
        const ungrouped: PartnershipPost[] = [];

        posts.forEach(post => {
            if (post.campaign) {
                if (!grouped[post.campaign]) {
                    grouped[post.campaign] = [];
                }
                grouped[post.campaign].push(post);
            } else {
                ungrouped.push(post);
            }
        });

        return { grouped, ungrouped };
    };

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
        <section className="w-full bg-black text-white py-16 md:py-24 px-4 md:px-8">
            <div className="mb-12 flex justify-center">
                <div className="border-2 border-white rounded-[50%] px-10 py-3 font-bold text-xl md:text-2xl uppercase tracking-tighter">
                    Partnerships
                </div>
            </div>

            <div ref={containerRef} className="flex flex-wrap gap-4">
                {partnerships.map((partnership, idx) => {
                    const { totalImpressions, totalLikes, postCount } = getTotalStats(partnership.posts);
                    const isExpanded = expandedIndex === idx;
                    const isHovered = hoveredIndex === idx;

                    return (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`
                                w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]
                                group relative border-2 border-white p-6 transition-all duration-300 cursor-pointer flex flex-col opacity-0
                                ${isHovered ? 'bg-white text-black' : 'bg-black text-white'}
                                ${hoveredIndex !== null && !isHovered ? 'opacity-50' : 'opacity-100'}
                                hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]
                            `}
                            onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                        >
                            {/* Logo */}
                            <div className={`relative w-16 h-16 mb-4 flex items-center justify-center overflow-hidden rounded-lg ${isHovered ? 'bg-gray-100' : 'bg-white'}`}>
                                <Image
                                    src={partnership.logo}
                                    alt={`${partnership.company} logo`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </div>

                            {/* Company Name */}
                            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                {partnership.company}
                            </p>

                            {/* Post Count Badge */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-bold uppercase tracking-wide ${isHovered ? 'text-black' : 'text-white'}`}>
                                    {postCount} {postCount === 1 ? 'Post' : 'Posts'}
                                </span>
                            </div>

                            {/* Total Stats */}
                            {!isExpanded && (
                                <>
                                    <p className={`text-sm mb-4 flex-1 ${isHovered ? 'text-gray-600' : 'text-gray-300'}`}>
                                        Click to view all campaigns and posts
                                    </p>

                                    {/* Total Impressions */}
                                    <div className={`flex items-center gap-2 text-xs ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>{formatImpressions(totalImpressions)} Total Impressions</span>
                                    </div>

                                    {/* Total Likes */}
                                    <div className={`flex items-center gap-2 text-xs mt-1 ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        <span>+{formatImpressions(totalLikes)} Total Likes</span>
                                    </div>
                                </>
                            )}

                            {/* Expanded Post List */}
                            {isExpanded && (() => {
                                const { grouped, ungrouped } = groupPostsByCampaign(partnership.posts);

                                return (
                                    <div className="space-y-4 flex-1">
                                        {/* Ungrouped Posts */}
                                        {ungrouped.map((post, postIdx) => (
                                            <a
                                                key={`ungrouped-${postIdx}`}
                                                href={post.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className={`block p-4 border ${isHovered ? 'border-gray-300 hover:border-gray-500' : 'border-gray-700 hover:border-gray-500'} rounded transition-colors`}
                                            >
                                                {/* Type */}
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`text-xs font-bold uppercase tracking-wide ${isHovered ? 'text-black' : 'text-white'}`}>
                                                        {post.type}
                                                    </span>
                                                    <span className="text-xs">↗</span>
                                                </div>

                                                {/* Description */}
                                                <p className={`text-xs mb-3 ${isHovered ? 'text-gray-600' : 'text-gray-300'}`}>
                                                    {post.description}
                                                </p>

                                                {/* Stats */}
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex items-center gap-1 text-xs ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        <span>{formatImpressions(post.impressions)}</span>
                                                    </div>
                                                    <div className={`flex items-center gap-1 text-xs ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                        </svg>
                                                        <span>+{formatImpressions(post.likes)}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}

                                        {/* Grouped Posts by Campaign */}
                                        {Object.entries(grouped).map(([campaignName, campaignPosts]) => (
                                            <div key={campaignName} className={`${campaignName ? `border ${isHovered ? 'border-gray-300' : 'border-gray-700'} rounded p-4` : ''}`}>
                                                {/* Show title and description only if campaign has a name */}
                                                {campaignName && (
                                                    <>
                                                        <h4 className={`text-sm font-bold uppercase tracking-wide ${isHovered ? 'text-black' : 'text-white'}`}>
                                                            {campaignName}
                                                        </h4>
                                                        {/* Campaign Description (from first post) */}
                                                        <p className={`text-xs mb-3 ${isHovered ? 'text-gray-600' : 'text-gray-300'}`}>
                                                            {campaignPosts[0].description}
                                                        </p>
                                                    </>
                                                )}
                                                <div className="grid grid-cols-3 gap-2">
                                                    {campaignPosts.map((post, postIdx) => (
                                                        <a
                                                            key={`grouped-${postIdx}`}
                                                            href={post.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className={`block p-3 border ${isHovered ? 'border-gray-200 hover:border-gray-400' : 'border-gray-600 hover:border-gray-400'} rounded transition-colors`}
                                                        >
                                                            {/* Type */}
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className={`text-xs font-bold uppercase tracking-wide ${isHovered ? 'text-black' : 'text-white'}`}>
                                                                    {post.type}
                                                                </span>
                                                                <span className="text-xs">↗</span>
                                                            </div>

                                                            {/* Description - only show if no campaign name */}
                                                            {!campaignName && (
                                                                <p className={`text-[10px] mb-2 ${isHovered ? 'text-gray-600' : 'text-gray-300'} line-clamp-2`}>
                                                                    {post.description}
                                                                </p>
                                                            )}

                                                            {/* Stats */}
                                                            <div className="space-y-1">
                                                                <div className={`flex items-center gap-1 text-[10px] ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                    <span>{formatImpressions(post.impressions)}</span>
                                                                </div>
                                                                <div className={`flex items-center gap-1 text-[10px] ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                                    </svg>
                                                                    <span>+{formatImpressions(post.likes)}</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}

                            {/* Expand/Collapse indicator */}
                            <div className={`mt-4 text-center text-xs ${isHovered ? 'text-gray-500' : 'text-gray-400'}`}>
                                {isExpanded ? '▲ Click to collapse' : '▼ Click to expand'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Partnerships;
