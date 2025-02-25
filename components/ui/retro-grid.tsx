"use client";

import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  containerClassName?: string;
}

export const RetroGrid = ({
  className,
  containerClassName,
}: RetroGridProps) => {
  return (
    <div className={cn("relative w-full h-full", containerClassName)}>
      <div
        className={cn(
          "absolute h-full w-full",
          "[background-image:linear-gradient(var(--grid-color)_0.5px,_transparent_0.5px),linear-gradient(to_right,var(--grid-color)_0.5px,transparent_0.5px)] dark:[background-image:linear-gradient(#ffffff10_0.5px,_transparent_0.5px),linear-gradient(to_right,#ffffff10_0.5px,transparent_0.5px)]",
          "[background-size:20px_20px]",
          "opacity-[0.2]",
          className
        )}
        style={{
          "--grid-color": "rgba(0,0,0,0.1)",
        } as React.CSSProperties}
      />
    </div>
  );
}; 