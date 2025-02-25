"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion";

const faqItems = [
    {
        question: "What services does TheAffinityLabs offer?",
        answer: "We specialize in enterprise software solutions, AI integration, cloud architecture, and digital transformation services. Our team delivers custom solutions tailored to your business needs."
    },
    {
        question: "How does your AI integration process work?",
        answer: "We follow a systematic approach: initial assessment, custom model development, seamless integration with existing systems, and continuous optimization to ensure maximum business value."
    },
    {
        question: "What makes TheAffinityLabs different?",
        answer: "Our unique blend of cutting-edge technology expertise, industry experience, and commitment to innovation sets us apart. We focus on delivering scalable, future-proof solutions."
    },
    {
        question: "How do you ensure project success?",
        answer: "We employ agile methodologies, maintain transparent communication, and follow industry best practices. Our proven track record demonstrates our commitment to delivering exceptional results."
    },
    {
        question: "What industries do you serve?",
        answer: "We work across various sectors including finance, healthcare, retail, and manufacturing. Our solutions are adaptable to any industry's specific requirements."
    }
];

export function FAQ() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/50 to-gray-50/0 dark:from-gray-900/0 dark:via-gray-900/50 dark:to-gray-900/0" />
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get answers to common questions about TheAffinityLabs' services and solutions. 
                        Need more information? Contact our team for personalized assistance.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <AccordionItem value={`item-${index}`} className="frost-glass-card my-4 rounded-xl border-none">
                                    <AccordionTrigger className="px-6 py-4 text-lg font-medium text-gray-900 dark:text-white hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
