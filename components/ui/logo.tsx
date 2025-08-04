"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isCollapsed?: boolean;
}

export function Logo({ className, isCollapsed = false }: LogoProps) {
  return (
    <motion.div
      className={cn(
        "relative flex items-center",
        isCollapsed ? "w-12 justify-center" : "gap-3 justify-start px-1",
        className
      )}
      initial={false}
      animate={{ 
        width: isCollapsed ? 48 : "auto",
      }}
    >
      {/* Logo Icon */}
      <motion.div
        className={cn(
          "relative overflow-hidden bg-black/20",
          isCollapsed ? "h-9 w-9 rounded-xl" : "h-12 w-12 rounded-xl"
        )}
        whileHover="hover"
        initial="initial"
        animate="initial"
        variants={{
          initial: {
            boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)"
          },
          hover: {
            boxShadow: "0 0 15px 0 rgba(59, 130, 246, 0.15)"
          }
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        {/* Dynamic Background with Code Execution Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600"
          variants={{
            initial: {
              backgroundPosition: "100% 0%",
            },
            hover: {
              backgroundPosition: "0% 0%",
            }
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
          style={{
            backgroundSize: "200% 100%"
          }}
        />

        {/* Code Execution Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "relative",
            isCollapsed ? "w-7 h-7" : "w-9 h-9"
          )}>
            {/* Base Code Structure */}
            <motion.div 
              className="absolute inset-0 border border-white/80 rounded"
              variants={{
                initial: { opacity: 0.8 },
                hover: { opacity: 1 }
              }}
            />
            
            {/* Animated Code Lines */}
            <motion.div 
              className={cn(
                "absolute inset-0",
                isCollapsed ? "p-[3px]" : "p-1.5"
              )}
              variants={{
                hover: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div
                className={cn(
                  "bg-white/90 rounded-full mb-[3px]",
                  isCollapsed ? "h-[1px] w-3/4" : "h-[1.5px] w-3/4"
                )}
                variants={{
                  initial: { opacity: 0.7 },
                  hover: { opacity: 1 }
                }}
              />
              <motion.div
                className={cn(
                  "bg-white/70 rounded-full mb-[3px]",
                  isCollapsed ? "h-[1px] w-1/2" : "h-[1.5px] w-1/2"
                )}
                variants={{
                  initial: { opacity: 0.5 },
                  hover: { opacity: 0.8 }
                }}
              />
              <motion.div
                className={cn(
                  "bg-white/90 rounded-full",
                  isCollapsed ? "h-[1px] w-2/3" : "h-[1.5px] w-2/3"
                )}
                variants={{
                  initial: { opacity: 0.7 },
                  hover: { opacity: 1 }
                }}
              />
            </motion.div>

            {/* Cursor Blink Effect */}
            <motion.div
              className={cn(
                "absolute bg-white",
                isCollapsed ? "right-[3px] top-[3px] h-1.5 w-[1px]" : "right-1.5 top-1.5 h-2 w-[1.5px]"
              )}
              variants={{
                initial: { opacity: 0 },
                hover: { 
                  opacity: [0, 1, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                  }
                }
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Logo Text */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -5 }}
          className="flex flex-col justify-center"
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="relative overflow-hidden"
          >
            <motion.span
              className="text-2xl font-[400] tracking-wide text-transparent font-geist"
              style={{
                background: "linear-gradient(to left, #60A5FA, #818CF8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundSize: "200% 100%",
                animation: "gradientShift 3s linear infinite"
              }}
            >
              affinity
            </motion.span>
            <motion.span
              className="text-2xl font-[400] text-blue-400 font-geist"
            >
              X
            </motion.span>
          </motion.div>
          <motion.span 
            className="text-xs text-white/50 font-geist font-[400] tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 0.1,
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            software solutions
          </motion.span>
        </motion.div>
      )}

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </motion.div>
  );
}
