package com.temple.controller;

import com.temple.model.Claim;
import com.temple.model.ClaimStatus;
import com.temple.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    @Autowired
    private ClaimService claimService;

    @GetMapping
    public ResponseEntity<List<Claim>> getAllClaims() {
       return ResponseEntity.ok(claimService.getAllClaims());
       // this line is used to return the list of claims
    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> getClaimById(@PathVariable UUID id) {
        return ResponseEntity.ok(claimService.getClaimById(id));
        // this line is used to return the claim by id
    }

    @PostMapping("/{itemId}")
    public ResponseEntity<Claim> createClaim(@PathVariable UUID itemId, @RequestParam UUID userId) {
        return ResponseEntity.ok(claimService.createClaim(itemId, userId));
       // this line is used to create a claim
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Claim> updateClaimStatus(@PathVariable UUID id, @RequestBody ClaimStatus status) {
        return ResponseEntity.ok(claimService.updateClaimStatus(id, status));
        // this line is used to update the claim status
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Claim>> getClaimsByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(claimService.getClaimsByUser(userId));
        // this line is used to return the list of claims by user
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<Long> countClaimsByUserAndStatus(@PathVariable UUID userId, @PathVariable ClaimStatus status) {
        return ResponseEntity.ok(claimService.countClaimsByUserAndStatus(userId, status));
    }
}