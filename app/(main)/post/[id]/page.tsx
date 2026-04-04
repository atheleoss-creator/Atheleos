"use client";

import React, { use, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import Badge from "@/components/Badge";
import LikesModal from "@/components/LikesModal";
import {
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    PaperAirplaneIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
    TrashIcon,
    ShareIcon,
    ArrowLeftIcon as ArrowLeft,
    XMarkIcon,
    FlagIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartIconSolid,
    BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";

interface Comment {
    id: number;
    content: string;
    created_at: string;
    username: string;
    full_name: string;
    avatar_url: string;
    is_verified: boolean;
    verification_level: string;
}

interface PostData {
    id: number;
    username: string;
    avatarUrl: string;
    fullName: string;
    isVerified: boolean;
    verificationLevel: string;
    mediaUrl: string | null;
    mediaType: "image" | "video" | "text";
    caption: string;
    location: string | null;
    likes: number;
    comments: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: string;
    user_id: number;
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: postId } = use(params);
    const router = useRouter();
    const { user } = useAuth();
    const { showToast } = useNotification();

    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Interactions
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    // Comments
    const [commentsList, setCommentsList] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const commentInputRef = useRef<HTMLInputElement>(null);

    // Menu
    const [showMenu, setShowMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Likes Modal
    const [showLikesModal, setShowLikesModal] = useState(false);

    // Double-tap
    const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);

    // Fetch post
    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${postId}`);
                if (!res.ok) throw new Error("Post not found");
                const data = await res.json();
                const p = data.post;
                setPost(p);
                setIsLiked(p.isLiked);
                setLikeCount(p.likes);
                setIsSaved(p.isSaved);
                setCommentCount(p.comments);
            } catch {
                setError("Post not found or has been deleted.");
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [postId]);

    // Fetch comments
    useEffect(() => {
        async function fetchComments() {
            try {
                const res = await fetch(`/api/posts/${postId}/comments`);
                if (res.ok) {
                    const data = await res.json();
                    setCommentsList(data.comments || []);
                }
            } catch {
                console.error("Failed to fetch comments");
            } finally {
                setCommentsLoading(false);
            }
        }
        fetchComments();
    }, [postId]);

    // Toggle like
    const toggleLike = async () => {
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
        try {
            const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
            if (!res.ok) throw new Error("Failed");
            if (newLiked) showToast("like", "Post liked!", "");
        } catch {
            setIsLiked(!newLiked);
            setLikeCount(likeCount);
            showToast("error", "Failed to like post");
        }
    };

    // Toggle save
    const toggleSave = async () => {
        const newSaved = !isSaved;
        setIsSaved(newSaved);
        try {
            const res = await fetch(`/api/posts/${postId}/save`, { method: "POST" });
            if (!res.ok) throw new Error("Failed");
            showToast("save", newSaved ? "Post saved!" : "Post unsaved");
        } catch {
            setIsSaved(!newSaved);
            showToast("error", "Failed to save post");
        }
    };

    // Submit comment
    const submitComment = async () => {
        if (!commentText.trim() || isSubmittingComment) return;
        setIsSubmittingComment(true);
        try {
            const res = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: commentText }),
            });
            if (res.ok) {
                // Add comment to local list
                const newComment: Comment = {
                    id: Date.now(),
                    content: commentText,
                    created_at: new Date().toISOString(),
                    username: user?.username || "you",
                    full_name: user?.fullName || "",
                    avatar_url: user?.avatarUrl || "/default_avatar.svg",
                    is_verified: user?.isVerified || false,
                    verification_level: user?.verificationLevel || "unverified",
                };
                setCommentsList((prev) => [...prev, newComment]);
                setCommentText("");
                setCommentCount((c) => c + 1);
                showToast("comment", "Comment posted!");
            }
        } catch {
            showToast("error", "Failed to post comment");
        } finally {
            setIsSubmittingComment(false);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId: number) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        try {
            const res = await fetch(`/api/posts/${postId}/comments?commentId=${commentId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setCommentsList((prev) => prev.filter((c) => c.id !== commentId));
                setCommentCount((c) => c - 1);
                showToast("success", "Comment deleted");
            } else {
                showToast("error", "Failed to delete comment");
            }
        } catch {
            showToast("error", "Failed to delete comment");
        }
    };

    // Share
    const handleShare = async () => {
        const url = `${window.location.origin}/post/${postId}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: `Post by ${post?.username}`, url });
            } else {
                await navigator.clipboard.writeText(url);
                showToast("success", "Link copied!", "Post URL copied to clipboard");
            }
        } catch {
            try {
                await navigator.clipboard.writeText(url);
                showToast("success", "Link copied!");
            } catch {
                showToast("error", "Failed to copy link");
            }
        }
    };

    // Delete post
    const handleDelete = async () => {
        if (!confirm("Delete this post? This cannot be undone.")) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/posts?id=${postId}`, { method: "DELETE" });
            if (res.ok) {
                showToast("success", "Post deleted");
                router.push("/");
            } else {
                showToast("error", "Failed to delete post");
            }
        } catch {
            showToast("error", "Failed to delete post");
        } finally {
            setIsDeleting(false);
            setShowMenu(false);
        }
    };

    // Double-tap to like
    const handleDoubleTap = () => {
        if (!isLiked) toggleLike();
        setShowDoubleTapHeart(true);
        setTimeout(() => setShowDoubleTapHeart(false), 800);
    };

    const isOwnPost = user?.username === post?.username;

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-bg-body flex flex-col">
                <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06] px-4 h-14 flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="h-4 w-16 skeleton" />
                </div>
                <div className="max-w-2xl mx-auto w-full p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-full skeleton" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3.5 w-28 skeleton" />
                            <div className="h-3 w-16 skeleton" />
                        </div>
                    </div>
                    <div className="w-full aspect-[4/5] skeleton rounded-2xl mb-4" />
                    <div className="space-y-2">
                        <div className="h-3 w-36 skeleton" />
                        <div className="h-3 w-full skeleton" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !post) {
        return (
            <div className="min-h-screen bg-bg-body flex flex-col items-center justify-center gap-4 animate-fade-in p-4">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-text-tertiary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 21h18M3 3h18" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Post Not Found</h3>
                <p className="text-text-tertiary text-sm text-center max-w-xs">{error || "This post may have been deleted or doesn't exist."}</p>
                <button onClick={() => router.push("/")} className="mt-4 px-6 py-2.5 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-xl text-sm">
                    Go Home
                </button>
            </div>
        );
    }

    const avatarUrl = post.avatarUrl || "/default_avatar.svg";

    return (
        <div className="min-h-screen bg-bg-body pb-24 md:pb-8 animate-fade-in">

            {/* Sticky Header */}
            <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] active:scale-95 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-bold text-white">Post</h1>
                    </div>
                    <div className="relative">
                        <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                            <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {showMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                                <div className="absolute right-0 top-full mt-2 w-52 bg-[#111] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-50 animate-fade-in py-1">
                                    <button onClick={handleShare} className="w-full px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/[0.06] transition-colors flex items-center gap-3">
                                        <LinkIcon className="w-4.5 h-4.5 text-text-secondary" />
                                        Copy Link
                                    </button>
                                    {isOwnPost && (
                                        <button onClick={handleDelete} disabled={isDeleting} className="w-full px-4 py-3 text-left text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3">
                                            {isDeleting ? (
                                                <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                            ) : (
                                                <TrashIcon className="w-4.5 h-4.5" />
                                            )}
                                            Delete Post
                                        </button>
                                    )}
                                    {!isOwnPost && (
                                        <button onClick={() => { setShowMenu(false); showToast("info", "Report submitted"); }} className="w-full px-4 py-3 text-left text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3">
                                            <FlagIcon className="w-4.5 h-4.5" />
                                            Report Post
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="max-w-2xl mx-auto">

                {/* Post Author Header */}
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href={`/profile/${post.username}`} className="flex items-center gap-3 group">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-accent-primary/50 transition-all">
                            <Image src={avatarUrl} alt={post.username} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[15px] text-white group-hover:text-accent-primary transition-colors">
                                    {post.username}
                                </span>
                                {post.isVerified && <Badge level={post.verificationLevel} className="w-4 h-4" />}
                            </div>
                            <div className="flex items-center gap-2">
                                {post.location && (
                                    <span className="text-[12px] text-accent-primary font-medium">{post.location}</span>
                                )}
                                <span className="text-[11px] text-text-tertiary">
                                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Media */}
                {post.mediaUrl && (
                    <div className="relative w-full bg-bg-surface overflow-hidden" onDoubleClick={handleDoubleTap}>
                        {post.mediaType === "video" ? (
                            <video src={post.mediaUrl} controls className="w-full max-h-[70vh] object-contain bg-black" />
                        ) : (
                            <div className="relative w-full aspect-[4/5]">
                                <Image src={post.mediaUrl} alt="Post content" fill className="object-cover" unoptimized />
                            </div>
                        )}

                        {/* Double-tap heart animation */}
                        {showDoubleTapHeart && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <HeartIconSolid className="w-24 h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-scale-in" />
                            </div>
                        )}
                    </div>
                )}

                {/* Actions Bar */}
                <div className="px-4 py-3 flex justify-between items-center">
                    <div className="flex gap-3">
                        <div className="inline-flex items-center gap-1.5">
                            <button onClick={toggleLike} className="transition-transform active:scale-75 hover:scale-110 p-0.5 group">
                                {isLiked ? (
                                    <HeartIconSolid className="w-7 h-7 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                ) : (
                                    <HeartIcon className="w-7 h-7 text-white group-hover:text-red-400 transition-colors" />
                                )}
                            </button>
                            {likeCount > 0 && (
                                <button onClick={() => setShowLikesModal(true)} className="font-bold text-[13px] text-white hover:underline transition-all active:scale-95 select-none">
                                    {likeCount.toLocaleString()} {likeCount === 1 ? 'like' : 'likes'}
                                </button>
                            )}
                        </div>

                        <button onClick={() => commentInputRef.current?.focus()} className="transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center gap-1.5 group">
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
                {post.caption && (
                    <div className="px-4 pb-3">
                        <div className="text-[14px] leading-relaxed">
                            <Link href={`/profile/${post.username}`} className="font-bold mr-2 hover:underline text-white">
                                {post.username}
                            </Link>
                            <span className="text-text-secondary whitespace-pre-wrap">{post.caption}</span>
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                <div className="border-t border-white/[0.06]">
                    <div className="px-4 py-3">
                        <h3 className="text-[12px] font-bold text-text-tertiary uppercase tracking-wider">
                            Comments {commentCount > 0 && `(${commentCount})`}
                        </h3>
                    </div>

                    {/* Comment List */}
                    <div className="flex flex-col">
                        {commentsLoading ? (
                            <div className="px-4 space-y-4 pb-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-9 h-9 rounded-full skeleton shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-24 skeleton" />
                                            <div className="h-3 w-full skeleton" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : commentsList.length === 0 ? (
                            <div className="px-4 py-8 text-center">
                                <p className="text-text-tertiary text-sm">No comments yet. Be the first to comment!</p>
                            </div>
                        ) : (
                            <div className="px-4 pb-4 space-y-1">
                                {commentsList.map((comment) => {
                                    const cAvatar = comment.avatar_url || "/default_avatar.svg";
                                    const canDelete = user?.username === comment.username || isOwnPost;
                                    return (
                                        <div key={comment.id} className="flex gap-3 py-2.5 group hover:bg-white/[0.02] rounded-xl px-2 -mx-2 transition-colors">
                                            <Link href={`/profile/${comment.username}`} className="shrink-0 mt-0.5">
                                                <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/[0.06]">
                                                    <Image src={cAvatar} alt={comment.username} width={36} height={36} className="w-full h-full object-cover" unoptimized />
                                                </div>
                                            </Link>
                                            <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                                                <div>
                                                    <div className="text-[14px] leading-relaxed">
                                                        <Link href={`/profile/${comment.username}`} className="font-bold text-white hover:underline mr-1.5 inline-flex items-center gap-1">
                                                            {comment.username}
                                                            {comment.is_verified && <Badge level={comment.verification_level} className="w-3.5 h-3.5" />}
                                                        </Link>
                                                        <span className="text-text-secondary">{comment.content}</span>
                                                    </div>
                                                    <span className="text-[11px] text-text-tertiary mt-0.5 block">
                                                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                                    </span>
                                                </div>
                                                {canDelete && (
                                                    <button 
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className="p-1.5 text-text-tertiary hover:text-red-400 hover:bg-white/[0.06] rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                        title="Delete comment"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Comment Input - Fixed at bottom on mobile */}
                <div className="fixed bottom-0 left-0 right-0 md:static md:border-t border-white/[0.06] bg-black/95 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none z-20 safe-area-bottom">
                    <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                            <Image src={user?.avatarUrl || "/default_avatar.svg"} alt="You" width={36} height={36} className="object-cover w-full h-full" unoptimized />
                        </div>
                        <input
                            ref={commentInputRef}
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    submitComment();
                                }
                            }}
                            placeholder="Add a comment..."
                            className="bg-white/[0.04] border border-white/[0.06] flex-1 text-[13px] outline-none text-white placeholder:text-text-tertiary rounded-full px-4 py-2.5 focus:border-accent-primary/30 transition-colors"
                        />
                        <button
                            onClick={submitComment}
                            disabled={!commentText.trim() || isSubmittingComment}
                            className="text-accent-primary font-bold text-[13px] uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors px-2 py-1"
                        >
                            {isSubmittingComment ? (
                                <div className="w-4 h-4 border-2 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin" />
                            ) : (
                                "Post"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <LikesModal
                postId={post.id}
                isOpen={showLikesModal}
                onClose={() => setShowLikesModal(false)}
            />
        </div>
    );
}
