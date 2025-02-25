"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const logos = [
  {
    light: "/Svg/React_wordmark_light.svg",
    dark: "/Svg/React_wordmark_dark.svg",
    alt: "React"
  },
  {
    light: "/Svg/nodejs.svg",
    dark: "/Svg/nodejs.svg", 
    alt: "Node.js"
  },
  {
    light: "/Svg/python.svg",
    dark: "/Svg/python.svg",
    alt: "Python"
  },
  {
    light: "/Svg/swift.svg",
    dark: "/Svg/swift.svg",
    alt: "Swift"
  },
  {
    light: "/Svg/flutter.svg",
    dark: "/Svg/flutter.svg",
    alt: "Flutter"
  },
  {
    light: "/Svg/tailwindcss.svg",
    dark: "/Svg/tailwindcss.svg",
    alt: "Tailwind CSS"
  }
];

export function TestimonialsSection() {
  const { theme } = useTheme();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* RGB Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/2 top-0 w-full h-full animate-pulse-slow">
          <div className="w-full h-full bg-[radial-gradient(circle,#dd7bbb_10%,#dd7bbb00_40%)] blur-3xl transform-gpu" />
        </div>
        <div className="absolute -right-1/2 top-1/3 w-full h-full animate-pulse-slow delay-300">
          <div className="w-full h-full bg-[radial-gradient(circle,#5a922c_10%,#5a922c00_40%)] blur-3xl transform-gpu" />
        </div>
        <div className="absolute left-1/4 bottom-0 w-full h-full animate-pulse-slow delay-500">
          <div className="w-full h-full bg-[radial-gradient(circle,#4c7894_10%,#4c789400_40%)] blur-3xl transform-gpu" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative h-12 flex items-center justify-center"
            >
              <Image
                src={theme === 'dark' ? logo.dark : logo.light}
                alt={logo.alt}
                className="max-h-full w-auto object-contain"
                width={120}
                height={48}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 