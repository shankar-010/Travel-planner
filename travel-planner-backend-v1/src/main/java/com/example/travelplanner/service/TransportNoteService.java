// package com.example.travelplanner.service;

// import com.example.travelplanner.entity.TransportNote;
// import com.example.travelplanner.entity.Trip;
// import com.example.travelplanner.repository.TransportNoteRepository;
// import com.example.travelplanner.repository.TripRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class TransportNoteService {

//     private final TransportNoteRepository transportNoteRepository;
//     private final TripRepository tripRepository;

//     public TransportNoteService(TransportNoteRepository transportNoteRepository,
//                                 TripRepository tripRepository) {
//         this.transportNoteRepository = transportNoteRepository;
//         this.tripRepository = tripRepository;
//     }

//     public TransportNote addNote(Long tripId, String type, String details) {

//         Trip trip = tripRepository.findById(tripId)
//                 .orElseThrow(() -> new RuntimeException("Trip not found"));

//         TransportNote note = new TransportNote(type, details, trip);
//         return transportNoteRepository.save(note);
//     }

//     public List<TransportNote> getNotes(Long tripId) {
//         return transportNoteRepository.findByTripId(tripId);
//     }
// }


// up

package com.example.travelplanner.service;

import com.example.travelplanner.entity.TransportNote;
import com.example.travelplanner.entity.Trip;
import com.example.travelplanner.repository.TransportNoteRepository;
import com.example.travelplanner.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportNoteService {

    private final TransportNoteRepository transportNoteRepository;
    private final TripRepository tripRepository;

    public TransportNoteService(
            TransportNoteRepository transportNoteRepository,
            TripRepository tripRepository
    ) {
        this.transportNoteRepository = transportNoteRepository;
        this.tripRepository = tripRepository;
    }

    // ADD NOTE
    public TransportNote addNote(Long tripId, String type, String details) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        TransportNote note = new TransportNote(type, details, trip);
        return transportNoteRepository.save(note);
    }

    // GET NOTES
    public List<TransportNote> getNotes(Long tripId) {
        return transportNoteRepository.findByTripId(tripId);
    }

    // DELETE NOTE
    public void delete(Long noteId) {
        transportNoteRepository.deleteById(noteId);
    }
}
