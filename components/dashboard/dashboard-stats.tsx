'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconFolder,
  IconChecklist,
  IconClock,
  IconMessage,
  IconTrendingUp,
  IconTrendingDown,
} from '@tabler/icons-react';

interface DashboardStatsProps {
  stats: {
    activeProjects: number;
    totalTasks: number;
    completedTasks: number;
    totalHours: number;
    pendingRequests: number;
    unreadMessages: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      description: 'Currently active',
      icon: IconFolder,
      trend: '+2',
      trendDirection: 'up' as const,
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      description: `${stats.completedTasks} completed`,
      icon: IconChecklist,
      trend: '+5',
      trendDirection: 'up' as const,
    },
    {
      title: 'Hours Logged',
      value: stats.totalHours,
      description: 'This month',
      icon: IconClock,
      trend: '+12.5%',
      trendDirection: 'up' as const,
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      description: 'Awaiting response',
      icon: IconMessage,
      trend: '-3',
      trendDirection: 'down' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {statCards.map((card) => (
        <Card key={card.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div className="flex items-center mt-2">
              {card.trendDirection === 'up' ? (
                <IconTrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <IconTrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <Badge
                variant={card.trendDirection === 'up' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {card.trend}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 