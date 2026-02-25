"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileRedirect() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        } else if (user) {
            router.push(`/profile/${user.username}`);
        }
    }, [isAuthenticated, user, router]);

    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
