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
    const router = useRouter();

    const updateProfile = (data: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem("atheleos_user", JSON.stringify(updatedUser));
        }
    };

    // Simulating persisted auth
    useEffect(() => {
        const storedUser = localStorage.getItem("atheleos_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = () => {
        // Hardcoded user based on existing app
        const defaultUser: User = {
            username: "athlete",
            fullName: "Pro Athlete",
            avatarUrl: "https://ui-avatars.com/api/?name=Pro+Athlete&background=1E293B&color=00D4FF",
            bio: "Professional Athlete",
            isVerified: true,
            verificationLevel: "international",
            verificationStatus: "verified",
            coverUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1000&h=300&fit=crop",
            teams: ["National Swim Team", "Lakeside Aquatics"],
            achievements: ["Gold Medal 200m Free", "National Record Holder", "MVP 2023"],
            performanceStats: {
                "Matches Played": 120,
                "Win Rate": "85%",
                "Total Points": "1,450",
                "MVP Awards": 14
            },
            highlights: [
                { id: 1, title: "Finals '23", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=300&fit=crop", views: "14K" },
                { id: 2, title: "Training", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=200&h=300&fit=crop", views: "8.2K" },
                { id: 3, title: "Nationals", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=300&fit=crop", views: "22K" },
            ],
            matches: [
                { id: 1, date: "Oct 12, 2023", opponent: "Riverside Club", result: "Win", score: "4 - 2", type: "Championship" },
                { id: 2, date: "Sep 28, 2023", opponent: "Metro Elite", result: "Loss", score: "1 - 3", type: "Friendly" },
                { id: 3, date: "Sep 15, 2023", opponent: "Valley Prep", result: "Win", score: "5 - 0", type: "League Game" }
            ]
        };
        setUser(defaultUser);
        localStorage.setItem("atheleos_user", JSON.stringify(defaultUser));
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("atheleos_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
            {children}
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
