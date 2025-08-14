# Temple Donation Backend - Java Spring Boot

This is the Java Spring Boot backend for the Temple Donation website, designed to work with Supabase for database, authentication, and file storage.

## Current Progress - Step 1: Project Setup ✅

### What's Been Created:

1. **Maven Project Structure** (`pom.xml`)
   - Spring Boot 3.2.0 with Java 17
   - Supabase Java client dependencies
   - JWT support for authentication
   - PostgreSQL driver for database
   - Spring Security for authorization

2. **Application Configuration** (`application.yml`)
   - Supabase connection settings
   - JWT configuration
   - CORS settings
   - File upload configuration
   - Environment variable support

3. **Main Application Class** (`TempleDonationApplication.java`)
   - Spring Boot entry point
   - JPA auditing enabled

4. **Configuration Classes**
   - `SupabaseConfig.java` - Supabase client configuration
   - `SecurityConfig.java` - Spring Security setup with JWT
   - `JwtAuthenticationEntryPoint.java` - Unauthorized access handling
   - `JwtAuthenticationFilter.java` - JWT token validation
   - `JwtService.java` - JWT token generation and validation

### Project Structure:
```
temple-donation-backend/
├── pom.xml
├── src/main/java/com/temple/
│   ├── TempleDonationApplication.java
│   ├── config/
│   │   ├── SupabaseConfig.java
│   │   └── SecurityConfig.java
│   └── security/
│       ├── JwtAuthenticationEntryPoint.java
│       ├── JwtAuthenticationFilter.java
│       └── JwtService.java
└── src/main/resources/
    └── application.yml
```

## Next Steps:

### Step 2: Database Schema and Entities
- Create JPA entities matching the UML diagram
- Set up Supabase database tables
- Implement Row Level Security (RLS) policies

### Step 3: Authentication Integration
- Integrate with Supabase Auth
- Create user registration and login endpoints
- Implement role-based access control

### Step 4: Core Business Logic
- Item management (CRUD operations)
- Claim system implementation
- Image upload and approval workflow

### Step 5: API Endpoints
- REST controllers for all operations
- Error handling and validation
- Audit logging

## Environment Variables Needed:

Create a `.env` file or set these environment variables:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=jdbc:postgresql://db.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-db-password
JWT_SECRET=your-jwt-secret-key-here-make-it-long-and-secure
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

## Running the Application:

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

## Notes:

- The current implementation has linter errors because the full project structure isn't complete yet
- We're building this step by step to ensure each component is properly integrated
- The next step will focus on creating the database entities and schema
