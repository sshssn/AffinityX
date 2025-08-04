'use client';

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  isOptimized: boolean;
}

export const usePerformance = (targetFPS: number = 60) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    isOptimized: false,
  });
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const frameTimes = useRef<number[]>([]);

  useEffect(() => {
    let animationId: number;

    const measurePerformance = (currentTime: number) => {
      const deltaTime = currentTime - lastTime.current;
      lastTime.current = currentTime;

      frameCount.current++;
      frameTimes.current.push(deltaTime);

      // Keep only the last 60 frame times for averaging
      if (frameTimes.current.length > 60) {
        frameTimes.current.shift();
      }

      // Calculate FPS and frame time every second
      if (frameCount.current % 60 === 0) {
        const avgFrameTime = frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
        const currentFPS = 1000 / avgFrameTime;
        const isOptimized = currentFPS >= targetFPS * 0.95; // Allow 5% tolerance

        setMetrics({
          fps: Math.round(currentFPS),
          frameTime: Math.round(avgFrameTime),
          isOptimized,
        });
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [targetFPS]);

  return metrics;
};

// Performance optimization utilities
export const optimizeFor60FPS = () => {
  // Disable animations on low-end devices
  const isLowEndDevice = () => {
    const memory = (navigator as any).deviceMemory || 4;
    const cores = (navigator as any).hardwareConcurrency || 4;
    return memory < 4 || cores < 4;
  };

  // Reduce animation complexity on low-end devices
  if (isLowEndDevice()) {
    document.documentElement.style.setProperty('--animation-complexity', '0.5');
    document.documentElement.style.setProperty('--particle-count', '50');
  } else {
    document.documentElement.style.setProperty('--animation-complexity', '1');
    document.documentElement.style.setProperty('--particle-count', '100');
  }

  // Enable hardware acceleration
  const style = document.createElement('style');
  style.textContent = `
    * {
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
    
    canvas {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  `;
  document.head.appendChild(style);
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  }) as T;
}; 