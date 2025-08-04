"use client";

import { useEffect, useState } from 'react';
import { AppSidebar } from "../dashboard-components/app-sidebar"
import { ChartAreaInteractive } from "../dashboard-components/chart-area-interactive"
import { ProjectDataTable } from "../dashboard-components/project-data-table"
import { ProjectCards } from "../dashboard-components/project-cards"
import { SiteHeader } from "../dashboard-components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar"
import { useAuth } from "../../lib/useAuth"

export default function Page() {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    totalBudget: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    if (user && !loading) {
      loadDashboardData();
    }
  }, [user, loading]);

  const loadDashboardData = async () => {
    try {
      setError(null);
      
      // Load projects
      try {
        const projectsResponse = await fetch('/api/projects');
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);
        } else {
          console.warn('Projects API returned:', projectsResponse.status);
          setProjects([]);
        }
      } catch (error) {
        console.warn('Failed to load projects:', error);
        setProjects([]);
      }

      // Load stats
      try {
        const statsResponse = await fetch('/api/dashboard/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        } else {
          console.warn('Stats API returned:', statsResponse.status);
          // Keep default stats
        }
      } catch (error) {
        console.warn('Failed to load stats:', error);
        // Keep default stats
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    }
  };

  // Show access denied
  if (!user && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">Please sign in to access the dashboard.</p>
          <a 
            href="/auth"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 inline-block"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Dashboard Error</h1>
          <p className="text-muted-foreground">{error}</p>
          <button 
            onClick={loadDashboardData}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
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