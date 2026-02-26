"use client";

import React, { useState } from "react";
import { SearchIcon, ArrowLeftIcon, ReelsIcon } from "@/components/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock Data for Explore Layout
const CATEGORIES = ["For You", "Trending", "Football", "Cricket", "Basketball", "Tennis", "Athletics", "Gymnastics"];

const TRENDING_HIGHLIGHTS = [
    { id: 1, title: "El Clásico Highlights", subtitle: "Real Madrid vs Barcelona", time: "2h ago", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=250&fit=crop" },
    { id: 2, title: "Record Breaking Sprint", subtitle: "World Athletics Team", time: "5h ago", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=250&fit=crop" },
    { id: 3, title: "Championship Finals", subtitle: "Lakers vs Warriors", time: "1d ago", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop" },
    { id: 4, title: "Grand Slam Upset", subtitle: "Wimbledon 2024", time: "Live", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=250&fit=crop" },
];

const VALID_IMAGES = [
    "https://images.unsplash.com/photo-1518605368461-1bd49cece51f",
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
];

const SEARCH_TABS = ["Top", "Accounts", "Tags", "Places", "Teams"];

const EXPLORE_POSTS = Array.from({ length: 30 }).map((_, i) => {
    // Determine dynamic grid spans to create a masonry-like feel
    let colSpan = "col-span-1";
    let rowSpan = "row-span-1";
    let type = "image";

    if (i % 7 === 0) {
        rowSpan = "row-span-2";
        colSpan = "col-span-1";
        type = "video";
    } else if (i % 11 === 0) {
        rowSpan = "row-span-2";
        colSpan = "col-span-2";
        type = "video";
    } else if (i % 5 === 0) {
        type = "video";
    }

    const baseImage = VALID_IMAGES[i % VALID_IMAGES.length];
    const imageQuery = `?w=600&h=${rowSpan.includes('2') ? '800' : '400'}&fit=crop&q=80`;

    return {
        id: i,
        type,
        spanClasses: `${colSpan} ${rowSpan}`,
        imageUrl: `${baseImage}${imageQuery}`,
        views: `${(Math.random() * 5 + 0.1).toFixed(1)}M`,
    };
});

export default function ExplorePage() {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("For You");
    const [activeSearchTab, setActiveSearchTab] = useState("Top");

    const handleSearchCheck = () => {
        setIsSearching(true);
    };

    const handleCancelSearch = () => {
        setIsSearching(false);
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen bg-bg-body pb-20 overflow-x-hidden">
            {/* Search Bar - Fixed Top */}
            <div className="sticky top-0 bg-bg-body z-20 px-4 py-3 border-b border-border-color/50">
                <div className={`relative flex items-center transition-all ${isSearching ? "gap-3" : ""}`}>
                    {isSearching && (
                        <button onClick={handleCancelSearch} className="text-text-primary hover:bg-white/10 p-1.5 rounded-full transition-colors">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                    )}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-text-secondary" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Atheleos"
                            className="w-full bg-bg-surface text-white text-[15px] placeholder-text-secondary rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-1 focus:ring-accent-primary transition-all"
                            value={searchQuery}
                            onFocus={handleSearchCheck}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Search State Tabs (Only visible when searching) */}
                {isSearching && (
                    <div className="flex gap-6 mt-4 overflow-x-auto no-scrollbar border-b border-border-color/30">
                        {SEARCH_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSearchTab(tab)}
                                className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${activeSearchTab === tab ? "text-text-primary" : "text-text-secondary"
                                    }`}
                            >
                                {tab}
                                {activeSearchTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary rounded-t-md" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Area */}
            {isSearching ? (
                /* ACTIVE SEARCH UI */
                <div className="px-4 py-4">
                    {searchQuery.length === 0 ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-[16px]">Recent</span>
                                <span onClick={() => setIsSearching(false)} className="text-accent-primary text-[14px] font-semibold cursor-pointer hover:text-white transition-colors">Clear all</span>
                            </div>
                            <div className="flex flex-col gap-5">
                                {/* Mock Recent Searches */}
                                {[
                                    { name: "cristiano", sub: "Cristiano Ronaldo", img: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=100&h=100&fit=crop" },
                                    { name: "premierleague", sub: "Premier League", img: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=100&h=100&fit=crop" },
                                    { name: "#dunk", sub: "2.4M posts", isHashtag: true }
                                ].map((item, idx) => (
                                    <div key={idx} onClick={() => router.push('/profile/athlete')} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            {item.isHashtag ? (
                                                <div className="w-14 h-14 rounded-full border border-border-color flex items-center justify-center text-text-primary text-xl font-light">
                                                    #
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 rounded-full border-2 border-transparent bg-gradient-to-tr from-accent-primary to-purple-500 p-[2px]">
                                                    <div className="w-full h-full rounded-full overflow-hidden bg-bg-surface">
                                                        <Image src={item.img!} alt={item.name} width={56} height={56} className="object-cover w-full h-full" unoptimized />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-[15px] font-semibold text-text-primary group-hover:text-white transition-colors">{item.name}</span>
                                                <span className="text-[13px] text-text-secondary">{item.sub}</span>
                                            </div>
                                        </div>
                                        <button className="text-text-secondary hover:text-white p-2">✕</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10 text-text-secondary">
                            <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-semibold text-text-primary mb-1">Searching for "{searchQuery}"</p>
                            <p className="text-sm">Explore top accounts, tags, and posts.</p>
                        </div>
                    )}
                </div>
            ) : (
                /* NORMAL DISCOVERY FEED UI */
                <div>
                    {/* Category Filters */}
                    <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-border-color/30">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-lg text-[14px] font-semibold whitespace-nowrap transition-all ${activeCategory === cat
                                    ? "bg-text-primary text-bg-body shadow-sm"
                                    : "bg-bg-surface text-text-primary hover:bg-white/10 border border-border-color"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Trending Highlights / Match Updates Carousel */}
                    <div className="mt-4 mb-2">
                        <div className="px-4 mb-3 flex items-center justify-between">
                            <h2 className="text-[16px] font-bold text-text-primary flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                Trending Highlights
                            </h2>
                            <span onClick={() => router.push('/events')} className="text-text-secondary text-[13px] font-semibold cursor-pointer hover:text-white">See all</span>
                        </div>

                        <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar snap-x">
                            {TRENDING_HIGHLIGHTS.map(highlight => (
                                <div key={highlight.id} onClick={() => router.push('/events')} className="min-w-[240px] md:min-w-[280px] bg-bg-surface rounded-xl overflow-hidden snap-center relative group cursor-pointer border border-border-color/50 shadow-sm">
                                    <div className="h-[140px] w-full relative">
                                        <Image
                                            src={highlight.image}
                                            alt={highlight.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                            {highlight.time}
                                        </div>
                                    </div>
                                    <div className="p-3 absolute bottom-0 left-0 right-0">
                                        <h3 className="font-bold text-[14px] text-white line-clamp-1">{highlight.title}</h3>
                                        <p className="text-gray-300 text-[12px] line-clamp-1 mt-0.5">{highlight.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Masonry-like Grid Feed */}
                    <div className="grid grid-cols-3 gap-[1px] md:gap-1">
                        {EXPLORE_POSTS.map((post) => (
                            <div
                                key={post.id}
                                onClick={() => router.push('/profile/athlete')}
                                className={`relative bg-bg-surface overflow-hidden group cursor-pointer ${post.spanClasses}`}
                                style={{ aspectRatio: post.spanClasses.includes('row-span-2') ? 'auto' : '1/1' }}
                            >
                                <Image
                                    src={post.imageUrl}
                                    alt="Explore Post"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    unoptimized
                                    sizes="(max-width: 768px) 33vw, 33vw"
                                />
                                {post.type === "video" && (
                                    <div className="absolute top-2 right-2">
                                        <ReelsIcon className="w-5 h-5 md:w-6 md:h-6 fill-white text-white drop-shadow-lg" />
                                    </div>
                                )}
                                {/* Overlay Stats on Hover (Desktop) or Persistent (Mobile Video) */}
                                <div className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 ${post.type === 'video' ? 'md:opacity-0 max-md:bg-gradient-to-t max-md:from-black/60 max-md:to-transparent max-md:opacity-100' : ''}`}>
                                    {post.type === "video" && (
                                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white text-[11px] md:text-sm drop-shadow-md font-semibold">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 5.99a.75.75 0 00-1.19-.61l-4.5 3.375a.75.75 0 00-.25.59v5.304a.75.75 0 00.25.59l4.5 3.375a.75.75 0 001.19-.61V5.99z" />
                                            </svg>
                                            {post.views}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
