"use client"

import * as React from "react"
import {
  IconHelp,
  IconSearch,
  IconBookmark,
  IconHistory,
  IconStar,
} from "@tabler/icons-react"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"

const secondaryItems = [
  {
    title: "Search",
    url: "/search",
    icon: IconSearch,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: IconStar,
  },
  {
    title: "History",
    url: "/history",
    icon: IconHistory,
  },
  {
    title: "Bookmarks",
    url: "/bookmarks",
    icon: IconBookmark,
  },
  {
    title: "Help",
    url: "/help",
    icon: IconHelp,
  },
]

export function NavSecondary() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {secondaryItems.map((item) => (
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
