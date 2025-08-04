# AffinityX

A comprehensive project management platform designed for software development agencies and enterprise clients. Built with modern web technologies, AffinityX provides a complete solution for managing software development projects, client relationships, and team collaboration.

## Overview

AffinityX is a full-stack web application that serves as both a client-facing project management portal and an internal agency management system. The platform enables software development agencies to efficiently manage multiple client projects while providing clients with real-time visibility into their project progress.

## Core Features

### Client Portal
- **Project Dashboard**: Real-time project status and progress tracking
- **Request Management**: Submit and track feature requests and bug reports
- **Task Overview**: View assigned tasks and deadlines
- **Communication Hub**: Direct messaging with project teams
- **Analytics**: Project performance metrics and insights

### Admin Portal
- **Project Management**: Create, assign, and monitor project progress
- **Team Management**: Assign team members to projects and tasks
- **Client Management**: Manage client accounts and permissions
- **Analytics Dashboard**: Comprehensive business metrics and reporting
- **Resource Allocation**: Track time, budget, and resource utilization

### Project Management
- **Multi-Project Support**: Manage multiple concurrent projects
- **Task Tracking**: Detailed task management with priorities and deadlines
- **Milestone Management**: Set and track project milestones
- **File Management**: Secure file sharing and document management
- **Comment System**: Project-specific communication threads

## Technical Architecture

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Advanced animations and transitions
- **Radix UI**: Accessible component primitives
- **Shadcn/ui**: Modern component library

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Primary database (Neon serverless)
- **Auth0**: Enterprise-grade authentication

### Database Schema
- **Users**: Client and admin user management
- **Projects**: Project metadata and status tracking
- **Tasks**: Task assignment and progress tracking
- **Comments**: Project communication system
- **Files**: Document and asset management
- **Milestones**: Project milestone tracking

### Key Technologies
- **Neon Database**: Serverless PostgreSQL for scalability
- **Auth0**: Secure authentication and authorization
- **Vercel**: Deployment and hosting platform
- **Stripe**: Payment processing integration
- **AI SDK**: Integration with multiple AI providers

## Project Structure

```
app/
├── admin/           # Admin portal pages
├── client/          # Client portal pages
├── dashboard/       # Main dashboard components
├── api/            # API route handlers
├── auth/           # Authentication pages
├── analytics/      # Analytics and reporting
├── projects/       # Project management
├── tasks/          # Task management
├── messages/       # Communication system
└── calendar/       # Scheduling and events
```

## Development Status

The application is currently in active development with the following status:

- **Core Infrastructure**: Complete
- **Authentication System**: Implemented with Auth0
- **Database Schema**: Fully defined and migrated
- **Client Portal**: Functional with mock data
- **Admin Portal**: Functional with mock data
- **API Endpoints**: Implemented with mock responses
- **UI Components**: Complete component library
- **Production Build**: Ready for deployment

## Environment Setup

The application requires the following environment variables:

- `DATABASE_URL`: Neon PostgreSQL connection string
- `AUTH0_SECRET`: Auth0 application secret
- `AUTH0_BASE_URL`: Application base URL
- `AUTH0_ISSUER_BASE_URL`: Auth0 domain
- `AUTH0_CLIENT_ID`: Auth0 client identifier
- `AUTH0_CLIENT_SECRET`: Auth0 client secret

## Deployment

The application is configured for deployment on Vercel with the following features:

- **Automatic Builds**: CI/CD pipeline integration
- **Environment Management**: Staging and production environments
- **Database Migrations**: Automated schema updates
- **Performance Optimization**: Next.js optimization features

## Business Model

AffinityX is designed to serve software development agencies by providing:

- **Client Transparency**: Real-time project visibility for clients
- **Operational Efficiency**: Streamlined project management workflows
- **Professional Presentation**: Enterprise-grade client portal
- **Scalable Architecture**: Support for multiple clients and projects
- **Revenue Tracking**: Integrated billing and payment processing

This platform enables agencies to deliver professional project management experiences while maintaining operational efficiency and client satisfaction.
