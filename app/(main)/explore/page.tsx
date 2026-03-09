"use client";

import React, { useState, useEffect } from "react";
import { SearchIcon, ArrowLeftIcon, ReelsIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SEARCH_TABS = ["Top", "Accounts", "Tags", "Places"];

export default function ExplorePage() {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearchTab, setActiveSearchTab] = useState("Top");
    const [searchResults, setSearchResults] = useState<{ users: any[]; posts: any[] }>({ users: [], posts: [] });
    const [searchLoading, setSearchLoading] = useState(false);

    // Grid posts from DB
    const [explorePosts, setExplorePosts] = useState<any[]>([]);
    const [gridLoading, setGridLoading] = useState(true);

    // Fetch real posts for the explore grid
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts');
                if (res.ok) {
                    const data = await res.json();
                    setExplorePosts(data.posts || []);
                }
            } catch {
                // silent
            } finally {
                setGridLoading(false);
            }
        }
        fetchPosts();
    }, []);

    // Search effect
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
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchCheck = () => {
        setIsSearching(true);
    };

    const handleCancelSearch = () => {
        setIsSearching(false);
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen bg-bg-body pb-20 overflow-x-hidden">
            {/* Search Bar */}
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

                {isSearching && (
                    <div className="flex gap-6 mt-4 overflow-x-auto no-scrollbar border-b border-border-color/30">
                        {SEARCH_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSearchTab(tab)}
                                className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${activeSearchTab === tab ? "text-text-primary" : "text-text-secondary"}`}
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
                <div className="px-4 py-4">
                    {searchQuery.length === 0 ? (
                        <div className="text-center py-16 text-text-secondary animate-fade-in">
                            <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-semibold text-text-primary mb-1">Search Atheleos</p>
                            <p className="text-sm">Find athletes, teams, and content.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 animate-fade-in">
                            {searchLoading && <div className="text-center py-6 text-text-secondary animate-pulse">Searching...</div>}

                            {searchResults.users.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">Accounts</h3>
                                    <div className="flex flex-col gap-3">
                                        {searchResults.users.map((user: any) => (
                                            <Link key={user.id} href={`/profile/${user.username}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-surface transition-colors">
                                                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                                                    <Image src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.username}&background=random`} alt={user.username} fill className="object-cover" unoptimized />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-text-primary text-[14px]">{user.username}</span>
                                                    <span className="text-[12px] text-text-secondary">{user.full_name} {user.sport ? `· ${user.sport}` : ''}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {searchResults.posts.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">Posts</h3>
                                    <div className="flex flex-col gap-2">
                                        {searchResults.posts.map((post: any) => (
                                            <div key={post.id} className="p-3 bg-bg-surface rounded-xl border border-border-color">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-[13px] text-text-primary">{post.username}</span>
                                                </div>
                                                <p className="text-[13px] text-text-secondary line-clamp-2">{post.caption}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!searchLoading && searchResults.users.length === 0 && searchResults.posts.length === 0 && (
                                <div className="text-center py-10 text-text-secondary">
                                    <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-semibold text-text-primary mb-1">No results for &quot;{searchQuery}&quot;</p>
                                    <p className="text-sm">Try searching for a different term.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                /* EXPLORE GRID — Real posts from DB */
                <div className="animate-fade-in">
                    {gridLoading ? (
                        <div className="grid grid-cols-3 gap-[1px] md:gap-1">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="aspect-square skeleton" />
                            ))}
                        </div>
                    ) : explorePosts.length === 0 ? (
                        <div className="text-center py-20 text-text-secondary animate-fade-in">
                            <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-bold text-text-primary mb-2">Nothing to explore yet</h3>
                            <p className="text-sm">Posts from the community will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-[1px] md:gap-1">
                            {explorePosts.map((post: any) => (
                                <div
                                    key={post.id}
                                    onClick={() => router.push(`/profile/${post.username}`)}
                                    className="relative bg-bg-surface overflow-hidden group cursor-pointer aspect-square"
                                >
                                    {post.mediaUrl ? (
                                        <>
                                            <Image
                                                src={post.mediaUrl}
                                                alt="Post"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                unoptimized
                                                sizes="(max-width: 768px) 33vw, 33vw"
                                            />
                                            {post.mediaType === "video" && (
                                                <div className="absolute top-2 right-2">
                                                    <ReelsIcon className="w-5 h-5 md:w-6 md:h-6 fill-white text-white drop-shadow-lg" />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-3 text-center">
                                            <p className="text-[11px] md:text-sm text-text-secondary line-clamp-4">{post.caption}</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <span className="text-white font-bold text-sm">❤️ {post.likes}</span>
                                        <span className="text-white font-bold text-sm">💬 {post.comments}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
