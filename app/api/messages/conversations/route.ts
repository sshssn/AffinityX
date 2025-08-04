import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock conversations data
    const conversations = [
      {
        id: 1,
        title: 'Project Discussion',
        lastMessage: 'When can we schedule the next meeting?',
        timestamp: '2024-01-15T10:30:00Z',
        unreadCount: 2
      },
      {
        id: 2,
        title: 'Design Review',
        lastMessage: 'The new mockups look great!',
        timestamp: '2024-01-14T16:45:00Z',
        unreadCount: 0
      }
    ];

    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
} 