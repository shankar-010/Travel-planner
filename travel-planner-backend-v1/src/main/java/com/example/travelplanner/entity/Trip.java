//     package com.example.travelplanner.entity;

// import jakarta.persistence.*;
// import java.time.LocalDate;

// @Entity
// public class Trip {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String destination;
//     private LocalDate startDate;
//     private LocalDate endDate;

//     @ManyToOne
//     @JoinColumn(name = "user_id", nullable = false)
//     private User user;

//     // Getters & Setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getDestination() {
//         return destination;
//     }

//     public void setDestination(String destination) {
//         this.destination = destination;
//     }

//     public LocalDate getStartDate() {
//         return startDate;
//     }

//     public void setStartDate(LocalDate startDate) {
//         this.startDate = startDate;
//     }

//     public LocalDate getEndDate() {
//         return endDate;
//     }

//     public void setEndDate(LocalDate endDate) {
//         this.endDate = endDate;
//     }

//     public String getTripType() {
//         return tripType;
//     }

//     public void setTripType(String tripType) {
//         this.tripType = tripType;
//     }
// }



package com.example.travelplanner.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private String tripType;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;


    // -------- GETTERS & SETTERS --------

    public Long getId() {
        return id;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    // ✅ tripType getter/setter
    public String getTripType() {
        return tripType;
    }

    public void setTripType(String tripType) {
        this.tripType = tripType;
    }

    // ✅ user getter/setter
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
