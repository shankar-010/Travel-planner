package com.example.travelplanner.repository;

import com.example.travelplanner.entity.FavoritePlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritePlaceRepository extends JpaRepository<FavoritePlace, Long> {

    List<FavoritePlace> findByTripId(Long tripId);
}
