import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { usersTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
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

    const { email, name, picture, role } = await request.json();
    const auth0Id = session.user.sub; // Get Auth0 user ID from session

    // Check if user exists by auth0_id
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.auth0_id, auth0Id));
    
    if (existingUser.length > 0) {
      // User exists, return the existing user
      return NextResponse.json(existingUser[0]);
    } else {
      // Create new user with auth0_id
      const newUser = await db.insert(usersTable).values({
        auth0_id: auth0Id,
        email: email,
        name: name,
        avatar_url: picture,
        role: role || 'client',
      }).returning();
      
      return NextResponse.json(newUser[0], { status: 201 });
    }
  } catch (error) {
    console.error('Error handling user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 