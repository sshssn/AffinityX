import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock dashboard stats
    const stats = {
      totalProjects: 25,
      activeProjects: 12,
      completedProjects: 13,
      totalTasks: 156,
      completedTasks: 89,
      pendingTasks: 67,
      totalRevenue: 125000,
      monthlyRevenue: 15000
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 