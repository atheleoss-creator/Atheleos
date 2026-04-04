"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/Badge";
import { useAuth } from "@/context/AuthContext";

interface LikeUser {
    id: number;
    username: string;
    full_name: string;
    avatar_url: string;
    is_verified: boolean;
    verification_level: string;
    is_following: boolean;
}

interface LikesModalProps {
    postId: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function LikesModal({ postId, isOpen, onClose }: LikesModalProps) {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<LikeUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // Follow toggle states
    const [followLoadingId, setFollowLoadingId] = useState<number | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;
        const fetchLikes = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/posts/${postId}/likes`);
                if (!res.ok) throw new Error("Failed to load likes");
                const data = await res.json();
                if (isMounted) setUsers(data.users || []);
            } catch (err) {
                if (isMounted) setError("Could not load users.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchLikes();

        return () => { isMounted = false; };
    }, [postId, isOpen]);

    if (!isOpen) return null;

    const handleFollowToggle = async (targetId: number, currentFollowState: boolean) => {
        if (followLoadingId === targetId) return;
        setFollowLoadingId(targetId);

        // Optimistic UI update
        setUsers(prev => prev.map(u => u.id === targetId ? { ...u, is_following: !currentFollowState } : u));

        try {
            const res = await fetch('/api/follow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: targetId })
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(prev => prev.map(u => u.id === targetId ? { ...u, is_following: data.following } : u));
            } else {
                // Revert
                setUsers(prev => prev.map(u => u.id === targetId ? { ...u, is_following: currentFollowState } : u));
            }
        } catch {
            // Revert
            setUsers(prev => prev.map(u => u.id === targetId ? { ...u, is_following: currentFollowState } : u));
        } finally {
            setFollowLoadingId(null);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-[#111] border border-white/[0.08] rounded-2xl w-full max-w-sm mx-4 max-h-[70vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Likes</h3>
                    <button onClick={onClose} className="text-text-tertiary hover:text-white transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="w-11 h-11 rounded-full skeleton shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-28 skeleton" />
                                        <div className="h-3 w-20 skeleton" />
                                    </div>
                                    <div className="w-20 h-8 rounded-lg skeleton shrink-0" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="py-10 text-center text-red-400 text-sm">{error}</div>
                    ) : users.length === 0 ? (
                        <div className="py-12 text-center text-text-tertiary text-sm font-medium">
                            No likes yet.
                        </div>
                    ) : (
                        <div className="p-2 space-y-0.5">
                            {users.map(u => {
                                const isMe = currentUser?.id === u.id || currentUser?.username === u.username;
                                const avatarFullUrl = u.avatar_url || "/default_avatar.svg";

                                return (
                                    <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors">
                                        <Link href={`/profile/${u.username}`} onClick={onClose} className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-white/[0.06]">
                                            <Image src={avatarFullUrl} alt={u.username} width={44} height={44} className="w-full h-full object-cover" unoptimized />
                                        </Link>
                                        <Link href={`/profile/${u.username}`} onClick={onClose} className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-bold text-white text-[14px] truncate flex items-center gap-1">
                                                    {u.username}
                                                </span>
                                                {u.is_verified && <Badge level={u.verification_level} className="w-3.5 h-3.5" />}
                                            </div>
                                            <span className="text-[12px] text-text-tertiary truncate">{u.full_name || u.username}</span>
                                        </Link>
                                        {!isMe && (
                                            <button
                                                onClick={() => handleFollowToggle(u.id, u.is_following)}
                                                disabled={followLoadingId === u.id}
                                                className={`shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold tracking-wide uppercase transition-all active:scale-95 flex items-center justify-center min-w-[90px] ${
                                                    u.is_following
                                                        ? 'bg-white/[0.06] border border-white/[0.1] text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                                                        : 'bg-accent-primary text-white shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                                                }`}
                                            >
                                                {followLoadingId === u.id ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : u.is_following ? 'Following' : 'Follow'}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
