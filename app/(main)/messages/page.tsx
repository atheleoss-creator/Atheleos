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

    // Fetch conversations
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

    // Fetch messages for active conversation
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

        // Optimistic update
        const tempMsg: Message = {
            id: Date.now(),
            content: msgText,
            sender_id: 0, // will be replaced
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
            <div className="min-h-screen bg-bg-body text-text-primary pb-20 md:pb-10 font-sans animate-fade-in">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-bg-body/95 backdrop-blur-md border-b border-border-color px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="text-text-primary hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold tracking-wide">Messages</h1>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex flex-col">
                    <div className="px-4 py-3 pb-1 flex items-center justify-between">
                        <p className="text-text-primary text-[16px] font-bold">Inbox</p>
                    </div>

                    {loading && (
                        <div className="flex flex-col gap-2 px-4 py-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 p-3">
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
                        <div className="text-center py-20 animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-bg-surface border border-border-color flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-text-tertiary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">No messages yet</h3>
                            <p className="text-text-secondary text-sm">Start a conversation from someone&apos;s profile.</p>
                        </div>
                    )}

                    {conversations.map((chat) => {
                        const avatarUrl = chat.avatar_url || `https://ui-avatars.com/api/?name=${chat.username}&background=random`;
                        return (
                            <div
                                key={chat.conversationId}
                                onClick={() => openConversation(chat)}
                                className="flex items-center justify-between p-4 hover:bg-bg-surface/50 cursor-pointer transition-colors active:bg-white/5"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="relative w-14 h-14 shrink-0 rounded-full bg-gray-800 border border-border-color overflow-hidden">
                                        <Image src={avatarUrl} alt={chat.username} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                    <div className="flex flex-col min-w-0 pr-4">
                                        <h3 className={`text-[15px] truncate ${chat.unreadCount > 0 ? 'font-bold text-white' : 'font-semibold text-text-primary'}`}>
                                            {chat.full_name || chat.username}
                                        </h3>
                                        <p className={`text-[14px] truncate ${chat.unreadCount > 0 ? 'font-semibold text-white' : 'text-text-secondary'}`}>
                                            {chat.lastMessage || "No messages yet"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end shrink-0 gap-1.5 pl-2">
                                    {chat.lastMessageTime && (
                                        <span className={`text-[12px] ${chat.unreadCount > 0 ? 'text-accent-primary font-bold' : 'text-text-secondary'}`}>
                                            {formatDistanceToNow(new Date(chat.lastMessageTime), { addSuffix: true })}
                                        </span>
                                    )}
                                    {chat.unreadCount > 0 && (
                                        <div className="w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center text-[11px] font-bold text-bg-body">
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
        <div className="fixed inset-0 z-50 bg-bg-body flex flex-col pt-safe text-text-primary font-sans animate-fade-in">
            {/* Chat Header */}
            <div className="bg-bg-body/95 backdrop-blur-md border-b border-border-color px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveConversation(null)} className="text-text-primary hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden shrink-0 border border-border-color">
                            <Image src={otherAvatarUrl} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[15px] font-bold leading-tight">{activeConversation.full_name || activeConversation.username}</h2>
                            <span className="text-[12px] text-text-secondary">@{activeConversation.username}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-bg-body no-scrollbar">
                {messagesLoading && (
                    <div className="text-center py-10 text-text-secondary animate-pulse">Loading messages...</div>
                )}

                {!messagesLoading && messages.length === 0 && (
                    <div className="text-center py-10 text-text-secondary">
                        <p className="text-sm">No messages yet. Say hi! 👋</p>
                    </div>
                )}

                {messages.map((msg) => {
                    const isMe = msg.username === user?.username;
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
                                    {msg.content}
                                </div>
                                <span className={`text-[11px] text-text-secondary ${isMe ? 'text-right' : 'text-left'}`}>
                                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <div className="bg-bg-body border-t border-border-color p-3 shrink-0 pb-safe">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <div className="flex-1 bg-bg-surface border border-border-color rounded-full px-4 py-2.5 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="bg-transparent w-full text-[15px] focus:outline-none placeholder-text-secondary"
                        />
                    </div>
                    {inputText.trim() && (
                        <button type="submit" disabled={sending} className="text-accent-primary font-bold text-[15px] active:scale-95 transition-transform px-2 disabled:opacity-50">
                            Send
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
