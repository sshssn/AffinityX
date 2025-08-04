import { pgTable, serial, text, varchar, timestamp, pgEnum, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

// User role enum
export const userRoleEnum = pgEnum('user_role', ['client', 'admin']);

// Project status enum
export const projectStatusEnum = pgEnum('project_status', ['planning', 'in_progress', 'review', 'completed', 'on_hold']);

// Task priority enum
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);

// Task status enum
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'review', 'completed']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  auth0_id: varchar('auth0_id', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  role: userRoleEnum('role').default('client'),
  avatar_url: varchar('avatar_url', { length: 500 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Projects table
export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: projectStatusEnum('status').default('planning'),
  client_id: integer('client_id').references(() => usersTable.id),
  admin_id: integer('admin_id').references(() => usersTable.id),
  start_date: timestamp('start_date'),
  end_date: timestamp('end_date'),
  budget: integer('budget'),
  progress: integer('progress').default(0), // 0-100
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Tasks table
export const tasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  project_id: integer('project_id').references(() => projectsTable.id).notNull(),
  assigned_to: integer('assigned_to').references(() => usersTable.id),
  assigned_by: integer('assigned_by').references(() => usersTable.id),
  priority: taskPriorityEnum('priority').default('medium'),
  status: taskStatusEnum('status').default('todo'),
  due_date: timestamp('due_date'),
  estimated_hours: integer('estimated_hours'),
  actual_hours: integer('actual_hours'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Project comments table
export const projectCommentsTable = pgTable('project_comments', {
  id: serial('id').primaryKey(),
  project_id: integer('project_id').references(() => projectsTable.id).notNull(),
  user_id: integer('user_id').references(() => usersTable.id).notNull(),
  content: text('content').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

// Project files table
export const projectFilesTable = pgTable('project_files', {
  id: serial('id').primaryKey(),
  project_id: integer('project_id').references(() => projectsTable.id).notNull(),
  uploaded_by: integer('uploaded_by').references(() => usersTable.id).notNull(),
  filename: varchar('filename', { length: 255 }).notNull(),
  file_url: varchar('file_url', { length: 500 }).notNull(),
  file_size: integer('file_size'),
  file_type: varchar('file_type', { length: 100 }),
  created_at: timestamp('created_at').defaultNow(),
});

// Project milestones table
export const projectMilestonesTable = pgTable('project_milestones', {
  id: serial('id').primaryKey(),
  project_id: integer('project_id').references(() => projectsTable.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  due_date: timestamp('due_date').notNull(),
  completed: boolean('completed').default(false),
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow(),
});

// Export types
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;
export type Task = typeof tasksTable.$inferSelect;
export type NewTask = typeof tasksTable.$inferInsert;
export type ProjectComment = typeof projectCommentsTable.$inferSelect;
export type NewProjectComment = typeof projectCommentsTable.$inferInsert;
export type ProjectFile = typeof projectFilesTable.$inferSelect;
export type NewProjectFile = typeof projectFilesTable.$inferInsert;
export type ProjectMilestone = typeof projectMilestonesTable.$inferSelect;
export type NewProjectMilestone = typeof projectMilestonesTable.$inferInsert; 