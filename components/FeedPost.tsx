"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useNotification } from "@/context/NotificationContext";
import LikesModal from "@/components/LikesModal";
import ShareModal from "@/components/ShareModal";

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

export default function FeedPost({ 
    post, 
    onDelete, 
    onHide, 
    onUpdate 
}: { 
    post: Post;
    onDelete?: (id: number) => void;
    onHide?: (id: number) => void;
    onUpdate?: (id: number, newCaption: string) => void;
}) {
    const { user } = useAuth();
    const { showToast } = useNotification();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isSaved, setIsSaved] = useState(post.isSaved);
    const [commentText, setCommentText] = useState("");
    const [commentCount, setCommentCount] = useState(post.comments);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    
    // Action states
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCaption, setEditCaption] = useState(post.caption);
    const [currentCaption, setCurrentCaption] = useState(post.caption);

    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Caption parser helper
    const renderCaption = (text: string) => {
        if (!text) return null;
        const words = text.split(/([\s\n]+)/); // Split by whitespace but keep the whitespace
        return words.map((word, i) => {
            if (word.startsWith('@') && word.length > 1) {
                const username = word.substring(1).replace(/[^a-zA-Z0-9_.]/g, '');
                const punctuation = word.substring(username.length + 1);
                return (
                    <span key={i}>
                        <Link href={`/profile/${username}`} className="text-accent-primary hover:underline font-medium">
                            @{username}
                        </Link>
                        {punctuation}
                    </span>
                );
            }
            if (word.startsWith('#') && word.length > 1) {
                return (
                    <span key={i} className="text-accent-primary font-medium">
                        {word}
                    </span>
                );
            }
            return <span key={i}>{word}</span>;
        });
    };

    // Auto-play videos when in view
    React.useEffect(() => {
        if (post.mediaType !== "video" || !videoRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    // Try to play with sound. If browser blocks it (NotAllowedError), fallback to muted or just catch error
                    videoRef.current?.play().catch((error) => {
                        // Silent fail if autoplay is blocked by browser policy without user interaction
                        if (error.name === 'NotAllowedError' && videoRef.current) {
                            videoRef.current.muted = true;
                            videoRef.current.play().catch(() => {});
                        }
                    });
                } else {
                    videoRef.current?.pause();
                }
            },
            { threshold: 0.6 } // Play when 60% of the video is visible
        );

        observer.observe(videoRef.current);

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
            observer.disconnect();
        };
    }, [post.mediaType]);

    const toggleLike = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
        try {
            const res = await fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
            if (newLiked) showToast("like", "Post liked!");
        } catch {
            setIsLiked(!newLiked);
            setLikeCount(likeCount);
        }
    };

    const toggleSave = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        const newSaved = !isSaved;
        setIsSaved(newSaved);
        try {
            const res = await fetch(`/api/posts/${post.id}/save`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
            showToast("save", newSaved ? "Post saved!" : "Post unsaved");
        } catch {
            setIsSaved(!newSaved);
        }
    };

    const submitComment = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
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
                showToast("comment", "Comment posted!");
            }
        } catch {
            showToast("error", "Failed to post comment");
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

    const handleShare = () => {
        setShowShareModal(true);
    };

    const handleCopyLink = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
        const url = `${baseUrl}/post/${post.id}`;
        try {
            await navigator.clipboard.writeText(url);
            showToast("success", "Link copied!", "Post URL copied to clipboard");
        } catch {
            // Silent fail
        }
    };

    const handleDeletePost = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`/api/posts?id=${post.id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast("success", "Post deleted");
                if (onDelete) onDelete(post.id);
            } else {
                throw new Error("Failed");
            }
        } catch {
            showToast("error", "Failed to delete post");
        }
        setShowMenu(false);
    };

    const handleHidePost = async () => {
        if (!confirm("Hide this post from everyone?")) return;
        try {
            const res = await fetch(`/api/posts/${post.id}/hide`, { method: 'POST' });
            if (res.ok) {
                showToast("success", "Post archived");
                if (onHide) onHide(post.id);
            } else {
                throw new Error("Failed");
            }
        } catch {
            showToast("error", "Failed to hide post");
        }
        setShowMenu(false);
    };

    const handleEditSave = async () => {
        try {
            const res = await fetch(`/api/posts/${post.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ caption: editCaption })
            });
            if (res.ok) {
                setCurrentCaption(editCaption);
                showToast("success", "Post updated");
                setIsEditing(false);
                if (onUpdate) onUpdate(post.id, editCaption);
            } else {
                throw new Error("Failed");
            }
        } catch {
            showToast("error", "Failed to update post");
        }
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
                <div className="flex items-center gap-2 relative">
                    {post.isSuggested && (
                        <button className="px-4 py-1.5 bg-accent-primary text-black text-xs font-bold rounded-lg hover:bg-white hover:text-black transition-all uppercase tracking-wider shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                            Follow
                        </button>
                    )}
                    <button onClick={() => setShowMenu(!showMenu)} className="text-text-tertiary hover:text-white p-1.5 hover:bg-white/5 rounded-full transition-colors">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-10 mt-2 w-48 bg-[#1A1A1A] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.8)] border border-white/10 z-50 overflow-hidden">
                            {user?.username === post.username ? (
                                <>
                                    <button onClick={() => { setShowMenu(false); setIsEditing(true); }} className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors">
                                        Edit Post
                                    </button>
                                    <button onClick={handleHidePost} className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors border-t border-white/5">
                                        Hide/Archive Post
                                    </button>
                                    <button onClick={handleDeletePost} className="w-full text-left px-4 py-3 text-sm text-red-500 font-medium hover:bg-red-500/10 transition-colors border-t border-white/5">
                                        Delete Post
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { setShowMenu(false); handleCopyLink(); }} className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors">
                                        Copy Link
                                    </button>
                                    <button onClick={() => { setShowMenu(false); showToast("error", "Report submitted"); }} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors border-t border-white/5">
                                        Report
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Media */}
            <Link href={`/post/${post.id}`}>
                <div className="relative w-full aspect-[4/5] bg-bg-surface overflow-hidden cursor-pointer" onDoubleClick={(e) => { e.preventDefault(); handleDoubleTap(); }}>
                    {post.mediaType === "video" ? (
                        <video 
                            ref={videoRef}
                            src={post.mediaUrl} 
                            controls 
                            loop
                            playsInline
                            className="w-full h-full object-cover" 
                        />
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
            </Link>

            {/* Actions */}
            <div className="px-4 py-3 flex justify-between items-center">
                <div className="flex gap-3">
                    <div className="flex items-center gap-1.5">
                        <button onClick={toggleLike} className="transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center group">
                            {isLiked ? (
                                <HeartIconSolid className="w-7 h-7 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                            ) : (
                                <HeartIcon className="w-7 h-7 text-white group-hover:text-red-400 transition-colors" />
                            )}
                        </button>
                        {likeCount > 0 ? (
                            <button onClick={() => setShowLikesModal(true)} className="font-bold text-[13px] select-none text-white hover:underline transition-all">
                                {likeCount.toLocaleString()}
                            </button>
                        ) : (
                            <span className="font-bold text-[13px] select-none text-white">{likeCount.toLocaleString()}</span>
                        )}
                    </div>

                    <button onClick={() => router.push(`/post/${post.id}`)} className="transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center gap-1.5 group">
                        <ChatBubbleOvalLeftIcon className="w-7 h-7 text-white group-hover:text-accent-primary transition-colors" />
                        <span className="font-bold text-[13px] select-none text-white">{commentCount}</span>
                    </button>

                    <button onClick={handleShare} className="transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center group">
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
                {isEditing ? (
                    <div className="mt-2 bg-[#1A1A1A] p-3 rounded-xl border border-white/10">
                        <textarea
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            className="w-full bg-transparent text-white text-[13px] outline-none resize-none min-h-[60px]"
                            placeholder="Write a caption..."
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => setIsEditing(false)} className="text-xs text-text-tertiary hover:text-white font-medium px-3 py-1.5">Cancel</button>
                            <button onClick={handleEditSave} className="text-xs bg-accent-primary text-black font-bold px-4 py-1.5 rounded-lg">Save</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-[14px] leading-relaxed">
                            <Link href={`/profile/${post.username}`} className="font-bold mr-2 hover:underline text-white">
                                {post.username}
                            </Link>
                            <span className="text-text-secondary whitespace-pre-wrap">{renderCaption(currentCaption)}</span>
                        </div>
                        {commentCount > 0 && (
                            <Link href={`/post/${post.id}`} className="text-text-tertiary text-[13px] mt-1.5 block hover:text-text-secondary transition-colors">
                                View all {commentCount} comments
                            </Link>
                        )}
                    </>
                )}
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

            <LikesModal
                postId={post.id}
                isOpen={showLikesModal}
                onClose={() => setShowLikesModal(false)}
            />
            <ShareModal
                postId={post.id}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
            />
        </div>
    );
}
