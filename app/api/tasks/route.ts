import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock tasks data
    const tasks = [
      {
        id: 1,
        title: 'Design Homepage',
        description: 'Create modern homepage design',
        status: 'in_progress',
        priority: 'high',
        assignedTo: 'John Doe',
        dueDate: '2024-01-20',
        projectId: 1
      },
      {
        id: 2,
        title: 'Implement Authentication',
        description: 'Set up user authentication system',
        status: 'completed',
        priority: 'medium',
        assignedTo: 'Jane Smith',
        dueDate: '2024-01-15',
        projectId: 1
      }
    ];

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
} 