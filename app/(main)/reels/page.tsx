"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";

// Mock Data for Sports Reels
const MOCK_REELS = [
    {
        id: "r1",
        author: {
            username: "atheleos_official",
            avatar: "https://images.unsplash.com/photo-1518605368461-1bd49cece51f?w=100&h=100&fit=crop",
            isFollowing: false
        },
        videoUrl: "https://cdn.pixabay.com/video/2019/04/10/22616-329437149_large.mp4",
        caption: "Buzzer beater from last night's championship game! 🏀🔥 #basketball #clutch #finals",
        cheers: 12400,
        comments: 482,
        shares: 1205,
        matchData: {
            isLive: true,
            eventTag: "🏆 NBL Championship - Game 7",
            sportCategory: "Basketball",
            score: "LAL 102 - BOS 99",
            performanceStats: "32 PTS | 10 REB | 8 AST"
        }
    },
    {
        id: "r2",
        author: {
            username: "fc_elite",
            avatar: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop",
            isFollowing: true
        },
        videoUrl: "https://cdn.pixabay.com/video/2021/08/17/85375-589999052_large.mp4",
        caption: "Incredible free kick curvature. Practice makes perfect. ⚽️🎯 #football #skills #fcelite",
        cheers: 8900,
        comments: 215,
        shares: 840,
        matchData: {
            isLive: false,
            eventTag: "⚽️ Premier League Matchday 12",
            sportCategory: "Soccer",
            score: "MCI 2 - MUN 1",
            performanceStats: "1 Goal | 2 Assists | 94% Pass Acc"
        }
    },
    {
        id: "r3",
        author: {
            username: "shikhar_cricket",
            avatar: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=100&h=100&fit=crop",
            isFollowing: false
        },
        videoUrl: "https://cdn.pixabay.com/video/2023/10/26/186588-878566276_large.mp4",
        caption: "Straight drive down the ground! Nothing feels better 🏏✨ #cricket #batting #training",
        cheers: 4500,
        comments: 112,
        shares: 320,
        matchData: {
            isLive: true,
            eventTag: "🏏 World Cup Semi-Final",
            sportCategory: "Cricket",
            score: "IND 280/4 - AUS 142/6",
            performanceStats: "85* Runs | 10 Fours | 2 Sixes"
        }
    }
];

