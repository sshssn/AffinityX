interface Auth0User {
  sub?: string
  email?: string
  name?: string
  picture?: string
  [key: string]: unknown
}

export class ClientUserService {
  // Create or update user from Auth0 data
  static async createOrUpdateUserFromAuth0(auth0User: Auth0User) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'createOrUpdateFromAuth0',
          userData: auth0User,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync user');
      }

      const result = await response.json();
      return result.user;
    } catch (error) {
      console.error('Error syncing user:', error);
      throw new Error('Failed to sync user with database');
    }
  }

  // Get user by Auth0 ID
  static async getUserByAuth0Id(auth0Id: string) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getByAuth0Id',
          userData: { auth0Id },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      const result = await response.json();
      return result.user;
    } catch (error) {
      console.error('Error getting user:', error);
      throw new Error('Failed to get user');
    }
  }

  // Check if user has admin role
  static async isUserAdmin(auth0Id: string) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'isAdmin',
          userData: { auth0Id },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to check admin status');
      }

      const result = await response.json();
      return result.isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
} 