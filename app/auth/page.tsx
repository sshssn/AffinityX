'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function AuthPage() {
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
        return 'Auth0 configuration is missing or invalid';
      default:
        return 'An unexpected error occurred during authentication';
    }
  };

  const handleRetry = () => {
    window.location.href = '/api/auth/login';
  };

  const handleGoHome = () => {
    window.location.href = '/';
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
        </CardContent>
      </Card>
    </div>
  );
}