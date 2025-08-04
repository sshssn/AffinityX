"use client"

import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../../components/ui/sidebar"

export function AppSidebar({ variant }: { variant?: "inset" | "sidebar" | "floating" }) {
  return (
    <Sidebar variant={variant}>
      <SidebarHeader>
        {/* Empty header - no hamburger icon */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary />
        <NavDocuments />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
