"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog } from "@radix-ui/react-dialog";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Sparkles, 
  Cpu,
  BookOpen,
  Building2,
  Github,
  LogIn,
  Menu,
  Beaker,
  LayoutDashboard,
  BookMarked,
  FileCode2,
  RocketIcon,
  Twitter,
  Youtube,
  Info,
  Brain,
  Puzzle,
  FileText,
  Webhook,
  BarChart3,
  Lightbulb,
  Cloud,
  Layers,
  Zap,
  MessageSquare,
  Settings,
  Users,
  Database,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import ModeToggle from "../mode-toggle";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";
import { Logo, LogoIcon } from "../ui/logo";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import styles from "@/styles/frost-glass.module.css";
import { CustomNavigationMenu } from "@/components/ui/custom-navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "AI Playground",
    href: "/playground",
    description: "Interact with the AI in the playground.",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Access your personal dashboard.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read my interesting blog posts.",
  },
];

const navigationItems = {
  aiTools: [
    {
      title: "AI Playground",
      href: "/playground",
      description: "Experiment with our cutting-edge AI models in an interactive environment.",
      icon: Beaker
    },
    {
      title: "AI Dashboard",
      href: "/dashboard",
      description: "Monitor and manage your AI integrations and analytics.",
      icon: LayoutDashboard
    },
    {
      title: "Model Training",
      href: "/ai/training",
      description: "Custom AI model training and fine-tuning services.",
      icon: Brain
    },
    {
      title: "AI Integration",
      href: "/ai/integration",
      description: "Seamlessly integrate AI into your existing systems.",
      icon: Puzzle
    }
  ],
  solutions: [
    {
      title: "Enterprise Software",
      href: "/solutions/enterprise",
      description: "Custom enterprise solutions built for scale and performance.",
      icon: Building2
    },
    {
      title: "Cloud Solutions",
      href: "/solutions/cloud",
      description: "Modern cloud architecture and infrastructure services.",
      icon: Cloud
    },
    {
      title: "Digital Transformation",
      href: "/solutions/transformation",
      description: "End-to-end digital transformation consulting and implementation.",
      icon: Lightbulb
    },
    {
      title: "Data Analytics",
      href: "/solutions/analytics",
      description: "Advanced data analytics and business intelligence solutions.",
      icon: BarChart3
    }
  ],
  resources: [
    {
      title: "Case Studies",
      href: "/resources/cases",
      description: "Real-world success stories and implementation examples.",
      icon: FileText
    },
    {
      title: "Documentation",
      href: "/docs",
      description: "Comprehensive guides and technical documentation.",
      icon: FileCode2
    },
    {
      title: "Blog & Insights",
      href: "/blog",
      description: "Latest technology trends and industry insights.",
      icon: BookMarked
    },
    {
      title: "API Reference",
      href: "/docs/api",
      description: "Detailed API documentation and integration guides.",
      icon: Webhook
    }
  ]
};

export default function NavBar() {
  const { userId } = useAuth();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Logo component with theme awareness
  const LogoComponent = () => {
    return (
      <div className="relative w-32 h-8">
        <Image
          src={theme === 'dark' ? '/dark.png' : '/light.png'}
          alt="Affinity Labs Logo"
          fill
          className="object-contain"
          priority // This ensures the logo loads first
        />
      </div>
    );
  };

  // Define navigation sections for our custom menu
  const navigationSections = [
    {
      title: "AI Tools",
      icon: Sparkles,
      items: [
        {
          title: "AI Chat Assistant",
          href: "/ai/chat",
          description: "Chat with our advanced AI assistant",
          icon: MessageSquare
        },
        {
          title: "Content Generator",
          href: "/ai/generate",
          description: "Generate high-quality content with AI",
          icon: FileText
        },
        {
          title: "Image Creation",
          href: "/ai/image",
          description: "Create stunning images with AI",
          icon: Zap
        }
      ]
    },
    {
      title: "Solutions",
      icon: Layers,
      items: [
        {
          title: "Enterprise",
          href: "/solutions/enterprise",
          description: "Solutions for large organizations",
          icon: Database
        },
        {
          title: "Teams",
          href: "/solutions/teams",
          description: "Collaboration tools for teams",
          icon: Users
        },
        {
          title: "Settings",
          href: "/settings",
          description: "Manage your account settings",
          icon: Settings
        }
      ]
    },
    {
      title: "Resources",
      icon: BookOpen,
      items: [
        {
          title: "Documentation",
          href: "/docs",
          description: "Comprehensive guides and API references",
          icon: FileText
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Latest news and updates",
          icon: MessageSquare
        },
        {
          title: "Support",
          href: "/support",
          description: "Get help from our support team",
          icon: Users
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      <div
        className={cn(
          "transition-all duration-500 ease-in-out backdrop-blur-md",
          isScrolled 
            ? "w-[101%] sm:w-[750px] m-4 rounded-xl bg-white/10 dark:bg-black/10 shadow-lg border border-white/20 dark:border-white/[0.08]"
            : "w-full max-w-7xl bg-white/[0.02] dark:bg-black/[0.02] border-[0.5px] border-white/[0.05] dark:border-white/[0.02]"
        )}
      >
        <div 
          className={cn(
            "flex items-center justify-between h-16 px-4 sm:px-6 backdrop-blur-md transition-all duration-500 text-gray-800 dark:text-gray-200",
            isScrolled
              ? "bg-white/20 dark:bg-black/20 rounded-xl"
              : "bg-white/[0.05] dark:bg-black/[0.05]"
          )}
        >
          {/* Logo Section */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-3">
            <Dialog>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "lg:hidden h-9 w-9 p-0",
                    isScrolled 
                      ? "hover:bg-gray-100 dark:hover:bg-gray-800/50" 
                      : "hover:bg-white/10"
                  )}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                {/* ... existing sheet content ... */}
              </SheetContent>
            </Dialog>
            <LogoComponent />
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LogoComponent />
          </div>

          {/* Navigation Section - Replace with our custom navigation menu */}
          <div className="hidden lg:flex items-center gap-6">
            <CustomNavigationMenu sections={navigationSections} />
          </div>

          {/* Right Side Section */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            {!userId ? (
              <Link href="/sign-in" prefetch={true}>
                <Button
                  variant="default"
                  className={cn(
                    "transition-all duration-300",
                    isScrolled
                      ? "w-9 h-9 p-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      : "h-9 px-4 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200"
                  )}
                >
                  {isScrolled ? (
                    <LogIn className="h-4 w-4" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Link>
            ) : (
              <UserProfile />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            "group rounded-lg p-3 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none mb-1">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
