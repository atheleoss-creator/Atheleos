"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";
import { formatDistanceToNow } from "date-fns";

interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow';
    is_read: boolean;
    post_id: number | null;
    created_at: string;
    actor_username: string;
    actor_name: string;
    actor_avatar: string;
}

const FILTERS = ["All", "Likes", "Comments", "Follows"];

export default function NotificationsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("All");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchNotifications();

        // Mark all as read after a short delay
        const timer = setTimeout(async () => {
            await fetch('/api/notifications', { method: 'PUT' }).catch(() => {});
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border-2 border-bg-body">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    </div>
                );
            case 'comment':
                return (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-bg-body">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'follow':
                return (
                    <div className="absolute -bottom-1 -right-1 bg-accent-primary rounded-full p-1 border-2 border-bg-body">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                            <path d="M6.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM3.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM19.75 7.5a.75.75 0 0 0-1.5 0v2.25H16a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H22a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
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

    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-20 md:pb-10 font-sans">

            {/* Header */}
            <div className="sticky top-0 z-20 bg-bg-body/95 backdrop-blur-md border-b border-border-color pt-4 px-4 pb-2">
                <div className="flex items-center gap-3 pb-3">
                    <button onClick={() => router.back()} className="text-text-primary hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold tracking-wide">Notifications</h1>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto hidden-scrollbar mt-1">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-colors ${activeFilter === filter
                                    ? 'bg-white text-black'
                                    : 'bg-bg-surface text-text-secondary hover:bg-white/10'
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
                    <div className="text-center py-16 text-text-secondary">
                        <div className="text-4xl mb-3">🔔</div>
                        <p className="font-medium">No notifications yet</p>
                        <p className="text-sm text-text-muted mt-1">When someone interacts with you, it will show up here.</p>
                    </div>
                )}

                {filteredNotifications.map((notif) => {
                    const avatarUrl = notif.actor_avatar || `https://ui-avatars.com/api/?name=${notif.actor_username}&background=random`;

                    return (
                        <div
                            key={notif.id}
                            className={`flex items-start gap-3 p-4 border-b border-border-color hover:bg-bg-surface/50 cursor-pointer transition-colors ${!notif.is_read ? "bg-accent-primary/5" : ""}`}
                        >
                            {/* Avatar with icon badge */}
                            <div className="relative w-12 h-12 rounded-full shrink-0">
                                <Image
                                    src={avatarUrl}
                                    alt={notif.actor_username}
                                    width={48} height={48}
                                    className="w-full h-full object-cover rounded-full"
                                    unoptimized
                                />
                                {renderIcon(notif.type)}
                            </div>

                            {/* Center Content */}
                            <div className="flex-1 min-w-0 pr-2">
                                <p className="text-[14px] leading-snug">
                                    <Link href={`/profile/${notif.actor_username}`} className="font-bold cursor-pointer hover:underline">{notif.actor_username}</Link>
                                    {" "}
                                    <span className={!notif.is_read ? "text-white" : "text-text-secondary"}>
                                        {getMessage(notif.type)}
                                    </span>
                                </p>
                                <p className="text-[13px] text-text-secondary mt-1">
                                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                </p>
                            </div>

                            {/* Follow back button for follow notifications */}
                            {notif.type === 'follow' && (
                                <button className="shrink-0 bg-accent-primary text-bg-body text-[13px] font-bold px-4 py-1.5 rounded-md hover:bg-white transition-colors">
                                    Follow
                                </button>
                            )}

                            {/* Unread indicator */}
                            {!notif.is_read && (
                                <div className="w-2 h-2 shrink-0 bg-blue-500 rounded-full mt-2" />
                            )}
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
