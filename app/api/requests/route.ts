import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock request creation
    const newRequest = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(newRequest, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Mock requests data
    const requests = [
      {
        id: 1,
        title: 'Website Redesign',
        description: 'Need a complete redesign of our company website',
        priority: 'high',
        category: 'design',
        status: 'pending',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 2,
        title: 'Bug Fix Request',
        description: 'Login page is not working properly',
        priority: 'urgent',
        category: 'bug',
        status: 'in_progress',
        createdAt: '2024-01-14T15:30:00Z'
      }
    ];

    return NextResponse.json(requests);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
} 