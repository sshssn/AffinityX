'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Settings, Info } from 'lucide-react';

function AuthContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'no_code':
        return 'No authorization code received from Auth0';
      case 'no_access_token':
        return 'Failed to obtain access token from Auth0';
      case 'invalid_profile':
        return 'Invalid user profile received from Auth0';
      case 'callback_error':
        return 'Error during authentication callback';
      case 'configuration_error':
        return 'Auth0 configuration is missing or invalid. Please check your environment variables.';
      case 'access_denied':
        return 'Access was denied during authentication';
      case 'consent_required':
        return 'User consent is required to complete authentication';
      case 'login_required':
        return 'Please log in to continue';
      case 'invalid_request':
        return 'Invalid authentication request';
      case 'server_error':
        return 'Auth0 server error occurred';
      case 'temporarily_unavailable':
        return 'Auth0 service is temporarily unavailable';
      default:
        return 'An unexpected error occurred during authentication';
    }
  };

  const handleRetry = () => {
    // Clear any existing error parameters and redirect to login
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('error');
    currentUrl.searchParams.delete('success');
    
    // Redirect to the login endpoint
    window.location.href = '/api/auth/login';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    window.location.href = '/contact';
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <CardTitle>Authentication Successful</CardTitle>
            <CardDescription>
              You have been successfully authenticated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGoHome} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            {error ? getErrorMessage(error) : 'An error occurred during authentication'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleRetry} className="w-full">
            Try Again
          </Button>
          <Button onClick={handleGoHome} variant="outline" className="w-full">
            Go Home
          </Button>
          {error === 'configuration_error' && (
            <Button onClick={handleContactSupport} variant="ghost" className="w-full text-sm">
              <Settings className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          )}
          
          {/* Development Keys Warning */}
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Development Keys Warning
                </p>
                <p className="text-yellow-700 dark:text-yellow-300 text-xs">
                  Your Auth0 application is using development keys. For production, update your Auth0 tenant and environment variables in Vercel.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we load the authentication page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}