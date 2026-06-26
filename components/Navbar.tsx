"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    HomeIcon,
    ExploreIcon,
    CreateIcon,
    ReelsIcon,
    MessagesIcon,
    NotificationsIcon,
    HomeFilledIcon,
    CalendarIcon,
} from "./Icons";
import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const pressTimer = useRef<NodeJS.Timeout | null>(null);

    const handleTouchStart = () => {
        pressTimer.current = setTimeout(() => {
            setIsMobileMenuOpen(true);
            if (navigator.vibrate) navigator.vibrate(50);
        }, 500);
    };

    const handleTouchEnd = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Desktop Navigation — Premium Glass */}
            <nav className="hidden md:flex fixed top-0 left-0 right-0 h-[64px] bg-black/70 backdrop-blur-xl border-b border-white/[0.06] z-50 items-center shadow-[0_1px_20px_rgba(0,0,0,0.4)]">
                <div className="w-full max-w-[1400px] mx-auto px-6 flex justify-between items-center h-full">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <Image src="/atheleos.png" alt="Atheleos Icon" width={36} height={36} className="h-9 w-auto object-contain select-none drop-shadow-[0_0_12px_rgba(229,193,88,0.3)]" unoptimized />
                        <Image src="/AtheleosText.png" alt="Atheleos Text" width={160} height={32} className="h-7 w-auto object-contain select-none drop-shadow-[0_0_12px_rgba(229,193,88,0.2)]" unoptimized />
                    </Link>

                    {/* Center Nav Icons */}
                    <div className="flex items-center gap-1 bg-white/[0.04] rounded-2xl px-2 py-1 border border-white/[0.06]">
                        <NavItem href="/" icon={<HomeIcon className="w-[22px] h-[22px]" />} active={pathname === "/"} label="Home" />
                        <NavItem href="/explore" icon={<ExploreIcon className="w-[22px] h-[22px]" />} active={pathname === "/explore"} label="Explore" />
                        <NavItem href="/reels" icon={<ReelsIcon className="w-[22px] h-[22px]" />} active={pathname === "/reels"} label="Reels" />
                        <NavItem href="/events" icon={<CalendarIcon className="w-[22px] h-[22px]" />} active={pathname === "/events"} label="Events" />
                        <NavItem href="/create-post" icon={<CreateIcon className="w-[22px] h-[22px]" />} active={pathname === "/create-post"} label="Create" />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1">
                        <NavItem href="/messages" icon={<MessagesIcon className="w-[22px] h-[22px]" />} active={pathname === "/messages"} label="Messages" />
                        <NavItem href="/notifications" icon={<NotificationsIcon className="w-[22px] h-[22px]" />} active={pathname === "/notifications"} label="Alerts" />
                        <NavItem href="/settings" icon={<Cog6ToothIcon className="w-[22px] h-[22px]" />} active={pathname === "/settings"} label="Settings" />

                        <div className="relative ml-1.5" ref={menuRef}>
                            {user ? (
                                <>
                                    <button 
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="group block focus:outline-none"
                                    >
                                        <div className={`w-9 h-9 rounded-full overflow-hidden ring-2 transition-all duration-200 ${pathname?.startsWith("/profile")
                                            ? "ring-accent-primary shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                                            : "ring-white/10 group-hover:ring-accent-primary/50"
                                            }`}>
                                            <Image
                                                src={user.avatarUrl || "/default_avatar.svg"}
                                                alt="Profile"
                                                width={36}
                                                height={36}
                                                className="w-full h-full object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    </button>
                                    
                                    {isMenuOpen && (
                                        <div className="absolute top-12 right-0 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col animate-fade-in py-1">
                                            <Link 
                                                href={`/profile/${user.username}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>
                                                Profile
                                            </Link>
                                            <button 
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    logout();
                                                }}
                                                className="px-4 py-3 text-sm text-red-500 hover:bg-white/10 transition-colors flex items-center gap-3 text-left w-full"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link 
                                    href="/login" 
                                    className="ml-2 bg-[#0095F6] hover:bg-[#1877F2] text-white px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(0,149,246,0.4)] hover:scale-105 transition-all"
                                >
                                    Log In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Top Bar */}
            {!pathname?.startsWith("/profile") && (
                <div className="md:hidden flex fixed top-0 left-0 right-0 h-[56px] bg-black/80 backdrop-blur-xl border-b border-white/[0.06] z-50 items-center justify-between px-4 shadow-lg">
                    <Link href="/notifications" className="text-text-secondary hover:text-accent-primary transition-colors p-1.5 rounded-xl hover:bg-white/5">
                        <NotificationsIcon className="w-6 h-6" />
                    </Link>

                    <Link href="/" className="flex items-center gap-1.5">
                        <Image src="/atheleos.png" alt="Atheleos Icon" width={28} height={28} className="h-7 w-auto object-contain select-none drop-shadow-[0_0_10px_rgba(229,193,88,0.2)]" unoptimized />
                        <Image src="/AtheleosText.png" alt="Atheleos Text" width={130} height={26} className="h-6 w-auto object-contain select-none drop-shadow-[0_0_10px_rgba(229,193,88,0.2)]" unoptimized />
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
                    <div 
                        className="flex-1 flex items-center justify-center h-full relative select-none" 
                        ref={mobileMenuRef}
                    >
                        <button 
                            onClick={(e) => {
                                if (!isMobileMenuOpen) {
                                    router.push(user?.username ? `/profile/${user.username}` : '/login');
                                }
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onTouchMove={handleTouchEnd}
                            onContextMenu={(e) => {
                                e.preventDefault(); 
                                setIsMobileMenuOpen(true);
                                if (navigator.vibrate) navigator.vibrate(50);
                            }}
                            className="flex items-center justify-center p-2 focus:outline-none"
                            style={{ WebkitTouchCallout: "none" }}
                        >
                            <div className={`w-7 h-7 rounded-full overflow-hidden ring-2 transition-all ${pathname?.startsWith("/profile") ? "ring-accent-primary shadow-[0_0_12px_rgba(0,212,255,0.4)]" : "ring-transparent"}`}>
                                <Image
                                    src={user?.avatarUrl || "/default_avatar.svg"}
                                    alt="Profile"
                                    width={28}
                                    height={28}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                        </button>

                        {/* Mobile Long Press Menu */}
                        {isMobileMenuOpen && (
                            <div className="absolute bottom-[64px] right-2 w-48 bg-[#111] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-50 flex flex-col animate-fade-in py-1">
                                <button 
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        logout();
                                    }}
                                    className="px-4 py-3.5 text-[15px] font-bold text-red-500 hover:bg-white/10 active:bg-white/5 transition-colors flex items-center gap-3 text-left w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[20px] h-[20px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
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
