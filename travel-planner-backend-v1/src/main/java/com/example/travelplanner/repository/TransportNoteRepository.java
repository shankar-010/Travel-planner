package com.example.travelplanner.repository;

import com.example.travelplanner.entity.TransportNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransportNoteRepository
        extends JpaRepository<TransportNote, Long> {

    List<TransportNote> findByTripId(Long tripId);
}
