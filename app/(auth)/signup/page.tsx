"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [step, setStep] = useState<"details" | "otp">("details");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        password: ""
    });

    const [otp, setOtp] = useState("");
    const [savedEmail, setSavedEmail] = useState("");

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to sign up');
            }

            setSavedEmail(formData.email);
            setStep("otp");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: savedEmail, otp })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid OTP');
            }

            // Sync context state
            window.location.href = '/'; // Hard reload to trigger layout AuthContext useEffect
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
            <div className="w-full max-w-md p-8 bg-bg-card border border-border-color rounded-2xl shadow-xl transition-all relative overflow-hidden">

                {error && (
                    <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-2 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {step === "details" ? (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-accent-gradient mb-2">
                                JOIN ATHLEOS
                            </h1>
                            <p className="text-text-secondary">Create your premium sports profile.</p>
                        </div>

                        <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Username</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                                    placeholder="sports_fan_99"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                                    placeholder="user@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-6 bg-accent-gradient text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-primary/20 transform active:scale-95 transition-all flex items-center justify-center mt-4"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-primary/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-text-primary mb-2">Check your email</h2>
                            <p className="text-text-secondary text-sm">
                                We've sent a 6-digit verification code to <span className="text-white font-semibold">{savedEmail}</span>.
                            </p>
                        </div>

                        <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                            <div>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-mono placeholder:text-text-muted placeholder:text-lg placeholder:tracking-normal"
                                    placeholder="000000"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length < 6}
                                className="w-full py-3 px-6 bg-accent-gradient text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-primary/20 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center mt-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Verify Account"
                                )}
                            </button>
                        </form>
                    </>
                )}

                {step === "details" && (
                    <div className="mt-6 text-center text-sm text-text-secondary">
                        <p>Already have an account? <Link href="/login" className="text-accent-primary cursor-pointer hover:underline">Log in</Link></p>
                    </div>
                )}
            </div>
        </div>
    );
}
