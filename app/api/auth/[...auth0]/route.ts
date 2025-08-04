import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper function to exchange authorization code for tokens
async function exchangeCodeForTokens(code: string, redirectUri: string) {
  const tokenUrl = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;
  
  if (!clientSecret) {
    console.error('AUTH0_CLIENT_SECRET is not configured');
    throw new Error('Auth0 client secret is not configured');
  }
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Token exchange failed:', response.status, errorText);
    throw new Error(`Token exchange failed: ${response.statusText}`);
  }

  return response.json();
}

// Helper function to get user profile from Auth0
async function getUserProfile(accessToken: string) {
  const userInfoUrl = `https://${process.env.AUTH0_DOMAIN}/userinfo`;
  
  const response = await fetch(userInfoUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get user profile: ${response.statusText}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  // Debug: Log environment variables (remove in production)
  console.log('Environment variables:', {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  });
  
  // Check if Auth0 is properly configured
  const auth0Domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const baseUrl = process.env.AUTH0_BASE_URL;
  
  if (!auth0Domain || !clientId || !baseUrl) {
    console.error('Missing Auth0 environment variables:', {
      AUTH0_DOMAIN: auth0Domain,
      AUTH0_CLIENT_ID: clientId,
      AUTH0_BASE_URL: baseUrl
    });
    return NextResponse.redirect(`${baseUrl || 'http://localhost:3000'}/auth?error=configuration_error`);
  }
  
  // Login endpoint - redirect to Auth0 hosted login page
  if (pathname.endsWith('/login')) {
    const returnTo = searchParams.get('returnTo') || '/dashboard';
    const redirectUri = `${baseUrl}/api/auth/callback`;
    
    const authUrl = `https://${auth0Domain}/authorize?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=openid%20profile%20email&` +
      `state=${encodeURIComponent(returnTo)}`;
    
    console.log('Redirecting to Auth0:', authUrl);
    return NextResponse.redirect(authUrl);
  }
  
  // Logout endpoint - redirect to Auth0 logout
  if (pathname.endsWith('/logout')) {
    const returnTo = baseUrl;
    
    const logoutUrl = `https://${auth0Domain}/v2/logout?` +
      `client_id=${clientId}&` +
      `returnTo=${encodeURIComponent(returnTo)}`;
    
    // Clear session cookie and redirect
    const response = NextResponse.redirect(logoutUrl);
    response.cookies.delete('auth0_session');
    response.cookies.set('auth0_session', '', {
      expires: new Date(0),
      path: '/',
    });
    return response;
  }
  
  // Callback endpoint - handle the authorization code exchange
  if (pathname.endsWith('/callback')) {
    try {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      
      // Check for error parameter in URL
      const errorParam = searchParams.get('error');
      if (errorParam) {
        console.error('Auth0 error:', errorParam);
        return NextResponse.redirect(`${baseUrl}/auth?error=${errorParam}`);
      }
      
      if (!code) {
        return NextResponse.redirect(`${baseUrl}/auth?error=no_code`);
      }
      
      const redirectUri = `${baseUrl}/api/auth/callback`;
      
      // Exchange code for tokens
      const tokenResponse = await exchangeCodeForTokens(code, redirectUri);
      const { access_token, id_token, refresh_token, expires_in } = tokenResponse;
      
      if (!access_token) {
        console.error('No access token received from Auth0');
        return NextResponse.redirect(`${baseUrl}/auth?error=no_access_token`);
      }
      
      // Get user profile
      const userProfile = await getUserProfile(access_token);
      
      if (!userProfile || !userProfile.email) {
        console.error('Invalid user profile received from Auth0');
        return NextResponse.redirect(`${baseUrl}/auth?error=invalid_profile`);
      }
      
      // Store session data in secure cookie
      const sessionData = {
        user: userProfile,
        accessToken: access_token,
        idToken: id_token,
        refreshToken: refresh_token,
        expiresAt: Date.now() + ((expires_in || 3600) * 1000),
      };
      
      console.log('Setting session cookie for user:', userProfile.email);
      
      // Redirect based on user role or to the original return URL
      const returnTo = state || '/dashboard';
      const userRole = userProfile.app_metadata?.role || 'client';
      
      let redirectUrl = returnTo;
      if (returnTo === '/dashboard') {
        redirectUrl = userRole === 'admin' ? '/admin/dashboard' : '/client/dashboard';
      }
      
      console.log('Redirecting to:', redirectUrl);
      
      const response = NextResponse.redirect(`${baseUrl}${redirectUrl}`);
      
      // Set session cookie with proper error handling
      try {
        response.cookies.set('auth0_session', JSON.stringify(sessionData), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: expires_in || 3600,
          path: '/',
        });
      } catch (cookieError) {
        console.error('Failed to set session cookie:', cookieError);
        // Continue without cookie if there's an error
      }
      
      console.log('Session cookie set, redirecting...');
      return response;
      
    } catch (error) {
      console.error('Auth0 callback error:', error);
      return NextResponse.redirect(`${baseUrl}/auth?error=callback_error`);
    }
  }
  
  return new NextResponse('Not found', { status: 404 });
}

export async function POST(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Logout endpoint - handle POST requests for logout
  if (pathname.endsWith('/logout')) {
    const auth0Domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const returnTo = process.env.AUTH0_BASE_URL || 'http://localhost:3000';
    
    if (!auth0Domain || !clientId) {
      return NextResponse.json(
        { error: 'Auth0 configuration is missing' },
        { status: 500 }
      );
    }
    
    const logoutUrl = `https://${auth0Domain}/v2/logout?` +
      `client_id=${clientId}&` +
      `returnTo=${encodeURIComponent(returnTo)}`;
    
    // Clear session cookie and redirect
    const response = NextResponse.redirect(logoutUrl);
    response.cookies.delete('auth0_session');
    response.cookies.set('auth0_session', '', {
      expires: new Date(0),
      path: '/',
    });
    return response;
  }
  
  return new NextResponse('Method not allowed', { status: 405 });
} 