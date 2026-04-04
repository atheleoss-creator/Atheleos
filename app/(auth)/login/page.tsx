"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [actualEmail, setActualEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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
                body: JSON.stringify({ identifier, password })
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.requiresVerification) { 
                    setRequiresOtp(true); 
                    if (data.email) {
                        setActualEmail(data.email);
                        // Automatically send a fresh OTP so the user doesn't get stuck
                        await fetch('/api/auth/send-otp', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: data.email })
                        }).catch(console.error);
                    }
                    return; 
                }
                throw new Error(data.error || 'Login failed');
            }
            window.location.href = '/';
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Login failed');
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
                body: JSON.stringify({ email: actualEmail || identifier, otp })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Invalid OTP');
            window.location.href = '/';
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: actualEmail || identifier })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to resend OTP');
            // Show a simple success mechanism (could use toast, using alert/error for now)
            setError('');
            alert('A new OTP has been sent to your email.');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to resend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 py-12 overflow-hidden">

            {/* Animated decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[5%] w-20 h-20 rounded-full border border-white/[0.06] animate-[spin_20s_linear_infinite]" />
                <div className="absolute bottom-[15%] right-[8%] w-32 h-32 rounded-full border border-white/[0.04] animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute top-[30%] right-[15%] w-2.5 h-2.5 rounded-full bg-accent-primary/30 animate-pulse" />
                <div className="absolute bottom-[40%] left-[12%] w-2 h-2 rounded-full bg-accent-secondary/20 animate-pulse" style={{animationDelay: '1s'}} />
                <div className="absolute top-[20%] right-[20%] text-4xl opacity-[0.07] animate-bounce" style={{animationDuration: '3s'}}>⚽</div>
                <div className="absolute bottom-[25%] left-[15%] text-3xl opacity-[0.07] animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>🏀</div>
                <div className="absolute top-[60%] right-[10%] text-3xl opacity-[0.07] animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>🏊</div>
                <div className="absolute top-[15%] left-[25%] text-2xl opacity-[0.07] animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}>🎾</div>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-[420px] relative z-10">
                
                {/* Logo */}
                <div className="text-center mb-10 flex flex-col items-center">
                    <Image src="/atheleos.svg" alt="Atheleos Logo" width={240} height={60} className="w-auto h-12 md:h-14 mb-4 select-none drop-shadow-[0_0_15px_rgba(0,212,255,0.2)]" unoptimized />
                    <p className="text-text-secondary text-sm font-medium">
                        {requiresOtp ? 'One more step to verify your identity' : 'The arena awaits. Sign in to compete.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl text-center backdrop-blur-sm animate-fade-in">
                        {error}
                    </div>
                )}

                {!requiresOtp ? (
                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-7 shadow-2xl shadow-black/50">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-2">Email or Username</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                                            <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-all placeholder:text-text-tertiary"
                                        placeholder="you@example.com or username"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[11px] font-bold text-text-tertiary uppercase tracking-widest">Password</label>
                                    <Link href="/forgot-password" className="text-[11px] text-accent-primary hover:underline font-bold">Forgot?</Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-all placeholder:text-text-tertiary"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 relative overflow-hidden group bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] hover:bg-[center_right_1rem] text-white font-extrabold rounded-xl hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transform active:scale-95 transition-all duration-500 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                            >
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-700 ease-in-out skew-x-[-20deg]" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
                                        </svg>
                                    </>
                                )}
                                </span>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-white/[0.08]" />
                            <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest">or</span>
                            <div className="flex-1 h-px bg-white/[0.08]" />
                        </div>

                        <p className="text-center text-sm text-text-secondary">
                            New to the arena?{' '}
                            <Link href="/signup" className="text-accent-primary font-bold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                ) : (
                    /* OTP View */
                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-7 shadow-2xl shadow-black/50">
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-accent-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-1">Check your email</h2>
                            <p className="text-text-secondary text-sm">
                                We sent a 6-digit code to <span className="text-white font-semibold">{actualEmail || identifier}</span>
                            </p>
                        </div>
                        <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-all font-mono placeholder:text-text-tertiary placeholder:text-lg placeholder:tracking-normal"
                                placeholder="000000"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading || otp.length < 6}
                                className="w-full py-3.5 relative overflow-hidden group bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] hover:bg-[center_right_1rem] text-white font-extrabold rounded-xl hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-700 ease-in-out skew-x-[-20deg]" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : 'Verify & Continue'}
                                </span>
                                </button>
                            <div className="flex items-center justify-between mt-2">
                                <button type="button" onClick={handleResendOtp} disabled={loading} className="text-sm text-accent-primary hover:text-white transition-colors font-semibold">
                                    Resend Code
                                </button>
                                <button type="button" onClick={() => setRequiresOtp(false)} className="text-sm text-text-secondary hover:text-white transition-colors">
                                    ← Back to login
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <p className="text-center text-[11px] text-text-tertiary mt-8 mb-4">
                    By signing in, you agree to our <Link href="/terms" className="hover:underline text-text-secondary">Terms of Service</Link> and <Link href="/privacy" className="hover:underline text-text-secondary">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}
