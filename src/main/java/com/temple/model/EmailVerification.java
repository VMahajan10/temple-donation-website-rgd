package com.temple.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "email_verifications")
@EntityListeners(AuditingEntityListener.class)

public class EmailVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; 

    @Column(nullable = false, unique = true)
    private String email; // this line is used to store the email of the user

    @Column(nullable = false)
    private String verificationCode; // this line is used to store the verification code of the user

    @Column(nullable = false)
    private LocalDateTime expiresAt;
    // this line is used to store the expiration date of the verification code

    @Column(nullable = false)
    private boolean used = false;
    // this line is used to store the used status of the verification code

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    // this line is used to store the creation date of the verification code

    public EmailVerification() {}
    // this line is used to create a new email verification

    public EmailVerification(String email, String verificationCode, LocalDateTime expiresAt) {
        this.email = email;
        this.verificationCode = verificationCode;
        this.expiresAt = expiresAt;
        // this line is used to create a new email verification
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    //this line is used to get the id of the verification code

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    // this line is used to set the email of the user

    public String getVerificationCode() { return verificationCode; }
    public void setVerificationCode(String verificationCode) { this.verificationCode = verificationCode; }
    // this line is used to set the verification code of the user

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
    // this line is used to set the expiration date of the verification code

    public boolean isUsed() { return used; }
    public void setUsed(boolean used) { this.used = used; }
    // this line is used to set the used status of the verification code

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    // this line is used to set the creation date of the verification code

    public boolean isExpired() { return LocalDateTime.now().isAfter(expiresAt); }
    // this line is used to check if the verification code is expired
}