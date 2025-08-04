'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  IconMessage,
  IconFileText,
  IconChecklist,
  IconClock,
  IconPlus,
  IconEdit,
} from '@tabler/icons-react';

interface Activity {
  id: string;
  type: 'message' | 'file' | 'task' | 'time' | 'project';
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  project?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'message':
        return IconMessage;
      case 'file':
        return IconFileText;
      case 'task':
        return IconChecklist;
      case 'time':
        return IconClock;
      case 'project':
        return IconPlus;
      default:
        return IconEdit;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'message':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-950';
      case 'file':
        return 'text-green-500 bg-green-50 dark:bg-green-950';
      case 'task':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-950';
      case 'time':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-950';
      case 'project':
        return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-950';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback className="text-xs">
                        {activity.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{activity.user.name}</span>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  {activity.project && (
                    <Badge variant="outline" className="text-xs">
                      {activity.project}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 