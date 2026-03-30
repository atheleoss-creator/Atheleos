"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { SearchIcon, ArrowLeftIcon, ReelsIcon } from "@/components/Icons";
import Badge from "@/components/Badge";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SEARCH_TABS = ["Top", "Accounts", "Posts"];

const SPORT_FILTERS = [
    { label: "All", icon: "🔥" },
    { label: "Football", icon: "⚽" },
    { label: "Basketball", icon: "🏀" },
    { label: "Cricket", icon: "🏏" },
    { label: "Tennis", icon: "🎾" },
    { label: "Running", icon: "🏃" },
    { label: "Swimming", icon: "🏊" },
    { label: "Boxing", icon: "🥊" },
    { label: "MMA", icon: "🥋" },
    { label: "Gym", icon: "🏋️" },
];

export default function ExplorePage() {
    const router = useRouter();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearchTab, setActiveSearchTab] = useState("Top");
    const [searchResults, setSearchResults] = useState<{ users: any[]; posts: any[] }>({ users: [], posts: [] });
    const [searchLoading, setSearchLoading] = useState(false);
    const [explorePosts, setExplorePosts] = useState<any[]>([]);
    const [gridLoading, setGridLoading] = useState(true);
    const [activeSportFilter, setActiveSportFilter] = useState("All");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);

    // Load recent searches from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("atheleos_recent_searches");
            if (saved) setRecentSearches(JSON.parse(saved));
        } catch { /* silent */ }
    }, []);

    // Save search to recent
    const saveRecentSearch = (term: string) => {
        const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 8);
        setRecentSearches(updated);
        try { localStorage.setItem("atheleos_recent_searches", JSON.stringify(updated)); } catch { }
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        try { localStorage.removeItem("atheleos_recent_searches"); } catch { }
    };

    // Fetch explore posts
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts');
                if (res.ok) {
                    const data = await res.json();
                    setExplorePosts(data.posts || []);
                    // Extract some users for suggestions
                    const uniqueUsers = new Map();
                    (data.posts || []).forEach((p: any) => {
                        if (!uniqueUsers.has(p.username)) {
                            uniqueUsers.set(p.username, {
                                username: p.username,
                                avatar_url: p.avatarUrl,
                                full_name: p.fullName,
                                is_verified: p.is_verified,
                                verification_level: p.verification_level,
                                sport: p.sport,
                            });
                        }
                    });
                    setSuggestedUsers(Array.from(uniqueUsers.values()).slice(0, 10));
                }
            } catch { /* silent */ } finally {
                setGridLoading(false);
            }
        }
        fetchPosts();
    }, []);

    // Debounced search
    useEffect(() => {
        if (!searchQuery.trim()) { setSearchResults({ users: [], posts: [] }); return; }
        const timer = setTimeout(async () => {
            setSearchLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                if (res.ok) {
                    const data = await res.json();
                    setSearchResults(data);
                }
            } catch { /* silent */ } finally {
                setSearchLoading(false);
            }
        }, 350);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            saveRecentSearch(searchQuery.trim());
        }
    };

    // Masonry pattern: [1=normal, 2=tall, 3=wide]
    const getGridPattern = (index: number) => {
        const patterns = [1, 1, 2, 1, 3, 1, 1, 1, 2, 1, 1, 3];
        return patterns[index % patterns.length];
    };

    // Filter results by tab
    const filteredUsers = activeSearchTab === "Posts" ? [] : searchResults.users;
    const filteredPosts = activeSearchTab === "Accounts" ? [] : searchResults.posts;

    return (
        <div className="min-h-screen bg-bg-body pb-24 overflow-x-hidden">
            {/* Search Bar */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-xl z-20 border-b border-white/[0.06]">
                <div className="px-4 py-3">
                    <div className={`relative flex items-center transition-all duration-300 ${isSearching ? "gap-3" : ""}`}>
                        {isSearching && (
                            <button
                                onClick={() => { setIsSearching(false); setSearchQuery(""); }}
                                className="text-white hover:bg-white/10 p-1.5 rounded-xl transition-colors shrink-0"
                            >
                                <ArrowLeftIcon className="w-6 h-6" />
                            </button>
                        )}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-text-tertiary" />
                            </div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search athletes, teams, content..."
                                className="w-full bg-white/[0.06] text-white text-[15px] placeholder-text-tertiary rounded-2xl py-3 pl-11 pr-10 outline-none focus:ring-1 focus:ring-accent-primary/50 focus:bg-white/[0.08] transition-all border border-white/[0.06]"
                                value={searchQuery}
                                onFocus={() => setIsSearching(true)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(); }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-text-tertiary hover:text-white hover:bg-white/20 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Search Tabs — only when searching with query */}
                {isSearching && searchQuery.trim() && (
                    <div className="flex px-4 gap-1 overflow-x-auto no-scrollbar pb-0">
                        {SEARCH_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSearchTab(tab)}
                                className={`px-4 py-2.5 text-[13px] font-bold whitespace-nowrap transition-all relative ${
                                    activeSearchTab === tab
                                        ? "text-white"
                                        : "text-text-tertiary hover:text-text-secondary"
                                }`}
                            >
                                {tab}
                                {activeSearchTab === tab && (
                                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Sport Filter Chips — only on explore grid */}
                {!isSearching && (
                    <div className="flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar">
                        {SPORT_FILTERS.map((filter) => (
                            <button
                                key={filter.label}
                                onClick={() => setActiveSportFilter(filter.label)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all shrink-0 ${
                                    activeSportFilter === filter.label
                                        ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                        : "bg-white/[0.06] text-text-secondary border border-white/[0.06] hover:bg-white/[0.1] hover:text-white"
                                }`}
                            >
                                <span className="text-sm">{filter.icon}</span>
                                {filter.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ─── SEARCH MODE ─── */}
            {isSearching ? (
                <div className="px-4 py-4 animate-fade-in">
                    {searchQuery.length === 0 ? (
                        <div className="flex flex-col gap-6">
                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-[13px] font-bold text-white">Recent</h3>
                                        <button onClick={clearRecentSearches} className="text-[12px] font-bold text-accent-primary hover:text-white transition-colors">
                                            Clear All
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        {recentSearches.map((term, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSearchQuery(term)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors text-left group"
                                            >
                                                <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-text-tertiary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                                <span className="text-[14px] text-white font-medium flex-1">{term}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggested Accounts */}
                            {suggestedUsers.length > 0 && (
                                <div>
                                    <h3 className="text-[13px] font-bold text-white mb-3">Suggested</h3>
                                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                        {suggestedUsers.map((u: any, idx: number) => (
                                            <Link
                                                key={idx}
                                                href={`/profile/${u.username}`}
                                                className="flex flex-col items-center gap-2 w-[80px] shrink-0 group"
                                            >
                                                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/[0.08] group-hover:ring-accent-primary/40 transition-all relative bg-bg-surface">
                                                    <Image
                                                        src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}&background=1a1a1a&color=fff`}
                                                        alt={u.username}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div className="text-center min-w-0 w-full">
                                                    <div className="flex items-center justify-center gap-0.5">
                                                        <span className="text-[11px] font-bold text-white truncate">{u.username}</span>
                                                        {u.is_verified && <Badge level={u.verification_level} className="w-3 h-3 shrink-0" />}
                                                    </div>
                                                    {u.sport && <span className="text-[10px] text-text-tertiary block truncate">{u.sport}</span>}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty state when no recent + no suggestions */}
                            {recentSearches.length === 0 && suggestedUsers.length === 0 && (
                                <div className="text-center py-20 text-text-secondary">
                                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-white/[0.06] mx-auto mb-5 flex items-center justify-center">
                                        <SearchIcon className="w-9 h-9 text-accent-primary" />
                                    </div>
                                    <p className="text-lg font-bold text-white mb-1">Search Atheleos</p>
                                    <p className="text-sm text-text-tertiary">Find athletes, teams, and content.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5">
                            {/* Loading skeleton */}
                            {searchLoading && (
                                <div className="flex flex-col gap-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                                            <div className="w-12 h-12 rounded-full skeleton shrink-0" />
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div className="h-3.5 w-28 skeleton rounded-md" />
                                                <div className="h-3 w-20 skeleton rounded-md" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Users Results */}
                            {filteredUsers.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-2 px-1">Accounts</h3>
                                    <div className="flex flex-col gap-0.5">
                                        {filteredUsers.map((u: any) => (
                                            <Link
                                                key={u.id}
                                                href={`/profile/${u.username}`}
                                                onClick={() => saveRecentSearch(u.username)}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                                            >
                                                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 ring-2 ring-white/[0.06] group-hover:ring-accent-primary/30 transition-all">
                                                    <Image src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}&background=1a1a1a&color=fff`} alt={u.username} fill className="object-cover" unoptimized />
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-bold text-white text-[14px] truncate">{u.username}</span>
                                                        {u.is_verified && <Badge level={u.verification_level} className="w-4 h-4 shrink-0" />}
                                                    </div>
                                                    <span className="text-[12px] text-text-tertiary truncate">
                                                        {u.full_name}{u.sport ? ` · ${u.sport}` : ""}{u.position ? ` · ${u.position}` : ""}
                                                    </span>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Posts Results */}
                            {filteredPosts.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-2 px-1">Posts</h3>
                                    <div className="flex flex-col gap-2">
                                        {filteredPosts.map((post: any) => (
                                            <Link
                                                key={post.id}
                                                href={`/post/${post.id}`}
                                                className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all group"
                                            >
                                                <div className="flex items-center gap-2.5 mb-2.5">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 ring-1 ring-white/10">
                                                        <Image
                                                            src={post.avatar_url || `https://ui-avatars.com/api/?name=${post.username}&background=1a1a1a&color=fff`}
                                                            alt={post.username}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <span className="font-bold text-[13px] text-white">{post.username}</span>
                                                    {post.is_verified && <Badge level="blue" className="w-3.5 h-3.5" />}
                                                </div>
                                                <div className="flex gap-3">
                                                    <p className="text-[13px] text-text-secondary line-clamp-2 flex-1 leading-relaxed">{post.caption}</p>
                                                    {post.media_url && (
                                                        <div className="w-14 h-14 rounded-lg overflow-hidden relative shrink-0 bg-bg-surface">
                                                            {post.media_type === 'video' ? (
                                                                <video src={post.media_url} className="absolute inset-0 w-full h-full object-cover" muted loop playsInline />
                                                            ) : (
                                                                <Image src={post.media_url} alt="" fill className="object-cover" unoptimized />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* No results */}
                            {!searchLoading && filteredUsers.length === 0 && filteredPosts.length === 0 && (
                                <div className="text-center py-16 animate-fade-in">
                                    <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/[0.06] mx-auto mb-5 flex items-center justify-center">
                                        <SearchIcon className="w-9 h-9 text-text-tertiary opacity-40" />
                                    </div>
                                    <p className="text-lg font-bold text-white mb-1">No results for &quot;{searchQuery}&quot;</p>
                                    <p className="text-sm text-text-tertiary">Try a different search term or check your spelling.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                /* ─── EXPLORE GRID ─── */
                <div className="animate-fade-in">
                    {gridLoading ? (
                        <div className="grid grid-cols-3 gap-[2px] p-[2px]">
                            {Array.from({ length: 15 }).map((_, i) => {
                                const pattern = getGridPattern(i);
                                return (
                                    <div
                                        key={i}
                                        className={`skeleton ${
                                            pattern === 2 ? "row-span-2 aspect-[1/2]" :
                                            pattern === 3 ? "col-span-2 aspect-[2/1]" :
                                            "aspect-square"
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    ) : explorePosts.length === 0 ? (
                        <div className="text-center py-24 animate-fade-in px-6">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-white/[0.06] mx-auto mb-6 flex items-center justify-center">
                                <SearchIcon className="w-12 h-12 text-accent-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Nothing to explore yet</h3>
                            <p className="text-sm text-text-tertiary mb-6 max-w-xs mx-auto">Posts from the community will appear here. Start following athletes!</p>
                            <Link
                                href="/create-post"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Create Post
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-[2px] p-[2px]">
                            {explorePosts.map((post: any, index: number) => {
                                const pattern = getGridPattern(index);
                                const isTall = pattern === 2;
                                const isWide = pattern === 3;

                                return (
                                    <div
                                        key={post.id}
                                        onClick={() => router.push(`/post/${post.id}`)}
                                        className={`relative bg-bg-surface overflow-hidden group cursor-pointer ${
                                            isTall ? "row-span-2" :
                                            isWide ? "col-span-2" :
                                            ""
                                        } ${
                                            isTall ? "aspect-auto" :
                                            isWide ? "aspect-[2/1]" :
                                            "aspect-square"
                                        }`}
                                        style={isTall ? { minHeight: 0 } : undefined}
                                    >
                                        {post.mediaUrl ? (
                                            <>
                                                {post.mediaType === 'video' ? (
                                                    <video
                                                        src={post.mediaUrl}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        muted
                                                        loop
                                                        playsInline
                                                        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.pause();
                                                            e.currentTarget.currentTime = 0;
                                                        }}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={post.mediaUrl}
                                                        alt="Post"
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        unoptimized
                                                        sizes={isWide ? "66vw" : "33vw"}
                                                    />
                                                )}
                                                {/* Video badge */}
                                                {post.mediaType === "video" && (
                                                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-0.5">
                                                        <ReelsIcon className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                )}
                                                {/* Multi-image badge */}
                                                {post.imageCount > 1 && (
                                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-0.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-8.25A2.25 2.25 0 0 1 7.5 18v-1.75" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center p-4 text-center bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10">
                                                <p className="text-[12px] text-text-secondary line-clamp-4 font-medium leading-relaxed">{post.caption}</p>
                                            </div>
                                        )}

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-5">
                                            <span className="text-white font-bold text-sm flex items-center gap-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                </svg>
                                                {post.likes}
                                            </span>
                                            <span className="text-white font-bold text-sm flex items-center gap-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                                                </svg>
                                                {post.comments}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
