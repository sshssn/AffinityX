"use client";

import { useState, useEffect } from 'react';
import BoxLoader from './box-loader';

interface AppLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  maxDuration?: number;
}

export function AppLoader({ isLoading, onComplete, maxDuration = 1800 }: AppLoaderProps) {
  const [shouldShow, setShouldShow] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShouldShow(true);
    } else {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShouldShow(false);
        onComplete?.();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  useEffect(() => {
    // Auto-hide after max duration
    if (isLoading && maxDuration > 0) {
      const timer = setTimeout(() => {
        setShouldShow(false);
        onComplete?.();
      }, maxDuration);
      return () => clearTimeout(timer);
    }
  }, [isLoading, maxDuration, onComplete]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Loader content */}
      <div className="relative z-10 scale-[1.3]">
        <BoxLoader />
      </div>
    </div>
  );
} 