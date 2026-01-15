package com.example.travelplanner.service;

import com.example.travelplanner.dto.DashboardResponse;
import com.example.travelplanner.entity.ChecklistItem;
import com.example.travelplanner.entity.Trip;
import com.example.travelplanner.entity.TripDayPlan;
import com.example.travelplanner.repository.ChecklistItemRepository;
import com.example.travelplanner.repository.TripDayPlanRepository;
import com.example.travelplanner.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class DashboardService {

    private final TripRepository tripRepository;
    private final TripDayPlanRepository dayPlanRepository;
    private final ChecklistItemRepository checklistRepository;

    public DashboardService(
            TripRepository tripRepository,
            TripDayPlanRepository dayPlanRepository,
            ChecklistItemRepository checklistRepository
    ) {
        this.tripRepository = tripRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.checklistRepository = checklistRepository;
    }

    public DashboardResponse getDashboard() {

        Trip activeTrip = getActiveTrip();
        if (activeTrip == null) return null;

        DashboardResponse res = new DashboardResponse();

        res.tripId = activeTrip.getId();
        res.destination = activeTrip.getDestination();
        res.startDate = activeTrip.getStartDate();
        res.endDate = activeTrip.getEndDate();
        res.tripType = activeTrip.getTripType();

        LocalDate today = LocalDate.now();

        // STATUS
        if (today.isBefore(activeTrip.getStartDate())) {
            res.status = "UPCOMING";
            long days = ChronoUnit.DAYS.between(today, activeTrip.getStartDate());
            res.dayInfo = "Starts in " + days + " days";
        } else if (today.isAfter(activeTrip.getEndDate())) {
            res.status = "COMPLETED";
            res.dayInfo = "Trip completed 🎉";
        } else {
            res.status = "ONGOING";
            long dayNumber = ChronoUnit.DAYS.between(
                    activeTrip.getStartDate(), today
            ) + 1;
            long totalDays = ChronoUnit.DAYS.between(
                    activeTrip.getStartDate(),
                    activeTrip.getEndDate()
            ) + 1;
            res.dayInfo = "Day " + dayNumber + " of " + totalDays;

            // Today's plan
            List<TripDayPlan> plans =
                    dayPlanRepository.findByTripIdOrderByDayNumber(activeTrip.getId());
            plans.stream()
                    .filter(p -> p.getDayNumber() == dayNumber)
                    .findFirst()
                    .ifPresent(p -> res.todaysPlan = p.getDescription());
        }

        // Pending checklist (max 5)
        List<String> pending = checklistRepository
                .findByTripIdAndPackedFalse(activeTrip.getId())
                .stream()
                .limit(5)
                .map(ChecklistItem::getItemName)
                .toList();

        res.pendingChecklist = pending;

        return res;
    }

    private Trip getActiveTrip() {

        LocalDate today = LocalDate.now();

        // Ongoing first
        List<Trip> ongoing = tripRepository
                .findByStartDateLessThanEqualAndEndDateGreaterThanEqual(today, today);
        if (!ongoing.isEmpty()) return ongoing.get(0);

        // Else nearest upcoming
        List<Trip> upcoming = tripRepository
                .findByStartDateAfterOrderByStartDateAsc(today);
        if (!upcoming.isEmpty()) return upcoming.get(0);

        return null;
    }
}
