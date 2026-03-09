"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [step, setStep] = useState<"request" | "verify" | "success">("request");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');
            
            setStep("verify");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Invalid OTP');

            setStep("success");
            setTimeout(() => { router.push('/login'); }, 2000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-all placeholder:text-text-tertiary";

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-md p-7 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 transition-all relative overflow-hidden">

                {error && (
                    <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl text-center animate-fade-in">
                        {error}
                    </div>
                )}

                {step === "request" && (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 text-accent-primary">
                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                            <p className="text-text-secondary text-sm">Enter the email associated with your account and we&apos;ll send an OTP to reset your password.</p>
                        </div>

                        <form onSubmit={handleRequestReset} className="flex flex-col gap-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full py-3.5 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transform active:scale-95 transition-all duration-500 flex items-center justify-center mt-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Send Reset Code"
                                )}
                            </button>
                        </form>
                    </>
                )}

                {step === "verify" && (
                     <>
                     <div className="text-center mb-6">
                         <div className="w-14 h-14 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-primary/20">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-accent-primary">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                             </svg>
                         </div>
                         <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
                         <p className="text-text-secondary text-sm">
                             Enter the 6-digit code sent to <span className="text-white font-semibold">{email}</span>.
                         </p>
                     </div>

                     <form onSubmit={handleVerifyAndReset} className="flex flex-col gap-4">
                         <div>
                             <label className="block text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-1.5">Reset Code</label>
                             <input
                                 type="text"
                                 maxLength={6}
                                 value={otp}
                                 onChange={(e) => setOtp(e.target.value)}
                                 className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-accent-primary/50 font-mono placeholder:text-text-tertiary placeholder:text-lg placeholder:tracking-normal"
                                 placeholder="000000"
                                 required
                             />
                         </div>
                         
                         <div>
                             <label className="block text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-1.5">New Password</label>
                             <input
                                 type="password"
                                 value={newPassword}
                                 onChange={(e) => setNewPassword(e.target.value)}
                                 className={inputClass}
                                 placeholder="Enter new password"
                                 required
                             />
                         </div>

                         <button
                             type="submit"
                             disabled={loading || otp.length < 6 || !newPassword}
                             className="w-full py-3.5 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transform active:scale-95 disabled:opacity-50 transition-all duration-500 flex items-center justify-center mt-2"
                         >
                             {loading ? (
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             ) : (
                                 "Reset Password"
                             )}
                         </button>
                     </form>
                 </>
                )}

                {step === "success" && (
                    <div className="text-center py-6 animate-fade-in">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Password Reset!</h2>
                        <p className="text-sm text-text-secondary">Redirecting you to login...</p>
                    </div>
                )}

                {step !== "success" && (
                    <div className="mt-6 text-center text-sm text-text-secondary">
                        <Link href="/login" className="text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
