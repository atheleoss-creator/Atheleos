module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pool",
    ()=>pool,
    "query",
    ()=>query
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mysql2/promise.js [app-route] (ecmascript)");
;
const pool = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "atheleos_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
}
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/mailer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendOTP",
    ()=>sendOTP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
async function sendOTP(to, otp, purpose = 'signup') {
    const subject = purpose === 'signup' ? 'Welcome to Atheleos - Verify Your Email' : 'Atheleos - Password Reset Verification';
    const logoPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'atheleos.png');
    const textPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'AtheleosText.png');
    const headerHtml = `
        <div style="text-align: center; margin-bottom: 28px;">
            <img src="cid:atheleos_logo" alt="Logo" style="height: 42px; width: auto; vertical-align: middle; margin-right: 10px;" />
            <img src="cid:atheleos_text" alt="ATHELEOS" style="height: 28px; width: auto; vertical-align: middle;" />
        </div>
    `;
    const html_signup = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center; background-color: #0a0a0a; color: #f5f5f5; border-radius: 16px; border: 1px solid #222;">
            ${headerHtml}
            <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 12px 0;">Verify your identity</h2>
            <p style="color: #a3a3a3; font-size: 14px; line-height: 1.6; margin: 0 0 32px 0;">Enter the following 6-digit verification code to activate your premium Atheleos account.</p>
            <div style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0095F6; background-color: #141414; display: inline-block; padding: 16px 32px; border-radius: 12px; border: 2px solid rgba(0, 149, 246, 0.4); box-shadow: 0 0 20px rgba(0, 149, 246, 0.15);">
                ${otp}
            </div>
            <p style="color: #525252; margin: 36px 0 0 0; font-size: 12px;">This code will expire in 15 minutes.</p>
        </div>
    `;
    const html_reset = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center; background-color: #0a0a0a; color: #f5f5f5; border-radius: 16px; border: 1px solid #222;">
            ${headerHtml}
            <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 12px 0;">Password Reset Request</h2>
            <p style="color: #a3a3a3; font-size: 14px; line-height: 1.6; margin: 0 0 32px 0;">Enter the following 6-digit code to securely reset your Atheleos password.</p>
            <div style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0095F6; background-color: #141414; display: inline-block; padding: 16px 32px; border-radius: 12px; border: 2px solid rgba(0, 149, 246, 0.4); box-shadow: 0 0 20px rgba(0, 149, 246, 0.15);">
                ${otp}
            </div>
            <p style="color: #525252; margin: 36px 0 0 0; font-size: 12px;">This code will expire in 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
    `;
    const mailOptions = {
        from: `"Atheleos Security" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: purpose === 'signup' ? html_signup : html_reset,
        attachments: [
            {
                filename: 'atheleos.png',
                path: logoPath,
                cid: 'atheleos_logo'
            },
            {
                filename: 'AtheleosText.png',
                path: textPath,
                cid: 'atheleos_text'
            }
        ]
    };
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Mail Send Error:', error);
        return false;
    }
}
}),
"[project]/app/api/auth/signup/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mailer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mailer.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(req) {
    try {
        const { username, email, password, fullName, dob, role, city, state, bio, sport, position, height, weight, topSpeed, verticalLeap, recruitingStatus, publicKey } = await req.json();
        const missingFields = [];
        if (!username?.trim()) missingFields.push('username');
        if (!email?.trim()) missingFields.push('email');
        if (!password?.trim()) missingFields.push('password');
        if (!fullName?.trim()) missingFields.push('fullName');
        if (!role?.trim()) missingFields.push('role');
        if (!publicKey) missingFields.push('publicKey');
        if (missingFields.length > 0) {
            console.log('Signup failed due to missing fields:', missingFields, 'Received data:', {
                username,
                email,
                password: !!password,
                fullName,
                role
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            }, {
                status: 400
            });
        }
        // 1. Check if user exists
        const existingUsers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM users WHERE email = ? OR username = ?', [
            email,
            username
        ]);
        if (existingUsers.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Username or Email already taken'
            }, {
                status: 409
            });
        }
        // 2. Hash Password and Generate OTP
        const saltRounds = 10;
        const passwordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, saltRounds);
        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60000); // 15 minutes from now
        // 3. Create User in Database as Unverified
        const insertSql = `
      INSERT INTO users (
        username, email, password_hash, full_name, dob, role, city, state, bio, 
        sport, position, height, weight, top_speed, vertical_leap, recruiting_status, 
        is_verified, otp_code, otp_expires_at, public_key
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?, ?, ?)
    `;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(insertSql, [
            username,
            email,
            passwordHash,
            fullName,
            dob || null,
            role,
            city || null,
            state || null,
            bio || null,
            sport || null,
            position || null,
            height || null,
            weight || null,
            topSpeed || null,
            verticalLeap || null,
            recruitingStatus || 'Not Looking',
            otp,
            expiresAt,
            publicKey
        ]);
        // 4. Send the OTP Email via Hostinger credentials
        // Note: if SMTP credentials aren't set in dev, it'll fail silently but return true so dev flow proceeds
        if (process.env.SMTP_USER) {
            const mailSent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mailer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendOTP"])(email, otp, 'signup');
            if (!mailSent) {
                console.log(`Failed to send email to ${email}. OTP is: ${otp}`);
            // non-blocking for now
            }
        } else {
            // Dev visual cue if skip mailer
            console.log(`[DEV MODE] Skipping email. OTP for ${email} is: ${otp}`);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Account created. OTP sent to email.'
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Signup Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error?.message || 'Internal server error',
            sqlMessage: error?.sqlMessage,
            code: error?.code,
            errno: error?.errno,
            sqlState: error?.sqlState
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8193f61f._.js.map