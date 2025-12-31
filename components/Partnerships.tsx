'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface PartnershipPost {
    type: string;
    description: string;
    impressions: number;
    likes: number;
    url: string;
    campaign?: string;
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
    const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
    const containerRef = useScrollReveal<HTMLDivElement>({ staggerDelay: 100 });
    const modalRef = useRef<HTMLDivElement>(null);

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
            if (post.campaign !== undefined) {
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

    const closeModal = () => {
        setSelectedPartnership(null);
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        if (selectedPartnership) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [selectedPartnership]);

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
                    const isHovered = hoveredIndex === idx;

                    return (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`
                                w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]
                                group relative border-2 border-white p-6 transition-all duration-300 cursor-pointer flex flex-col
                                ${isHovered ? 'bg-white text-black' : 'bg-black text-white'}
                                ${hoveredIndex !== null && !isHovered ? 'opacity-50' : 'opacity-100'}
                                hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]
                            `}
                            onClick={() => setSelectedPartnership(partnership)}
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

                            {/* Summary Stats */}
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
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedPartnership && (() => {
                const { totalImpressions, totalLikes, postCount } = getTotalStats(selectedPartnership.posts);
                const { grouped, ungrouped } = groupPostsByCampaign(selectedPartnership.posts);

                return (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <div
                            ref={modalRef}
                            className="relative bg-black border-2 border-white w-full max-w-2xl max-h-[85vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-800">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden rounded-lg bg-white">
                                        <Image
                                            src={selectedPartnership.logo}
                                            alt={`${selectedPartnership.company} logo`}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                                            {selectedPartnership.company}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {postCount} {postCount === 1 ? 'Post' : 'Posts'}
                                        </p>
                                    </div>
                                </div>

                                {/* Total Stats */}
                                <div className="flex gap-6 mt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>{formatImpressions(totalImpressions)} impressions</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        <span>+{formatImpressions(totalLikes)} likes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-6">
                                {/* Ungrouped Posts */}
                                {ungrouped.length > 0 && (
                                    <div className="space-y-3">
                                        {ungrouped.map((post, postIdx) => (
                                            <a
                                                key={`ungrouped-${postIdx}`}
                                                href={post.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-4 border border-gray-700 hover:border-gray-500 rounded transition-colors"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-bold uppercase tracking-wide text-white">
                                                        {post.type}
                                                    </span>
                                                    <span className="text-xs text-gray-400">↗</span>
                                                </div>
                                                <p className="text-sm text-gray-300 mb-3">
                                                    {post.description}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        <span>{formatImpressions(post.impressions)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                        </svg>
                                                        <span>+{formatImpressions(post.likes)}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {/* Grouped Posts by Campaign */}
                                {Object.entries(grouped).map(([campaignName, campaignPosts]) => (
                                    campaignName ? (
                                        <div key={campaignName} className="border border-gray-700 rounded p-4">
                                            <h4 className="text-sm font-bold uppercase tracking-wide text-white mb-1">
                                                {campaignName}
                                            </h4>
                                            <p className="text-xs text-gray-400 mb-4">
                                                {campaignPosts[0].description}
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {campaignPosts.map((post, postIdx) => (
                                                    <a
                                                        key={`grouped-${postIdx}`}
                                                        href={post.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block p-3 border border-gray-600 hover:border-gray-400 rounded transition-colors"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold uppercase tracking-wide text-white">
                                                                {post.type}
                                                            </span>
                                                            <span className="text-xs text-gray-400">↗</span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                <span>{formatImpressions(post.impressions)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
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
                                    ) : (
                                        <div key="no-campaign" className="grid grid-cols-3 gap-3">
                                            {campaignPosts.map((post, postIdx) => (
                                                <a
                                                    key={`no-campaign-${postIdx}`}
                                                    href={post.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-3 border border-gray-600 hover:border-gray-400 rounded transition-colors"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-bold uppercase tracking-wide text-white">
                                                            {post.type}
                                                        </span>
                                                        <span className="text-xs text-gray-400">↗</span>
                                                    </div>
                                                    <p className="text-[10px] text-gray-300 mb-2 line-clamp-2">
                                                        {post.description}
                                                    </p>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            <span>{formatImpressions(post.impressions)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                            </svg>
                                                            <span>+{formatImpressions(post.likes)}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })()}
        </section>
    );
};

export default Partnerships;
