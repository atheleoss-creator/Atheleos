"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SavedPost {
    id: number;
    mediaUrl: string | null;
    mediaType: string;
    caption: string;
    likes: number;
    comments: number;
    username: string;
}

export default function SavedPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<SavedPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/posts/saved");
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data.posts || []);
                }
            } catch (err) {
                console.error("Failed to fetch saved posts", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleUnsave = async (postId: number) => {
        try {
            const res = await fetch(`/api/posts/${postId}/save`, { method: "POST" });
            if (res.ok) {
                setPosts((prev) => prev.filter((p) => p.id !== postId));
            }
        } catch (err) {
            console.error("Unsave failed", err);
        }
    };

    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-24 md:pb-10">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-2xl mx-auto px-4 flex items-center h-14 gap-3">
                    <button onClick={() => router.back()} className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold">Saved</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 pt-4">
                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-3 gap-1">
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="aspect-square skeleton rounded-md" />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-text-tertiary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        </div>
                        <p className="text-lg font-bold text-white mb-1">No saved posts</p>
                        <p className="text-sm text-text-muted text-center max-w-xs">
                            Save posts by tapping the bookmark icon. They&apos;ll show up here.
                        </p>
                    </div>
                )}

                {/* Posts Grid */}
                {!loading && posts.length > 0 && (
                    <div className="grid grid-cols-3 gap-1">
                        {posts.map((post) => (
                            <div key={post.id} className="relative aspect-square group cursor-pointer rounded-md overflow-hidden bg-white/[0.03]">
                                {post.mediaUrl ? (
                                    post.mediaType === "video" ? (
                                        <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-text-muted">
                                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <Image src={post.mediaUrl} alt="" fill className="object-cover" unoptimized />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-2">
                                        <p className="text-[11px] text-text-secondary line-clamp-4 text-center">{post.caption}</p>
                                    </div>
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <div className="flex items-center gap-1 text-white text-sm font-bold">
                                        <span>♥</span> {post.likes}
                                    </div>
                                    <div className="flex items-center gap-1 text-white text-sm font-bold">
                                        <span>💬</span> {post.comments}
                                    </div>
                                </div>

                                {/* Unsave button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleUnsave(post.id); }}
                                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                    title="Unsave"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
