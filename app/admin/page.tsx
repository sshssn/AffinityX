'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthUser, getUserRole, Auth0Session } from '@/lib/auth0';

// Import the dashboard component from the admin dashboard
import DashboardPage from './dashboard/page';

export default function AdminDashboard() {
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
        
        // If user is not admin, redirect to client dashboard
        if (role !== 'admin') {
          router.push('/client');
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

  if (!user || userRole !== 'admin') {
    return null; // Will redirect
  }

  return (
    <div className="relative">
      {/* Auth Header */}
      <div className="bg-background border-b border-border p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <span className="text-sm text-muted-foreground">
            Welcome, {user.name || user.email} (Admin)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/client')}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Switch to Client View
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
      <DashboardPage />
    </div>
  );
}
