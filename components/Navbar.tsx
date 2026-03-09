"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    HomeIcon,
    ExploreIcon,
    CreateIcon,
    ShopIcon,
    ReelsIcon,
    MessagesIcon,
    NotificationsIcon,
    HomeFilledIcon,
    CalendarIcon,
} from "./Icons";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <>
            {/* Desktop Navigation — Premium Glass */}
            <nav className="hidden md:flex fixed top-0 left-0 right-0 h-[64px] bg-black/70 backdrop-blur-xl border-b border-white/[0.06] z-50 items-center shadow-[0_1px_20px_rgba(0,0,0,0.4)]">
                <div className="w-full max-w-[1400px] mx-auto px-6 flex justify-between items-center h-full">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-[22px] font-black tracking-[0.25em] text-transparent bg-gradient-to-r from-accent-primary via-white to-accent-secondary bg-clip-text uppercase select-none">
                            ATHELEOS
                        </span>
                    </Link>

                    {/* Center Nav Icons */}
                    <div className="flex items-center gap-1 bg-white/[0.04] rounded-2xl px-2 py-1 border border-white/[0.06]">
                        <NavItem href="/" icon={<HomeIcon className="w-[22px] h-[22px]" />} active={pathname === "/"} label="Home" />
                        <NavItem href="/explore" icon={<ExploreIcon className="w-[22px] h-[22px]" />} active={pathname === "/explore"} label="Explore" />
                        <NavItem href="/reels" icon={<ReelsIcon className="w-[22px] h-[22px]" />} active={pathname === "/reels"} label="Reels" />
                        <NavItem href="/events" icon={<CalendarIcon className="w-[22px] h-[22px]" />} active={pathname === "/events"} label="Events" />
                        <NavItem href="/marketplace" icon={<ShopIcon className="w-[22px] h-[22px]" />} active={pathname === "/marketplace"} label="Shop" />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1">
                        <NavItem href="/create-post" icon={<CreateIcon className="w-[22px] h-[22px]" />} active={pathname === "/create-post"} label="Create" />
                        <NavItem href="/messages" icon={<MessagesIcon className="w-[22px] h-[22px]" />} active={pathname === "/messages"} label="Messages" />
                        <NavItem href="/notifications" icon={<NotificationsIcon className="w-[22px] h-[22px]" />} active={pathname === "/notifications"} label="Alerts" />

                        <Link href="/profile" className="ml-1.5 group">
                            <div className={`w-9 h-9 rounded-full overflow-hidden ring-2 transition-all duration-200 ${pathname.startsWith("/profile")
                                ? "ring-accent-primary shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                                : "ring-white/10 group-hover:ring-accent-primary/50"
                                }`}>
                                <Image
                                    src={user?.avatarUrl || "/default_avatar.svg"}
                                    alt="Profile"
                                    width={36}
                                    height={36}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Top Bar */}
            {!pathname.startsWith("/profile") && (
                <div className="md:hidden flex fixed top-0 left-0 right-0 h-[56px] bg-black/80 backdrop-blur-xl border-b border-white/[0.06] z-50 items-center justify-between px-4 shadow-lg">
                    <Link href="/notifications" className="text-text-secondary hover:text-accent-primary transition-colors p-1.5 rounded-xl hover:bg-white/5">
                        <NotificationsIcon className="w-6 h-6" />
                    </Link>

                    <Link href="/" className="text-[18px] font-black tracking-[0.25em] text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text uppercase select-none">
                        ATHELEOS
                    </Link>

                    <div className="flex gap-1 items-center">
                        <Link href="/events" className="text-text-secondary hover:text-accent-primary transition-colors p-1.5 rounded-xl hover:bg-white/5">
                            <CalendarIcon className="w-6 h-6" />
                        </Link>
                        <Link href="/messages" className="text-text-secondary hover:text-accent-primary transition-colors p-1.5 rounded-xl hover:bg-white/5">
                            <MessagesIcon className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation — Glass Pill */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-2 pt-1">
                <div className="bg-black/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl flex items-center justify-around h-[56px] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
                    <MobileNavItem href="/" icon={<HomeFilledIcon className="w-6 h-6" />} active={pathname === "/"} />
                    <MobileNavItem href="/explore" icon={<ExploreIcon className="w-6 h-6" />} active={pathname === "/explore"} />
                    <MobileNavItem href="/create-post" icon={
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${pathname === "/create-post" ? "bg-accent-primary shadow-[0_0_12px_rgba(0,212,255,0.4)]" : "bg-white/10"}`}>
                            <CreateIcon className={`w-5 h-5 ${pathname === "/create-post" ? "text-black" : "text-white"}`} />
                        </div>
                    } active={pathname === "/create-post"} isCreate />
                    <MobileNavItem href="/reels" icon={<ReelsIcon className="w-6 h-6" />} active={pathname === "/reels"} />
                    <Link href="/profile" className="flex-1 flex items-center justify-center h-full">
                        <div className={`w-7 h-7 rounded-full overflow-hidden ring-2 transition-all ${pathname.startsWith("/profile") ? "ring-accent-primary" : "ring-transparent"}`}>
                            <Image
                                src={user?.avatarUrl || "/default_avatar.svg"}
                                alt="Profile"
                                width={28}
                                height={28}
                                className="w-full h-full object-cover"
                                unoptimized
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

function NavItem({ href, icon, active, label }: { href: string; icon: React.ReactNode; active: boolean; label: string }) {
    return (
        <Link
            href={href}
            className={`relative w-[42px] h-[42px] flex items-center justify-center rounded-xl transition-all duration-200 group ${active
                ? "text-accent-primary bg-accent-primary/10"
                : "text-text-secondary hover:text-white hover:bg-white/[0.06]"
                }`}
            title={label}
        >
            {icon}
            {active && <div className="absolute -bottom-[5px] w-1 h-1 rounded-full bg-accent-primary" />}
        </Link>
    );
}

function MobileNavItem({ href, icon, active, isCreate }: { href: string; icon: React.ReactNode; active: boolean; isCreate?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex-1 flex items-center justify-center h-full transition-all duration-200 ${isCreate ? "" : active ? "text-accent-primary" : "text-text-tertiary hover:text-white"}`}
        >
            {icon}
        </Link>
    );
}
