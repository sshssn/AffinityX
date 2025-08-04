"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

export interface AuthUser {
  id: number;
  auth0_id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  isAuthenticated: boolean;
}

// Cache for auth state to prevent unnecessary API calls
let authCache: {
  user: AuthUser | null;
  timestamp: number;
  isValid: boolean;
} = {
  user: null,
  timestamp: 0,
  isValid: false
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isCheckingRef = useRef(false);

  const checkAuth = useCallback(async () => {
    // Prevent multiple simultaneous auth checks
    if (isCheckingRef.current) {
      return;
    }

    try {
      isCheckingRef.current = true;
      setError(null);

      // Check cache first
      const now = Date.now();
      if (authCache.isValid && (now - authCache.timestamp) < CACHE_DURATION) {
        setUser(authCache.user);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Check if user is authenticated via Auth0
      const response = await fetch('/api/auth/session', {
        cache: 'no-store' // Ensure fresh session data
      });

      if (!response.ok) {
        throw new Error(`Session check failed: ${response.status}`);
      }

      const sessionData = await response.json();
      
      if (sessionData.isAuthenticated && sessionData.user) {
        // Get or create user via API
        const userResponse = await fetch('/api/auth/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            auth0_id: sessionData.user.sub,
            email: sessionData.user.email,
            name: sessionData.user.name,
            picture: sessionData.user.picture,
            role: sessionData.role || 'client',
          }),
        });

        let dbUser;
        if (userResponse.ok) {
          dbUser = await userResponse.json();
        } else {
          // If API fails, create a basic user object
          dbUser = {
            id: 0,
            auth0_id: sessionData.user.sub,
            email: sessionData.user.email,
            name: sessionData.user.name,
            role: sessionData.role || 'client',
            avatar_url: sessionData.user.picture,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
        }

        const userWithAuth = {
          ...dbUser,
          isAuthenticated: true,
          role: dbUser.role,
        };

        // Update cache
        authCache = {
          user: userWithAuth,
          timestamp: now,
          isValid: true
        };

        setUser(userWithAuth);
      } else {
        // Update cache with null user
        authCache = {
          user: null,
          timestamp: now,
          isValid: true
        };
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed');
      setUser(null);
      
      // Invalidate cache on error
      authCache = {
        user: null,
        timestamp: 0,
        isValid: false
      };
    } finally {
      setLoading(false);
      isCheckingRef.current = false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []); // Remove checkAuth from dependencies to prevent infinite loops

  const logout = useCallback(async () => {
    try {
      setError(null);
      
      // Clear cache on logout
      authCache = {
        user: null,
        timestamp: 0,
        isValid: false
      };
      setUser(null);
      
      // Use GET request for logout
      window.location.href = '/api/auth/logout';
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed');
    }
  }, []);

  const refreshUser = useCallback(() => {
    // Invalidate cache and recheck
    authCache.isValid = false;
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    error,
    logout,
    refreshUser,
    isAuthenticated: !!user?.isAuthenticated,
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client',
  };
} 