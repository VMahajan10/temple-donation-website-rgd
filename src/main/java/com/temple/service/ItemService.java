package com.temple.service;

import com.temple.model.Item;
import com.temple.model.ItemStatus;
import com.temple.model.User;
import com.temple.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item createItem(String name, String description, String imageUrl, User createdBy)
    {
        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setImageUrl(imageUrl);
        item.setCreatedBy(createdBy);
        item.setStatus(ItemStatus.AVAILABLE);
        item.setImageApproved(false);

        return itemRepository.save(item);
        //TODO: add image approval logic
    }

    public List<Item> getAllItems()
    {
        return itemRepository.findAll();
    }

    public List<Item> getAvaliableApprovedItems()
    {
        return itemRepository.findByStatusAndImageApproved(ItemStatus.AVAILABLE, true);
    }
    public List<Item> getItemsByStatus(ItemStatus status)
    {
        return itemRepository.findByStatus(status);
    }

    public List<Item> getItemsByCreator(User creator)
    {
        return itemRepository.findByCreatedBy(creator);
    }

    public Item getItemById(UUID id)
    {
        return itemRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Item not found"));
    }
    public Item approveItemImage(UUID itemId)
    {
        Item item = itemRepository.findById(itemId)
        .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setImageApproved(true);
        return itemRepository.save(item);
        //TODO: add image approval logic
    }

    public Item updateItemStatus(UUID itemId, ItemStatus status)
    {
        Item item = itemRepository.findById(itemId)
        .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setStatus(status);
        return itemRepository.save(item);
        //TODO: add item status update logic
    }

    public Item claimItem(UUID itemId, User claimedBy)
    {
        Item item = itemRepository.findById(itemId)
        .orElseThrow(() -> new RuntimeException("Item is not available"));

        if(item.getStatus() != ItemStatus.AVAILABLE)
        {
            throw new RuntimeException("Item is not available");
        }

        item.setClaimedBy(claimedBy);
        item.setStatus(ItemStatus.CLAIMED);
        return itemRepository.save(item);
        //TODO: add item claim logic
    }

    public long countItemsByStatus(ItemStatus status){
        return itemRepository.countByStatus(status);
        //TODO: add item count logic
    }

}

    
