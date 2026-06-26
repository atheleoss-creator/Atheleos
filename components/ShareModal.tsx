"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon, MagnifyingGlassIcon, PaperAirplaneIcon, CheckIcon, LinkIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/Badge";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

interface ShareUser {
    id: number;
    username: string;
    full_name: string;
    avatar_url: string;
    is_verified: boolean;
    verification_level: string;
}

interface ShareModalProps {
    postId: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function ShareModal({ postId, isOpen, onClose }: ShareModalProps) {
    const { user: currentUser } = useAuth();
    const { showToast } = useNotification();

    const [users, setUsers] = useState<ShareUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<ShareUser[] | null>(null);
    const [searching, setSearching] = useState(false);
    const [sentUserIds, setSentUserIds] = useState<Record<number, boolean>>({});
    const [sendingId, setSendingId] = useState<number | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
    const postUrl = `${baseUrl}/post/${postId}`;

    // Fetch initial list (followed users first, fallback to suggested)
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("");
            setSearchResults(null);
            setSentUserIds({});
            return;
        }

        let isMounted = true;
        const fetchInitialUsers = async () => {
            setLoading(true);
            try {
                let fetchedUsers: ShareUser[] = [];
                if (currentUser?.id) {
                    const res = await fetch(`/api/follow/list?userId=${currentUser.id}&type=following`);
                    if (res.ok) {
                        const data = await res.json();
                        fetchedUsers = data.users || [];
                    }
                }

                // If not logged in or following nobody, get suggested users
                if (fetchedUsers.length === 0) {
                    const suggRes = await fetch('/api/users/suggested');
                    if (suggRes.ok) {
                        const suggData = await suggRes.json();
                        fetchedUsers = suggData.users || [];
                    }
                }

                if (isMounted) setUsers(fetchedUsers);
            } catch (err) {
                console.error("Failed to load users for share modal", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchInitialUsers();
        return () => { isMounted = false; };
    }, [isOpen, currentUser]);

    // Handle Search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults(null);
            setSearching(false);
            return;
        }

