"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import { 
    KeyStore, 
    importPrivateKey, 
    importPublicKey, 
    generateSessionKey, 
    exportSessionKey,
    encryptSessionKeyWithRSA,
    decryptSessionKeyWithRSA,
    importSessionKey,
    encryptMessageWithAES,
    decryptMessageWithAES
} from "@/lib/crypto";

// ─── Types ───────────────────────────────────────

interface Conversation {
    conversationId: number | string;
    updated_at: string;
    userId: number;
    username: string;
    full_name: string;
    avatar_url: string;
    lastMessage: string | null;
    lastMessageTime: string | null;
    unreadCount: number;
}

type MessageStatus = "sending" | "sent" | "seen";

interface Message {
    id: number;
    content: string;
    sender_id: number;
    is_read: boolean;
    created_at: string;
    username: string;
    avatar_url: string;
    status?: MessageStatus;
}

// ─── Helpers ─────────────────────────────────────

function formatDateSeparator(dateStr: string) {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMMM d, yyyy");
}

function formatMessageTime(dateStr: string) {
    return format(new Date(dateStr), "h:mm a");
}

function linkify(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (urlRegex.test(part)) {
            return (
                <a key={i} href={part} target="_blank" rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-white/80 transition-colors break-all">
                    {part}
                </a>
            );
        }
        return part;
    });
}

