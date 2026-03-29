"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const faqs = [
    {
        q: "How do I edit my profile?",
        a: "Go to your profile page and tap 'Edit Profile', or go to Settings → Accounts Center. You can update your name, bio, sport, stats, and profile picture."
    },
    {
        q: "How do I change my password?",
        a: "Currently you can reset your password from the login page using the 'Forgot Password' link, which will send a verification code to your registered email."
    },
    {
        q: "How do I make my account private?",
        a: "Go to Settings → Account Privacy and toggle between Public and Private mode. Private accounts require follow approval."
    },
    {
        q: "How do I save posts?",
        a: "Tap the bookmark icon on any post to save it. View your saved posts from Settings → Saved."
    },
    {
        q: "How do I delete a post?",
        a: "Go to your profile, find the post you want to delete, and use the three-dot menu to remove it. This action cannot be undone."
    },
    {
        q: "Is my messaging secure?",
        a: "Yes! Atheleos uses end-to-end encryption for direct messages. Only you and the person you're messaging can read the content."
    },
    {
        q: "How does verification work?",
        a: "Verified athletes get a badge on their profile. Verification is currently handled by the Atheleos team. Stay active and build your profile for a chance to be verified."
    },
    {
        q: "How do I report a problem?",
        a: "Contact us at support@atheleos.in with a description of the issue. Include screenshots if possible."
    },
];

export default function HelpPage() {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-bg-body text-text-primary pb-24 md:pb-10">
            <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-2xl mx-auto px-4 flex items-center h-14 gap-3">
                    <button onClick={() => router.back()} className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold">Help</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 pt-6">
                <div className="mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold text-white mb-1">Frequently Asked Questions</h2>
                    <p className="text-sm text-text-muted">Find answers to common questions below.</p>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                            >
                                <span className="text-[14px] font-semibold text-white pr-4">{faq.q}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className={`w-4 h-4 text-text-muted shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            {openIndex === i && (
                                <div className="px-4 pb-4 pt-0 animate-fade-in">
                                    <p className="text-[13px] text-text-secondary leading-relaxed">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-10 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-xl p-5 text-center animate-fade-in">
                    <h3 className="text-base font-bold text-white mb-1">Still need help?</h3>
                    <p className="text-sm text-text-secondary mb-4">Reach out to our support team.</p>
                    <a
                        href="mailto:support@atheleos.in"
                        className="inline-block bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold px-6 py-2.5 rounded-full text-sm hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all active:scale-95"
                    >
                        Contact Support
                    </a>
                </div>
            </main>
        </div>
    );
}
