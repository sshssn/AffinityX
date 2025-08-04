import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export interface Auth0Session {
  user: {
    sub: string;
    email: string;
    name: string;
    picture?: string;
    app_metadata?: {
      role?: string;
    };
  };
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('auth0_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { user: null, isAuthenticated: false },
        { 
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }
    
    const session: Auth0Session = JSON.parse(sessionCookie.value);
    
    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      return NextResponse.json(
        { user: null, isAuthenticated: false },
        { 
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }
    
    return NextResponse.json({
      user: session.user,
      isAuthenticated: true,
      role: session.user.app_metadata?.role || 'client'
    }, {
      headers: {
        'Cache-Control': 'private, max-age=60', // Cache for 1 minute
        'Vary': 'Cookie'
      }
    });
  } catch (error) {
    console.error('Error parsing session:', error);
    return NextResponse.json(
      { user: null, isAuthenticated: false },
      { 
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 