"use client";

import { useState, useEffect } from "react";
import { AppLoader } from "./app-loader";

export function RootLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 1.8 seconds (under 2 seconds as requested)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AppLoader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      {children}
    </>
  );
} 