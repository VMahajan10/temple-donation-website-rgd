package com.temple.service; 

import com.temple.model.User; 
import com.temple.model.UserRole;
import com.temple.repository.EmailVerificationRepository;
import com.temple.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import jakarta.annotation.PostConstruct;

import java.time.LocalDateTime;
import java.util.Random;
import com.temple.model.EmailVerification;

@Service
@Transactional

public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailVerificationRepository emailVerificationRepository;

    @Autowired
    private EmailService emailService;

    public User createUser(String email, String name, String password , UserRole role) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        // this line is used to check if the email already exists

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setActive(true);
        user.setEmailVerified(false);

        return userRepository.save(user);
       
        // this line is used to save the user
    }

    public User createUserWithVerification(String email, String name, String password, UserRole role)
    {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setActive(true);
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);

        String verificationCode = generateVerificationCode();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(15);

        EmailVerification verification = new EmailVerification(email, verificationCode, expiresAt);
        emailVerificationRepository.save(verification);

        emailService.sendVerificationEmail(email, verificationCode);

        return savedUser;
    }

    public boolean verifyEmail(String email, String code) {
        EmailVerification verification = emailVerificationRepository
        .findByEmailAndVerificationCodeAndUsedFalse(email, code)
        .orElse(null);

        if (verification == null || verification.isExpired()) {
            return false;
        }

        verification.setUsed(true);
        emailVerificationRepository.save(verification);
        // this line is used to save the verification

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEmailVerified(true);
        // this line is used to set the email verified to true

        userRepository.save(user);
        // this line is used to save the user

        return true;
    }


    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
        // this line is used to find the user by email
    }

    public Optional<User> findUserById(UUID id) {
        return userRepository.findById(id);
        // this line is used to find the user by id
    }

    public List<User> findUsersByRole(UserRole role) {
        return userRepository.findByRole(role);
        // this line is used to find the users by role
    }

    public List<User>  findActiveUsers() {
        return userRepository.findByActive(true);
        // this line is used to find the active users
    }

    public User updateUser(UUID id, String name, String email)
    {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
       // this line is used to find the user by id

       user.setName(name);
       user.setEmail(email);

       return userRepository.save(user);
       // this line is used to save the user
    }

    public void deactivateUser(UUID id) {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(false);
        userRepository.save(user);
        // this line is used to deactivate the user
    }

    private String generateVerificationCode() {
        return String.format("%06d", new Random().nextInt(1000000));
    }

    public String generateNewVerificationCode(String email) {
        // Delete old verification if exists
        emailVerificationRepository.findByEmail(email).ifPresent(oldVerification -> {
            emailVerificationRepository.delete(oldVerification);
        });
        
        // Generate new code
        String verificationCode = generateVerificationCode();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(15);
        
        // Create new verification
        EmailVerification verification = new EmailVerification(email, verificationCode, expiresAt);
        emailVerificationRepository.save(verification);
        
        // Send new email
        emailService.sendVerificationEmail(email, verificationCode);
        
        return verificationCode;
    }

    // UserDetailsService implementation
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    // Methods called by UserController
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUserRole(UUID id, UserRole role) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(role);
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    @PostConstruct
    public void createDemoUsers() {
        try {
            int createdCount = 0;
            
            // Create Demo User if doesn't exist
            if (!userRepository.existsByEmail("user@temple.com")) {
                createUser("user@temple.com", "Demo User", "password", UserRole.USER);
                createdCount++;
            }
            
            // Create Demo Admin if doesn't exist
            if (!userRepository.existsByEmail("admin@temple.com")) {
                createUser("admin@temple.com", "Demo Admin", "password", UserRole.ADMIN);
                createdCount++;
            }
            
            // Create Demo Head Admin if doesn't exist
            if (!userRepository.existsByEmail("head@temple.com")) {
                createUser("head@temple.com", "Demo Head Admin", "password", UserRole.HEAD_ADMIN);
                createdCount++;
            }
            
            if (createdCount > 0) {
                System.out.println("✅ Created " + createdCount + " demo users!");
                System.out.println("👤 User: user@temple.com / password");
                System.out.println("👨‍💼 Admin: admin@temple.com / password");
                System.out.println("🔑 Head Admin: head@temple.com / password");
            } else {
                System.out.println("ℹ️ All demo users already exist.");
            }
        } catch (Exception e) {
            System.out.println("⚠️ Could not create demo users: " + e.getMessage());
            // Don't throw exception to prevent application startup failure
        }
    }
}
    