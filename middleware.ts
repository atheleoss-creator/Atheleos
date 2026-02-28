import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add routes that should not require authentication
const publicRoutes = ['/login', '/signup', '/verification', '/forgot-password', '/reset-password'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('atheleos_token')?.value;
  const isAuthPage = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // Allow API routes to handle their own authentication/errors
  // Or handle specific public API routes here if needed
  if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next();
  }

  // If user has no token and tries to access a protected route
  if (!token && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    // Optional: save the return url
    // loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user bears a token, but tries to access login or signup pages, redirect to home page
  if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, favicon.ico, etc.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
