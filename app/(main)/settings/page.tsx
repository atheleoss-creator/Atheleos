"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    ArrowLeftIcon,
    SearchIcon,
    UserCircleIcon,
    BookmarkIcon,
    ArchiveIcon,
    ActivityIcon,
    NotificationsIcon,
    TimeIcon,
    InsightsIcon,
    MetaIcon,
    MessagesIcon,
    BadgeIcon,
    ArrowRightIcon
} from "@/components/Icons";

const MenuItem = ({ icon, label, subLabel, onClick, href, isRed }: { icon: React.ReactNode, label: string, subLabel?: string, onClick?: () => void, href?: string, isRed?: boolean }) => {
    const content = (
        <div
            className={`flex items-center justify-between py-3.5 cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors rounded-xl px-2 -mx-2`}
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                <div className={`${isRed ? "text-red-500" : "text-text-secondary"}`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className={`text-[15px] font-medium ${isRed ? "text-red-500" : "text-white"}`}>{label}</span>
                    {subLabel && <span className="text-[12px] text-text-tertiary">{subLabel}</span>}
                </div>
            </div>
            {!isRed && <ArrowRightIcon className="w-5 h-5 text-text-tertiary" />}
        </div>
    );
    if (href) return <Link href={href} className="block">{content}</Link>;
    return content;
};

const SectionHeader = ({ title }: { title: string }) => (
    <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mt-8 mb-2 px-1">
        {title}
    </div>
);

export default function SettingsPage() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-bg-body pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3 sticky top-[64px] md:top-[64px] bg-black/80 backdrop-blur-xl z-10 border-b border-white/[0.06]">
                <button onClick={() => router.back()} className="text-white p-1.5 -ml-1 hover:bg-white/5 rounded-xl transition-colors">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-white">Settings</h1>
            </div>

            <div className="px-4 md:px-0 max-w-2xl mx-auto">
                {/* Search */}
                <div className="mt-4 mb-6">
                    <div className="bg-white/[0.04] rounded-xl px-4 py-2.5 flex items-center gap-3 border border-white/[0.06] focus-within:border-accent-primary/30 transition-colors">
                        <SearchIcon className="w-5 h-5 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search settings..."
                            className="bg-transparent border-none outline-none text-white placeholder-text-tertiary w-full text-sm"
                        />
                    </div>
                </div>

                {/* Your Account */}
                <SectionHeader title="Your account" />
                <div
                    onClick={() => router.push("/account-center")}
                    className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors rounded-xl px-2 -mx-2"
                >
                    <div className="flex items-center gap-4">
                        <UserCircleIcon className="w-7 h-7 text-accent-primary" />
                        <div className="flex flex-col">
                            <span className="text-[15px] text-white font-semibold">Accounts Center</span>
                            <span className="text-[12px] text-text-tertiary leading-tight">Password, security, personal details</span>
                        </div>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-text-tertiary" />
                </div>

                {/* How you use Atheleos */}
                <SectionHeader title="How you use Atheleos" />
                <MenuItem icon={<BookmarkIcon className="w-6 h-6" />} label="Saved" />
                <MenuItem icon={<ArchiveIcon className="w-6 h-6" />} label="Archive" />
                <MenuItem icon={<ActivityIcon className="w-6 h-6" />} label="Your activity" />
                <MenuItem icon={<NotificationsIcon className="w-6 h-6" />} label="Notifications" href="/notifications" />
                <MenuItem icon={<TimeIcon className="w-6 h-6" />} label="Time spent" />

                {/* Who can see your content */}
                <SectionHeader title="Who can see your content" />
                <MenuItem icon={<UserCircleIcon className="w-6 h-6" />} label="Account privacy" subLabel="Public" />
                <MenuItem icon={<BadgeIcon className="w-6 h-6" />} label="Close friends" />
                <MenuItem icon={<MessagesIcon className="w-6 h-6" />} label="Messages and story replies" />

                {/* More info and support */}
                <SectionHeader title="More info and support" />
                <MenuItem icon={<InsightsIcon className="w-6 h-6" />} label="Help" />
                <MenuItem icon={<UserCircleIcon className="w-6 h-6" />} label="About" />

                {/* Login */}
                <SectionHeader title="Login" />
                <div className="mt-2 mb-8">
                    <MenuItem icon={null} label="Add account" />
                    <MenuItem icon={null} label="Log out" isRed onClick={handleLogout} />
                </div>

                <div className="flex flex-col items-center justify-center pb-8 opacity-30">
                    <MetaIcon className="w-16 h-8 text-white mb-1" />
                </div>
            </div>
        </div>
    );
}
