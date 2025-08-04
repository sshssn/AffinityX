"use client";

import { useAuth } from "@/lib/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'client';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Access Required</h2>
          <p className="text-muted-foreground mt-4">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-muted-foreground mt-4">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 