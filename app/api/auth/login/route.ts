import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  // Check if Auth0 is configured
  const auth0Domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const baseUrl = process.env.AUTH0_BASE_URL;
  
  if (!auth0Domain || !clientId || !baseUrl) {
    // If Auth0 is not configured, redirect to auth page with configuration error
    console.error('Auth0 not configured, redirecting to auth page');
    return NextResponse.redirect(`${baseUrl || 'http://localhost:3000'}/auth?error=configuration_error`);
  }
  
  // If Auth0 is configured, redirect to the Auth0 route
  return NextResponse.redirect(`/api/auth/[...auth0]/login?returnTo=${encodeURIComponent(returnTo)}`);
} 