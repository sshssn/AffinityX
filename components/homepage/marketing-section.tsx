"use client";

import { motion } from "motion/react";
import { ArrowRight, Code2, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function MarketingSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose TheAffinityLabs
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empowering your digital presence with innovation and expertise. We deliver cutting-edge solutions that transform ideas into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Custom Software Solutions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We create functional and intuitive interfaces and applications that scale with your business. From web apps to mobile solutions, we build software that drives growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Performance Optimization
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Boost productivity and optimize workflows with our powerful automation tools. We ensure your applications run at peak efficiency with robust backend solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
          >
            <div className="w-12 h-12 rounded-lg bg-teal-600 text-white flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Scalable Architecture
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Build for the future with our scalable architecture solutions. We design systems that grow with your needs, ensuring long-term success and reliability.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
