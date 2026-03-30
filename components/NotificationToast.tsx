"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNotification, Toast, ToastType } from "@/context/NotificationContext";

/* ─── Icon configs per type ─── */
const TOAST_CONFIG: Record<ToastType, { icon: string; gradient: string; glow: string }> = {
    success: {
        icon: "✓",
        gradient: "from-emerald-500 to-green-600",
        glow: "rgba(16, 185, 129, 0.3)",
    },
    error: {
        icon: "✕",
        gradient: "from-red-500 to-rose-600",
        glow: "rgba(239, 68, 68, 0.3)",
    },
    like: {
        icon: "♥",
        gradient: "from-red-500 to-pink-600",
        glow: "rgba(239, 68, 68, 0.3)",
    },
    comment: {
        icon: "💬",
        gradient: "from-blue-500 to-indigo-600",
        glow: "rgba(59, 130, 246, 0.3)",
    },
    follow: {
        icon: "👤",
        gradient: "from-purple-500 to-violet-600",
        glow: "rgba(139, 92, 246, 0.3)",
    },
    save: {
        icon: "🔖",
        gradient: "from-amber-500 to-yellow-600",
        glow: "rgba(245, 158, 11, 0.3)",
    },
    info: {
        icon: "ℹ",
        gradient: "from-cyan-500 to-blue-600",
        glow: "rgba(0, 212, 255, 0.3)",
    },
};

/* ─── Single Toast Item ─── */
function ToastItem({ toast, index }: { toast: Toast; index: number }) {
    const { removeToast } = useNotification();
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);
    const itemRef = useRef<HTMLDivElement>(null);
    const config = TOAST_CONFIG[toast.type];
    const duration = toast.duration || 4000;

    // Progress bar animation
    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [duration]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => removeToast(toast.id), 300);
    };

    // Swipe-to-dismiss for mobile
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchMove = (e: React.TouchEvent) => {
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        if (itemRef.current) {
            itemRef.current.style.transform = `translateX(${touchDeltaX.current}px)`;
            itemRef.current.style.opacity = `${1 - Math.abs(touchDeltaX.current) / 200}`;
        }
    };
    const onTouchEnd = () => {
        if (Math.abs(touchDeltaX.current) > 80) {
            handleDismiss();
        } else if (itemRef.current) {
            itemRef.current.style.transform = "";
            itemRef.current.style.opacity = "";
        }
        touchDeltaX.current = 0;
    };

    return (
        <div
            ref={itemRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={`toast-item ${isExiting ? "toast-exit" : "toast-enter"}`}
            style={{
                zIndex: 10000 - index,
                boxShadow: `0 8px 32px ${config.glow}, 0 4px 16px rgba(0,0,0,0.4)`,
            }}
        >
            {/* Icon */}
            <div className={`toast-icon bg-gradient-to-br ${config.gradient}`}>
                <span className="text-sm">{config.icon}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-white leading-tight truncate">
                    {toast.title}
                </p>
                {toast.message && (
                    <p className="text-[11px] text-white/60 mt-0.5 leading-snug truncate">
                        {toast.message}
                    </p>
                )}
            </div>

            {/* Close button */}
            <button
                onClick={handleDismiss}
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.06] overflow-hidden rounded-b-2xl">
                <div
                    className={`h-full bg-gradient-to-r ${config.gradient} transition-none`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

/* ─── Toast Container ─── */
export default function NotificationToast() {
    const { toasts } = useNotification();

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container" aria-live="polite" aria-atomic="true">
            {toasts.map((toast, idx) => (
                <ToastItem key={toast.id} toast={toast} index={idx} />
            ))}

            <style jsx>{`
                .toast-container {
                    position: fixed;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    pointer-events: none;
                    /* Desktop: top-right */
                    top: 80px;
                    right: 20px;
                    width: 360px;
                    max-width: calc(100vw - 32px);
                }
                @media (max-width: 639px) {
                    .toast-container {
                        top: 12px;
                        left: 12px;
                        right: 12px;
                        width: auto;
                    }
                }
            `}</style>

            <style jsx global>{`
                .toast-item {
                    pointer-events: auto;
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 14px;
                    border-radius: 16px;
                    background: rgba(20, 20, 20, 0.85);
                    backdrop-filter: blur(20px) saturate(1.5);
                    -webkit-backdrop-filter: blur(20px) saturate(1.5);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    overflow: hidden;
                    cursor: default;
                    transition: transform 0.2s ease, opacity 0.2s ease;
                }
                .toast-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .toast-enter {
                    animation: toast-slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .toast-exit {
                    animation: toast-slide-out 0.3s ease-in forwards;
                }
                @keyframes toast-slide-in {
                    from {
                        opacity: 0;
                        transform: translateY(-16px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes toast-slide-out {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
                @media (max-width: 639px) {
                    @keyframes toast-slide-in {
                        from {
                            opacity: 0;
                            transform: translateY(-32px) scale(0.92);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                    @keyframes toast-slide-out {
                        from {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateY(-32px) scale(0.92);
                        }
                    }
                }
            `}</style>
        </div>
    );
}
