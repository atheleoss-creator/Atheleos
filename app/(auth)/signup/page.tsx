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
            window.location.href = '/login';

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

    const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-all placeholder:text-text-tertiary";
    const labelClass = "block text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-1.5";

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-8">
            <div className="w-full max-w-md p-7 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 transition-all relative overflow-hidden">

                {error && (
                    <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl text-center backdrop-blur-sm animate-fade-in">
                        {error}
                    </div>
                )}

                {step === "details" ? (
                    <>
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary mb-4 shadow-[0_0_25px_rgba(0,212,255,0.3)]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary mb-2 uppercase tracking-wider">
                                Join Atheleos
                            </h1>
                            <p className="text-text-secondary text-sm">Create your premium sports profile.</p>
                        </div>

                        <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
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
                                <input type="email" name="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="user@example.com" required />
                            </div>
                            <div>
                                <label className={labelClass}>Password</label>
                                <input type="password" name="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={inputClass} placeholder="Create a strong password" required />
                            </div>
                            <div>
                                <label className={labelClass}>Role</label>
                                <select name="role" id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={`${inputClass} appearance-none`} required>
                                    <option value="athlete">Athlete</option>
                                    <option value="fan">Fan</option>
                                    <option value="coach">Coach / Scout</option>
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className={labelClass}>City</label>
                                    <input type="text" name="city" id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={inputClass} placeholder="Los Angeles" />
                                </div>
                                <div className="flex-1">
                                    <label className={labelClass}>State</label>
                                    <input type="text" name="state" id="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={inputClass} placeholder="CA" />
                                </div>
                            </div>
                            
                            {formData.role === "athlete" && (
                                <>
                                    <div className="h-px w-full bg-white/[0.06] my-1" />
                                    <h3 className="text-[11px] font-bold text-accent-primary uppercase tracking-widest">Athlete Profile (Optional)</h3>
                                    
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className={labelClass}>Sport</label>
                                            <input type="text" name="sport" id="sport" value={formData.sport} onChange={(e) => setFormData({ ...formData, sport: e.target.value })} className={inputClass} placeholder="Basketball" />
                                        </div>
                                        <div className="flex-1">
                                            <label className={labelClass}>Position</label>
                                            <input type="text" name="position" id="position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className={inputClass} placeholder="PG" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className={labelClass}>Height</label>
                                            <input type="text" name="height" id="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className={inputClass} placeholder="6'2&quot;" />
                                        </div>
                                        <div className="flex-1">
                                            <label className={labelClass}>Weight</label>
                                            <input type="text" name="weight" id="weight" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className={inputClass} placeholder="195 lbs" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className={labelClass}>Top Speed</label>
                                            <input type="text" name="topSpeed" id="topSpeed" value={formData.topSpeed} onChange={(e) => setFormData({ ...formData, topSpeed: e.target.value })} className={inputClass} placeholder="21 mph" />
                                        </div>
                                        <div className="flex-1">
                                            <label className={labelClass}>Vertical</label>
                                            <input type="text" name="verticalLeap" id="verticalLeap" value={formData.verticalLeap} onChange={(e) => setFormData({ ...formData, verticalLeap: e.target.value })} className={inputClass} placeholder="36 in" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Recruiting Status</label>
                                        <select name="recruitingStatus" id="recruitingStatus" value={formData.recruitingStatus} onChange={(e) => setFormData({ ...formData, recruitingStatus: e.target.value })} className={`${inputClass} appearance-none`}>
                                            <option value="Not Looking">Not Looking</option>
                                            <option value="Looking">Looking for Offers</option>
                                            <option value="Signed">Signed / Committed</option>
                                            <option value="Free Agent">Free Agent</option>
                                        </select>
                                    </div>
                                    <div className="h-px w-full bg-white/[0.06] my-1" />
                                </>
                            )}
                            
                            <div>
                                <label className={labelClass}>Short Bio (Optional)</label>
                                <textarea name="bio" id="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className={`${inputClass} resize-none`} placeholder="Tell us about your sports journey..." rows={2} />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 relative overflow-hidden group bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] hover:bg-[center_right_1rem] text-white font-extrabold rounded-xl hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transform active:scale-95 transition-all duration-500 flex items-center justify-center mt-3 disabled:opacity-60"
                            >
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-700 ease-in-out skew-x-[-20deg]" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Create Account"
                                )}
                                </span>
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-accent-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
                            <p className="text-text-secondary text-sm">
                                We&apos;ve sent a 6-digit code to <span className="text-white font-semibold">{savedEmail}</span>.
                            </p>
                        </div>

                        <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                            <input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-all font-mono placeholder:text-text-tertiary placeholder:text-lg placeholder:tracking-normal" placeholder="000000" required />

                            <button type="submit" disabled={loading || otp.length < 6} className="w-full py-3.5 relative overflow-hidden group bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] hover:bg-[center_right_1rem] text-white font-extrabold rounded-xl hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 flex items-center justify-center mt-2">
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-700 ease-in-out skew-x-[-20deg]" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Verify Account"
                                )}
                                </span>
                            </button>
                        </form>
                    </>
                )}

                {step === "details" && (
                    <div className="mt-6 text-center text-sm text-text-secondary">
                        <p>Already have an account? <Link href="/login" className="text-accent-primary font-bold hover:underline">Log in</Link></p>
                    </div>
                )}
            </div>
        </div>
    );
}
