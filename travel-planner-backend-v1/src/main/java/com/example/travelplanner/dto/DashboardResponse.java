package com.example.travelplanner.dto;

import java.time.LocalDate;
import java.util.List;

public class DashboardResponse {

    // Trip info
    public Long tripId;
    public String destination;
    public LocalDate startDate;
    public LocalDate endDate;
    public String tripType;
    public String status;

    // Countdown / day info
    public String dayInfo; // "Day 2 of 5" or "Starts in 3 days"

    // Today's plan
    public String todaysPlan;

    // Pending checklist
    public List<String> pendingChecklist;
}