        const timer = setTimeout(async () => {
            setSearching(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
                if (res.ok) {
                    const data = await res.json();
                    setSearchResults(data.users || []);
                } else {
                    setSearchResults([]);
                }
            } catch {
                setSearchResults([]);
            } finally {
                setSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    if (!isOpen) return null;

    const displayedUsers = searchResults !== null 
        ? searchResults 
        : users.filter(u => 
            u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (u.full_name && u.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
          );

    const handleSendDirect = async (targetUser: ShareUser) => {
        if (sendingId === targetUser.id || sentUserIds[targetUser.id]) return;
        if (!currentUser) {
            showToast("error", "Please log in to send messages");
            return;
        }

        setSendingId(targetUser.id);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetUserId: targetUser.id,
                    content: postUrl
                })
            });

            if (res.ok) {
                setSentUserIds(prev => ({ ...prev, [targetUser.id]: true }));
                showToast("success", `Sent to @${targetUser.username}!`);
            } else {
                showToast("error", "Failed to send message");
            }
        } catch {
            showToast("error", "Failed to send message");
        } finally {
            setSendingId(null);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(postUrl);
            showToast("success", "Link copied!", "Post URL copied to clipboard");
        } catch {
            showToast("error", "Failed to copy link");
        }
    };

    const socialApps = [
        {
            name: "Copy link",
            icon: (
                <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10">
                    <LinkIcon className="w-6 h-6" />
                </div>
            ),
            onClick: handleCopyLink
        },
        {
            name: "WhatsApp",
            icon: (
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors flex items-center justify-center text-[#25D366] border border-[#25D366]/30">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.793 1.394.88.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.601.723 4.913 2.034 1.312 1.311 2.033 3.057 2.033 4.913-.001 3.825-3.111 6.933-6.946 6.933z"/>
                    </svg>
                </div>
            ),
            onClick: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "X",
            icon: (
                <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </div>
            ),
            onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "Facebook",
            icon: (
                <div className="w-12 h-12 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/30 transition-colors flex items-center justify-center text-[#1877F2] border border-[#1877F2]/30">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </div>
            ),
            onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "Email",
            icon: (
                <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10">
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                </div>
            ),
            onClick: () => window.open(`mailto:?subject=${encodeURIComponent("Check out this post on Atheleos")}&body=${encodeURIComponent(postUrl)}`, "_blank")
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="bg-[#121212] border border-white/[0.1] rounded-3xl w-full max-w-md mx-4 max-h-[85vh] flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.9)]" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                        <PaperAirplaneIcon className="w-5 h-5 text-accent-primary -rotate-45" />
                        <h3 className="text-base font-black text-white tracking-wide">Share</h3>
                    </div>
                    <button onClick={onClose} className="text-text-tertiary hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 pb-2">
                    <div className="relative flex items-center">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3.5 text-text-tertiary" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search athletes..."
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-text-tertiary outline-none focus:border-accent-primary/50 transition-colors"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="absolute right-3 text-text-tertiary hover:text-white text-xs bg-white/10 w-5 h-5 rounded-full flex items-center justify-center">
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto px-2 py-2 min-h-[220px] max-h-[380px] no-scrollbar">
                    {loading || searching ? (
                        <div className="p-4 space-y-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="w-11 h-11 rounded-full skeleton shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3.5 w-32 skeleton" />
                                        <div className="h-2.5 w-20 skeleton" />
                                    </div>
                                    <div className="w-16 h-8 rounded-xl skeleton shrink-0" />
                                </div>
                            ))}
                        </div>
                    ) : displayedUsers.length === 0 ? (
                        <div className="py-16 text-center flex flex-col items-center justify-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-text-tertiary mb-1">
                                <MagnifyingGlassIcon className="w-6 h-6 opacity-60" />
                            </div>
                            <span className="text-white font-bold text-sm">No users found</span>
                            <span className="text-text-tertiary text-xs max-w-[200px]">
                                {searchQuery ? `We couldn't find anyone matching "${searchQuery}"` : "Follow other athletes to share highlights with them."}
                            </span>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {displayedUsers.map(u => {
                                const avatarFullUrl = u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}&background=random`;
                                const isSent = sentUserIds[u.id];
                                const isSending = sendingId === u.id;
                                const isMe = currentUser?.username === u.username;

                                if (isMe) return null;

                                return (
                                    <div key={u.id} className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                                        <Link href={`/profile/${u.username}`} onClick={onClose} className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-white/[0.08] bg-bg-surface">
                                            <Image src={avatarFullUrl} alt={u.username} width={44} height={44} className="w-full h-full object-cover" unoptimized />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-bold text-white text-[14px] truncate">
                                                    {u.full_name || u.username}
                                                </span>
                                                {u.is_verified && <Badge level={u.verification_level} className="w-3.5 h-3.5 shrink-0" />}
                                            </div>
                                            <span className="text-[12px] text-text-tertiary truncate block">@{u.username}</span>
                                        </div>
                                        <button
                                            onClick={() => handleSendDirect(u)}
                                            disabled={isSent || isSending}
                                            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all active:scale-95 flex items-center justify-center gap-1.5 min-w-[76px] ${
                                                isSent
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-accent-primary text-black hover:bg-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                                            }`}
                                        >
                                            {isSending ? (
                                                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            ) : isSent ? (
                                                <>
                                                    <CheckIcon className="w-4 h-4 stroke-[3]" />
                                                    <span>Sent</span>
                                                </>
                                            ) : (
                                                <span>Send</span>
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Bottom Social Quick Actions */}
                <div className="p-4 bg-black/40 border-t border-white/[0.08]">
                    <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-3 px-1">Share via</div>
                    <div className="flex items-center gap-4 overflow-x-auto pb-1 px-1 no-scrollbar">
                        {socialApps.map((app, idx) => (
                            <button
                                key={idx}
                                onClick={app.onClick}
                                className="flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform"
                            >
                                {app.icon}
                                <span className="text-[11px] text-text-secondary group-hover:text-white transition-colors select-none whitespace-nowrap">
                                    {app.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
