package com.example.travelplanner.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "favorite_places")
public class FavoritePlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placeName;

    private String notes;

    private boolean visited;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    public FavoritePlace() {}

    public FavoritePlace(String placeName, String notes, boolean visited, Trip trip) {
        this.placeName = placeName;
        this.notes = notes;
        this.visited = visited;
        this.trip = trip;
    }

    public Long getId() {
        return id;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}
