// package com.example.travelplanner.controller;

// import com.example.travelplanner.entity.FavoritePlace;
// import com.example.travelplanner.service.FavoritePlaceService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/places")
// // @CrossOrigin
// public class FavoritePlaceController {

//     private final FavoritePlaceService placeService;

//     public FavoritePlaceController(FavoritePlaceService placeService) {
//         this.placeService = placeService;
//     }

//     @GetMapping("/{tripId}")
//     public List<FavoritePlace> getPlaces(@PathVariable Long tripId) {
//         return placeService.getPlaces(tripId);
//     }

//     @PostMapping("/{tripId}")
//     public FavoritePlace addPlace(
//             @PathVariable Long tripId,
//             @RequestParam String name,
//             @RequestParam(required = false) String notes
//     ) {
//         return placeService.addPlace(tripId, name, notes);
//     }

//     @PutMapping("/{placeId}/visited")
//     public FavoritePlace markVisited(
//             @PathVariable Long placeId,
//             @RequestParam boolean visited
//     ) {
//         return placeService.markVisited(placeId, visited);
//     }
// }



package com.example.travelplanner.controller;

import com.example.travelplanner.dto.FavoritePlaceRequest;
import com.example.travelplanner.entity.FavoritePlace;
import com.example.travelplanner.service.FavoritePlaceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class FavoritePlaceController {

    private final FavoritePlaceService service;

    public FavoritePlaceController(FavoritePlaceService service) {
        this.service = service;
    }

    // GET places
    @GetMapping("/{tripId}")
    public List<FavoritePlace> getPlaces(@PathVariable Long tripId) {
        return service.getPlaces(tripId);
    }

    // ADD place
    @PostMapping("/{tripId}")
    public FavoritePlace addPlace(
            @PathVariable Long tripId,
            @RequestBody FavoritePlaceRequest request
    ) {
        return service.addPlace(
                tripId,
                request.getPlaceName(),
                request.getNotes()
        );
    }

    // MARK visited / unvisited
    @PutMapping("/{placeId}/visited")
    public FavoritePlace markVisited(
            @PathVariable Long placeId,
            @RequestParam boolean visited
    ) {
        return service.markVisited(placeId, visited);
    }

    // DELETE place
    @DeleteMapping("/{placeId}")
    public void delete(@PathVariable Long placeId) {
        service.delete(placeId);
    }
}
