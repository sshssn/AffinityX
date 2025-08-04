import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle({ client: sql });

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Drop existing tables if they exist
    await sql`
      DROP TABLE IF EXISTS "project_milestones" CASCADE;
      DROP TABLE IF EXISTS "project_files" CASCADE;
      DROP TABLE IF EXISTS "project_comments" CASCADE;
      DROP TABLE IF EXISTS "tasks" CASCADE;
      DROP TABLE IF EXISTS "projects" CASCADE;
      DROP TABLE IF EXISTS "users" CASCADE;
    `;

    // Drop existing types if they exist
    await sql`
      DROP TYPE IF EXISTS "task_status" CASCADE;
      DROP TYPE IF EXISTS "task_priority" CASCADE;
      DROP TYPE IF EXISTS "project_status" CASCADE;
      DROP TYPE IF EXISTS "user_role" CASCADE;
    `;

    // Create enums
    await sql`
      CREATE TYPE "user_role" AS ENUM ('client', 'admin');
      CREATE TYPE "project_status" AS ENUM ('planning', 'in_progress', 'review', 'completed', 'on_hold');
      CREATE TYPE "task_priority" AS ENUM ('low', 'medium', 'high', 'urgent');
      CREATE TYPE "task_status" AS ENUM ('todo', 'in_progress', 'review', 'completed');
    `;

    // Create users table
    await sql`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "auth0_id" VARCHAR(255) UNIQUE NOT NULL,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "name" VARCHAR(255),
        "role" "user_role" DEFAULT 'client',
        "avatar_url" VARCHAR(500),
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      );
    `;

    // Create projects table
    await sql`
      CREATE TABLE "projects" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "status" "project_status" DEFAULT 'planning',
        "client_id" INTEGER REFERENCES "users"("id"),
        "admin_id" INTEGER REFERENCES "users"("id"),
        "start_date" TIMESTAMP,
        "end_date" TIMESTAMP,
        "budget" INTEGER,
        "progress" INTEGER DEFAULT 0,
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      );
    `;

    // Create tasks table
    await sql`
      CREATE TABLE "tasks" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "project_id" INTEGER REFERENCES "projects"("id") NOT NULL,
        "assigned_to" INTEGER REFERENCES "users"("id"),
        "assigned_by" INTEGER REFERENCES "users"("id"),
        "priority" "task_priority" DEFAULT 'medium',
        "status" "task_status" DEFAULT 'todo',
        "due_date" TIMESTAMP,
        "estimated_hours" INTEGER,
        "actual_hours" INTEGER,
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      );
    `;

    // Create project_comments table
    await sql`
      CREATE TABLE "project_comments" (
        "id" SERIAL PRIMARY KEY,
        "project_id" INTEGER REFERENCES "projects"("id") NOT NULL,
        "user_id" INTEGER REFERENCES "users"("id") NOT NULL,
        "content" TEXT NOT NULL,
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `;

    // Create project_files table
    await sql`
      CREATE TABLE "project_files" (
        "id" SERIAL PRIMARY KEY,
        "project_id" INTEGER REFERENCES "projects"("id") NOT NULL,
        "uploaded_by" INTEGER REFERENCES "users"("id") NOT NULL,
        "filename" VARCHAR(255) NOT NULL,
        "file_url" VARCHAR(500) NOT NULL,
        "file_size" INTEGER,
        "file_type" VARCHAR(100),
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `;

    // Create project_milestones table
    await sql`
      CREATE TABLE "project_milestones" (
        "id" SERIAL PRIMARY KEY,
        "project_id" INTEGER REFERENCES "projects"("id") NOT NULL,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "due_date" TIMESTAMP NOT NULL,
        "completed" BOOLEAN DEFAULT FALSE,
        "completed_at" TIMESTAMP,
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

setupDatabase().catch(console.error); 