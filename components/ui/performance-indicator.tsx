'use client';

import React from 'react';
import { usePerformance } from '@/hooks/use-performance';

interface PerformanceIndicatorProps {
  show?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  show = false,
  position = 'top-right'
}) => {
  const { fps, frameTime, isOptimized } = usePerformance(60);

  if (!show) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div className={`fixed z-50 ${positionClasses[position]} bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-xs font-mono`}>
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOptimized ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <span className="font-semibold">Performance</span>
        </div>
        <div className="space-y-0.5">
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={isOptimized ? 'text-green-400' : 'text-red-400'}>
              {fps}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Frame:</span>
            <span className={frameTime < 16.67 ? 'text-green-400' : 'text-yellow-400'}>
              {frameTime}ms
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={isOptimized ? 'text-green-400' : 'text-red-400'}>
              {isOptimized ? 'Optimized' : 'Needs Optimization'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 