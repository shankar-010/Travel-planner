
package com.example.travelplanner.controller;

import com.example.travelplanner.entity.TripDayPlan;
import com.example.travelplanner.service.TripTimelineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeline")
public class TripTimelineController {

    private final TripTimelineService service;

    public TripTimelineController(TripTimelineService service) {
        this.service = service;
    }

    // Generate timeline
    @PostMapping("/generate/{tripId}")
    public List<TripDayPlan> generate(@PathVariable Long tripId) {
        return service.generateTimeline(tripId);
    }

    // Get timeline
    @GetMapping("/{tripId}")
    public List<TripDayPlan> get(@PathVariable Long tripId) {
        return service.getTimeline(tripId);
    }

    // ✅ UPDATE DAY (NEW)
    @PutMapping("/day/{dayId}")
    public TripDayPlan updateDay(
            @PathVariable Long dayId,
            @RequestBody TripDayPlan updated
    ) {
        return service.updateDay(dayId, updated);
    }
}
