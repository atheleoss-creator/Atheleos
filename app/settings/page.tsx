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
    CreateIcon,
    ShopIcon,
    HomeIcon,
    ArrowRightIcon
} from "@/components/Icons";

// Reusable Menu Item Component
const MenuItem = ({ icon, label, subLabel, onClick, href, isRed }: { icon: React.ReactNode, label: string, subLabel?: string, onClick?: () => void, href?: string, isRed?: boolean }) => {
    const content = (
        <div
            className={`flex items-center justify-between py-3 cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors ${onClick ? "" : ""}`}
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                <div className={`text-text-primary ${isRed ? "text-red-500" : ""}`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className={`text-[15px] ${isRed ? "text-red-500" : "text-text-primary"}`}>{label}</span>
                    {subLabel && <span className="text-[12px] text-text-secondary">{subLabel}</span>}
                </div>
            </div>
            {!isRed && <ArrowRightIcon className="w-5 h-5 text-text-tertiary" />}
        </div>
    );

    if (href) {
        return <Link href={href} className="block">{content}</Link>;
    }

    return content;
};

// Section Header Component
const SectionHeader = ({ title }: { title: string }) => (
    <div className="text-[12px] font-bold text-text-secondary uppercase tracking-wide mt-6 mb-2 px-1">
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
        <div className="min-h-screen bg-bg-body pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3 relative top-0 bg-bg-body z-10 border-b border-border-color md:border-none">
                <button onClick={() => router.back()} className="text-text-primary">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-text-primary">Settings and activity</h1>
            </div>

            <div className="px-4 md:px-0 max-w-2xl mx-auto">
                {/* Search Bar */}
                <div className="mt-2 mb-6">
                    <div className="bg-bg-surface rounded-xl px-4 py-2 flex items-center gap-3">
                        <SearchIcon className="w-5 h-5 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-text-primary placeholder-text-secondary w-full text-sm"
                        />
                    </div>
                </div>

                {/* Your Account */}
                <SectionHeader title="Your account" />
                <div
                    onClick={() => router.push("/account-center")}
                    className="flex items-center justify-between py-3 mb-2 cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <UserCircleIcon className="w-7 h-7 text-text-primary" />
                        <div className="flex flex-col">
                            <span className="text-[15px] text-text-primary font-semibold">Accounts Center</span>
                            <span className="text-[12px] text-text-secondary text-opacity-80 leading-tight">Password, security, personal details, connected experiences, ad preferences</span>
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
                <MenuItem icon={<BadgeIcon className="w-6 h-6" />} label="Close friends" subLabel="12" />
                <MenuItem icon={<MessagesIcon className="w-6 h-6" />} label="Messages and story replies" />

                {/* More info and support */}
                <SectionHeader title="More info and support" />
                <MenuItem icon={<InsightsIcon className="w-6 h-6" />} label="Help" />
                <MenuItem icon={<UserCircleIcon className="w-6 h-6" />} label="About" />

                {/* Login Section */}
                <SectionHeader title="Login" />
                <div className="mt-2 mb-8">
                    <MenuItem icon={null} label="Add account" />
                    <MenuItem icon={null} label="Log out" isRed onClick={handleLogout} />
                </div>

                {/* Meta text at bottom */}
                <div className="flex flex-col items-center justify-center pb-8 opacity-50">
                    <MetaIcon className="w-16 h-8 text-text-primary mb-1" />
                </div>

            </div>
        </div>
    );
}
