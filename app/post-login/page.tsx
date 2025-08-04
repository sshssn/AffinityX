"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function PostLoginPage() {
  const router = useRouter();
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
          <h2 className="text-xl font-semibold">Authentication Required</h2>
          <p className="text-muted-foreground mt-4">Please log in to continue.</p>
        </div>
      </div>
    );
  }

  // Redirect based on user role
  if (user.role === 'admin') {
    router.push('/admin');
  } else {
    router.push('/client');
  }

  return (
    <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Redirecting...</h2>
        <p className="text-muted-foreground mt-4">Please wait while we redirect you to your dashboard.</p>
      </div>
    </div>
  );
} 