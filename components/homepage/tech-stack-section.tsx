"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface IconProps {
  theme?: string;
}

export function TechStackSection() {
  const { theme } = useTheme();

  const techStack = [
    {
      title: "SwiftUI Development",
      description: "Native iOS development with modern declarative UI patterns.",
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
      description: "Cross-platform mobile development with native performance capabilities.",
      icon: <Image 
        src={theme === 'dark' ? "/Svg/React_wordmark_dark.svg" : "/Svg/React_wordmark_light.svg"}
        alt="React Native"
        width={64}
        height={64}
        className="object-contain"
      />,
      className: "col-span-1",
      header: "Mobile",
      gradient: "from-cyan-500/20 via-blue-400/20 to-cyan-300/20 dark:from-cyan-500/30 dark:via-blue-400/30 dark:to-cyan-300/30"
    },
    {
      title: "Flutter Framework",
      description: "Google's UI toolkit for beautiful cross-platform applications.",
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
      title: "Node.js Runtime",
      description: "Server-side JavaScript for scalable network applications.",
      icon: <Image 
        src="/Svg/nodejs.svg"
        alt="Node.js"
        width={64}
        height={64}
        className="object-contain"
      />,
      className: "md:col-span-1",
      header: "Server",
      gradient: "from-green-500/20 via-emerald-400/20 to-green-300/20 dark:from-green-500/30 dark:via-emerald-400/30 dark:to-green-300/30"
    },
    {
      title: "Python Backend",
      description: "Versatile server-side programming for AI and processing.",
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
      description: "Enterprise cloud infrastructure for scalable deployments.",
      icon: <Image 
        src={theme === 'dark' ? "/Svg/Amazon_Web_Services_dark.svg" : "/Svg/Amazon_Web_Services_light.svg"}
        alt="AWS"
        width={96}
        height={96}
        className="object-contain scale-110"
      />,
      className: "md:col-span-1",
      header: "Cloud",
      gradient: "from-orange-500/20 via-slate-400/20 to-orange-300/20 dark:from-orange-500/30 dark:via-slate-400/30 dark:to-orange-300/30"
    },

    // Tools & Services
    {
      title: "Clerk Auth",
      description: "Modern authentication system with seamless integration.",
      icon: <Image 
        src={theme === 'dark' ? "/Svg/Clerk_dark.svg" : "/Svg/Clerk_light.svg"}
        alt="Clerk"
        width={64}
        height={64}
        className="object-contain"
      />,
      className: "md:col-span-1",
      header: "Auth",
      gradient: "from-purple-500/20 via-indigo-400/20 to-blue-300/20 dark:from-purple-500/30 dark:via-indigo-400/30 dark:to-blue-300/30"
    },
    {
      title: "Supabase Platform",
      description: "Open-source backend platform with real-time capabilities.",
      icon: <Image 
      src="/Svg/supabase.svg"
      alt="Supabase"
        width={96}
        height={96}
        className="object-contain scale-110"
      />,
      className: "md:col-span-1",
      header: "Database",
      gradient: "from-emerald-500/20 via-green-400/20 to-emerald-300/20 dark:from-emerald-500/30 dark:via-green-400/30 dark:to-emerald-300/30"
    },
    {
      title: "PostHog Analytics",
      description: "Privacy-first analytics platform for product insights.",
      icon: <Image 
      src="/Svg/posthog.svg"
      alt="PostHog"
        width={96}
        height={96}
        className="object-contain scale-110"
      />,
      className: "md:col-span-1",
      header: "Analytics",
      gradient: "from-red-500/20 via-rose-400/20 to-red-300/20 dark:from-red-500/30 dark:via-rose-400/30 dark:to-red-300/30"
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
            className="text-lg font-geist text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Leveraging industry-leading technologies to deliver scalable, high-performance solutions. Built with security and user experience at its core.
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