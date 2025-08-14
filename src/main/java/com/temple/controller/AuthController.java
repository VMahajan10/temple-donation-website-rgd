package com.temple.controller;

import com.temple.dto.RegisterUser;
import com.temple.dto.LoginRequest;
import com.temple.model.User;
import com.temple.model.UserRole;
import com.temple.service.UserService;
import com.temple.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")

public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterUser request)
    {
        User user = userService.createUser(request.getEmail(), request.getName(), 
        request.getPassword(), UserRole.USER);
        String token = jwtService.generateToken(new HashMap<>(), user);
        // this line is used to generate a token for the user

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
        // this line is used to return the token
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestBody Map<String, String> request)
    {
        String email = request.get("email");
        String code = request.get("code");

        boolean verified = userService.verifyEmail(email, code);

        Map<String, String> response = new HashMap<>();
        if (verified) {
            response.put("message", "Email verified successfully. You can now login.");
            response.put("verified", "true");
        } else {
            response.put("message", "Invalid or expired verification code.");
            response.put("verified", "false");
        }
        //these lines are used to verify the email

        return ResponseEntity.ok(response);
        //this line is used to return the response
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<Map<String, String>> resendVerification(@RequestBody Map<String, String> request)
    {
        String email = request.get("email");
        //this line is used to get the email from the request

        String verificationCode = userService.generateNewVerificationCode(email);
        //this line is used to generate a new verification code

        Map<String, String> response = new HashMap<>();
        response.put("message", "New verification code sent to your email.");

        return ResponseEntity.ok(response);
    } 

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest request)
    {
        User user = userService.findUserByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));
        // this line is used to find the user by email
        String token = jwtService.generateToken(new HashMap<>(), user);
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "User logged in successfully");
        return ResponseEntity.ok(response);
        // this line is used to return the token
    }

    
     
    
}