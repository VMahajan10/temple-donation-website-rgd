package com.temple.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime; 
import java.util.UUID; 

@Entity 
@Table(name = "items")
@EntityListeners(AuditingEntityListener.class)

public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    // this line is used to set the id
    @Column(nullable = false)
    private String name;
    // this line is used to set the name
    @Column(columnDefinition = "TEXT")
    private String description;
    // this line is used to set the description
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    // this line is used to set the status
    private ItemStatus status = ItemStatus.AVAILABLE;
    // this line is used to set the status

    @Column(name = "image_url")
    private String imageUrl;
    // this line is used to set the image url
    @Column(name = "image_approved")
    private Boolean imageApproved;
    // this line is used to set the image approved
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "claimed_by")
    private User claimedBy;
    // this line is used to set the claimed by
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    // this line is used to set the created at
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    // this line is used to set the updated at

    public Item() {}

    public Item(String name, String description, User createdBy) {
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
    }

    public UUID getId() { return id; }
    // this line is used to get the id

    public void setId(UUID id) { this.id = id; }
    // this line is used to set the id

    public String getName() { return name; }
    // this line is used to get the name

    public void setName(String name) { this.name = name; }
    // this line is used to set the name

    public String getDescription() { return description; }
    // this line is used to get the description

    public void setDescription(String description) { this.description = description; }
    // this line is used to set the description

    public ItemStatus getStatus() { return status; }

    public void setStatus(ItemStatus status) { this.status = status; }
    // this line is used to set the status

    public String getImageUrl() { return imageUrl; }
    // this line is used to get the image url

    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    // this line is used to set the image url

    public Boolean getImageApproved() { return imageApproved; }
    // this line is used to get the image approved

    public void setImageApproved(Boolean imageApproved) { this.imageApproved = imageApproved; }
    // this line is used to set the image approved

    public User getCreatedBy() { return createdBy; }

    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public User getClaimedBy() { return claimedBy; }

    public void setClaimedBy(User claimedBy) { this.claimedBy = claimedBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
} 
