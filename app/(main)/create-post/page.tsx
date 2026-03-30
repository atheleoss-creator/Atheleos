"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeftIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

const MAX_CAPTION_LENGTH = 2200;

const MOOD_TAGS = [
    { emoji: "🔥", label: "Fired Up" },
    { emoji: "💪", label: "Training" },
    { emoji: "🏆", label: "Win" },
    { emoji: "🎯", label: "Game Day" },
    { emoji: "⚡", label: "Beast Mode" },
    { emoji: "🧘", label: "Recovery" },
    { emoji: "🎬", label: "Highlight" },
    { emoji: "💭", label: "Thoughts" },
];

export default function CreatePostPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { showToast } = useNotification();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const captionRef = useRef<HTMLTextAreaElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [isSharing, setIsSharing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [step, setStep] = useState<"compose" | "preview">("compose");

    // Auto-resize textarea
    useEffect(() => {
        if (captionRef.current) {
            captionRef.current.style.height = "auto";
            captionRef.current.style.height = captionRef.current.scrollHeight + "px";
        }
    }, [caption]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        // Validate file size (50MB max)
        if (file.size > 50 * 1024 * 1024) {
            showToast("error", "File too large", "Maximum file size is 50MB");
            return;
        }
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const removeMedia = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleMoodSelect = (label: string) => {
        if (selectedMood === label) {
            setSelectedMood(null);
        } else {
            setSelectedMood(label);
        }
    };

    const insertAtCursor = (text: string) => {
        const textarea = captionRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCaption = caption.substring(0, start) + text + caption.substring(end);
        setCaption(newCaption);
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + text.length;
        }, 0);
    };

    const handleShare = async () => {
        if (isSharing) return;
        if (!caption.trim() && !selectedFile) return;

        setIsSharing(true);
        setUploadProgress(0);

        try {
            let mediaUrl = null;
            let mediaType = 'text';

            if (selectedFile) {
                mediaType = selectedFile.type.startsWith('video/') ? 'video' : 'image';
                setUploadProgress(10);

                const uploadForm = new FormData();
                uploadForm.append('file', selectedFile);

                // Simulate progress
                const progressInterval = setInterval(() => {
                    setUploadProgress(prev => Math.min(prev + 8, 85));
                }, 300);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadForm,
                });

                clearInterval(progressInterval);
                setUploadProgress(90);

                if (!uploadRes.ok) {
                    const err = await uploadRes.json();
                    throw new Error(err.error || 'Upload failed');
                }

                const uploadData = await uploadRes.json();
                mediaUrl = uploadData.url;
                setUploadProgress(95);
            }

            // Build final caption with mood tag
            let finalCaption = caption.trim();
            if (selectedMood) {
                const mood = MOOD_TAGS.find(m => m.label === selectedMood);
                if (mood) {
                    finalCaption = `${mood.emoji} ${finalCaption}`;
                }
            }

            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaUrl,
                    mediaType,
                    caption: finalCaption,
                    location: location.trim() || null,
                })
            });

            setUploadProgress(100);

            if (!res.ok) throw new Error('Failed to create post');

            showToast("success", "Post shared!", "Your post is now live");
            router.push("/");
        } catch (error) {
            console.error('Share Error:', error);
            showToast("error", "Failed to share", "Please try again");
            setIsSharing(false);
            setUploadProgress(0);
        }
    };

    const canShare = caption.trim().length > 0 || selectedFile;
    const isVideo = selectedFile?.type.startsWith('video/');
    const fileSize = selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB" : "";

    return (
        <div className="min-h-screen bg-bg-body text-text-primary font-sans pb-safe">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-white p-1.5 -ml-1 hover:bg-white/10 rounded-xl transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-wide">Create Post</h1>
                        <p className="text-[11px] text-text-tertiary font-medium">Share with your audience</p>
                    </div>
                </div>
                <button
                    onClick={handleShare}
                    className={`font-bold text-[14px] px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                        canShare && !isSharing
                            ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] active:scale-95"
                            : "bg-white/[0.06] text-text-tertiary cursor-not-allowed"
                    }`}
                    disabled={!canShare || isSharing}
                >
                    {isSharing ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Posting...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                            Post
                        </>
                    )}
                </button>
            </div>

            {/* Upload Progress Bar */}
            {isSharing && uploadProgress > 0 && (
                <div className="h-1 bg-white/[0.06] relative overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
            )}

            <div className="max-w-2xl mx-auto flex flex-col pt-2 pb-24">

                {/* User Context & Caption */}
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-bg-surface ring-2 ring-white/[0.06]">
                            {user?.avatarUrl ? (
                                <Image src={user.avatarUrl} alt="Avatar" width={44} height={44} className="object-cover w-full h-full" unoptimized />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-tr from-accent-primary to-purple-500" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-bold text-white text-[14px]">@{user?.username || "you"}</span>
                                <span className="text-[11px] text-text-tertiary px-2 py-0.5 bg-white/[0.04] rounded-md border border-white/[0.06]">Draft</span>
                            </div>
                            <textarea
                                ref={captionRef}
                                placeholder="What's happening? Share your story..."
                                value={caption}
                                onChange={(e) => {
                                    if (e.target.value.length <= MAX_CAPTION_LENGTH) setCaption(e.target.value);
                                }}
                                className="w-full bg-transparent resize-none focus:outline-none min-h-[80px] text-[15px] leading-relaxed placeholder-text-tertiary text-white"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Caption toolbar */}
                    <div className="flex items-center justify-between mt-1 pl-[54px]">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => insertAtCursor("#")}
                                className="px-2.5 py-1 rounded-lg text-[13px] font-bold text-accent-primary hover:bg-accent-primary/10 transition-colors"
                                title="Add Hashtag"
                            >
                                #
                            </button>
                            <button
                                onClick={() => insertAtCursor("@")}
                                className="px-2.5 py-1 rounded-lg text-[13px] font-bold text-accent-primary hover:bg-accent-primary/10 transition-colors"
                                title="Mention User"
                            >
                                @
                            </button>
                        </div>
                        <span className={`text-[11px] font-semibold tabular-nums ${caption.length > MAX_CAPTION_LENGTH * 0.9 ? "text-amber-400" : "text-text-tertiary"}`}>
                            {caption.length}/{MAX_CAPTION_LENGTH}
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-white/[0.06]" />

                {/* Mood Tags */}
                <div className="px-4 py-4">
                    <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Mood</h3>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {MOOD_TAGS.map((mood) => (
                            <button
                                key={mood.label}
                                onClick={() => handleMoodSelect(mood.label)}
                                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                                    selectedMood === mood.label
                                        ? "bg-accent-primary/15 text-accent-primary border border-accent-primary/30 shadow-[0_0_10px_rgba(0,212,255,0.1)]"
                                        : "bg-white/[0.04] text-text-secondary border border-white/[0.06] hover:bg-white/[0.08] hover:text-white"
                                }`}
                            >
                                <span className="text-base">{mood.emoji}</span>
                                {mood.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-white/[0.06]" />

                {/* Media Upload Area */}
                <div className="px-4 py-4">
                    <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Media</h3>

                    {!previewUrl ? (
                        <div
                            className={`
                                border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center transition-all cursor-pointer group relative overflow-hidden
                                ${isDragging
                                    ? "border-accent-primary bg-accent-primary/10 scale-[0.99]"
                                    : "border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.04]"
                                }
                            `}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {/* Background accent glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />

                            <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent-primary/10 group-hover:border-accent-primary/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-text-secondary group-hover:text-accent-primary transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                            </div>
                            <h3 className="text-[16px] font-bold text-white mb-1">Upload Media</h3>
                            <p className="text-text-tertiary text-[13px] mb-3">Drag & drop or tap to browse</p>
                            <div className="flex items-center gap-4 text-[11px] text-text-tertiary">
                                <span className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 3h18" />
                                    </svg>
                                    Photos
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    Videos
                                </span>
                                <span>Max 50MB</span>
                            </div>

                            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,video/*" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {/* Preview */}
                            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/[0.06] shadow-xl group">
                                {isVideo ? (
                                    <video
                                        src={previewUrl}
                                        className="w-full max-h-[500px] object-contain bg-black"
                                        controls
                                        autoPlay
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        width={1200}
                                        height={1200}
                                        className="object-contain w-full max-h-[500px] bg-black"
                                        unoptimized
                                    />
                                )}

                                {/* Overlay actions */}
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-black/60 backdrop-blur-md text-white p-2.5 rounded-xl hover:bg-white/20 transition-all border border-white/10 active:scale-90"
                                        title="Replace Media"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={removeMedia}
                                        className="bg-black/60 backdrop-blur-md text-white p-2.5 rounded-xl hover:bg-red-500/80 transition-all border border-white/10 active:scale-90"
                                        title="Remove Media"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Media type badge */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-white/10">
                                        {isVideo ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-accent-primary">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-accent-primary">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909" />
                                            </svg>
                                        )}
                                        <span className="text-[11px] text-white font-semibold">{isVideo ? "Video" : "Photo"}</span>
                                        <span className="text-[10px] text-text-tertiary">· {fileSize}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hidden file input for replace */}
                            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,video/*" />
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-white/[0.06]" />

                {/* Additional Settings */}
                <div className="px-4 py-3">
                    <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Details</h3>

                    {/* Location */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors mb-2.5 group focus-within:border-accent-primary/30">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center shrink-0 group-focus-within:bg-accent-primary/10 group-focus-within:border-accent-primary/20 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary group-focus-within:text-accent-primary transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Add location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-transparent focus:outline-none text-[14px] placeholder-text-tertiary text-white font-medium"
                        />
                        {location && (
                            <button onClick={() => setLocation("")} className="text-text-tertiary hover:text-white p-1 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Post Preview Card */}
                {(caption.trim() || previewUrl) && (
                    <>
                        <div className="mx-4 h-px bg-white/[0.06]" />
                        <div className="px-4 py-4">
                            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Preview</h3>
                            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                                {/* Preview header */}
                                <div className="flex items-center gap-3 px-4 py-3">
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-bg-surface ring-1 ring-white/10">
                                        {user?.avatarUrl ? (
                                            <Image src={user.avatarUrl} alt="" width={36} height={36} className="object-cover w-full h-full" unoptimized />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-tr from-accent-primary to-purple-500" />
                                        )}
                                    </div>
                                    <div>
                                        <span className="font-bold text-white text-[13px]">@{user?.username || "you"}</span>
                                        {location && (
                                            <div className="flex items-center gap-1 text-[11px] text-text-tertiary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                                {location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Preview media */}
                                {previewUrl && (
                                    <div className="relative bg-black">
                                        {isVideo ? (
                                            <video src={previewUrl} className="w-full max-h-[300px] object-contain" muted playsInline />
                                        ) : (
                                            <Image src={previewUrl} alt="" width={600} height={600} className="w-full max-h-[300px] object-contain" unoptimized />
                                        )}
                                    </div>
                                )}
                                {/* Preview caption */}
                                {caption.trim() && (
                                    <div className="px-4 py-3">
                                        <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-3">
                                            {selectedMood && <span>{MOOD_TAGS.find(m => m.label === selectedMood)?.emoji} </span>}
                                            <span className="font-bold text-white mr-1.5">@{user?.username}</span>
                                            {caption}
                                        </p>
                                    </div>
                                )}
                                {/* Preview actions mockup */}
                                <div className="flex items-center gap-5 px-4 py-2.5 border-t border-white/[0.04]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-tertiary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-tertiary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-tertiary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                    <div className="flex-1" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-tertiary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Tips Section */}
                <div className="mx-4 mt-2 mb-4">
                    <div className="bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 border border-white/[0.06] rounded-2xl p-4">
                        <h4 className="text-[11px] font-bold text-accent-primary uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>
                            Pro Tips
                        </h4>
                        <div className="flex flex-col gap-2">
                            <p className="text-[12px] text-text-tertiary leading-relaxed">• Use <span className="text-white font-medium">#hashtags</span> to get discovered by more athletes</p>
                            <p className="text-[12px] text-text-tertiary leading-relaxed">• Tag others with <span className="text-white font-medium">@mentions</span> to boost engagement</p>
                            <p className="text-[12px] text-text-tertiary leading-relaxed">• Videos under 60s can appear as <span className="text-white font-medium">Reels</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
