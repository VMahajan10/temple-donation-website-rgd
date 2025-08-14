package com.temple.service;

import com.temple.model.Claim;
import com.temple.model.ClaimStatus;
import com.temple.model.Item;
import com.temple.model.User;
import com.temple.model.ItemStatus;
import com.temple.repository.ClaimRepository;
import com.temple.repository.ItemRepository;
import com.temple.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service 
@Transactional
public class ClaimService {
    @Autowired
    private ClaimRepository claimRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private UserRepository userRepository;

    public Claim createClaim(UUID itemId, UUID userId) 
    {
        Item item = itemRepository.findById(itemId)
        .orElseThrow(() -> new RuntimeException("Item not found"));
        // this line is used to find the item by id

        User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
        // this line is used to find the item and user by id

        if(item.getStatus() != ItemStatus.AVAILABLE)
        {
            throw new RuntimeException("Item is not available for claim");
        }

        Claim claim = new Claim();
        claim.setItem(item);
        claim.setUser(user);
        claim.setStatus(ClaimStatus.PENDING);
        claim.setClaimedAt(LocalDateTime.now());
        // this line is used to create a new claim

        return claimRepository.save(claim);
        // this line is used to create a claim
    }
    public List<Claim> getAllClaims()
    {
        return claimRepository.findAll();
        // this line is used to return the list of claims
    }
    public Claim getClaimById(UUID id)
    {
        return claimRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Claim not found"));
        // this line is used to return the claim by id
    }
    public List<Claim> getClaimsByUser(UUID userId)
    {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return claimRepository.findByUser(user);
        // this line is used to return the list of claims by user
    }

    public Claim updateClaimStatus(UUID id, ClaimStatus status)
    {
        Claim claim = getClaimById(id);
        claim.setStatus(status);
        // this line is used to update the claim status
        if(status == ClaimStatus.APPROVED)
        {
            claim.setApprovedAt(LocalDateTime.now());
            // this line is used to set the approved at date
        }
        else if(status == ClaimStatus.COMPLETED)
        {
            claim.setCompletedAt(LocalDateTime.now());
        }
        return claimRepository.save(claim);
        // this line is used to update the claim status
    }

    public long countClaimsByUserAndStatus(UUID userId, ClaimStatus status)
    {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

        return claimRepository.countByUserAndStatus(user, status);
        // this line is used to count the claims by user and status
    }
}