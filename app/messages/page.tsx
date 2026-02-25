"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";

// Mocks
const ACTIVE_NOW = [
    { id: "a1", name: "Virat", avatar: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=100&h=100&fit=crop" },
    { id: "a2", name: "Ronaldo", avatar: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop" },
    { id: "a3", name: "FC Elite", avatar: "" },
    { id: "a4", name: "Sarah", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" },
    { id: "a5", name: "Coach Mike", avatar: "" },
    { id: "a6", name: "David M.", avatar: "https://images.unsplash.com/photo-1518605368461-1bd49cece51f?w=100&h=100&fit=crop" },
];

const MOCK_CHATS = [
    {
        id: "c1",
        user: { name: "Shikhar Dhawan", username: "shikhar_cricket", avatar: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=100&h=100&fit=crop", online: true },
        lastMessage: "Are we still on for practice tomorrow?",
        time: "10:42 AM",
        unread: 2,
    },
    {
        id: "c2",
        user: { name: "FC Elite", username: "fc_elite", avatar: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop", online: false },
        lastMessage: "Thanks for accepting the match invite. See you on the pitch.",
        time: "Yesterday",
        unread: 0,
    },
    {
        id: "c3",
        user: { name: "Atheleos Support", username: "support", avatar: "", online: true },
        lastMessage: "Your profile has been verified! Welcome to the premium tier.",
        time: "Tuesday",
        unread: 1,
    },
    {
        id: "c4",
        user: { name: "Rangers FC", username: "rangers_fc", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop", online: false },
        lastMessage: "Sent an attachment.",
        time: "Monday",
        unread: 0,
    }
];

const MOCK_MESSAGES = [
    { id: "m1", senderId: "other", text: "Hey! Ready for the big game?", time: "10:30 AM" },
    { id: "m2", senderId: "me", text: "Always. Been practicing those free kicks.", time: "10:35 AM" },
    { id: "m3", senderId: "other", text: "Awesome. I'll pick you up at 6.", time: "10:40 AM" },
    { id: "m4", senderId: "other", text: "Are we still on for practice tomorrow?", time: "10:42 AM" },
];

export default function MessagesPage() {
    const router = useRouter();
    const [activeChat, setActiveChat] = useState<typeof MOCK_CHATS[0] | null>(null);
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = {
            id: Date.now().toString(),
            senderId: "me",
            text: inputText.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMsg]);
        setInputText("");
    };

    // Render Inbox List View
    if (!activeChat) {
        return (
            <div className="min-h-screen bg-bg-body text-text-primary pb-20 md:pb-10 font-sans">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-bg-body/95 backdrop-blur-md border-b border-border-color px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="text-text-primary hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold tracking-wide">Messages</h1>
                    </div>
                    <button className="text-text-primary p-1 hover:bg-white/10 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                </div>

                {/* Active Now Horizon Scroll */}
                <div className="px-4 py-5 border-b border-border-color">
                    <p className="text-text-secondary text-[13px] font-bold mb-3 uppercase tracking-wider">Active Now</p>
                    <div className="flex gap-4 overflow-x-auto hidden-scrollbar pb-2">
                        {ACTIVE_NOW.map(user => (
                            <div key={user.id} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
                                <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-accent-primary to-purple-500 group-hover:scale-105 transition-transform">
                                    <div className="w-full h-full rounded-full bg-bg-body p-[2px]">
                                        {user.avatar ? (
                                            <Image
                                                src={user.avatar}
                                                alt={user.name}
                                                width={60} height={60}
                                                className="w-full h-full object-cover rounded-full"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-[10px] text-text-secondary font-bold">
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 border-2 border-bg-body rounded-full" />
                                </div>
                                <span className="text-[12px] truncate w-full text-center text-text-secondary">{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex flex-col">
                    <div className="px-4 py-3 pb-1 flex items-center justify-between">
                        <p className="text-text-primary text-[16px] font-bold">Inbox</p>
                        <p className="text-accent-primary text-[14px] font-bold cursor-pointer">Requests</p>
                    </div>

                    {MOCK_CHATS.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className="flex items-center justify-between p-4 hover:bg-bg-surface/50 cursor-pointer transition-colors active:bg-white/5"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative w-14 h-14 shrink-0 rounded-full bg-gray-800 border border-border-color overflow-hidden">
                                    {chat.user.avatar ? (
                                        <Image
                                            src={chat.user.avatar}
                                            alt={chat.user.name}
                                            width={56} height={56}
                                            className="w-full h-full object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[18px] text-text-secondary font-bold">
                                            {chat.user.name.charAt(0)}
                                        </div>
                                    )}
                                    {chat.user.online && (
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-bg-body rounded-full z-10" />
                                    )}
                                </div>

                                <div className="flex flex-col min-w-0 pr-4">
                                    <h3 className={`text-[15px] truncate ${chat.unread > 0 ? 'font-bold text-white' : 'font-semibold text-text-primary'}`}>
                                        {chat.user.name}
                                    </h3>
                                    <p className={`text-[14px] truncate ${chat.unread > 0 ? 'font-semibold text-white' : 'text-text-secondary'}`}>
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end shrink-0 gap-1.5 pl-2">
                                <span className={`text-[12px] ${chat.unread > 0 ? 'text-accent-primary font-bold' : 'text-text-secondary'}`}>
                                    {chat.time}
                                </span>
                                {chat.unread > 0 && (
                                    <div className="w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center text-[11px] font-bold text-bg-body">
                                        {chat.unread}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <style jsx global>{`
                    .hidden-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hidden-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div>
        );
    }

    // Render Active Chat Component Overlay
    return (
        <div className="fixed inset-0 z-50 bg-bg-body flex flex-col pt-safe text-text-primary font-sans animate-fade-in">
            {/* Chat Header */}
            <div className="bg-bg-body/95 backdrop-blur-md border-b border-border-color px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveChat(null)} className="text-text-primary hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden shrink-0 border border-border-color">
                            {activeChat.user.avatar ? (
                                <Image src={activeChat.user.avatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                            ) : null}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[15px] font-bold leading-tight">{activeChat.user.name}</h2>
                            <span className="text-[12px] text-text-secondary">
                                {activeChat.user.online ? 'Active now' : 'Active 2h ago'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                        </svg>
                    </button>
                    <button className="text-text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Chat History Canvas */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-bg-body hidden-scrollbar">

                <div className="w-full flex justify-center py-4">
                    <span className="text-[12px] text-text-secondary bg-white/5 px-3 py-1 rounded-full">Today</span>
                </div>

                {messages.map((msg) => {
                    const isMe = msg.senderId === "me";
                    return (
                        <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className="flex flex-col max-w-[75%] gap-1">
                                <div
                                    className={`px-4 py-2 text-[15px] ${isMe
                                            ? 'bg-accent-primary text-bg-body rounded-2xl rounded-tr-sm'
                                            : 'bg-bg-surface border border-border-color text-text-primary rounded-2xl rounded-tl-sm'
                                        }`}
                                    style={{ wordBreak: 'break-word' }}
                                >
                                    {msg.text}
                                </div>
                                <span className={`text-[11px] text-text-secondary ${isMe ? 'text-right' : 'text-left'}`}>
                                    {msg.time} {isMe && '• Read'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Composer Footer */}
            <div className="bg-bg-body border-t border-border-color p-3 shrink-0 pb-safe">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <button type="button" className="w-10 h-10 shrink-0 bg-accent-primary rounded-full flex items-center justify-center text-bg-body active:scale-95 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>

                    <div className="flex-1 bg-bg-surface border border-border-color rounded-full px-4 py-2.5 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="bg-transparent w-full text-[15px] focus:outline-none placeholder-text-secondary"
                        />
                        <button type="button" className="text-text-secondary hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </button>
                    </div>

                    {inputText.trim() ? (
                        <button type="submit" className="text-accent-primary font-bold text-[15px] active:scale-95 transition-transform px-2">
                            Send
                        </button>
                    ) : (
                        <button type="button" className="text-text-secondary active:scale-95 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                            </svg>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
