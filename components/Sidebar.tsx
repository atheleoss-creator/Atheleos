"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="hidden lg:flex flex-col gap-6 sticky top-[90px] h-fit">

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
                <div className="text-xs font-bold text-accent-primary cursor-pointer hover:text-white transition-colors">Switch</div>
            </div>

            {/* Suggested For You - Sports Themed */}
            <div className="bg-bg-card border border-border-color rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-sm font-bold text-text-secondary">Suggested Accounts</h3>
                    <span className="text-accent-primary text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:text-white">See all</span>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Mock Suggestions */}
                    {[
                        { name: "Federer.rf", reason: "Follows Tennis", avatar: "https://ui-avatars.com/api/?name=RF&background=random" },
                        { name: "Miami_Heat_Official", reason: "Trending Team", avatar: "https://ui-avatars.com/api/?name=MH&background=random" },
                        { name: "Athlete_Daily", reason: "New to Atheleos", avatar: "https://ui-avatars.com/api/?name=AD&background=random" }
                    ].map((suggestion, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 border border-border-color rounded-full bg-bg-surface overflow-hidden relative hover:scale-105 transition-transform cursor-pointer">
                                    <Image src={suggestion.avatar} alt="User" fill className="object-cover" unoptimized />
                                </div>
                                <div className="text-sm flex flex-col justify-center">
                                    <div className="font-bold text-text-primary text-[13px] leading-tight cursor-pointer hover:text-text-secondary">{suggestion.name}</div>
                                    <div className="text-[11px] text-text-secondary leading-tight">{suggestion.reason}</div>
                                </div>
                            </div>
                            <button className="text-xs text-text-primary font-bold hover:text-text-secondary transition-colors">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-bg-card border border-border-color rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-sm font-bold text-text-secondary">Upcoming Matches</h3>
                    <Link href="/events" className="text-xs font-bold text-accent-primary hover:text-white transition-colors">See all</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center p-2.5 bg-bg-surface hover:bg-white/5 border border-border-color hover:border-accent-primary/50  rounded-xl transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-lg bg-red-500/20 flex flex-col items-center justify-center text-red-500 shrink-0">
                            <span className="text-[10px] font-bold uppercase">Oct</span>
                            <span className="text-[15px] font-bold">24</span>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="font-bold text-[13px] text-text-primary truncate">City Marathon</div>
                            <div className="text-[11px] text-text-secondary truncate">New York, NY</div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center p-2.5 bg-bg-surface hover:bg-white/5 border border-border-color hover:border-accent-primary/50 rounded-xl transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex flex-col items-center justify-center text-blue-500 shrink-0">
                            <span className="text-[10px] font-bold uppercase">Nov</span>
                            <span className="text-[15px] font-bold">12</span>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="font-bold text-[13px] text-text-primary truncate">National Swim Meet</div>
                            <div className="text-[11px] text-text-secondary truncate">Aquatic Center</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Tags */}
            <div className="flex flex-col gap-4 p-2">
                <div className="flex flex-wrap gap-2">
                    {["#Basketball", "#Soccer", "#Tennis", "#Marathon", "#Olympics"].map((tag) => (
                        <span key={tag} className="text-[11px] font-bold bg-bg-surface text-text-secondary px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/10 transition-colors border border-border-color">
                            {tag}
                        </span>
                    ))}
                </div>
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
