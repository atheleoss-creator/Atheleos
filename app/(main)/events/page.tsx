"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SearchIcon, ArrowLeftIcon, TimeIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const CATEGORIES = ["All", "Football", "Cricket", "Basketball", "Tennis", "E-Sports", "Athletics"];

interface Event {
    id: number;
    title: string;
    sport: string | null;
    description: string | null;
    event_date: string | null;
    location: string | null;
    image_url: string | null;
    status: 'upcoming' | 'ongoing' | 'completed';
    max_teams: number;
    teams_registered: number;
    winner: string | null;
    created_at: string;
}

export default function EventsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch events from API
    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (activeTab === "upcoming") {
                    params.append('status', 'upcoming');
                } else {
                    params.append('status', 'completed');
                }
                if (activeCategory !== "All") params.append('sport', activeCategory);
                if (searchQuery.trim()) params.append('q', searchQuery.trim());

                const res = await fetch(`/api/events?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data.events || []);
                }
            } catch (error) {
                console.error('Failed to fetch events', error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, [activeTab, activeCategory, searchQuery]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "upcoming": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "ongoing": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "completed": return "bg-accent-primary/10 text-accent-primary border-accent-primary/20";
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
                        <h1 className="text-[20px] font-bold text-text-primary">Tournaments</h1>
                    </div>
                    {isAdmin && (
                        <button className="hidden md:flex items-center gap-2 bg-accent-primary text-bg-body font-bold text-[13px] px-4 py-1.5 rounded-full hover:bg-white transition-colors">
                            <span>+</span> Create Event
                        </button>
                    )}
                </div>

                <div className="flex px-4 pt-2">
                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === "upcoming" ? "border-text-primary text-text-primary" : "border-transparent text-text-secondary"}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab("completed")}
                        className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === "completed" ? "border-text-primary text-text-primary" : "border-transparent text-text-secondary"}`}
                    >
                        Past
                    </button>
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
                        placeholder="Search tournaments, sports, locations..."
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

            {/* Events Feed */}
            <div className="px-4 space-y-5">
                {loading && (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-bg-surface rounded-2xl overflow-hidden border border-border-color">
                                <div className="h-40 w-full skeleton" />
                                <div className="p-4 flex flex-col gap-3">
                                    <div className="h-4 w-3/4 skeleton" />
                                    <div className="h-3 w-1/2 skeleton" />
                                    <div className="h-3 w-2/3 skeleton" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && events.length === 0 && (
                    <div className="text-center py-20 text-text-secondary animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-4">
                            <TimeIcon className="w-8 h-8 opacity-50" />
                        </div>
                        <h3 className="font-bold text-lg text-text-primary mb-1">No Events Found</h3>
                        <p className="text-sm">
                            {searchQuery ? "Try adjusting your filters or search query." : "Check back later for upcoming tournaments!"}
                        </p>
                    </div>
                )}

                {!loading && events.map((event) => {
                    const coverImage = event.image_url || "https://images.unsplash.com/photo-1518605368461-1bd49cece51f?w=600&h=300&fit=crop";
                    return (
                        <div key={event.id} className="bg-bg-surface rounded-2xl overflow-hidden border border-border-color hover:border-text-secondary/50 transition-colors cursor-pointer group animate-fade-in">
                            <div className="h-40 w-full relative">
                                <Image src={coverImage} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md ${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                </div>
                                {event.sport && (
                                    <div className="absolute bottom-3 left-4">
                                        <span className="bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide">
                                            {event.sport}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="text-[18px] font-bold text-text-primary leading-tight mb-2 group-hover:text-accent-primary transition-colors">{event.title}</h3>
                                <div className="space-y-2 mb-4">
                                    {event.event_date && (
                                        <div className="flex items-center gap-2 text-text-secondary text-[13px]">
                                            <TimeIcon className="w-4 h-4" />
                                            <span>{event.event_date}</span>
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center gap-2 text-text-secondary text-[13px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="h-[1px] bg-border-color mb-3" />

                                <div className="flex items-center justify-between">
                                    {event.status !== 'completed' ? (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-text-secondary uppercase font-bold tracking-wider">Registration</span>
                                                <span className="text-[13px] font-semibold text-text-primary">{event.teams_registered} / {event.max_teams} Teams</span>
                                            </div>
                                            <button className="bg-text-primary text-bg-body text-[13px] font-bold px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                                View Details
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-accent-primary uppercase font-bold tracking-wider">Winner</span>
                                                <span className="text-[14px] font-bold text-text-primary flex items-center gap-1.5">
                                                    🏆 {event.winner || "TBD"}
                                                </span>
                                            </div>
                                            <button className="bg-bg-surface border border-border-color text-text-primary text-[13px] font-bold px-5 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                                Results
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isAdmin && (
                <button className="md:hidden fixed bottom-24 right-4 bg-accent-primary text-bg-body w-14 h-14 rounded-full shadow-lg shadow-accent-primary/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            )}
        </div>
    );
}
