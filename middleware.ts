import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Array of public routes that don't require authentication
    const publicRoutes = ['/login', '/signup', '/forgot-password', '/verification'];
    
    // 2. Allow all strictly API routes (though you could protect non-auth APIs here too)
    const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
    
    // 3. Current path
    const path = request.nextUrl.pathname;

    // 4. Look for the custom Auth Token generated in `/api/auth/login` and `/api/auth/verify-otp`
    const token = request.cookies.get('atheleos_token')?.value;

    // 5. If it's a public route and user HAS a token, redirect them to the feed
    if (publicRoutes.includes(path) && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 6. If it's NOT a public route, NOT an API route, and user DOES NOT have a token -> force login
    if (!publicRoutes.includes(path) && !isApiRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 7. Otherwise, let them proceed
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
