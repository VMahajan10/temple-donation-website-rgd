package com.temple.repository;

import com.temple.model.Item;
import com.temple.model.ItemStatus;
import com.temple.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findByStatus(ItemStatus status);
    // this line is used to find the items by status

    List<Item> findByCreatedBy(User createdBy);
    // this line is used to find the items by created by

    List<Item> findByClaimedBy(User claimedBy);
    // this line is used to find the items by claimed by

    List<Item> findByImageApproved(Boolean imageApproved);
    // this line is used to find the items by image approved

    @Query("SELECT i FROM Item i WHERE i.status = :status AND i.imageApproved = true")
    List<Item> findApprovedItemsByStatus(@Param("status") ItemStatus status);
    // this line is used to find the items by status and image approved
    @Query("SELECT i FROM Item i WHERE i.status = 'AVAILABLE' AND i.imageApproved = true")
    List<Item> findAvaliableApprovedItems();
    // this line is used to find the items by status and image approved

    @Query("SELECT i FROM Item i WHERE i.createdBy = :user AND i.imageApproved = :approved")
    List<Item> findByCreatedByAndImageApproved(@Param("user") User user, @Param("approved") Boolean approved);
    // this line is used to find the items by created by and image approved

    @Query("SELECT COUNT(i) FROM Item i WHERE i.status = :status")
    long countByStatus(@Param("status") ItemStatus status);
    // this line is used to count the items by status
    List<Item> findByStatusAndImageApproved(ItemStatus status, boolean imageApproved);
    
   
}