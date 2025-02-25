"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const faqs = [
    {
        question: "Build faster with TheAffinityLabs?",
        answer: "Get up and running in no time with our enterprise-ready solutions and best practices. We handle the complexity so you can focus on your core business objectives."
    },
    {
        question: "How do we ensure scalability?",
        answer: "Our solutions are built with scalability in mind from day one. With built-in optimizations and robust architecture, your systems will be ready to handle increased demands and complexity."
    },
    {
        question: "What makes our approach different?",
        answer: "We focus on business outcomes rather than just technical solutions. By understanding your unique challenges, we deliver tailored solutions that drive real value and innovation."
    },
    {
        question: "How do we support your growth?",
        answer: "Through continuous optimization, proactive monitoring, and strategic planning, we ensure your systems evolve alongside your business needs, maintaining peak performance."
    },
    {
        question: "What technologies do we specialize in?",
        answer: "We excel in cutting-edge technologies including AI/ML, cloud architecture, enterprise software development, and digital transformation solutions, always aligned with industry best practices."
    }
];

export function FAQSection() {
    return (
        <section className="py-24 mb-32 relative overflow-hidden">
            {/* Frosted glass container with gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/30 to-teal-100/30 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-teal-900/30" />
                <div className="absolute inset-0 backdrop-blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="mx-auto w-fit rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-8">
                        <div className="flex items-center gap-2 text-sm font-geist font-medium text-indigo-600 dark:text-indigo-400">
                            <HelpCircle className="h-4 w-4" />
                            <span>FAQ</span>
                        </div>
                    </div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="font-geist text-4xl md:text-5xl font-light mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 dark:from-white dark:via-indigo-300 dark:to-white"
                    >
                        Common Questions.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg font-geist text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        Discover how TheAffinityLabs can transform your business through innovative technology solutions
                    </motion.p>
                </motion.div>

                <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/40 dark:bg-black/40 rounded-3xl p-6 border border-white/20 dark:border-white/10">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <AccordionItem 
                                    value={`item-${index}`} 
                                    className="relative bg-white/30 dark:bg-black/30 my-4 rounded-xl border-none overflow-hidden"
                                >
                                    <GlowingEffect
                                        spread={40}
                                        glow={true}
                                        disabled={false}
                                        proximity={64}
                                        inactiveZone={0.01}
                                        borderWidth={2}
                                    />
                                    <AccordionTrigger className="px-6 py-4 text-lg font-geist font-medium text-gray-900 dark:text-white hover:no-underline group">
                                        <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                            {item.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 font-geist text-gray-600 dark:text-gray-300">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
} 