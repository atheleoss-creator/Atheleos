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
    const [explorePosts, setExplorePosts] = useState<any[]>([]);
    const [gridLoading, setGridLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts');
                if (res.ok) {
                    const data = await res.json();
                    setExplorePosts(data.posts || []);
                }
            } catch { /* silent */ } finally {
                setGridLoading(false);
            }
        }
        fetchPosts();
    }, []);

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

    return (
        <div className="min-h-screen bg-bg-body pb-24 overflow-x-hidden">
            {/* Search Bar */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-xl z-20 px-4 py-3 border-b border-white/[0.06]">
                <div className={`relative flex items-center transition-all ${isSearching ? "gap-3" : ""}`}>
                    {isSearching && (
                        <button onClick={() => { setIsSearching(false); setSearchQuery(""); }} className="text-white hover:bg-white/10 p-1.5 rounded-xl transition-colors">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                    )}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-text-tertiary" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search athletes, teams, content..."
                            className="w-full bg-white/[0.06] text-white text-[15px] placeholder-text-tertiary rounded-xl py-2.5 pl-11 pr-4 outline-none focus:ring-1 focus:ring-accent-primary/50 focus:bg-white/[0.08] transition-all border border-white/[0.06]"
                            value={searchQuery}
                            onFocus={() => setIsSearching(true)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {isSearching && (
                    <div className="flex gap-6 mt-4 overflow-x-auto no-scrollbar border-b border-white/[0.04]">
                        {SEARCH_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSearchTab(tab)}
                                className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${activeSearchTab === tab ? "text-white" : "text-text-tertiary hover:text-text-secondary"}`}
                            >
                                {tab}
                                {activeSearchTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary rounded-t-md" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            {isSearching ? (
                <div className="px-4 py-4 animate-fade-in">
                    {searchQuery.length === 0 ? (
                        <div className="text-center py-20 text-text-secondary">
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] mx-auto mb-4 flex items-center justify-center">
                                <SearchIcon className="w-8 h-8 text-text-tertiary" />
                            </div>
                            <p className="text-lg font-bold text-white mb-1">Search Atheleos</p>
                            <p className="text-sm text-text-tertiary">Find athletes, teams, and content.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {searchLoading && <div className="text-center py-6 text-text-tertiary animate-pulse">Searching...</div>}

                            {searchResults.users.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Accounts</h3>
                                    <div className="flex flex-col gap-1">
                                        {searchResults.users.map((u: any) => (
                                            <Link key={u.id} href={`/profile/${u.username}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors">
                                                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 ring-1 ring-white/10">
                                                    <Image src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}&background=random`} alt={u.username} fill className="object-cover" unoptimized />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-[14px]">{u.username}</span>
                                                    <span className="text-[12px] text-text-tertiary">{u.full_name} {u.sport ? `· ${u.sport}` : ''}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {searchResults.posts.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Posts</h3>
                                    <div className="flex flex-col gap-2">
                                        {searchResults.posts.map((post: any) => (
                                            <div key={post.id} className="p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-[13px] text-white">{post.username}</span>
                                                </div>
                                                <p className="text-[13px] text-text-secondary line-clamp-2">{post.caption}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!searchLoading && searchResults.users.length === 0 && searchResults.posts.length === 0 && (
                                <div className="text-center py-12 text-text-secondary">
                                    <SearchIcon className="w-12 h-12 mx-auto mb-4 text-text-tertiary opacity-40" />
                                    <p className="text-lg font-bold text-white mb-1">No results for &quot;{searchQuery}&quot;</p>
                                    <p className="text-sm text-text-tertiary">Try searching for a different term.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                /* Explore Grid */
                <div className="animate-fade-in">
                    {gridLoading ? (
                        <div className="grid grid-cols-3 gap-[2px]">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="aspect-square skeleton" />
                            ))}
                        </div>
                    ) : explorePosts.length === 0 ? (
                        <div className="text-center py-24 animate-fade-in px-6">
                            <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] mx-auto mb-5 flex items-center justify-center">
                                <SearchIcon className="w-10 h-10 text-text-tertiary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Nothing to explore yet</h3>
                            <p className="text-sm text-text-tertiary">Posts from the community will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-[2px]">
                            {explorePosts.map((post: any) => (
                                <div
                                    key={post.id}
                                    onClick={() => router.push(`/profile/${post.username}`)}
                                    className="relative bg-bg-surface overflow-hidden group cursor-pointer aspect-square"
                                >
                                    {post.mediaUrl ? (
                                        <>
                                            <Image src={post.mediaUrl} alt="Post" fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized sizes="33vw" />
                                            {post.mediaType === "video" && (
                                                <div className="absolute top-2 right-2 drop-shadow-lg">
                                                    <ReelsIcon className="w-5 h-5 fill-white text-white" />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-4 text-center bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10">
                                            <p className="text-[12px] text-text-secondary line-clamp-4 font-medium">{post.caption}</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                                        <span className="text-white font-bold text-sm flex items-center gap-1">❤️ {post.likes}</span>
                                        <span className="text-white font-bold text-sm flex items-center gap-1">💬 {post.comments}</span>
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
