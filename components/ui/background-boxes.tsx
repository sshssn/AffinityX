"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  // Responsive grid size
  const rows = new Array(50).fill(1); // Reduced for better performance
  const cols = new Array(30).fill(1); // Reduced for better performance

  // Brighter colors for better visibility on black
  const colors = [
    "rgb(167 139 250)", // purple-400
    "rgb(139 92 246)", // purple-500
    "rgb(147 197 253)", // blue-300
    "rgb(196 181 253)", // violet-300
    "rgb(216 180 254)", // purple-300
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scale(0.6) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/2 top-1/2 flex w-full h-full z-0 opacity-40 sm:opacity-60",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-8 h-8 sm:w-16 sm:h-8 border-l border-purple-500/5 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 0.15, 0.1],
                transition: { 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
              }}
              key={`col` + j}
              className="w-8 h-8 sm:w-16 sm:h-8 border-r border-t border-purple-500/5 relative backdrop-blur-sm"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-4 w-8 sm:h-6 sm:w-10 -top-[14px] -left-[22px] text-purple-500/5 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore); 