"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  const isUserOnline = useCallback(
    (userId: number | string) => onlineUsers.has(userId.toString()),
    [onlineUsers]
  );

  useEffect(() => {
    // Only connect if the user is authenticated and we have an ID
    if (!(user as any)?.id) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setOnlineUsers(new Set());
      return;
    }

    // Connect to the socket server (runs on the same origin)
    const socketInstance = io(window.location.origin, {
      path: "/socket.io/",
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
      // Register this socket specifically for the authenticated user
      socketInstance.emit("register", (user as any).id);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    // Online presence handlers
    socketInstance.on("online_users", (userIds: string[]) => {
      setOnlineUsers(new Set(userIds));
    });

    socketInstance.on("user_online", (userId: string) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.add(userId);
        return next;
      });
    });

    socketInstance.on("user_offline", (userId: string) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [(user as any)?.id]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers, isUserOnline }}>
      {children}
    </SocketContext.Provider>
  );
};
