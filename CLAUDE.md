# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Temple Donation website with a hybrid architecture:
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and shadcn/ui components
- **Backend**: Spring Boot 3.2.0 Java application with Supabase integration
- **Database**: PostgreSQL via Supabase with authentication and storage

The application manages temple donation items where users can claim items for donation, with admin approval workflows.

## Build and Development Commands

### Frontend (Next.js)
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Backend (Java Spring Boot)
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Run tests
mvn test
```

## Architecture

### Frontend Structure
- `app/` - Next.js 14 app router pages and API routes
- `components/` - Reusable UI components using shadcn/ui
- `lib/` - Utility functions and configurations
- `public/` - Static assets including temple images

### Backend Structure
- `src/main/java/com/temple/` - Java source code
  - `controller/` - REST API controllers
  - `service/` - Business logic layer
  - `model/` - JPA entities (User, Item, Claim)
  - `repository/` - Data access layer
  - `security/` - JWT authentication and Spring Security config
  - `dto/` - Data transfer objects
  - `config/` - Supabase and application configuration

### Key Models
- **User**: Authentication and role management (USER, ADMIN)
- **Item**: Donation items with approval workflow
- **Claim**: User claims on donation items with status tracking

### Authentication Flow
- Uses Supabase for user authentication
- JWT tokens for API authorization
- Role-based access control (USER/ADMIN)
- Spring Security integration

## Environment Configuration

Required environment variables:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=jdbc:postgresql://db.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-db-password
JWT_SECRET=your-jwt-secret-key-here-make-it-long-and-secure
```

## Development Notes

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:8080/api`
- Uses TypeScript for frontend type safety
- JPA entities handle database operations
- Supabase provides authentication, database, and file storage
- Current implementation uses hybrid Next.js API routes and Spring Boot backend