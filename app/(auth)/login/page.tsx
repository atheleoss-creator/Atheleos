"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("pro@athlete.com");
    const [password, setPassword] = useState("hashed_password_here");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // OTP State for pending verification
    const [requiresOtp, setRequiresOtp] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.requiresVerification) {
                    setRequiresOtp(true);
                    return; // Stop flow and show OTP screen
                }
                throw new Error(data.error || 'Login failed');
            }

            // Sync User State if successful (requires manual mutate or hard reload due to AuthContext flow)
            window.location.href = '/'; 
            
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
                body: JSON.stringify({ email, otp })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid OTP');
            }

            window.location.href = '/'; 
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

                {!requiresOtp ? (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-accent-gradient mb-2">
                                ATHLEOS
                            </h1>
                            <p className="text-text-secondary">Welcome back to the arena.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-text-secondary">Password</label>
                                    <Link href="/forgot-password" className="text-xs text-accent-primary hover:underline">Forgot password?</Link>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                                    placeholder="Enter your password"
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
                                    "Log In"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-text-secondary">
                            <p>Don&apos;t have an account? <Link href="/signup" className="text-accent-primary cursor-pointer hover:underline">Sign up</Link></p>
                            <div className="mt-4 text-xs text-text-muted">
                                Hardcoded Mock: User: pro@athlete.com, Pass: hashed_password_here
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                         <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-primary/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-text-primary mb-2">Verify your account</h2>
                            <p className="text-text-secondary text-sm">
                                Enter the verification code that was sent to <span className="text-white font-semibold">{email}</span>.
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
                                    "Confirm & Login"
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
