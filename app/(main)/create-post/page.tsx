"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeftIcon, CheckIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";

const CATEGORIES = ["Football", "Cricket", "Basketball", "Tennis", "E-Sports", "Athletics", "Gymnastics", "Swimming"];

export default function CreatePostPage() {
    const router = useRouter();
    const { user } = useAuth(); // Import real user details

    // Media States
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Form States
    const [caption, setCaption] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [location, setLocation] = useState<string>("");
    const [taggedUsers, setTaggedUsers] = useState<string>("");

    // Toggles
    const [isPrivate, setIsPrivate] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleDate, setScheduleDate] = useState("");

    const [isSharing, setIsSharing] = useState(false);

    // Handlers
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleShare = async () => {
        if (!selectedFile || isSharing) return;

        setIsSharing(true);

        // Mock Server Upload Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Post Created:", {
            file: selectedFile.name,
            caption,
            category: selectedCategory,
            location,
            taggedUsers,
            privacy: isPrivate ? "Followers Only" : "Public",
            scheduledFor: isScheduled ? scheduleDate : "Now"
        });

        // Redirect based on file type (simulating post vs reel)
        if (selectedFile.type.startsWith('video/')) {
            router.push("/reels");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen bg-bg-body text-text-primary font-sans pb-safe">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-bg-body/95 backdrop-blur-md border-b border-border-color px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-text-primary p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold tracking-wide">New Post</h1>
                </div>
                <button
                    onClick={handleShare}
                    className={`font-extrabold text-[15px] transition-colors flex items-center gap-2 ${selectedFile && !isSharing
                            ? "text-accent-primary hover:text-white"
                            : "text-text-secondary cursor-not-allowed"
                        }`}
                    disabled={!selectedFile || isSharing}
                >
                    {isSharing ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-accent-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sharing...
                        </>
                    ) : "Share"}
                </button>
            </div>

            <div className="max-w-2xl mx-auto flex flex-col pt-4 pb-24">

                {/* User Context & Caption Area */}
                <div className="px-4 flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-bg-surface border border-border-color">
                        {user?.avatarUrl ? (
                            <Image src={user.avatarUrl} alt="Avatar" width={48} height={48} className="object-cover w-full h-full" unoptimized />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-accent-primary to-purple-500" />
                        )}
                    </div>
                    <textarea
                        placeholder="Write a caption... @mention users or #hashtags"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full bg-transparent resize-none focus:outline-none min-h-[90px] text-[16px] leading-relaxed pt-2 placeholder-text-secondary"
                    />
                </div>

                {/* Media Uploader Area */}
                <div className="px-4 mb-8">
                    {!previewUrl ? (
                        <div
                            className={`
                                border-2 border-dashed rounded-2xl aspect-[4/3] flex flex-col items-center justify-center p-8 text-center transition-all cursor-pointer group
                                ${isDragging ? "border-accent-primary bg-accent-primary/10 scale-[0.99]" : "border-border-color hover:border-text-secondary bg-bg-surface"}
                            `}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="w-20 h-20 rounded-full bg-black/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-[18px] font-bold mb-1">Upload Photo or Video</h3>
                            <p className="text-text-secondary text-[14px]">Drag and drop files here or click to browse</p>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="image/*,video/*"
                            />
                        </div>
                    ) : (
                        <div className="relative rounded-2xl overflow-hidden bg-black border border-border-color shadow-lg max-h-[600px] flex items-center justify-center">
                            {selectedFile?.type.startsWith('video/') ? (
                                <video
                                    src={previewUrl}
                                    className="w-full max-h-[600px] object-contain"
                                    controls
                                    autoPlay
                                    muted
                                />
                            ) : (
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    width={1200}
                                    height={1200}
                                    className="object-contain w-full max-h-[600px]"
                                    unoptimized
                                />
                            )}
                            <button
                                onClick={() => {
                                    setSelectedFile(null);
                                    setPreviewUrl(null);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                                className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-red-500 transition-colors shadow-xl"
                                title="Remove Media"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Event & Category Assignment */}
                <div className="px-4 mb-6 hidden-scrollbar overflow-x-auto whitespace-nowrap">
                    <div className="flex gap-2 pb-2">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                                className={`px-4 py-1.5 rounded-full text-[13px] font-bold border transition-all ${selectedCategory === category
                                        ? "bg-accent-primary text-bg-body border-accent-primary"
                                        : "bg-bg-surface text-text-primary border-border-color hover:border-text-secondary"
                                    }`}
                            >
                                {selectedCategory === category && <span className="mr-1">✓</span>}
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Metadata Form Inputs */}
                <div className="flex flex-col border-y border-border-color bg-bg-surface/50">

                    {/* Tagging */}
                    <div className="px-4 py-3 flex items-center border-b border-border-color focus-within:bg-white/5 transition-colors">
                        <div className="w-8 shrink-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tag players or teams"
                            value={taggedUsers}
                            onChange={(e) => setTaggedUsers(e.target.value)}
                            className="w-full bg-transparent pl-3 focus:outline-none text-[15px] placeholder-text-secondary"
                        />
                    </div>

                    {/* Location */}
                    <div className="px-4 py-3 flex items-center border-b border-border-color focus-within:bg-white/5 transition-colors">
                        <div className="w-8 shrink-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Add Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-transparent pl-3 focus:outline-none text-[15px] placeholder-text-secondary"
                        />
                    </div>

                </div>

                {/* Advanced Toggles */}
                <div className="flex flex-col bg-bg-surface/50 border-b border-border-color mb-8">

                    {/* Privacy */}
                    <div className="px-5 py-4 flex items-center justify-between border-b border-border-color">
                        <div>
                            <span className="block text-[15px] font-semibold text-text-primary">Private Post</span>
                            <span className="block text-[13px] text-text-secondary">Only your approved followers can see this post.</span>
                        </div>
                        <button
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${isPrivate ? 'bg-accent-primary' : 'bg-gray-600'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isPrivate ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Schedule */}
                    <div className="flex flex-col">
                        <div className="px-5 py-4 flex items-center justify-between">
                            <div>
                                <span className="block text-[15px] font-semibold text-text-primary">Schedule Post</span>
                                <span className="block text-[13px] text-text-secondary">Automatically publish this post at a later time.</span>
                            </div>
                            <button
                                onClick={() => setIsScheduled(!isScheduled)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${isScheduled ? 'bg-accent-primary' : 'bg-gray-600'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isScheduled ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {isScheduled && (
                            <div className="px-5 pb-4 pl-[72px] animate-fade-in">
                                <input
                                    type="datetime-local"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                    className="w-full bg-bg-body border border-border-color rounded-lg px-3 py-2 text-[14px] text-white focus:outline-none focus:border-accent-primary"
                                />
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
