package com.example.travelplanner.service;

import com.example.travelplanner.entity.EmergencyContact;
import com.example.travelplanner.repository.EmergencyContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmergencyContactService {

    private final EmergencyContactRepository repository;

    public EmergencyContactService(EmergencyContactRepository repository) {
        this.repository = repository;
    }

    // Add emergency contact (admin/static data)
    public EmergencyContact addContact(EmergencyContact contact) {
        return repository.save(contact);
    }

    // Get emergency contacts by city
    public List<EmergencyContact> getByCity(String city) {
        return repository.findByCityIgnoreCase(city);
    }
}
