"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "large" | "small";
  highlighted?: boolean;
  interactive?: boolean;
  href?: string;
  onClick?: () => void;
}

export function BentoCard({
  children,
  className,
  size = "default",
  highlighted = false,
  interactive = true,
  href,
  onClick,
  ...props
}: BentoCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  const variants = {
    initial: { 
      scale: 1,
      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)"
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 0 20px 0 rgba(255, 255, 255, 0.1)"
    },
    tap: {
      scale: 0.98,
    }
  };

  return (
    <motion.div
      variants={interactive ? variants : undefined}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/[0.02] dark:bg-black/[0.02]",
        "backdrop-blur-md",
        "border-[0.5px] border-white/[0.05] dark:border-white/[0.02]",
        highlighted && "bg-white/[0.05] border-white/[0.08]",
        size === "small" && "p-4",
        size === "default" && "p-6",
        size === "large" && "p-8",
        (interactive && (href || onClick)) && "cursor-pointer",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "compact";
}

export function BentoGrid({ 
  children, 
  className,
  variant = "default",
  ...props 
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        variant === "default" && "md:grid-cols-2 lg:grid-cols-3",
        variant === "compact" && "md:grid-cols-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 