import { IconTrendingDown, IconTrendingUp, IconFolder, IconCircleCheck, IconClock, IconAlertTriangle } from "@tabler/icons-react"

import { Badge } from "../../components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

interface DashboardStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalTasks: number
  completedTasks: number
  overdueTasks: number
  totalBudget: number
  totalSpent: number
}

interface ProjectCardsProps {
  stats: DashboardStats
}

export function ProjectCards({ stats }: ProjectCardsProps) {
  const completionRate = stats.totalProjects > 0 ? (stats.completedProjects / stats.totalProjects) * 100 : 0
  const taskCompletionRate = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0
  const budgetUtilization = stats.totalBudget > 0 ? (stats.totalSpent / stats.totalBudget) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <IconFolder className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProjects}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeProjects} active, {stats.completedProjects} completed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
          <IconCircleCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completedTasks}</div>
          <p className="text-xs text-muted-foreground">
            {taskCompletionRate.toFixed(1)}% of {stats.totalTasks} tasks
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalSpent.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {budgetUtilization.toFixed(1)}% of ${stats.totalBudget.toLocaleString()} budget
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          <IconAlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.overdueTasks}</div>
          <p className="text-xs text-muted-foreground">
            {stats.overdueTasks > 0 ? "Requires attention" : "All tasks on schedule"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 