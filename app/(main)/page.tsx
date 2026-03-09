"use client";

import React, { useEffect, useState } from "react";
import Stories from "@/components/Stories";
import Sidebar from "@/components/Sidebar";
import FeedPost from "@/components/FeedPost";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreateIcon, ReelsIcon } from "@/components/Icons";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 py-4 max-w-7xl mx-auto w-full">

      {/* Main Feed */}
      <div className="flex flex-col gap-5 w-full max-w-[580px] mx-auto lg:mx-0">

        {/* Stories */}
        <Stories />

        {/* Composer Bar */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 md:p-4 flex items-center justify-between shadow-sm animate-fade-in backdrop-blur-sm">
          <div className="flex items-center gap-3 w-full max-w-full overflow-hidden">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10 shrink-0">
              <Image src={user?.avatarUrl || "/default_avatar.png"} alt="Avatar" fill className="object-cover" unoptimized />
            </div>
            <div
              onClick={() => router.push('/create-post')}
              className="bg-white/[0.04] text-text-tertiary w-full py-2.5 px-4 rounded-full text-sm cursor-text hover:bg-white/[0.07] transition-colors border border-white/[0.06] truncate"
            >
              Share your latest highlight...
            </div>
          </div>
          <div className="flex items-center gap-1 ml-3 shrink-0 border-l border-white/[0.06] pl-3">
            <button onClick={() => router.push('/create-post')} className="p-2 text-accent-primary hover:bg-accent-primary/10 rounded-xl transition-colors" title="Create Post">
              <CreateIcon className="w-5 h-5" />
            </button>
            <button onClick={() => router.push('/reels')} className="p-2 text-pink-500 hover:bg-pink-500/10 rounded-xl transition-colors" title="Watch Reels">
              <ReelsIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="flex flex-col gap-5 w-full">
          {isLoading && (
            <div className="flex flex-col gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-black border border-white/[0.06] rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3.5">
                    <div className="w-10 h-10 rounded-full skeleton" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-3 w-28 skeleton" />
                      <div className="h-2 w-16 skeleton" />
                    </div>
                  </div>
                  <div className="w-full aspect-[4/5] skeleton" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-3 w-36 skeleton" />
                    <div className="h-3 w-full skeleton" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5 shadow-lg">
                <CreateIcon className="w-12 h-12 text-text-tertiary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No posts yet</h3>
              <p className="text-text-secondary text-sm mb-8 max-w-xs mx-auto">Be the first athlete to share a highlight on Atheleos!</p>
              <button 
                onClick={() => router.push('/create-post')} 
                className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all active:scale-95"
              >
                Create Post
              </button>
            </div>
          )}

          {!isLoading && posts.map((post: any) => (
            <FeedPost key={`post-${post.id}`} post={post} />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}
