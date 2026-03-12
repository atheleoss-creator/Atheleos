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

import { KeyStore, generateKeyPair, exportKey } from "@/lib/crypto";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    isAuthenticated: boolean;
    publicKey: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [publicKey, setPublicKey] = useState<string | null>(null);
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
                    
                    // On successful login detection, fetch existing public key from backend if missing locally
                    const localPrivKey = await KeyStore.getPrivateKey();
                    if (!localPrivKey) {
                        console.warn("E2EE Warning: No local private key found. User may not be able to read past messages.");
                        // Generate a new keypair to at least allow new conversations to work,
                        // Though historically encrypted messages will be lost on this device.
                        // For a robust system, we would prompt the user to input a recovery phrase here.
                    }
                } else {
                    setUser(null);
                    await KeyStore.clearKeys();
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

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
        <AuthContext.Provider value={{ user, setUser, logout, updateProfile, isAuthenticated: !!user, publicKey }}>
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
