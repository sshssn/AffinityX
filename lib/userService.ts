import { db } from './db';
import { usersTable, projectsTable, tasksTable } from './schema';
import { eq } from 'drizzle-orm';
import type { User, NewUser, Project, NewProject, Task, NewTask } from './schema';

interface Auth0User {
  sub?: string
  email?: string
  name?: string
  picture?: string
  [key: string]: unknown
}

export class UserService {
  static async getUserByAuth0Id(auth0Id: string): Promise<User | null> {
    try {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.auth0_id, auth0Id));
      return user || null;
    } catch (error) {
      console.error('Failed query:', error);
      throw new Error(`Failed query: ${error}`);
    }
  }

  static async createOrUpdateUserFromAuth0(auth0User: Auth0User): Promise<User> {
    try {
      if (!auth0User.sub) throw new Error("auth0User.sub is required");
      if (!auth0User.email) throw new Error("auth0User.email is required");
      const existingUser = await this.getUserByAuth0Id(auth0User.sub);
      
      if (existingUser) {
        // Update existing user
        return await this.updateUser(existingUser.id, {
          email: auth0User.email,
          name: auth0User.name ?? "",
          avatar_url: auth0User.picture ?? "",
        });
      } else {
        // Create new user
        return await this.createUser({
          auth0_id: auth0User.sub,
          email: auth0User.email,
          name: auth0User.name ?? "",
          avatar_url: auth0User.picture ?? "",
          role: 'client',
        });
      }
    } catch (error) {
      console.error('Failed to create/update user from Auth0:', error);
      throw new Error(`Failed to create/update user from Auth0: ${error}`);
    }
  }

  static async isUserAdmin(auth0Id: string): Promise<boolean> {
    try {
      const user = await this.getUserByAuth0Id(auth0Id);
      return user?.role === 'admin';
    } catch (error) {
      console.error('Failed to check admin status:', error);
      return false;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
      return user || null;
    } catch (error) {
      console.error('Failed query:', error);
      throw new Error(`Failed query: ${error}`);
    }
  }

  static async createUser(userData: NewUser): Promise<User> {
    try {
      const [user] = await db.insert(usersTable).values(userData).returning();
      return user;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  static async updateUser(id: number, userData: Partial<NewUser>): Promise<User> {
    try {
      const [user] = await db
        .update(usersTable)
        .set({ ...userData, updated_at: new Date() })
        .where(eq(usersTable.id, id))
        .returning();
      return user;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  static async deleteUser(id: number): Promise<void> {
    try {
      await db.delete(usersTable).where(eq(usersTable.id, id));
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error(`Failed to delete user: ${error}`);
    }
  }

  // Project methods
  static async getProjectsByUser(userId: number): Promise<Project[]> {
    try {
      const user = await this.getUserById(userId);
      if (!user) throw new Error('User not found');

      if (user.role === 'admin') {
        return await db.select().from(projectsTable);
      } else {
        return await db.select().from(projectsTable).where(eq(projectsTable.client_id, userId));
      }
    } catch (error) {
      console.error('Failed to get projects:', error);
      throw new Error(`Failed to get projects: ${error}`);
    }
  }

  static async getProjectById(id: number): Promise<Project | null> {
    try {
      const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
      return project || null;
    } catch (error) {
      console.error('Failed to get project:', error);
      throw new Error(`Failed to get project: ${error}`);
    }
  }

  static async createProject(projectData: NewProject): Promise<Project> {
    try {
      const [project] = await db.insert(projectsTable).values(projectData).returning();
      return project;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw new Error(`Failed to create project: ${error}`);
    }
  }

  static async updateProject(id: number, projectData: Partial<NewProject>): Promise<Project> {
    try {
      const [project] = await db
        .update(projectsTable)
        .set({ ...projectData, updated_at: new Date() })
        .where(eq(projectsTable.id, id))
        .returning();
      return project;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw new Error(`Failed to update project: ${error}`);
    }
  }

  static async deleteProject(id: number): Promise<void> {
    try {
      await db.delete(projectsTable).where(eq(projectsTable.id, id));
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw new Error(`Failed to delete project: ${error}`);
    }
  }

  // Task methods
  static async getTasksByUser(userId: number): Promise<Task[]> {
    try {
      return await db.select().from(tasksTable).where(eq(tasksTable.assigned_to, userId));
    } catch (error) {
      console.error('Failed to get tasks:', error);
      throw new Error(`Failed to get tasks: ${error}`);
    }
  }

  static async getTasksByProject(projectId: number): Promise<Task[]> {
    try {
      return await db.select().from(tasksTable).where(eq(tasksTable.project_id, projectId));
    } catch (error) {
      console.error('Failed to get tasks:', error);
      throw new Error(`Failed to get tasks: ${error}`);
    }
  }

  static async getTaskById(id: number): Promise<Task | null> {
    try {
      const [task] = await db.select().from(tasksTable).where(eq(tasksTable.id, id));
      return task || null;
    } catch (error) {
      console.error('Failed to get task:', error);
      throw new Error(`Failed to get task: ${error}`);
    }
  }

  static async createTask(taskData: NewTask): Promise<Task> {
    try {
      const [task] = await db.insert(tasksTable).values(taskData).returning();
      return task;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw new Error(`Failed to create task: ${error}`);
    }
  }

  static async updateTask(id: number, taskData: Partial<NewTask>): Promise<Task> {
    try {
      const [task] = await db
        .update(tasksTable)
        .set({ ...taskData, updated_at: new Date() })
        .where(eq(tasksTable.id, id))
        .returning();
      return task;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw new Error(`Failed to update task: ${error}`);
    }
  }

  static async deleteTask(id: number): Promise<void> {
    try {
      await db.delete(tasksTable).where(eq(tasksTable.id, id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error(`Failed to delete task: ${error}`);
    }
  }

  // Helper method
  static async getUserById(id: number): Promise<User | null> {
    try {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
      return user || null;
    } catch (error) {
      console.error('Failed to get user by ID:', error);
      throw new Error(`Failed to get user by ID: ${error}`);
    }
  }
} 