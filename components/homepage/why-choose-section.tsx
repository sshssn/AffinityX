"use client";

import { 
  CommandLineIcon, 
  CpuChipIcon, 
  CloudArrowUpIcon, 
  CircleStackIcon, 
  ChartBarSquareIcon, 
  ShieldCheckIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const features = [
  // Development Excellence
  {
    title: "Full-Stack Development",
    description: "Expert development across mobile, web, and backend. Building seamless experiences with modern tech stacks.",
    icon: <CommandLineIcon className="w-8 h-8 text-blue-500" />,
    className: "col-span-1 md:col-span-2",
    header: "Development",
    gradient: "from-blue-500/20 via-indigo-400/20 to-blue-300/20"
  },
  {
    title: "AI Integration",
    description: "Advanced AI/ML solutions with NLP capabilities. Intelligent automation and predictive analytics.",
    icon: <CpuChipIcon className="w-8 h-8 text-purple-500" />,
    className: "col-span-1",
    header: "Intelligence",
    gradient: "from-purple-500/20 via-purple-400/20 to-purple-300/20"
  },
  {
    title: "Cloud Architecture",
    description: "Scalable infrastructure with multi-cloud support. Optimized for performance and reliability.",
    icon: <CloudArrowUpIcon className="w-8 h-8 text-emerald-500" />,
    className: "col-span-1",
    header: "Infrastructure",
    gradient: "from-emerald-500/20 via-emerald-400/20 to-emerald-300/20"
  },

  // Business Solutions
  {
    title: "Enterprise Systems",
    description: "Custom software tailored for enterprise needs.\nFrom ERP systems to workflow automation.",
    icon: <CircleStackIcon className="w-8 h-8 text-orange-500" />,
    className: "col-span-1 md:col-span-2",
    header: "Solutions",
    gradient: "from-orange-500/20 via-orange-400/20 to-orange-300/20"
  },
  {
    title: "Data Analytics",
    description: "Real-time business insights.\nCustom dashboards and reporting.",
    icon: <ChartBarSquareIcon className="w-8 h-8 text-indigo-500" />,
    className: "md:col-span-1",
    header: "Analytics",
    gradient: "from-indigo-500/20 via-indigo-400/20 to-indigo-300/20"
  },
  {
    title: "Security First",
    description: "Enterprise-grade security.\nCompliance and threat protection.",
    icon: <ShieldCheckIcon className="w-8 h-8 text-rose-500" />,
    className: "md:col-span-1",
    header: "Security",
    gradient: "from-rose-500/20 via-rose-400/20 to-rose-300/20"
  },
  {
    title: "Process Automation",
    description: "Streamlined workflows.\nIntelligent business automation.",
    icon: <CogIcon className="w-8 h-8 text-fuchsia-500" />,
    className: "md:col-span-1",
    header: "Automation",
    gradient: "from-fuchsia-500/20 via-fuchsia-400/20 to-fuchsia-300/20"
  }
];

export function WhyChooseSection() {
  return (
    <section id="why-choose-section" className="py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-block backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-2xl p-8 border border-purple-200/20 dark:border-purple-800/20 shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
            {/* Shine sweep effect */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full duration-1000 ease-in-out transform" />
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-purple-500/10 blur-xl" />
            
            {/* GlowingEffect component */}
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={80}
              inactiveZone={0.01}
              borderWidth={2}
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 font-geist text-4xl md:text-6xl font-bold mb-6 tracking-tighter group-hover:scale-[1.02] transition-all duration-500 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-400 dark:from-indigo-300 dark:via-purple-200 dark:to-indigo-400"
            >
              AffinityX
              <sup className="text-sm font-medium tracking-normal ml-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-300 dark:to-indigo-300 group-hover:text-opacity-90">
                TM
              </sup>
            </motion.h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-purple-500/20 to-transparent group-hover:w-40 group-hover:via-purple-500/40 transition-all duration-500"
            />
          </div>
          <div className="space-y-4 mt-8">
            <p className="text-lg font-geist text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced software engineering and cloud-native solutions. From microservices architecture to AI-driven development.
            </p>
            <p className="text-base font-geist text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Delivering enterprise-grade applications with modern tech stacks.
            </p>
          </div>
        </div>

        <BentoGrid>
          {features.map((item, i) => (
            <BentoGridItem
              key={i}
              {...item}
              color="white"
              icon={
                <div className="p-3 w-20 h-20 rounded-2xl bg-black/40 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                  {/* RGB glow effect behind icon */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
                  </div>
                  {item.icon}
                </div>
              }
              className={cn(
                item.className,
                "backdrop-blur-xl backdrop-saturate-150 bg-black/40 border-neutral-800/50"
              )}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
} 