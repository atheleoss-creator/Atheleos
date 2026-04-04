"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Story {
    id: number;
    mediaUrl: string;
    mediaType: "image" | "video";
    createdAt: string;
    expiresAt: string;
}

interface StoryGroup {
    userId: number;
    username: string;
    avatarUrl: string;
    fullName: string;
    isVerified: boolean;
    verificationLevel: string;
    stories: Story[];
}

export default function Stories() {
    const { user } = useAuth();
    const router = useRouter();
    const { showToast } = useNotification();
    const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
    const [loading, setLoading] = useState(true);

    // Story viewer
    const [viewerOpen, setViewerOpen] = useState(false);
    const [activeGroupIdx, setActiveGroupIdx] = useState(0);
    const [activeStoryIdx, setActiveStoryIdx] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef<NodeJS.Timeout | null>(null);
    const storyDuration = 5000; // 5 seconds per story

    // Upload
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function fetchStories() {
            try {
                const res = await fetch("/api/stories");
                if (res.ok) {
                    const data = await res.json();
                    setStoryGroups(data.storyGroups || []);
                }
            } catch {
                // Silent fail — stories are non-critical
            } finally {
                setLoading(false);
            }
        }
        fetchStories();
    }, []);

    // Story upload
    const handleAddStory = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url } = await uploadRes.json();

            const mediaType = file.type.startsWith("video/") ? "video" : "image";
            const storyRes = await fetch("/api/stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mediaUrl: url, mediaType }),
            });

            if (storyRes.ok) {
                showToast("success", "Story posted!", "Your story is now live for 24 hours");
                // Refresh stories
                const res = await fetch("/api/stories");
                if (res.ok) {
                    const data = await res.json();
                    setStoryGroups(data.storyGroups || []);
                }
            }
        } catch {
            showToast("error", "Failed to post story");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // Story viewer controls
    const openStory = (groupIdx: number) => {
        setActiveGroupIdx(groupIdx);
        setActiveStoryIdx(0);
        setProgress(0);
        setViewerOpen(true);
    };

    const closeViewer = () => {
        setViewerOpen(false);
        if (progressTimer.current) clearInterval(progressTimer.current);
    };

    const nextStory = () => {
        const group = storyGroups[activeGroupIdx];
        if (activeStoryIdx < group.stories.length - 1) {
            setActiveStoryIdx((prev) => prev + 1);
            setProgress(0);
        } else if (activeGroupIdx < storyGroups.length - 1) {
            setActiveGroupIdx((prev) => prev + 1);
            setActiveStoryIdx(0);
            setProgress(0);
        } else {
            closeViewer();
        }
    };

    const prevStory = () => {
        if (activeStoryIdx > 0) {
            setActiveStoryIdx((prev) => prev - 1);
            setProgress(0);
        } else if (activeGroupIdx > 0) {
            setActiveGroupIdx((prev) => prev - 1);
            const prevGroup = storyGroups[activeGroupIdx - 1];
            setActiveStoryIdx(prevGroup.stories.length - 1);
            setProgress(0);
        }
    };

    // Auto-advance progress
    useEffect(() => {
        if (!viewerOpen) return;

        if (progressTimer.current) clearInterval(progressTimer.current);

        const startTime = Date.now();
        progressTimer.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min(100, (elapsed / storyDuration) * 100);
            setProgress(pct);
            if (pct >= 100) {
                nextStory();
            }
        }, 50);

        return () => {
            if (progressTimer.current) clearInterval(progressTimer.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewerOpen, activeGroupIdx, activeStoryIdx]);

    const activeGroup = storyGroups[activeGroupIdx];
    const activeStory = activeGroup?.stories?.[activeStoryIdx];

    return (
        <>
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide animate-fade-in">
                {/* Add Story */}
                <div className="flex flex-col items-center gap-1.5 min-w-[72px] cursor-pointer group" onClick={() => user ? fileInputRef.current?.click() : router.push('/login')}>
                    <div className="relative w-[68px] h-[68px] rounded-full p-[2px] border-2 border-white/[0.08] group-hover:border-accent-primary/50 transition-all duration-200">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-bg-surface">
                            <Image src={user?.avatarUrl || "/default_avatar.svg"} alt="Add Story" fill className="object-cover opacity-70 group-hover:opacity-90 transition-opacity" unoptimized />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                {uploading ? (
                                    <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-accent-primary flex items-center justify-center text-white text-lg font-bold shadow-[0_0_10px_rgba(0,212,255,0.4)] border-2 border-black">
                                        +
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <span className="text-[11px] text-text-secondary font-medium truncate w-full text-center">Your Story</span>
                    <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleAddStory} className="hidden" />
                </div>

                {/* Loading skeleton */}
                {loading && [1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 min-w-[72px]">
                        <div className="w-[68px] h-[68px] rounded-full skeleton" />
                        <div className="h-3 w-12 skeleton rounded" />
                    </div>
                ))}

                {/* Story Groups */}
                {!loading && storyGroups.map((group, idx) => (
                    <div
                        key={group.userId}
                        className="flex flex-col items-center gap-1.5 min-w-[72px] cursor-pointer group"
                        onClick={() => openStory(idx)}
                    >
                        <div className="relative w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-accent-primary via-purple-500 to-pink-500 group-hover:shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all">
                            <div className="w-full h-full rounded-full overflow-hidden relative bg-bg-body border-[2.5px] border-black">
                                <Image src={group.avatarUrl} alt={group.username} fill className="object-cover" unoptimized />
                            </div>
                        </div>
                        <span className="text-[11px] text-text-secondary font-medium truncate w-full text-center group-hover:text-white transition-colors">
                            {group.username}
                        </span>
                    </div>
                ))}
            </div>

            {/* Story Viewer Modal */}
            {viewerOpen && activeGroup && activeStory && (
                <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center" onClick={closeViewer}>
                    <div className="relative w-full h-full max-w-lg mx-auto flex flex-col" onClick={(e) => e.stopPropagation()}>

                        {/* Progress Bars */}
                        <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 px-2 pt-2">
                            {activeGroup.stories.map((_, idx) => (
                                <div key={idx} className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full transition-none"
                                        style={{
                                            width: idx < activeStoryIdx ? "100%" : idx === activeStoryIdx ? `${progress}%` : "0%",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Story Header */}
                        <div className="absolute top-3 left-0 right-0 z-30 flex items-center justify-between px-4 pt-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/20">
                                    <Image src={activeGroup.avatarUrl} alt={activeGroup.username} width={36} height={36} className="w-full h-full object-cover" unoptimized />
                                </div>
                                <div>
                                    <span className="text-white text-[14px] font-bold">{activeGroup.username}</span>
                                    <span className="text-white/50 text-[12px] ml-2">
                                        {activeStory.createdAt && formatTimeAgo(activeStory.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <button onClick={closeViewer} className="p-2 text-white/70 hover:text-white transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Story Media */}
                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                            {activeStory.mediaType === "video" ? (
                                <video src={activeStory.mediaUrl} autoPlay muted className="w-full h-full object-contain" />
                            ) : (
                                <Image src={activeStory.mediaUrl} alt="Story" fill className="object-contain" unoptimized />
                            )}
                        </div>

                        {/* Navigation areas */}
                        <div className="absolute inset-0 flex z-20">
                            <div className="w-1/3 h-full cursor-pointer" onClick={prevStory} />
                            <div className="w-1/3 h-full" />
                            <div className="w-1/3 h-full cursor-pointer" onClick={nextStory} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function formatTimeAgo(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffH = Math.floor(diffMs / (1000 * 60 * 60));
        const diffM = Math.floor(diffMs / (1000 * 60));
        if (diffH >= 1) return `${diffH}h`;
        if (diffM >= 1) return `${diffM}m`;
        return "now";
    } catch {
        return "";
    }
}
