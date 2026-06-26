module.exports = [
"[project]/components/Badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Icons.tsx [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative flex items-center justify-center ${className}`,
        title: showTooltip ? title : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BadgeIcon"], {
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
}),
"[project]/components/LikesModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LikesModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-ssr] (ecmascript) <export default as XMarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function LikesModal({ postId, isOpen, onClose }) {
    const { user: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Follow toggle states
    const [followLoadingId, setFollowLoadingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        let isMounted = true;
        const fetchLikes = async ()=>{
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
        };
        fetchLikes();
        return ()=>{
            isMounted = false;
        };
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#111] border border-white/[0.08] rounded-2xl w-full max-w-sm mx-4 max-h-[70vh] flex flex-col overflow-hidden shadow-2xl",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-5 py-4 border-b border-white/[0.06]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-white uppercase tracking-wider",
                            children: "Likes"
                        }, void 0, false, {
                            fileName: "[project]/components/LikesModal.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-tertiary hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto no-scrollbar",
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-4",
                        children: [
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-11 h-11 rounded-full skeleton shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LikesModal.tsx",
                                        lineNumber: 105,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 w-28 skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LikesModal.tsx",
                                                lineNumber: 107,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-10 text-center text-red-400 text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/LikesModal.tsx",
                        lineNumber: 115,
                        columnNumber: 25
                    }, this) : users.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-12 text-center text-text-tertiary text-sm font-medium",
                        children: "No likes yet."
                    }, void 0, false, {
                        fileName: "[project]/components/LikesModal.tsx",
                        lineNumber: 117,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 space-y-0.5",
                        children: users.map((u)=>{
                            const isMe = currentUser?.id === u.id || currentUser?.username === u.username;
                            const avatarFullUrl = u.avatar_url || "/default_avatar.svg";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/profile/${u.username}`,
                                        onClick: onClose,
                                        className: "w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-white/[0.06]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/profile/${u.username}`,
                                        onClick: onClose,
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white text-[14px] truncate flex items-center gap-1",
                                                        children: u.username
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LikesModal.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 49
                                                    }, this),
                                                    u.is_verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    !isMe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFollowToggle(u.id, u.is_following),
                                        disabled: followLoadingId === u.id,
                                        className: `shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold tracking-wide uppercase transition-all active:scale-95 flex items-center justify-center min-w-[90px] ${u.is_following ? 'bg-white/[0.06] border border-white/[0.1] text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30' : 'bg-accent-primary text-white shadow-[0_0_10px_rgba(0,212,255,0.15)]'}`,
                                        children: followLoadingId === u.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/components/ShareModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-ssr] (ecmascript) <export default as XMarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/MagnifyingGlassIcon.js [app-ssr] (ecmascript) <export default as MagnifyingGlassIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/PaperAirplaneIcon.js [app-ssr] (ecmascript) <export default as PaperAirplaneIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/CheckIcon.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$LinkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/LinkIcon.js [app-ssr] (ecmascript) <export default as LinkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/NotificationContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function ShareModal({ postId, isOpen, onClose }) {
    const { user: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotification"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sentUserIds, setSentUserIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [sendingId, setSendingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const postUrl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "";
    // Fetch initial list (followed users first, fallback to suggested)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) {
            setSearchQuery("");
            setSearchResults(null);
            setSentUserIds({});
            return;
        }
        let isMounted = true;
        const fetchInitialUsers = async ()=>{
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
        };
        fetchInitialUsers();
        return ()=>{
            isMounted = false;
        };
    }, [
        isOpen,
        currentUser
    ]);
    // Handle Search
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!searchQuery.trim()) {
            setSearchResults(null);
            setSearching(false);
            return;
        }
        const timer = setTimeout(async ()=>{
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
        }, 300);
        return ()=>clearTimeout(timer);
    }, [
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
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$LinkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkIcon$3e$__["LinkIcon"], {
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 165,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 164,
                columnNumber: 17
            }, this),
            onClick: handleCopyLink
        },
        {
            name: "WhatsApp",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors flex items-center justify-center text-[#25D366] border border-[#25D366]/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6 fill-current",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.793 1.394.88.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.601.723 4.913 2.034 1.312 1.311 2.033 3.057 2.033 4.913-.001 3.825-3.111 6.933-6.946 6.933z"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 175,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 174,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 173,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "X",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5 fill-current",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 186,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 185,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 184,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "Facebook",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/30 transition-colors flex items-center justify-center text-[#1877F2] border border-[#1877F2]/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6 fill-current",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 197,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 196,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 195,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, "_blank")
        },
        {
            name: "Email",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6 fill-none stroke-current stroke-2",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 208,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 207,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShareModal.tsx",
                lineNumber: 206,
                columnNumber: 17
            }, this),
            onClick: ()=>window.open(`mailto:?subject=${encodeURIComponent("Check out this post on Atheleos")}&body=${encodeURIComponent(postUrl)}`, "_blank")
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#121212] border border-white/[0.1] rounded-3xl w-full max-w-md mx-4 max-h-[85vh] flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.9)]",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-white/[0.08]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__["PaperAirplaneIcon"], {
                                    className: "w-5 h-5 text-accent-primary -rotate-45"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 223,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-black text-white tracking-wide",
                                    children: "Share"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 224,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 222,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-tertiary hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 227,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 226,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 221,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__["MagnifyingGlassIcon"], {
                                className: "w-5 h-5 absolute left-3.5 text-text-tertiary"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 234,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: "Search athletes...",
                                className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-text-tertiary outline-none focus:border-accent-primary/50 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 235,
                                columnNumber: 25
                            }, this),
                            searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSearchQuery(""),
                                className: "absolute right-3 text-text-tertiary hover:text-white text-xs bg-white/10 w-5 h-5 rounded-full flex items-center justify-center",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 243,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 233,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 232,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-2 py-2 min-h-[220px] max-h-[380px] no-scrollbar",
                    children: loading || searching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-3",
                        children: [
                            1,
                            2,
                            3,
                            4
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-11 h-11 rounded-full skeleton shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 256,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3.5 w-32 skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 258,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2.5 w-20 skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 259,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 257,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-8 rounded-xl skeleton shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 261,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 255,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 253,
                        columnNumber: 25
                    }, this) : displayedUsers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-16 text-center flex flex-col items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-text-tertiary mb-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__["MagnifyingGlassIcon"], {
                                    className: "w-6 h-6 opacity-60"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 268,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 267,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-bold text-sm",
                                children: "No users found"
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 270,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-text-tertiary text-xs max-w-[200px]",
                                children: searchQuery ? `We couldn't find anyone matching "${searchQuery}"` : "Follow other athletes to share highlights with them."
                            }, void 0, false, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 271,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 266,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: displayedUsers.map((u)=>{
                            const avatarFullUrl = u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}&background=random`;
                            const isSent = sentUserIds[u.id];
                            const isSending = sendingId === u.id;
                            const isMe = currentUser?.username === u.username;
                            if (isMe) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/[0.04] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/profile/${u.username}`,
                                        onClick: onClose,
                                        className: "w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-white/[0.08] bg-bg-surface",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: avatarFullUrl,
                                            alt: u.username,
                                            width: 44,
                                            height: 44,
                                            className: "w-full h-full object-cover",
                                            unoptimized: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 288,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 287,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white text-[14px] truncate",
                                                        children: u.full_name || u.username
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ShareModal.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 49
                                                    }, this),
                                                    u.is_verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        level: u.verification_level,
                                                        className: "w-3.5 h-3.5 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ShareModal.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 67
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 291,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[12px] text-text-tertiary truncate block",
                                                children: [
                                                    "@",
                                                    u.username
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ShareModal.tsx",
                                                lineNumber: 297,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 290,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSendDirect(u),
                                        disabled: isSent || isSending,
                                        className: `shrink-0 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all active:scale-95 flex items-center justify-center gap-1.5 min-w-[76px] ${isSent ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-accent-primary text-black hover:bg-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'}`,
                                        children: isSending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 309,
                                            columnNumber: 49
                                        }, this) : isSent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                                                    className: "w-4 h-4 stroke-[3]"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ShareModal.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Sent"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ShareModal.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Send"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 316,
                                            columnNumber: 49
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShareModal.tsx",
                                        lineNumber: 299,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, u.id, true, {
                                fileName: "[project]/components/ShareModal.tsx",
                                lineNumber: 286,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/ShareModal.tsx",
                        lineNumber: 276,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 251,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-black/40 border-t border-white/[0.08]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-3 px-1",
                            children: "Share via"
                        }, void 0, false, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 328,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 overflow-x-auto pb-1 px-1 no-scrollbar",
                            children: socialApps.map((app, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: app.onClick,
                                    className: "flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform",
                                    children: [
                                        app.icon,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] text-text-secondary group-hover:text-white transition-colors select-none whitespace-nowrap",
                                            children: app.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/ShareModal.tsx",
                                            lineNumber: 337,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/components/ShareModal.tsx",
                                    lineNumber: 331,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ShareModal.tsx",
                            lineNumber: 329,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ShareModal.tsx",
                    lineNumber: 327,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ShareModal.tsx",
            lineNumber: 218,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ShareModal.tsx",
        lineNumber: 217,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/(main)/post/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/NotificationContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LikesModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LikesModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ShareModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ShareModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/HeartIcon.js [app-ssr] (ecmascript) <export default as HeartIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChatBubbleOvalLeftIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBubbleOvalLeftIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/ChatBubbleOvalLeftIcon.js [app-ssr] (ecmascript) <export default as ChatBubbleOvalLeftIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/PaperAirplaneIcon.js [app-ssr] (ecmascript) <export default as PaperAirplaneIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BookmarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/BookmarkIcon.js [app-ssr] (ecmascript) <export default as BookmarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$EllipsisHorizontalIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EllipsisHorizontalIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/EllipsisHorizontalIcon.js [app-ssr] (ecmascript) <export default as EllipsisHorizontalIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/TrashIcon.js [app-ssr] (ecmascript) <export default as TrashIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowLeftIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/ArrowLeftIcon.js [app-ssr] (ecmascript) <export default as ArrowLeftIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FlagIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlagIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/FlagIcon.js [app-ssr] (ecmascript) <export default as FlagIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$LinkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/LinkIcon.js [app-ssr] (ecmascript) <export default as LinkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$HeartIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/HeartIcon.js [app-ssr] (ecmascript) <export default as HeartIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$BookmarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/solid/esm/BookmarkIcon.js [app-ssr] (ecmascript) <export default as BookmarkIcon>");
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
;
;
;
;
function PostDetailPage({ params }) {
    const { id: postId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$NotificationContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotification"])();
    const [post, setPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Interactions
    const [isLiked, setIsLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [likeCount, setLikeCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isSaved, setIsSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [commentCount, setCommentCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Comments
    const [commentsList, setCommentsList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [commentsLoading, setCommentsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [commentText, setCommentText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmittingComment, setIsSubmittingComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const commentInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Menu
    const [showMenu, setShowMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Likes Modal
    const [showLikesModal, setShowLikesModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showShareModal, setShowShareModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Double-tap
    const [showDoubleTapHeart, setShowDoubleTapHeart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fetch post
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${postId}`);
                if (!res.ok) throw new Error("Post not found");
                const data = await res.json();
                const p = data.post;
                setPost(p);
                setIsLiked(p.isLiked);
                setLikeCount(p.likes);
                setIsSaved(p.isSaved);
                setCommentCount(p.comments);
            } catch  {
                setError("Post not found or has been deleted.");
            } finally{
                setLoading(false);
            }
        }
        fetchPost();
    }, [
        postId
    ]);
    // Fetch comments
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchComments() {
            try {
                const res = await fetch(`/api/posts/${postId}/comments`);
                if (res.ok) {
                    const data = await res.json();
                    setCommentsList(data.comments || []);
                }
            } catch  {
                console.error("Failed to fetch comments");
            } finally{
                setCommentsLoading(false);
            }
        }
        fetchComments();
    }, [
        postId
    ]);
    // Toggle like
    const toggleLike = async ()=>{
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
        try {
            const res = await fetch(`/api/posts/${postId}/like`, {
                method: "POST"
            });
            if (!res.ok) throw new Error("Failed");
            if (newLiked) showToast("like", "Post liked!", "");
        } catch  {
            setIsLiked(!newLiked);
            setLikeCount(likeCount);
            showToast("error", "Failed to like post");
        }
    };
    // Toggle save
    const toggleSave = async ()=>{
        const newSaved = !isSaved;
        setIsSaved(newSaved);
        try {
            const res = await fetch(`/api/posts/${postId}/save`, {
                method: "POST"
            });
            if (!res.ok) throw new Error("Failed");
            showToast("save", newSaved ? "Post saved!" : "Post unsaved");
        } catch  {
            setIsSaved(!newSaved);
            showToast("error", "Failed to save post");
        }
    };
    // Submit comment
    const submitComment = async ()=>{
        if (!commentText.trim() || isSubmittingComment) return;
        setIsSubmittingComment(true);
        try {
            const res = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: commentText
                })
            });
            if (res.ok) {
                // Add comment to local list
                const newComment = {
                    id: Date.now(),
                    content: commentText,
                    created_at: new Date().toISOString(),
                    username: user?.username || "you",
                    full_name: user?.fullName || "",
                    avatar_url: user?.avatarUrl || "/default_avatar.svg",
                    is_verified: user?.isVerified || false,
                    verification_level: user?.verificationLevel || "unverified"
                };
                setCommentsList((prev)=>[
                        ...prev,
                        newComment
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
            const res = await fetch(`/api/posts/${postId}/comments?commentId=${commentId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setCommentsList((prev)=>prev.filter((c)=>c.id !== commentId));
                setCommentCount((c)=>c - 1);
                showToast("success", "Comment deleted");
            } else {
                showToast("error", "Failed to delete comment");
            }
        } catch  {
            showToast("error", "Failed to delete comment");
        }
    };
    // Share
    const handleShare = ()=>{
        setShowShareModal(true);
    };
    const handleCopyLink = async ()=>{
        const url = `${window.location.origin}/post/${postId}`;
        try {
            await navigator.clipboard.writeText(url);
            showToast("success", "Link copied!", "Post URL copied to clipboard");
        } catch  {
            showToast("error", "Failed to copy link");
        }
    };
    // Delete post
    const handleDelete = async ()=>{
        if (!confirm("Delete this post? This cannot be undone.")) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/posts?id=${postId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                showToast("success", "Post deleted");
                router.push("/");
            } else {
                showToast("error", "Failed to delete post");
            }
        } catch  {
            showToast("error", "Failed to delete post");
        } finally{
            setIsDeleting(false);
            setShowMenu(false);
        }
    };
    // Double-tap to like
    const handleDoubleTap = ()=>{
        if (!isLiked) toggleLike();
        setShowDoubleTapHeart(true);
        setTimeout(()=>setShowDoubleTapHeart(false), 800);
    };
    const isOwnPost = user?.username === post?.username;
    // Loading state
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-bg-body flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06] px-4 h-14 flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.back(),
                            className: "p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowLeftIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftIcon$3e$__["ArrowLeftIcon"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 268,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 267,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 w-16 skeleton"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 270,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                    lineNumber: 266,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto w-full p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-11 h-11 rounded-full skeleton"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3.5 w-28 skeleton"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3 w-16 skeleton"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 277,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 273,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full aspect-[4/5] skeleton rounded-2xl mb-4"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 280,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-3 w-36 skeleton"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-3 w-full skeleton"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 281,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                    lineNumber: 272,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/post/[id]/page.tsx",
            lineNumber: 265,
            columnNumber: 13
        }, this);
    }
    // Error state
    if (error || !post) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-bg-body flex flex-col items-center justify-center gap-4 animate-fade-in p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        className: "w-10 h-10 text-text-tertiary",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 21h18M3 3h18"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 296,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                        lineNumber: 295,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                    lineNumber: 294,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-white",
                    children: "Post Not Found"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                    lineNumber: 299,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-tertiary text-sm text-center max-w-xs",
                    children: error || "This post may have been deleted or doesn't exist."
                }, void 0, false, {
                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                    lineNumber: 300,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/"),
                    className: "mt-4 px-6 py-2.5 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-xl text-sm",
                    children: "Go Home"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                    lineNumber: 301,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/post/[id]/page.tsx",
            lineNumber: 293,
            columnNumber: 13
        }, this);
    }
    const avatarUrl = post.avatarUrl || "/default_avatar.svg";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-bg-body pb-24 md:pb-8 animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto px-4 flex items-center justify-between h-14",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.back(),
                                    className: "p-2 -ml-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] active:scale-95 transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowLeftIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftIcon$3e$__["ArrowLeftIcon"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 317,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-lg font-bold text-white",
                                    children: "Post"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 316,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowMenu(!showMenu),
                                    className: "p-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$EllipsisHorizontalIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EllipsisHorizontalIcon$3e$__["EllipsisHorizontalIcon"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 324,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 25
                                }, this),
                                showMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fixed inset-0 z-40",
                                            onClick: ()=>setShowMenu(false)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 330,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 top-full mt-2 w-52 bg-[#111] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-50 animate-fade-in py-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleCopyLink,
                                                    className: "w-full px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/[0.06] transition-colors flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$LinkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkIcon$3e$__["LinkIcon"], {
                                                            className: "w-4.5 h-4.5 text-text-secondary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 41
                                                        }, this),
                                                        "Copy Link"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 37
                                                }, this),
                                                isOwnPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleDelete,
                                                    disabled: isDeleting,
                                                    className: "w-full px-4 py-3 text-left text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3",
                                                    children: [
                                                        isDeleting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 49
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                                                            className: "w-4.5 h-4.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 49
                                                        }, this),
                                                        "Delete Post"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 41
                                                }, this),
                                                !isOwnPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setShowMenu(false);
                                                        showToast("info", "Report submitted");
                                                    },
                                                    className: "w-full px-4 py-3 text-left text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FlagIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlagIcon$3e$__["FlagIcon"], {
                                                            className: "w-4.5 h-4.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 348,
                                                            columnNumber: 45
                                                        }, this),
                                                        "Report Post"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 331,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 322,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                    lineNumber: 315,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                lineNumber: 314,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/profile/${post.username}`,
                            className: "flex items-center gap-3 group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-accent-primary/50 transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: avatarUrl,
                                        alt: post.username,
                                        fill: true,
                                        className: "object-cover",
                                        unoptimized: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-[15px] text-white group-hover:text-accent-primary transition-colors",
                                                    children: post.username
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 33
                                                }, this),
                                                post.isVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    level: post.verificationLevel,
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 368,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                post.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[12px] text-accent-primary font-medium",
                                                    children: post.location
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-text-tertiary",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(post.createdAt), {
                                                        addSuffix: true
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 374,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 363,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                        lineNumber: 362,
                        columnNumber: 17
                    }, this),
                    post.mediaUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full bg-bg-surface overflow-hidden",
                        onDoubleClick: handleDoubleTap,
                        children: [
                            post.mediaType === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: post.mediaUrl,
                                controls: true,
                                className: "w-full max-h-[70vh] object-contain bg-black"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 390,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full aspect-[4/5]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: post.mediaUrl,
                                    alt: "Post content",
                                    fill: true,
                                    className: "object-cover",
                                    unoptimized: true
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 393,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 392,
                                columnNumber: 29
                            }, this),
                            showDoubleTapHeart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center pointer-events-none z-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$HeartIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__["HeartIcon"], {
                                    className: "w-24 h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-scale-in"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 399,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                        lineNumber: 388,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleLike,
                                                className: "transition-transform active:scale-75 hover:scale-110 p-0.5 group",
                                                children: isLiked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$HeartIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__["HeartIcon"], {
                                                    className: "w-7 h-7 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 37
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__["HeartIcon"], {
                                                    className: "w-7 h-7 text-white group-hover:text-red-400 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                lineNumber: 410,
                                                columnNumber: 29
                                            }, this),
                                            likeCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowLikesModal(true),
                                                className: "font-bold text-[13px] text-white hover:underline transition-all active:scale-95 select-none",
                                                children: [
                                                    likeCount.toLocaleString(),
                                                    " ",
                                                    likeCount === 1 ? 'like' : 'likes'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                lineNumber: 418,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>commentInputRef.current?.focus(),
                                        className: "transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center gap-1.5 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChatBubbleOvalLeftIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBubbleOvalLeftIcon$3e$__["ChatBubbleOvalLeftIcon"], {
                                                className: "w-7 h-7 text-white group-hover:text-accent-primary transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-[13px] select-none text-white",
                                                children: commentCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                lineNumber: 426,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleShare,
                                        className: "transition-transform active:scale-75 hover:scale-110 p-0.5 inline-flex items-center group",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__["PaperAirplaneIcon"], {
                                            className: "w-7 h-7 -rotate-45 mb-1 text-white group-hover:text-green-400 transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 429,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 408,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleSave,
                                className: "transition-transform active:scale-75 hover:scale-110 p-0.5 group",
                                children: isSaved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$solid$2f$esm$2f$BookmarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkIcon$3e$__["BookmarkIcon"], {
                                    className: "w-7 h-7 text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 436,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BookmarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkIcon$3e$__["BookmarkIcon"], {
                                    className: "w-7 h-7 text-white group-hover:text-[#FACC15] transition-colors"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 438,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 434,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                        lineNumber: 407,
                        columnNumber: 17
                    }, this),
                    post.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[14px] leading-relaxed",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/profile/${post.username}`,
                                    className: "font-bold mr-2 hover:underline text-white",
                                    children: post.username
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 447,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-text-secondary whitespace-pre-wrap",
                                    children: post.caption
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 450,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 446,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                        lineNumber: 445,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-white/[0.06]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[12px] font-bold text-text-tertiary uppercase tracking-wider",
                                    children: [
                                        "Comments ",
                                        commentCount > 0 && `(${commentCount})`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 458,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 457,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: commentsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 space-y-4 pb-4",
                                    children: [
                                        1,
                                        2,
                                        3
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-9 h-9 rounded-full skeleton shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-3 w-24 skeleton"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 471,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-3 w-full skeleton"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 468,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 466,
                                    columnNumber: 29
                                }, this) : commentsList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-8 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-text-tertiary text-sm",
                                        children: "No comments yet. Be the first to comment!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 479,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 478,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 pb-4 space-y-1",
                                    children: commentsList.map((comment)=>{
                                        const cAvatar = comment.avatar_url || "/default_avatar.svg";
                                        const canDelete = user?.username === comment.username || isOwnPost;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3 py-2.5 group hover:bg-white/[0.02] rounded-xl px-2 -mx-2 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/profile/${comment.username}`,
                                                    className: "shrink-0 mt-0.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/[0.06]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: cAvatar,
                                                            alt: comment.username,
                                                            width: 36,
                                                            height: 36,
                                                            className: "w-full h-full object-cover",
                                                            unoptimized: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 490,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 488,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0 flex items-start justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[14px] leading-relaxed",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                            href: `/profile/${comment.username}`,
                                                                            className: "font-bold text-white hover:underline mr-1.5 inline-flex items-center gap-1",
                                                                            children: [
                                                                                comment.username,
                                                                                comment.is_verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                    level: comment.verification_level,
                                                                                    className: "w-3.5 h-3.5"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                                                    lineNumber: 498,
                                                                                    columnNumber: 85
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                                            lineNumber: 496,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-text-secondary",
                                                                            children: comment.content
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                                            lineNumber: 500,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[11px] text-text-tertiary mt-0.5 block",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(comment.created_at), {
                                                                        addSuffix: true
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                                    lineNumber: 502,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 49
                                                        }, this),
                                                        canDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteComment(comment.id),
                                                            className: "p-1.5 text-text-tertiary hover:text-red-400 hover:bg-white/[0.06] rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100",
                                                            title: "Delete comment",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                                lineNumber: 512,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                            lineNumber: 507,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, comment.id, true, {
                                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                            lineNumber: 487,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 482,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                lineNumber: 464,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                        lineNumber: 456,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed bottom-0 left-0 right-0 md:static md:border-t border-white/[0.06] bg-black/95 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none z-20 safe-area-bottom",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto px-4 py-3 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: user?.avatarUrl || "/default_avatar.svg",
                                        alt: "You",
                                        width: 36,
                                        height: 36,
                                        className: "object-cover w-full h-full",
                                        unoptimized: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 527,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: commentInputRef,
                                    type: "text",
                                    value: commentText,
                                    onChange: (e)=>setCommentText(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            submitComment();
                                        }
                                    },
                                    placeholder: "Add a comment...",
                                    className: "bg-white/[0.04] border border-white/[0.06] flex-1 text-[13px] outline-none text-white placeholder:text-text-tertiary rounded-full px-4 py-2.5 focus:border-accent-primary/30 transition-colors"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 530,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: submitComment,
                                    disabled: !commentText.trim() || isSubmittingComment,
                                    className: "text-accent-primary font-bold text-[13px] uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors px-2 py-1",
                                    children: isSubmittingComment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-4 h-4 border-2 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 33
                                    }, this) : "Post"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/post/[id]/page.tsx",
                                    lineNumber: 544,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/post/[id]/page.tsx",
                            lineNumber: 526,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/post/[id]/page.tsx",
                        lineNumber: 525,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                lineNumber: 359,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LikesModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                postId: post.id,
                isOpen: showLikesModal,
                onClose: ()=>setShowLikesModal(false)
            }, void 0, false, {
                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                lineNumber: 559,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ShareModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                postId: post.id,
                isOpen: showShareModal,
                onClose: ()=>setShowShareModal(false)
            }, void 0, false, {
                fileName: "[project]/app/(main)/post/[id]/page.tsx",
                lineNumber: 564,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/post/[id]/page.tsx",
        lineNumber: 311,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_90c0c154._.js.map