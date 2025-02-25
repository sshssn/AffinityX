"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type MenuItem = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type MenuSection = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
};

interface CustomNavigationMenuProps {
  sections: MenuSection[];
}

export function CustomNavigationMenu({ sections }: CustomNavigationMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (title: string) => {
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="relative z-50" onMouseLeave={handleMouseLeave}>
      <ul className="flex items-center gap-4">
        {sections.map((section) => (
          <li
            key={section.title}
            className="relative"
            onMouseEnter={() => handleMouseEnter(section.title)}
          >
            <button
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeMenu === section.title
                  ? "bg-white/10 text-primary"
                  : "hover:bg-white/5"
              )}
            >
              <section.icon className="w-4 h-4" />
              <span>{section.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  activeMenu === section.title ? "rotate-180" : ""
                )}
              />
            </button>

            <AnimatePresence>
              {activeMenu === section.title && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-[400px] frost-glass-dropdown"
                  style={{ zIndex: 9999 }}
                >
                  <div className="grid grid-cols-1 gap-3 p-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="frost-glass-item flex items-start gap-3 p-3 transition-all duration-150"
                      >
                        {item.icon && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 dark:bg-primary/5">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
                          {item.description && (
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
} 