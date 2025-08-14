package com.temple.repository;

import com.temple.model.User;
import com.temple.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    // this line is used to find the user by email
    boolean existsByEmail(String email);
    // this line is used to check if the user exists by email
    List<User> findByRole(UserRole role);
    // this line is used to find the user by role
    List<User> findByRoleAndActive(UserRole role, boolean active);
    // this line is used to find the user by role and active
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.active = true")
    Optional<User> findActiveUserByEmail(@Param("email") String email);
    // this line is used to find the active user by email

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.active = true")
    List<User> findActiveUsersByRole(@Param("role") UserRole role);
    // this line is used to find the active users by role

    List<User> findByActive(boolean active);

    
}
