(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/SharedPostCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SharedPostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/PaperAirplaneIcon.js [app-client] (ecmascript) <export default as PaperAirplaneIcon>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SharedPostCard({ postId }) {
    _s();
    const [post, setPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SharedPostCard.useEffect": ()=>{
            let isMounted = true;
            fetch(`/api/posts/${postId}`).then({
                "SharedPostCard.useEffect": (res)=>res.ok ? res.json() : null
            }["SharedPostCard.useEffect"]).then({
                "SharedPostCard.useEffect": (data)=>{
                    if (isMounted && data?.post) setPost(data.post);
                }
            }["SharedPostCard.useEffect"]).catch({
                "SharedPostCard.useEffect": ()=>{}
            }["SharedPostCard.useEffect"]).finally({
                "SharedPostCard.useEffect": ()=>{
                    if (isMounted) setLoading(false);
                }
            }["SharedPostCard.useEffect"]);
            return ({
                "SharedPostCard.useEffect": ()=>{
                    isMounted = false;
                }
            })["SharedPostCard.useEffect"];
        }
    }["SharedPostCard.useEffect"], [
        postId
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 w-[220px] bg-black/30 border border-white/10 rounded-2xl p-3 animate-pulse space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-5 h-5 rounded-full bg-white/10"
                        }, void 0, false, {
                            fileName: "[project]/components/SharedPostCard.tsx",
                            lineNumber: 30,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-3 w-20 bg-white/10 rounded"
                        }, void 0, false, {
                            fileName: "[project]/components/SharedPostCard.tsx",
                            lineNumber: 31,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SharedPostCard.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full aspect-square bg-white/5 rounded-xl"
                }, void 0, false, {
                    fileName: "[project]/components/SharedPostCard.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SharedPostCard.tsx",
            lineNumber: 28,
            columnNumber: 13
        }, this);
    }
    if (!post) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/post/${postId}`,
            className: "inline-flex items-center gap-1.5 mt-1.5 px-3 py-2 bg-black/40 hover:bg-black/60 transition-colors rounded-xl border border-white/10 text-xs text-accent-primary font-medium",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PaperAirplaneIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperAirplaneIcon$3e$__["PaperAirplaneIcon"], {
                    className: "w-3.5 h-3.5 -rotate-45"
                }, void 0, false, {
                    fileName: "[project]/components/SharedPostCard.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "View Shared Post #",
                        postId
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SharedPostCard.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SharedPostCard.tsx",
            lineNumber: 40,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/post/${postId}`,
        className: "block mt-2 bg-black/50 hover:bg-black/70 border border-white/[0.12] hover:border-accent-primary/50 rounded-2xl overflow-hidden transition-all duration-200 group/card w-[240px] shadow-lg text-left",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2.5 flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-5 h-5 rounded-full overflow-hidden relative shrink-0 ring-1 ring-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: post.avatarUrl || '/default_avatar.svg',
                            alt: "",
                            width: 20,
                            height: 20,
                            className: "w-full h-full object-cover",
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/components/SharedPostCard.tsx",
                            lineNumber: 55,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SharedPostCard.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold text-white truncate group-hover/card:text-accent-primary transition-colors",
                        children: [
                            "@",
                            post.username
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SharedPostCard.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SharedPostCard.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            post.mediaUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full aspect-square bg-bg-surface overflow-hidden",
                children: post.mediaType === 'video' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    src: post.mediaUrl,
                    className: "w-full h-full object-cover pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/components/SharedPostCard.tsx",
                    lineNumber: 66,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: post.mediaUrl,
                    alt: "Post preview",
                    fill: true,
                    className: "object-cover group-hover/card:scale-105 transition-transform duration-300",
                    unoptimized: true
                }, void 0, false, {
                    fileName: "[project]/components/SharedPostCard.tsx",
                    lineNumber: 68,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SharedPostCard.tsx",
                lineNumber: 64,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-white/[0.02] min-h-[80px] flex items-center justify-center text-xs text-text-tertiary italic",
                children: "Text Post"
            }, void 0, false, {
                fileName: "[project]/components/SharedPostCard.tsx",
                lineNumber: 72,
                columnNumber: 17
            }, this),
            post.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2.5 bg-white/[0.02]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-text-secondary line-clamp-2 leading-snug break-words",
                    children: post.caption
                }, void 0, false, {
                    fileName: "[project]/components/SharedPostCard.tsx",
                    lineNumber: 80,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SharedPostCard.tsx",
                lineNumber: 79,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SharedPostCard.tsx",
        lineNumber: 48,
        columnNumber: 9
    }, this);
}
_s(SharedPostCard, "7Uom0wWsbIXsBXcXmZppN88d0CA=");
_c = SharedPostCard;
var _c;
__turbopack_context__.k.register(_c, "SharedPostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(main)/messages/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessagesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SocketContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isToday.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isYesterday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isYesterday.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SharedPostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SharedPostCard.tsx [app-client] (ecmascript)");
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
;
// ─── Helpers ─────────────────────────────────────
function formatDateSeparator(dateStr) {
    const date = new Date(dateStr);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToday"])(date)) return "Today";
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isYesterday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isYesterday"])(date)) return "Yesterday";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "MMMM d, yyyy");
}
function formatMessageTime(dateStr) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(dateStr), "h:mm a");
}
function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i)=>{
        if (urlRegex.test(part)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: part,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "underline underline-offset-2 hover:text-white/80 transition-colors break-all",
                children: part
            }, i, false, {
                fileName: "[project]/app/(main)/messages/page.tsx",
                lineNumber: 58,
                columnNumber: 17
            }, this);
        }
        return part;
    });
}
function isSameDay(d1, d2) {
    const a = new Date(d1), b = new Date(d2);
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
// ─── Status Icons ────────────────────────────────
function StatusIcon({ status }) {
    if (!status || status === "sending") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 16 16",
            className: "w-3.5 h-3.5 text-text-tertiary inline-block",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none",
                strokeDasharray: "8 24",
                className: "animate-spin origin-center"
            }, void 0, false, {
                fileName: "[project]/app/(main)/messages/page.tsx",
                lineNumber: 79,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/messages/page.tsx",
            lineNumber: 78,
            columnNumber: 13
        }, this);
    }
    if (status === "sent") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 16",
            className: "w-4 h-3.5 text-text-tertiary inline-block",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M2 8.5L5 11.5L10 5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M7 8.5L10 11.5L15 5",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 87,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/messages/page.tsx",
            lineNumber: 85,
            columnNumber: 13
        }, this);
    }
    // seen
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 16",
        className: "w-4 h-3.5 text-accent-primary inline-block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 8.5L5 11.5L10 5",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/(main)/messages/page.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 8.5L10 11.5L15 5",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/(main)/messages/page.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/messages/page.tsx",
        lineNumber: 93,
        columnNumber: 9
    }, this);
}
_c = StatusIcon;
function MessagesPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const myId = user?.id;
    const { socket, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    // Inbox state
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Chat state
    const [activeConversation, setActiveConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [messagesLoading, setMessagesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inputText, setInputText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Polling state
    const [otherUserTyping, setOtherUserTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastPollTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [typingTimeout, setTypingTimeoutState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const lastTypingEmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Refs
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showScrollButton, setShowScrollButton] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Active conversation ref for polling callbacks
    const activeConvoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            activeConvoRef.current = activeConversation;
        }
    }["MessagesPage.useEffect"], [
        activeConversation
    ]);
    // ─── Call State ────────────────────────────────
    const [localStream, setLocalStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [remoteStream, setRemoteStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [receivingCall, setReceivingCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [caller, setCaller] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [callerName, setCallerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [callerAvatar, setCallerAvatar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [callerSignal, setCallerSignal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [callAccepted, setCallAccepted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [callEnded, setCallEnded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCalling, setIsCalling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVideoCall, setIsVideoCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVideoOff, setIsVideoOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const myVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const connectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ─── E2E Decryption Helper ─────────────────────
    const decryptE2EMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MessagesPage.useCallback[decryptE2EMessage]": async (msg)=>{
            return msg;
        }
    }["MessagesPage.useCallback[decryptE2EMessage]"], []);
    // ─── Fetch Conversations ───────────────────────
    const fetchConversations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MessagesPage.useCallback[fetchConversations]": async ()=>{
            try {
                const res = await fetch('/api/messages');
                if (res.ok) {
                    const data = await res.json();
                    // Decrypt last messages for the sidebar preview
                    const decryptedConvos = await Promise.all((data.conversations || []).map({
                        "MessagesPage.useCallback[fetchConversations]": async (c)=>{
                            return c;
                        }
                    }["MessagesPage.useCallback[fetchConversations]"]));
                    setConversations(decryptedConvos);
                }
            } catch (error) {
                console.error('Failed to fetch conversations', error);
            } finally{
                setLoading(false);
            }
        }
    }["MessagesPage.useCallback[fetchConversations]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            fetchConversations();
        }
    }["MessagesPage.useEffect"], [
        fetchConversations
    ]);
    // ─── Inbox Polling (every 5 seconds) ───────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            const interval = setInterval({
                "MessagesPage.useEffect.interval": ()=>{
                    fetchConversations();
                }
            }["MessagesPage.useEffect.interval"], 5000);
            return ({
                "MessagesPage.useEffect": ()=>clearInterval(interval)
            })["MessagesPage.useEffect"];
        }
    }["MessagesPage.useEffect"], [
        fetchConversations
    ]);
    // ─── Active Chat Polling (every 3 seconds fallback) ───────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (!activeConversation || typeof activeConversation.conversationId === 'string') return;
            // If sockets are connected, we don't strictly need to fallback poll aggressively, 
            // but it's safe to do so to ensure 100% message delivery. 
            // We poll every 3 seconds if disconnected, or 10 seconds if connected.
            const pollRate = isConnected ? 10000 : 3000;
            const pollActiveChat = {
                "MessagesPage.useEffect.pollActiveChat": async ()=>{
                    try {
                        const res = await fetch(`/api/messages/${activeConversation.conversationId}`);
                        if (res.ok) {
                            const data = await res.json();
                            const decryptedMessages = await Promise.all((data.messages || []).map({
                                "MessagesPage.useEffect.pollActiveChat": (m)=>decryptE2EMessage(m)
                            }["MessagesPage.useEffect.pollActiveChat"]));
                            const msgs = decryptedMessages.map({
                                "MessagesPage.useEffect.pollActiveChat.msgs": (m)=>({
                                        ...m,
                                        status: m.is_read ? "seen" : "sent"
                                    })
                            }["MessagesPage.useEffect.pollActiveChat.msgs"]);
                            // Consume HTTP typing indicator
                            if (data.otherUser) {
                                setOtherUserTyping(!!data.otherUser.isTyping);
                            }
                            setMessages({
                                "MessagesPage.useEffect.pollActiveChat": (prev)=>{
                                    // Keep any messages that are currently "sending" since they aren't in the DB yet
                                    const sendingMessages = prev.filter({
                                        "MessagesPage.useEffect.pollActiveChat.sendingMessages": (m)=>m.status === "sending"
                                    }["MessagesPage.useEffect.pollActiveChat.sendingMessages"]);
                                    // Check if incoming msgs somehow already contains our sending message (rare race condition)
                                    // This prevents duplicates if DB catches it instantly but frontend is still resolving the POST
                                    const safeSending = sendingMessages.filter({
                                        "MessagesPage.useEffect.pollActiveChat.safeSending": (sm)=>!msgs.some({
                                                "MessagesPage.useEffect.pollActiveChat.safeSending": (m)=>m.content === sm.content && Math.abs(new Date(m.created_at).getTime() - new Date(sm.created_at).getTime()) < 5000
                                            }["MessagesPage.useEffect.pollActiveChat.safeSending"])
                                    }["MessagesPage.useEffect.pollActiveChat.safeSending"]);
                                    const combinedMsgs = [
                                        ...msgs,
                                        ...safeSending
                                    ];
                                    // Check if we actually have new data
                                    if (combinedMsgs.length === prev.length) {
                                        // Check if last message status changed (e.g. read receipts)
                                        const lastPrev = prev[prev.length - 1];
                                        const lastNew = combinedMsgs[combinedMsgs.length - 1];
                                        if (lastPrev?.status === lastNew?.status && lastPrev?.is_read === lastNew?.is_read) {
                                            return prev;
                                        }
                                    }
                                    // If it changed, see if we need to auto-scroll
                                    const hasNewMessage = combinedMsgs.length > prev.length;
                                    if (hasNewMessage) {
                                        setTimeout({
                                            "MessagesPage.useEffect.pollActiveChat": ()=>{
                                                messagesEndRef.current?.scrollIntoView({
                                                    behavior: "smooth"
                                                });
                                            }
                                        }["MessagesPage.useEffect.pollActiveChat"], 100);
                                    }
                                    return combinedMsgs;
                                }
                            }["MessagesPage.useEffect.pollActiveChat"]);
                        }
                    } catch (error) {
                        console.error("Polling error", error);
                    }
                }
            }["MessagesPage.useEffect.pollActiveChat"];
            const interval = setInterval(pollActiveChat, pollRate);
            return ({
                "MessagesPage.useEffect": ()=>clearInterval(interval)
            })["MessagesPage.useEffect"];
        }
    }["MessagesPage.useEffect"], [
        activeConversation,
        decryptE2EMessage,
        isConnected
    ]);
    // ─── Restore chat from URL ─────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            const params = new URLSearchParams(window.location.search);
            const routeChatId = params.get('chat');
            if (routeChatId && conversations.length > 0 && !activeConversation) {
                const convo = conversations.find({
                    "MessagesPage.useEffect.convo": (c)=>c.conversationId.toString() === routeChatId
                }["MessagesPage.useEffect.convo"]);
                if (convo) openConversation(convo, false);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["MessagesPage.useEffect"], [
        conversations
    ]);
    // ─── Scroll helpers ────────────────────────────
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MessagesPage.useCallback[scrollToBottom]": (smooth = true)=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: smooth ? "smooth" : "instant"
            });
        }
    }["MessagesPage.useCallback[scrollToBottom]"], []);
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MessagesPage.useCallback[handleScroll]": ()=>{
            const container = messagesContainerRef.current;
            if (!container) return;
            const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
            setShowScrollButton(distanceFromBottom > 200);
        }
    }["MessagesPage.useCallback[handleScroll]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (messages.length > 0 && !messagesLoading) {
                setTimeout({
                    "MessagesPage.useEffect": ()=>scrollToBottom(false)
                }["MessagesPage.useEffect"], 50);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["MessagesPage.useEffect"], [
        messagesLoading
    ]);
    // ─── Socket Event Listeners ────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            // Guard on socket only — removing !isConnected so cleanup always runs on socket change
            // and prevents stale listener pile-up after reconnects.
            if (!socket) return;
            const handleReceiveMessage = {
                "MessagesPage.useEffect.handleReceiveMessage": async (data)=>{
                    // data: { recipientId, conversationId, messageId, content, senderId, senderName, senderAvatar, createdAt, iv, recipient_encrypted_key, sender_encrypted_key }
                    const activeCid = activeConvoRef.current?.conversationId;
                    // Check if we are currently looking at this conversation!
                    // It matches if activeCid is the database ID, OR if we are looking at a brand new chat for this specific sender.
                    const isMatch = activeCid && activeCid == data.conversationId || activeCid === `new_${data.senderId}`;
                    if (isMatch) {
                        // If it was a new conversation, upgrade it to the real DB ID automatically so future typing works smoothly.
                        if (activeCid === `new_${data.senderId}`) {
                            setActiveConversation({
                                "MessagesPage.useEffect.handleReceiveMessage": (prev)=>prev ? {
                                        ...prev,
                                        conversationId: data.conversationId
                                    } : prev
                            }["MessagesPage.useEffect.handleReceiveMessage"]);
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
                            sender_encrypted_key: data.sender_encrypted_key
                        });
                        setMessages({
                            "MessagesPage.useEffect.handleReceiveMessage": (prev)=>{
                                // avoid duplicates
                                if (prev.some({
                                    "MessagesPage.useEffect.handleReceiveMessage": (m)=>m.id === decryptedMsg.id
                                }["MessagesPage.useEffect.handleReceiveMessage"])) return prev;
                                const updated = [
                                    ...prev,
                                    {
                                        ...decryptedMsg,
                                        status: "seen"
                                    }
                                ];
                                setTimeout({
                                    "MessagesPage.useEffect.handleReceiveMessage": ()=>scrollToBottom(true)
                                }["MessagesPage.useEffect.handleReceiveMessage"], 50);
                                return updated;
                            }
                        }["MessagesPage.useEffect.handleReceiveMessage"]);
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
                }
            }["MessagesPage.useEffect.handleReceiveMessage"];
            const handleTyping = {
                "MessagesPage.useEffect.handleTyping": (data)=>{
                    const activeCid = activeConvoRef.current?.conversationId;
                    // The sender might be typing in a brand new chat (data.conversationId = "new_" + myId)
                    const isMatch = activeCid && activeCid == data.conversationId || data.conversationId === `new_${myId}` && activeCid === `new_${data.senderId}`;
                    if (isMatch) {
                        setOtherUserTyping(true);
                        // Auto reset typing after 3s if stop isn't received
                        if (typingTimeout) clearTimeout(typingTimeout);
                        const to = setTimeout({
                            "MessagesPage.useEffect.handleTyping.to": ()=>setOtherUserTyping(false)
                        }["MessagesPage.useEffect.handleTyping.to"], 3000);
                        setTypingTimeoutState(to);
                    }
                }
            }["MessagesPage.useEffect.handleTyping"];
            const handleStopTyping = {
                "MessagesPage.useEffect.handleStopTyping": (data)=>{
                    const activeCid = activeConvoRef.current?.conversationId;
                    const isMatch = activeCid && activeCid == data.conversationId || data.conversationId === `new_${myId}` && activeCid === `new_${data.senderId}`;
                    if (isMatch) {
                        setOtherUserTyping(false);
                        if (typingTimeout) clearTimeout(typingTimeout);
                    }
                }
            }["MessagesPage.useEffect.handleStopTyping"];
            const handleReadReceipt = {
                "MessagesPage.useEffect.handleReadReceipt": (data)=>{
                    const activeCid = activeConvoRef.current?.conversationId;
                    if (activeCid && activeCid == data.conversationId) {
                        setMessages({
                            "MessagesPage.useEffect.handleReadReceipt": (prev)=>prev.map({
                                    "MessagesPage.useEffect.handleReadReceipt": (m)=>m.sender_id === myId ? {
                                            ...m,
                                            is_read: true,
                                            status: "seen"
                                        } : m
                                }["MessagesPage.useEffect.handleReadReceipt"])
                        }["MessagesPage.useEffect.handleReadReceipt"]);
                    }
                }
            }["MessagesPage.useEffect.handleReadReceipt"];
            const handleIncomingCall = {
                "MessagesPage.useEffect.handleIncomingCall": (data)=>{
                    setReceivingCall(true);
                    setCaller(data.from);
                    setCallerName(data.name);
                    setCallerAvatar(data.avatar);
                    setCallerSignal(data.signal);
                    setIsVideoCall(data.isVideo);
                }
            }["MessagesPage.useEffect.handleIncomingCall"];
            const handleCallAccepted = {
                "MessagesPage.useEffect.handleCallAccepted": async (signal)=>{
                    setCallAccepted(true);
                    if (connectionRef.current) {
                        await connectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));
                    }
                }
            }["MessagesPage.useEffect.handleCallAccepted"];
            const handleIceCandidate = {
                "MessagesPage.useEffect.handleIceCandidate": async (candidate)=>{
                    if (connectionRef.current) {
                        await connectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                }
            }["MessagesPage.useEffect.handleIceCandidate"];
            const handleCallEnded = {
                "MessagesPage.useEffect.handleCallEnded": ()=>{
                    setCallEnded(true);
                    connectionRef.current?.close();
                    connectionRef.current = null;
                    localStream?.getTracks().forEach({
                        "MessagesPage.useEffect.handleCallEnded": (track)=>track.stop()
                    }["MessagesPage.useEffect.handleCallEnded"]);
                    setLocalStream(null);
                    setRemoteStream(null);
                    setIsCalling(false);
                    setReceivingCall(false);
                    setCallAccepted(false);
                    setIsMuted(false);
                    setIsVideoOff(false);
                }
            }["MessagesPage.useEffect.handleCallEnded"];
            socket.on("receive_message", handleReceiveMessage);
            socket.on("user_typing", handleTyping);
            socket.on("user_stop_typing", handleStopTyping);
            socket.on("messages_read", handleReadReceipt);
            socket.on("incoming_call", handleIncomingCall);
            socket.on("call_accepted", handleCallAccepted);
            socket.on("ice_candidate", handleIceCandidate);
            socket.on("call_ended", handleCallEnded);
            return ({
                "MessagesPage.useEffect": ()=>{
                    socket.off("receive_message", handleReceiveMessage);
                    socket.off("user_typing", handleTyping);
                    socket.off("user_stop_typing", handleStopTyping);
                    socket.off("messages_read", handleReadReceipt);
                    socket.off("incoming_call", handleIncomingCall);
                    socket.off("call_accepted", handleCallAccepted);
                    socket.off("ice_candidate", handleIceCandidate);
                    socket.off("call_ended", handleCallEnded);
                    if (typingTimeout) clearTimeout(typingTimeout);
                }
            })["MessagesPage.useEffect"];
        }
    }["MessagesPage.useEffect"], [
        socket,
        myId,
        scrollToBottom,
        fetchConversations,
        decryptE2EMessage,
        typingTimeout,
        localStream
    ]);
    // ─── Open Conversation ─────────────────────────
    const openConversation = async (convo, updateUrl = true)=>{
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
                const decryptedMessages = await Promise.all((data.messages || []).map((m)=>decryptE2EMessage(m)));
                const msgs = decryptedMessages.map((m)=>({
                        ...m,
                        status: m.is_read ? "seen" : "sent"
                    }));
                setMessages(msgs);
                // Set the poll timestamp to now so we only get NEW messages from here on
                lastPollTimestamp.current = new Date().toISOString();
            }
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally{
            setMessagesLoading(false);
        }
    };
    // ─── Close Conversation ────────────────────────
    const closeConversation = ()=>{
        setActiveConversation(null);
        lastPollTimestamp.current = null;
        window.history.pushState({}, '', window.location.pathname);
        fetchConversations();
    };
    // ─── Typing ────────────────────────────────────
    const emitTyping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MessagesPage.useCallback[emitTyping]": async ()=>{
            const ac = activeConvoRef.current;
            if (!ac || typeof ac.conversationId === 'string') return;
            // Throttle: don't send more than once per second to avoid spamming the DB
            const now = Date.now();
            if (now - lastTypingEmit.current < 2000) return;
            lastTypingEmit.current = now;
            // HTTP Fallback Typing Indicator
            fetch(`/api/messages/${ac.conversationId}/typing`, {
                method: 'POST'
            }).catch({
                "MessagesPage.useCallback[emitTyping]": ()=>{}
            }["MessagesPage.useCallback[emitTyping]"]);
            if (socket && isConnected) {
                socket.emit("typing", {
                    recipientId: ac.userId,
                    conversationId: ac.conversationId,
                    senderId: myId,
                    senderName: user?.username
                });
            }
        }
    }["MessagesPage.useCallback[emitTyping]"], [
        socket,
        isConnected,
        myId,
        user
    ]);
    const handleInputChange = (e)=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
            }
        }
    }["MessagesPage.useEffect"], [
        inputText
    ]);
    // ─── Send Message ──────────────────────────────
    const handleSendMessage = async (e)=>{
        e?.preventDefault();
        if (!inputText.trim() || !activeConversation) return;
        const msgText = inputText.trim();
        const tempId = Date.now() + Math.floor(Math.random() * 1000);
        // Immediately unlock the input for the next message
        setInputText("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        // Optimistic message (shown as plaintext in UI but sends encrypted)
        const tempMsg = {
            id: tempId,
            content: msgText,
            sender_id: myId || 0,
            is_read: false,
            created_at: new Date().toISOString(),
            username: user?.username || '',
            avatar_url: user?.avatarUrl || '',
            status: "sending"
        };
        setMessages((prev)=>[
                ...prev,
                tempMsg
            ]);
        setTimeout(()=>scrollToBottom(true), 50);
        let finalConversationId = activeConversation.conversationId;
        try {
            let apiMessageId = null;
            let encryptedPayload = {
                content: msgText
            };
            if (typeof activeConversation.conversationId === 'string' && activeConversation.conversationId.startsWith('new_')) {
                // First message to mutual follower → create conversation
                const res = await fetch(`/api/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        targetUserId: activeConversation.userId,
                        ...encryptedPayload
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && data.conversationId) {
                        finalConversationId = data.conversationId;
                        apiMessageId = data.messageId;
                        setActiveConversation((prev)=>prev ? {
                                ...prev,
                                conversationId: finalConversationId
                            } : prev);
                        lastPollTimestamp.current = new Date().toISOString();
                    }
                }
            } else {
                const res = await fetch(`/api/messages/${activeConversation.conversationId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(encryptedPayload)
                });
                if (res.ok) {
                    const data = await res.json();
                    apiMessageId = data.messageId;
                }
            }
            // Update temp message to "sent" with real id
            setMessages((prev)=>prev.map((m)=>m.id === tempId ? {
                        ...m,
                        id: apiMessageId || tempId,
                        status: "sent"
                    } : m));
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
                    createdAt: tempMsg.created_at
                });
            }
            // Refresh inbox
            fetchConversations();
        } catch (error) {
            console.error('Failed to send message', error);
            setMessages((prev)=>prev.map((m)=>m.id === tempId ? {
                        ...m,
                        status: "sent"
                    } : m));
        } finally{
            // No longer locking the whole UI
            textareaRef.current?.focus();
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    // ─── WebRTC Functions ──────────────────────────
    const startCall = async (video)=>{
        setIsCalling(true);
        setIsVideoCall(video);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video,
                audio: true
            });
            setLocalStream(stream);
            // wait for state update to mount video ref
            setTimeout(()=>{
                if (myVideo.current) myVideo.current.srcObject = stream;
            }, 100);
            const peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302"
                    }
                ]
            });
            connectionRef.current = peer;
            stream.getTracks().forEach((track)=>peer.addTrack(track, stream));
            peer.ontrack = (event)=>{
                setRemoteStream(event.streams[0]);
                setTimeout(()=>{
                    if (userVideo.current) userVideo.current.srcObject = event.streams[0];
                }, 100);
            };
            peer.onicecandidate = (event)=>{
                if (event.candidate && socket && isConnected) {
                    socket.emit("ice_candidate", {
                        to: activeConversation?.userId,
                        candidate: event.candidate
                    });
                }
            };
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            socket?.emit("call_user", {
                userToCall: activeConversation?.userId,
                signalData: offer,
                from: myId,
                name: user?.username,
                avatar: user?.avatarUrl,
                isVideo: video
            });
        } catch (err) {
            console.error("Failed to access media devices", err);
            setIsCalling(false);
        }
    };
    const answerCall = async ()=>{
        setCallAccepted(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: isVideoCall,
                audio: true
            });
            setLocalStream(stream);
            setTimeout(()=>{
                if (myVideo.current) myVideo.current.srcObject = stream;
            }, 100);
            const peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302"
                    }
                ]
            });
            connectionRef.current = peer;
            stream.getTracks().forEach((track)=>peer.addTrack(track, stream));
            peer.ontrack = (event)=>{
                setRemoteStream(event.streams[0]);
                setTimeout(()=>{
                    if (userVideo.current) userVideo.current.srcObject = event.streams[0];
                }, 100);
            };
            peer.onicecandidate = (event)=>{
                if (event.candidate && socket && isConnected) {
                    socket.emit("ice_candidate", {
                        to: caller,
                        candidate: event.candidate
                    });
                }
            };
            await peer.setRemoteDescription(new RTCSessionDescription(callerSignal));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            socket?.emit("answer_call", {
                signal: answer,
                to: caller
            });
        } catch (err) {
            console.error("Failed to answer call", err);
        }
    };
    const leaveCall = ()=>{
        setCallEnded(true);
        connectionRef.current?.close();
        connectionRef.current = null;
        localStream?.getTracks().forEach((track)=>track.stop());
        setLocalStream(null);
        setRemoteStream(null);
        setIsCalling(false);
        setReceivingCall(false);
        setCallAccepted(false);
        setIsMuted(false);
        setIsVideoOff(false);
        if (socket && isConnected) {
            const target = isCalling ? activeConversation?.userId : caller;
            socket.emit("end_call", {
                to: target
            });
        }
    };
    const toggleMute = ()=>{
        if (localStream) {
            localStream.getAudioTracks().forEach((track)=>track.enabled = !track.enabled);
            setIsMuted(!isMuted);
        }
    };
    const toggleVideo = ()=>{
        if (localStream) {
            localStream.getVideoTracks().forEach((track)=>track.enabled = !track.enabled);
            setIsVideoOff(!isVideoOff);
        }
    };
    // ─── Render: WebRTC Call UI ────────────────────
    const renderCallOverlay = ()=>{
        if (!isCalling && !callAccepted && !receivingCall) return null;
        // Incoming Call Modal
        if (receivingCall && !callAccepted) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center max-w-sm w-full p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-accent-primary/20 rounded-full animate-ping"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 795,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-2 bg-accent-primary/40 rounded-full animate-pulse mt-2 ml-2 w-[112px] h-[112px]"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 796,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 mx-auto shadow-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: callerAvatar || `https://ui-avatars.com/api/?name=${callerName}&background=random`,
                                        alt: callerName,
                                        width: 128,
                                        height: 128,
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 798,
                                        columnNumber: 35
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 797,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 794,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-white mb-2",
                            children: callerName
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 801,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-accent-primary font-medium tracking-wide mb-12 animate-pulse",
                            children: isVideoCall ? "Incoming Video Call..." : "Incoming Audio Call..."
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 802,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-8 w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setReceivingCall(false);
                                        socket?.emit("end_call", {
                                            to: caller
                                        });
                                    },
                                    className: "flex flex-col items-center gap-3 group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-red-500/20 group-hover:bg-red-500 rounded-full flex items-center justify-center text-red-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                className: "w-8 h-8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18v1.5h3v-1.5m-3 0h3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 810,
                                                    columnNumber: 137
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 810,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 809,
                                            columnNumber: 34
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white/60 text-sm font-medium",
                                            children: "Decline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 812,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 808,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: answerCall,
                                    className: "flex flex-col items-center gap-3 group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce [animation-duration:2s]",
                                            children: isVideoCall ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                className: "w-8 h-8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 818,
                                                    columnNumber: 141
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 818,
                                                columnNumber: 41
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                className: "w-8 h-8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 820,
                                                    columnNumber: 141
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 820,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 816,
                                            columnNumber: 34
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white/90 text-sm font-medium",
                                            children: "Accept"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 823,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 815,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 807,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 792,
                    columnNumber: 22
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/messages/page.tsx",
                lineNumber: 791,
                columnNumber: 18
            }, this);
        }
        // Active Call / Calling Modal
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-fade-in relative overflow-hidden",
            children: [
                callAccepted && remoteStream ? isVideoCall ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    playsInline: true,
                    ref: userVideo,
                    autoPlay: true,
                    className: "absolute inset-0 w-full h-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 837,
                    columnNumber: 24
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 w-full h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-accent-primary/10 rounded-full animate-ping"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 841,
                                    columnNumber: 32
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-32 h-32 rounded-full overflow-hidden border-4 border-white/5 relative z-10 shadow-2xl bg-black",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: activeConversation?.avatar_url || `https://ui-avatars.com/api/?name=${activeConversation?.username}&background=random`,
                                        alt: "Avatar",
                                        width: 128,
                                        height: 128,
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 843,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 842,
                                    columnNumber: 32
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 840,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-white tracking-widest bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent",
                            children: "Audio Call In Progress"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 846,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            playsInline: true,
                            ref: userVideo,
                            autoPlay: true
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 847,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 839,
                    columnNumber: 24
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-gray-900 w-full h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-white/5 rounded-full animate-ping"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 853,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mx-auto border-4 border-white/10 relative z-10 shadow-2xl bg-black",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: activeConversation?.avatar_url || `https://ui-avatars.com/api/?name=${activeConversation?.username}&background=random`,
                                        alt: "Avatar",
                                        width: 144,
                                        height: 144,
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 855,
                                        columnNumber: 35
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 854,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 852,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl sm:text-4xl font-bold text-white mb-3",
                            children: activeConversation?.full_name || activeConversation?.username
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 858,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-accent-primary text-lg font-medium tracking-widest animate-pulse",
                            children: "Ringing..."
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 859,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 851,
                    columnNumber: 21
                }, this),
                localStream && isVideoCall && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute transition-all duration-500 ease-in-out ${callAccepted ? 'top-6 right-6 sm:top-8 sm:right-8 w-28 h-40 sm:w-48 sm:h-72 border-2 border-white/20 rounded-2xl shadow-2xl shrink-0' : 'inset-0 w-full h-full opacity-30 blur-2xl'} overflow-hidden bg-black z-10 pointer-events-none`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        playsInline: true,
                        muted: true,
                        ref: myVideo,
                        autoPlay: true,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/messages/page.tsx",
                        lineNumber: 866,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 865,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center p-3 sm:p-4 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] gap-4 sm:gap-6 pointer-events-auto",
                    children: [
                        isVideoCall && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleVideo,
                            className: `w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${isVideoOff ? 'bg-white/20 text-white/50 hover:bg-white/30' : 'bg-white/10 hover:bg-white/20'}`,
                            children: isVideoOff ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                strokeWidth: 1.5,
                                stroke: "currentColor",
                                className: "w-6 h-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 875,
                                    columnNumber: 165
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 875,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                strokeWidth: 1.5,
                                stroke: "currentColor",
                                className: "w-6 h-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 877,
                                    columnNumber: 165
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 877,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 873,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: leaveCall,
                            className: "w-14 h-14 sm:w-16 sm:h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                fill: "currentColor",
                                className: "w-6 h-6 sm:w-8 sm:h-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18v1.5h3v-1.5m-3 0h3"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 883,
                                    columnNumber: 139
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 883,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 882,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleMute,
                            className: `w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${isMuted ? 'bg-white/20 text-white/50 hover:bg-white/30' : 'bg-white/10 hover:bg-white/20'}`,
                            children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                strokeWidth: 1.5,
                                stroke: "currentColor",
                                className: "w-6 h-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M11.99 18.25c-.246 0-.495-.018-.742-.051m4.332-1.785a8.25 8.25 0 0 0-6.19-20.916m3.929 1.839 1.447 1.446M5.895 5.895A8.25 8.25 0 0 0 12 18.25v2.25M17.657 6.343l-1.445 1.446M2.25 2.25l19.5 19.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 888,
                                    columnNumber: 161
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 888,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                strokeWidth: 1.5,
                                stroke: "currentColor",
                                className: "w-6 h-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 890,
                                    columnNumber: 161
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 890,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 886,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 871,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/messages/page.tsx",
            lineNumber: 833,
            columnNumber: 13
        }, this);
    };
    // ─── Filtered Conversations ────────────────────
    const filteredConversations = conversations.filter((c)=>{
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return c.username.toLowerCase().includes(q) || (c.full_name || "").toLowerCase().includes(q) || (c.lastMessage || "").toLowerCase().includes(q);
    });
    // ─── Render: Inbox Sidebar ─────────────────────
    const renderInbox = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-3 border-b border-white/[0.06] flex items-center justify-between shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.back(),
                                className: "text-white hover:bg-white/5 p-1.5 -ml-1 rounded-xl transition-colors md:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowLeftIcon"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 918,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 917,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold",
                                children: "Messages"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 920,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/messages/page.tsx",
                        lineNumber: 916,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 915,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-2 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center gap-2 px-3 py-2 focus-within:border-accent-primary/30 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                strokeWidth: 1.5,
                                stroke: "currentColor",
                                className: "w-4 h-4 text-text-tertiary shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 928,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 927,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search conversations...",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                className: "bg-transparent w-full text-sm focus:outline-none placeholder-text-tertiary"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 930,
                                columnNumber: 21
                            }, this),
                            searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSearchQuery(""),
                                className: "text-text-tertiary hover:text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    strokeWidth: 2,
                                    stroke: "currentColor",
                                    className: "w-4 h-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M6 18 18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 940,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 939,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 938,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/messages/page.tsx",
                        lineNumber: 926,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 925,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto no-scrollbar",
                    children: [
                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1 px-4 py-2",
                            children: [
                                1,
                                2,
                                3,
                                4,
                                5
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 p-3 rounded-xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-14 h-14 rounded-full skeleton shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 953,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 w-32 skeleton"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 955,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 w-48 skeleton"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 956,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 954,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 952,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 950,
                            columnNumber: 21
                        }, this),
                        !loading && filteredConversations.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-24 animate-fade-in px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        strokeWidth: 1.5,
                                        stroke: "currentColor",
                                        className: "w-10 h-10 text-text-tertiary",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 967,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 966,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 965,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-white mb-2",
                                    children: searchQuery ? "No results found" : "No messages yet"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 970,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-text-tertiary text-sm max-w-xs mx-auto",
                                    children: searchQuery ? "Try a different search term" : "Follow athletes and start chatting!"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 973,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 964,
                            columnNumber: 21
                        }, this),
                        filteredConversations.map((chat)=>{
                            const avatarUrl = chat.avatar_url || `https://ui-avatars.com/api/?name=${chat.username}&background=random`;
                            const isActive = activeConversation?.conversationId === chat.conversationId;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>openConversation(chat),
                                className: `flex items-center justify-between px-4 py-3.5 cursor-pointer transition-all mx-2 rounded-xl ${isActive ? 'bg-accent-primary/10 border border-accent-primary/20' : 'hover:bg-white/[0.03] active:bg-white/[0.06] border border-transparent'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/[0.06]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: avatarUrl,
                                                        alt: chat.username,
                                                        width: 56,
                                                        height: 56,
                                                        className: "w-full h-full object-cover",
                                                        unoptimized: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                        lineNumber: 996,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 995,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 994,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col min-w-0 pr-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: `text-[15px] truncate ${chat.unreadCount > 0 ? 'font-bold text-white' : 'font-semibold text-text-secondary'}`,
                                                        children: chat.full_name || chat.username
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                        lineNumber: 1000,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `text-[13px] truncate ${chat.unreadCount > 0 ? 'font-semibold text-white' : 'text-text-tertiary'}`,
                                                        children: (()=>{
                                                            if (!chat.lastMessage) return "No messages yet — say hi! 👋";
                                                            if (chat.lastMessage.match(/(?:https?:\/\/[^\s]+)?\/post\/\d+/)) return "Shared a post ✈️";
                                                            return chat.lastMessage;
                                                        })()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                        lineNumber: 1003,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 999,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 993,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-end shrink-0 gap-1.5 pl-2",
                                        children: [
                                            chat.lastMessageTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[11px] ${chat.unreadCount > 0 ? 'text-accent-primary font-bold' : 'text-text-tertiary'}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(chat.lastMessageTime), {
                                                    addSuffix: true
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 1015,
                                                columnNumber: 37
                                            }, this),
                                            chat.unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-[0_0_8px_rgba(0,212,255,0.4)]",
                                                children: chat.unreadCount > 9 ? "9+" : chat.unreadCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 1020,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1013,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, chat.conversationId, true, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 984,
                                columnNumber: 25
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 948,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/messages/page.tsx",
            lineNumber: 913,
            columnNumber: 9
        }, this);
    // ─── Render: Chat View ─────────────────────────
    const renderChat = ()=>{
        if (!activeConversation) return null;
        const otherAvatarUrl = activeConversation.avatar_url || `https://ui-avatars.com/api/?name=${activeConversation.username}&background=random`;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeConversation,
                                    className: "text-white hover:bg-white/5 p-1.5 -ml-1 rounded-xl transition-colors lg:hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowLeftIcon"], {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1044,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1043,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 cursor-pointer",
                                    onClick: ()=>router.push(`/profile/${activeConversation.username}`),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: otherAvatarUrl,
                                                    alt: "Avatar",
                                                    width: 40,
                                                    height: 40,
                                                    className: "w-full h-full object-cover",
                                                    unoptimized: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 1052,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 1051,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1050,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-[15px] font-bold leading-tight",
                                                    children: activeConversation.full_name || activeConversation.username
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 1056,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] leading-tight",
                                                    children: otherUserTyping ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-accent-primary font-medium",
                                                        children: "typing..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                        lineNumber: 1059,
                                                        columnNumber: 41
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-text-tertiary",
                                                        children: [
                                                            "@",
                                                            activeConversation.username
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                        lineNumber: 1061,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 1057,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1055,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1046,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 1042,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5 sm:gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>startCall(false),
                                    className: "p-2 sm:px-3 sm:py-2 bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.1] border border-white/[0.06] rounded-xl text-text-secondary hover:text-white transition-all flex items-center gap-2",
                                    title: "Audio Call",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        strokeWidth: 1.5,
                                        stroke: "currentColor",
                                        className: "w-4 h-4 sm:w-5 sm:h-5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.864-1.068l-3.21-.642a2.25 2.25 0 0 0-2.127.842l-1.257 1.595A15.93 15.93 0 0 1 4.296 8.355l1.595-1.257a2.25 2.25 0 0 0 .842-2.127L6.09 1.761a2.25 2.25 0 0 0-2.127-.842L2.25 6.75Z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1076,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1075,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1070,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>startCall(true),
                                    className: "p-2 sm:px-3 sm:py-2 bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.1] border border-white/[0.06] rounded-xl text-text-secondary hover:text-white transition-all flex items-center gap-2",
                                    title: "Video Call",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        strokeWidth: 1.5,
                                        stroke: "currentColor",
                                        className: "w-4 h-4 sm:w-5 sm:h-5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1085,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1084,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1079,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 1069,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 1041,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: messagesContainerRef,
                    onScroll: handleScroll,
                    className: "flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-0.5 no-scrollbar relative",
                    children: [
                        messagesLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-10 text-text-tertiary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1099,
                                    columnNumber: 29
                                }, this),
                                "Loading messages..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 1098,
                            columnNumber: 25
                        }, this),
                        !messagesLoading && messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-16 animate-fade-in flex-1 flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-3xl",
                                        children: "👋"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1107,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1106,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white font-semibold mb-1",
                                    children: "Start the conversation!"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1109,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-text-tertiary text-sm",
                                    children: [
                                        "Send a message to ",
                                        activeConversation.full_name || activeConversation.username
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1110,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 1105,
                            columnNumber: 25
                        }, this),
                        messages.map((msg, index)=>{
                            const isMe = msg.sender_id === myId;
                            const prevMsg = index > 0 ? messages[index - 1] : null;
                            const nextMsg = index < messages.length - 1 ? messages[index + 1] : null;
                            const showDateSeparator = !prevMsg || !isSameDay(msg.created_at, prevMsg.created_at);
                            const isSameSenderAsPrev = prevMsg && prevMsg.sender_id === msg.sender_id && isSameDay(msg.created_at, prevMsg.created_at);
                            const isSameSenderAsNext = nextMsg && nextMsg.sender_id === msg.sender_id && isSameDay(msg.created_at, nextMsg.created_at);
                            const isLastInGroup = !isSameSenderAsNext;
                            const isFirstInGroup = !isSameSenderAsPrev;
                            const isLastOwnMsg = isMe && (!nextMsg || nextMsg.sender_id !== myId);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                children: [
                                    showDateSeparator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center my-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full text-[11px] text-text-tertiary font-medium",
                                            children: formatDateSeparator(msg.created_at)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1130,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1129,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex w-full ${isMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup && !showDateSeparator ? 'mt-3' : 'mt-0.5'} message-in`,
                                        children: [
                                            !isMe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 mr-2 shrink-0 self-end",
                                                children: isLastInGroup ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-7 h-7 rounded-full overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: activeConversation.avatar_url || otherAvatarUrl,
                                                        alt: "",
                                                        width: 28,
                                                        height: 28,
                                                        className: "w-full h-full object-cover",
                                                        unoptimized: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                        lineNumber: 1141,
                                                        columnNumber: 53
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 1140,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                    lineNumber: 1143,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 1138,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex flex-col max-w-[72%] ${isMe ? 'items-end' : 'items-start'}`,
                                                children: [
                                                    (()=>{
                                                        const postMatch = msg.content.match(/(?:https?:\/\/[^\s]+)?\/post\/(\d+)/);
                                                        const cleanText = postMatch ? msg.content.replace(/Check out this post:\s*/ig, "").replace(/https?:\/\/[^\s]+\/post\/\d+/ig, "").trim() : msg.content;
                                                        const postId = postMatch ? parseInt(postMatch[1], 10) : null;
                                                        const bubbleClasses = isMe ? `bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-[0_2px_8px_rgba(0,212,255,0.15)] ${isFirstInGroup ? 'rounded-2xl rounded-br-md' : isLastInGroup ? 'rounded-2xl rounded-tr-md' : 'rounded-xl rounded-r-md'}` : `bg-white/[0.06] border border-white/[0.06] text-white ${isFirstInGroup ? 'rounded-2xl rounded-bl-md' : isLastInGroup ? 'rounded-2xl rounded-tl-md' : 'rounded-xl rounded-l-md'}`;
                                                        if (postId && !cleanText) {
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "my-0.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SharedPostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    postId: postId
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                                                    lineNumber: 1166,
                                                                    columnNumber: 57
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                                lineNumber: 1165,
                                                                columnNumber: 53
                                                            }, this);
                                                        }
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `px-3.5 py-2 text-[15px] leading-relaxed ${bubbleClasses}`,
                                                            style: {
                                                                wordBreak: 'break-word'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    linkify(cleanText),
                                                                    postId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SharedPostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        postId: postId
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                                        lineNumber: 1178,
                                                                        columnNumber: 68
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                                lineNumber: 1176,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 49
                                                        }, this);
                                                    })(),
                                                    isLastInGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `flex items-center gap-1.5 mt-1 px-1 ${isMe ? 'flex-row-reverse' : ''}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-text-tertiary",
                                                                children: formatMessageTime(msg.created_at)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                                lineNumber: 1186,
                                                                columnNumber: 49
                                                            }, this),
                                                            isMe && isLastOwnMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusIcon, {
                                                                status: msg.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                                lineNumber: 1189,
                                                                columnNumber: 74
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                                        lineNumber: 1185,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/messages/page.tsx",
                                                lineNumber: 1147,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1136,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, msg.id, true, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 1127,
                                columnNumber: 29
                            }, this);
                        }),
                        otherUserTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full justify-start mt-2 message-in",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-7 mr-2 shrink-0 self-end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-7 h-7 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: activeConversation.avatar_url || otherAvatarUrl,
                                            alt: "",
                                            width: 28,
                                            height: 28,
                                            className: "w-full h-full object-cover",
                                            unoptimized: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1203,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1202,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1201,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/[0.06] border border-white/[0.06] px-4 py-2.5 rounded-2xl rounded-bl-md flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.3s]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1207,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.15s]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1208,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/messages/page.tsx",
                                            lineNumber: 1209,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1206,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 1200,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: messagesEndRef
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 1214,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 1092,
                    columnNumber: 17
                }, this),
                showScrollButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>scrollToBottom(true),
                    className: "absolute bottom-20 right-6 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/[0.1] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-white/15 transition-all animate-fade-in z-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 2,
                        stroke: "currentColor",
                        className: "w-5 h-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/messages/page.tsx",
                            lineNumber: 1224,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/messages/page.tsx",
                        lineNumber: 1223,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 1219,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/80 backdrop-blur-xl border-t border-white/[0.06] p-3 shrink-0 pb-safe",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSendMessage,
                        className: "flex items-end gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 bg-white/[0.06] border border-white/[0.06] rounded-2xl px-4 py-2.5 flex items-end gap-2 focus-within:border-accent-primary/30 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ref: textareaRef,
                                    placeholder: "Message...",
                                    value: inputText,
                                    onChange: handleInputChange,
                                    onKeyDown: handleKeyDown,
                                    rows: 1,
                                    className: "bg-transparent w-full text-[15px] focus:outline-none placeholder-text-tertiary resize-none max-h-[120px] leading-relaxed",
                                    style: {
                                        height: "auto"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1233,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 1232,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: !inputText.trim() || sending,
                                className: `shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${inputText.trim() ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-[0_0_12px_rgba(0,212,255,0.3)]' : 'bg-white/[0.06] text-text-tertiary cursor-not-allowed'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    className: "w-5 h-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1254,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1253,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 1244,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/messages/page.tsx",
                        lineNumber: 1231,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 1230,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/messages/page.tsx",
            lineNumber: 1039,
            columnNumber: 13
        }, this);
    };
    // ─── Desktop: Side-by-side │ Mobile: Toggle ────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] flex text-white animate-fade-in overflow-hidden -mx-4 -mt-4",
        children: [
            renderCallOverlay(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full lg:w-[380px] lg:min-w-[380px] lg:border-r lg:border-white/[0.06] bg-bg-body flex-col shrink-0 ${activeConversation ? 'hidden lg:flex' : 'flex'}`,
                children: renderInbox()
            }, void 0, false, {
                fileName: "[project]/app/(main)/messages/page.tsx",
                lineNumber: 1269,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 bg-bg-body flex-col min-w-0 relative ${activeConversation ? 'flex' : 'hidden lg:flex'}`,
                children: activeConversation ? renderChat() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center animate-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-5",
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
                                        d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/messages/page.tsx",
                                        lineNumber: 1286,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/messages/page.tsx",
                                    lineNumber: 1285,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 1284,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-white mb-2",
                                children: "Your Messages"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 1289,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-text-tertiary text-sm max-w-xs mx-auto",
                                children: "Select a conversation to start chatting"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/messages/page.tsx",
                                lineNumber: 1290,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/messages/page.tsx",
                        lineNumber: 1283,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/messages/page.tsx",
                    lineNumber: 1282,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/messages/page.tsx",
                lineNumber: 1276,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/messages/page.tsx",
        lineNumber: 1266,
        columnNumber: 9
    }, this);
}
_s(MessagesPage, "QdQlWcXNu4cghzLGeQ5leLZYOWg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c1 = MessagesPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatusIcon");
__turbopack_context__.k.register(_c1, "MessagesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_d4f4b2ff._.js.map