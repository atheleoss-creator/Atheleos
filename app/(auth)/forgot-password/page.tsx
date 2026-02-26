"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [step, setStep] = useState<"request" | "verify" | "success">("request");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // Form States
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
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login');
            }, 2000);

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

                {step === "request" && (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-text-primary mb-2">Reset Password</h1>
                            <p className="text-text-secondary text-sm">Enter the email associated with your account and we'll send an OTP to reset your password.</p>
                        </div>

                        <form onSubmit={handleRequestReset} className="flex flex-col gap-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full py-3 px-6 bg-accent-gradient text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-primary/20 transform active:scale-95 transition-all flex items-center justify-center mt-2 disabled:opacity-50"
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
                         <h2 className="text-2xl font-bold text-text-primary mb-2">Check your email</h2>
                         <p className="text-text-secondary text-sm">
                             Enter the 6-digit verification code sent to <span className="text-white font-semibold">{email}</span>.
                         </p>
                     </div>

                     <form onSubmit={handleVerifyAndReset} className="flex flex-col gap-4">
                         <div>
                             <label className="block text-sm text-text-secondary mb-1">Reset Code</label>
                             <input
                                 type="text"
                                 maxLength={6}
                                 value={otp}
                                 onChange={(e) => setOtp(e.target.value)}
                                 className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-accent-primary font-mono placeholder:text-text-muted placeholder:text-lg placeholder:tracking-normal"
                                 placeholder="000000"
                                 required
                             />
                         </div>
                         
                         <div>
                             <label className="block text-sm text-text-secondary mb-1">New Password</label>
                             <input
                                 type="password"
                                 value={newPassword}
                                 onChange={(e) => setNewPassword(e.target.value)}
                                 className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary"
                                 placeholder="Enter new password"
                                 required
                             />
                         </div>

                         <button
                             type="submit"
                             disabled={loading || otp.length < 6 || !newPassword}
                             className="w-full py-3 px-6 bg-accent-gradient text-white font-bold rounded-xl hover:shadow-lg transform active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center mt-2"
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
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Password Reset!</h2>
                        <p className="text-sm text-text-secondary">Redirecting you to login...</p>
                    </div>
                )}

                {step !== "success" && (
                    <div className="mt-6 text-center text-sm text-text-secondary">
                        <Link href="/login" className="text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer">
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
