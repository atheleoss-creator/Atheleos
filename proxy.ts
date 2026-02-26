import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // 1. Public routes that don't require authentication
    const publicRoutes = ['/login', '/signup', '/forgot-password', '/verification'];
    
    // 2. Allow all API routes through
    const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
    
    // 3. Current path
    const path = request.nextUrl.pathname;

    // 4. Look for auth token cookie
    const token = request.cookies.get('atheleos_token')?.value;

    // 5. If it's a public route and user HAS a token, redirect to feed
    if (publicRoutes.includes(path) && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 6. If NOT a public route, NOT an API route, and user has NO token -> force login
    if (!publicRoutes.includes(path) && !isApiRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 7. Otherwise, let them proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico, sitemap.xml, robots.txt
         */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
