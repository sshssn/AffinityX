"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export function Logo() {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark' ? '/brand/dark.png' : '/brand/light.png';

  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-auto h-8 transform-gpu"
        style={{ perspective: "1000px" }}
      >
        <Image
          src={logoSrc}
          alt="TheAffinityLabs Logo"
          width={32}
          height={32}
          className="w-auto h-full"
          priority
        />
      </motion.div>
      <motion.span 
        className="text-xl font-semibold text-gray-900 dark:text-white"
        whileHover={{ scale: 1.02 }}
      >
        TheAffinityLabs
      </motion.span>
    </Link>
  );
}

export function LogoIcon() {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark' ? '/brand/dark.png' : '/brand/light.png';

  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      <Image
        src={logoSrc}
        alt="TheAffinityLabs Logo"
        width={180}
        height={180}
        className="object-contain"
        priority
      />
    </div>
  );
}
