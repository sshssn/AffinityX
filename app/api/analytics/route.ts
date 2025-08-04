import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock analytics data
    const analyticsData = {
      totalUsers: 1234,
      activeProjects: 56,
      revenue: 125000,
      growthRate: 12.5,
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 