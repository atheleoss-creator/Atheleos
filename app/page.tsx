"use client";

import React, { useEffect } from "react";
import Stories from "@/components/Stories";
import Sidebar from "@/components/Sidebar";
import FeedPost from "@/components/FeedPost";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CreateIcon, ReelsIcon, ArrowRightIcon } from "@/components/Icons";

// Mock Data
const MOCK_FEED = [
  {
    type: "post",
    id: 1,
    username: "pro_athlete",
    avatarUrl: "https://ui-avatars.com/api/?name=Pro+Athlete&background=1E293B&color=00D4FF",
    mediaUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop",
    mediaType: "image",
    caption: "Training day! 💪 #NoPainNoGain #Athleos",
    likes: 1240,
    comments: 45,
    isLiked: true,
    isSaved: false,
    createdAt: new Date().toISOString(),
  },
  {
    type: "match_update",
    id: 101,
    league: "Premier League Athletics",
    teamA: { name: "Falcons Elite", score: 2, logo: "https://ui-avatars.com/api/?name=FE&background=random" },
    teamB: { name: "Metro City", score: 1, logo: "https://ui-avatars.com/api/?name=MC&background=random" },
    status: "LIVE - 78'",
    highlightUrl: "https://images.unsplash.com/photo-1588665796262-e3e86c073ee2?w=800&auto=format&fit=crop"
  },
  {
    type: "post",
    id: 2,
    username: "fitness_guru",
    avatarUrl: "https://ui-avatars.com/api/?name=Fitness+Guru&background=random",
    mediaUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    mediaType: "image",
    caption: "Morning run view 🌅. What's your workout today?",
    likes: 856,
    comments: 23,
    isLiked: false,
    isSaved: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    type: "trending",
    id: 201,
    items: [
      { tag: "#SummerOlympics", posts: "1.2M", img: "https://images.unsplash.com/photo-1574681604100-34a991ed4fb4?w=200&h=200&fit=crop" },
      { tag: "#MarathonPrep", posts: "450K", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200&h=200&fit=crop" },
      { tag: "#TennisFinals", posts: "890K", img: "https://images.unsplash.com/photo-1554068865-24cecd4e34f8?w=200&h=200&fit=crop" },
    ]
  },
  {
    type: "post",
    id: 3,
    username: "basketball_star",
    avatarUrl: "https://ui-avatars.com/api/?name=Basketball+Star&background=random",
    mediaUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
    mediaType: "image",
    caption: "Game ready 🏀. Let's go team!",
    likes: 2300,
    comments: 112,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  }
];

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

      {/* Main Feed Column */}
      <div className="flex flex-col gap-6 w-full max-w-[600px] mx-auto lg:mx-0">

        {/* Horizontal Stories Component */}
        <Stories />

        {/* Quick Access Action Bar */}
        <div className="bg-bg-surface border border-border-color rounded-2xl p-3 md:p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 md:gap-3 w-full max-w-full overflow-hidden">
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-border-color shrink-0">
              <Image src={user?.avatarUrl || "https://ui-avatars.com/api/?name=User&background=random"} alt="Avatar" fill className="object-cover" unoptimized />
            </div>
            <div
              onClick={() => router.push('/create-post')}
              className="bg-bg-body text-text-secondary w-full py-2 px-3 md:py-2.5 md:px-4 rounded-full text-[12px] md:text-sm cursor-text hover:bg-white/5 transition-colors border border-border-color truncate"
            >
              Share your latest highlight...
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2 ml-2 md:ml-4 shrink-0 border-l border-border-color pl-2 md:pl-4">
            <button onClick={() => router.push('/create-post')} className="p-1.5 md:p-2 text-text-primary hover:bg-white/5 rounded-full transition-colors flex items-center gap-1">
              <CreateIcon className="w-5 h-5 md:w-6 md:h-6 text-accent-primary" />
            </button>
            <button onClick={() => router.push('/reels')} className="p-1.5 md:p-2 text-text-primary hover:bg-white/5 rounded-full transition-colors flex items-center gap-1">
              <ReelsIcon className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
            </button>
          </div>
        </div>

        {/* Dynamic Feed Loop */}
        <div className="flex flex-col gap-6 w-full">
          {MOCK_FEED.map((feedItem: any) => {

            // 1. Render Standard Post
            if (feedItem.type === "post") {
              return <FeedPost key={`post-${feedItem.id}`} post={feedItem} />;
            }

            // 2. Render Live Match Update Block
            if (feedItem.type === "match_update") {
              return (
                <div key={`match-${feedItem.id}`} className="bg-gradient-to-br from-bg-surface via-bg-card to-bg-surface border border-border-color rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:border-accent-primary/50 transition-all">
                  <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      {feedItem.league}
                    </span>
                    <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-md">{feedItem.status}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col items-center gap-2 w-1/3">
                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-border-color">
                        <Image src={feedItem.teamA.logo} alt={feedItem.teamA.name} fill className="object-cover" unoptimized />
                      </div>
                      <span className="font-bold text-sm text-center line-clamp-1">{feedItem.teamA.name}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center w-1/3">
                      <div className="text-3xl font-black text-white tracking-widest">{feedItem.teamA.score} - {feedItem.teamB.score}</div>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-1/3">
                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-border-color">
                        <Image src={feedItem.teamB.logo} alt={feedItem.teamB.name} fill className="object-cover" unoptimized />
                      </div>
                      <span className="font-bold text-sm text-center line-clamp-1">{feedItem.teamB.name}</span>
                    </div>
                  </div>
                  <div className="relative w-full h-32 overflow-hidden border-t border-border-color">
                    <Image src={feedItem.highlightUrl} alt="Match Highlight" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-transparent to-transparent flex items-bottom p-3">
                      <span className="text-sm font-semibold flex items-center gap-1 self-end group-hover:text-accent-primary transition-colors">
                        Watch Live Stream <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // 3. Render Trending Content Block
            if (feedItem.type === "trending") {
              return (
                <div key={`trending-${feedItem.id}`} className="bg-bg-surface border border-border-color rounded-2xl p-4 shadow-sm overflow-hidden hidden md:block">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">🔥</span>
                    <h3 className="font-bold text-text-primary">Trending Highlights</h3>
                  </div>
                  <div className="flex gap-3 overflow-x-auto hidden-scrollbar pb-2">
                    {feedItem.items.map((item: any, idx: number) => (
                      <div key={idx} className="relative w-[180px] h-[240px] shrink-0 rounded-xl overflow-hidden cursor-pointer group">
                        <Image src={item.img} alt={item.tag} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 flex flex-col">
                          <span className="font-bold text-white text-sm">{item.tag}</span>
                          <span className="text-xs text-gray-300">{item.posts} posts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

            return null;
          })}
        </div>
      </div>

      {/* Sidebar - Desktop Only */}
      <Sidebar />
    </div>
  );
}
