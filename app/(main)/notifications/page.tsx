"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon, ChatBubbleLeftIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";

interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow';
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

const FILTERS = ["All", "Likes", "Comments", "Follows"];

export default function NotificationsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("All");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications || []);
            }
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (id: number) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, is_read: true } : n)
        );
        try {
            await fetch('/api/notifications', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const markAllAsRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        try {
            await fetch('/api/notifications', { method: 'PUT' });
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const handleNotificationClick = (notif: Notification) => {
        if (!notif.is_read) {
            markAsRead(notif.id);
        }
        
        if (notif.type === 'follow') {
            router.push(`/profile/${notif.actor_username}`);
        } else if (notif.post_id) {
            // Can link to a post modal or feed via query parameters
            router.push(`/profile/${notif.actor_username}`);
        } else {
            router.push(`/profile/${notif.actor_username}`);
        }
    };

    const handleFollowBack = async (e: React.MouseEvent, targetId: number, index: number) => {
        e.stopPropagation();
        try {
            await fetch('/api/follow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: targetId })
            });
            // Update ui locally 
            const actorUserName = notifications[index].actor_username;
            alert(`You have followed ${actorUserName}`);
        } catch (error) {
            console.error("Error following", error);
        }
    };

    const getMessage = (type: string) => {
        switch (type) {
            case 'like': return 'liked your post.';
            case 'comment': return 'commented on your post.';
            case 'follow': return 'started following you.';
            default: return 'interacted with your profile.';
        }
    };

    const renderIcon = (type: string) => {
        switch (type) {
            case 'like':
                return (
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border-[2.5px] border-bg-body shadow-sm">
                        <HeartIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                );
            case 'comment':
                return (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-[2.5px] border-bg-body shadow-sm">
                        <ChatBubbleLeftIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                );
            case 'follow':
                return (
                    <div className="absolute -bottom-1 -right-1 bg-accent-primary rounded-full p-1 border-[2.5px] border-bg-body shadow-sm">
                        <UserPlusIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                );
            default: return null;
        }
    };

    const filteredNotifications = notifications.filter(notif => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Likes") return notif.type === 'like';
        if (activeFilter === "Comments") return notif.type === 'comment';
        if (activeFilter === "Follows") return notif.type === 'follow';
        return true;
    });

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-20 md:pb-10 font-sans">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-bg-body/95 backdrop-blur-md border-b border-border-color pt-4 px-4 pb-2">
                <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="text-text-primary hover:bg-white/10 p-1.5 -ml-1.5 rounded-full transition-colors">
                            <ArrowLeftIcon className="w-6 h-6 stroke-2" />
                        </button>
                        <h1 className="text-xl font-bold tracking-wide">Notifications</h1>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button 
                            onClick={markAllAsRead}
                            className="text-accent-primary hover:text-white text-[13px] font-bold transition-colors flex items-center gap-1.5"
                        >
                            <CheckCircleIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Mark all read</span>
                        </button>
                    )}
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto hidden-scrollbar mt-1 pb-1">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-colors ${activeFilter === filter
                                    ? 'bg-white text-black'
                                    : 'bg-bg-surface text-text-secondary hover:bg-white/10 border border-transparent hover:border-border-color'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notification List */}
            <div className="flex flex-col">
                {loading && (
                    <div className="text-center py-10 text-text-secondary animate-pulse">Loading notifications...</div>
                )}

                {!loading && filteredNotifications.length === 0 && (
                    <div className="text-center py-16 text-text-secondary flex flex-col items-center">
                        <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🔔</span>
                        </div>
                        <p className="font-semibold text-lg text-white">No notifications yet</p>
                        <p className="text-sm text-text-muted mt-1 max-w-xs mx-auto">When someone interacts with you, it will show up here.</p>
                    </div>
                )}

                {!loading && filteredNotifications.map((notif, index) => {
                    const avatarUrl = notif.actor_avatar && notif.actor_avatar.startsWith('http') 
                        ? notif.actor_avatar 
                        : (notif.actor_avatar ? notif.actor_avatar : `https://ui-avatars.com/api/?name=${notif.actor_username}&background=random`);

                    return (
                        <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`flex items-start gap-3 p-4 border-b border-border-color hover:bg-bg-surface/60 cursor-pointer transition-all ${
                                !notif.is_read ? "bg-accent-primary/5" : ""
                            }`}
                        >
                            {/* Avatar with icon badge */}
                            <div className="relative w-12 h-12 shrink-0 group">
                                <Image
                                    src={avatarUrl}
                                    alt={notif.actor_username}
                                    width={48} height={48}
                                    className="w-full h-full object-cover rounded-full group-hover:opacity-90 transition-opacity"
                                    unoptimized
                                />
                                {renderIcon(notif.type)}
                            </div>

                            {/* Center Content */}
                            <div className="flex-1 min-w-0 pr-2 pt-0.5">
                                <p className="text-[14.5px] leading-snug">
                                    <span className="font-bold cursor-pointer hover:underline text-white">
                                        {notif.actor_username}
                                    </span>
                                    {" "}
                                    <span className={!notif.is_read ? "text-white opacity-95" : "text-text-secondary"}>
                                        {getMessage(notif.type)}
                                    </span>
                                </p>
                                <p className={`text-[13px] mt-1 font-medium ${!notif.is_read ? "text-accent-primary" : "text-text-muted"}`}>
                                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                </p>
                            </div>

                            {/* Right Side Actions / Media Preview */}
                            <div className="shrink-0 flex items-center gap-3">
                                {notif.type === 'follow' && (
                                    <button 
                                        onClick={(e) => handleFollowBack(e, notif.actor_id, index)} 
                                        className="bg-accent-primary text-black text-[13px] font-bold px-4 py-1.5 rounded-full hover:bg-white transition-colors"
                                    >
                                        Follow Back
                                    </button>
                                )}
                                
                                {/* Show thumbnail for post events if media exists */}
                                {notif.post_media && (notif.type === 'like' || notif.type === 'comment') && (
                                    <div className="w-12 h-12 rounded-md overflow-hidden bg-bg-surface border border-border-color shrink-0">
                                        {notif.post_media_type === 'video' ? (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs">
                                                🎬
                                            </div>
                                        ) : (
                                            <Image 
                                                src={notif.post_media} 
                                                alt="Post" 
                                                width={48} 
                                                height={48} 
                                                className="w-full h-full object-cover" 
                                                unoptimized
                                            />
                                        )}
                                    </div>
                                )}
                                
                                {!notif.is_read && notif.type !== 'follow' && !notif.post_media && (
                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full ml-1 self-center shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx global>{`
                .hidden-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hidden-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
