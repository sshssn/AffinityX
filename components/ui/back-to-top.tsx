"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Check } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after 400px
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }

      // Calculate scroll progress
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Handle completion state
      if (scrolled > 98) {
        setIsComplete(true);
        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1500); // Reset to arrow after 1.5s
      } else {
        setIsComplete(false);
        setShowCheck(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Confetti particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    rotate: (360 / 8) * i,
    x: Math.cos((2 * Math.PI * i) / 8) * 20,
    y: Math.sin((2 * Math.PI * i) / 8) * 20,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full 
            bg-white dark:bg-neutral-900 shadow-lg dark:shadow-indigo-500/20
            border border-neutral-200 dark:border-neutral-800
            backdrop-blur-sm backdrop-saturate-150
            hover:shadow-xl hover:scale-110
            transition-all duration-300 ease-out
            group"
        >
          <div className="relative">
            {/* Progress Circle */}
            <svg
              className="w-8 h-8 transform -rotate-90"
              viewBox="0 0 32 32"
            >
              <motion.circle
                className="stroke-current text-neutral-200 dark:text-neutral-800"
                fill="none"
                strokeWidth="2"
                cx="16"
                cy="16"
                r="14"
              />
              <motion.circle
                className="stroke-current text-indigo-500 dark:text-indigo-400"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                cx="16"
                cy="16"
                r="14"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: scrollProgress / 100 }}
                style={{
                  filter: "drop-shadow(0 0 2px rgba(99, 102, 241, 0.4))"
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut"
                }}
              />
            </svg>

            {/* Confetti Effect */}
            <AnimatePresence>
              {isComplete && (
                <>
                  {particles.map((particle, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: 1,
                        opacity: 0,
                        x: particle.x,
                        y: particle.y,
                        rotate: particle.rotate
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                      className="absolute top-1/2 left-1/2 w-1 h-3 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full"
                      style={{
                        transformOrigin: "center"
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showCheck ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="arrow"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUp className="w-4 h-4 text-neutral-600 dark:text-neutral-300 
                      group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                      transition-colors duration-200" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-400/20 
              rounded-full blur-xl scale-150 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300" 
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 