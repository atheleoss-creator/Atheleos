"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReelsPage() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [reels, setReels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReels() {
            try {
                const res = await fetch('/api/posts/reels');
                if (res.ok) {
                    const data = await res.json();
                    setReels(data.reels || []);
                }
            } catch (error) {
                console.error('Failed to fetch reels', error);
            } finally {
                setLoading(false);
            }
        }
        fetchReels();
    }, []);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollPosition = containerRef.current.scrollTop;
        const height = containerRef.current.clientHeight;
        const index = Math.round(scrollPosition / height);
        setActiveIndex(index);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    if (loading) {
        return (
            <div className="bg-black text-white w-full h-[calc(100vh-60px)] md:h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (reels.length === 0) {
        return (
            <div className="bg-bg-body text-white w-full h-[calc(100vh-60px)] md:h-screen flex items-center justify-center">
                <div className="text-center animate-fade-in px-6">
                    <div className="w-24 h-24 rounded-full bg-bg-surface border border-border-color flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-text-tertiary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">No Reels Yet</h2>
                    <p className="text-text-secondary text-sm mb-6 max-w-xs mx-auto">Upload a video post to see it here as a reel!</p>
                    <button onClick={() => router.push('/create-post')} className="bg-accent-gradient text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all active:scale-95">
                        Upload Video
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white w-full h-[calc(100vh-60px)] md:h-screen overflow-hidden flex justify-center">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full max-w-[500px] h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide relative bg-bg-body"
                style={{ scrollBehavior: 'smooth' }}
            >
                {reels.map((reel: any, index: number) => (
                    <ReelItem key={reel.id} data={reel} isActive={index === activeIndex} formatNumber={formatNumber} />
                ))}
            </div>
        </div>
    );
}

function ReelItem({ data, isActive, formatNumber }: { data: any; isActive: boolean; formatNumber: (n: number) => string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isLiked, setIsLiked] = useState(data.isLiked);
    const [isSaved, setIsSaved] = useState(data.isSaved);
    const displayLikes = isLiked ? (data.likes + (data.isLiked ? 0 : 1)) : data.likes;

    useEffect(() => {
        if (!videoRef.current) return;
        if (isActive) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            videoRef.current.currentTime = 0;
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
        else { videoRef.current.play(); setIsPlaying(true); }
    };

    const toggleLike = async () => {
        setIsLiked(!isLiked);
        try {
            await fetch(`/api/posts/${data.id}/like`, { method: 'POST' });
        } catch { setIsLiked(isLiked); }
    };

    const toggleSave = async () => {
        setIsSaved(!isSaved);
        try {
            await fetch(`/api/posts/${data.id}/save`, { method: 'POST' });
        } catch { setIsSaved(isSaved); }
    };

    const avatarUrl = data.avatar_url || `https://ui-avatars.com/api/?name=${data.username}&background=random`;

    return (
        <div className="relative w-full h-[calc(100vh-60px)] md:h-screen snap-start bg-black flex items-center justify-center overflow-hidden font-sans">
            <video ref={videoRef} src={data.media_url} className="absolute inset-0 w-full h-full object-cover" loop muted={isMuted} playsInline onClick={togglePlay} />

            {/* Sound toggle */}
            <div className="absolute top-4 right-4 z-20">
                <button onClick={() => setIsMuted(!isMuted)} className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/80 transition-colors">
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>
                    )}
                </button>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-20 flex flex-col gap-3 z-10">
                <div className="flex items-center gap-3">
                    <div onClick={() => router.push(`/profile/${data.username}`)} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 cursor-pointer shrink-0 bg-gray-800 shadow-lg">
                        <Image src={avatarUrl} alt={data.username} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                    </div>
                    <span onClick={() => router.push(`/profile/${data.username}`)} className="text-white font-bold text-[16px] cursor-pointer drop-shadow-lg hover:underline">
                        @{data.username}
                    </span>
                </div>
                {data.caption && (
                    <p className="text-gray-200 text-[14px] leading-snug drop-shadow-md pr-4 font-medium line-clamp-3">{data.caption}</p>
                )}
            </div>

            {/* Action sidebar */}
            <div className="absolute bottom-6 right-2 flex flex-col items-center gap-6 z-10 w-[60px]">
                <button onClick={toggleLike} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                    <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke={isLiked ? "none" : "white"} strokeWidth="2" className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-white'}`}>
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    </div>
                    <span className="text-white text-[13px] font-bold drop-shadow-lg">{formatNumber(displayLikes)}</span>
                </button>

                <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                    <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                    </div>
                    <span className="text-white text-[13px] font-bold drop-shadow-lg">{formatNumber(data.comments)}</span>
                </button>

                <button onClick={toggleSave} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                    <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke={isSaved ? "none" : "white"} className={`w-6 h-6 ${isSaved ? 'text-[#FACC15]' : 'text-white'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}
