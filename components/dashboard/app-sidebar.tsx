'use client';

import * as React from 'react';
import { useAuth } from '@/lib/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import {
  IconDashboard,
  IconFolder,
  IconChecklist,
  IconMessage,
  IconFileText,
  IconClock,
  IconSettings,
  IconPlus,
  IconBell,
  IconSearch,
  IconMenu2,
  IconX,
  IconLogout,
  IconUser,
  IconChartBar,
  IconUpload,
  IconDownload,
} from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const navigationItems = [
  {
    title: 'Dashboard',
    icon: IconDashboard,
    href: '/client/dashboard',
  },
  {
    title: 'Projects',
    icon: IconFolder,
    href: '/client/projects',
  },
  {
    title: 'Tasks',
    icon: IconChecklist,
    href: '/client/tasks',
  },
  {
    title: 'Messages',
    icon: IconMessage,
    href: '/client/messages',
  },
  {
    title: 'Files',
    icon: IconFileText,
    href: '/client/files',
  },
  {
    title: 'Time Tracking',
    icon: IconClock,
    href: '/client/time-tracking',
  },
  {
    title: 'Reports',
    icon: IconChartBar,
    href: '/client/reports',
  },
];

const quickActions = [
  {
    title: 'New Request',
    icon: IconPlus,
    href: '/client/requests/new',
  },
  {
    title: 'Upload File',
    icon: IconUpload,
    href: '/client/files/upload',
  },
  {
    title: 'Start Timer',
    icon: IconClock,
    href: '/client/time-tracking/start',
  },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
            </Button>
            <div>
              <h1 className="text-lg font-semibold">AffinityX</h1>
              <p className="text-sm text-muted-foreground">Project Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <IconBell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar_url} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          className={`${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-50 transition-transform duration-300 ease-in-out`}
        >
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <IconDashboard className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold">AffinityX</h1>
                <p className="text-sm text-muted-foreground">Project Management</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="flex-1 overflow-y-auto">
            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, tasks..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Actions</h3>
              <div className="space-y-1">
                {quickActions.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
        
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="mx-4 mb-4" />

            {/* Main Navigation */}
            <div className="px-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Navigation</h3>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.href)}
                      isActive={pathname === item.href}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                      {item.title === 'Messages' && (
                        <Badge variant="secondary" className="ml-auto">3</Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>

            <Separator className="mx-4 my-4" />

            {/* Settings */}
            <div className="px-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation('/client/settings')}
                    isActive={pathname === '/client/settings'}
                  >
                    <IconSettings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>

          {/* User Profile */}
          <SidebarFooter className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user?.avatar_url} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/client/profile')}>
                  <IconUser className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/client/settings')}>
                  <IconSettings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <IconLogout className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <header className="hidden md:flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <IconBell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="md:pt-0 pt-16">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 