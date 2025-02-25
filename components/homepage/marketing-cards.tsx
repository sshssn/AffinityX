"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Cloud,
  Globe2,
  Layers,
  Smartphone,
  Shield,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const ServicesData = [
  {
    id: 1,
    name: "Enterprise Solutions",
    description:
      "Scalable, secure, and customized software solutions engineered for enterprise-level performance.",
    icon: Layers,
    color: "from-blue-400/40 to-indigo-400/40",
    link: "/services/enterprise"
  },
  {
    id: 2,
    name: "Cloud Architecture",
    description:
      "Cloud-native solutions with modern infrastructure designed for scalability and reliability.",
    icon: Cloud,
    color: "from-indigo-400/40 to-purple-400/40",
    link: "/services/cloud"
  },
  {
    id: 3,
    name: "System Integration",
    description:
      "Seamless integration services that connect your existing systems with cutting-edge solutions.",
    icon: Cpu,
    color: "from-purple-400/40 to-pink-400/40",
    link: "/services/integration"
  }
];

export default function MarketingCards() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/50 to-gray-50/0 dark:from-gray-900/0 dark:via-gray-900/50 dark:to-gray-900/0" />
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
              Our Services.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Transforming businesses through innovative technology solutions and unparalleled expertise.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ServicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={service.link}>
                <div className="frost-glass-card rounded-2xl p-8 h-full hover:scale-[1.02] transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${service.color} blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-xl frost-glass">
                      <service.icon className="w-7 h-7 text-gray-800 dark:text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
