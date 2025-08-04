"use client";

import BoxLoader from "./box-loader";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function Loading({ size = "md", text, className = "" }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className={size === "sm" ? "scale-[1.1]" : size === "lg" ? "scale-[1.5]" : "scale-[1.3]"}>
        <BoxLoader />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  );
}

export function PageLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading size="lg" text={text} />
    </div>
  );
}

export function SectionLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loading size="md" text={text} />
    </div>
  );
} 