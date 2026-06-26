"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
    const [step, setStep] = useState<"basic" | "profile" | "otp">("basic");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        dob: "",
        password: "",
        role: "athlete",
        city: "",
        state: "",
        bio: "",
        sport: "",
        position: "",
        height: "",
        weight: "",
        topSpeed: "",
        verticalLeap: "",
        recruitingStatus: "Not Looking"
    });

    const [otp, setOtp] = useState("");
    const [savedEmail, setSavedEmail] = useState("");

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.username || !formData.fullName || !formData.email || !formData.dob || !formData.password) {
            setError("Please fill in all basic account details including Date of Birth.");
            return;
        }
        setError("");
        setStep("profile");
    };

    const handleSkip = async () => {
        const fakeEvent = { preventDefault: () => { } } as any;
        await handleSignupSubmit(fakeEvent);
    };

    const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let publicKeyBase64 = "";
            try {
                const { generateKeyPair, exportKey, KeyStore } = await import("@/lib/crypto");
                const keyPair = await generateKeyPair();
                const privateKeyBase64 = await exportKey(keyPair.privateKey, 'pkcs8');
                publicKeyBase64 = await exportKey(keyPair.publicKey, 'spki');

                await KeyStore.savePrivateKey(privateKeyBase64);
            } catch (cryptoErr) {
                console.error("Failed to generate E2EE keys", cryptoErr);
                throw new Error("Your browser does not support the required encryption features.");
            }

            const submitData = {
                ...formData,
                publicKey: publicKeyBase64
            };

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            const data = await res.json();

            if (!res.ok) {
                const errMsg = data.sqlMessage
                    ? `${data.error} (${data.code}: ${data.sqlMessage})`
                    : (data.error || 'Failed to sign up');
                throw new Error(errMsg);
            }

            setSavedEmail(formData.email);
            setStep('otp');

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
            if (!res.ok) throw new Error(data.error || 'Invalid OTP');
            window.location.href = '/';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-[#181818] border border-neutral-800 focus:border-[#0095F6] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#0095F6] transition-all placeholder:text-neutral-500 font-medium text-sm";
    const compactInput = "w-full bg-[#181818] border border-neutral-800 focus:border-[#0095F6] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#0095F6] transition-all placeholder:text-neutral-500 font-medium text-xs";
    const labelClass = "block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono";
    const compactLabel = "block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 font-mono";

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
                        Join the fastest growing network of <span className="bg-gradient-to-r from-[#0095F6] via-[#38BDF8] to-[#E5C158] bg-clip-text text-transparent">champions & fans</span>.
                    </h1>
                    <p className="text-neutral-400 text-base lg:text-lg leading-relaxed mb-8">
                        Build your athletic resume, unlock scouting opportunities, and showcase your highlights to the world.
                    </p>

                    {/* Decorative Showcase Card */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0095F6] to-[#E5C158] p-[2px] flex-shrink-0">
                            <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center text-lg">🏆</div>
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm flex items-center gap-2">
                                Elite Roster Access <span className="text-[10px] bg-[#0095F6]/20 text-[#38BDF8] px-2 py-0.5 rounded-full border border-[#0095F6]/30 font-mono">VERIFIED</span>
                            </div>
                            <div className="text-xs text-neutral-400 mt-0.5">End-to-end encrypted messaging & profiles</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Credits */}
                <div className="text-xs text-neutral-600 font-mono relative z-10">
                    © {new Date().getFullYear()} ATHELEOS PLATFORM. TRAIN. CONNECT. INSPIRE.
                </div>
            </div>

            {/* Right Authentication Form Pane */}
            <div className="flex-1 p-6 sm:p-12 lg:p-16 bg-[#0c0c0c] relative z-10 overflow-y-auto h-screen">
                <div className="min-h-full flex flex-col justify-center items-center py-8">
                    <div className="w-full max-w-[440px]">

                        {/* Mobile Brand Logo (Visible only on mobile/tablet) */}
                        <div className="lg:hidden flex flex-col items-center mb-8">
                            <Image src="/atheleos.png" alt="Atheleos Icon" width={76} height={76} className="w-18 h-18 mb-3 object-contain drop-shadow-[0_0_15px_rgba(229,193,88,0.4)]" unoptimized />
                            <Image src="/AtheleosText.png" alt="Atheleos Text" width={220} height={44} className="h-10 w-auto object-contain select-none drop-shadow-[0_0_12px_rgba(229,193,88,0.2)]" unoptimized />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                            {step === "basic" ? 'Create new account' : step === "profile" ? 'Customize Your Profile' : 'Check your email'}
                        </h2>
                        <p className="text-neutral-400 text-sm mb-6">
                            {step === "basic" ? 'Enter your basic account credentials.' : step === "profile" ? 'Add athlete details or skip for now.' : `We sent a 6-digit verification code to ${savedEmail}`}
                        </p>

                        {error && (
                            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl text-center font-medium animate-fade-in">
                                {error}
                            </div>
                        )}

                        {step === "basic" && (
                            <form onSubmit={handleNextStep} className="flex flex-col gap-3.5">
                                <div>
                                    <label className={labelClass}>Username</label>
                                    <input type="text" name="username" id="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className={inputClass} placeholder="sports_fan_99" required />
                                </div>
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputClass} placeholder="John Doe" required />
                                </div>
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="you@example.com" required />
                                </div>
                                <div>
                                    <label className={labelClass}>Date of Birth</label>
                                    <input type="date" name="dob" id="dob" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className={`${inputClass} cursor-pointer [color-scheme:dark]`} required />
                                </div>
                                <div>
                                    <label className={labelClass}>Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={`${inputClass} pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden`} placeholder="Create a strong password" required />
                                        {formData.password.length > 0 && (
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
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#0095F6] hover:bg-[#1877F2] active:bg-[#0074CC] text-white font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_12px_rgba(0,149,246,0.3)] transition-all duration-200 mt-2 flex items-center justify-center cursor-pointer"
                                >
                                    Next Step →
                                </button>

                                <div className="mt-4 text-center text-sm text-neutral-400">
                                    Have an account? <Link href="/login" className="text-[#38BDF8] font-bold hover:underline ml-1">Log in</Link>
                                </div>
                            </form>
                        )}

                        {step === "profile" && (
                            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-3 animate-fade-in">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-1">
                                        <label className={compactLabel}>Role</label>
                                        <select name="role" id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={`${compactInput} appearance-none cursor-pointer`} required>
                                            <option value="athlete" className="bg-[#181818]">Athlete</option>

                                            <option value="coach" className="bg-[#181818]">Coach / Scout</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label className={compactLabel}>City</label>
                                        <input type="text" name="city" id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={compactInput} placeholder="Los Angeles" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className={compactLabel}>State</label>
                                        <input type="text" name="state" id="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={compactInput} placeholder="CA" />
                                    </div>
                                </div>

                                {formData.role === "athlete" && (
                                    <>
                                        <div className="h-px w-full bg-neutral-800 my-0.5" />
                                        <div className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest font-mono">Athlete Details (Optional)</div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className={compactLabel}>Sport</label>
                                                <input type="text" name="sport" id="sport" value={formData.sport} onChange={(e) => setFormData({ ...formData, sport: e.target.value })} className={compactInput} placeholder="Basketball" />
                                            </div>
                                            <div>
                                                <label className={compactLabel}>Position</label>
                                                <input type="text" name="position" id="position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className={compactInput} placeholder="PG" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <div>
                                                <label className={compactLabel}>Height</label>
                                                <input type="text" name="height" id="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className={compactInput} placeholder="6'2&quot;" />
                                            </div>
                                            <div>
                                                <label className={compactLabel}>Weight</label>
                                                <input type="text" name="weight" id="weight" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className={compactInput} placeholder="195 lbs" />
                                            </div>
                                            <div>
                                                <label className={compactLabel}>Speed</label>
                                                <input type="text" name="topSpeed" id="topSpeed" value={formData.topSpeed} onChange={(e) => setFormData({ ...formData, topSpeed: e.target.value })} className={compactInput} placeholder="21 mph" />
                                            </div>
                                            <div>
                                                <label className={compactLabel}>Vertical</label>
                                                <input type="text" name="verticalLeap" id="verticalLeap" value={formData.verticalLeap} onChange={(e) => setFormData({ ...formData, verticalLeap: e.target.value })} className={compactInput} placeholder="36 in" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={compactLabel}>Recruiting Status</label>
                                            <select name="recruitingStatus" id="recruitingStatus" value={formData.recruitingStatus} onChange={(e) => setFormData({ ...formData, recruitingStatus: e.target.value })} className={`${compactInput} appearance-none cursor-pointer`}>
                                                <option value="Not Looking" className="bg-[#181818]">Not Looking</option>
                                                <option value="Looking" className="bg-[#181818]">Looking for Offers</option>
                                                <option value="Signed" className="bg-[#181818]">Signed / Committed</option>
                                                <option value="Free Agent" className="bg-[#181818]">Free Agent</option>
                                            </select>
                                        </div>
                                        <div className="h-px w-full bg-neutral-800 my-0.5" />
                                    </>
                                )}

                                <div>
                                    <label className={compactLabel}>Short Bio (Optional)</label>
                                    <textarea name="bio" id="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className={`${compactInput} resize-none`} placeholder="Tell us about your sports journey..." rows={1} />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#0095F6] hover:bg-[#1877F2] active:bg-[#0074CC] text-white font-bold text-sm py-3 rounded-xl shadow-[0_4px_12px_rgba(0,149,246,0.3)] transition-all duration-200 mt-1 flex items-center justify-center disabled:opacity-60 cursor-pointer"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : "Complete Signup"}
                                </button>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleSkip}
                                    className="w-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-neutral-300 font-bold text-xs py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-60 cursor-pointer border border-neutral-700"
                                >
                                    Skip for now →
                                </button>

                                <div className="mt-1 text-center text-xs text-neutral-400">
                                    <button type="button" onClick={() => setStep('basic')} className="text-[#38BDF8] font-bold hover:underline">← Back to basic details</button>
                                </div>
                            </form>
                        )}

                        {step === "otp" && (
                            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 animate-fade-in">
                                <input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-[#181818] border border-neutral-800 focus:border-[#0095F6] rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-1 focus:ring-[#0095F6] transition-all font-mono font-bold placeholder:text-neutral-600 placeholder:text-base placeholder:tracking-normal" placeholder="000000" required />

                                <button type="submit" disabled={loading || otp.length < 6} className="w-full bg-[#0095F6] hover:bg-[#1877F2] active:bg-[#0074CC] text-white font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_12px_rgba(0,149,246,0.3)] transition-all duration-200 mt-2 flex items-center justify-center disabled:opacity-50 cursor-pointer">
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : "Verify Account"}
                                </button>

                                <div className="mt-4 text-center text-sm text-neutral-400">
                                    <button type="button" onClick={() => setStep('basic')} className="text-[#38BDF8] font-bold hover:underline">← Back to registration</button>
                                </div>
                            </form>
                        )}

                        <div className="mt-8 text-center text-xs text-neutral-500 font-medium">
                            By signing up, you agree to Atheleos <Link href="/terms" className="underline hover:text-neutral-400">Terms</Link> and <Link href="/privacy" className="underline hover:text-neutral-400">Privacy Policy</Link>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
