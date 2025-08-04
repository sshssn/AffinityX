import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/userService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userData } = body;

    switch (action) {
      case 'createOrUpdateFromAuth0':
        const user = await UserService.createOrUpdateUserFromAuth0(userData);
        return NextResponse.json({ success: true, user });
      
      case 'getByAuth0Id':
        const foundUser = await UserService.getUserByAuth0Id(userData.auth0Id);
        return NextResponse.json({ success: true, user: foundUser });
      
      case 'isAdmin':
        const isAdmin = await UserService.isUserAdmin(userData.auth0Id);
        return NextResponse.json({ success: true, isAdmin });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 