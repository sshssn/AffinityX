"use client";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Menu,
  MessageSquare,
  Home,
  User,
  FileText,
  Info,
  Mail,
  Sparkles,
  ArrowRight
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
import Image from "next/image";
import { useTheme } from "next-themes";
import { UserProfileButton } from "@/components/ui/user-profile-button";
import { ExternalLinkModal } from "@/components/ui/external-link-modal";
import { useAuth } from "@/lib/useAuth";

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    public: true
  },
  {
    title: "Dashboard",
    href: "/client/dashboard",
    icon: User,
    public: false
  },
  {
    title: "Projects",
    href: "/client/projects",
    icon: FileText,
    public: false
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
    public: true
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
    public: true
  },
  {
    title: "AI Chat",
    href: "#",
    icon: Sparkles,
    isAIChat: true,
    public: true
  }
];

export default function NavBar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isAIChatModalOpen, setIsAIChatModalOpen] = React.useState(false);
  const { theme } = useTheme();
  const { user, loading, isAuthenticated } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Filter navigation items based on authentication status
  const getVisibleNavigationItems = () => {
    return navigationItems.filter(item => item.public || isAuthenticated);
  };

  // Logo component with theme awareness
  const LogoComponent = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Prevent hydration mismatch by not rendering until client-side
    if (!mounted) {
      return (
        <div className="relative w-32 h-8">
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
        </div>
      );
    }

    return (
      <div className="relative w-32 h-8">
        <Image
          src={theme === 'dark' ? '/light.png' : '/dark.png'}
          alt="Affinity Labs Logo"
          fill
          className="object-contain"
          priority // This ensures the logo loads first
        />
      </div>
    );
  };

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
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {getVisibleNavigationItems().map((item) => (
                    <div key={item.href}>
                      {item.isAIChat ? (
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20"
                          onClick={() => setIsAIChatModalOpen(true)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                          <ArrowRight className="h-4 w-4 ml-auto" />
                        </Button>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Dialog>
            <LogoComponent />
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LogoComponent />
          </div>

          {/* Navigation Section */}
          <div className="hidden lg:flex items-center gap-3">
            {getVisibleNavigationItems().map((item) => (
              <div key={item.href}>
                {item.isAIChat ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:from-primary/20 hover:to-primary/10"
                    onClick={() => setIsAIChatModalOpen(true)}
                    title={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                  </Button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center h-9 w-9 rounded-lg transition-all duration-200",
                      "hover:bg-white/10 dark:hover:bg-white/5 hover:text-foreground",
                      "text-muted-foreground"
                    )}
                    title={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Section */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <UserProfileButton />
          </div>
        </div>
      </div>
      
      {/* AI Chat Modal */}
      <ExternalLinkModal
        isOpen={isAIChatModalOpen}
        onClose={() => setIsAIChatModalOpen(false)}
        onProceed={() => window.open('https://boltx.vercel.app', '_blank')}
        title="Experience Our AI Platform"
        description="You're about to visit our advanced AI chat platform. This is our own platform where you can interact with cutting-edge AI technology."
        url="boltx.vercel.app"
        platformName="BoltX AI Platform"
      />
    </motion.div>
  );
}


