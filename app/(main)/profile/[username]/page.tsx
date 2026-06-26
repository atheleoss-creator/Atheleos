"use client";

import React, { use, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
    CreateIcon,
    HamburgerIcon
} from "@/components/Icons";
import Badge from "@/components/Badge";
import {
    Squares2X2Icon,
    InformationCircleIcon,
    TrophyIcon,
    TrashIcon,
    UserIcon,
    MapPinIcon,
    CalendarDaysIcon,
    SparklesIcon,
    XMarkIcon,
    CameraIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";

interface FollowUser {
    id: number;
    username: string;
    full_name: string;
    avatar_url: string;
    is_verified: boolean;
    verification_level: string;
    is_following: boolean;
}

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = use(params);
    const { user: currentUser, updateProfile } = useAuth();

    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("posts");

    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    // Followers/Following modal
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [followModalType, setFollowModalType] = useState<"followers" | "following">("followers");
    const [followList, setFollowList] = useState<FollowUser[]>([]);
    const [followListLoading, setFollowListLoading] = useState(false);
    const [followStates, setFollowStates] = useState<Record<number, boolean>>({});

    // Follow toggle in modal
    const [followLoadingId, setFollowLoadingId] = useState<number | null>(null);

    // Delete post
    const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

    // Avatar upload
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [avatarUploading, setAvatarUploading] = useState(false);

    // Messaging
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [sendingMessage, setSendingMessage] = useState(false);
    const router = require("next/navigation").useRouter();

    const isOwnProfile = currentUser?.username === username;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await fetch(`/api/profile/${username}`);
                if (!res.ok) throw new Error("Profile not found");
                const data = await res.json();
                setProfile(data.profile);

                if (data.profile?.id) {
                    const followRes = await fetch(`/api/follow?targetUserId=${data.profile.id}`);
                    if (followRes.ok) {
                        const followData = await followRes.json();
                        setIsFollowing(followData.following);
                    }
                }
            } catch {
                setError("Unable to load profile data.");
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [username]);

    const toggleFollow = async () => {
        if (!profile?.id || followLoading) return;
        setFollowLoading(true);
        setIsFollowing(!isFollowing);
        try {
            const res = await fetch('/api/follow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: profile.id })
            });
            if (!res.ok) throw new Error('Failed');
            const data = await res.json();
            setIsFollowing(data.following);
        } catch {
            setIsFollowing(isFollowing);
        } finally {
            setFollowLoading(false);
        }
    };

    // Followers/Following modal handlers
    const openFollowModal = async (type: "followers" | "following") => {
        setFollowModalType(type);
        setShowFollowModal(true);
        setFollowListLoading(true);
        try {
            const res = await fetch(`/api/follow/list?userId=${profile.id}&type=${type}`);
            if (res.ok) {
                const data = await res.json();
                const users = data.users || [];
                setFollowList(users);
                const states: Record<number, boolean> = {};
                users.forEach((u: FollowUser) => { states[u.id] = u.is_following; });
                setFollowStates(states);
            }
        } catch (err) {
            console.error('Failed to load follow list', err);
        } finally {
            setFollowListLoading(false);
        }
    };

    // Toggle follow from modal
    const handleModalFollow = async (targetId: number) => {
        if (followLoadingId) return;
        setFollowLoadingId(targetId);
        const prev = followStates[targetId];
        setFollowStates(s => ({ ...s, [targetId]: !prev }));
        try {
            const res = await fetch('/api/follow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: targetId })
            });
            if (res.ok) {
                const data = await res.json();
                setFollowStates(s => ({ ...s, [targetId]: data.following }));
            } else {
                setFollowStates(s => ({ ...s, [targetId]: prev }));
            }
        } catch {
            setFollowStates(s => ({ ...s, [targetId]: prev }));
        } finally {
            setFollowLoadingId(null);
        }
    };

    // Delete post handler
    const handleDeletePost = async (postId: number) => {
        if (!confirm('Delete this post? This cannot be undone.')) return;
        setDeletingPostId(postId);
        try {
            const res = await fetch(`/api/posts?id=${postId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed');
            setProfile((prev: any) => ({
                ...prev,
                posts: prev.posts.filter((p: any) => p.id !== postId)
            }));
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setDeletingPostId(null);
        }
    };

    // Avatar upload handler
    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatarUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
            if (!uploadRes.ok) throw new Error('Upload failed');
            const { url } = await uploadRes.json();

            const editRes = await fetch('/api/profile/edit', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatar_url: url })
            });
            if (!editRes.ok) throw new Error('Save failed');

            setProfile((prev: any) => ({ ...prev, avatar_url: url }));
            // Sync to AuthContext so Navbar/Sidebar update instantly
            updateProfile({ avatarUrl: url });
        } catch (err) {
            console.error('Avatar upload failed:', err);
        } finally {
            setAvatarUploading(false);
        }
    };

    // Message submit handler
    const handleSendMessageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim() || sendingMessage || !profile?.id) return;
        setSendingMessage(true);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: profile.id, content: messageText })
            });
            if (!res.ok) throw new Error('Failed to send message');
            const data = await res.json();
            if (data.success) {
                setShowMessageModal(false);
                setMessageText("");
                router.push("/messages");
            }
        } catch (err) {
            console.error('Message send failed:', err);
            alert("Failed to send message. Please try again.");
        } finally {
            setSendingMessage(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-body flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-bg-body flex flex-col items-center justify-center gap-4 animate-fade-in">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-text-tertiary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Profile Not Found</h3>
                <p className="text-text-tertiary text-sm">This user doesn&apos;t seem to exist.</p>
            </div>
        );
    }

    const avatarUrl = profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.username}&background=random`;

    const tabs = [
        { id: 'posts', label: 'Posts', icon: Squares2X2Icon },
        { id: 'about', label: 'About', icon: UserIcon },
        { id: 'player_card', label: 'Player Card', icon: InformationCircleIcon },
        { id: 'highlights', label: 'Highlights', icon: SparklesIcon },
    ];

    return (
        <div className="pb-24 md:pb-8 min-h-screen bg-bg-body animate-fade-in">
            {/* Mobile Top Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-[56px] bg-black/80 backdrop-blur-xl z-50 flex items-center justify-between px-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-1">
                    <h1 className="text-lg font-bold text-white">{profile.username}</h1>
                    {profile.is_verified && <Badge level={profile.verification_level} className="w-5 h-5" />}
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/create-post" className="text-white p-1.5 hover:bg-white/5 rounded-xl">
                        <CreateIcon className="w-6 h-6" />
                    </Link>
                    {isOwnProfile && (
                        <div className="relative">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-1.5 hover:bg-white/5 rounded-xl focus:outline-none flex items-center justify-center">
                                <HamburgerIcon className="w-6 h-6" />
                            </button>
                            {isMobileMenuOpen && (
                                <div className="absolute top-full mt-2 right-0 w-48 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[100] flex flex-col py-1 animate-fade-in origin-top-right">
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/settings" className="px-4 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71-.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 py-2 md:px-8 mt-14 md:mt-6 relative z-20">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">

                    {/* Avatar & Name */}
                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4 md:mb-0">
                        <div className="relative shrink-0 group/avatar w-max">
                            <div className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-2xl p-[3px] bg-gradient-to-tr from-accent-primary via-purple-500 to-accent-secondary shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                                <div className="w-full h-full rounded-[13px] border-4 border-bg-body overflow-hidden relative bg-bg-surface">
                                    <Image src={avatarUrl} alt={profile.username} fill className="object-cover" unoptimized />
                                    {avatarUploading && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Upload button (own profile only) */}
                            {isOwnProfile && (
                                <>
                                    <input
                                        ref={avatarInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        onChange={handleAvatarUpload}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => avatarInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 md:-bottom-1 md:-right-1 w-7 h-7 md:w-9 md:h-9 bg-accent-primary rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent-primary/30 border-2 border-bg-body hover:scale-110 active:scale-95 transition-transform"
                                    >
                                        <CameraIcon className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col pb-2">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
                                    {profile.full_name || profile.username}
                                </h1>
                                {profile.is_verified && profile.verification_level && <Badge level={profile.verification_level} className="w-6 h-6" />}
                            </div>
                            <span className="text-sm md:text-base text-accent-primary font-bold tracking-wide">@{profile.username}</span>

                            {profile.recruiting_status && profile.recruiting_status !== 'Not Looking' && (
                                <div className={`inline-flex w-fit px-3 py-1 mt-2 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-sm ${profile.recruiting_status === 'Signed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                    'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'}`}>
                                    {profile.recruiting_status}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pb-2">
                        {isOwnProfile ? (
                            <>
                                <Link href="/edit-profile" className="py-2.5 px-6 bg-white/[0.06] border border-white/[0.08] text-white font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-white/[0.1] transition-all shadow-sm">
                                    Edit Profile
                                </Link>
                                {/* <Link href="/settings" className="hidden md:flex py-2.5 px-6 bg-white/[0.06] border border-white/[0.08] text-white font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-white/[0.1] transition-all shadow-sm items-center justify-center">
                                    Settings
                                </Link> */}
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleFollow}
                                    disabled={followLoading}
                                    className={`py-2.5 px-7 font-bold text-sm tracking-wider uppercase rounded-xl transition-all ${isFollowing
                                        ? 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                                        : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]'
                                        }`}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>

                                {isFollowing && (
                                    <button
                                        onClick={() => setShowMessageModal(true)}
                                        className="py-2.5 px-4 bg-white/[0.06] border border-white/[0.08] text-white font-bold rounded-xl hover:bg-white/[0.1] hover:border-accent-primary/50 transition-all flex items-center justify-center"
                                        title="Send Message"
                                    >
                                        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-accent-primary" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats — clickable */}
                <div className="flex flex-wrap gap-3 mb-5 mt-3">
                    <div className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center gap-2 backdrop-blur-sm">
                        <span className="font-black text-lg text-white">{profile.posts?.length || 0}</span>
                        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">Posts</span>
                    </div>
                    <button onClick={() => openFollowModal('followers')} className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center gap-2 backdrop-blur-sm hover:bg-white/[0.06] hover:border-accent-primary/20 transition-all cursor-pointer">
                        <span className="font-black text-lg text-white">{profile.followersCount || 0}</span>
                        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">Followers</span>
                    </button>
                    <button onClick={() => openFollowModal('following')} className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center gap-2 backdrop-blur-sm hover:bg-white/[0.06] hover:border-accent-primary/20 transition-all cursor-pointer">
                        <span className="font-black text-lg text-white">{profile.followingCount || 0}</span>
                        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">Following</span>
                    </button>
                </div>

                {profile.bio && (
                    <div className="text-[14px] text-text-secondary whitespace-pre-wrap leading-relaxed max-w-2xl mb-5">
                        {profile.bio}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-white/[0.06] bg-black/60 backdrop-blur-xl z-10 px-4 md:px-8 sticky top-[56px] md:top-[64px]">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 py-4 border-b-2 font-bold text-[13px] tracking-wider uppercase whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-accent-primary text-accent-primary" : "border-transparent text-text-tertiary hover:text-white"}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 py-5 md:px-8 min-h-[50vh]">

                {/* Posts Tab */}
                {activeTab === "posts" && (
                    <div className="grid grid-cols-3 gap-1 md:gap-3">
                        {profile.posts?.length > 0 ? profile.posts.map((post: any) => (
                            <Link key={post.id} href={`/post/${post.id}`} className="aspect-square relative group bg-bg-surface overflow-hidden rounded-lg md:rounded-xl border border-white/[0.04] hover:border-white/[0.1] transition-colors block">
                                {post.media_url ? (
                                    <>
                                        {post.media_type === 'video' ? (
                                            <video
                                                src={`${post.media_url}#t=0.001`}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                onMouseEnter={(e) => e.currentTarget.play().catch(() => { })}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.pause();
                                                    e.currentTarget.currentTime = 0;
                                                }}
                                            />
                                        ) : (
                                            <Image src={post.media_url} alt="Post" fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                                            <span className="text-white font-bold text-sm flex items-center gap-1">❤️ {post.likes_count || 0}</span>
                                            <span className="text-white font-bold text-sm flex items-center gap-1">💬 {post.comments_count || 0}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-3 w-full h-full flex items-center justify-center text-[12px] text-center text-text-secondary break-words line-clamp-4 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5">
                                        {post.caption}
                                    </div>
                                )}
                                {/* Delete button — own posts only */}
                                {isOwnProfile && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleDeletePost(post.id); }}
                                        disabled={deletingPostId === post.id}
                                        className="absolute top-2 right-2 w-8 h-8 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-300 transition-all z-10 border border-white/[0.06]"
                                        title="Delete post"
                                    >
                                        {deletingPostId === post.id ? (
                                            <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                        ) : (
                                            <TrashIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                )}
                            </Link>
                        )) : (
                            <div className="col-span-3 py-16 text-center animate-fade-in">
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                                    <Squares2X2Icon className="w-8 h-8 text-text-tertiary" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">No posts yet</h3>
                                <p className="text-sm text-text-tertiary">
                                    {isOwnProfile ? "Share your first highlight!" : `${profile.username} hasn't posted yet.`}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* About Tab */}
                {activeTab === "about" && (
                    <div className="max-w-2xl animate-fade-in flex flex-col gap-5">
                        {/* Bio Card */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-4">Bio</h3>
                            <p className="text-[15px] text-text-secondary leading-relaxed whitespace-pre-wrap">
                                {profile.bio || "No bio yet."}
                            </p>
                        </div>

                        {/* Details Card */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-5">Details</h3>
                            <div className="flex flex-col gap-4">
                                {profile.sport && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                                            <TrophyIcon className="w-5 h-5 text-accent-primary" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">Sport</div>
                                            <div className="text-white font-semibold text-[15px]">{profile.sport}{profile.position ? ` · ${profile.position}` : ''}</div>
                                        </div>
                                    </div>
                                )}
                                {(profile.city || profile.state) && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                                            <MapPinIcon className="w-5 h-5 text-accent-primary" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">Location</div>
                                            <div className="text-white font-semibold text-[15px]">{[profile.city, profile.state].filter(Boolean).join(', ')}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                                        <CalendarDaysIcon className="w-5 h-5 text-accent-primary" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">Joined</div>
                                        <div className="text-white font-semibold text-[15px]">
                                            {profile.created_at ? formatDistanceToNow(new Date(profile.created_at), { addSuffix: true }) : 'Unknown'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-accent-primary" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">Role</div>
                                        <div className="text-white font-semibold text-[15px] capitalize">{profile.role || 'Athlete'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recruiting */}
                        {profile.recruiting_status && profile.recruiting_status !== 'Not Looking' && (
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-4">Recruiting Status</h3>
                                <div className={`inline-flex px-4 py-2 rounded-xl text-sm font-bold ${profile.recruiting_status === 'Signed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                    profile.recruiting_status === 'Free Agent' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                        'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
                                    }`}>
                                    {profile.recruiting_status}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Player Card Tab */}
                {activeTab === "player_card" && (
                    <div className="flex flex-col gap-6 max-w-4xl animate-fade-in">
                        {/* Biometrics */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm overflow-hidden relative">
                            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-5">Physical Measurements</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {[
                                    { label: 'Sport', value: profile.sport || '--', sub: profile.position || '--' },
                                    { label: 'Height', value: profile.height || '--' },
                                    { label: 'Weight', value: profile.weight || '--' },
                                    { label: 'Location', value: profile.city ? `${profile.city}, ${profile.state}` : '--', small: true },
                                    { label: 'Top Speed', value: profile.top_speed || '--' },
                                    { label: 'Vertical', value: profile.vertical_leap || '--' },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06] hover:border-accent-primary/20 transition-colors">
                                        <div className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider mb-1.5">{item.label}</div>
                                        <div className={`font-black text-white ${item.small ? 'text-sm' : 'text-xl'}`}>{item.value}</div>
                                        {item.sub && <div className="text-sm text-accent-primary font-semibold mt-1">{item.sub}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trophy Cabinet */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-5 flex items-center gap-2">
                                <TrophyIcon className="w-5 h-5 text-accent-primary" /> Trophy Cabinet
                            </h3>
                            <div className="flex flex-col gap-3">
                                {profile.achievements && profile.achievements.length > 0 ? profile.achievements.map((achievement: any, idx: number) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.04] relative overflow-hidden group hover:border-accent-primary/20 transition-colors">
                                        {achievement.verified && (
                                            <div className="absolute top-3 right-3">
                                                <Badge level="international" className="w-5 h-5 opacity-60" />
                                            </div>
                                        )}
                                        <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20 shrink-0">
                                            <TrophyIcon className="w-6 h-6 text-accent-primary group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-white text-lg">{achievement.title}</span>
                                                <span className="text-[10px] font-medium text-text-tertiary bg-white/[0.06] px-2 py-0.5 rounded-md">{achievement.year}</span>
                                            </div>
                                            <p className="text-sm text-text-secondary mt-1">{achievement.description}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-text-tertiary text-sm">No achievements logged yet.</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Highlights Tab */}
                {activeTab === "highlights" && (
                    <div className="animate-fade-in">
                        {profile.posts?.filter((p: any) => p.media_url).length > 0 ? (
                            <div className="grid grid-cols-3 gap-1 md:gap-3">
                                {profile.posts.filter((p: any) => p.media_url).map((post: any) => (
                                    <Link key={post.id} href={`/post/${post.id}`} className="aspect-square relative group bg-bg-surface overflow-hidden rounded-lg md:rounded-xl border border-white/[0.04] hover:border-white/[0.1] transition-colors block">
                                        {post.media_type === 'video' ? (
                                            <video
                                                src={`${post.media_url}#t=0.001`}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                onMouseEnter={(e) => e.currentTarget.play().catch(() => { })}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.pause();
                                                    e.currentTarget.currentTime = 0;
                                                }}
                                            />
                                        ) : (
                                            <Image src={post.media_url} alt="Post" fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                                            <span className="text-white font-bold text-sm flex items-center gap-1">❤️ {post.likes_count || 0}</span>
                                            <span className="text-white font-bold text-sm flex items-center gap-1">💬 {post.comments_count || 0}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-16 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                                    <SparklesIcon className="w-8 h-8 text-text-tertiary" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">No highlights yet</h3>
                                <p className="text-sm text-text-tertiary">
                                    {isOwnProfile ? "Post photos and videos to build your highlight reel!" : `${profile.username} hasn't shared any media yet.`}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Followers/Following Modal */}
            {showFollowModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setShowFollowModal(false)}>
                    <div className="bg-[#111] border border-white/[0.08] rounded-2xl w-full max-w-md mx-4 max-h-[70vh] flex flex-col overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                            <div className="flex gap-6">
                                <button
                                    onClick={() => { setFollowModalType('followers'); openFollowModal('followers'); }}
                                    className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors ${followModalType === 'followers' ? 'border-accent-primary text-white' : 'border-transparent text-text-tertiary hover:text-white'}`}
                                >
                                    Followers
                                </button>
                                <button
                                    onClick={() => { setFollowModalType('following'); openFollowModal('following'); }}
                                    className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors ${followModalType === 'following' ? 'border-accent-primary text-white' : 'border-transparent text-text-tertiary hover:text-white'}`}
                                >
                                    Following
                                </button>
                            </div>
                            <button onClick={() => setShowFollowModal(false)} className="text-text-tertiary hover:text-white p-1 -mr-1 transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            {followListLoading ? (
                                <div className="flex flex-col gap-1 p-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                                            <div className="w-12 h-12 rounded-full skeleton shrink-0" />
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div className="h-3 w-28 skeleton" />
                                                <div className="h-3 w-20 skeleton" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : followList.length === 0 ? (
                                <div className="py-12 text-center">
                                    <UserIcon className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
                                    <p className="text-text-tertiary text-sm">
                                        {followModalType === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
                                    </p>
                                </div>
                            ) : (
                                <div className="p-2">
                                    {followList.map((u) => {
                                        const uAvatar = u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}&background=random`;
                                        const isMe = currentUser?.username === u.username;
                                        const following = followStates[u.id];
                                        return (
                                            <div
                                                key={u.id}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                                            >
                                                <Link
                                                    href={`/profile/${u.username}`}
                                                    onClick={() => setShowFollowModal(false)}
                                                    className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-white/[0.06]"
                                                >
                                                    <Image src={uAvatar} alt={u.username} width={44} height={44} className="w-full h-full object-cover" unoptimized />
                                                </Link>
                                                <Link
                                                    href={`/profile/${u.username}`}
                                                    onClick={() => setShowFollowModal(false)}
                                                    className="flex-1 min-w-0"
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-bold text-white text-[14px] truncate">{u.full_name || u.username}</span>
                                                        {u.is_verified && <Badge level={u.verification_level} className="w-4 h-4" />}
                                                    </div>
                                                    <span className="text-[12px] text-text-tertiary">@{u.username}</span>
                                                </Link>
                                                {!isMe && (
                                                    <button
                                                        onClick={() => handleModalFollow(u.id)}
                                                        disabled={followLoadingId === u.id}
                                                        className={`shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold tracking-wide uppercase transition-all active:scale-95 ${following
                                                            ? 'bg-white/[0.06] border border-white/[0.1] text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                                                            : 'bg-accent-primary text-white shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                                                            }`}
                                                    >
                                                        {followLoadingId === u.id ? (
                                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                                        ) : following ? 'Following' : 'Follow'}
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
            )}

            {/* Message Modal */}
            {showMessageModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setShowMessageModal(false)}>
                    <div className="bg-[#111] border border-white/[0.08] rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-accent-primary" />
                                Message @{profile.username}
                            </h3>
                            <button onClick={() => setShowMessageModal(false)} className="text-text-tertiary hover:text-white transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSendMessageSubmit} className="p-5 flex flex-col gap-4">
                            <textarea
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder={`Say hi to ${profile.full_name || profile.username}...`}
                                rows={4}
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-white placeholder-text-tertiary focus:outline-none focus:border-accent-primary/50 transition-colors resize-none"
                                autoFocus
                            />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowMessageModal(false)} className="px-5 py-2 rounded-xl text-sm font-bold text-text-tertiary hover:text-white transition-colors">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sendingMessage || !messageText.trim()}
                                    className="px-6 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] disabled:opacity-50 flex items-center gap-2 transition-all"
                                >
                                    {sendingMessage ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Send <PaperAirplaneIcon className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
