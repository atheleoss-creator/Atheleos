"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SearchIcon, ArrowLeftIcon, TimeIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Mock Data
const CATEGORIES = ["All", "Football", "Cricket", "Basketball", "Tennis", "E-Sports", "Athletics"];

const MOCK_EVENTS = [
    {
        id: 1,
        title: "Atheleos Premier League 2024",
        sport: "Football",
        date: "Oct 15 - Nov 20, 2024",
        location: "Mumbai Stadium, IND",
        image: "https://images.unsplash.com/photo-1518605368461-1bd49cece51f?w=600&h=300&fit=crop",
        status: "Registrations Open",
        type: "Upcoming",
        teamsRegistered: 12,
        maxTeams: 16
    },
    {
        id: 2,
        title: "National T20 Smash",
        sport: "Cricket",
        date: "Nov 01 - Nov 15, 2024",
        location: "Green Park, Delhi",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=300&fit=crop",
        status: "Ongoing",
        type: "Upcoming",
        teamsRegistered: 8,
        maxTeams: 8
    },
    {
        id: 3,
        title: "E-Sports Valorant Championship",
        sport: "E-Sports",
        date: "Dec 10 - Dec 12, 2024",
        location: "Online",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=300&fit=crop",
        status: "Upcoming",
        type: "Upcoming",
        teamsRegistered: 24,
        maxTeams: 32
    },
    {
        id: 4,
        title: "Summer Hoops Classic",
        sport: "Basketball",
        date: "Aug 10 - Aug 12, 2024",
        location: "Indoor Arena, Bangalore",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=300&fit=crop",
        status: "Completed",
        type: "Past",
        winner: "Bangalore Bulls"
    },
    {
        id: 5,
        title: "Grand Slam Open",
        sport: "Tennis",
        date: "Jul 05 - Jul 20, 2024",
        location: "Pune Tennis Club",
        image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=300&fit=crop",
        status: "Completed",
        type: "Past",
        winner: "Rohan B."
    }
];

export default function EventsPage() {
    const router = useRouter();
    const { user } = useAuth(); // Context to check roles
    const isAdmin = user?.role === 'admin';

    const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredEvents = MOCK_EVENTS.filter(event => {
        const matchesTab = event.type === activeTab;
        const matchesCategory = activeCategory === "All" || event.sport === activeCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesCategory && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Registrations Open": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "Ongoing": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "Completed": return "bg-accent-primary/10 text-accent-primary border-accent-primary/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    return (
        <div className="min-h-screen bg-bg-body pb-24 font-sans">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-bg-body/95 backdrop-blur-md border-b border-border-color">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeftIcon className="w-6 h-6 text-text-primary" />
                        </button>
                        <h1 className="text-[20px] font-bold text-text-primary">Tournaments</h1>
                    </div>
                    {/* Admin Only Create Button (Desktop/Tablet Top right) */}
                    {isAdmin && (
                        <button className="hidden md:flex items-center gap-2 bg-accent-primary text-bg-body font-bold text-[13px] px-4 py-1.5 rounded-full hover:bg-white transition-colors">
                            <span>+</span> Create Event
                        </button>
                    )}
                </div>

                {/* Main Tabs */}
                <div className="flex px-4 pt-2">
                    <button
                        onClick={() => setActiveTab("Upcoming")}
                        className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === "Upcoming" ? "border-text-primary text-text-primary" : "border-transparent text-text-secondary"}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab("Past")}
                        className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === "Past" ? "border-text-primary text-text-primary" : "border-transparent text-text-secondary"}`}
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

                {/* Horizontal Category Scroll */}
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
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-20 text-text-secondary">
                        <div className="w-16 h-16 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-4">
                            <TimeIcon className="w-8 h-8 opacity-50" />
                        </div>
                        <h3 className="font-bold text-lg text-text-primary mb-1">No Events Found</h3>
                        <p className="text-sm">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    filteredEvents.map((event) => (
                        <div key={event.id} className="bg-bg-surface rounded-2xl overflow-hidden border border-border-color hover:border-text-secondary/50 transition-colors cursor-pointer group">
                            {/* Banner Image */}
                            <div className="h-40 w-full relative">
                                <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md ${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 left-4">
                                    <span className="bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide">
                                        {event.sport}
                                    </span>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="p-4">
                                <h3 className="text-[18px] font-bold text-text-primary leading-tight mb-2 group-hover:text-accent-primary transition-colors">{event.title}</h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-text-secondary text-[13px]">
                                        <TimeIcon className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-secondary text-[13px]">
                                        {/* Simplified Map Pin SVG Mock for Location */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] bg-border-color mb-3" />

                                <div className="flex items-center justify-between">
                                    {event.type === "Upcoming" ? (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-text-secondary uppercase font-bold tracking-wider">Registration</span>
                                                <span className="text-[13px] font-semibold text-text-primary">{event.teamsRegistered} / {event.maxTeams} Teams</span>
                                            </div>
                                            <button className="bg-text-primary text-bg-body text-[13px] font-bold px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                                View Details
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-accent-primary uppercase font-bold tracking-wider">Tournament Winner</span>
                                                <span className="text-[14px] font-bold text-text-primary flex items-center gap-1.5">
                                                    🏆 {event.winner}
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
                    ))
                )}
            </div>

            {/* Admin Floating Action Button (Mobile) */}
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
