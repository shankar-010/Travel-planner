package com.example.travelplanner.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "emergency_contacts")
public class EmergencyContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;
    private String serviceType; // POLICE / AMBULANCE / HOSPITAL
    private String contactInfo;

    // Constructors
    public EmergencyContact() {}

    public EmergencyContact(String city, String serviceType, String contactInfo) {
        this.city = city;
        this.serviceType = serviceType;
        this.contactInfo = contactInfo;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }
}
