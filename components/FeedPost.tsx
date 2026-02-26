"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    PaperAirplaneIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

interface Post {
    id: number;
    username: string;
    avatarUrl: string;
    location?: string;
    mediaUrl: string;
    mediaType: "image" | "video";
    caption: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: string;
    isSuggested?: boolean;
}

export default function FeedPost({ post }: { post: Post }) {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isSaved, setIsSaved] = useState(post.isSaved);

    const toggleLike = async () => {
        // Optimistic UI Update
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

        try {
            const res = await fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
        } catch {
            // Revert on failure
            setIsLiked(isLiked);
            setLikeCount(likeCount);
        }
    };

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    return (
        <div className="bg-bg-card border border-border-color rounded-2xl overflow-hidden mb-2 relative">

            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border-color/50">
                <div className="flex items-center gap-3">
                    <Link href={`/profile/${post.username}`}>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border-color hover:border-accent-primary transition-colors cursor-pointer">
                            <Image
                                src={post.avatarUrl}
                                alt={post.username}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col">
                        <Link href={`/profile/${post.username}`} className="font-bold text-[14px] text-text-primary hover:text-text-secondary transition-colors">
                            {post.username}
                        </Link>
                        {post.isSuggested ? (
                            <div className="text-[12px] text-text-secondary">Suggested for you</div>
                        ) : post.location ? (
                            <div className="text-[12px] text-accent-primary">{post.location}</div>
                        ) : (
                            <div className="text-[11px] text-text-muted">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {post.isSuggested && (
                        <button className="px-4 py-1.5 bg-accent-primary/10 text-accent-primary text-xs font-bold rounded-lg hover:bg-accent-primary hover:text-white transition-all uppercase tracking-wider">
                            Follow
                        </button>
                    )}
                    <button className="text-text-secondary hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                        <EllipsisHorizontalIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Media Canvas */}
            <div className="relative w-full aspect-[4/5] bg-bg-body overflow-hidden border-b border-t border-border-color">
                {post.mediaType === "video" ? (
                    <video src={post.mediaUrl} controls className="w-full h-full object-cover" />
                ) : (
                    <Image
                        src={post.mediaUrl}
                        alt="Post content"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                )}
            </div>

            {/* Interactive Actions Layout */}
            <div className="px-4 py-3 flex justify-between items-center bg-bg-card">
                <div className="flex gap-4">
                    <button onClick={toggleLike} className="transition-transform active:scale-[0.80] hover:scale-110 p-1 -ml-1 inline-flex items-center gap-2 group">
                        {isLiked ? (
                            <HeartIconSolid className="w-7 h-7 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        ) : (
                            <HeartIcon className="w-7 h-7 text-text-primary group-hover:text-red-500 transition-colors" />
                        )}
                        <span className="font-bold text-sm select-none">{likeCount.toLocaleString()}</span>
                    </button>

                    <button className="transition-transform active:scale-[0.80] hover:scale-110 p-1 inline-flex items-center gap-2 group">
                        <ChatBubbleOvalLeftIcon className="w-7 h-7 text-text-primary group-hover:text-blue-500 transition-colors" />
                        <span className="font-bold text-sm select-none">{post.comments}</span>
                    </button>

                    <button className="transition-transform active:scale-[0.80] hover:scale-110 p-1 inline-flex items-center group">
                        <PaperAirplaneIcon className="w-7 h-7 -rotate-45 mb-1 text-text-primary group-hover:text-green-500 transition-colors" />
                    </button>
                </div>

                <button onClick={toggleSave} className="transition-transform active:scale-[0.80] hover:scale-110 p-1 -mr-1 group">
                    {isSaved ? (
                        <BookmarkIconSolid className="w-7 h-7 text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    ) : (
                        <BookmarkIcon className="w-7 h-7 text-text-primary group-hover:text-[#FACC15] transition-colors" />
                    )}
                </button>
            </div>

            {/* Caption Block */}
            <div className="px-4 pb-3">
                <div className="text-[14px] leading-snug">
                    <Link href={`/profile/${post.username}`} className="font-bold mr-2 hover:underline">
                        {post.username}
                    </Link>
                    <span className="text-text-secondary whitespace-pre-wrap">{post.caption}</span>
                </div>
            </div>

            {/* Comment Input Footer */}
            <div className="px-4 py-3 border-t border-border-color flex items-center gap-3 bg-bg-surface">
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex flex-col items-center justify-center shrink-0 border border-accent-primary/50 text-xs">
                    U
                </div>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="bg-transparent flex-1 text-[13px] outline-none text-text-primary placeholder:text-text-muted"
                />
                <button className="text-accent-primary font-bold text-[13px] uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:text-white transition-colors">
                    Post
                </button>
            </div>
        </div>
    );
}
