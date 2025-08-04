"use client"

import * as React from "react"
import {
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconChartBar,
  IconUsers,
  IconCalendar,
  IconMessage,
  IconSettings,
} from "@tabler/icons-react"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: IconFolder,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: IconListDetails,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: IconCalendar,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: IconMessage,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: IconChartBar,
  },
  {
    title: "Team",
    url: "/team",
    icon: IconUsers,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: IconSettings,
  },
]

export function NavMain() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pathname === item.url}
                onClick={() => router.push(item.url)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
