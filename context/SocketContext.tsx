"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";

interface SocketContextData {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  isUserOnline: (userId: number | string) => boolean;
}

const SocketContext = createContext<SocketContextData>({
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  isUserOnline: () => false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // Keep a ref so we can access the current socket in cleanup without stale closure
  const socketRef = useRef<Socket | null>(null);

  const isUserOnline = useCallback(
    (id: number | string) => onlineUsers.has(id.toString()),
    [onlineUsers]
  );

  useEffect(() => {
    // Disconnect and reset if not authenticated
    if (!userId) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      }
      setOnlineUsers(new Set());
      return;
    }

    // Don't create a second socket if one is already open for this user
    if (socketRef.current?.connected) return;

    const socketInstance = io(window.location.origin, {
      path: "/socket.io/",
      // Force WebSocket — skip the HTTP long-polling handshake that Hostinger often blocks
      transports: ["websocket"],
      upgrade: false,
      reconnectionAttempts: 15,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      forceNew: false,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
      // Always re-register the user on (re)connect so the server map stays accurate
      socketInstance.emit("register", userId);
      console.log("[Socket] Connected, registered userId:", userId);
    });

    socketInstance.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log("[Socket] Disconnected:", reason);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("[Socket] Connection error:", err.message);
    });

    // Online presence
    socketInstance.on("online_users", (userIds: string[]) => {
      setOnlineUsers(new Set(userIds));
    });

    socketInstance.on("user_online", (id: string) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    });

    socketInstance.on("user_offline", (id: string) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    });

    return () => {
      socketInstance.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers, isUserOnline }}>
      {children}
    </SocketContext.Provider>
  );
};
