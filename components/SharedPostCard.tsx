"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function SharedPostCard({ postId }: { postId: number }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetch(`/api/posts/${postId}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (isMounted && data?.post) setPost(data.post);
            })
            .catch(() => {})
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, [postId]);

    if (loading) {
        return (
            <div className="mt-2 w-[220px] bg-black/30 border border-white/10 rounded-2xl p-3 animate-pulse space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10" />
                    <div className="h-3 w-20 bg-white/10 rounded" />
                </div>
                <div className="w-full aspect-square bg-white/5 rounded-xl" />
            </div>
        );
    }

    if (!post) {
        return (
            <Link href={`/post/${postId}`} className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-2 bg-black/40 hover:bg-black/60 transition-colors rounded-xl border border-white/10 text-xs text-accent-primary font-medium">
                <PaperAirplaneIcon className="w-3.5 h-3.5 -rotate-45" />
                <span>View Shared Post #{postId}</span>
            </Link>
        );
    }

    return (
        <Link 
            href={`/post/${postId}`} 
            className="block mt-2 bg-black/50 hover:bg-black/70 border border-white/[0.12] hover:border-accent-primary/50 rounded-2xl overflow-hidden transition-all duration-200 group/card w-[240px] shadow-lg text-left"
        >
            {/* Author Header */}
            <div className="p-2.5 flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-5 h-5 rounded-full overflow-hidden relative shrink-0 ring-1 ring-white/10">
                    <Image src={post.avatarUrl || '/default_avatar.svg'} alt="" width={20} height={20} className="w-full h-full object-cover" unoptimized />
                </div>
                <span className="text-xs font-bold text-white truncate group-hover/card:text-accent-primary transition-colors">
                    @{post.username}
                </span>
            </div>

            {/* Media */}
            {post.mediaUrl ? (
                <div className="relative w-full aspect-square bg-bg-surface overflow-hidden">
                    {post.mediaType === 'video' ? (
                        <video src={post.mediaUrl} className="w-full h-full object-cover pointer-events-none" />
                    ) : (
                        <Image src={post.mediaUrl} alt="Post preview" fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" unoptimized />
                    )}
                </div>
            ) : (
                <div className="p-4 bg-white/[0.02] min-h-[80px] flex items-center justify-center text-xs text-text-tertiary italic">
                    Text Post
                </div>
            )}

            {/* Caption */}
            {post.caption && (
                <div className="p-2.5 bg-white/[0.02]">
                    <p className="text-[11px] text-text-secondary line-clamp-2 leading-snug break-words">
                        {post.caption}
                    </p>
                </div>
            )}
        </Link>
    );
}
