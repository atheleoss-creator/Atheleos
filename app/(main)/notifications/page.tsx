"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

/* ─── Types ─── */
interface Notification {
    id: number;
    type: "like" | "comment" | "follow";
    is_read: boolean;
    post_id: number | null;
    created_at: string;
    actor_id: number;
    actor_username: string;
    actor_name: string;
    actor_avatar: string;
    post_media: string | null;
    post_media_type: string | null;
}

/* ─── Filter config ─── */
const FILTERS = [
    { label: "All", value: "all" },
    { label: "Likes", value: "like", icon: "♥" },
    { label: "Comments", value: "comment", icon: "💬" },
    { label: "Follows", value: "follow", icon: "👤" },
] as const;

/* ─── Inline Icons (no external dependency issues) ─── */
const HeartBadge = () => (
    <div className="notif-badge notif-badge--like">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
    </div>
);

const CommentBadge = () => (
    <div className="notif-badge notif-badge--comment">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
        </svg>
    </div>
);

const FollowBadge = () => (
    <div className="notif-badge notif-badge--follow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M6.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM3.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM19.75 7.5a.75.75 0 0 0-1.5 0v2.25H16a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H22a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>
    </div>
);

const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

/* ─── Component ─── */
export default function NotificationsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("all");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [followedIds, setFollowedIds] = useState<Set<number>>(new Set());
    const [followLoading, setFollowLoading] = useState<Set<number>>(new Set());

    /* ─── Fetch ─── */
    const fetchNotifications = useCallback(async () => {
        try {
            const res = await fetch("/api/notifications");
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications || []);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    /* ─── Mark as read (single) ─── */
    const markAsRead = async (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );
        try {
            await fetch("/api/notifications", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
        } catch (err) {
            console.error("Failed to mark as read", err);
        }
    };

    /* ─── Mark ALL as read ─── */
    const markAllAsRead = async () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        try {
            await fetch("/api/notifications", { method: "PUT" });
        } catch (err) {
            console.error("Failed to mark all as read", err);
        }
    };

    /* ─── Click handler ─── */
    const handleNotificationClick = (notif: Notification) => {
        if (!notif.is_read) markAsRead(notif.id);
        router.push(`/profile/${notif.actor_username}`);
    };

    /* ─── Follow / Unfollow ─── */
    const handleFollowToggle = async (e: React.MouseEvent, actorId: number) => {
        e.stopPropagation();

        setFollowLoading((prev) => new Set(prev).add(actorId));

        try {
            const res = await fetch("/api/follow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetUserId: actorId }),
            });

            if (res.ok) {
                const data = await res.json();
                setFollowedIds((prev) => {
                    const next = new Set(prev);
                    if (data.following) {
                        next.add(actorId);
                    } else {
                        next.delete(actorId);
                    }
                    return next;
                });
            }
        } catch (error) {
            console.error("Follow error", error);
        } finally {
            setFollowLoading((prev) => {
                const next = new Set(prev);
                next.delete(actorId);
                return next;
            });
        }
    };

    /* ─── Message text ─── */
    const getMessage = (type: string) => {
        switch (type) {
            case "like":
                return "liked your post";
            case "comment":
                return "commented on your post";
            case "follow":
                return "started following you";
            default:
                return "interacted with your profile";
        }
    };

    /* ─── Icon badge ─── */
    const renderBadge = (type: string) => {
        switch (type) {
            case "like":
                return <HeartBadge />;
            case "comment":
                return <CommentBadge />;
            case "follow":
                return <FollowBadge />;
            default:
                return null;
        }
    };

    /* ─── Filtering ─── */
    const filteredNotifications = notifications.filter((n) =>
        activeFilter === "all" ? true : n.type === activeFilter
    );

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    /* ─── Avatar URL helper ─── */
    const getAvatar = (notif: Notification) => {
        if (notif.actor_avatar && notif.actor_avatar !== "/default_avatar.svg") {
            return notif.actor_avatar;
        }
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(notif.actor_name || notif.actor_username)}&background=1a1a1a&color=fff&bold=true&size=96`;
    };

    /* ─── Render ─── */
    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-24 md:pb-10">

            {/* ── Sticky Header ── */}
            <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-2xl mx-auto px-4">

                    {/* Title Row */}
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.back()}
                                className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] active:scale-95 transition-all"
                            >
                                <ArrowLeft />
                            </button>
                            <h1 className="text-lg font-bold">Notifications</h1>
                            {unreadCount > 0 && (
                                <span className="notif-unread-badge">
                                    {unreadCount > 99 ? "99+" : unreadCount}
                                </span>
                            )}
                        </div>

                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-1.5 text-[13px] font-semibold text-accent-primary hover:text-white transition-colors active:scale-95"
                            >
                                <CheckIcon />
                                <span className="hidden sm:inline">Mark all read</span>
                            </button>
                        )}
                    </div>

                    {/* Filter Chips */}
                    <div className="flex gap-2 pb-3 overflow-x-auto hidden-scrollbar">
                        {FILTERS.map((f) => {
                            const count =
                                f.value === "all"
                                    ? notifications.length
                                    : notifications.filter((n) => n.type === f.value).length;
                            return (
                                <button
                                    key={f.value}
                                    onClick={() => setActiveFilter(f.value)}
                                    className={`notif-chip ${activeFilter === f.value ? "notif-chip--active" : ""}`}
                                >
                                    {f.label}
                                    {count > 0 && (
                                        <span className={`text-[11px] ml-1 ${activeFilter === f.value ? "text-black/60" : "text-text-muted"}`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* ── Notification List ── */}
            <main className="max-w-2xl mx-auto">

                {/* Loading skeletons */}
                {loading && (
                    <div className="flex flex-col">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.04]">
                                <div className="w-12 h-12 rounded-full skeleton shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 w-3/4 skeleton" />
                                    <div className="h-3 w-1/3 skeleton" />
                                </div>
                                <div className="w-11 h-11 rounded-lg skeleton shrink-0" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && filteredNotifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 px-6 animate-fade-in">
                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-text-tertiary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </div>
                        <p className="text-lg font-bold text-white mb-1">
                            {activeFilter === "all" ? "No notifications yet" : `No ${activeFilter} notifications`}
                        </p>
                        <p className="text-sm text-text-muted text-center max-w-xs">
                            When someone interacts with your profile or posts, you&apos;ll see it here.
                        </p>
                    </div>
                )}

                {/* Notification items */}
                {!loading && filteredNotifications.length > 0 && (
                    <div className="flex flex-col">
                        {filteredNotifications.map((notif) => {
                            const isFollowed = followedIds.has(notif.actor_id);
                            const isFollowLoading = followLoading.has(notif.actor_id);

                            return (
                                <div
                                    key={notif.id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`notif-item ${!notif.is_read ? "notif-item--unread" : ""}`}
                                >
                                    {/* Unread accent line */}
                                    {!notif.is_read && <div className="notif-accent-line" />}

                                    {/* Avatar + badge */}
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/[0.08]">
                                            <Image
                                                src={getAvatar(notif)}
                                                alt={notif.actor_username}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        {renderBadge(notif.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[14px] leading-[1.45]">
                                            <span className="font-bold text-white hover:underline">
                                                {notif.actor_username}
                                            </span>{" "}
                                            <span className={!notif.is_read ? "text-text-primary" : "text-text-secondary"}>
                                                {getMessage(notif.type)}
                                            </span>
                                        </p>
                                        <p className={`text-[12px] mt-0.5 ${!notif.is_read ? "text-accent-primary font-medium" : "text-text-muted"}`}>
                                            {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                        </p>
                                    </div>

                                    {/* Right side action / media */}
                                    <div className="shrink-0 flex items-center">
                                        {notif.type === "follow" ? (
                                            <button
                                                onClick={(e) => handleFollowToggle(e, notif.actor_id)}
                                                disabled={isFollowLoading}
                                                className={`notif-follow-btn ${isFollowed ? "notif-follow-btn--following" : ""}`}
                                            >
                                                {isFollowLoading ? (
                                                    <span className="notif-spinner" />
                                                ) : isFollowed ? (
                                                    "Following"
                                                ) : (
                                                    "Follow Back"
                                                )}
                                            </button>
                                        ) : notif.post_media ? (
                                            <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/[0.04] border border-white/[0.06] shrink-0">
                                                {notif.post_media_type === "video" ? (
                                                    <div className="w-full h-full flex items-center justify-center bg-white/[0.03]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-text-muted">
                                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={notif.post_media}
                                                        alt="Post"
                                                        width={44}
                                                        height={44}
                                                        className="w-full h-full object-cover"
                                                        unoptimized
                                                    />
                                                )}
                                            </div>
                                        ) : !notif.is_read ? (
                                            <div className="notif-dot" />
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* ── Scoped Styles ── */}
            <style jsx>{`
                /* Unread count badge */
                .notif-unread-badge {
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 1px 7px;
                    border-radius: 9999px;
                    min-width: 20px;
                    text-align: center;
                    letter-spacing: 0.02em;
                }

                /* Filter chip */
                .notif-chip {
                    padding: 6px 14px;
                    border-radius: 9999px;
                    font-size: 13px;
                    font-weight: 600;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                    background: rgba(255, 255, 255, 0.04);
                    color: var(--color-text-secondary);
                    border: 1px solid transparent;
                }
                .notif-chip:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: white;
                }
                .notif-chip--active {
                    background: white !important;
                    color: black !important;
                    border-color: transparent !important;
                }

                /* Notification item */
                .notif-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 16px;
                    position: relative;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
                }
                .notif-item:hover {
                    background: rgba(255, 255, 255, 0.03);
                }
                .notif-item--unread {
                    background: rgba(0, 212, 255, 0.03);
                }
                .notif-item--unread:hover {
                    background: rgba(0, 212, 255, 0.06);
                }

                /* Unread accent bar */
                .notif-accent-line {
                    position: absolute;
                    left: 0;
                    top: 8px;
                    bottom: 8px;
                    width: 3px;
                    border-radius: 0 3px 3px 0;
                    background: linear-gradient(180deg, #00d4ff, #7c3aed);
                }

                /* Type badge overlay */
                :global(.notif-badge) {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    padding: 3px;
                    border-radius: 9999px;
                    color: white;
                    border: 2.5px solid black;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                :global(.notif-badge--like) {
                    background: #ef4444;
                }
                :global(.notif-badge--comment) {
                    background: #3b82f6;
                }
                :global(.notif-badge--follow) {
                    background: linear-gradient(135deg, #00d4ff, #7c3aed);
                }

                /* Follow button */
                .notif-follow-btn {
                    padding: 6px 16px;
                    border-radius: 9999px;
                    font-size: 13px;
                    font-weight: 700;
                    transition: all 0.2s ease;
                    background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
                    color: white;
                    min-width: 100px;
                    text-align: center;
                    border: none;
                }
                .notif-follow-btn:hover {
                    filter: brightness(1.1);
                    transform: scale(1.02);
                }
                .notif-follow-btn:active {
                    transform: scale(0.97);
                }
                .notif-follow-btn--following {
                    background: transparent;
                    border: 1.5px solid rgba(255, 255, 255, 0.15);
                    color: var(--color-text-secondary);
                }
                .notif-follow-btn--following:hover {
                    border-color: #ef4444;
                    color: #ef4444;
                    filter: none;
                }
                .notif-follow-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                /* Spinner */
                .notif-spinner {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: notif-spin 0.6s linear infinite;
                }
                @keyframes notif-spin {
                    to { transform: rotate(360deg); }
                }

                /* Unread dot */
                .notif-dot {
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background: #00d4ff;
                    box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
                    flex-shrink: 0;
                }
            `}</style>
        </div>
    );
}
