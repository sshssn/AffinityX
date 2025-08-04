import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock calendar events data
    const events = [
      {
        id: 1,
        title: 'Project Review Meeting',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T11:00:00Z',
        description: 'Weekly project review with the team'
      },
      {
        id: 2,
        title: 'Client Presentation',
        start: '2024-01-16T14:00:00Z',
        end: '2024-01-16T15:30:00Z',
        description: 'Present project progress to client'
      }
    ];

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 