package com.example.travelplanner.service;

import com.example.travelplanner.entity.ChecklistItem;
import com.example.travelplanner.entity.Trip;
import com.example.travelplanner.repository.ChecklistItemRepository;
import com.example.travelplanner.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChecklistService {

    private final TripRepository tripRepository;
    private final ChecklistItemRepository checklistItemRepository;

    // ✅ CONSTRUCTOR INJECTION (IMPORTANT)
    public ChecklistService(TripRepository tripRepository,
                            ChecklistItemRepository checklistItemRepository) {
        this.tripRepository = tripRepository;
        this.checklistItemRepository = checklistItemRepository;
    }

public List<ChecklistItem> generateChecklist(Long tripId) {

    Trip trip = tripRepository.findById(tripId)
            .orElseThrow(() -> new RuntimeException("Trip not found"));

    // Prevent duplicate checklist
    List<ChecklistItem> existing =
            checklistItemRepository.findByTripId(tripId);
    if (!existing.isEmpty()) {
        return existing;
    }

    List<ChecklistItem> items = new ArrayList<>();

    // 🔹 Common items
    items.add(new ChecklistItem("Clothes", "General", false, trip));
    items.add(new ChecklistItem("Toiletries", "General", false, trip));
    items.add(new ChecklistItem("Basic Medicines", "Health", false, trip));

    // 🔹 Rule-based items
String type = trip.getTripType() != null
        ? trip.getTripType().toLowerCase()
        : "";

    if (type.contains("beach")) {
        items.add(new ChecklistItem("Sunscreen", "Beach", false, trip));
        items.add(new ChecklistItem("Slippers", "Beach", false, trip));
        items.add(new ChecklistItem("Sunglasses", "Beach", false, trip));
    }

    if (type.contains("cold")) {
        items.add(new ChecklistItem("Jacket", "Cold", false, trip));
        items.add(new ChecklistItem("Gloves", "Cold", false, trip));
    }

    if (type.contains("international")) {
        items.add(new ChecklistItem("Passport", "Documents", false, trip));
        items.add(new ChecklistItem("Power Adapter", "Documents", false, trip));
    }

    return checklistItemRepository.saveAll(items);
}


    public List<ChecklistItem> getChecklist(Long tripId) {
        return checklistItemRepository.findByTripId(tripId);
    }

    public ChecklistItem updatePacked(Long itemId, boolean packed) {
        ChecklistItem item = checklistItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Checklist item not found"));

        item.setPacked(packed);
        return checklistItemRepository.save(item);
    }
}
