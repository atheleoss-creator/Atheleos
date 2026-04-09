"use client";

import React, { useState, useEffect, useMemo } from "react";
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

/* ─── Toast component ─── */
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-white/[0.1] backdrop-blur-xl border border-white/[0.1] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-accent-primary shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {message}
            </div>
        </div>
    );
};

/* ─── Menu item ─── */
const MenuItem = ({ icon, label, subLabel, onClick, href, isRed, hidden }: {
    icon: React.ReactNode;
    label: string;
    subLabel?: string;
    onClick?: () => void;
    href?: string;
    isRed?: boolean;
    hidden?: boolean;
}) => {
    if (hidden) return null;

    const content = (
        <div
            className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors rounded-xl px-2 -mx-2"
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

const SectionHeader = ({ title, hidden }: { title: string; hidden?: boolean }) => {
    if (hidden) return null;
    return (
        <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mt-8 mb-2 px-1">
            {title}
        </div>
    );
};

export default function SettingsPage() {
    const router = useRouter();
    const { logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [toast, setToast] = useState<string | null>(null);
    const [privacyLabel, setPrivacyLabel] = useState("Public");

    // Fetch current privacy status
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/settings/privacy");
                if (res.ok) {
                    const data = await res.json();
                    setPrivacyLabel(data.isPrivate ? "Private" : "Public");
                }
            } catch {
                // Silently fail
            }
        })();
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const showComingSoon = (feature: string) => {
        setToast(`${feature} — Coming Soon!`);
    };

    const togglePrivacy = async () => {
        const newState = privacyLabel === "Public";
        setPrivacyLabel(newState ? "Private" : "Public");
        try {
            await fetch("/api/settings/privacy", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPrivate: newState }),
            });
            setToast(`Account is now ${newState ? "Private" : "Public"}`);
        } catch {
            // Revert on failure
            setPrivacyLabel(newState ? "Public" : "Private");
            setToast("Failed to update privacy setting");
        }
    };

    // Define all menu items for search filtering
    const menuItems = useMemo(() => [
        { section: "Your account", label: "Accounts Center", subLabel: "Password, security, personal details", key: "accounts" },
        { section: "Your account", label: "Delete account", subLabel: "Permanently delete your data", key: "deleteaccount" },
        { section: "How you use Atheleos", label: "Saved", key: "saved" },
        { section: "How you use Atheleos", label: "Archive", key: "archive" },
        { section: "How you use Atheleos", label: "Your activity", key: "activity" },
        { section: "How you use Atheleos", label: "Notifications", key: "notifications" },
        { section: "How you use Atheleos", label: "Time spent", key: "timespent" },
        { section: "Who can see your content", label: "Account privacy", key: "privacy" },
        { section: "Who can see your content", label: "Close friends", key: "closefriends" },
        { section: "Who can see your content", label: "Messages and story replies", key: "messages" },
        { section: "More info and support", label: "Help", key: "help" },
        { section: "More info and support", label: "About", key: "about" },
        { section: "Login", label: "Add account", key: "addaccount" },
        { section: "Login", label: "Log out", key: "logout" },
    ], []);

    const q = searchQuery.toLowerCase().trim();
    const isVisible = (key: string) => {
        if (!q) return true;
        const item = menuItems.find(m => m.key === key);
        if (!item) return false;
        return item.label.toLowerCase().includes(q) || item.section.toLowerCase().includes(q) || (item.subLabel || "").toLowerCase().includes(q);
    };

    const isSectionVisible = (sectionName: string) => {
        if (!q) return true;
        return menuItems.some(m => m.section === sectionName && isVisible(m.key));
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-white placeholder-text-tertiary w-full text-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="text-text-muted hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Your Account */}
                <SectionHeader title="Your account" hidden={!isSectionVisible("Your account")} />
                {isVisible("accounts") && (
                    <div
                        onClick={() => router.push("/edit-profile")}
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
                )}
                <MenuItem
                    icon={<ArchiveIcon className="w-6 h-6" />}
                    label="Delete account"
                    href="/settings/delete-account"
                    isRed
                    hidden={!isVisible("deleteaccount")}
                />

                {/* How you use Atheleos */}
                <SectionHeader title="How you use Atheleos" hidden={!isSectionVisible("How you use Atheleos")} />
                <MenuItem icon={<BookmarkIcon className="w-6 h-6" />} label="Saved" href="/saved" hidden={!isVisible("saved")} />
                <MenuItem icon={<ArchiveIcon className="w-6 h-6" />} label="Archive" onClick={() => showComingSoon("Archive")} hidden={!isVisible("archive")} />
                <MenuItem icon={<ActivityIcon className="w-6 h-6" />} label="Your activity" href="/activity" hidden={!isVisible("activity")} />
                <MenuItem icon={<NotificationsIcon className="w-6 h-6" />} label="Notifications" href="/notifications" hidden={!isVisible("notifications")} />
                <MenuItem icon={<TimeIcon className="w-6 h-6" />} label="Time spent" onClick={() => showComingSoon("Time Spent")} hidden={!isVisible("timespent")} />

                {/* Who can see your content */}
                <SectionHeader title="Who can see your content" hidden={!isSectionVisible("Who can see your content")} />
                <MenuItem
                    icon={<UserCircleIcon className="w-6 h-6" />}
                    label="Account privacy"
                    subLabel={privacyLabel}
                    onClick={togglePrivacy}
                    hidden={!isVisible("privacy")}
                />
                <MenuItem icon={<BadgeIcon className="w-6 h-6" />} label="Close friends" onClick={() => showComingSoon("Close Friends")} hidden={!isVisible("closefriends")} />
                <MenuItem icon={<MessagesIcon className="w-6 h-6" />} label="Messages and story replies" onClick={() => showComingSoon("Message Settings")} hidden={!isVisible("messages")} />

                {/* More info and support */}
                <SectionHeader title="More info and support" hidden={!isSectionVisible("More info and support")} />
                <MenuItem icon={<InsightsIcon className="w-6 h-6" />} label="Help" href="/help" hidden={!isVisible("help")} />
                <MenuItem icon={<UserCircleIcon className="w-6 h-6" />} label="About" href="/about" hidden={!isVisible("about")} />

                {/* Login */}
                <SectionHeader title="Login" hidden={!isSectionVisible("Login")} />
                <div className="mt-2 mb-8">
                    <MenuItem icon={null} label="Add account" onClick={() => showComingSoon("Multi-Account")} hidden={!isVisible("addaccount")} />
                    <MenuItem icon={null} label="Log out" isRed onClick={handleLogout} hidden={!isVisible("logout")} />
                </div>

                {/* No results */}
                {q && !menuItems.some(m => isVisible(m.key)) && (
                    <div className="flex flex-col items-center py-16 animate-fade-in">
                        <p className="text-text-muted text-sm">No settings match &quot;{searchQuery}&quot;</p>
                    </div>
                )}

                <div className="flex flex-col items-center justify-center pb-8 opacity-30">
                    <MetaIcon className="w-16 h-8 text-white mb-1" />
                </div>
            </div>

            {/* Toast */}
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
    );
}
