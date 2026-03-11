"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SearchIcon, ArrowLeftIcon, TimeIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

const CATEGORIES = ["All", "Footwear", "Apparel", "Equipment", "Supplements"];

interface MarketplaceItem {
    id: number;
    seller_id: number;
    title: string;
    description: string;
    price: number | string;
    category: string;
    condition_state: string;
    image_url: string;
    status: string;
    created_at: string;
    username: string;
    full_name: string;
    avatar_url: string;
}

export default function MarketplacePage() {
    const router = useRouter();
    const { user } = useAuth();

    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState<MarketplaceItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Items from API
    useEffect(() => {
        async function fetchMarketplaceItems() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (activeCategory !== "All") params.append('category', activeCategory);
                if (searchQuery.trim()) params.append('q', searchQuery.trim());

                const res = await fetch(`/api/marketplace?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setItems(data.items || []);
                }
            } catch (error) {
                console.error('Failed to fetch marketplace items', error);
            } finally {
                setLoading(false);
            }
        }
        
        // Slight debounce for search
        const timer = setTimeout(fetchMarketplaceItems, 300);
        return () => clearTimeout(timer);
    }, [activeCategory, searchQuery]);

    const getConditionStyle = (condition: string) => {
        switch (condition) {
            case "New": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "Like New": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "Used": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    return (
        <div className="min-h-screen bg-bg-body pb-24 font-sans">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-bg-body/95 backdrop-blur-md border-b border-border-color">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeftIcon className="w-6 h-6 text-text-primary" />
                        </button>
                        <h1 className="text-[20px] font-bold text-text-primary">Marketplace</h1>
                    </div>
                    {user && (
                        <button className="hidden md:flex items-center gap-2 bg-accent-primary text-bg-body font-bold text-[13px] px-4 py-1.5 rounded-full hover:bg-white transition-colors">
                            <span>+</span> Sell Item
                        </button>
                    )}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="px-4 py-4 space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-text-secondary" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search gear, brands, apparel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg-surface border border-border-color text-white text-[14px] rounded-xl py-3 pl-10 pr-4 outline-none focus:border-accent-primary transition-colors placeholder-text-secondary"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all border ${activeCategory === cat
                                ? "bg-text-primary text-bg-body border-text-primary"
                                : "bg-bg-surface text-text-primary border-border-color hover:bg-white/5"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Marketplace Grid Feed */}
            <div className="px-4 py-2">
                {loading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-bg-surface rounded-2xl overflow-hidden border border-border-color">
                                <div className="h-40 w-full skeleton" />
                                <div className="p-3 flex flex-col gap-2">
                                    <div className="h-4 w-3/4 skeleton" />
                                    <div className="h-4 w-1/2 skeleton mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && items.length === 0 && (
                    <div className="text-center py-20 text-text-secondary animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-50">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg text-text-primary mb-1">No Items Found</h3>
                        <p className="text-sm">
                            {searchQuery ? "Try adjusting your filters or search query." : "Be the first to list some gear!"}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 animate-fade-in">
                    {!loading && items.map((item) => {
                        const coverImage = item.image_url || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop";
                        return (
                            <div key={item.id} className="bg-bg-surface rounded-2xl overflow-hidden border border-border-color hover:border-text-secondary/50 transition-colors cursor-pointer group flex flex-col">
                                <div className="h-40 md:h-52 w-full relative shrink-0">
                                    <Image src={coverImage} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                    <div className="absolute top-2 right-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md ${getConditionStyle(item.condition_state)}`}>
                                            {item.condition_state}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-2 right-2">
                                        <span className="bg-black/70 backdrop-blur-md text-white px-2 py-1 rounded-lg text-sm font-bold tracking-wide border border-white/10 shadow-lg">
                                            ${parseFloat(item.price as string).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 flex-1 flex flex-col">
                                    <h3 className="text-[14px] md:text-[15px] font-bold text-text-primary leading-tight mb-1 line-clamp-2 group-hover:text-accent-primary transition-colors flex-1">
                                        {item.title}
                                    </h3>
                                    
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-border-color/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full overflow-hidden relative ring-1 ring-white/10 shadow-sm shrink-0">
                                                <Image 
                                                    src={item.avatar_url || `https://ui-avatars.com/api/?name=${item.username}&background=random`} 
                                                    alt={item.username} 
                                                    fill 
                                                    className="object-cover" 
                                                    unoptimized 
                                                />
                                            </div>
                                            <span className="text-[11px] font-medium text-text-secondary truncate max-w-[80px]">
                                                {item.username}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-text-tertiary">
                                            {formatDistanceToNow(new Date(item.created_at))} ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {user && (
                <button className="md:hidden fixed bottom-24 right-4 bg-accent-primary text-bg-body w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(0,212,255,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            )}
        </div>
    );
}
