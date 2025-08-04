'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';

interface Task {
  id: number;
  title: string;
  project: string;
  status: string;
  priority: string;
  dueDate: string;
}

export default function ClientTasksPage() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user && !loading) {
      // Load user tasks
      loadTasks();
    }
  }, [user, loading]);

  const loadTasks = async () => {
    try {
      // Mock data for now
      setTasks([
        {
          id: 1,
          title: "Review website design",
          project: "Website Redesign",
          status: "In Progress",
          priority: "High",
          dueDate: "2024-01-20",
        },
        {
          id: 2,
          title: "Test payment integration",
          project: "E-commerce Platform",
          status: "Pending",
          priority: "Medium",
          dueDate: "2024-01-25",
        },
      ]);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Access Required</h2>
          <p className="text-muted-foreground mt-4">Please log in to view your tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          New Task
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          
          {tasks.length === 0 ? (
            <p className="text-muted-foreground">No tasks found.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.project}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">{task.priority}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Due: {task.dueDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 