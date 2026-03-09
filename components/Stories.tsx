"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Stories() {
    const { user } = useAuth();

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {/* Add Story */}
            <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
                <div className="relative w-[72px] h-[72px] rounded-full p-[2px] border-2 border-border-color group-hover:border-accent-primary transition-colors">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-bg-surface">
                        <Image src={user?.avatarUrl || "/default_avatar.png"} alt="Add Story" fill className="object-cover opacity-80" unoptimized />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white font-bold text-xl border-2 border-bg-body">
                                +
                            </div>
                        </div>
                    </div>
                </div>
                <span className="text-xs text-text-primary font-medium truncate w-full text-center">Your Story</span>
            </div>
        </div>
    );
}
