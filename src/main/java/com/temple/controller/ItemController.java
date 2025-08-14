package com.temple.controller;

import com.temple.dto.CreateItemRequest;
import com.temple.model.Item;
import com.temple.model.ItemStatus;
import com.temple.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
// this line is used to allow cross origin requests
public class ItemController {
    @Autowired
    private ItemService itemService; 
    // this line is used to inject the item service

    @GetMapping 
    public ResponseEntity<List<Item>> getAllItems()
    {
        return ResponseEntity.ok(itemService.getAllItems());
        // this line is used to get all the items
    }

    @GetMapping("/available")
    public ResponseEntity<List<Item>> getAvaliableApprovedItems()
    {
        return ResponseEntity.ok(itemService.getAvaliableApprovedItems());
        // this line is used to get all the available approved items
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable UUID id)
    {
        return ResponseEntity.ok(itemService.getItemById(id));
        // this line is used to get the item by id
    }

    @PostMapping 
    public ResponseEntity<Item> createItem(@RequestBody CreateItemRequest request)
    {
        Item item = itemService.createItem(request.getName(), request.getDescription(), request.getImageUrl(), request.getCreatedBy());
        return ResponseEntity.ok(item);
        // this line is used to create a new item
    }

    @PutMapping("/{id}/approve-image")
    public ResponseEntity<Item> approveItemImage(@PathVariable UUID id)
    {
        return ResponseEntity.ok(itemService.approveItemImage(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Item> updateItemStatus(@PathVariable UUID id, @RequestBody ItemStatus status)
    {
        return ResponseEntity.ok(itemService.updateItemStatus(id, status));
        // this line is used to update the item status
    }

}