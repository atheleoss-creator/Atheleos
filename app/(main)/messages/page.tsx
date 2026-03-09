"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow } from "date-fns";

interface Conversation {
    conversationId: number;
    updated_at: string;
    userId: number;
    username: string;
    full_name: string;
    avatar_url: string;
    lastMessage: string | null;
    lastMessageTime: string | null;
    unreadCount: number;
}

interface Message {
    id: number;
    content: string;
    sender_id: number;
    is_read: boolean;
    created_at: string;
    username: string;
    avatar_url: string;
}

export default function MessagesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        async function fetchConversations() {
            try {
                const res = await fetch('/api/messages');
                if (res.ok) {
                    const data = await res.json();
                    setConversations(data.conversations || []);
                }
            } catch (error) {
                console.error('Failed to fetch conversations', error);
            } finally {
                setLoading(false);
            }
        }
        fetchConversations();
    }, []);

    const openConversation = async (convo: Conversation) => {
        setActiveConversation(convo);
        setMessagesLoading(true);
        try {
            const res = await fetch(`/api/messages/${convo.conversationId}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            }
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setMessagesLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !activeConversation || sending) return;

        const msgText = inputText.trim();
        setSending(true);
        setInputText("");

        const tempMsg: Message = {
            id: Date.now(),
            content: msgText,
            sender_id: 0,
            is_read: false,
            created_at: new Date().toISOString(),
            username: user?.username || '',
            avatar_url: user?.avatarUrl || ''
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            await fetch(`/api/messages/${activeConversation.conversationId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: msgText })
            });
        } catch (error) {
            console.error('Failed to send message', error);
        } finally {
            setSending(false);
        }
    };

    // Inbox View
    if (!activeConversation) {
        return (
            <div className="min-h-screen bg-bg-body text-white pb-24 md:pb-10 animate-fade-in">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="text-white hover:bg-white/5 p-1.5 -ml-1 rounded-xl transition-colors">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold">Messages</h1>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="px-4 py-3">
                        <p className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">Inbox</p>
                    </div>

                    {loading && (
                        <div className="flex flex-col gap-1 px-4 py-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                                    <div className="w-14 h-14 rounded-full skeleton shrink-0" />
                                    <div className="flex-1 flex flex-col gap-2">
                                        <div className="h-3 w-32 skeleton" />
                                        <div className="h-3 w-48 skeleton" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && conversations.length === 0 && (
                        <div className="text-center py-24 animate-fade-in">
                            <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-text-tertiary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No messages yet</h3>
                            <p className="text-text-tertiary text-sm max-w-xs mx-auto">Start a conversation from someone&apos;s profile page.</p>
                        </div>
                    )}

                    {conversations.map((chat) => {
                        const avatarUrl = chat.avatar_url || `https://ui-avatars.com/api/?name=${chat.username}&background=random`;
                        return (
                            <div
                                key={chat.conversationId}
                                onClick={() => openConversation(chat)}
                                className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] cursor-pointer transition-colors active:bg-white/[0.06] mx-2 rounded-xl"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden ring-2 ring-white/[0.06]">
                                        <Image src={avatarUrl} alt={chat.username} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                    <div className="flex flex-col min-w-0 pr-4">
                                        <h3 className={`text-[15px] truncate ${chat.unreadCount > 0 ? 'font-bold text-white' : 'font-semibold text-text-secondary'}`}>
                                            {chat.full_name || chat.username}
                                        </h3>
                                        <p className={`text-[13px] truncate ${chat.unreadCount > 0 ? 'font-semibold text-white' : 'text-text-tertiary'}`}>
                                            {chat.lastMessage || "No messages yet"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end shrink-0 gap-1.5 pl-2">
                                    {chat.lastMessageTime && (
                                        <span className={`text-[11px] ${chat.unreadCount > 0 ? 'text-accent-primary font-bold' : 'text-text-tertiary'}`}>
                                            {formatDistanceToNow(new Date(chat.lastMessageTime), { addSuffix: true })}
                                        </span>
                                    )}
                                    {chat.unreadCount > 0 && (
                                        <div className="w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Active Chat View
    const otherAvatarUrl = activeConversation.avatar_url || `https://ui-avatars.com/api/?name=${activeConversation.username}&background=random`;

    return (
        <div className="fixed inset-0 z-50 bg-bg-body flex flex-col text-white animate-fade-in">
            {/* Chat Header */}
            <div className="bg-black/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between shrink-0 shadow-lg">
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveConversation(null)} className="text-white hover:bg-white/5 p-1.5 -ml-1 rounded-xl transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10">
                            <Image src={otherAvatarUrl} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[15px] font-bold leading-tight">{activeConversation.full_name || activeConversation.username}</h2>
                            <span className="text-[11px] text-text-tertiary">@{activeConversation.username}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar">
                {messagesLoading && (
                    <div className="text-center py-10 text-text-tertiary">
                        <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        Loading messages...
                    </div>
                )}

                {!messagesLoading && messages.length === 0 && (
                    <div className="text-center py-10 text-text-tertiary animate-fade-in">
                        <p className="text-sm">No messages yet. Say hi! 👋</p>
                    </div>
                )}

                {messages.map((msg) => {
                    const isMe = msg.username === user?.username;
                    return (
                        <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                            <div className="flex flex-col max-w-[75%] gap-1">
                                <div
                                    className={`px-4 py-2.5 text-[15px] leading-relaxed ${isMe
                                        ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-2xl rounded-tr-sm shadow-[0_2px_8px_rgba(0,212,255,0.2)]'
                                        : 'bg-white/[0.06] border border-white/[0.06] text-white rounded-2xl rounded-tl-sm'
                                    }`}
                                    style={{ wordBreak: 'break-word' }}
                                >
                                    {msg.content}
                                </div>
                                <span className={`text-[10px] text-text-tertiary ${isMe ? 'text-right' : 'text-left'}`}>
                                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <div className="bg-black/80 backdrop-blur-xl border-t border-white/[0.06] p-3 shrink-0 pb-safe">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <div className="flex-1 bg-white/[0.06] border border-white/[0.06] rounded-full px-4 py-2.5 flex items-center gap-2 focus-within:border-accent-primary/30 transition-colors">
                        <input
                            type="text"
                            placeholder="Message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="bg-transparent w-full text-[15px] focus:outline-none placeholder-text-tertiary"
                        />
                    </div>
                    {inputText.trim() && (
                        <button type="submit" disabled={sending} className="text-accent-primary font-bold text-[14px] active:scale-95 transition-all px-2 disabled:opacity-50 uppercase tracking-wider">
                            Send
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
