(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Icons.tsx [app-client] (ecmascript)");
;
;
function Badge({ level, className = "", showTooltip = false }) {
    const getBadgeColor = (level)=>{
        switch(level?.toLowerCase()){
            case "struggler":
                return "#3B82F6"; // Blue
            case "state":
                return "#9CA3AF"; // Grey
            case "national":
                return "#FCD34D"; // Gold
            case "international":
                return "#000000"; // Black
            default:
                return "#3B82F6"; // Blue default
        }
    };
    const color = getBadgeColor(level);
    const tickColor = level?.toLowerCase() === "international" ? "white" : "black";
    const title = level ? `${level.charAt(0).toUpperCase() + level.slice(1)} Athlete` : "Verified Athlete";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative flex items-center justify-center ${className}`,
        title: showTooltip ? title : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BadgeIcon"], {
            className: "w-full h-full",
            color: color,
            tickColor: tickColor
        }, void 0, false, {
            fileName: "[project]/components/Badge.tsx",
            lineNumber: 29,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Badge.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/LikesModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LikesModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript) <export default as XMarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function LikesModal({ postId, isOpen, onClose }) {
    _s();
    const { user: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Follow toggle states
    const [followLoadingId, setFollowLoadingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LikesModal.useEffect": ()=>{
            if (!isOpen) return;
            let isMounted = true;
            const fetchLikes = {
                "LikesModal.useEffect.fetchLikes": async ()=>{
                    setLoading(true);
                    try {
                        const res = await fetch(`/api/posts/${postId}/likes`);
                        if (!res.ok) throw new Error("Failed to load likes");
                        const data = await res.json();
                        if (isMounted) setUsers(data.users || []);
                    } catch (err) {
                        if (isMounted) setError("Could not load users.");
                    } finally{
                        if (isMounted) setLoading(false);
                    }
                }
            }["LikesModal.useEffect.fetchLikes"];
            fetchLikes();
            return ({
                "LikesModal.useEffect": ()=>{
                    isMounted = false;
                }
            })["LikesModal.useEffect"];
        }
    }["LikesModal.useEffect"], [
        postId,
        isOpen
    ]);
    if (!isOpen) return null;
    const handleFollowToggle = async (targetId, currentFollowState)=>{
        if (followLoadingId === targetId) return;
        setFollowLoadingId(targetId);
        // Optimistic UI update
        setUsers((prev)=>prev.map((u)=>u.id === targetId ? {
                    ...u,
                    is_following: !currentFollowState
                } : u));
        try {
            const res = await fetch('/api/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetUserId: targetId
                })
            });
            if (res.ok) {
                const data = await res.json();
                setUsers((prev)=>prev.map((u)=>u.id === targetId ? {
                            ...u,
                            is_following: data.following
                        } : u));
            } else {
                // Revert
                setUsers((prev)=>prev.map((u)=>u.id === targetId ? {
                            ...u,
                            is_following: currentFollowState
                        } : u));
            }
        } catch  {
            // Revert
            setUsers((prev)=>prev.map((u)=>u.id === targetId ? {
                        ...u,
                        is_following: currentFollowState
                    } : u));
        } finally{
            setFollowLoadingId(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#111] border border-white/[0.08] rounded-2xl w-full max-w-sm mx-4 max-h-[70vh] flex flex-col overflow-hidden shadow-2xl",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-5 py-4 border-b border-white/[0.06]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-white uppercase tracking-wider",
                            children: "Likes"
                        }, void 0, false, {
                            fileName: "[project]/components/LikesModal.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-tertiary hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/components/LikesModal.tsx",
                                lineNumber: 95,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/LikesModal.tsx",
                            lineNumber: 94,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LikesModal.tsx",
                    lineNumber: 92,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto no-scrollbar",
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-4",
                        children: [
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-11 h-11 rounded-full skeleton shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LikesModal.tsx",
                                        lineNumber: 105,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 w-28 skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LikesModal.tsx",
                                                lineNumber: 107,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 w-20 skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LikesModal.tsx",
                                                lineNumber: 108,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LikesModal.tsx",
                                        lineNumber: 106,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-8 rounded-lg skeleton shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LikesModal.tsx",
                                        lineNumber: 110,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/LikesModal.tsx",
                                lineNumber: 104,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/LikesModal.tsx",
                        lineNumber: 102,
                        columnNumber: 25
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-10 text-center text-red-400 text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/LikesModal.tsx",
                        lineNumber: 115,
                        columnNumber: 25
                    }, this) : users.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-12 text-center text-text-tertiary text-sm font-medium",
                        children: "No likes yet."
                    }, void 0, false, {
                        fileName: "[project]/components/LikesModal.tsx",
                        lineNumber: 117,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 space-y-0.5",
                        children: users.map((u)=>{
                            const isMe = currentUser?.id === u.id || currentUser?.username === u.username;
                            const avatarFullUrl = u.avatar_url || "/default_avatar.svg";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/profile/${u.username}`,
                                        onClick: onClose,
                                        className: "w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-white/[0.06]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: avatarFullUrl,
                                            alt: u.username,
                                            width: 44,
                                            height: 44,
                                            className: "w-full h-full object-cover",
                                            unoptimized: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LikesModal.tsx",
                                            lineNumber: 129,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/LikesModal.tsx",
                                        lineNumber: 128,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/profile/${u.username}`,
                                        onClick: onClose,
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white text-[14px] truncate flex items-center gap-1",
                                                        children: u.username
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LikesModal.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 49
                                                    }, this),
                                                    u.is_verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        level: u.verification_level,
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LikesModal.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 67
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LikesModal.tsx",
                                                lineNumber: 132,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[12px] text-text-tertiary truncate",
                                                children: u.full_name || u.username
                                            }, void 0, false, {
                                                fileName: "[project]/components/LikesModal.tsx",
                                                lineNumber: 138,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LikesModal.tsx",
                                        lineNumber: 131,
                                        columnNumber: 41
                                    }, this),
                                    !isMe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFollowToggle(u.id, u.is_following),
                                        disabled: followLoadingId === u.id,
                                        className: `shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold tracking-wide uppercase transition-all active:scale-95 flex items-center justify-center min-w-[90px] ${u.is_following ? 'bg-white/[0.06] border border-white/[0.1] text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30' : 'bg-accent-primary text-white shadow-[0_0_10px_rgba(0,212,255,0.15)]'}`,
                                        children: followLoadingId === u.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/LikesModal.tsx",
                                            lineNumber: 151,
                                            columnNumber: 53
                                        }, this) : u.is_following ? 'Following' : 'Follow'
                                    }, void 0, false, {
                                        fileName: "[project]/components/LikesModal.tsx",
                                        lineNumber: 141,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, u.id, true, {
                                fileName: "[project]/components/LikesModal.tsx",
                                lineNumber: 127,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/LikesModal.tsx",
                        lineNumber: 121,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/LikesModal.tsx",
                    lineNumber: 100,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/LikesModal.tsx",
            lineNumber: 89,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/LikesModal.tsx",
        lineNumber: 88,
        columnNumber: 9
    }, this);
}
_s(LikesModal, "a7ZQqAdxe/VknxGS+g+dqyScQMg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LikesModal;
var _c;
__turbopack_context__.k.register(_c, "LikesModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ShareModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript) <export default as XMarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/MagnifyingGlassIcon.js [app-client] (ecmascript) <export default as MagnifyingGlassIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/PaperAirplaneIcon.js [app-client] (ecmascript) <export default as PaperAirplaneIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/CheckIcon.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$LinkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/LinkIcon.js [app-client] (ecmascript) <export default as LinkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/NotificationContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ShareModal({ postId, isOpen, onClose }) {
    _s();
    const { user: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotification"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sentUserIds, setSentUserIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [sendingId, setSendingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const baseUrl = ("TURBOPACK compile-time value", "https://atheleos.in") || (("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable");
    const postUrl = `${baseUrl}/post/${postId}`;
    // Fetch initial list (followed users first, fallback to suggested)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShareModal.useEffect": ()=>{
            if (!isOpen) {
                setSearchQuery("");
                setSearchResults(null);
                setSentUserIds({});
                return;
            }
            let isMounted = true;
            const fetchInitialUsers = {
                "ShareModal.useEffect.fetchInitialUsers": async ()=>{
                    setLoading(true);
                    try {
                        let fetchedUsers = [];
                        if (currentUser?.id) {
                            const res = await fetch(`/api/follow/list?userId=${currentUser.id}&type=following`);
                            if (res.ok) {
                                const data = await res.json();
                                fetchedUsers = data.users || [];
                            }
                        }
                        // If not logged in or following nobody, get suggested users
                        if (fetchedUsers.length === 0) {
                            const suggRes = await fetch('/api/users/suggested');
                            if (suggRes.ok) {
                                const suggData = await suggRes.json();
                                fetchedUsers = suggData.users || [];
                            }
                        }
                        if (isMounted) setUsers(fetchedUsers);
                    } catch (err) {
                        console.error("Failed to load users for share modal", err);
                    } finally{
                        if (isMounted) setLoading(false);
                    }
                }
            }["ShareModal.useEffect.fetchInitialUsers"];
            fetchInitialUsers();
            return ({
                "ShareModal.useEffect": ()=>{
                    isMounted = false;
                }
            })["ShareModal.useEffect"];
        }
    }["ShareModal.useEffect"], [
        isOpen,
        currentUser
    ]);
    // Handle Search
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShareModal.useEffect": ()=>{
            if (!searchQuery.trim()) {
                setSearchResults(null);
                setSearching(false);
                return;
            }
            const timer = setTimeout({
                "ShareModal.useEffect.timer": async ()=>{
                    setSearching(true);
                    try {
                        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        if (res.ok) {
                            const data = await res.json();
                            setSearchResults(data.users || []);
                        } else {
                            setSearchResults([]);
                        }
                    } catch  {
                        setSearchResults([]);
                    } finally{
                        setSearching(false);
                    }
                }
            }["ShareModal.useEffect.timer"], 300);
            return ({
                "ShareModal.useEffect": ()=>clearTimeout(timer)
            })["ShareModal.useEffect"];
        }
    }["ShareModal.useEffect"], [
        searchQuery
    ]);
    if (!isOpen) return null;
    const displayedUsers = searchResults !== null ? searchResults : users.filter((u)=>u.username.toLowerCase().includes(searchQuery.toLowerCase()) || u.full_name && u.full_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleSendDirect = async (targetUser)=>{
        if (sendingId === targetUser.id || sentUserIds[targetUser.id]) return;
        if (!currentUser) {
            showToast("error", "Please log in to send messages");
            return;
        }
        setSendingId(targetUser.id);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetUserId: targetUser.id,
                    content: postUrl
                })
            });
            if (res.ok) {
                setSentUserIds((prev)=>({
                        ...prev,
                        [targetUser.id]: true
                    }));
                showToast("success", `Sent to @${targetUser.username}!`);
            } else {
                showToast("error", "Failed to send message");
            }
        } catch  {
            showToast("error", "Failed to send message");
        } finally{
            setSendingId(null);
        }
    };
    const handleCopyLink = async ()=>{
        try {
            await navigator.clipboard.writeText(postUrl);
            showToast("success", "Link copied!", "Post URL copied to clipboard");
        } catch  {
            showToast("error", "Failed to copy link");
        }
    };
    const socialApps = [
        {
            name: "Copy link",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$LinkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkIcon$3e$__["LinkIcon"], {
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 166,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 165,
                columnNumber: 17
            }, this),
            onClick: handleCopyLink
        },
        {
            name: "WhatsApp",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors flex items-center justify-center text-[#25D366] border border-[#25D366]/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6 fill-current",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.793 1.394.88.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.601.723 4.913 2.034 1.312 1.311 2.033 3.057 2.033 4.913-.001 3.825-3.111 6.933-6.946 6.933z"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 176,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 175,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 174,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "X",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5 fill-current",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 187,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 186,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 185,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "Facebook",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/30 transition-colors flex items-center justify-center text-[#1877F2] border border-[#1877F2]/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6 fill-current",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 198,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 197,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 196,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "Email",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6 fill-none stroke-current stroke-2",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 209,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 208,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 207,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`mailto:?subject=${encodeURIComponent("Check out this post on Atheleos")}&body=${encodeURIComponent(postUrl)}`, "_blank")
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#121212] border border-white/[0.1] rounded-3xl w-full max-w-md mx-4 max-h-[85vh] flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.9)]",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-white/[0.08]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__["PaperAirplaneIcon"], {
                                    className: "w-5 h-5 text-accent-primary -rotate-45"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 224,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-black text-white tracking-wide",
                                    children: "Share"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 225,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 223,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-tertiary hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 228,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 227,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 222,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__["MagnifyingGlassIcon"], {
                                className: "w-5 h-5 absolute left-3.5 text-text-tertiary"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 235,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: "Search athletes...",
                                className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-text-tertiary outline-none focus:border-accent-primary/50 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 236,
                                columnNumber: 25
                            }, this),
                            searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSearchQuery(""),
                                className: "absolute right-3 text-text-tertiary hover:text-white text-xs bg-white/10 w-5 h-5 rounded-full flex items-center justify-center",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 244,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 234,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 233,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-2 py-2 min-h-[220px] max-h-[380px] no-scrollbar",
                    children: loading || searching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-3",
                        children: [
                            1,
                            2,
                            3,
                            4
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-11 h-11 rounded-full skeleton shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 257,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3.5 w-32 skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 259,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2.5 w-20 skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 260,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 258,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-8 rounded-xl skeleton shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 262,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 256,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 254,
                        columnNumber: 25
                    }, this) : displayedUsers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-16 text-center flex flex-col items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-text-tertiary mb-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__["MagnifyingGlassIcon"], {
                                    className: "w-6 h-6 opacity-60"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 269,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 268,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-bold text-sm",
                                children: "No users found"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 271,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-text-tertiary text-xs max-w-[200px]",
                                children: searchQuery ? `We couldn't find anyone matching "${searchQuery}"` : "Follow other athletes to share highlights with them."
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 272,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 267,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: displayedUsers.map((u)=>{
                            const avatarFullUrl = u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}&background=random`;
                            const isSent = sentUserIds[u.id];
                            const isSending = sendingId === u.id;
                            const isMe = currentUser?.username === u.username;
                            if (isMe) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/[0.04] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/profile/${u.username}`,
                                        onClick: onClose,
                                        className: "w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-white/[0.08] bg-bg-surface",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: avatarFullUrl,
                                            alt: u.username,
                                            width: 44,
                                            height: 44,
                                            className: "w-full h-full object-cover",
                                            unoptimized: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 289,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 288,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white text-[14px] truncate",
                                                        children: u.full_name || u.username
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ShareModal.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 49
                                                    }, this),
                                                    u.is_verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        level: u.verification_level,
                                                        className: "w-3.5 h-3.5 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ShareModal.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 67
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 292,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[12px] text-text-tertiary truncate block",
                                                children: [
                                                    "@",
                                                    u.username
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 298,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 291,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSendDirect(u),
                                        disabled: isSent || isSending,
                                        className: `shrink-0 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all active:scale-95 flex items-center justify-center gap-1.5 min-w-[76px] ${isSent ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-accent-primary text-black hover:bg-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'}`,
                                        children: isSending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 310,
                                            columnNumber: 49
                                        }, this) : isSent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                                                    className: "w-4 h-4 stroke-[3]"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ShareModal.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Sent"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ShareModal.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Send"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 317,
                                            columnNumber: 49
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 300,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, u.id, true, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 287,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 277,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 252,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-black/40 border-t border-white/[0.08]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-3 px-1",
                            children: "Share via"
                        }, void 0, false, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 329,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 overflow-x-auto pb-1 px-1 no-scrollbar",
                            children: socialApps.map((app, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: app.onClick,
                                    className: "flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform",
                                    children: [
                                        app.icon,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] text-text-secondary group-hover:text-white transition-colors select-none whitespace-nowrap",
                                            children: app.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 338,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 332,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 330,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 328,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ShareModal.tsx",
            lineNumber: 219,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ShareModal.tsx",
        lineNumber: 218,
        columnNumber: 9
    }, this);
}
_s(ShareModal, "a1E5NBbUOKX4Pcrb2AkDA9jYAlQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotification"]
    ];
});
_c = ShareModal;
var _c;
__turbopack_context__.k.register(_c, "ShareModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(main)/reels/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReelsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/NotificationContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LikesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LikesModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ShareModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ShareModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function ReelsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [reels, setReels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [renderedCopies, setRenderedCopies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReelsPage.useEffect": ()=>{
            async function fetchReels() {
                try {
                    const res = await fetch('/api/posts/reels');
                    if (res.ok) {
                        const data = await res.json();
                        setReels(data.reels || []);
                    }
                } catch (error) {
                    console.error('Failed to fetch reels', error);
                } finally{
                    setLoading(false);
                }
            }
            fetchReels();
        }
    }["ReelsPage.useEffect"], []);
    const handleScroll = ()=>{
        if (!containerRef.current || reels.length === 0) return;
        const container = containerRef.current;
        const scrollPosition = container.scrollTop;
        const height = container.clientHeight;
        const totalReels = reels.length;
        const rawIndex = Math.round(scrollPosition / height);
        if (rawIndex !== activeIndex) setActiveIndex(rawIndex);
        // Append more copies seamlessly when nearing the bottom
        if (rawIndex >= (renderedCopies - 1) * totalReels - 2) {
            setRenderedCopies((prev)=>prev + 1);
        }
    };
    // On mount, start at the very first reel
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReelsPage.useEffect": ()=>{
            if (containerRef.current && reels.length > 0) {
                containerRef.current.scrollTop = 0;
            }
        }
    }["ReelsPage.useEffect"], [
        reels
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-black text-white w-full h-[calc(100dvh-128px)] md:h-[calc(100dvh-80px)] flex items-center justify-center -mt-[72px] md:-mt-[80px] pt-[72px] md:pt-[80px] -mb-24 md:-mb-8 pb-24 md:pb-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 64,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-text-tertiary text-sm font-medium",
                        children: "Loading reels..."
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 63,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/reels/page.tsx",
            lineNumber: 62,
            columnNumber: 13
        }, this);
    }
    if (reels.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-black text-white w-full h-[calc(100dvh-128px)] md:h-[calc(100dvh-80px)] flex items-center justify-center -mt-[72px] md:-mt-[80px] pt-[72px] md:pt-[80px] -mb-24 md:-mb-8 pb-24 md:pb-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center animate-fade-in px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            strokeWidth: 1.5,
                            stroke: "currentColor",
                            className: "w-12 h-12 text-text-tertiary",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 77,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 76,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 75,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-white mb-3",
                        children: "No Reels Yet"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-text-secondary text-sm mb-6 max-w-xs mx-auto",
                        children: "Upload a video post to see it here as a reel!"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 81,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/create-post'),
                        className: "bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all active:scale-95",
                        children: "Upload Video"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 82,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 74,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/reels/page.tsx",
            lineNumber: 73,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black text-white w-full h-[100dvh] overflow-hidden flex justify-center relative -mt-[72px] md:-mt-[80px] -mb-24 md:-mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>router.back(),
                className: "absolute top-[68px] md:top-[96px] left-4 z-50 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-all active:scale-90",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 2.5,
                    stroke: "currentColor",
                    className: "w-5 h-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 98,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/reels/page.tsx",
                    lineNumber: 97,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[68px] md:top-[96px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white font-bold text-lg drop-shadow-lg",
                        children: "Reels"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 104,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-accent-primary rounded-full shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 105,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                onScroll: handleScroll,
                className: "w-full max-w-[500px] h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide relative",
                children: Array.from({
                    length: renderedCopies
                }).flatMap((_, copy)=>reels.map((reel, index)=>{
                        const absoluteIndex = copy * reels.length + index;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReelItem, {
                            data: reel,
                            isActive: absoluteIndex === activeIndex
                        }, `${copy}-${reel.id}`, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 120,
                            columnNumber: 29
                        }, this);
                    }))
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 110,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/reels/page.tsx",
        lineNumber: 91,
        columnNumber: 9
    }, this);
}
_s(ReelsPage, "r7FW7Ih4xhU08zAn15am22G4hcQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ReelsPage;
/* ─── Single Reel Item ─── */ function ReelItem({ data, isActive }) {
    _s1();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotification"])();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLiked, setIsLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!!data.isLiked);
    const [likeCount, setLikeCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(data.likes || 0);
    // Likes Modal
    const [showLikesModal, setShowLikesModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showShareModal, setShowShareModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaved, setIsSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!!data.isSaved);
    const [showPlayIcon, setShowPlayIcon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDoubleTapHeart, setShowDoubleTapHeart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showComments, setShowComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [commentsLoading, setCommentsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [commentText, setCommentText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [commentCount, setCommentCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(data.comments || 0);
    const [isSubmittingComment, setIsSubmittingComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [captionExpanded, setCaptionExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastTapTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const progressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Play/pause based on active state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReelItem.useEffect": ()=>{
            if (!videoRef.current) return;
            if (isActive) {
                videoRef.current.play().then({
                    "ReelItem.useEffect": ()=>setIsPlaying(true)
                }["ReelItem.useEffect"]).catch({
                    "ReelItem.useEffect": ()=>setIsPlaying(false)
                }["ReelItem.useEffect"]);
                videoRef.current.currentTime = 0;
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }["ReelItem.useEffect"], [
        isActive
    ]);
    // Progress tracking
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReelItem.useEffect": ()=>{
            if (!isActive) return;
            progressRef.current = setInterval({
                "ReelItem.useEffect": ()=>{
                    if (videoRef.current && videoRef.current.duration) {
                        setProgress(videoRef.current.currentTime / videoRef.current.duration * 100);
                    }
                }
            }["ReelItem.useEffect"], 100);
            return ({
                "ReelItem.useEffect": ()=>{
                    if (progressRef.current) clearInterval(progressRef.current);
                }
            })["ReelItem.useEffect"];
        }
    }["ReelItem.useEffect"], [
        isActive
    ]);
    // Toggle play
    const togglePlay = ()=>{
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
        setShowPlayIcon(true);
        setTimeout(()=>setShowPlayIcon(false), 600);
    };
    // Handle tap (single = play/pause, double = like)
    const handleTap = ()=>{
        const now = Date.now();
        if (now - lastTapTime.current < 300) {
            // Double tap
            handleDoubleTapLike();
            lastTapTime.current = 0;
        } else {
            lastTapTime.current = now;
            setTimeout(()=>{
                if (lastTapTime.current !== 0 && Date.now() - lastTapTime.current >= 280) {
                    togglePlay();
                }
            }, 300);
        }
    };
    // Double-tap like
    const handleDoubleTapLike = ()=>{
        if (!isLiked) {
            toggleLike();
        }
        setShowDoubleTapHeart(true);
        setTimeout(()=>setShowDoubleTapHeart(false), 800);
    };
    // Like
    const toggleLike = async ()=>{
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
        try {
            const res = await fetch(`/api/posts/${data.id}/like`, {
                method: 'POST'
            });
            if (!res.ok) throw new Error('Failed');
            if (newLiked) showToast("like", "Reel liked!");
        } catch  {
            setIsLiked(!newLiked);
            setLikeCount(likeCount);
        }
    };
    // Save
    const toggleSave = async ()=>{
        const newSaved = !isSaved;
        setIsSaved(newSaved);
        try {
            const res = await fetch(`/api/posts/${data.id}/save`, {
                method: 'POST'
            });
            if (!res.ok) throw new Error('Failed');
            showToast("save", newSaved ? "Reel saved!" : "Reel unsaved");
        } catch  {
            setIsSaved(!newSaved);
        }
    };
    // Share
    const handleShare = ()=>{
        setShowShareModal(true);
    };
    // Open comments drawer
    const openComments = async ()=>{
        setShowComments(true);
        if (comments.length === 0) {
            setCommentsLoading(true);
            try {
                const res = await fetch(`/api/posts/${data.id}/comments`);
                if (res.ok) {
                    const d = await res.json();
                    setComments(d.comments || []);
                }
            } catch  {
            // silent
            } finally{
                setCommentsLoading(false);
            }
        }
    };
    // Submit comment
    const submitComment = async ()=>{
        if (!commentText.trim() || isSubmittingComment) return;
        setIsSubmittingComment(true);
        try {
            const res = await fetch(`/api/posts/${data.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: commentText
                })
            });
            if (res.ok) {
                setComments((prev)=>[
                        ...prev,
                        {
                            id: Date.now(),
                            content: commentText,
                            created_at: new Date().toISOString(),
                            username: user?.username || "you",
                            full_name: user?.fullName || "",
                            avatar_url: user?.avatarUrl || "/default_avatar.svg",
                            is_verified: user?.isVerified || false,
                            verification_level: user?.verificationLevel || "unverified"
                        }
                    ]);
                setCommentText("");
                setCommentCount((c)=>c + 1);
                showToast("comment", "Comment posted!");
            }
        } catch  {
            showToast("error", "Failed to post comment");
        } finally{
            setIsSubmittingComment(false);
        }
    };
    // Delete comment
    const handleDeleteComment = async (commentId)=>{
        if (!confirm("Are you sure you want to delete this comment?")) return;
        try {
            const res = await fetch(`/api/posts/${data.id}/comments?commentId=${commentId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setComments((prev)=>prev.filter((c)=>c.id !== commentId));
                setCommentCount((c)=>c - 1);
                showToast("success", "Comment deleted");
            } else {
                showToast("error", "Failed to delete comment");
            }
        } catch  {
            showToast("error", "Failed to delete comment");
        }
    };
    const formatNumber = (num)=>{
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };
    const formatTimeAgo = (dateStr)=>{
        try {
            const diff = Date.now() - new Date(dateStr).getTime();
            const mins = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);
            if (days > 0) return `${days}d`;
            if (hours > 0) return `${hours}h`;
            if (mins > 0) return `${mins}m`;
            return "now";
        } catch  {
            return "";
        }
    };
    const avatarUrl = data.avatar_url || `https://ui-avatars.com/api/?name=${data.username}&background=1a1a1a&color=fff&bold=true`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full snap-start bg-black flex items-center justify-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                src: data.media_url,
                className: "absolute inset-0 w-full h-full object-cover",
                loop: true,
                muted: isMuted,
                playsInline: true,
                onClick: handleTap
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 355,
                columnNumber: 13
            }, this),
            showPlayIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-20 h-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center animate-scale-in",
                    children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "white",
                        className: "w-10 h-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 371,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 370,
                        columnNumber: 29
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "white",
                        className: "w-10 h-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 375,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 374,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/reels/page.tsx",
                    lineNumber: 368,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 367,
                columnNumber: 17
            }, this),
            showDoubleTapHeart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "white",
                    className: "w-28 h-28 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-scale-in",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 386,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/reels/page.tsx",
                    lineNumber: 385,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 384,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[104px] md:top-[96px] right-4 z-30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setIsMuted(!isMuted),
                    className: "w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/15 hover:bg-black/60 transition-all active:scale-90",
                    children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 2,
                        stroke: "currentColor",
                        className: "w-4 h-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 396,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 395,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 2,
                        stroke: "currentColor",
                        className: "w-4 h-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 400,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 399,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/reels/page.tsx",
                    lineNumber: 393,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 392,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[72px] md:bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-none",
                    style: {
                        width: `${progress}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/app/(main)/reels/page.tsx",
                    lineNumber: 408,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 407,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 h-[65%] md:h-[55%] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 415,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[82px] md:bottom-5 left-4 right-[72px] flex flex-col gap-3 z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/profile/${data.username}`,
                                className: "shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 bg-gray-800 shadow-lg hover:border-accent-primary/50 transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: avatarUrl,
                                        alt: data.username,
                                        width: 44,
                                        height: 44,
                                        className: "object-cover w-full h-full",
                                        unoptimized: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                    lineNumber: 422,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 421,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/profile/${data.username}`,
                                        className: "flex items-center gap-1.5 hover:opacity-80 transition-opacity",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-bold text-[15px] drop-shadow-lg truncate",
                                                children: [
                                                    "@",
                                                    data.username
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                lineNumber: 428,
                                                columnNumber: 29
                                            }, this),
                                            data.is_verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                level: data.verification_level || "blue",
                                                className: "w-4 h-4 drop-shadow-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                lineNumber: 431,
                                                columnNumber: 50
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 427,
                                        columnNumber: 25
                                    }, this),
                                    data.full_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/50 text-[12px] font-medium drop-shadow truncate",
                                        children: data.full_name
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 434,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 426,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 420,
                        columnNumber: 17
                    }, this),
                    data.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setCaptionExpanded(!captionExpanded),
                        className: "cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-white/90 text-[13px] leading-relaxed drop-shadow-md font-medium ${captionExpanded ? '' : 'line-clamp-2'}`,
                                children: data.caption
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 442,
                                columnNumber: 25
                            }, this),
                            data.caption.length > 80 && !captionExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/50 text-[12px] font-semibold",
                                children: "more"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 446,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 441,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 418,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[82px] md:bottom-5 right-2 flex flex-col items-center gap-5 z-10 w-[60px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleLike,
                                className: "active:scale-75 transition-transform",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${isLiked ? 'bg-red-500/20 border border-red-500/30' : 'bg-black/30 border border-white/15'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: isLiked ? "currentColor" : "none",
                                        stroke: isLiked ? "none" : "white",
                                        strokeWidth: "2",
                                        className: `w-6 h-6 transition-colors ${isLiked ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'text-white'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/reels/page.tsx",
                                            lineNumber: 459,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 456,
                                columnNumber: 21
                            }, this),
                            likeCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowLikesModal(true),
                                className: "text-white text-[12px] font-bold drop-shadow-lg hover:underline transition-all",
                                children: formatNumber(likeCount)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 464,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white text-[12px] font-bold drop-shadow-lg",
                                children: formatNumber(likeCount)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 468,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 455,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: openComments,
                        className: "flex flex-col items-center gap-1 active:scale-75 transition-transform",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 bg-black/30 border border-white/15 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    strokeWidth: "2",
                                    stroke: "white",
                                    className: "w-6 h-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 476,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                    lineNumber: 475,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 474,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white text-[12px] font-bold drop-shadow-lg",
                                children: formatNumber(commentCount)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 479,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 473,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShare,
                        className: "flex flex-col items-center gap-1 active:scale-75 transition-transform",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 bg-black/30 border border-white/15 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                strokeWidth: "2",
                                stroke: "white",
                                className: "w-6 h-6 -rotate-45 -mt-0.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                    lineNumber: 486,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 485,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 484,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 483,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleSave,
                        className: "flex flex-col items-center gap-1 active:scale-75 transition-transform",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${isSaved ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-black/30 border border-white/15'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: isSaved ? "currentColor" : "none",
                                viewBox: "0 0 24 24",
                                strokeWidth: 2,
                                stroke: isSaved ? "none" : "white",
                                className: `w-6 h-6 transition-colors ${isSaved ? 'text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'text-white'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                    lineNumber: 495,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 494,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/reels/page.tsx",
                            lineNumber: 493,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 492,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 453,
                columnNumber: 13
            }, this),
            showComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-50 flex items-end",
                onClick: ()=>setShowComments(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/50 backdrop-blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 505,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-h-[65vh] bg-[#111] border-t border-white/[0.08] rounded-t-3xl flex flex-col overflow-hidden animate-slide-up z-10",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center pt-3 pb-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-1 bg-white/20 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                    lineNumber: 514,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 513,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-5 py-3 border-b border-white/[0.06]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-bold text-base",
                                        children: [
                                            "Comments (",
                                            commentCount,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 519,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowComments(false),
                                        className: "p-1.5 text-text-tertiary hover:text-white transition-colors rounded-full hover:bg-white/[0.06]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            strokeWidth: 2.5,
                                            stroke: "currentColor",
                                            className: "w-5 h-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                d: "M6 18 18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                lineNumber: 522,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/reels/page.tsx",
                                            lineNumber: 521,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 520,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 518,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar",
                                children: commentsLoading ? [
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-full skeleton shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-3 w-20 skeleton"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-3 w-full skeleton"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                lineNumber: 533,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 37
                                    }, this)) : comments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-text-tertiary text-sm",
                                        children: "No comments yet. Be the first!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 541,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                    lineNumber: 540,
                                    columnNumber: 33
                                }, this) : comments.map((c)=>{
                                    const canDelete = user?.username === c.username || user?.username === data.username;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 group hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/profile/${c.username}`,
                                                className: "shrink-0 mt-0.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/[0.06]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: c.avatar_url || "/default_avatar.svg",
                                                        alt: c.username,
                                                        width: 32,
                                                        height: 32,
                                                        className: "w-full h-full object-cover",
                                                        unoptimized: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 53
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/reels/page.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                lineNumber: 548,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0 flex items-start justify-between gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[13px]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: `/profile/${c.username}`,
                                                                        className: "font-bold text-white mr-1.5 hover:underline inline-flex items-center gap-1",
                                                                        children: [
                                                                            c.username,
                                                                            c.is_verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                level: c.verification_level,
                                                                                className: "w-3 h-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                                                lineNumber: 558,
                                                                                columnNumber: 79
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                                                        lineNumber: 556,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-text-secondary",
                                                                        children: c.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                                                        lineNumber: 560,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                                lineNumber: 555,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] text-text-tertiary mt-0.5 block",
                                                                children: formatTimeAgo(c.created_at)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                                lineNumber: 562,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 49
                                                    }, this),
                                                    canDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDeleteComment(c.id),
                                                        className: "p-1.5 text-text-tertiary hover:text-red-400 hover:bg-white/[0.06] rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100",
                                                        title: "Delete comment",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            strokeWidth: 1.5,
                                                            stroke: "currentColor",
                                                            className: "w-4 h-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 61
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/reels/page.tsx",
                                                            lineNumber: 570,
                                                            columnNumber: 57
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/reels/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, c.id, true, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 547,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 528,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 border-t border-white/[0.06] flex items-center gap-3 bg-[#111]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: user?.avatarUrl || "/default_avatar.svg",
                                            alt: "You",
                                            width: 32,
                                            height: 32,
                                            className: "w-full h-full object-cover",
                                            unoptimized: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/reels/page.tsx",
                                            lineNumber: 585,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: commentText,
                                        onChange: (e)=>setCommentText(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                submitComment();
                                            }
                                        },
                                        placeholder: "Add a comment...",
                                        className: "bg-white/[0.04] border border-white/[0.06] flex-1 text-[13px] outline-none text-white placeholder:text-text-tertiary rounded-full px-4 py-2.5 focus:border-accent-primary/30 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 587,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: submitComment,
                                        disabled: !commentText.trim() || isSubmittingComment,
                                        className: "text-accent-primary font-bold text-[13px] disabled:opacity-30 hover:text-white transition-colors",
                                        children: isSubmittingComment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 border-2 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/reels/page.tsx",
                                            lineNumber: 601,
                                            columnNumber: 37
                                        }, this) : "Post"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/reels/page.tsx",
                                        lineNumber: 595,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/reels/page.tsx",
                                lineNumber: 583,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/reels/page.tsx",
                        lineNumber: 508,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 503,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LikesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                postId: data.id,
                isOpen: showLikesModal,
                onClose: ()=>setShowLikesModal(false)
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 609,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ShareModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                postId: data.id,
                isOpen: showShareModal,
                onClose: ()=>setShowShareModal(false)
            }, void 0, false, {
                fileName: "[project]/app/(main)/reels/page.tsx",
                lineNumber: 614,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/reels/page.tsx",
        lineNumber: 353,
        columnNumber: 9
    }, this);
}
_s1(ReelItem, "TCRaFbWci6b31EzbwPvPrEUcGa8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotification"]
    ];
});
_c1 = ReelItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReelsPage");
__turbopack_context__.k.register(_c1, "ReelItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f3be47a1._.js.map