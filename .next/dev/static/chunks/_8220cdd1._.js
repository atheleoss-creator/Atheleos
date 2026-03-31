(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/crypto.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/crypto.ts
/**
 * Utility functions for True End-to-End Encryption (E2EE)
 * using the browser's native Web Crypto API.
 */ // 1. Generate RSA-OAEP Key Pair for Asymmetric Encryption
__turbopack_context__.s([
    "KeyStore",
    ()=>KeyStore,
    "decryptMessageWithAES",
    ()=>decryptMessageWithAES,
    "decryptSessionKeyWithRSA",
    ()=>decryptSessionKeyWithRSA,
    "encryptMessageWithAES",
    ()=>encryptMessageWithAES,
    "encryptSessionKeyWithRSA",
    ()=>encryptSessionKeyWithRSA,
    "exportKey",
    ()=>exportKey,
    "exportSessionKey",
    ()=>exportSessionKey,
    "generateKeyPair",
    ()=>generateKeyPair,
    "generateSessionKey",
    ()=>generateSessionKey,
    "importPrivateKey",
    ()=>importPrivateKey,
    "importPublicKey",
    ()=>importPublicKey,
    "importSessionKey",
    ()=>importSessionKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
async function generateKeyPair() {
    return await window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([
            1,
            0,
            1
        ]),
        hash: "SHA-256"
    }, true, [
        "encrypt",
        "decrypt"
    ]);
}
async function exportKey(key, type) {
    const exported = await window.crypto.subtle.exportKey(type, key);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(exported).toString('base64');
}
async function importPublicKey(base64Key) {
    const binaryDer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(base64Key, 'base64');
    return await window.crypto.subtle.importKey("spki", binaryDer, {
        name: "RSA-OAEP",
        hash: "SHA-256"
    }, true, [
        "encrypt"
    ]);
}
async function importPrivateKey(base64Key) {
    const binaryDer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(base64Key, 'base64');
    return await window.crypto.subtle.importKey("pkcs8", binaryDer, {
        name: "RSA-OAEP",
        hash: "SHA-256"
    }, true, [
        "decrypt"
    ]);
}
async function generateSessionKey() {
    return await window.crypto.subtle.generateKey({
        name: "AES-GCM",
        length: 256
    }, true, [
        "encrypt",
        "decrypt"
    ]);
}
async function exportSessionKey(key) {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return new Uint8Array(exported);
}
async function importSessionKey(rawKey) {
    return await window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, [
        "encrypt",
        "decrypt"
    ]);
}
async function encryptSessionKeyWithRSA(sessionKeyRaw, publicKey) {
    const encrypted = await window.crypto.subtle.encrypt({
        name: "RSA-OAEP"
    }, publicKey, sessionKeyRaw);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(encrypted).toString('base64');
}
async function decryptSessionKeyWithRSA(encryptedSessionKeyBase64, privateKey) {
    const encryptedBytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(encryptedSessionKeyBase64, 'base64');
    const decrypted = await window.crypto.subtle.decrypt({
        name: "RSA-OAEP"
    }, privateKey, encryptedBytes);
    return new Uint8Array(decrypted);
}
async function encryptMessageWithAES(message, sessionKey) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedMessage = new TextEncoder().encode(message);
    const ciphertextBuf = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: iv
    }, sessionKey, encodedMessage);
    return {
        ciphertext: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(ciphertextBuf).toString('base64'),
        iv: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(iv).toString('base64')
    };
}
async function decryptMessageWithAES(ciphertextBase64, ivBase64, sessionKey) {
    const ciphertext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(ciphertextBase64, 'base64');
    const iv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(ivBase64, 'base64');
    const decrypted = await window.crypto.subtle.decrypt({
        name: "AES-GCM",
        iv: new Uint8Array(iv)
    }, sessionKey, new Uint8Array(ciphertext));
    return new TextDecoder().decode(decrypted);
}
const KeyStore = {
    async openDB () {
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open("AtheleosE2EE", 1);
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve(request.result);
            request.onupgradeneeded = (e)=>{
                const db = e.target.result;
                if (!db.objectStoreNames.contains("keys")) {
                    db.createObjectStore("keys", {
                        keyPath: "id"
                    });
                }
            };
        });
    },
    async savePrivateKey (privateKeyBase64) {
        const db = await this.openDB();
        return new Promise((resolve, reject)=>{
            const tx = db.transaction("keys", "readwrite");
            const store = tx.objectStore("keys");
            store.put({
                id: "my_private_key",
                value: privateKeyBase64
            });
            tx.oncomplete = ()=>resolve(true);
            tx.onerror = ()=>reject(tx.error);
        });
    },
    async getPrivateKey () {
        const db = await this.openDB();
        return new Promise((resolve, reject)=>{
            const tx = db.transaction("keys", "readonly");
            const store = tx.objectStore("keys");
            const request = store.get("my_private_key");
            request.onsuccess = ()=>resolve(request.result ? request.result.value : null);
            request.onerror = ()=>reject(request.error);
        });
    },
    async clearKeys () {
        const db = await this.openDB();
        return new Promise((resolve, reject)=>{
            const tx = db.transaction("keys", "readwrite");
            const store = tx.objectStore("keys");
            store.clear();
            tx.oncomplete = ()=>resolve(true);
            tx.onerror = ()=>reject(tx.error);
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$crypto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/crypto.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [publicKey, setPublicKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const updateProfile = (data)=>{
        if (user) {
            setUser({
                ...user,
                ...data
            });
        }
    };
    // Auto-login on mount by checking the session cookie
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const checkSession = {
                "AuthProvider.useEffect.checkSession": async ()=>{
                    try {
                        const res = await fetch('/api/auth/me');
                        if (res.ok) {
                            const data = await res.json();
                            setUser(data.user);
                            // On successful login detection, fetch existing public key from backend if missing locally
                            const localPrivKey = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$crypto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyStore"].getPrivateKey();
                            if (!localPrivKey) {
                                console.warn("E2EE Warning: No local private key found. User may not be able to read past messages.");
                            // Generate a new keypair to at least allow new conversations to work,
                            // Though historically encrypted messages will be lost on this device.
                            // For a robust system, we would prompt the user to input a recovery phrase here.
                            }
                        } else {
                            setUser(null);
                            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$crypto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyStore"].clearKeys();
                        }
                    } catch (error) {
                        console.error("Session check failed", error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["AuthProvider.useEffect.checkSession"];
            checkSession();
        }
    }["AuthProvider.useEffect"], []);
    const logout = async ()=>{
        try {
            await fetch('/api/auth/logout', {
                method: 'POST'
            });
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout Error", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            setUser,
            logout,
            updateProfile,
            isAuthenticated: !!user,
            publicKey
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AuthContext.tsx",
        lineNumber: 90,
        columnNumber: 9
    }, this);
}
_s(AuthProvider, "EtihFpyc8vvjb24KyQ4JA2Q4+hs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/SocketContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocketProvider",
    ()=>SocketProvider,
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const SocketContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    socket: null,
    isConnected: false,
    onlineUsers: new Set(),
    isUserOnline: ()=>false
});
const useSocket = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SocketContext);
};
_s(useSocket, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const SocketProvider = ({ children })=>{
    _s1();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [onlineUsers, setOnlineUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const isUserOnline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketProvider.useCallback[isUserOnline]": (userId)=>onlineUsers.has(userId.toString())
    }["SocketProvider.useCallback[isUserOnline]"], [
        onlineUsers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocketProvider.useEffect": ()=>{
            // Only connect if the user is authenticated and we have an ID
            if (!user?.id) {
                if (socket) {
                    socket.disconnect();
                    setSocket(null);
                }
                setOnlineUsers(new Set());
                return;
            }
            // Connect to the socket server (runs on the same origin)
            const socketInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(window.location.origin, {
                path: "/socket.io/",
                reconnectionAttempts: 10,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000
            });
            socketInstance.on("connect", {
                "SocketProvider.useEffect": ()=>{
                    setIsConnected(true);
                    // Register this socket specifically for the authenticated user
                    socketInstance.emit("register", user.id);
                }
            }["SocketProvider.useEffect"]);
            socketInstance.on("disconnect", {
                "SocketProvider.useEffect": ()=>{
                    setIsConnected(false);
                }
            }["SocketProvider.useEffect"]);
            // Online presence handlers
            socketInstance.on("online_users", {
                "SocketProvider.useEffect": (userIds)=>{
                    setOnlineUsers(new Set(userIds));
                }
            }["SocketProvider.useEffect"]);
            socketInstance.on("user_online", {
                "SocketProvider.useEffect": (userId)=>{
                    setOnlineUsers({
                        "SocketProvider.useEffect": (prev)=>{
                            const next = new Set(prev);
                            next.add(userId);
                            return next;
                        }
                    }["SocketProvider.useEffect"]);
                }
            }["SocketProvider.useEffect"]);
            socketInstance.on("user_offline", {
                "SocketProvider.useEffect": (userId)=>{
                    setOnlineUsers({
                        "SocketProvider.useEffect": (prev)=>{
                            const next = new Set(prev);
                            next.delete(userId);
                            return next;
                        }
                    }["SocketProvider.useEffect"]);
                }
            }["SocketProvider.useEffect"]);
            setSocket(socketInstance);
            return ({
                "SocketProvider.useEffect": ()=>{
                    socketInstance.disconnect();
                }
            })["SocketProvider.useEffect"];
        }
    }["SocketProvider.useEffect"], [
        user?.id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocketContext.Provider, {
        value: {
            socket,
            isConnected,
            onlineUsers,
            isUserOnline
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/SocketContext.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(SocketProvider, "UPD8pm2hmjXFfESROjdZ3yq1rtI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SocketProvider;
var _c;
__turbopack_context__.k.register(_c, "SocketProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8220cdd1._.js.map