"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-24 md:pb-10">
            <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-2xl mx-auto px-4 flex items-center h-14 gap-3">
                    <button onClick={() => router.back()} className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold">About</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 pt-8">
                {/* Logo / Brand */}
                <div className="flex flex-col items-center mb-10 animate-fade-in">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                        <span className="text-3xl font-black text-white">A</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Atheleos</h2>
                    <p className="text-sm text-text-muted mt-1">Version 1.0.0</p>
                </div>

                {/* Info cards */}
                <div className="space-y-3">
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                        <h3 className="text-sm font-bold text-white mb-1">What is Atheleos?</h3>
                        <p className="text-[13px] text-text-secondary leading-relaxed">
                            Atheleos is the premier social platform for athletes. Share your highlights, connect with other athletes, get discovered by scouts, and build your athletic brand.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                        <h3 className="text-sm font-bold text-white mb-1">Features</h3>
                        <ul className="text-[13px] text-text-secondary space-y-1.5 mt-2">
                            <li className="flex items-center gap-2"><span className="text-accent-primary">•</span> Share photos, videos and highlights</li>
                            <li className="flex items-center gap-2"><span className="text-accent-primary">•</span> End-to-end encrypted messaging</li>
                            <li className="flex items-center gap-2"><span className="text-accent-primary">•</span> Athletic profile and stats showcase</li>
                            <li className="flex items-center gap-2"><span className="text-accent-primary">•</span> Recruiting status and scout connections</li>
                            <li className="flex items-center gap-2"><span className="text-accent-primary">•</span> Reels and short-form content</li>
                            <li className="flex items-center gap-2"><span className="text-accent-primary">•</span> Events and community engagement</li>
                        </ul>
                    </div>

                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-white">Privacy Policy</h3>
                            <p className="text-[12px] text-text-muted">Read our data handling practices</p>
                        </div>
                        <button onClick={() => router.push("/privacy")} className="text-accent-primary text-sm font-semibold hover:underline">
                            View →
                        </button>
                    </div>

                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-white">Terms of Use</h3>
                            <p className="text-[12px] text-text-muted">Review our terms and conditions</p>
                        </div>
                        <button onClick={() => router.push("/terms")} className="text-accent-primary text-sm font-semibold hover:underline">
                            View →
                        </button>
                    </div>
                </div>

                <p className="text-center text-[12px] text-text-muted mt-10 pb-4">
                    © {new Date().getFullYear()} Atheleos. All rights reserved.
                </p>
            </main>
        </div>
    );
}
