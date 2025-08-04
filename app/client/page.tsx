'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthUser, getUserRole, Auth0Session } from '@/lib/auth0';

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Auth0Session['user'] | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getAuthUser();
        const role = await getUserRole();
        
        if (!userData) {
          router.push('/auth');
          return;
        }
        
        setUser(userData);
        setUserRole(role);
        
        // If user is admin, redirect to admin dashboard
        if (role === 'admin') {
          router.push('/admin');
          return;
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user || userRole === 'admin') {
    return null; // Will redirect
  }

  return (
    <div className="relative">
      {/* Auth Header */}
      <div className="bg-background border-b border-border p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Client Dashboard</h1>
          <span className="text-sm text-muted-foreground">
            Welcome, {user.name || user.email}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Switch to Admin View
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to your Client Dashboard</h2>
        <p className="text-muted-foreground">This is where you can manage your projects and requests.</p>
      </div>
    </div>
  );
}
