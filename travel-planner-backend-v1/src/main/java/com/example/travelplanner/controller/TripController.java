
package com.example.travelplanner.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.travelplanner.entity.Trip;
import com.example.travelplanner.service.TripService;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    // ✅ CREATE TRIP (logged-in user)
    @PostMapping
    public Trip createTrip(@RequestBody Trip trip) {
        return tripService.createTrip(trip);
    }

    // ✅ GET ONLY LOGGED-IN USER TRIPS
    @GetMapping
    public List<Trip> getMyTrips() {
        return tripService.getMyTrips();
    }

    // OPTIONAL (can keep)
    @GetMapping("/{id}")
    public Trip getTripById(@PathVariable Long id) {
        return tripService.getTripById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return "Trip deleted successfully";
    }
}
