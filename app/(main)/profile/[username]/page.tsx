"use client";

import React, { use, useState, useEffect } from "react";
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
} from "@heroicons/react/24/outline";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = use(params);
    const { user: currentUser } = useAuth();
    
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("posts");

    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    const isOwnProfile = currentUser?.username === username;

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
    const coverUrl = profile.cover_url || `https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1000&h=300&fit=crop`;

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
                    <Link href="/settings" className="text-white p-1.5 hover:bg-white/5 rounded-xl">
                        <HamburgerIcon className="w-6 h-6" />
                    </Link>
                </div>
            </div>

            {/* Cover Image */}
            <div className="w-full h-[180px] md:h-[300px] relative overflow-hidden hidden md:block group">
                <Image src={coverUrl} alt="Cover" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-bg-body/30 to-transparent" />
            </div>

            {/* Profile Info */}
            <div className="px-4 py-2 md:px-8 mt-14 md:mt-0 md:-mt-[50px] relative z-20">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
                    
                    {/* Avatar & Name */}
                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4 md:mb-0">
                        <div className="relative shrink-0">
                            <div className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-2xl p-[3px] bg-gradient-to-tr from-accent-primary via-purple-500 to-accent-secondary shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                                <div className="w-full h-full rounded-[13px] border-4 border-bg-body overflow-hidden relative bg-bg-surface">
                                    <Image src={avatarUrl} alt={profile.username} fill className="object-cover" unoptimized />
                                </div>
                            </div>
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
                                <div className={`inline-flex w-fit px-3 py-1 mt-2 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-sm ${
                                    profile.recruiting_status === 'Signed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                    'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'}`}>
                                    {profile.recruiting_status}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pb-2">
                        {isOwnProfile ? (
                            <Link href="/edit-profile" className="py-2.5 px-6 bg-white/[0.06] border border-white/[0.08] text-white font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-white/[0.1] transition-all shadow-sm">
                                Edit Profile
                            </Link>
                        ) : (
                            <button
                                onClick={toggleFollow}
                                disabled={followLoading}
                                className={`py-2.5 px-7 font-bold text-sm tracking-wider uppercase rounded-xl transition-all ${
                                    isFollowing
                                        ? 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                                        : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]'
                                }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 mb-5 mt-3">
                    {[
                        { value: profile.posts?.length || 0, label: 'Posts' },
                        { value: profile.followersCount || 0, label: 'Followers' },
                        { value: profile.followingCount || 0, label: 'Following' },
                    ].map((stat) => (
                        <div key={stat.label} className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center gap-2 hover:bg-white/[0.06] transition-colors backdrop-blur-sm">
                            <span className="font-black text-lg text-white">{stat.value}</span>
                            <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {profile.bio && (
                    <div className="text-[14px] text-text-secondary whitespace-pre-wrap leading-relaxed max-w-2xl mb-5">
                        {profile.bio}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-white/[0.06] bg-black/60 backdrop-blur-xl z-10 px-4 md:px-8 sticky top-[56px] md:top-[64px]">
                <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                    {['posts', 'player_card'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 py-4 border-b-2 font-bold text-[13px] tracking-wider uppercase whitespace-nowrap transition-colors ${activeTab === tab ? "border-accent-primary text-accent-primary" : "border-transparent text-text-tertiary hover:text-white"}`}
                        >
                            {tab === "posts" && <Squares2X2Icon className="w-5 h-5" />}
                            {tab === "player_card" && <InformationCircleIcon className="w-5 h-5" />}
                            {tab.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 py-5 md:px-8 min-h-[50vh]">
                
                {activeTab === "posts" && (
                    <div className="grid grid-cols-3 gap-1 md:gap-3">
                        {profile.posts?.length > 0 ? profile.posts.map((post: any) => (
                            <div key={post.id} className="aspect-square relative group bg-bg-surface overflow-hidden rounded-lg md:rounded-xl border border-white/[0.04] hover:border-white/[0.1] transition-colors">
                                {post.media_url ? (
                                    <>
                                        <Image src={post.media_url} alt="Post" fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                                            <span className="text-white font-bold text-sm flex items-center gap-1">❤️ {post.likes || 0}</span>
                                            <span className="text-white font-bold text-sm flex items-center gap-1">💬 {post.comments || 0}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-3 w-full h-full flex items-center justify-center text-[12px] text-center text-text-secondary break-words line-clamp-4 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5">
                                        {post.caption}
                                    </div>
                                )}
                            </div>
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
            </div>
        </div>
    );
}
