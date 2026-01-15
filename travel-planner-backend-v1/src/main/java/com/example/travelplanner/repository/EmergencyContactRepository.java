package com.example.travelplanner.repository;

import com.example.travelplanner.entity.EmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmergencyContactRepository
        extends JpaRepository<EmergencyContact, Long> {

    List<EmergencyContact> findByCityIgnoreCase(String city);
}
