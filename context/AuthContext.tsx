"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    username: string;
    fullName: string;
    avatarUrl: string;
    coverUrl?: string;
    bio?: string;
    isVerified?: boolean;
    verificationLevel?: string;
    verificationStatus?: "unverified" | "pending" | "verified";
    requestedVerificationLevel?: string;
    teams?: string[];
    achievements?: string[];
    performanceStats?: Record<string, string | number>;
    highlights?: any[];
    matches?: any[];
    role?: string;
}

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const updateProfile = (data: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...data });
        }
    };

    // Auto-login on mount by checking the session cookie
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async () => {
        try {
            // Hardcoded credentials mapped to the SQL seed for easy migration testing
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'pro@athlete.com', password: 'hashed_password_here' })
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                router.push("/");
            } else {
                alert("Login failed. Check your database setup.");
            }
        } catch (error) {
            console.error("Login Error", error);
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout Error", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
