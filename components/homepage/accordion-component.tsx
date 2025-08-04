"use client"
import { HelpCircle } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "motion/react"

const faqs = [
    {
        question: "What types of software development services do you offer?",
        answer: "We offer comprehensive software development services including web development, mobile apps (iOS/Android), cloud solutions, DevOps & hosting, security services, and end-to-end SaaS platform development. Our team specializes in modern technologies like Next.js, React, and scalable cloud architectures."
    },
    {
        question: "How does the client management and billing system work?",
        answer: "Our platform provides a complete client management system where you can track all your clients, manage billing cycles, generate invoices, and monitor project requests. Clients get their own portal to view invoices, submit feature requests, and track project progress in real-time."
    },
    {
        question: "What is included in your cloud solutions and DevOps services?",
        answer: "Our cloud solutions cover AWS, Azure, and GCP infrastructure setup with automated scaling, monitoring, and disaster recovery. DevOps services include CI/CD pipeline setup, container orchestration with Docker and Kubernetes, and managed hosting solutions for optimal performance and reliability."
    },
    {
        question: "How do you handle project communication and feature requests?",
        answer: "We provide a streamlined request management system where clients can submit feature requests and track their status. Our admin dashboard allows us to review, prioritize, and update request statuses. All communication is centralized and transparent for both parties."
    },
    {
        question: "What security measures do you implement in your applications?",
        answer: "We provide comprehensive security services including application security audits, penetration testing, and implementation of security best practices. All our applications follow OWASP guidelines, include proper authentication, and are built with security-first principles."
    },
    {
        question: "Can you help with existing applications or only build new ones?",
        answer: "We work with both new and existing applications. We can audit, refactor, and enhance existing codebases, migrate legacy systems to modern architectures, or build entirely new applications from scratch. Our team adapts to your specific needs and technical requirements."
    }
]

export function AccordionComponent() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* Pill badge */}
                    <div className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
                            <HelpCircle className="h-4 w-4" />
                            <span>FAQ</span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                        Everything you need to know about our software development services and platform. Can&apos;t find the answer you&apos;re looking for? Reach out to our team.
                    </p>
                </div>

                {/* Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index + 1}`}
                                className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 px-2"
                            >
                                <AccordionTrigger className="hover:no-underline py-4 px-2">
                                    <span className="font-medium text-left text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {faq.question}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-2 pb-4">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {faq.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    )
}
