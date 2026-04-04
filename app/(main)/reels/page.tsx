"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import Badge from "@/components/Badge";
import LikesModal from "@/components/LikesModal";

export default function ReelsPage() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [reels, setReels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [renderedCopies, setRenderedCopies] = useState(2);

    useEffect(() => {
        async function fetchReels() {
            try {
                const res = await fetch('/api/posts/reels');
                if (res.ok) {
                    const data = await res.json();
                    setReels(data.reels || []);
                }
            } catch (error) {
                console.error('Failed to fetch reels', error);
            } finally {
                setLoading(false);
            }
        }
        fetchReels();
    }, []);

    const handleScroll = () => {
        if (!containerRef.current || reels.length === 0) return;
        const container = containerRef.current;
        const scrollPosition = container.scrollTop;
        const height = container.clientHeight;
        const totalReels = reels.length;
        const rawIndex = Math.round(scrollPosition / height);
        if (rawIndex !== activeIndex) setActiveIndex(rawIndex);

        // Append more copies seamlessly when nearing the bottom
        if (rawIndex >= (renderedCopies - 1) * totalReels - 2) {
            setRenderedCopies(prev => prev + 1);
        }
    };

    // On mount, start at the very first reel
    useEffect(() => {
        if (containerRef.current && reels.length > 0) {
            containerRef.current.scrollTop = 0;
        }
    }, [reels]);

    if (loading) {
        return (
            <div className="bg-black text-white w-full h-[calc(100dvh-128px)] md:h-[calc(100dvh-80px)] flex items-center justify-center -mt-[72px] md:-mt-[80px] pt-[72px] md:pt-[80px] -mb-24 md:-mb-8 pb-24 md:pb-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-text-tertiary text-sm font-medium">Loading reels...</span>
                </div>
            </div>
        );
    }

    if (reels.length === 0) {
        return (
            <div className="bg-black text-white w-full h-[calc(100dvh-128px)] md:h-[calc(100dvh-80px)] flex items-center justify-center -mt-[72px] md:-mt-[80px] pt-[72px] md:pt-[80px] -mb-24 md:-mb-8 pb-24 md:pb-8">
                <div className="text-center animate-fade-in px-6">
                    <div className="w-24 h-24 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-text-tertiary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">No Reels Yet</h2>
                    <p className="text-text-secondary text-sm mb-6 max-w-xs mx-auto">Upload a video post to see it here as a reel!</p>
                    <button onClick={() => router.push('/create-post')} className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all active:scale-95">
                        Upload Video
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white w-full h-[100dvh] overflow-hidden flex justify-center relative -mt-[72px] md:-mt-[80px] -mb-24 md:-mb-8">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-[68px] md:top-[96px] left-4 z-50 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-all active:scale-90"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </button>

            {/* Reels Title */}
            <div className="absolute top-[68px] md:top-[96px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
                <span className="text-white font-bold text-lg drop-shadow-lg">Reels</span>
                <div className="w-2 h-2 bg-accent-primary rounded-full shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
            </div>



            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full max-w-[500px] h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide relative"
            >
                {/* Dynamically append copies for a smooth infinite loop downwards */}
                {Array.from({ length: renderedCopies }).flatMap((_, copy) =>
                    reels.map((reel: any, index: number) => {
                        const absoluteIndex = copy * reels.length + index;
                        return (
                            <ReelItem
                                key={`${copy}-${reel.id}`}
                                data={reel}
                                isActive={absoluteIndex === activeIndex}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

/* ─── Single Reel Item ─── */
function ReelItem({ data, isActive }: { data: any; isActive: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const { user } = useAuth();
    const { showToast } = useNotification();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLiked, setIsLiked] = useState(!!data.isLiked);
    const [likeCount, setLikeCount] = useState(data.likes || 0);

    // Likes Modal
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [isSaved, setIsSaved] = useState(!!data.isSaved);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [commentCount, setCommentCount] = useState(data.comments || 0);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [captionExpanded, setCaptionExpanded] = useState(false);

    const lastTapTime = useRef(0);
    const progressRef = useRef<NodeJS.Timeout | null>(null);

    // Play/pause based on active state
    useEffect(() => {
        if (!videoRef.current) return;
        if (isActive) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            videoRef.current.currentTime = 0;
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    // Progress tracking
    useEffect(() => {
        if (!isActive) return;
        progressRef.current = setInterval(() => {
            if (videoRef.current && videoRef.current.duration) {
                setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
            }
        }, 100);
        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [isActive]);

    // Toggle play
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
        setShowPlayIcon(true);
        setTimeout(() => setShowPlayIcon(false), 600);
    };

    // Handle tap (single = play/pause, double = like)
    const handleTap = () => {
        const now = Date.now();
        if (now - lastTapTime.current < 300) {
            // Double tap
            handleDoubleTapLike();
            lastTapTime.current = 0;
        } else {
            lastTapTime.current = now;
            setTimeout(() => {
                if (lastTapTime.current !== 0 && Date.now() - lastTapTime.current >= 280) {
                    togglePlay();
                }
            }, 300);
        }
    };

    // Double-tap like
    const handleDoubleTapLike = () => {
        if (!isLiked) {
            toggleLike();
        }
        setShowDoubleTapHeart(true);
        setTimeout(() => setShowDoubleTapHeart(false), 800);
    };

    // Like
    const toggleLike = async () => {
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
        try {
            const res = await fetch(`/api/posts/${data.id}/like`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
            if (newLiked) showToast("like", "Reel liked!");
        } catch {
            setIsLiked(!newLiked);
            setLikeCount(likeCount);
        }
    };

    // Save
    const toggleSave = async () => {
        const newSaved = !isSaved;
        setIsSaved(newSaved);
        try {
            const res = await fetch(`/api/posts/${data.id}/save`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
            showToast("save", newSaved ? "Reel saved!" : "Reel unsaved");
        } catch {
            setIsSaved(!newSaved);
        }
    };

    // Share
    const handleShare = async () => {
        const url = `${window.location.origin}/post/${data.id}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: `Reel by @${data.username}`, url });
            } else {
                await navigator.clipboard.writeText(url);
                showToast("success", "Link copied!", "Reel URL copied to clipboard");
            }
        } catch {
            try {
                await navigator.clipboard.writeText(url);
                showToast("success", "Link copied!");
            } catch {/* silent */}
        }
    };

    // Open comments drawer
    const openComments = async () => {
        setShowComments(true);
        if (comments.length === 0) {
            setCommentsLoading(true);
            try {
                const res = await fetch(`/api/posts/${data.id}/comments`);
                if (res.ok) {
                    const d = await res.json();
                    setComments(d.comments || []);
                }
            } catch {
                // silent
            } finally {
                setCommentsLoading(false);
            }
        }
    };

    // Submit comment
    const submitComment = async () => {
        if (!commentText.trim() || isSubmittingComment) return;
        setIsSubmittingComment(true);
        try {
            const res = await fetch(`/api/posts/${data.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: commentText }),
            });
            if (res.ok) {
                setComments((prev) => [...prev, {
                    id: Date.now(),
                    content: commentText,
                    created_at: new Date().toISOString(),
                    username: user?.username || "you",
                    full_name: user?.fullName || "",
                    avatar_url: user?.avatarUrl || "/default_avatar.svg",
                    is_verified: user?.isVerified || false,
                    verification_level: user?.verificationLevel || "unverified",
                }]);
                setCommentText("");
                setCommentCount((c: number) => c + 1);
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
            const res = await fetch(`/api/posts/${data.id}/comments?commentId=${commentId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setComments((prev) => prev.filter((c: any) => c.id !== commentId));
                setCommentCount((c: number) => c - 1);
                showToast("success", "Comment deleted");
            } else {
                showToast("error", "Failed to delete comment");
            }
        } catch {
            showToast("error", "Failed to delete comment");
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const formatTimeAgo = (dateStr: string) => {
        try {
            const diff = Date.now() - new Date(dateStr).getTime();
            const mins = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);
            if (days > 0) return `${days}d`;
            if (hours > 0) return `${hours}h`;
            if (mins > 0) return `${mins}m`;
            return "now";
        } catch { return ""; }
    };

    const avatarUrl = data.avatar_url || `https://ui-avatars.com/api/?name=${data.username}&background=1a1a1a&color=fff&bold=true`;

    return (
        <div className="relative w-full h-full snap-start bg-black flex items-center justify-center overflow-hidden">
            {/* Video */}
            <video
                ref={videoRef}
                src={data.media_url}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={handleTap}
            />

            {/* Play/Pause indicator */}
            {showPlayIcon && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-20 h-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center animate-scale-in">
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                </div>
            )}

            {/* Double-tap heart */}
            {showDoubleTapHeart && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-28 h-28 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-scale-in">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </div>
            )}

            {/* Sound toggle */}
            <div className="absolute top-[104px] md:top-[96px] right-4 z-30">
                <button onClick={() => setIsMuted(!isMuted)} className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/15 hover:bg-black/60 transition-all active:scale-90">
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Video progress bar */}
            <div className="absolute bottom-[72px] md:bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10">
                <div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-none"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-[65%] md:h-[55%] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            {/* Bottom info */}
            <div className="absolute bottom-[82px] md:bottom-5 left-4 right-[72px] flex flex-col gap-3 z-10">
                {/* User info */}
                <div className="flex items-center gap-3">
                    <Link href={`/profile/${data.username}`} className="shrink-0">
                        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 bg-gray-800 shadow-lg hover:border-accent-primary/50 transition-all">
                            <Image src={avatarUrl} alt={data.username} width={44} height={44} className="object-cover w-full h-full" unoptimized />
                        </div>
                    </Link>
                    <div className="flex flex-col min-w-0">
                        <Link href={`/profile/${data.username}`} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                            <span className="text-white font-bold text-[15px] drop-shadow-lg truncate">
                                @{data.username}
                            </span>
                            {data.is_verified && <Badge level={data.verification_level || "blue"} className="w-4 h-4 drop-shadow-lg" />}
                        </Link>
                        {data.full_name && (
                            <span className="text-white/50 text-[12px] font-medium drop-shadow truncate">{data.full_name}</span>
                        )}
                    </div>
                </div>

                {/* Caption */}
                {data.caption && (
                    <div onClick={() => setCaptionExpanded(!captionExpanded)} className="cursor-pointer">
                        <p className={`text-white/90 text-[13px] leading-relaxed drop-shadow-md font-medium ${captionExpanded ? '' : 'line-clamp-2'}`}>
                            {data.caption}
                        </p>
                        {data.caption.length > 80 && !captionExpanded && (
                            <span className="text-white/50 text-[12px] font-semibold">more</span>
                        )}
                    </div>
                )}
            </div>

            {/* Action sidebar */}
            <div className="absolute bottom-[82px] md:bottom-5 right-2 flex flex-col items-center gap-5 z-10 w-[60px]">
                {/* Like */}
                <div className="flex flex-col items-center gap-1">
                    <button onClick={toggleLike} className="active:scale-75 transition-transform">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${isLiked ? 'bg-red-500/20 border border-red-500/30' : 'bg-black/30 border border-white/15'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke={isLiked ? "none" : "white"} strokeWidth="2" className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'text-white'}`}>
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </div>
                    </button>
                    {likeCount > 0 ? (
                        <button onClick={() => setShowLikesModal(true)} className="text-white text-[12px] font-bold drop-shadow-lg hover:underline transition-all">
                            {formatNumber(likeCount)}
                        </button>
                    ) : (
                        <span className="text-white text-[12px] font-bold drop-shadow-lg">{formatNumber(likeCount)}</span>
                    )}
                </div>

                {/* Comment */}
                <button onClick={openComments} className="flex flex-col items-center gap-1 active:scale-75 transition-transform">
                    <div className="w-12 h-12 bg-black/30 border border-white/15 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                    </div>
                    <span className="text-white text-[12px] font-bold drop-shadow-lg">{formatNumber(commentCount)}</span>
                </button>

                {/* Share */}
                <button onClick={handleShare} className="flex flex-col items-center gap-1 active:scale-75 transition-transform">
                    <div className="w-12 h-12 bg-black/30 border border-white/15 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6 -rotate-45 -mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </div>
                </button>

                {/* Save */}
                <button onClick={toggleSave} className="flex flex-col items-center gap-1 active:scale-75 transition-transform">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${isSaved ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-black/30 border border-white/15'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke={isSaved ? "none" : "white"} className={`w-6 h-6 transition-colors ${isSaved ? 'text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'text-white'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* ─── Comments Drawer ─── */}
            {showComments && (
                <div className="absolute inset-0 z-50 flex items-end" onClick={() => setShowComments(false)}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Drawer */}
                    <div
                        className="relative w-full max-h-[65vh] bg-[#111] border-t border-white/[0.08] rounded-t-3xl flex flex-col overflow-hidden animate-slide-up z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Handle */}
                        <div className="flex items-center justify-center pt-3 pb-1">
                            <div className="w-10 h-1 bg-white/20 rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                            <h3 className="text-white font-bold text-base">Comments ({commentCount})</h3>
                            <button onClick={() => setShowComments(false)} className="p-1.5 text-text-tertiary hover:text-white transition-colors rounded-full hover:bg-white/[0.06]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
                            {commentsLoading ? (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full skeleton shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-20 skeleton" />
                                            <div className="h-3 w-full skeleton" />
                                        </div>
                                    </div>
                                ))
                            ) : comments.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-text-tertiary text-sm">No comments yet. Be the first!</p>
                                </div>
                            ) : (
                                comments.map((c: any) => {
                                    const canDelete = user?.username === c.username || user?.username === data.username;
                                    return (
                                        <div key={c.id} className="flex gap-3 group hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-colors">
                                            <Link href={`/profile/${c.username}`} className="shrink-0 mt-0.5">
                                                <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/[0.06]">
                                                    <Image src={c.avatar_url || "/default_avatar.svg"} alt={c.username} width={32} height={32} className="w-full h-full object-cover" unoptimized />
                                                </div>
                                            </Link>
                                            <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                                                <div>
                                                    <div className="text-[13px]">
                                                        <Link href={`/profile/${c.username}`} className="font-bold text-white mr-1.5 hover:underline inline-flex items-center gap-1">
                                                            {c.username}
                                                            {c.is_verified && <Badge level={c.verification_level} className="w-3 h-3" />}
                                                        </Link>
                                                        <span className="text-text-secondary">{c.content}</span>
                                                    </div>
                                                    <span className="text-[11px] text-text-tertiary mt-0.5 block">{formatTimeAgo(c.created_at)}</span>
                                                </div>
                                                {canDelete && (
                                                    <button 
                                                        onClick={() => handleDeleteComment(c.id)}
                                                        className="p-1.5 text-text-tertiary hover:text-red-400 hover:bg-white/[0.06] rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                        title="Delete comment"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Comment Input */}
                        <div className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-3 bg-[#111]">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                                <Image src={user?.avatarUrl || "/default_avatar.svg"} alt="You" width={32} height={32} className="w-full h-full object-cover" unoptimized />
                            </div>
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitComment(); } }}
                                placeholder="Add a comment..."
                                className="bg-white/[0.04] border border-white/[0.06] flex-1 text-[13px] outline-none text-white placeholder:text-text-tertiary rounded-full px-4 py-2.5 focus:border-accent-primary/30 transition-colors"
                            />
                            <button
                                onClick={submitComment}
                                disabled={!commentText.trim() || isSubmittingComment}
                                className="text-accent-primary font-bold text-[13px] disabled:opacity-30 hover:text-white transition-colors"
                            >
                                {isSubmittingComment ? (
                                    <div className="w-4 h-4 border-2 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin" />
                                ) : "Post"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <LikesModal
                postId={data.id}
                isOpen={showLikesModal}
                onClose={() => setShowLikesModal(false)}
            />
        </div>
    );
}
