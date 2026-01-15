// package com.example.travelplanner.repository;

// import org.springframework.data.jpa.repository.JpaRepository;
// import com.example.travelplanner.entity.Trip;

// public interface TripRepository extends JpaRepository<Trip, Long> {


//     List<Trip> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(
//         LocalDate start,
//         LocalDate end
// );

// List<Trip> findByStartDateAfterOrderByStartDateAsc(LocalDate date);

// }



package com.example.travelplanner.repository;

import com.example.travelplanner.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

import com.example.travelplanner.entity.User;


public interface TripRepository extends JpaRepository<Trip, Long> {
List<Trip> findByUser(User user);

    List<Trip> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(
            LocalDate start,
            LocalDate end
    );

    List<Trip> findByStartDateAfterOrderByStartDateAsc(LocalDate date);
}
