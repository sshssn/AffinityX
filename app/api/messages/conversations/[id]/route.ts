import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get session from cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('auth0_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const session = JSON.parse(sessionCookie.value);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock conversation data for now
    const conversation = {
      id: id,
      title: 'Sample Conversation',
      participants: ['user1@example.com', 'user2@example.com'],
      messages: [
        {
          id: 1,
          sender: 'user1@example.com',
          content: 'Hello!',
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          sender: 'user2@example.com',
          content: 'Hi there!',
          timestamp: new Date().toISOString()
        }
      ]
    };

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get session from cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('auth0_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const session = JSON.parse(sessionCookie.value);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();
    
    // Mock new message
    const newMessage = {
      id: Date.now(),
      conversationId: id,
      sender: session.user.email || 'unknown',
      content,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 