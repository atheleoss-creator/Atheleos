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

    const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [appliedEventIds, setAppliedEventIds] = useState<Set<number>>(new Set());
    const [submitting, setSubmitting] = useState(false);
    const [createForm, setCreateForm] = useState({
        title: "",
        sport: "Football",
        event_date: "",
        location: "",
        max_teams: 16,
        image_url: "",
        description: ""
    });

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!createForm.title.trim()) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(createForm)
            });
            if (res.ok) {
                const data = await res.json();
                const newEvent: Event = {
                    id: data.eventId || Date.now(),
                    title: createForm.title,
                    sport: createForm.sport,
                    description: createForm.description,
                    event_date: createForm.event_date || null,
                    location: createForm.location || null,
                    image_url: createForm.image_url || null,
                    status: 'upcoming',
                    max_teams: Number(createForm.max_teams) || 16,
                    teams_registered: 1,
                    winner: null,
                    created_at: new Date().toISOString()
                };
                setEvents([newEvent, ...events]);
                setAppliedEventIds(new Set([...appliedEventIds, newEvent.id]));
                setShowCreateModal(false);
                setCreateForm({ title: "", sport: "Football", event_date: "", location: "", max_teams: 16, image_url: "", description: "" });
            }
        } catch (err) {
            console.error("Create event error", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleApply = (eventId: number, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (appliedEventIds.has(eventId)) return;
        setAppliedEventIds(new Set([...appliedEventIds, eventId]));
        setEvents(events.map(ev => ev.id === eventId ? { ...ev, teams_registered: ev.teams_registered + 1 } : ev));
        if (selectedEvent && selectedEvent.id === eventId) {
            setSelectedEvent({ ...selectedEvent, teams_registered: selectedEvent.teams_registered + 1 });
        }
        // Save registration increment to MySQL database
        fetch('/api/events', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId })
        }).catch(err => console.error("Failed to save RSVP to db:", err));
    };

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
                    {true && (
                        <button onClick={() => setShowCreateModal(true)} className="hidden md:flex items-center gap-2 bg-accent-primary text-bg-body font-bold text-[13px] px-4 py-1.5 rounded-full hover:bg-white transition-colors cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)]">
                            <span>+</span> Add Event
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
                        <div key={event.id} onClick={() => setSelectedEvent(event)} className="bg-bg-surface rounded-2xl overflow-hidden border border-border-color hover:border-text-secondary/50 transition-colors cursor-pointer group animate-fade-in">
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
                                            <div className="flex gap-2 items-center">
                                                <button onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }} className="bg-bg-surface border border-border-color text-text-primary text-[12px] font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                                                    Details
                                                </button>
                                                <button
                                                    onClick={(e) => handleApply(event.id, e)}
                                                    disabled={appliedEventIds.has(event.id)}
                                                    className={`text-[12px] font-bold px-4 py-1.5 rounded-lg transition-all ${appliedEventIds.has(event.id) ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default" : "bg-accent-primary text-bg-body hover:bg-white cursor-pointer shadow-[0_0_10px_rgba(229,193,88,0.3)]"}`}
                                                >
                                                    {appliedEventIds.has(event.id) ? "Applied ✓" : "Apply Now"}
                                                </button>
                                            </div>
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

            {true && (
                <button onClick={() => setShowCreateModal(true)} className="md:hidden fixed bottom-24 right-4 bg-accent-primary text-bg-body w-14 h-14 rounded-full shadow-[0_0_20px_rgba(229,193,88,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            )}

            {/* Create Event Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#121212] border border-border-color rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-border-color mb-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">🏆 Create New Event</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-text-secondary hover:text-white text-xl">✕</button>
                        </div>
                        <form onSubmit={handleCreateEvent} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Event Title</label>
                                <input type="text" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} placeholder="e.g. NextGen Athlete Showcase 2026" className="w-full bg-[#1e1e1e] border border-border-color rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-accent-primary" required />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Sport</label>
                                    <select value={createForm.sport} onChange={e => setCreateForm({...createForm, sport: e.target.value})} className="w-full bg-[#1e1e1e] border border-border-color rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-accent-primary cursor-pointer">
                                        {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c} className="bg-[#121212]">{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Max Teams / Spots</label>
                                    <input type="number" value={createForm.max_teams} onChange={e => setCreateForm({...createForm, max_teams: parseInt(e.target.value) || 16})} className="w-full bg-[#1e1e1e] border border-border-color rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-accent-primary" min={2} max={100} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Date</label>
                                    <input type="date" value={createForm.event_date} onChange={e => setCreateForm({...createForm, event_date: e.target.value})} className="w-full bg-[#1e1e1e] border border-border-color rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-accent-primary cursor-pointer [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Location</label>
                                    <input type="text" value={createForm.location} onChange={e => setCreateForm({...createForm, location: e.target.value})} placeholder="e.g. Los Angeles, CA" className="w-full bg-[#1e1e1e] border border-border-color rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-accent-primary" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Cover Image URL (Optional)</label>
                                <input type="url" value={createForm.image_url} onChange={e => setCreateForm({...createForm, image_url: e.target.value})} placeholder="https://images.unsplash.com/photo-..." className="w-full bg-[#1e1e1e] border border-border-color rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-accent-primary placeholder-neutral-600" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Description</label>
                                <textarea value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})} placeholder="Scouting combine rules, entry criteria, prize pool..." rows={3} className="w-full bg-[#1e1e1e] border border-border-color rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-accent-primary resize-none" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-transparent border border-border-color text-text-secondary hover:text-white py-2.5 rounded-xl text-sm font-bold transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex-1 bg-accent-primary text-bg-body hover:bg-white py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(229,193,88,0.3)]">
                                    {submitting ? "Publishing..." : "Publish Event"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedEvent(null)}>
                    <div className="bg-[#121212] border border-border-color rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="h-44 w-full relative">
                            <Image src={selectedEvent.image_url || "https://images.unsplash.com/photo-1518605368461-1bd49cece51f?w=600&h=300&fit=crop"} alt={selectedEvent.title} fill className="object-cover" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent" />
                            <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors">✕</button>
                            <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded bg-accent-primary text-bg-body font-bold text-xs uppercase tracking-wider">{selectedEvent.sport || "Tournament"}</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <h2 className="text-xl font-bold text-white leading-tight">{selectedEvent.title}</h2>
                            <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                                {selectedEvent.event_date && <div className="flex items-center gap-1.5">📅 {selectedEvent.event_date}</div>}
                                {selectedEvent.location && <div className="flex items-center gap-1.5">📍 {selectedEvent.location}</div>}
                                <div className="flex items-center gap-1.5">👥 {selectedEvent.teams_registered} / {selectedEvent.max_teams} Registered</div>
                            </div>
                            <div className="h-px bg-border-color w-full" />
                            <div className="text-sm text-neutral-300 leading-relaxed max-h-40 overflow-y-auto pr-1">
                                {selectedEvent.description || "Join this official Atheleos tournament event. Showcase your skills to top recruiters and coaches."}
                            </div>
                            <div className="pt-3 flex gap-3">
                                <button
                                    onClick={() => handleApply(selectedEvent.id)}
                                    disabled={appliedEventIds.has(selectedEvent.id) || selectedEvent.status === 'completed'}
                                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${appliedEventIds.has(selectedEvent.id) ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default" : selectedEvent.status === 'completed' ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-accent-primary text-bg-body hover:bg-white cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)]"}`}
                                >
                                    {appliedEventIds.has(selectedEvent.id) ? "Applied Successfully ✓" : selectedEvent.status === 'completed' ? "Event Completed" : "Apply for Event Now →"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
