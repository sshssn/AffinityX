import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple middleware function that just continues
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/client/:path*',
    '/admin/:path*',
    '/dashboard/:path*',
    '/api/protected/:path*'
  ]
}; 