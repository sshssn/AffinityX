"use client"

import { motion } from 'framer-motion';
import { Boxes } from '../ui/background-boxes';
import Link from 'next/link';
import { RetroGrid } from '../ui/retro-grid';

export default function Footer() {
    return (
        <>
            {/* Page-end separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            
            <footer className="relative overflow-hidden bg-white dark:bg-black min-h-[120px] sm:min-h-[160px] flex items-center justify-center py-8 sm:py-12">
                {/* Retro grid background */}
                <RetroGrid 
                    className="dark:opacity-40 opacity-25" 
                    containerClassName="absolute inset-0 w-full h-full" 
                />
                
                {/* Background effect */}
                <div className="absolute inset-0 w-full h-full dark:bg-black z-20 [mask-image:radial-gradient(transparent,black)] pointer-events-none opacity-90 sm:opacity-95 dark:block hidden" />
                <Boxes />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white to-white/0 dark:from-black dark:to-black/0" />

                <div className="relative z-30 w-full px-4 sm:px-6">
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                        {/* Essential Links */}
                        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-1">About</Link>
                            <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-1">Contact</Link>
                            <Link href="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-1">Privacy</Link>
                            <Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-1">Terms</Link>
                        </div>

                        {/* Copyright */}
                        <div className="relative w-fit group">
                            <div className="absolute -inset-1.5 opacity-75 rounded-lg blur-lg transition-all duration-500 group-hover:opacity-100">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-lg animate-glow-slow"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-purple-500/20 rounded-lg animate-glow-slow-delayed"></div>
                            </div>

                            <div className="frost-glass-card relative px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg backdrop-blur-xl">
                                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs font-geist">
                                    <span className="text-gray-600 dark:text-gray-300">
                                        <span className="font-medium">©</span> {new Date().getFullYear()}
                                    </span>
                                    <div className="h-2.5 sm:h-3 w-[1px] bg-gradient-to-b from-purple-500/30 via-blue-500/30 to-pink-500/30" />
                                    <div className="flex items-center">
                                        <span className="text-gray-600 dark:text-gray-300">
                                            AffinityX<sup className="text-[0.5rem] font-medium ml-0.5">TM</sup>
                                        </span>
                                        <span className="inline-flex items-center justify-center px-1 py-[1px] text-[0.45rem] rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-medium translate-y-[-1px] ml-1">
                                            v0.1
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
