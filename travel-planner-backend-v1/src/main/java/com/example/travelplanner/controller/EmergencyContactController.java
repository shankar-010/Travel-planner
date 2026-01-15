package com.example.travelplanner.controller;

import com.example.travelplanner.entity.EmergencyContact;
import com.example.travelplanner.service.EmergencyContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
// @CrossOrigin
public class EmergencyContactController {

    private final EmergencyContactService service;

    public EmergencyContactController(EmergencyContactService service) {
        this.service = service;
    }

    // Add emergency contact
    @PostMapping
    public EmergencyContact add(@RequestBody EmergencyContact contact) {
        return service.addContact(contact);
    }

    // Get emergency contacts by city
    @GetMapping("/{city}")
    public List<EmergencyContact> getByCity(@PathVariable String city) {
        return service.getByCity(city);
    }
}
