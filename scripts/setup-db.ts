import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// Create Neon SQL client
const sql = neon(process.env.DATABASE_URL);

// Create Drizzle instance
const db = drizzle({ client: sql });

async function main() {
  console.log('Running database migrations...');
  
  try {
    // Run migrations
    await migrate(db, { migrationsFolder: './migrations' });
    console.log('✅ Database migrations completed successfully');
    
    // Create some sample data
    console.log('Creating sample data...');
    
    // Insert sample users
    const sampleUsers = [
      {
        auth0_id: 'auth0|sample-admin',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      {
        auth0_id: 'auth0|sample-client',
        email: 'client@example.com',
        name: 'Client User',
        role: 'client',
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
    ];

    for (const userData of sampleUsers) {
      try {
        await db.execute(sql`
          INSERT INTO users (auth0_id, email, name, role, avatar_url)
          VALUES (${userData.auth0_id}, ${userData.email}, ${userData.name}, ${userData.role}, ${userData.avatar_url})
          ON CONFLICT (auth0_id) DO NOTHING
        `);
      } catch (error) {
        console.log(`User ${userData.email} already exists or error:`, error);
      }
    }

    // Insert sample projects
    const sampleProjects = [
      {
        title: 'Website Redesign',
        description: 'Complete redesign of the company website with modern UI/UX',
        status: 'in_progress',
        client_id: 2, // Client user
        admin_id: 1, // Admin user
        start_date: new Date('2024-01-15'),
        end_date: new Date('2024-03-15'),
        budget: 15000,
        progress: 65,
      },
      {
        title: 'Mobile App Development',
        description: 'iOS and Android app for customer engagement',
        status: 'planning',
        client_id: 2,
        admin_id: 1,
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-06-01'),
        budget: 25000,
        progress: 0,
      },
      {
        title: 'E-commerce Platform',
        description: 'Full-featured e-commerce solution with payment integration',
        status: 'completed',
        client_id: 2,
        admin_id: 1,
        start_date: new Date('2023-10-01'),
        end_date: new Date('2024-01-01'),
        budget: 30000,
        progress: 100,
      },
    ];

    for (const projectData of sampleProjects) {
      try {
        await db.execute(sql`
          INSERT INTO projects (title, description, status, client_id, admin_id, start_date, end_date, budget, progress)
          VALUES (${projectData.title}, ${projectData.description}, ${projectData.status}, ${projectData.client_id}, ${projectData.admin_id}, ${projectData.start_date}, ${projectData.end_date}, ${projectData.budget}, ${projectData.progress})
        `);
      } catch (error) {
        console.log(`Project ${projectData.title} already exists or error:`, error);
      }
    }

    // Insert sample tasks
    const sampleTasks = [
      {
        title: 'Design Homepage',
        description: 'Create wireframes and mockups for the homepage',
        project_id: 1,
        assigned_to: 1,
        assigned_by: 1,
        priority: 'high',
        status: 'completed',
        due_date: new Date('2024-02-01'),
        estimated_hours: 16,
        actual_hours: 18,
      },
      {
        title: 'Implement Responsive Design',
        description: 'Make the website responsive for all devices',
        project_id: 1,
        assigned_to: 1,
        assigned_by: 1,
        priority: 'high',
        status: 'in_progress',
        due_date: new Date('2024-02-15'),
        estimated_hours: 24,
        actual_hours: 12,
      },
      {
        title: 'Setup Development Environment',
        description: 'Configure development tools and repositories',
        project_id: 2,
        assigned_to: 1,
        assigned_by: 1,
        priority: 'medium',
        status: 'todo',
        due_date: new Date('2024-03-10'),
        estimated_hours: 8,
        actual_hours: 0,
      },
    ];

    for (const taskData of sampleTasks) {
      try {
        await db.execute(sql`
          INSERT INTO tasks (title, description, project_id, assigned_to, assigned_by, priority, status, due_date, estimated_hours, actual_hours)
          VALUES (${taskData.title}, ${taskData.description}, ${taskData.project_id}, ${taskData.assigned_to}, ${taskData.assigned_by}, ${taskData.priority}, ${taskData.status}, ${taskData.due_date}, ${taskData.estimated_hours}, ${taskData.actual_hours})
        `);
      } catch (error) {
        console.log(`Task ${taskData.title} already exists or error:`, error);
      }
    }

    console.log('✅ Sample data created successfully');
    console.log('🎉 Database setup completed!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

main(); 