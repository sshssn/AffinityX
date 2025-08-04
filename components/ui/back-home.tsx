"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackHomeProps {
  className?: string;
}

export const BackHome: React.FC<BackHomeProps> = ({ className = "" }) => {
  return (
    <div className={`fixed top-6 left-6 z-50 ${className}`}>
      <Link href="/dashboard">
        <div className="frost-glass flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 group">
          <ArrowLeft className="h-4 w-4 text-foreground/80 group-hover:text-foreground transition-colors" />
          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
            Back to Dashboard
          </span>
        </div>
      </Link>
    </div>
  );
}; 