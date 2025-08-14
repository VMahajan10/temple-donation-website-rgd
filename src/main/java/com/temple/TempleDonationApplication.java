package com.temple;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TempleDonationApplication {
    public static void main(String[] args) {
        System.out.println("Loading .env file...");
        
        // Load .env file before starting Spring Boot
        Dotenv dotenv = Dotenv.configure()
                .directory(".")
                .filename(".env")
                .ignoreIfMissing()
                .load();
        
        System.out.println(".env file loaded successfully");
        
        // Set system properties from .env file
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
        
        // Check if SUPABASE_DB_URL exists in either .env or system environment
        String dbUrlFromDotenv = dotenv.get("SUPABASE_DB_URL");
        String dbUrlFromEnv = System.getenv("SUPABASE_DB_URL");
        String dbUrlFromSystem = System.getProperty("SUPABASE_DB_URL");
        
        System.out.println("=== Environment Variable Status ===");
        System.out.println("Dotenv SUPABASE_DB_URL: " + (dbUrlFromDotenv != null ? "FOUND" : "NOT FOUND"));
        System.out.println("System Env SUPABASE_DB_URL: " + (dbUrlFromEnv != null ? "FOUND" : "NOT FOUND"));
        System.out.println("System Property SUPABASE_DB_URL: " + (dbUrlFromSystem != null ? "FOUND" : "NOT FOUND"));
        
        // For testing purposes, prompt user to set environment variable or configure manually
        if (dbUrlFromDotenv == null && dbUrlFromEnv == null && dbUrlFromSystem == null) {
            System.out.println("⚠️  WARNING: SUPABASE_DB_URL not found in any source!");
            System.out.println("Please either:");
            System.out.println("1. Save your .env file properly (it appears empty on filesystem)");
            System.out.println("2. Or set SUPABASE_DB_URL as a system environment variable");
            System.out.println("3. Or pass it via Maven: mvn spring-boot:run -DSUPABASE_DB_URL=your-url");
        }
        
        // Final database URL being used
        String finalDbUrl = dbUrlFromDotenv != null ? dbUrlFromDotenv : 
                           dbUrlFromEnv != null ? dbUrlFromEnv :
                           dbUrlFromSystem != null ? dbUrlFromSystem : "NOT SET";
        System.out.println("Final Database URL: " + (finalDbUrl.equals("NOT SET") ? "NOT SET" : "CONFIGURED"));
        
        SpringApplication.run(TempleDonationApplication.class, args);
    }
}