import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock messages data
    const messages = [
      {
        id: 1,
        content: 'Hello! How is the project coming along?',
        sender: 'John Doe',
        timestamp: '2024-01-15T10:30:00Z',
        conversationId: 1
      },
      {
        id: 2,
        content: 'Great progress! We should have the first phase ready by next week.',
        sender: 'Jane Smith',
        timestamp: '2024-01-15T11:00:00Z',
        conversationId: 1
      }
    ];

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
} 