"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeftIcon } from "@/components/Icons";

export default function DeleteAccountPage() {
    const router = useRouter();
    const { logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            const res = await fetch("/api/settings/delete-account", {
                method: "DELETE",
            });
            if (res.ok) {
                await logout();
                router.push("/login");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to delete account.");
                setIsDeleting(false);
                setShowModal(false);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsDeleting(false);
            setShowModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-body pb-24 relative">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3 sticky top-[64px] md:top-[64px] bg-black/80 backdrop-blur-xl z-10 border-b border-white/[0.06]">
                <button onClick={() => router.back()} className="text-white p-1.5 -ml-1 hover:bg-white/5 rounded-xl transition-colors">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-white">Delete Account</h1>
            </div>

            <div className="px-5 md:px-0 max-w-2xl mx-auto mt-8">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">We're sorry to see you go</h2>
                    <p className="text-text-secondary text-[15px] mb-4 leading-relaxed">
                        Deleting your account is permanent. When you delete your Atheleos account, the following data will be permanently erased from our database:
                    </p>
                    <ul className="list-disc list-inside text-text-secondary text-[14px] flex flex-col gap-2 mb-8 ml-2">
                        <li>Your profile, avatar, and bio</li>
                        <li>All your posts, images, videos, and texts</li>
                        <li>Your comments and likes</li>
                        <li>Your followers, following, and connections</li>
                        <li>Messages and story replies</li>
                        <li>Achievements and notifications</li>
                    </ul>
                    <p className="text-text-muted text-[13px] mb-8">
                        This action <strong>cannot be undone</strong>. If you feel like you just need a break, you might want to log out for a while instead. 
                    </p>

                    {error && (
                        <div className="bg-red-500/10 text-red-500 text-sm p-4 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-[#1C1C1C] border border-white/[0.1] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up">
                        <h3 className="text-lg font-bold text-white mb-2">Delete your account permanently?</h3>
                        <p className="text-sm text-text-secondary mb-6">
                            Are you sure you want to permanently delete your data? Once you click Yes, all your data will be permanently wiped out.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className={`w-full py-3 rounded-xl font-bold transition-colors ${
                                    isDeleting ? "bg-red-500/50 text-white/50 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
                                }`}
                            >
                                {isDeleting ? "Deleting..." : "Yes, delete my account"}
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={isDeleting}
                                className="w-full bg-transparent hover:bg-white/[0.05] text-white py-3 rounded-xl font-medium transition-colors"
                            >
                                No, keep my account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
