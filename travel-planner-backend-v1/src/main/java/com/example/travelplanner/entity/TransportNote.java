package com.example.travelplanner.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "transport_notes")
public class TransportNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transportType; // FLIGHT / TRAIN / BUS
    private String details;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    // ---- Constructors ----
    public TransportNote() {}

    public TransportNote(String transportType, String details, Trip trip) {
        this.transportType = transportType;
        this.details = details;
        this.trip = trip;
    }

    // ---- Getters & Setters ----
    public Long getId() {
        return id;
    }

    public String getTransportType() {
        return transportType;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}
