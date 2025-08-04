"use client";

import { useEffect, useState } from 'react';
import { AppSidebar } from "../../dashboard-components/app-sidebar"
import { ChartAreaInteractive } from "../../dashboard-components/chart-area-interactive"
import { ProjectDataTable } from "../../dashboard-components/project-data-table"
import { ProjectCards } from "../../dashboard-components/project-cards"
import { SiteHeader } from "../../dashboard-components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "../../../components/ui/sidebar"
import { useAuth } from "../../../lib/useAuth"

// Mock data for client dashboard
const mockClientProjects = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    status: 'in_progress' as const,
    client_id: 2,
    admin_id: 1,
    start_date: new Date('2024-01-15'),
    end_date: new Date('2024-03-15'),
    budget: 15000,
    progress: 65,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-02-15'),
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'iOS and Android app for customer engagement',
    status: 'planning' as const,
    client_id: 2,
    admin_id: 1,
    start_date: new Date('2024-03-01'),
    end_date: new Date('2024-06-01'),
    budget: 25000,
    progress: 0,
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01'),
  },
];

const mockClientStats = {
  totalProjects: 2,
  activeProjects: 1,
  completedProjects: 0,
  totalTasks: 8,
  completedTasks: 5,
  overdueTasks: 1,
  totalBudget: 40000,
  totalSpent: 25000,
};

export default function ClientDashboard() {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState(mockClientProjects);
  const [stats, setStats] = useState(mockClientStats);

  useEffect(() => {
    if (user && !loading) {
      // Load data immediately without artificial delay
      setProjects(mockClientProjects);
      setStats(mockClientStats);
    }
  }, [user, loading]);

  if (!user && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Please sign in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="h-screen">
          <SiteHeader />
          <div className="h-[calc(100vh-var(--header-height))] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6">
              <ProjectCards stats={stats} />
              <ChartAreaInteractive />
              <ProjectDataTable data={projects} />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
} 