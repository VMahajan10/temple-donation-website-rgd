package com.temple.dto; 

import com.temple.model.User;

public class CreateItemRequest {
    private String name; 
    private String description; 
    private String imageUrl; 
    private User createdBy; 

    public String getName() {
        return name; 
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description; 
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImageUrl() {
        return imageUrl; 
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public User getCreatedBy() {
        return createdBy; 
    }
    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}