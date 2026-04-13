"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface SuggestedUser {
    id: number;
    username: string;
    full_name: string;
    avatar_url: string;
    sport: string | null;
}

export default function Sidebar() {
    const { user } = useAuth();
    const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(true);
    const [followedIds, setFollowedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        async function fetchSuggestions() {
            try {
                const res = await fetch('/api/users/suggested');
                if (res.ok) {
                    const data = await res.json();
                    setSuggestions(data.users || []);
                }
            } catch (error) {
                console.error('Failed to fetch suggestions', error);
            } finally {
                setLoadingSuggestions(false);
            }
        }
        fetchSuggestions();
    }, []);

    const handleFollow = async (userId: number) => {
        try {
            setFollowedIds(prev => new Set([...prev, userId]));
            await fetch(`/api/follow`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: userId })
            });
        } catch {
            setFollowedIds(prev => { const next = new Set(prev); next.delete(userId); return next; });
        }
    };

    if (!user) return null;

    return (
        <div className="hidden lg:flex flex-col gap-5 sticky top-[90px] h-fit animate-fade-in">

            {/* User Card */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4 hover:border-accent-primary/30 transition-all duration-300 backdrop-blur-sm group">
                <Link href={user?.username ? `/profile/${user.username}` : '#'} className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-accent-primary/50 transition-all shrink-0">
                    <Image src={user?.avatarUrl || "/default_avatar.svg"} alt={user?.username || "Profile"} fill className="object-cover" unoptimized />
                </Link>
                <div className="flex-1 overflow-hidden">
                    <Link href={user?.username ? `/profile/${user.username}` : '#'} className="font-bold text-white hover:text-accent-primary block text-[15px] transition-colors">
                        {user.username}
                    </Link>
                    <div className="text-xs text-text-secondary truncate">{user.fullName}</div>
                </div>
            </div>

            {/* Suggested Accounts */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">Suggested Athletes</h3>
                </div>

                <div className="flex flex-col gap-4">
                    {loadingSuggestions && (
                        <div className="flex flex-col gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full skeleton shrink-0" />
                                    <div className="flex-1 flex flex-col gap-1.5">
                                        <div className="h-3 w-24 skeleton" />
                                        <div className="h-2 w-16 skeleton" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loadingSuggestions && suggestions.length === 0 && (
                        <p className="text-text-tertiary text-xs text-center py-4">No suggestions right now</p>
                    )}

                    {suggestions.map((s) => {
                        const avatarUrl = s.avatar_url || `https://ui-avatars.com/api/?name=${s.username}&background=random`;
                        const isFollowed = followedIds.has(s.id);
                        return (
                            <div key={s.id} className="flex items-center justify-between group/item">
                                <div className="flex items-center gap-3">
                                    <Link href={`/profile/${s.username}`} className="w-10 h-10 ring-1 ring-white/10 rounded-full bg-bg-surface overflow-hidden relative hover:ring-accent-primary/50 transition-all cursor-pointer shrink-0">
                                        <Image src={avatarUrl} alt={s?.username || "Suggested athlete"} fill className="object-cover" unoptimized />
                                    </Link>
                                    <div className="flex flex-col">
                                        <Link href={`/profile/${s.username}`} className="font-bold text-white text-[13px] leading-tight hover:text-accent-primary transition-colors">{s.username}</Link>
                                        <div className="text-[11px] text-text-tertiary leading-tight">{s.sport || s.full_name || 'Athlete'}</div>
                                    </div>
                                </div>
                                {isFollowed ? (
                                    <span className="text-[11px] text-text-tertiary font-medium px-3 py-1 rounded-lg bg-white/[0.04]">Following</span>
                                ) : (
                                    <button onClick={() => handleFollow(s.id)} className="text-[11px] text-accent-primary font-bold px-3 py-1 rounded-lg hover:bg-accent-primary/10 transition-colors">
                                        Follow
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="px-1 pt-2">
                <div className="text-[11px] text-text-tertiary">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                        <span className="hover:underline cursor-pointer hover:text-text-secondary transition-colors">About</span>
                        <span className="hover:underline cursor-pointer hover:text-text-secondary transition-colors">Help</span>
                        <span className="hover:underline cursor-pointer hover:text-text-secondary transition-colors">Press</span>
                        <span className="hover:underline cursor-pointer hover:text-text-secondary transition-colors">API</span>
                        <span className="hover:underline cursor-pointer hover:text-text-secondary transition-colors">Jobs</span>
                        <Link href="/privacy" className="hover:underline cursor-pointer hover:text-text-secondary transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:underline cursor-pointer hover:text-text-secondary transition-colors">Terms</Link>
                    </div>
                    <span>© 2026 ATHELEOS</span>
                </div>
            </div>

        </div>
    );
}
