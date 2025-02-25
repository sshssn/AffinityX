"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12"
};

export function Spinner({ className, size = "md", showText = false }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={cn(
            "border-2 border-t-indigo-600 dark:border-t-indigo-400 border-transparent rounded-full",
            sizes[size],
            className
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className={cn(
            "absolute inset-0.5 border-2 border-t-indigo-400 dark:border-t-indigo-300 border-transparent rounded-full",
            className
          )}
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity
          }}
        />

        {/* Glowing dot */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </div>

      {showText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-geist text-gray-600 dark:text-gray-300"
        >
          Loading...
        </motion.p>
      )}
    </div>
  );
} 