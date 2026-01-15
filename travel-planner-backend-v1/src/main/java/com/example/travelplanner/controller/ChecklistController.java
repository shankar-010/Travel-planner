package com.example.travelplanner.controller;

import com.example.travelplanner.entity.ChecklistItem;
import com.example.travelplanner.service.ChecklistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checklist")
// @CrossOrigin
public class ChecklistController {

    private final ChecklistService checklistService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    // Generate checklist
    @PostMapping("/generate/{tripId}")
    public List<ChecklistItem> generateChecklist(@PathVariable Long tripId) {
        return checklistService.generateChecklist(tripId);
    }

    // Get checklist by trip
    @GetMapping("/{tripId}")
    public List<ChecklistItem> getChecklist(@PathVariable Long tripId) {
        return checklistService.getChecklist(tripId);
    }

    // Mark item packed/unpacked
    @PutMapping("/{itemId}/packed")
    public ChecklistItem markPacked(
            @PathVariable Long itemId,
            @RequestParam boolean packed
    ) {
        return checklistService.updatePacked(itemId, packed);
    }
}
