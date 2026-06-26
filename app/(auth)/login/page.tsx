"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [actualEmail, setActualEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
            setError('');
            alert('A new OTP has been sent to your email.');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to resend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-[#050505] text-white selection:bg-[#0095F6]/30">
            {/* Left Brand Showcase Pane */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 lg:p-16 relative overflow-hidden border-r border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0d0d0d]">
                {/* Subtle Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#0095F6]/[0.08] rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#E5C158]/[0.06] rounded-full blur-[140px] pointer-events-none" />

                {/* Top Logo */}
                <div className="flex items-center gap-4 relative z-10 mt-3">
                    <Image src="/atheleos.png" alt="Atheleos Icon" width={68} height={68} className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(229,193,88,0.4)]" unoptimized />
                    <Image src="/AtheleosText.png" alt="Atheleos Text" width={220} height={44} className="h-10 w-auto object-contain select-none drop-shadow-[0_0_12px_rgba(229,193,88,0.2)] mt-1" unoptimized />
                </div>

                {/* Center Hero Text & Visual */}
                <div className="my-auto max-w-lg relative z-10 py-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] mb-6">
                        See everyday moments from your <span className="bg-gradient-to-r from-[#0095F6] via-[#38BDF8] to-[#E5C158] bg-clip-text text-transparent">favorite athletes</span>.
                    </h1>
                    <p className="text-neutral-400 text-base lg:text-lg leading-relaxed mb-8">
                        Connect with teammates, track elite training milestones, and compete in the ultimate global sports community.
                    </p>

                    {/* Decorative Showcase Card */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0095F6] to-[#E5C158] p-[2px] flex-shrink-0">
                            <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center text-lg">⚡</div>
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm flex items-center gap-2">
                                Pro Arena Network <span className="text-[10px] bg-[#0095F6]/20 text-[#38BDF8] px-2 py-0.5 rounded-full border border-[#0095F6]/30 font-mono">ACTIVE</span>
                            </div>
                            <div className="text-xs text-neutral-400 mt-0.5">Global athlete verification & matchmaking live</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Credits */}
                <div className="text-xs text-neutral-600 font-mono relative z-10">
                    © {new Date().getFullYear()} ATHELEOS PLATFORM. TRAIN. CONNECT. INSPIRE.
                </div>
            </div>

            {/* Right Authentication Form Pane */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-[#0c0c0c] relative z-10">
                <div className="w-full max-w-[380px]">

                    {/* Mobile Brand Logo (Visible only on mobile/tablet) */}
                    <div className="lg:hidden flex flex-col items-center mb-8">
                        <Image src="/atheleos.png" alt="Atheleos Icon" width={76} height={76} className="w-18 h-18 mb-3 object-contain drop-shadow-[0_0_15px_rgba(229,193,88,0.4)]" unoptimized />
                        <Image src="/AtheleosText.png" alt="Atheleos Text" width={220} height={44} className="h-10 w-auto object-contain select-none drop-shadow-[0_0_12px_rgba(229,193,88,0.2)]" unoptimized />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
                        {requiresOtp ? 'Enter Security Code' : 'Log into Atheleos'}
                    </h2>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl text-center font-medium animate-fade-in">
                            {error}
                        </div>
                    )}

                    {!requiresOtp ? (
                        <>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                <div>
                                    <input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full bg-[#181818] border border-neutral-800 focus:border-[#0095F6] rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#0095F6] transition-all font-medium"
                                        placeholder="Mobile number, username or email"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#181818] border border-neutral-800 focus:border-[#0095F6] rounded-xl px-4 py-3.5 pr-12 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#0095F6] transition-all font-medium [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                                        placeholder="Password"
                                        required
                                    />
                                    {password.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer select-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            )}
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#0095F6] hover:bg-[#1877F2] active:bg-[#0074CC] text-white font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_12px_rgba(0,149,246,0.3)] transition-all duration-200 mt-1.5 flex items-center justify-center disabled:opacity-60 cursor-pointer"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : 'Log in'}
                                </button>

                                {/* Forgot password in white text */}
                                <div className="text-center mt-3 mb-1">
                                    <Link href="/forgot-password" className="text-white hover:text-neutral-300 text-sm font-semibold transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 h-px bg-neutral-800" />
                                <span className="text-xs text-neutral-500 font-semibold uppercase">or</span>
                                <div className="flex-1 h-px bg-neutral-800" />
                            </div>

                            {/* Create new account button */}
                            <Link
                                href="/signup"
                                className="w-full block text-center border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50 text-[#38BDF8] font-bold text-sm py-3.5 rounded-xl transition-all duration-200"
                            >
                                Create new account
                            </Link>
                        </>
                    ) : (
                        /* OTP View */
                        <div className="flex flex-col gap-5">
                            <p className="text-neutral-400 text-sm">
                                We sent a 6-digit verification code to <span className="text-white font-semibold">{actualEmail || identifier}</span>.
                            </p>
                            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    className="w-full bg-[#181818] border border-neutral-800 focus:border-[#0095F6] rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-1 focus:ring-[#0095F6] transition-all font-mono font-bold placeholder:text-neutral-600 placeholder:text-base placeholder:tracking-normal"
                                    placeholder="000000"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading || otp.length < 6}
                                    className="w-full bg-[#0095F6] hover:bg-[#1877F2] active:bg-[#0074CC] text-white font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_12px_rgba(0,149,246,0.3)] transition-all duration-200 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : 'Confirm & Continue'}
                                </button>
                                <div className="flex items-center justify-between mt-2">
                                    <button type="button" onClick={handleResendOtp} disabled={loading} className="text-sm text-[#38BDF8] hover:text-white font-semibold transition-colors cursor-pointer">
                                        Resend Code
                                    </button>
                                    <button type="button" onClick={() => setRequiresOtp(false)} className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">
                                        ← Back to login
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="mt-12 text-center text-xs text-neutral-500 font-medium">
                        By continuing, you agree to Atheleos <Link href="/terms" className="underline hover:text-neutral-400">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-neutral-400">Privacy Policy</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}
