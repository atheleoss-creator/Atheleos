"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
    type: "like" | "comment" | "follow";
    created_at: string;
    post_id?: number;
    media_url?: string;
    media_type?: string;
    caption?: string;
    content?: string;
    post_owner_username?: string;
    username?: string;
    avatar_url?: string;
    full_name?: string;
}

const FILTERS = [
    { label: "All", value: "all" },
    { label: "Likes", value: "like" },
    { label: "Comments", value: "comment" },
    { label: "Follows", value: "follow" },
];

export default function ActivityPage() {
    const router = useRouter();
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/activity");
                if (res.ok) {
                    const data = await res.json();
                    setActivity(data.activity || []);
                }
            } catch (err) {
                console.error("Failed to fetch activity", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = activity.filter(a => filter === "all" || a.type === filter);

    const getIcon = (type: string) => {
        switch (type) {
            case "like": return <span className="text-red-500">♥</span>;
            case "comment": return <span className="text-blue-400">💬</span>;
            case "follow": return <span className="text-accent-primary">👤</span>;
            default: return null;
        }
    };

    const getDescription = (item: ActivityItem) => {
        switch (item.type) {
            case "like":
                return <>You liked <span className="font-bold text-white">{item.post_owner_username}</span>&apos;s post</>;
            case "comment":
                return <>You commented on <span className="font-bold text-white">{item.post_owner_username}</span>&apos;s post: <span className="text-text-secondary italic">&quot;{(item.content || "").slice(0, 60)}{(item.content || "").length > 60 ? "…" : ""}&quot;</span></>;
            case "follow":
                return <>You started following <span className="font-bold text-white">{item.username}</span></>;
            default:
                return "Unknown activity";
        }
    };

    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-24 md:pb-10">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex items-center h-14 gap-3">
                        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-bold">Your Activity</h1>
                    </div>
                    <div className="flex gap-2 pb-3 overflow-x-auto hidden-scrollbar">
                        {FILTERS.map(f => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                                    filter === f.value
                                        ? "bg-white text-black"
                                        : "bg-white/[0.04] text-text-secondary hover:bg-white/[0.08]"
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto">
                {loading && (
                    <div className="flex flex-col">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.04]">
                                <div className="w-8 h-8 rounded-full skeleton" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 w-3/4 skeleton" />
                                    <div className="h-3 w-1/3 skeleton" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-text-tertiary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <p className="text-lg font-bold text-white mb-1">No activity yet</p>
                        <p className="text-sm text-text-muted text-center max-w-xs">Your likes, comments, and follows will appear here.</p>
                    </div>
                )}

                {!loading && filtered.length > 0 && (
                    <div className="flex flex-col">
                        {filtered.map((item, i) => (
                            <div
                                key={`${item.type}-${i}`}
                                className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer"
                                onClick={() => {
                                    if (item.type === "follow" && item.username) {
                                        router.push(`/profile/${item.username}`);
                                    } else if (item.post_owner_username) {
                                        router.push(`/profile/${item.post_owner_username}`);
                                    }
                                }}
                            >
                                <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-lg shrink-0">
                                    {getIcon(item.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] text-text-secondary leading-snug">
                                        {getDescription(item)}
                                    </p>
                                    <p className="text-[12px] text-text-muted mt-0.5">
                                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                    </p>
                                </div>

                                {item.media_url && item.type !== "follow" && (
                                    <div className="w-10 h-10 rounded-md overflow-hidden bg-white/[0.04] shrink-0">
                                        {item.media_type === "video" ? (
                                            <div className="w-full h-full flex items-center justify-center bg-white/[0.06]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-text-muted">
                                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <Image src={item.media_url} alt="" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                                        )}
                                    </div>
                                )}

                                {item.type === "follow" && item.avatar_url && (
                                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                        <Image
                                            src={item.avatar_url.startsWith("http") ? item.avatar_url : `https://ui-avatars.com/api/?name=${item.username}&background=1a1a1a&color=fff`}
                                            alt="" width={40} height={40} className="w-full h-full object-cover" unoptimized
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
