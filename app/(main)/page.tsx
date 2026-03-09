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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

      {/* Main Feed Column */}
      <div className="flex flex-col gap-6 w-full max-w-[600px] mx-auto lg:mx-0">

        {/* Horizontal Stories Component */}
        <Stories />

        {/* Quick Access Action Bar */}
        <div className="bg-bg-surface border border-border-color rounded-2xl p-3 md:p-4 flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 md:gap-3 w-full max-w-full overflow-hidden">
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-border-color shrink-0">
              <Image src={user?.avatarUrl || "/default_avatar.png"} alt="Avatar" fill className="object-cover" unoptimized />
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

        {/* Feed */}
        <div className="flex flex-col gap-6 w-full">
          {isLoading && (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-bg-card border border-border-color rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full skeleton" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="h-3 w-24 skeleton" />
                      <div className="h-2 w-16 skeleton" />
                    </div>
                  </div>
                  <div className="w-full aspect-[4/5] skeleton" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-3 w-32 skeleton" />
                    <div className="h-3 w-full skeleton" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-bg-surface border border-border-color flex items-center justify-center mx-auto mb-4">
                <CreateIcon className="w-10 h-10 text-text-tertiary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">No posts yet</h3>
              <p className="text-text-secondary text-sm mb-6">Be the first to share a highlight!</p>
              <button 
                onClick={() => router.push('/create-post')} 
                className="bg-accent-gradient text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-accent-primary/20 transition-all active:scale-95"
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

      {/* Sidebar - Desktop Only */}
      <Sidebar />
    </div>
  );
}
