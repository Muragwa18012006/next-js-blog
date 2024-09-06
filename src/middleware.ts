// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the routes that require parameters (like a token or some query parameters)
const protectedRoutes = ['/',]; // Add routes that require params

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const id =  url.searchParams.get('id'); // Example of a required param

  // Check if the current route requires params and if the required param is missing
  if (protectedRoutes.includes(url.pathname) && !id) {
    // If token is missing or invalid, redirect to login page
    url.pathname = '/login'; // Redirect to login page
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if the parameter exists
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: "/:id", // Apply middleware to all routes except Next.js internal routes
};
