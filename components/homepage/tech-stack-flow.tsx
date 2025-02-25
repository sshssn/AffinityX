"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const flowSections = [
  {
    title: "Frontend",
    items: ["React Native", "Flutter", "SwiftUI", "Tailwind CSS"],
    color: "from-blue-500/20 via-indigo-400/20 to-purple-300/20"
  },
  {
    title: "Authentication",
    items: ["Clerk Auth", "JWT", "OAuth 2.0"],
    color: "from-purple-500/20 via-violet-400/20 to-fuchsia-300/20"
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "Supabase"],
    color: "from-emerald-500/20 via-green-400/20 to-teal-300/20"
  },
  {
    title: "Infrastructure",
    items: ["AWS Cloud", "Google Cloud", "CI/CD"],
    color: "from-orange-500/20 via-amber-400/20 to-yellow-300/20"
  }
];

export function TechStackFlow() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
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
            Tech Stack.
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
            Modern, scalable technologies powering next-generation solutions.
          </motion.p>
        </div>

        <div className="grid gap-6">
          {flowSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`relative p-6 rounded-xl bg-gradient-to-r ${section.color} backdrop-blur-sm border border-neutral-200 dark:border-neutral-800`}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {section.title}
                </h3>
                {idx < flowSections.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-neutral-400 rotate-90 md:rotate-0" />
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-sm rounded-full bg-white/50 dark:bg-black/50 text-neutral-700 dark:text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 