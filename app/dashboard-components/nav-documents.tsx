"use client"

import * as React from "react"
import {
  IconDatabase,
  IconReport,
  IconFileWord,
  IconFileText,
  IconFolder,
  IconUpload,
} from "@tabler/icons-react"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"

const documentItems = [
  {
    name: "Project Files",
    url: "/files",
    icon: IconDatabase,
  },
  {
    name: "Reports",
    url: "/reports",
    icon: IconReport,
  },
  {
    name: "Documents",
    url: "/documents",
    icon: IconFileWord,
  },
  {
    name: "Templates",
    url: "/templates",
    icon: IconFileText,
  },
  {
    name: "File Manager",
    url: "/file-manager",
    icon: IconFolder,
  },
  {
    name: "Upload",
    url: "/upload",
    icon: IconUpload,
  },
]

export function NavDocuments() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Documents & Files</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {documentItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                isActive={pathname === item.url}
                onClick={() => router.push(item.url)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
