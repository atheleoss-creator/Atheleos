import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('atheleos_token')?.value;
    const { pathname } = request.nextUrl;

    // Define auth-only and public routes
    const isAuthRoute = pathname.startsWith('/login') || 
                        pathname.startsWith('/signup') || 
                        pathname.startsWith('/forgot-password') || 
                        pathname.startsWith('/verification');

    const isPublicApiRoute = pathname.startsWith('/api/auth');
    const isStaticFile = pathname.startsWith('/_next') || 
                         pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/i);

    // Skip middleware for static files and auth APIs
    if (isStaticFile || isPublicApiRoute) {
        return NextResponse.next();
    }

    // 1. If user IS logged in and tries to access login/signup → redirect to home
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. If user is NOT logged in and tries to access a protected route
    if (!token && !isAuthRoute) {
        // If it's an API route, return 401 JSON instead of HTML redirect
        if (pathname.startsWith('/api')) {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Let users upload files without strict cookie check in middleware
        // (the /api/upload route does its own token check anyway)

        // Otherwise, redirect to login page
        const url = new URL('/login', request.url);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
