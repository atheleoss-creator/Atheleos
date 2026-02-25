"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeftIcon, CheckIcon, ArrowRightIcon } from "@/components/Icons";

export default function EditProfilePage() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();

    // Local state for form fields - initialized with mock user data or defaults
    const [name, setName] = useState(user?.fullName || "Sahil Singh Rajput");
    const [username, setUsername] = useState(user?.username || "its._.royal_rajput");
    const [pronouns, setPronouns] = useState("");
    const [bio, setBio] = useState(user?.bio || "");
    const [gender, setGender] = useState("Male");

    // Verification Status
    const [verificationStatus, setVerificationStatus] = useState(user?.verificationStatus || "unverified");

    // Athletic Profile State
    const [matchesPlayed, setMatchesPlayed] = useState(user?.performanceStats?.["Matches Played"] || "0");
    const [winRate, setWinRate] = useState(user?.performanceStats?.["Win Rate"] || "0%");
    const [totalPoints, setTotalPoints] = useState(user?.performanceStats?.["Total Points"] || "0");
    const [mvpAwards, setMvpAwards] = useState(user?.performanceStats?.["MVP Awards"] || "0");

    const [teams, setTeams] = useState(user?.teams?.join(", ") || "");
    const [achievements, setAchievements] = useState(user?.achievements?.join(", ") || "");

    const [highlights, setHighlights] = useState<any[]>(user?.highlights || []);
    const [matches, setMatches] = useState<any[]>(user?.matches || []);

    // File upload handling
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            // In a real app, you would upload the file here
        }
    };

    const handleSave = () => {
        // Convert comma-separated strings back to arrays
        const teamsArray = teams.split(",").map(t => t.trim()).filter(Boolean);
        const achievementsArray = achievements.split(",").map(a => a.trim()).filter(Boolean);

        const updatedData: any = {
            fullName: name,
            username,
            bio,
            isVerified: user?.isVerified || false,
            verificationLevel: user?.verificationLevel,
            verificationStatus: verificationStatus,
            teams: teamsArray,
            achievements: achievementsArray,
            performanceStats: {
                "Matches Played": Number(matchesPlayed) || 0,
                "Win Rate": winRate,
                "Total Points": totalPoints,
                "MVP Awards": Number(mvpAwards) || 0
            },
            highlights,
            matches
        };

        if (previewUrl) {
            updatedData.avatarUrl = previewUrl;
        }

        console.log("Saving profile data:", updatedData);
        updateProfile(updatedData);
        router.back();
    };

    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-10">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 relative top-0 bg-bg-body z-10 border-b border-border-color md:border-none">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-text-primary">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold">Edit profile</h1>
                </div>
                <button onClick={handleSave} className="text-accent-primary">
                    <CheckIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="px-4 mt-6 max-w-2xl mx-auto">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-3 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        {/* Main Avatar */}
                        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-border-color relative">
                            <Image
                                src={previewUrl || user?.avatarUrl || "https://ui-avatars.com/api/?name=User&background=random"}
                                alt="Profile"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                                unoptimized
                            />
                            {/* Overlay for hover effect */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">Change</span>
                            </div>
                        </div>

                        {/* Plus Icon Badge */}
                        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-bg-body">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>


                    </div>

                    <button onClick={() => fileInputRef.current?.click()} className="text-blue-400 text-sm font-semibold">Edit picture or avatar</button>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,video/*"
                    />
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] text-text-secondary pl-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary"
                            placeholder="Name"
                        />
                    </div>

                    {/* Username */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] text-text-secondary pl-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary"
                            placeholder="Username"
                        />
                    </div>

                    {/* Pronouns */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] text-text-secondary pl-1">Pronouns</label>
                        <input
                            type="text"
                            value={pronouns}
                            onChange={(e) => setPronouns(e.target.value)}
                            className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary"
                            placeholder="Pronouns"
                        />
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] text-text-secondary pl-1">Bio</label>
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary"
                            placeholder="Bio"
                        />
                    </div>

                    {/* Links - Static Links for now */}
                    <div className="py-3 text-[15px]">
                        Add link
                    </div>

                    <div className="py-2 text-[15px]">
                        Add banners
                    </div>

                    {/* Gender Dropdown */}
                    <div className="flex flex-col gap-1 mt-2">
                        <label className="text-[12px] text-text-secondary pl-1">Gender</label>
                        <div className="relative">
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full bg-transparent border-none text-[15px] focus:outline-none appearance-none py-2 pb-3 border-b border-border-color"
                            >
                                <option value="Male" className="bg-bg-card">Male</option>
                                <option value="Female" className="bg-bg-card">Female</option>
                                <option value="Custom" className="bg-bg-card">Custom</option>
                                <option value="Prefer not to say" className="bg-bg-card">Prefer not to say</option>
                            </select>
                            <div className="absolute right-0 top-3 pointer-events-none">
                                <ArrowRightIcon className="w-4 h-4 rotate-90 text-text-secondary" />
                            </div>
                        </div>
                        <div className="h-[1px] bg-border-color w-full -mt-1"></div>
                    </div>

                    {/* --- ATHLETIC PROFILE SECTION --- */}
                    <div className="mt-6 mb-2">
                        <h2 className="text-[15px] font-semibold text-accent-primary">Athletic Profile</h2>
                        <p className="text-xs text-text-secondary mt-1">Update your sports resume, teams, and stats.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* PERFORMANCE STATS */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[12px] text-text-secondary pl-1">Matches Played</label>
                                <input type="number" value={matchesPlayed} onChange={(e) => setMatchesPlayed(e.target.value)} className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[12px] text-text-secondary pl-1">Win Rate</label>
                                <input type="text" value={winRate} onChange={(e) => setWinRate(e.target.value)} className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary" placeholder="e.g. 85%" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[12px] text-text-secondary pl-1">Total Points</label>
                                <input type="text" value={totalPoints} onChange={(e) => setTotalPoints(e.target.value)} className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary" placeholder="e.g. 1,450" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[12px] text-text-secondary pl-1">MVP Awards</label>
                                <input type="number" value={mvpAwards} onChange={(e) => setMvpAwards(e.target.value)} className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary" />
                            </div>
                        </div>

                        {/* TEAMS */}
                        <div className="flex flex-col gap-1 mt-2">
                            <label className="text-[12px] text-text-secondary pl-1">Teams & Affiliations (comma separated)</label>
                            <textarea
                                value={teams}
                                onChange={(e) => setTeams(e.target.value)}
                                className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary resize-none"
                                rows={2}
                                placeholder="e.g. National Swim Team, Lakeside Aquatics"
                            />
                        </div>

                        {/* ACHIEVEMENTS */}
                        <div className="flex flex-col gap-1 mt-2">
                            <label className="text-[12px] text-text-secondary pl-1">Achievements (comma separated)</label>
                            <textarea
                                value={achievements}
                                onChange={(e) => setAchievements(e.target.value)}
                                className="bg-transparent border-b border-border-color py-1 text-[15px] focus:outline-none focus:border-text-primary pb-3 placeholder-text-secondary resize-none"
                                rows={2}
                                placeholder="e.g. Gold Medal 200m Free, National Record Holder"
                            />
                        </div>
                    </div>

                    {/* --- HIGHLIGHTS SECTION --- */}
                    <div className="mt-6 mb-2">
                        <h2 className="text-[15px] font-semibold text-accent-primary">Highlights</h2>
                        <p className="text-xs text-text-secondary mt-1">Upload short clips or images of your best moments.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-3 bg-bg-surface p-2 rounded-xl border border-border-color">
                                <img src={h.img} alt={h.title} className="w-12 h-12 object-cover rounded-md" />
                                <div className="flex flex-col flex-1">
                                    <span className="font-semibold text-sm">{h.title}</span>
                                    <span className="text-xs text-text-muted">{h.views} views</span>
                                </div>
                                <button onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))} className="text-red-500 text-xs font-bold uppercase p-2">Remove</button>
                            </div>
                        ))}
                        <label className="cursor-pointer flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border-color hover:bg-white/5 transition-colors">
                            <span className="text-text-primary text-sm font-semibold">+ Add Highlight Image</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const title = prompt("Enter a title for this highlight:") || "New Highlight";
                                        const url = URL.createObjectURL(file);
                                        setHighlights([...highlights, { id: Math.random(), title, img: url, views: "0" }]);
                                    }
                                }}
                            />
                        </label>
                    </div>

                    {/* --- MATCHES SECTION --- */}
                    <div className="mt-6 mb-2">
                        <h2 className="text-[15px] font-semibold text-accent-primary">Recent Matches</h2>
                        <p className="text-xs text-text-secondary mt-1">Log your recent games and outcomes.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {matches.map((m, i) => (
                            <div key={i} className="flex items-center justify-between bg-bg-surface p-3 rounded-xl border border-border-color">
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className={`text-xs font-bold uppercase w-5 h-5 flex items-center justify-center rounded-sm ${m.result === 'Win' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{m.result === 'Win' ? 'W' : 'L'}</span>
                                        <span className="font-semibold text-sm">{m.opponent}</span>
                                    </div>
                                    <span className="text-xs text-text-muted mt-1">{m.date} • {m.type}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-lg">{m.score}</span>
                                    <button onClick={() => setMatches(matches.filter((_, idx) => idx !== i))} className="text-red-500 text-xs font-bold uppercase p-2">Remove</button>
                                </div>
                            </div>
                        ))}
                        <button
                            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border-color hover:bg-white/5 transition-colors text-text-primary text-sm font-semibold"
                            onClick={() => {
                                const opponent = prompt("Opponent Name:");
                                if (!opponent) return;
                                const score = prompt("Score (e.g. 4 - 2):") || "0 - 0";
                                const result = prompt("Result (Win/Loss):") || "Win";
                                const type = prompt("Match Type (e.g. Championship):") || "Friendly";
                                const date = prompt("Date (e.g. Oct 12, 2023):") || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                                setMatches([{ id: Math.random(), date, opponent, result, score, type }, ...matches]);
                            }}
                        >
                            + Add Match
                        </button>
                    </div>

                </div>

                {/* --- VERIFICATION SECTION --- */}
                <div className="mt-8">
                    <h2 className="text-[15px] font-semibold mb-4 text-accent-primary flex items-center gap-2">
                        Verification & Badges
                    </h2>

                    <div className="bg-bg-surface p-4 rounded-xl border border-border-color flex items-center justify-between shadow-sm cursor-pointer hover:bg-white/5 transition-colors" onClick={() => router.push("/verification")}>
                        <div className="flex flex-col gap-1 w-full relative">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-text-primary">
                                    {user?.isVerified ? "Upgrade Badge" : "Apply for Verification"}
                                </span>
                                {user?.isVerified && (
                                    <div className="bg-green-500/10 text-green-500 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0">
                                        Verified - {user.verificationLevel}
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-text-secondary leading-tight mt-0.5 max-w-[90%]">
                                {verificationStatus === 'pending'
                                    ? "Your verification request is currently pending review by our team."
                                    : user?.isVerified
                                        ? "Upload new credentials to upgrade to a higher tier badge."
                                        : "Get verified to show your athletic achievements and unlock a profile badge."}
                            </p>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                <ArrowRightIcon className="w-5 h-5 text-text-secondary" />
                            </div>
                        </div>
                    </div>
                    ) : (
                    <div className="flex flex-col gap-4">
                        {user?.isVerified && (
                            <div className="bg-bg-surface p-3 rounded-xl border border-border-color flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-text-secondary">Current Badge Level</p>
                                    <p className="font-bold capitalize text-sm mt-0.5">{user.verificationLevel}</p>
                                </div>
                                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-md text-xs font-bold uppercase">
                                    Verified
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Profile Information Section */}
                    <div className="mt-8">
                        <h2 className="text-[15px] font-semibold mb-4">Profile information</h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[15px]">Page</span>
                                <div className="flex items-center gap-2 text-text-secondary cursor-pointer">
                                    <span className="text-[14px]">Connect or create</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[15px]">Category</span>
                                <div className="flex items-center gap-2 text-text-secondary cursor-pointer">
                                    <span className="text-[14px]">Artist</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[15px]">Contact options</span>
                                <div className="flex items-center gap-2 text-text-secondary cursor-pointer">
                                    <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button Profile Display (Footer/Bottom) */}
                    <div className="mt-6 border-t border-text-secondary/30 pt-4">
                        <button className="text-blue-400 text-[14px] font-medium w-full text-left">
                            Personal information settings
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
