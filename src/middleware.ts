// middleware.ts

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log('middleware', req.nextauth?.token);

    // If user is not signed in and tries to access protected pages, redirect to /sign-in
    if (!req.nextauth?.token) {
      const url = req.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }

    // Allow access to next middleware or route handler
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/sign-in',
    }
  }
);

export const config = {
  matcher: ['/', '/dashboard/:path*', '/master-data/:path*', '/sign-in'], // Include all protected paths, including the root and dashboard
};

// Function to check if a route is a public route
function isPublicRoute(path: string): boolean {
  return ['/sign-in', '/public-route'].includes(path); // Add other public routes as needed
}