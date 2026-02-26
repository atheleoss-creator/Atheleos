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

    const isOwnProfile = currentUser?.username === username;

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await fetch(`/api/profile/${username}`);
                if (!res.ok) {
                    throw new Error("Profile not found");
                }
                const data = await res.json();
                setProfile(data.profile);
            } catch {
                setError("Unable to load profile data.");
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [username]);

    if (loading) {
        return <div className="min-h-screen bg-bg-body flex items-center justify-center text-text-secondary">Loading Profile...</div>;
    }

    if (error || !profile) {
        return <div className="min-h-screen bg-bg-body flex items-center justify-center text-red-500">Profile Not Found</div>;
    }

    // Default Fallbacks
    const avatarUrl = profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.username}&background=random`;
    const coverUrl = profile.cover_url || `https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1000&h=300&fit=crop`;

    return (
        <div className="pb-20 md:pb-0 min-h-screen bg-bg-body">
            {/* Mobile Top Header */}
            <div className="md:hidden relative top-0 left-0 right-0 h-[44px] bg-bg-body z-40 flex items-center justify-between px-4">
                <div className="relative">
                    <button className="flex items-center gap-1">
                        <h1 className="text-xl font-bold text-text-primary">{profile.username}</h1>
                    </button>
                </div>
                <div className="flex items-center gap-5">
                    <Link href="/create-post">
                        <CreateIcon className="w-6 h-6 text-text-primary" />
                    </Link>
                    <Link href="/settings">
                        <HamburgerIcon className="w-6 h-6 text-text-primary" />
                    </Link>
                </div>
            </div>

            {/* Hero Cover Image */}
            <div className="w-full h-[180px] md:h-[280px] relative overflow-hidden hidden md:block mt-[-20px] group">
                <Image src={coverUrl} alt="Cover" fill className="object-cover" unoptimized/>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Header Content */}
            <div className="px-4 py-2 md:px-8 mt-4 md:-mt-[40px] relative z-20">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
                    
                    {/* Avatar & Name */}
                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4 md:mb-0">
                        <div className="relative shrink-0">
                            <div className="w-[86px] h-[86px] md:w-[120px] md:h-[120px] rounded-2xl p-[3px] bg-gradient-to-tr from-accent-primary to-accent-secondary shadow-lg">
                                <div className="w-full h-full rounded-xl border-4 border-bg-body overflow-hidden relative bg-bg-surface">
                                    <Image src={avatarUrl} alt={profile.username} fill className="object-cover" unoptimized />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col pb-2">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight uppercase font-sans">
                                    {profile.full_name || profile.username}
                                </h1>
                                {profile.is_verified && profile.verification_level && <Badge level={profile.verification_level} className="w-6 h-6" />}
                            </div>
                            <span className="text-sm md:text-base text-accent-primary font-bold tracking-wide">@{profile.username}</span>
                            
                            {/* Recruiting Status Tag */}
                            {profile.recruiting_status && profile.recruiting_status !== 'Not Looking' && (
                                <div className={`inline-flex w-fit px-2.5 py-1 mt-2 rounded-[6px] text-[10px] font-black uppercase tracking-widest ${
                                    profile.recruiting_status === 'Signed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                    'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'}`}>
                                    {profile.recruiting_status}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pb-2">
                        {isOwnProfile ? (
                            <Link href="/edit-profile" className="py-2 px-6 bg-bg-surface border border-border-color text-text-primary font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-white/5 transition-colors shadow-sm">
                                Edit Profile
                            </Link>
                        ) : (
                            <>
                                <button className="py-2 px-6 bg-accent-primary text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg">
                                    Follow
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Followers/Posts Stats */}
                <div className="flex flex-wrap gap-2 md:gap-4 mb-4 mt-4">
                    <div className="px-4 py-2 bg-bg-surface border border-border-color rounded-xl flex items-center gap-2">
                        <span className="font-black text-lg text-text-primary">{profile.posts?.length || 0}</span>
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Posts</span>
                    </div>
                    <div className="px-4 py-2 bg-bg-surface border border-border-color rounded-xl flex items-center gap-2">
                        <span className="font-black text-lg text-text-primary">{profile.followersCount || 0}</span>
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Followers</span>
                    </div>
                    <div className="px-4 py-2 bg-bg-surface border border-border-color rounded-xl flex items-center gap-2">
                        <span className="font-black text-lg text-text-primary">{profile.followingCount || 0}</span>
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Following</span>
                    </div>
                </div>

                <div className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed max-w-2xl font-medium mb-4">
                    {profile.bio}
                </div>
            </div>

            {/* Profile Tabs */}
            <div className="border-b border-border-color bg-bg-body z-10 px-4 md:px-8 mt-2 sticky top-[44px] md:top-0">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                    {['posts', 'player_card'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 py-4 border-b-2 font-bold text-sm tracking-wider uppercase whitespace-nowrap transition-colors ${activeTab === tab ? "border-accent-primary text-accent-primary" : "border-transparent text-text-secondary hover:text-text-primary"}`}
                        >
                            {tab === "posts" && <Squares2X2Icon className="w-5 h-5" />}
                            {tab === "player_card" && <InformationCircleIcon className="w-5 h-5" />}
                            {tab.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content Area */}
            <div className="px-4 py-4 md:px-8 min-h-[50vh]">
                
                {/* POSTS TAB */}
                {activeTab === "posts" && (
                    <div className="grid grid-cols-3 gap-1 md:gap-4">
                        {profile.posts?.length > 0 ? profile.posts.map((post: any) => (
                            <div key={post.id} className="aspect-square relative group bg-bg-surface overflow-hidden rounded-md md:rounded-xl border border-border-color/50">
                                {post.media_url ? (
                                    <Image src={post.media_url} alt="Post" fill className="object-cover" unoptimized />
                                ) : (
                                    <div className="p-2 w-full h-full flex items-center justify-center text-xs text-center text-text-secondary break-words line-clamp-3">
                                        {post.content}
                                    </div>
                                )}
                            </div>
                        )) : (
                            <div className="col-span-3 py-10 text-center text-text-secondary">No posts yet.</div>
                        )}
                    </div>
                )}

                {/* PLAYER CARD TAB */}
                {activeTab === "player_card" && (
                    <div className="flex flex-col gap-6 max-w-4xl">
                        
                        {/* Biometrics Block */}
                        <div className="bg-bg-card border border-border-color rounded-2xl p-6 shadow-sm overflow-hidden relative">
                            <h3 className="text-sm font-black text-text-secondary uppercase tracking-widest mb-4">Physical Measurements</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-bg-surface rounded-xl p-4 border border-border-color">
                                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Sport / Event</div>
                                    <div className="text-xl font-black text-text-primary">{profile.sport || '--'}</div>
                                    <div className="text-sm text-accent-primary font-semibold mt-1">{profile.position || '--'}</div>
                                </div>
                                <div className="bg-bg-surface rounded-xl p-4 border border-border-color">
                                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Height</div>
                                    <div className="text-2xl font-black text-text-primary">{profile.height || '--'}</div>
                                </div>
                                <div className="bg-bg-surface rounded-xl p-4 border border-border-color">
                                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Weight</div>
                                    <div className="text-2xl font-black text-text-primary">{profile.weight || '--'}</div>
                                </div>
                                <div className="bg-bg-surface rounded-xl p-4 border border-border-color">
                                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Base Location</div>
                                    <div className="text-sm font-bold text-text-primary line-clamp-2">{profile.city ? `${profile.city}, ${profile.state}` : '--'}</div>
                                </div>
                                <div className="bg-bg-surface rounded-xl p-4 border border-border-color">
                                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Top Speed</div>
                                    <div className="text-lg font-black text-text-primary">{profile.top_speed || '--'}</div>
                                </div>
                                <div className="bg-bg-surface rounded-xl p-4 border border-border-color">
                                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Vertical</div>
                                    <div className="text-lg font-black text-text-primary">{profile.vertical_leap || '--'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Trophy Cabinet */}
                        <div className="bg-bg-card border border-border-color rounded-2xl p-6 shadow-sm">
                            <h3 className="text-sm font-black text-text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                                <TrophyIcon className="w-5 h-5 text-accent-primary" /> Trophy Cabinet
                            </h3>
                            <div className="flex flex-col gap-4">
                                {profile.achievements && profile.achievements.length > 0 ? profile.achievements.map((achievement: any, idx: number) => (
                                    <div key={idx} className="flex flex-col p-4 bg-bg-surface/50 rounded-xl border border-border-color/50 relative overflow-hidden group">
                                        {achievement.verified && (
                                            <div className="absolute top-0 right-0 p-3">
                                                <Badge level="international" className="w-5 h-5 opacity-80" />
                                            </div>
                                        )}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20 shrink-0">
                                                <TrophyIcon className="w-6 h-6 text-accent-primary group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-text-primary text-lg">{achievement.title}</span>
                                                    <span className="text-xs font-medium text-text-muted bg-black/20 px-2 py-0.5 rounded-full">{achievement.year}</span>
                                                </div>
                                                <p className="text-sm text-text-secondary mt-1">{achievement.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-6 text-text-secondary">No achievements logged yet.</div>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