// Single Sport Reel Component
const Reel = ({ data, isActive }: { data: typeof MOCK_REELS[0], isActive: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    // Interaction States
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isCheered, setIsCheered] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isFollowing, setIsFollowing] = useState(data.author.isFollowing);

    const displayCheers = isCheered ? data.cheers + 1 : data.cheers;

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
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const renderCaption = (text: string) => {
        return text.split(/(#[a-zA-Z0-9_]+)/g).map((part, index) => {
            if (part.startsWith('#')) {
                return <span key={index} className="text-accent-primary font-bold cursor-pointer hover:underline">{part}</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="relative w-full h-[calc(100vh-60px)] md:h-screen snap-start bg-black flex items-center justify-center overflow-hidden font-sans">

            {/* Video Canvas */}
            <video
                ref={videoRef}
                src={data.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={togglePlay}
            />

            {/* Top HUD: Stadium Scoreboard Layer */}
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-4 pt-12 md:pt-6 pb-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent">

                <div className="w-full flex justify-between items-start pointer-events-auto">
                    {/* Event Tag */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            {data.matchData.isLive && (
                                <div className="bg-red-600 flex items-center gap-1.5 px-2 py-0.5 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.8)] border border-red-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-white">Live</span>
                                </div>
                            )}
                            <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-sm border-l-2 border-accent-primary">
                                <span className="text-[11px] text-white font-bold tracking-widest uppercase opacity-90">{data.matchData.sportCategory}</span>
                            </div>
                        </div>

                        {/* Broadcast Match Title */}
                        <div className="font-black text-white text-[15px] uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-[250px] leading-tight slanted-text">
                            {data.matchData.eventTag}
                        </div>
                    </div>

                    {/* Scoreboard Block */}
                    <div className="flex flex-col items-end">
                        <div className="bg-black/80 backdrop-blur-md border-t-2 border-b-2 border-white/20 p-2 shadow-[0_4px_15px_rgba(0,0,0,0.5)] transform -skew-x-6 mr-2">
                            <div className="transform hover:skew-x-6 text-white font-black text-lg tracking-widest">
                                {data.matchData.score}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sound Toggle */}
                <div className="absolute top-12 left-4 md:top-6 pointer-events-auto mt-[80px]">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-transform active:scale-95 border border-white/20 hover:bg-black/80"
                    >
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Bottom Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

            {/* Lower Thirds - Content Container (Bottom Left) */}
            <div className="absolute bottom-4 left-4 right-20 flex flex-col gap-3 z-10">

                {/* Performance Stats Hud */}
                <div className="flex">
                    <div className="bg-accent-primary text-black font-black text-[12px] uppercase px-3 py-1 -skew-x-12 inline-block">
                        <span className="block skew-x-12 tracking-widest">{data.matchData.performanceStats}</span>
                    </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-1">
                    <div
                        onClick={() => router.push(`/profile/${data.author.username}`)}
                        className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 cursor-pointer shrink-0 bg-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        <Image src={data.author.avatar} alt={data.author.username} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <span
                                onClick={() => router.push(`/profile/${data.author.username}`)}
                                className="text-white font-bold text-[16px] cursor-pointer drop-shadow-lg hover:underline"
                            >
                                @{data.author.username}
                            </span>
                            {!isFollowing && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsFollowing(true); }}
                                    className="px-3 py-0.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white text-[11px] font-bold rounded-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                        {/* Audio Track Visualizer */}
                        <div className="flex items-center gap-1.5 opacity-80">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-accent-primary animate-pulse">
                                <path fillRule="evenodd" d="M19.362 3.159c.348-.153.744-.108 1.05.122A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-2.25 1.306l-6.072-3.805a.75.75 0 0 0-.796 0l-6.072 3.805A1.5 1.5 0 0 1 3.75 19.5v-15a1.5 1.5 0 0 1 .588-1.219 1.5 1.5 0 0 1 1.662-.122l6.072 3.805a.75.75 0 0 0 .796 0l6.072-3.805Z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white text-[11px] font-medium tracking-wide">Original Audio</span>
                        </div>
                    </div>
                </div>

                {/* Caption Row */}
                <div className="text-gray-200 text-[14px] leading-snug drop-shadow-md pr-4 font-medium mb-2">
                    {renderCaption(data.caption)}
                </div>
            </div>

            {/* Interaction Action Sidebar (Bottom Right) */}
            <div className="absolute bottom-6 right-2 flex flex-col items-center gap-6 z-10 w-[60px]">

                {/* Cheer (Like) Button -> Sports Megaphone/Flame */}
                <button
                    onClick={() => setIsCheered(!isCheered)}
                    className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
                >
                    <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg">
                        {/* Fire / Cheer SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isCheered ? "currentColor" : "none"} stroke={isCheered ? "none" : "white"} strokeWidth="2" className={`w-6 h-6 ${isCheered ? 'text-[#FF4500] drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]' : 'text-white drop-shadow-md'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                        </svg>
                    </div>
                    <span className="text-white text-[13px] font-bold drop-shadow-lg tracking-wide">
                        {formatNumber(displayCheers)}
                    </span>
                </button>

                {/* Comment Button */}
                <button className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
                    <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6 drop-shadow-md">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                    </div>
                    <span className="text-white text-[13px] font-bold drop-shadow-lg tracking-wide">
                        {formatNumber(data.comments)}
                    </span>
                </button>

                {/* Save Highlight Button */}
                <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
                >
                    <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke={isSaved ? "none" : "white"} className={`w-6 h-6 ${isSaved ? 'text-[#FACC15]' : 'text-white'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                </button>

                {/* Share Button */}
                <button className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
                    <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6 -ml-0.5 drop-shadow-md">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </div>
                </button>

            </div>
        </div>
    );
};

export default function ReelsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollPosition = containerRef.current.scrollTop;
        const height = containerRef.current.clientHeight;
        const index = Math.round(scrollPosition / height);
        setActiveIndex(index);
    };

    return (
        <div className="bg-black text-white w-full h-[calc(100vh-60px)] md:h-screen overflow-hidden flex justify-center">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full max-w-[500px] h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide relative bg-bg-body"
                style={{ scrollBehavior: 'smooth' }}
            >
                {MOCK_REELS.map((reel, index) => (
                    <Reel key={reel.id} data={reel} isActive={index === activeIndex} />
                ))}
            </div>
        </div>
    );
}
