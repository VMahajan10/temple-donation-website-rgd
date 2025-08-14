package com.temple.repository;

import com.temple.model.Claim;
import com.temple.model.ClaimStatus;
import com.temple.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, UUID> {
    List<Claim> findByUser(User user);
    List<Claim> findByStatus(ClaimStatus status);
    List<Claim> findByUserAndStatus(User user, ClaimStatus status);
    long countByStatus(ClaimStatus status);
    long countByUserAndStatus(User user, ClaimStatus status);
}