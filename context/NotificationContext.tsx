"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "like" | "comment" | "follow" | "save" | "info";

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface NotificationContextType {
    toasts: Toast[];
    showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
    removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (type: ToastType, title: string, message?: string, duration: number = 4000) => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            const toast: Toast = { id, type, title, message, duration };

            setToasts((prev) => {
                // Keep max 5 toasts
                const next = [...prev, toast];
                if (next.length > 5) next.shift();
                return next;
            });

            // Auto-dismiss
            setTimeout(() => {
                removeToast(id);
            }, duration);
        },
        [removeToast]
    );

    return (
        <NotificationContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
}
