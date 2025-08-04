"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppLoader } from '../ui/app-loader';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
  loadingText: string;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const showLoading = (text: string = '') => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingText('');
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, loadingText }}>
      {children}
      {isLoading && (
        <AppLoader isLoading={isLoading} onComplete={hideLoading} maxDuration={1800} />
      )}
    </LoadingContext.Provider>
  );
} 