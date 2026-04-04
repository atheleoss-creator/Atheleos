import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('atheleos_token')?.value;
  const { pathname } = request.nextUrl;

  // Auth routes that don't require login
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verification');

  // Allow unauthenticated access to home page
  const isPublicPageRoute = pathname === '/';
  
  // Public APIs that should not trigger redirects
  const isPublicApiRoute = pathname.startsWith('/api/auth') || pathname.startsWith('/api/posts') || pathname.startsWith('/api/stories');

  // Skip middleware for public API routes
  if (isPublicApiRoute) {
    return NextResponse.next();
  }

  // If user IS logged in and tries to access login/signup → redirect to home
  if (token && isAuthRoute) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return response;
  }

  // If user is NOT logged in and tries to access a protected route
  if (!token && !isAuthRoute && !isPublicPageRoute) {
    if (pathname.startsWith('/api')) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    const response = NextResponse.redirect(url);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
