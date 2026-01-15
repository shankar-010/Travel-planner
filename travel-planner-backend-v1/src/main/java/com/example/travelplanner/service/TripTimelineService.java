// package com.example.travelplanner.service;

// import com.example.travelplanner.entity.*;
// import com.example.travelplanner.repository.*;
// import org.springframework.stereotype.Service;

// import java.time.temporal.ChronoUnit;
// import java.util.*;

// @Service
// public class TripTimelineService {

//     private final TripRepository tripRepository;
//     private final TripDayPlanRepository dayPlanRepository;

//     public TripTimelineService(TripRepository tripRepository,
//                                TripDayPlanRepository dayPlanRepository) {
//         this.tripRepository = tripRepository;
//         this.dayPlanRepository = dayPlanRepository;
//     }

// public List<TripDayPlan> generateTimeline(Long tripId) {

//     Trip trip = tripRepository.findById(tripId)
//             .orElseThrow(() -> new RuntimeException("Trip not found"));

//     // ✅ CHECK IF TIMELINE ALREADY EXISTS
//     List<TripDayPlan> existingPlans =
//             dayPlanRepository.findByTripIdOrderByDayNumber(tripId);

//     if (!existingPlans.isEmpty()) {
//         return existingPlans; // prevent duplicates
//     }

//     long days = ChronoUnit.DAYS.between(
//             trip.getStartDate(),
//             trip.getEndDate()
//     ) + 1;

//     List<TripDayPlan> plans = new ArrayList<>();

//     for (int i = 1; i <= days; i++) {
//         TripDayPlan plan = new TripDayPlan();
//         plan.setDayNumber(i);
//         plan.setTitle("Day " + i);
//         plan.setDescription("Plan activities for day " + i);
//         plan.setTrip(trip);
//         plans.add(plan);
//     }

//     return dayPlanRepository.saveAll(plans);
// }

//     public List<TripDayPlan> getTimeline(Long tripId) {
//         return dayPlanRepository.findByTripIdOrderByDayNumber(tripId);
//     }
// }



// timeline up

package com.example.travelplanner.service;

import com.example.travelplanner.entity.*;
import com.example.travelplanner.repository.*;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class TripTimelineService {

    private final TripRepository tripRepository;
    private final TripDayPlanRepository dayPlanRepository;

    public TripTimelineService(
            TripRepository tripRepository,
            TripDayPlanRepository dayPlanRepository
    ) {
        this.tripRepository = tripRepository;
        this.dayPlanRepository = dayPlanRepository;
    }

    // Generate timeline
    public List<TripDayPlan> generateTimeline(Long tripId) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        // Prevent duplicate timeline
        List<TripDayPlan> existing =
                dayPlanRepository.findByTripIdOrderByDayNumber(tripId);

        if (!existing.isEmpty()) {
            return existing;
        }

        long days = ChronoUnit.DAYS.between(
                trip.getStartDate(),
                trip.getEndDate()
        ) + 1;

        List<TripDayPlan> plans = new ArrayList<>();

        for (int i = 1; i <= days; i++) {
            TripDayPlan plan = new TripDayPlan();
            plan.setDayNumber(i);
            plan.setTitle("Day " + i);
            plan.setDescription("Plan activities for day " + i);
            plan.setTrip(trip);
            plans.add(plan);
        }

        return dayPlanRepository.saveAll(plans);
    }

    // Get timeline
    public List<TripDayPlan> getTimeline(Long tripId) {
        return dayPlanRepository.findByTripIdOrderByDayNumber(tripId);
    }

    // ✅ UPDATE DAY (NEW)
    public TripDayPlan updateDay(Long dayId, TripDayPlan updated) {

        TripDayPlan existing = dayPlanRepository.findById(dayId)
                .orElseThrow(() -> new RuntimeException("Day not found"));

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());

        return dayPlanRepository.save(existing);
    }
}
