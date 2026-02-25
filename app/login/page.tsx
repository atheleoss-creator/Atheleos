"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("password");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            login();
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
            <div className="w-full max-w-md p-8 bg-bg-card border border-border-color rounded-2xl shadow-xl">
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
                        <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
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
                    <p>Don't have an account? <span className="text-accent-primary cursor-pointer hover:underline">Sign up</span></p>
                    <div className="mt-4 text-xs text-text-muted">
                        Hardcoded Login: User: user@example.com, Pass: password
                    </div>
                </div>
            </div>
        </div>
    );
}
