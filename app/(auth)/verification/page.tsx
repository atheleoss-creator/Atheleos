"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";

export default function VerificationPage() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();

    const isPending = user?.verificationStatus === "pending";

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        sport: "",
        level: user?.requestedVerificationLevel || (user?.isVerified ? user?.verificationLevel : "struggler"),
        document: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter levels if user is already verified to only show upgrades logic could be added, 
    // but for simplicity we'll show all and just pre-select the next tier or same tier.
    const levels = [
        { id: "struggler", label: "Struggler Level", color: "bg-blue-500" },
        { id: "state", label: "State Level", color: "bg-gray-400" },
        { id: "national", label: "National Level", color: "bg-yellow-400" },
        { id: "international", label: "International Level", color: "bg-white" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (formData.level === "struggler") {
            // Auto approve struggler
            updateProfile({
                verificationStatus: "verified",
                verificationLevel: "struggler",
                isVerified: true,
                requestedVerificationLevel: undefined
            });
            alert("Struggler badge acquired successfully!");
            router.back();
        } else {
            if (!formData.document && !isPending) {
                alert("Please upload proof of achievement.");
                setIsSubmitting(false);
                return;
            }
            updateProfile({
                verificationStatus: "pending",
                requestedVerificationLevel: formData.level,
            });
        }

        setIsSubmitting(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, document: e.target.files[0] });
        }
    };

    return (
        <div className="min-h-screen bg-black pb-safe font-sans">
            {/* Header */}
            <div className="relative top-0 z-10 px-4 py-4 flex items-center border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
                <button onClick={() => router.back()} className="mr-4 p-1.5 hover:bg-white/5 rounded-xl transition-colors">
                    <ArrowLeftIcon className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-lg font-bold text-white">Apply for Verification</h1>
            </div>

            <div className="p-4 max-w-xl mx-auto mt-4">

                {isPending && (
                    <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-xl">
                        <div className="flex items-center gap-3 text-yellow-500 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-bold text-lg">Verification Pending</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                            Your request for the <strong className="text-white capitalize">{user?.requestedVerificationLevel}</strong> level badge is currently under review.
                        </p>
                        <button
                            onClick={() => {
                                updateProfile({
                                    verificationStatus: "verified",
                                    verificationLevel: user?.requestedVerificationLevel,
                                    isVerified: true,
                                    requestedVerificationLevel: undefined
                                });
                                alert(`Admin Simulation: Approved ${user?.requestedVerificationLevel} badge!`);
                            }}
                            className="bg-green-500 text-black font-bold text-sm px-4 py-2 rounded-lg hover:bg-green-400 transition-colors"
                        >
                            [Debug] Simulate Admin Approval
                        </button>
                    </div>
                )}

                <p className="text-gray-300 mb-8 text-[15px] leading-relaxed">
                    Get verified to show your athletic achievements. Choose your level
                    and upload proof (certificate, medal, ID card).
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:border-accent-primary/50 focus:outline-none transition-colors placeholder:text-text-tertiary text-[15px]"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Sport */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">Sport / Category</label>
                        <input
                            type="text"
                            required
                            value={formData.sport}
                            onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:border-accent-primary/50 focus:outline-none transition-colors placeholder:text-text-tertiary text-[15px]"
                            placeholder="e.g. Swimming, Cricket, Chess"
                        />
                    </div>

                    {/* Level Selection */}
                    <div className="space-y-3 pt-2">
                        <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">Achievement Level</label>
                        <div className="grid grid-cols-1 gap-3">
                            {levels.map((level) => (
                                <label
                                    key={level.id}
                                    className={`flex items-center p-3.5 rounded-xl border cursor-pointer transition-all ${formData.level === level.id
                                        ? "border-accent-primary/50 bg-accent-primary/5"
                                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]"
                                        }`}
                                >
                                    <div className="relative flex items-center justify-center w-4 h-4 mr-4">
                                        <input
                                            type="radio"
                                            name="level"
                                            value={level.id}
                                            checked={formData.level === level.id}
                                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                            className="w-full h-full opacity-0 absolute cursor-pointer z-10"
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.level === level.id ? 'border-accent-primary' : 'border-white/20'
                                            }`}>
                                            {formData.level === level.id && (
                                                <div className="w-2 h-2 bg-accent-primary rounded-full" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                                        <span className="text-white font-semibold text-[15px]">{level.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Document Upload */}
                    {formData.level !== "struggler" && (
                        <div className="space-y-2 pt-2">
                            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">Proof of Achievement</label>
                            <div className="border border-dashed border-white/[0.12] rounded-xl p-8 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer relative mt-2">
                                <input
                                    type="file"
                                    required={!isPending && formData.level !== "struggler"} // require if not just viewing pending state
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {formData.document ? (
                                    <div className="text-center z-10 pointer-events-none">
                                        <div className="w-10 h-10 bg-accent-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-accent-primary">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-accent-primary font-bold truncate max-w-[200px] text-sm">{formData.document.name}</p>
                                        <p className="text-xs text-neutral-400 mt-1">Click to change file</p>
                                    </div>
                                ) : (
                                    <div className="text-center z-10 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white mx-auto mb-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                        <p className="text-white font-bold text-[15px]">Upload Certificate</p>
                                        <p className="text-xs text-neutral-400 mt-1 font-medium">Image or PDF (Max 5MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || isPending}
                            className={`w-full font-bold py-3.5 rounded-xl transition-all ${isPending ? "bg-white/[0.06] cursor-not-allowed text-text-tertiary" : "bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-95"
                                }`}
                        >
                            {isSubmitting ? "Submitting..." : isPending ? "Request Pending" : "Apply for Verification"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
