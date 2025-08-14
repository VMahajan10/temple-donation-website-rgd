package com.temple.repository;

import com.temple.model.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification, UUID> {
    Optional<EmailVerification> findByEmailAndVerificationCodeAndUsedFalse(String email, String code);
    // this line is used to find the email verification by email and verification code and used false

    Optional<EmailVerification> findByEmail(String email);
    // this line is used to find the email verification by email
    // this line is used to find the email verification by email and verification code and used false
}