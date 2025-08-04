"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        "max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  gradient,
  color,
}: {
  title: string;
  description: string;
  header: string;
  icon: React.ReactNode;
  className?: string;
  gradient: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden",
        "rounded-xl hover:shadow-xl transition duration-200",
        "bg-white/[0.7] dark:bg-neutral-900/[0.7]",
        "border border-neutral-200 dark:border-neutral-800",
        "backdrop-blur-xl backdrop-saturate-150",
        "p-6",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-20",
        gradient
      )} />
      
      <div className="flex items-center gap-4 mb-4">
        <div className={color}>{icon}</div>
        <div className="font-mono text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {header}
        </div>
      </div>
      
      <div className="font-geist text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        {title}
      </div>
      
      <div className="font-normal text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
        {description}
      </div>
    </motion.div>
  );
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-gray-50/50 backdrop-blur-xl border border-gray-100",
      // dark styles
      "dark:bg-gray-800/50 dark:border-gray-700/50",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>

    <div className={cn(
      "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
    )}>
      <Button variant="ghost" asChild className="pointer-events-auto">
        <a href={href} className="text-primary">
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-gray-100/50 dark:group-hover:bg-gray-700/50" />
  </div>
);

export { BentoCard }; 