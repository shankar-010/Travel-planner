package com.example.travelplanner.repository;

import com.example.travelplanner.entity.TripDayPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripDayPlanRepository
        extends JpaRepository<TripDayPlan, Long> {

    List<TripDayPlan> findByTripIdOrderByDayNumber(Long tripId);
}
