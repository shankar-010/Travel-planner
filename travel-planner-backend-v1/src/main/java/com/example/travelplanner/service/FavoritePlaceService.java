// package com.example.travelplanner.service;

// import com.example.travelplanner.entity.FavoritePlace;
// import com.example.travelplanner.entity.Trip;
// import com.example.travelplanner.repository.FavoritePlaceRepository;
// import com.example.travelplanner.repository.TripRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class FavoritePlaceService {

//     private final FavoritePlaceRepository placeRepository;
//     private final TripRepository tripRepository;

//     public FavoritePlaceService(
//             FavoritePlaceRepository placeRepository,
//             TripRepository tripRepository
//     ) {
//         this.placeRepository = placeRepository;
//         this.tripRepository = tripRepository;
//     }

//     public List<FavoritePlace> getPlaces(Long tripId) {
//         return placeRepository.findByTripId(tripId);
//     }

//     public FavoritePlace addPlace(Long tripId, String name, String notes) {

//         Trip trip = tripRepository.findById(tripId)
//                 .orElseThrow(() -> new RuntimeException("Trip not found"));

//         FavoritePlace place = new FavoritePlace(
//                 name,
//                 notes,
//                 false,
//                 trip
//         );

//         return placeRepository.save(place);
//     }

//     public FavoritePlace markVisited(Long placeId, boolean visited) {

//         FavoritePlace place = placeRepository.findById(placeId)
//                 .orElseThrow(() -> new RuntimeException("Place not found"));

//         place.setVisited(visited);
//         return placeRepository.save(place);
//     }
// }




package com.example.travelplanner.service;

import com.example.travelplanner.entity.FavoritePlace;
import com.example.travelplanner.entity.Trip;
import com.example.travelplanner.repository.FavoritePlaceRepository;
import com.example.travelplanner.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritePlaceService {

    private final FavoritePlaceRepository placeRepository;
    private final TripRepository tripRepository;

    public FavoritePlaceService(
            FavoritePlaceRepository placeRepository,
            TripRepository tripRepository
    ) {
        this.placeRepository = placeRepository;
        this.tripRepository = tripRepository;
    }

    public List<FavoritePlace> getPlaces(Long tripId) {
        return placeRepository.findByTripId(tripId);
    }

    public FavoritePlace addPlace(Long tripId, String name, String notes) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        FavoritePlace place = new FavoritePlace(
                name,
                notes,
                false,
                trip
        );

        return placeRepository.save(place);
    }

    public FavoritePlace markVisited(Long placeId, boolean visited) {

        FavoritePlace place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Place not found"));

        place.setVisited(visited);
        return placeRepository.save(place);
    }

    public void delete(Long placeId) {
        placeRepository.deleteById(placeId);
    }
}
