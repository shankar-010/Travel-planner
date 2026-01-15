package com.example.travelplanner.repository;

import com.example.travelplanner.entity.ChecklistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChecklistItemRepository
        extends JpaRepository<ChecklistItem, Long> {

    List<ChecklistItem> findByTripId(Long tripId);
    List<ChecklistItem> findByTripIdAndPackedFalse(Long tripId);

}