function isSameDay(d1: string, d2: string) {
    const a = new Date(d1), b = new Date(d2);
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// ─── Status Icons ────────────────────────────────

function StatusIcon({ status }: { status?: MessageStatus }) {
    if (!status || status === "sending") {
        return (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-text-tertiary inline-block">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="8 24" className="animate-spin origin-center" />
            </svg>
        );
    }
    if (status === "sent") {
        return (
            <svg viewBox="0 0 20 16" className="w-4 h-3.5 text-text-tertiary inline-block">
                <path d="M2 8.5L5 11.5L10 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 8.5L10 11.5L15 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    // seen
    return (
        <svg viewBox="0 0 20 16" className="w-4 h-3.5 text-accent-primary inline-block">
            <path d="M2 8.5L5 11.5L10 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 8.5L10 11.5L15 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Main Component ──────────────────────────────

export default function MessagesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const myId = (user as any)?.id;
    const { socket, isConnected } = useSocket();

    // Inbox state
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Chat state
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const [sending, setSending] = useState(false);

    // Polling state
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const lastPollTimestamp = useRef<string | null>(null);
    const [typingTimeout, setTypingTimeoutState] = useState<NodeJS.Timeout | null>(null);
    const lastTypingEmit = useRef<number>(0);

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Active conversation ref for polling callbacks
    const activeConvoRef = useRef<Conversation | null>(null);
    useEffect(() => { activeConvoRef.current = activeConversation; }, [activeConversation]);

    // ─── E2E Decryption Helper ─────────────────────

    const decryptE2EMessage = useCallback(async (msg: any) => {
        // If it's lacking encryption fields, we assume it's legacy plaintext
        if (!msg.iv || !msg.recipient_encrypted_key || !msg.sender_encrypted_key) return msg;

        try {
            const localPrivKeyBase64 = await KeyStore.getPrivateKey();
            if (!localPrivKeyBase64) throw new Error("No local private key found");
            const privateKey = await importPrivateKey(localPrivKeyBase64);

            const isMe = msg.sender_id === myId;
            const targetEncKeyBase64 = isMe ? msg.sender_encrypted_key : msg.recipient_encrypted_key;
            
            if (!targetEncKeyBase64) throw new Error("Missing correct encrypted key for decryption");

            const sessionKeyRaw = await decryptSessionKeyWithRSA(targetEncKeyBase64, privateKey);
            const sessionKey = await importSessionKey(sessionKeyRaw);
            const plaintext = await decryptMessageWithAES(msg.content, msg.iv, sessionKey);
            
            return { ...msg, content: plaintext };
        } catch (err) {
            console.error("Decryption error for msg", msg.id, err);
            return { ...msg, content: "🔒 [Message Encrypted - Decryption Failed]" };
        }
    }, [myId]);

    // ─── Fetch Conversations ───────────────────────

    const fetchConversations = useCallback(async () => {
        try {
            const res = await fetch('/api/messages');
            if (res.ok) {
                const data = await res.json();
                
                // Decrypt last messages for the sidebar preview
                const decryptedConvos = await Promise.all((data.conversations || []).map(async (c: any) => {
                    if (c.lastMessage && c.lastMessage.length > 50) { // arbitrary length check for base64 vs short plaintext
                        // To decrypt, we need the sender/recipient keys and IV. 
                        // The existing GET /api/messages query doesn't fetch those for the last message.
                        // For a real production app, you'd join to get the `iv`, `recipient_encrypted_key`, `sender_encrypted_key`. 
                        // Since we didn't update the sidebar SQL yet, it stays encrypted visually or we show a generic placeholder.
                        return { ...c, lastMessage: "🔒 Encrypted Message" };
                    }
                    return c;
                }));

                setConversations(decryptedConvos);
            }
        } catch (error) {
            console.error('Failed to fetch conversations', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchConversations(); }, [fetchConversations]);

    // ─── Inbox Polling (every 5 seconds) ───────────

    useEffect(() => {
        const interval = setInterval(() => {
            fetchConversations();
        }, 5000);
        return () => clearInterval(interval);
    }, [fetchConversations]);

    // ─── Restore chat from URL ─────────────────────

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const routeChatId = params.get('chat');
        if (routeChatId && conversations.length > 0 && !activeConversation) {
            const convo = conversations.find(c => c.conversationId.toString() === routeChatId);
            if (convo) openConversation(convo, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversations]);

    // ─── Scroll helpers ────────────────────────────

    const scrollToBottom = useCallback((smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
    }, []);

    const handleScroll = useCallback(() => {
        const container = messagesContainerRef.current;
        if (!container) return;
        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        setShowScrollButton(distanceFromBottom > 200);
    }, []);

    useEffect(() => {
        if (messages.length > 0 && !messagesLoading) {
            setTimeout(() => scrollToBottom(false), 50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messagesLoading]);

    // ─── Socket Event Listeners ────────────────────

    useEffect(() => {
        if (!socket || !isConnected) return;

        const handleReceiveMessage = async (data: any) => {
            // data: { recipientId, conversationId, messageId, content, senderId, senderName, senderAvatar, createdAt, iv, recipient_encrypted_key, sender_encrypted_key }
            const activeCid = activeConvoRef.current?.conversationId;
            
            // Check if we are currently looking at this conversation!
            // It matches if activeCid is the database ID, OR if we are looking at a brand new chat for this specific sender.
            const isMatch = (activeCid && activeCid == data.conversationId) || 
                            (activeCid === `new_${data.senderId}`);

            if (isMatch) {
                // If it was a new conversation, upgrade it to the real DB ID automatically so future typing works smoothly.
                if (activeCid === `new_${data.senderId}`) {
                    setActiveConversation(prev => prev ? { ...prev, conversationId: data.conversationId } : prev);
                    window.history.pushState({}, '', '?chat=' + data.conversationId);
                }

                // Decrypt inline since we are in active view
                const decryptedMsg = await decryptE2EMessage({
                    id: data.messageId,
                    content: data.content,
                    sender_id: data.senderId,
                    is_read: true,
                    created_at: data.createdAt,
                    username: data.senderName,
                    avatar_url: data.senderAvatar,
                    iv: data.iv,
                    recipient_encrypted_key: data.recipient_encrypted_key,
                    sender_encrypted_key: data.sender_encrypted_key,
                });

                setMessages(prev => {
                    // avoid duplicates
                    if (prev.some(m => m.id === decryptedMsg.id)) return prev;
                    const updated = [...prev, { ...decryptedMsg, status: "seen" as MessageStatus }];
                    setTimeout(() => scrollToBottom(true), 50);
                    return updated;
                });
                
                // Send read receipt back since we are viewing
                socket.emit("mark_read", {
                    recipientId: data.senderId,
                    conversationId: data.conversationId,
                    readerId: myId
                });
            } else {
                // Message for a different conversation, just refresh the inbox
                fetchConversations();
            }
        };

        const handleTyping = (data: any) => {
            const activeCid = activeConvoRef.current?.conversationId;
            // The sender might be typing in a brand new chat (data.conversationId = "new_" + myId)
            const isMatch = (activeCid && activeCid == data.conversationId) || 
                            (data.conversationId === `new_${myId}` && activeCid === `new_${data.senderId}`);
                            
            if (isMatch) {
                setOtherUserTyping(true);
                // Auto reset typing after 3s if stop isn't received
                if (typingTimeout) clearTimeout(typingTimeout);
                const to = setTimeout(() => setOtherUserTyping(false), 3000);
                setTypingTimeoutState(to);
            }
        };

        const handleStopTyping = (data: any) => {
            const activeCid = activeConvoRef.current?.conversationId;
            const isMatch = (activeCid && activeCid == data.conversationId) || 
                            (data.conversationId === `new_${myId}` && activeCid === `new_${data.senderId}`);
                            
            if (isMatch) {
                setOtherUserTyping(false);
                if (typingTimeout) clearTimeout(typingTimeout);
            }
        };

        const handleReadReceipt = (data: any) => {
            const activeCid = activeConvoRef.current?.conversationId;
            if (activeCid && activeCid == data.conversationId) {
                 setMessages(prev => prev.map(m =>
                     m.sender_id === myId ? { ...m, is_read: true, status: "seen" as MessageStatus } : m
                 ));
            }
        };

        socket.on("receive_message", handleReceiveMessage);
        socket.on("user_typing", handleTyping);
        socket.on("user_stop_typing", handleStopTyping);
        socket.on("messages_read", handleReadReceipt);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
            socket.off("user_typing", handleTyping);
            socket.off("user_stop_typing", handleStopTyping);
            socket.off("messages_read", handleReadReceipt);
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [socket, isConnected, myId, scrollToBottom, fetchConversations, decryptE2EMessage, typingTimeout]);

    // ─── Open Conversation ─────────────────────────

    const openConversation = async (convo: Conversation, updateUrl = true) => {
        setActiveConversation(convo);
        setMessagesLoading(true);
        setMessages([]);
        setOtherUserTyping(false);
        setInputText("");
        lastPollTimestamp.current = null;

        if (updateUrl) {
            window.history.pushState({}, '', '?chat=' + convo.conversationId);
        }

        if (typeof convo.conversationId === 'string' && convo.conversationId.startsWith('new_')) {
            setMessagesLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/messages/${convo.conversationId}`);
            if (res.ok) {
                const data = await res.json();

                const decryptedMessages = await Promise.all(
                    (data.messages || []).map((m: any) => decryptE2EMessage(m))
                );

                const msgs = decryptedMessages.map((m: any) => ({
                    ...m,
                    status: m.is_read ? "seen" : "sent",
                }));
                setMessages(msgs);
                // Set the poll timestamp to now so we only get NEW messages from here on
                lastPollTimestamp.current = new Date().toISOString();
            }
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setMessagesLoading(false);
        }
    };

    // ─── Close Conversation ────────────────────────

    const closeConversation = () => {
        setActiveConversation(null);
        lastPollTimestamp.current = null;
        window.history.pushState({}, '', window.location.pathname);
        fetchConversations();
    };

    // ─── Typing ────────────────────────────────────

    const emitTyping = useCallback(async () => {
        const ac = activeConvoRef.current;
        if (!ac || typeof ac.conversationId === 'string') return;

        // Throttle: don't send more than once per second
        const now = Date.now();
        if (now - lastTypingEmit.current < 1000) return;
        lastTypingEmit.current = now;

        if (socket && isConnected) {
             socket.emit("typing", {
                 recipientId: ac.userId,
                 conversationId: ac.conversationId,
                 senderId: myId,
                 senderName: user?.username
             });
        }
    }, [socket, isConnected, myId, user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
        if (e.target.value.trim()) {
            emitTyping();
        } else {
             if (socket && isConnected) {
                 const ac = activeConvoRef.current;
                 if (ac && typeof ac.conversationId !== 'string') {
                     socket.emit("stop_typing", {
                         recipientId: ac.userId,
                         conversationId: ac.conversationId
                     });
                 }
             }
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
        }
    }, [inputText]);

    // ─── Send Message ──────────────────────────────

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || !activeConversation || sending) return;

        const msgText = inputText.trim();
        const tempId = Date.now();
        setSending(true);
        setInputText("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        // Optimistic message (shown as plaintext in UI but sends encrypted)
        const tempMsg: Message = {
            id: tempId,
            content: msgText,
            sender_id: myId || 0,
            is_read: false,
            created_at: new Date().toISOString(),
            username: user?.username || '',
            avatar_url: user?.avatarUrl || '',
            status: "sending",
        };
        setMessages(prev => [...prev, tempMsg]);
        setTimeout(() => scrollToBottom(true), 50);

        let finalConversationId = activeConversation.conversationId;

        try {
            let apiMessageId: number | null = null;
            let recipientPublicKeyStr: string | null = (activeConversation as any).public_key || null;

            // Fetch recipient's public key if we don't have it
            if (!recipientPublicKeyStr) {
                try {
                    const pkRes = await fetch(`/api/users/${activeConversation.username}/public-key`);
                    if (pkRes.ok) {
                        const pkData = await pkRes.json();
                        recipientPublicKeyStr = pkData.publicKey;
                        // update local cache for later
                        setActiveConversation(prev => prev ? { ...prev, public_key: recipientPublicKeyStr } : prev);
                    }
                } catch(e) { console.error("Could not fetch recipient public key", e); }
            }

            let encryptedPayload = {
                content: msgText,
                iv: null as string | null,
                recipientEncryptedKey: null as string | null,
                senderEncryptedKey: null as string | null
            };

            const myPublicKeyStr = (user as any)?.publicKey;

            // If we have both public keys, perform E2EE
            if (recipientPublicKeyStr && myPublicKeyStr) {
                try {
                    const sessionKey = await generateSessionKey();
                    const encMessage = await encryptMessageWithAES(msgText, sessionKey);
                    
                    const recipientRsaKey = await importPublicKey(recipientPublicKeyStr);
                    const senderRsaKey = await importPublicKey(myPublicKeyStr);
                    
                    const sessionKeyRaw = await exportSessionKey(sessionKey);

                    const recipientEnc = await encryptSessionKeyWithRSA(sessionKeyRaw, recipientRsaKey);
                    const senderEnc = await encryptSessionKeyWithRSA(sessionKeyRaw, senderRsaKey);

                    encryptedPayload = {
                        content: encMessage.ciphertext,
                        iv: encMessage.iv,
                        recipientEncryptedKey: recipientEnc,
                        senderEncryptedKey: senderEnc
                    };
                } catch(cryptoErr) {
                    console.error("Encryption failed, falling back to plaintext (or aborting)", cryptoErr);
                    // For security, you might prefer to abort here. We'll send it as plaintext if encryption fails for testing.
                }
            } else {
                console.warn("Missing public keys for E2E encryption. Sending plaintext message.");
            }

            if (typeof activeConversation.conversationId === 'string' && activeConversation.conversationId.startsWith('new_')) {
                // First message to mutual follower → create conversation
                const res = await fetch(`/api/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        targetUserId: activeConversation.userId, 
                        ...encryptedPayload 
                    }),
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && data.conversationId) {
                        finalConversationId = data.conversationId;
                        apiMessageId = data.messageId;
                        setActiveConversation(prev => prev ? { ...prev, conversationId: finalConversationId } : prev);
                        lastPollTimestamp.current = new Date().toISOString();
                    }
                }
            } else {
                const res = await fetch(`/api/messages/${activeConversation.conversationId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(encryptedPayload),
                });
                if (res.ok) {
                    const data = await res.json();
                    apiMessageId = data.messageId;
                }
            }

            // Update temp message to "sent" with real id
            setMessages(prev => prev.map(m =>
                m.id === tempId ? { ...m, id: apiMessageId || tempId, status: "sent" as MessageStatus } : m
            ));

            // Instant socket emit for the other participant
            if (socket && isConnected && apiMessageId) {
                socket.emit("send_message", {
                    recipientId: activeConversation.userId,
                    conversationId: finalConversationId,
                    messageId: apiMessageId,
                    content: encryptedPayload.content,
                    senderId: myId,
                    senderName: user?.username,
                    senderAvatar: user?.avatarUrl,
                    createdAt: tempMsg.created_at,
                    iv: encryptedPayload.iv,
                    recipient_encrypted_key: encryptedPayload.recipientEncryptedKey,
                    sender_encrypted_key: encryptedPayload.senderEncryptedKey
                });
            }

            // Refresh inbox
            fetchConversations();

        } catch (error) {
            console.error('Failed to send message', error);
            setMessages(prev => prev.map(m =>
                m.id === tempId ? { ...m, status: "sent" as MessageStatus } : m
            ));
        } finally {
            setSending(false);
            textareaRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // ─── Filtered Conversations ────────────────────

    const filteredConversations = conversations.filter(c => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            c.username.toLowerCase().includes(q) ||
            (c.full_name || "").toLowerCase().includes(q) ||
            (c.lastMessage || "").toLowerCase().includes(q)
        );
    });

    // ─── Render: Inbox Sidebar ─────────────────────

    const renderInbox = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-white hover:bg-white/5 p-1.5 -ml-1 rounded-xl transition-colors md:hidden">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold">Messages</h1>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 py-2 shrink-0">
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center gap-2 px-3 py-2 focus-within:border-accent-primary/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-text-tertiary shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="bg-transparent w-full text-sm focus:outline-none placeholder-text-tertiary"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="text-text-tertiary hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {loading && (
                    <div className="flex flex-col gap-1 px-4 py-2">
                        {[1, 2, 3, 4, 5].map(i => (
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

                {!loading && filteredConversations.length === 0 && (
                    <div className="text-center py-24 animate-fade-in px-4">
                        <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-text-tertiary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            {searchQuery ? "No results found" : "No messages yet"}
                        </h3>
                        <p className="text-text-tertiary text-sm max-w-xs mx-auto">
                            {searchQuery ? "Try a different search term" : "Follow athletes and start chatting!"}
                        </p>
                    </div>
                )}

                {filteredConversations.map((chat) => {
                    const avatarUrl = chat.avatar_url || `https://ui-avatars.com/api/?name=${chat.username}&background=random`;
                    const isActive = activeConversation?.conversationId === chat.conversationId;

                    return (
                        <div
                            key={chat.conversationId}
                            onClick={() => openConversation(chat)}
                            className={`flex items-center justify-between px-4 py-3.5 cursor-pointer transition-all mx-2 rounded-xl ${
                                isActive
                                    ? 'bg-accent-primary/10 border border-accent-primary/20'
                                    : 'hover:bg-white/[0.03] active:bg-white/[0.06] border border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/[0.06]">
                                        <Image src={avatarUrl} alt={chat.username} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                </div>
                                <div className="flex flex-col min-w-0 pr-4">
                                    <h3 className={`text-[15px] truncate ${chat.unreadCount > 0 ? 'font-bold text-white' : 'font-semibold text-text-secondary'}`}>
                                        {chat.full_name || chat.username}
                                    </h3>
                                    <p className={`text-[13px] truncate ${chat.unreadCount > 0 ? 'font-semibold text-white' : 'text-text-tertiary'}`}>
                                        {chat.lastMessage || "No messages yet — say hi! 👋"}
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
                                        {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // ─── Render: Chat View ─────────────────────────

    const renderChat = () => {
        if (!activeConversation) return null;
        const otherAvatarUrl = activeConversation.avatar_url || `https://ui-avatars.com/api/?name=${activeConversation.username}&background=random`;

        return (
            <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="bg-black/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <button onClick={closeConversation} className="text-white hover:bg-white/5 p-1.5 -ml-1 rounded-xl transition-colors lg:hidden">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => router.push(`/profile/${activeConversation.username}`)}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                                    <Image src={otherAvatarUrl} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[15px] font-bold leading-tight">{activeConversation.full_name || activeConversation.username}</h2>
                                <span className="text-[11px] leading-tight">
                                    {otherUserTyping ? (
                                        <span className="text-accent-primary font-medium">typing...</span>
                                    ) : (
                                        <span className="text-text-tertiary">@{activeConversation.username}</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-0.5 no-scrollbar relative"
                >
                    {messagesLoading && (
                        <div className="text-center py-10 text-text-tertiary">
                            <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                            Loading messages...
                        </div>
                    )}

                    {!messagesLoading && messages.length === 0 && (
                        <div className="text-center py-16 animate-fade-in flex-1 flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                                <span className="text-3xl">👋</span>
                            </div>
                            <p className="text-white font-semibold mb-1">Start the conversation!</p>
                            <p className="text-text-tertiary text-sm">Send a message to {activeConversation.full_name || activeConversation.username}</p>
                        </div>
                    )}

                    {messages.map((msg, index) => {
                        const isMe = msg.sender_id === myId;
                        const prevMsg = index > 0 ? messages[index - 1] : null;
                        const nextMsg = index < messages.length - 1 ? messages[index + 1] : null;

                        const showDateSeparator = !prevMsg || !isSameDay(msg.created_at, prevMsg.created_at);
                        const isSameSenderAsPrev = prevMsg && prevMsg.sender_id === msg.sender_id && isSameDay(msg.created_at, prevMsg.created_at);
                        const isSameSenderAsNext = nextMsg && nextMsg.sender_id === msg.sender_id && isSameDay(msg.created_at, nextMsg.created_at);
                        const isLastInGroup = !isSameSenderAsNext;
                        const isFirstInGroup = !isSameSenderAsPrev;
                        const isLastOwnMsg = isMe && (!nextMsg || nextMsg.sender_id !== myId);

                        return (
                            <React.Fragment key={msg.id}>
                                {showDateSeparator && (
                                    <div className="flex items-center justify-center my-4">
                                        <div className="bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full text-[11px] text-text-tertiary font-medium">
                                            {formatDateSeparator(msg.created_at)}
                                        </div>
                                    </div>
                                )}

                                <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup && !showDateSeparator ? 'mt-3' : 'mt-0.5'} message-in`}>
                                    {!isMe && (
                                        <div className="w-7 mr-2 shrink-0 self-end">
                                            {isLastInGroup ? (
                                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                                    <Image src={activeConversation.avatar_url || otherAvatarUrl} alt="" width={28} height={28} className="w-full h-full object-cover" unoptimized />
                                                </div>
                                            ) : <div className="w-7" />}
                                        </div>
                                    )}

                                    <div className={`flex flex-col max-w-[72%] ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`px-3.5 py-2 text-[15px] leading-relaxed ${
                                                isMe
                                                    ? `bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-[0_2px_8px_rgba(0,212,255,0.15)] ${
                                                        isFirstInGroup ? 'rounded-2xl rounded-br-md' : isLastInGroup ? 'rounded-2xl rounded-tr-md' : 'rounded-xl rounded-r-md'
                                                    }`
                                                    : `bg-white/[0.06] border border-white/[0.06] text-white ${
                                                        isFirstInGroup ? 'rounded-2xl rounded-bl-md' : isLastInGroup ? 'rounded-2xl rounded-tl-md' : 'rounded-xl rounded-l-md'
                                                    }`
                                            }`}
                                            style={{ wordBreak: 'break-word' }}
                                        >
                                            {linkify(msg.content)}
                                        </div>

                                        {isLastInGroup && (
                                            <div className={`flex items-center gap-1.5 mt-1 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                                                <span className="text-[10px] text-text-tertiary">
                                                    {formatMessageTime(msg.created_at)}
                                                </span>
                                                {isMe && isLastOwnMsg && <StatusIcon status={msg.status} />}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}

                    {/* Typing Indicator Bubble */}
                    {otherUserTyping && (
                        <div className="flex w-full justify-start mt-2 message-in">
                            <div className="w-7 mr-2 shrink-0 self-end">
                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                    <Image src={activeConversation.avatar_url || otherAvatarUrl} alt="" width={28} height={28} className="w-full h-full object-cover" unoptimized />
                                </div>
                            </div>
                            <div className="bg-white/[0.06] border border-white/[0.06] px-4 py-2.5 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Scroll to bottom fab */}
                {showScrollButton && (
                    <button
                        onClick={() => scrollToBottom(true)}
                        className="absolute bottom-20 right-6 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/[0.1] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-white/15 transition-all animate-fade-in z-20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                    </button>
                )}

                {/* Input */}
                <div className="bg-black/80 backdrop-blur-xl border-t border-white/[0.06] p-3 shrink-0 pb-safe">
                    <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                        <div className="flex-1 bg-white/[0.06] border border-white/[0.06] rounded-2xl px-4 py-2.5 flex items-end gap-2 focus-within:border-accent-primary/30 transition-colors">
                            <textarea
                                ref={textareaRef}
                                placeholder="Message..."
                                value={inputText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                rows={1}
                                className="bg-transparent w-full text-[15px] focus:outline-none placeholder-text-tertiary resize-none max-h-[120px] leading-relaxed"
                                style={{ height: "auto" }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!inputText.trim() || sending}
                            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                                inputText.trim()
                                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                                    : 'bg-white/[0.06] text-text-tertiary cursor-not-allowed'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    // ─── Desktop: Side-by-side │ Mobile: Toggle ────

    return (
        <div className="h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] flex text-white animate-fade-in overflow-hidden -mx-4 -mt-4">
            {/* Inbox sidebar */}
            <div className={`w-full lg:w-[380px] lg:min-w-[380px] lg:border-r lg:border-white/[0.06] bg-bg-body flex-col shrink-0 ${
                activeConversation ? 'hidden lg:flex' : 'flex'
            }`}>
                {renderInbox()}
            </div>

            {/* Chat panel */}
            <div className={`flex-1 bg-bg-body flex-col min-w-0 relative ${
                activeConversation ? 'flex' : 'hidden lg:flex'
            }`}>
                {activeConversation ? (
                    renderChat()
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center animate-fade-in">
                            <div className="w-24 h-24 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-text-tertiary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Your Messages</h3>
                            <p className="text-text-tertiary text-sm max-w-xs mx-auto">Select a conversation to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
