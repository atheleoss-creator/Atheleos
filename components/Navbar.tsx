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
    const activeClass = "text-accent-primary bg-accent-primary/10";
    const inactiveClass = "text-text-secondary hover:text-accent-primary hover:bg-white/5";

    const getItemClass = (path: string) => {
        return pathname === path ? activeClass : inactiveClass;
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex relative top-0 left-0 right-0 h-[70px] bg-bg-overlay backdrop-blur-md border-b border-border-color z-50 items-center">
                <div className="container mx-auto px-6 flex justify-end items-center h-full relative">
                    <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-text-primary cursor-pointer absolute left-1/2 transform -translate-x-1/2 uppercase font-sans">
                        ATHELEOS
                    </Link>

                    <div className="flex items-center gap-2">
                        <NavItem href="/" icon={<HomeIcon className="w-6 h-6" />} active={pathname === "/"} />
                        <NavItem href="/explore" icon={<ExploreIcon className="w-6 h-6" />} active={pathname === "/explore"} />
                        <NavItem href="/create-post" icon={<CreateIcon className="w-6 h-6" />} active={pathname === "/create-post"} />
                        <NavItem href="/marketplace" icon={<ShopIcon className="w-6 h-6" />} active={pathname === "/marketplace"} />
                        <NavItem href="/reels" icon={<ReelsIcon className="w-6 h-6" />} active={pathname === "/reels"} />
                        <NavItem href="/messages" icon={<MessagesIcon className="w-6 h-6" />} active={pathname === "/messages"} />
                        <NavItem href="/notifications" icon={<NotificationsIcon className="w-6 h-6" />} active={pathname === "/notifications"} />
                        {/* Events - Desktop only for now */}
                        <NavItem href="/events" icon={<CalendarIcon className="w-6 h-6" />} active={pathname === "/events"} />

                        <Link href="/profile" className="w-[44px] h-[44px] flex items-center justify-center rounded-xl transition-all ml-2">
                            <div className={`w-8 h-8 rounded-full overflow-hidden border-2 ${pathname === "/profile" ? "border-accent-primary" : "border-transparent"} hover:border-accent-primary`}>
                                <Image
                                    src={user?.avatarUrl || "/default_avatar.png"}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Top Bar - Hide on profile pages */}
            {!pathname.startsWith("/profile") && (
                <div className="md:hidden flex relative top-0 h-[60px] bg-bg-overlay backdrop-blur-md border-b border-border-color z-50 items-center justify-between px-4 relative">

                    <Link href="/notifications" className="text-text-primary">
                        <NotificationsIcon className="w-7 h-7" />
                    </Link>

                    <Link href="/" className="text-xl font-bold tracking-[0.2em] text-text-primary absolute left-1/2 transform -translate-x-1/2 uppercase font-sans">
                        ATHELEOS
                    </Link>

                    <div className="flex gap-4 items-center">
                        <Link href="/events" className="text-text-primary">
                            <CalendarIcon className="w-7 h-7" />
                        </Link>
                        <Link href="/messages" className="text-text-primary">
                            <MessagesIcon className="w-7 h-7" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-[50px] bg-bg-overlay backdrop-blur-md border-t border-border-color z-50 flex items-center justify-around pb-safe">
                <MobileNavItem href="/" icon={<HomeFilledIcon className="w-7 h-7" />} active={pathname === "/"} />
                <MobileNavItem href="/explore" icon={<ExploreIcon className="w-7 h-7" />} active={pathname === "/explore"} />
                <MobileNavItem href="/create-post" icon={<CreateIcon className="w-7 h-7" />} active={pathname === "/create-post"} />
                <MobileNavItem href="/reels" icon={<ReelsIcon className="w-7 h-7" />} active={pathname === "/reels"} />
                <Link href="/profile" className="flex-1 flex items-center justify-center h-full">
                    <div className={`w-7 h-7 rounded-full overflow-hidden border-2 ${pathname.startsWith("/profile") ? "border-text-primary" : "border-transparent"}`}>
                        <Image
                            src={user?.avatarUrl || "/default_avatar.png"}
                            alt="Profile"
                            width={28}
                            height={28}
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                    </div>
                </Link>
            </div>
        </>
    );
}

function NavItem({ href, icon, active }: { href: string; icon: React.ReactNode; active: boolean }) {
    return (
        <Link
            href={href}
            className={`w-[44px] h-[44px] flex items-center justify-center rounded-xl transition-all ${active
                ? "text-accent-primary bg-accent-primary/10"
                : "text-text-secondary hover:text-accent-primary hover:bg-white/5"
                }`}
        >
            {icon}
        </Link>
    );
}

function MobileNavItem({ href, icon, active }: { href: string; icon: React.ReactNode; active: boolean }) {
    return (
        <Link
            href={href}
            className={`flex-1 flex items-center justify-center h-full transition-all ${active ? "text-accent-primary" : "text-text-tertiary"
                }`}
        >
            {icon}
        </Link>
    );
}
