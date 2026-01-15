package com.example.travelplanner.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "checklist_items")
public class ChecklistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private String category;
    private boolean packed;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    // ✅ REQUIRED: No-args constructor (JPA needs this)
    public ChecklistItem() {
    }

    // ✅ REQUIRED: Custom constructor (your service uses this)
public ChecklistItem(String itemName, String category, boolean packed, Trip trip) {
    this.itemName = itemName;
    this.category = category;
    this.packed = packed;
    this.trip = trip;
}


    // -------- GETTERS & SETTERS --------

    public Long getId() {
        return id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isPacked() {
        return packed;
    }

    public void setPacked(boolean packed) {
        this.packed = packed;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}
