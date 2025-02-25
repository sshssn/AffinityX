"use client";

import { motion } from "framer-motion";
import { 
  Smartphone, 
  Globe, 
  Cloud, 
  Server, 
  ShieldCheck, 
  Boxes
} from 'lucide-react';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

const services = [
  {
    title: "Mobile Development",
    description: "Native iOS and Android apps with cutting-edge technologies. Focus on performance and exceptional user experience.",
    icon: <Smartphone className="h-8 w-8" />,
    header: "Mobile",
    className: "col-span-1",
    color: "text-blue-500",
    gradient: "from-blue-500/20 via-blue-400/20 to-blue-300/20"
  },
  {
    title: "Web Development",
    description: "Modern web applications using Next.js and React. Responsive designs with Tailwind CSS and advanced animations.",
    icon: <Globe className="h-8 w-8" />,
    header: "Web",
    className: "col-span-1",
    color: "text-purple-500",
    gradient: "from-purple-500/20 via-purple-400/20 to-purple-300/20"
  },
  {
    title: "Cloud Solutions",
    description: "AWS, Azure, and GCP infrastructure setup. Automated scaling, monitoring, and disaster recovery systems.",
    icon: <Cloud className="h-8 w-8" />,
    header: "Cloud",
    className: "col-span-1",
    color: "text-emerald-500",
    gradient: "from-emerald-500/20 via-emerald-400/20 to-emerald-300/20"
  },
  {
    title: "DevOps & Hosting",
    description: "CI/CD pipeline setup and container orchestration. Docker, Kubernetes, and managed hosting solutions.",
    icon: <Server className="h-8 w-8" />,
    header: "DevOps",
    className: "col-span-1",
    color: "text-rose-500",
    gradient: "from-rose-500/20 via-rose-400/20 to-rose-300/20"
  },
  {
    title: "Security Services",
    description: "Application security audits and penetration testing. Implementation of security best practices and compliance.",
    icon: <ShieldCheck className="h-8 w-8" />,
    header: "Security",
    className: "col-span-1",
    color: "text-teal-500",
    gradient: "from-teal-500/20 via-teal-400/20 to-teal-300/20"
  },
  {
    title: "SaaS Development",
    description: "End-to-end SaaS platform development. Subscription management and scalable architectures.",
    icon: <Boxes className="h-8 w-8" />,
    header: "SaaS",
    className: "col-span-1",
    color: "text-orange-500",
    gradient: "from-orange-500/20 via-orange-400/20 to-orange-300/20"
  }
];

export const metadata: Metadata = {
  title: 'Our Services - Enterprise Software Solutions',
  description: 'Advanced software engineering and cloud-native solutions. From microservices architecture to AI-driven development.',
};

export function OurServicesSection() {
  return (
    <section className="py-20 px-4" aria-label="Our Services">
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
            Our Services
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
            Advanced software engineering and cloud-native solutions. From microservices architecture to AI-driven development.
          </motion.p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto backdrop-blur-md bg-white/40 dark:bg-black/40 rounded-3xl p-6 border border-white/20 dark:border-white/10">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((item, i) => (
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
                  <div className={item.color}>{item.icon}</div>
                  <div className="font-mono text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {item.header}
                  </div>
                </div>
                
                <div className="font-geist text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {item.title}
                </div>
                
                <div className="font-normal text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 