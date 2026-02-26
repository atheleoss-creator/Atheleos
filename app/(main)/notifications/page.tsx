"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";

// Mocks
const FILTERS = ["All", "Mentions", "Likes", "Matches", "System"];

const MOCK_NOTIFICATIONS = [
    {
        id: "n1",
        type: "follow",
        user: { name: "Shikhar Dhawan", username: "shikhar_cricket", avatar: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=100&h=100&fit=crop" },
        time: "2m",
        content: "started following you.",
        unread: true,
    },
    {
        id: "n2",
        type: "like",
        user: { name: "FC Elite", username: "fc_elite", avatar: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop" },
        time: "1h",
        content: "liked your recent match highlight.",
        unread: true,
        postCover: "https://images.unsplash.com/photo-1518605368461-1bd49cece51f?w=100&h=100&fit=crop"
    },
    {
        id: "n3",
        type: "system",
        user: { name: "Atheleos Team", username: "atheleos_official", avatar: "" },
        time: "4h",
        content: "New Tournament: Mumbai Premier League registrations are now open! Register your squad today.",
        unread: false,
        isSystem: true
    },
    {
        id: "n4",
        type: "match",
        user: { name: "Match Updates", username: "updates", avatar: "" },
        time: "Yesterday",
        content: "Your upcoming match against Rangers FC starts in 24 hours.",
        unread: false,
    },
    {
        id: "n5",
        type: "mention",
        user: { name: "Rahul Singh", username: "rahul99", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" },
        time: "Yesterday",
        content: "mentioned you in a comment: \"Great game yesterday man!\"",
        unread: false,
    },
];

export default function NotificationsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("All");

    const renderIcon = (type: string) => {
        switch (type) {
            case 'like':
                return (
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border border-bg-body">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    </div>
                );
            case 'match':
                return (
                    <div className="absolute -bottom-1 -right-1 bg-accent-primary rounded-full p-1 border border-bg-body">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'system':
                return (
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-accent-primary/20 border-2 border-accent-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent-primary">
                            <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            default: return null;
        }
    }

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
                {MOCK_NOTIFICATIONS.map((notif, index) => {

                    // Filter Logic Array
                    if (activeFilter !== "All") {
                        if (activeFilter === "Mentions" && notif.type !== "mention") return null;
                        if (activeFilter === "Likes" && notif.type !== "like") return null;
                        if (activeFilter === "Matches" && notif.type !== "match") return null;
                        if (activeFilter === "System" && notif.type !== "system") return null;
                    }

                    return (
                        <div
                            key={notif.id}
                            className={`flex items-start gap-3 p-4 border-b border-border-color hover:bg-bg-surface/50 cursor-pointer transition-colors ${notif.unread ? "bg-accent-primary/5" : ""}`}
                        >
                            {/* Avatar or System Icon */}
                            {notif.isSystem ? (
                                renderIcon('system')
                            ) : (
                                <div className="relative w-12 h-12 rounded-full shrink-0 bg-gray-800">
                                    {notif.user.avatar ? (
                                        <Image
                                            src={notif.user.avatar}
                                            alt={notif.user.name}
                                            width={48} height={48}
                                            className="w-full h-full object-cover rounded-full"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-accent-primary to-purple-600 rounded-full" />
                                    )}
                                    {renderIcon(notif.type)}
                                </div>
                            )}

                            {/* Center Content */}
                            <div className="flex-1 min-w-0 pr-2">
                                <p className="text-[14px] leading-snug">
                                    <span className="font-bold cursor-pointer hover:underline">{notif.user.username}</span>
                                    {" "}
                                    <span className={notif.unread ? "text-white" : "text-text-secondary"}>
                                        {notif.content}
                                    </span>
                                </p>
                                <p className="text-[13px] text-text-secondary mt-1">{notif.time}</p>
                            </div>

                            {/* Right Action (Follow Back, or Post Thumbnail) */}
                            {notif.type === 'follow' && (
                                <button className="shrink-0 bg-accent-primary text-bg-body text-[13px] font-bold px-4 py-1.5 rounded-md hover:bg-white transition-colors">
                                    Follow
                                </button>
                            )}
                            {notif.type === 'like' && notif.postCover && (
                                <div className="w-11 h-11 shrink-0 bg-gray-800 rounded-sm overflow-hidden">
                                    <Image
                                        src={notif.postCover}
                                        alt="Post"
                                        width={44} height={44}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>
                            )}

                            {/* Blue Dot Unread Indicator */}
                            {notif.unread && (
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
