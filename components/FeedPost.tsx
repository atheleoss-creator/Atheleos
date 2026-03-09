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
import { useAuth } from "@/context/AuthContext";

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
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isSaved, setIsSaved] = useState(post.isSaved);
    const [commentText, setCommentText] = useState("");
    const [commentCount, setCommentCount] = useState(post.comments);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);

    const toggleLike = async () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        try {
            const res = await fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
        } catch {
            setIsLiked(isLiked);
            setLikeCount(likeCount);
        }
    };

    const toggleSave = async () => {
        setIsSaved(!isSaved);
        try {
            const res = await fetch(`/api/posts/${post.id}/save`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
        } catch {
            setIsSaved(isSaved);
        }
    };

    const submitComment = async () => {
        if (!commentText.trim() || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/posts/${post.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: commentText })
            });
            if (res.ok) {
                setCommentText("");
                setCommentCount(commentCount + 1);
            }
        } catch {
            // Silent fail
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCommentKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitComment();
        }
    };

    const handleDoubleTap = () => {
        if (!isLiked) {
            toggleLike();
        }
        setShowDoubleTapHeart(true);
        setTimeout(() => setShowDoubleTapHeart(false), 800);
    };

    return (
        <div className="bg-black border border-white/[0.06] rounded-2xl overflow-hidden mb-2 relative shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-white/[0.1] transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                    <Link href={`/profile/${post.username}`}>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-accent-primary/50 transition-all cursor-pointer">
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
                        <Link href={`/profile/${post.username}`} className="font-bold text-[14px] text-white hover:text-accent-primary transition-colors">
                            {post.username}
                        </Link>
                        {post.isSuggested ? (
                            <div className="text-[12px] text-text-secondary">Suggested for you</div>
                        ) : post.location ? (
                            <div className="text-[12px] text-accent-primary font-medium">{post.location}</div>
                        ) : (
                            <div className="text-[11px] text-text-tertiary">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {post.isSuggested && (
                        <button className="px-4 py-1.5 bg-accent-primary text-black text-xs font-bold rounded-lg hover:bg-white hover:text-black transition-all uppercase tracking-wider shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                            Follow
                        </button>
                    )}
                    <button className="text-text-tertiary hover:text-white p-1.5 hover:bg-white/5 rounded-full transition-colors">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Media */}
            <div className="relative w-full aspect-[4/5] bg-bg-surface overflow-hidden" onDoubleClick={handleDoubleTap}>
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
                {/* Double-tap heart animation */}
                {showDoubleTapHeart && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <HeartIconSolid className="w-24 h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-scale-in" />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-4 py-3 flex justify-between items-center">
                <div className="flex gap-3">
                    <button onClick={toggleLike} className="transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center gap-1.5 group">
                        {isLiked ? (
                            <HeartIconSolid className="w-7 h-7 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        ) : (
                            <HeartIcon className="w-7 h-7 text-white group-hover:text-red-400 transition-colors" />
                        )}
                        <span className="font-bold text-[13px] select-none text-white">{likeCount.toLocaleString()}</span>
                    </button>

                    <button className="transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center gap-1.5 group">
                        <ChatBubbleOvalLeftIcon className="w-7 h-7 text-white group-hover:text-accent-primary transition-colors" />
                        <span className="font-bold text-[13px] select-none text-white">{commentCount}</span>
                    </button>

                    <button className="transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center group">
                        <PaperAirplaneIcon className="w-7 h-7 -rotate-45 mb-1 text-white group-hover:text-green-400 transition-colors" />
                    </button>
                </div>

                <button onClick={toggleSave} className="transition-transform active:scale-75 hover:scale-110 p-0.5 group">
                    {isSaved ? (
                        <BookmarkIconSolid className="w-7 h-7 text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    ) : (
                        <BookmarkIcon className="w-7 h-7 text-white group-hover:text-[#FACC15] transition-colors" />
                    )}
                </button>
            </div>

            {/* Caption */}
            <div className="px-4 pb-3">
                <div className="text-[14px] leading-relaxed">
                    <Link href={`/profile/${post.username}`} className="font-bold mr-2 hover:underline text-white">
                        {post.username}
                    </Link>
                    <span className="text-text-secondary whitespace-pre-wrap">{post.caption}</span>
                </div>
            </div>

            {/* Comment Input */}
            <div className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-3 bg-white/[0.02]">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                    <Image src={user?.avatarUrl || "/default_avatar.svg"} alt="You" width={32} height={32} className="object-cover w-full h-full" unoptimized />
                </div>
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={handleCommentKeyDown}
                    placeholder="Add a comment..."
                    className="bg-transparent flex-1 text-[13px] outline-none text-white placeholder:text-text-tertiary"
                />
                <button
                    onClick={submitComment}
                    disabled={!commentText.trim() || isSubmitting}
                    className="text-accent-primary font-bold text-[13px] uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors"
                >
                    Post
                </button>
            </div>
        </div>
    );
}
