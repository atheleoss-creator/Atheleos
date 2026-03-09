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
        <div className="hidden lg:flex flex-col gap-6 sticky top-[90px] h-fit animate-fade-in">

            {/* User Mini Profile */}
            <div className="bg-bg-card border border-border-color rounded-2xl p-4 flex items-center gap-4 hover:border-accent-primary/50 transition-colors shadow-lg group">
                <Link href="/profile" className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent-primary transition-all">
                    <Image
                        src={user.avatarUrl}
                        alt={user.username}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </Link>
                <div className="flex-1 overflow-hidden">
                    <Link href="/profile" className="font-bold text-text-primary hover:text-accent-primary block text-[15px]">
                        {user.username}
                    </Link>
                    <div className="text-xs text-text-secondary truncate">{user.fullName}</div>
                </div>
            </div>

            {/* Suggested For You */}
            <div className="bg-bg-card border border-border-color rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-sm font-bold text-text-secondary">Suggested Accounts</h3>
                </div>

                <div className="flex flex-col gap-4">
                    {loadingSuggestions && (
                        <div className="flex flex-col gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full skeleton shrink-0" />
                                    <div className="flex-1 flex flex-col gap-1.5">
                                        <div className="h-3 w-24 skeleton" />
                                        <div className="h-2 w-16 skeleton" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loadingSuggestions && suggestions.length === 0 && (
                        <p className="text-text-secondary text-xs text-center py-4">No suggestions available</p>
                    )}

                    {suggestions.map((s) => {
                        const avatarUrl = s.avatar_url || `https://ui-avatars.com/api/?name=${s.username}&background=random`;
                        const isFollowed = followedIds.has(s.id);
                        return (
                            <div key={s.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Link href={`/profile/${s.username}`} className="w-9 h-9 border border-border-color rounded-full bg-bg-surface overflow-hidden relative hover:scale-105 transition-transform cursor-pointer">
                                        <Image src={avatarUrl} alt={s.username} fill className="object-cover" unoptimized />
                                    </Link>
                                    <div className="text-sm flex flex-col justify-center">
                                        <Link href={`/profile/${s.username}`} className="font-bold text-text-primary text-[13px] leading-tight cursor-pointer hover:text-text-secondary">{s.username}</Link>
                                        <div className="text-[11px] text-text-secondary leading-tight">{s.sport || s.full_name || 'Athlete'}</div>
                                    </div>
                                </div>
                                {isFollowed ? (
                                    <span className="text-xs text-text-secondary font-semibold">Following</span>
                                ) : (
                                    <button onClick={() => handleFollow(s.id)} className="text-xs text-accent-primary font-bold hover:text-white transition-colors">
                                        Follow
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Footer Links */}
            <div className="flex flex-col gap-4 p-2">
                <div className="text-[11px] text-text-secondary w-full">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                        <span className="hover:underline cursor-pointer">About</span>
                        <span className="hover:underline cursor-pointer">Help</span>
                        <span className="hover:underline cursor-pointer">Press</span>
                        <span className="hover:underline cursor-pointer">API</span>
                        <span className="hover:underline cursor-pointer">Jobs</span>
                        <span className="hover:underline cursor-pointer">Privacy</span>
                        <span className="hover:underline cursor-pointer">Terms</span>
                    </div>
                    <span>© 2024 ATHELEOS</span>
                </div>
            </div>

        </div>
    );
}
