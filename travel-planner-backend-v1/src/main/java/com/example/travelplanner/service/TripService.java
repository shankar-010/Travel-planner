// package com.example.travelplanner.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.example.travelplanner.entity.Trip;
// import com.example.travelplanner.repository.TripRepository;

// import org.springframework.security.core.context.SecurityContextHolder;
// import com.example.travelplanner.entity.User;
// import com.example.travelplanner.repository.UserRepository;


// @Service
// public class TripService {

//     private final TripRepository tripRepository;
// private final UserRepository userRepository;


//     public TripService(TripRepository tripRepository) {
//         this.tripRepository = tripRepository;
//         this.userRepository = userRepository;
//     }
//     public Trip createTrip(Trip trip) {

//     String email = SecurityContextHolder
//             .getContext()
//             .getAuthentication()
//             .getName();

//     User user = userRepository
//             .findByEmail(email)
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     trip.setUser(user);

//     return tripRepository.save(trip);
// }

// public List<Trip> getMyTrips() {

//     String email = SecurityContextHolder
//             .getContext()
//             .getAuthentication()
//             .getName();

//     User user = userRepository
//             .findByEmail(email)
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     return tripRepository.findByUser(user);
// }


//     public Trip saveTrip(Trip trip) {
//         return tripRepository.save(trip);
//     }

//     public List<Trip> getAllTrips() {
//         return tripRepository.findAll();
//     }
//     public Trip getTripById(Long id) {
//     return tripRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("Trip not found"));
// }
// public void deleteTrip(Long id) {
//     tripRepository.deleteById(id);
// }


// }



package com.example.travelplanner.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.travelplanner.entity.Trip;
import com.example.travelplanner.entity.User;
import com.example.travelplanner.repository.TripRepository;
import com.example.travelplanner.repository.UserRepository;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;

    // ✅ FIXED CONSTRUCTOR
    public TripService(TripRepository tripRepository, UserRepository userRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

    // CREATE TRIP (USER BASED)
    public Trip createTrip(Trip trip) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        trip.setUser(user);
        return tripRepository.save(trip);
    }

    // GET ONLY LOGGED-IN USER TRIPS
    public List<Trip> getMyTrips() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return tripRepository.findByUser(user);
    }

    // OPTIONAL (you can remove later)
    public Trip getTripById(Long id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}
