"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useEffect, useState } from "react";

interface IconProps {
  theme?: string;
}

export function TechStackSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <div className="relative rounded-2xl">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              viewport={{ once: true }}
              className="font-geist text-4xl md:text-5xl font-light mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 dark:from-white dark:via-indigo-300 dark:to-white"
            >
              Powered by Innovation.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              viewport={{ once: true }}
              className="text-lg font-geist text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Leveraging industry-leading technologies to deliver scalable, high-performance solutions. Built with security and user experience at its core.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Placeholder cards while loading */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const techStack = [
    {
      title: "SwiftUI Development",
      description: "Deliver premium iOS experiences with native performance and Apple's latest design standards, ensuring your app feels natural and responsive on every device.",
      icon: <Image 
        src="/Svg/swift.svg"
        alt="SwiftUI"
        width={64}
        height={64}
        className="object-contain"
      />,
      className: "md:col-span-1",
      header: "iOS Native",
      gradient: "from-orange-500/20 via-red-400/20 to-pink-300/20"
    },
    {
      title: "React Native",
      description: "Build once, deploy everywhere. Create high-performance mobile apps for both iOS and Android with a single codebase, reducing development time and costs while maintaining native quality.",
      icon: mounted ? (
        <Image 
          src={theme === 'dark' ? "/Svg/React_wordmark_dark.svg" : "/Svg/React_wordmark_light.svg"}
          alt="React Native"
          width={64}
          height={64}
          className="object-contain"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      ),
      className: "col-span-1",
      header: "Mobile",
      gradient: "from-cyan-500/20 via-blue-400/20 to-cyan-300/20 dark:from-cyan-500/30 dark:via-blue-400/30 dark:to-cyan-300/30"
    },
    {
      title: "Flutter Framework",
      description: "Create stunning, pixel-perfect applications with Google's Flutter. Fast development cycles and beautiful animations that work seamlessly across all platforms.",
      icon: <Image 
        src="/Svg/flutter.svg"
        alt="Flutter"
        width={64}
        height={64}
        className="object-contain"
      />,
      className: "md:col-span-1",
      header: "Cross Platform",
      gradient: "from-blue-500/20 via-cyan-400/20 to-sky-300/20 dark:from-blue-500/30 dark:via-cyan-400/30 dark:to-sky-300/30"
    },

    // Backend & Infrastructure
    {
      title: "Next.js Framework",
      description: "Accelerate your web development with Next.js. Server-side rendering, automatic optimization, and seamless deployment ensure your applications load fast and scale effortlessly.",
      icon: mounted ? (
        <Image 
          src={theme === 'dark' ? "/Svg/Next.js_wordmark_dark.svg" : "/Svg/Next.js_wordmark_light.svg"}
          alt="Next.js"
          width={96}
          height={64}
          className="object-contain"
        />
      ) : (
        <div className="w-24 h-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      ),
      className: "md:col-span-1",
      header: "Framework",
      gradient: "from-gray-500/20 via-slate-400/20 to-gray-300/20 dark:from-gray-500/30 dark:via-slate-400/30 dark:to-gray-300/30"
    },
    {
      title: "Python Backend",
      description: "Powerful backend solutions with Python. From AI integration to data processing, we leverage Python's ecosystem to build intelligent, scalable systems that grow with your business.",
      icon: <Image 
        src="/Svg/python.svg"
        alt="Python"
        width={64}
        height={64}
        className="object-contain"
      />,
      className: "md:col-span-1",
      header: "Backend",
      gradient: "from-blue-500/20 via-yellow-400/20 to-blue-300/20 dark:from-blue-500/30 dark:via-yellow-400/30 dark:to-blue-300/30"
    },
    {
      title: "AWS Cloud",
      description: "Enterprise-grade cloud infrastructure that scales with your business. From global CDN to auto-scaling databases, we ensure your applications are always available and performant.",
      icon: mounted ? (
        <Image 
          src={theme === 'dark' ? "/Svg/Amazon_Web_Services_dark.svg" : "/Svg/Amazon_Web_Services_light.svg"}
          alt="AWS"
          width={96}
          height={96}
          className="object-contain scale-110"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      ),
      className: "md:col-span-1",
      header: "Cloud",
      gradient: "from-orange-500/20 via-slate-400/20 to-orange-300/20 dark:from-orange-500/30 dark:via-slate-400/30 dark:to-orange-300/30"
    },

    // Tools & Services

    {
      title: "Convex Platform",
      description: "Real-time data synchronization and serverless functions that keep your applications responsive and up-to-date. Perfect for collaborative features and live updates.",
      icon: mounted ? (
        <Image 
          src={theme === 'dark' ? "/Svg/Convex_wordmark_dark.svg" : "/Svg/Convex_wordmark_light.svg"}
          alt="Convex"
          width={96}
          height={64}
          className="object-contain"
        />
      ) : (
        <div className="w-24 h-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      ),
      className: "md:col-span-1",
      header: "Database",
      gradient: "from-emerald-500/20 via-green-400/20 to-emerald-300/20 dark:from-emerald-500/30 dark:via-green-400/30 dark:to-emerald-300/30"
    },
    {
      title: "PostHog Analytics",
      description: "Privacy-first analytics that help you understand user behavior and optimize your product. Make data-driven decisions while respecting user privacy and compliance requirements.",
      icon: <Image 
        src="/Svg/posthog.svg"
        alt="PostHog"
        width={50}
        height={30}
        className="object-contain"
      />,
      className: "md:col-span-1",
      header: "Analytics",
      gradient: "from-red-500/20 via-rose-400/20 to-red-300/20 dark:from-red-500/30 dark:via-rose-400/30 dark:to-red-300/30"
    },
    {
      title: "Neon Database",
      description: "Serverless Postgres that scales automatically with your needs. Database branching for safe development and zero-downtime deployments that keep your business running smoothly.",
      icon: <Image 
        src="/Svg/neon.svg"
        alt="Neon"
        width={64}
        height={64}
        className="object-contain"
      />,
      className: "md:col-span-1",
      header: "Database",
      gradient: "from-blue-500/20 via-cyan-400/20 to-blue-300/20 dark:from-blue-500/30 dark:via-cyan-400/30 dark:to-blue-300/30"
    }
  ];

  return (
    <div className="relative rounded-2xl">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            viewport={{ once: true }}
            className="font-geist text-4xl md:text-5xl font-light mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 dark:from-white dark:via-indigo-300 dark:to-white"
          >
            Powered by Innovation.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            viewport={{ once: true }}
            className="text-lg font-geist text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
                          Our technology stack is carefully curated to deliver exceptional results. We don&apos;t just use the latest tools—we master them to create solutions that give your business a competitive edge. From lightning-fast web applications to intelligent mobile experiences, every technology choice is made with your success in mind.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techStack.map((item, i) => (
            <motion.div
              key={i}
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
                item.className
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-20",
                item.gradient
              )} />
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="font-mono text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {item.header}
                  </div>
                  <div className="font-geist text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </div>
                </div>
              </div>
              <div className="font-normal text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 