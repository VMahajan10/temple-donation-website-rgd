package com.temple.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
//this line is used to import the JavaMailSender interface
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendVerificationEmail(String toEmail, String verificationCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Verify Your Temple Donation Account");

        message.setText(
            "Welcome to Radha Govind Dham DC!\n\n" +
            "Your verification code is: " + verificationCode + "\n\n" +
            "This code will expire in 15 minutes.\n\n" +
            "If you didn't create this account, please ignore this email.\n\n" +
            "Jai Radha Krishna!"
        );

        mailSender.send(message);
        // this line is used to send the email
    }
}