"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Stories() {
    const { user } = useAuth();

    return (
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide animate-fade-in">
            {/* Add Story */}
            <div className="flex flex-col items-center gap-1.5 min-w-[72px] cursor-pointer group">
                <div className="relative w-[68px] h-[68px] rounded-full p-[2px] border-2 border-white/[0.08] group-hover:border-accent-primary/50 transition-all duration-200">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-bg-surface">
                        <Image src={user?.avatarUrl || "/default_avatar.png"} alt="Add Story" fill className="object-cover opacity-70 group-hover:opacity-90 transition-opacity" unoptimized />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-7 h-7 rounded-full bg-accent-primary flex items-center justify-center text-white text-lg font-bold shadow-[0_0_10px_rgba(0,212,255,0.4)] border-2 border-black">
                                +
                            </div>
                        </div>
                    </div>
                </div>
                <span className="text-[11px] text-text-secondary font-medium truncate w-full text-center">Your Story</span>
            </div>
        </div>
    );
}
