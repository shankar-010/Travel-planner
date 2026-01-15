// package com.example.travelplanner.controller;

// import com.example.travelplanner.entity.TransportNote;
// import com.example.travelplanner.service.TransportNoteService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/transport")
// // @CrossOrigin
// public class TransportNoteController {

//     private final TransportNoteService service;

//     public TransportNoteController(TransportNoteService service) {
//         this.service = service;
//     }

//     @PostMapping("/{tripId}")
//     public TransportNote addNote(
//             @PathVariable Long tripId,
//             @RequestParam String type,
//             @RequestParam String details
//     ) {
//         return service.addNote(tripId, type, details);
//     }

//     @GetMapping("/{tripId}")
//     public List<TransportNote> getNotes(@PathVariable Long tripId) {
//         return service.getNotes(tripId);
//     }
// }


// up

package com.example.travelplanner.controller;

import com.example.travelplanner.dto.TransportNoteRequest;
import com.example.travelplanner.entity.TransportNote;
import com.example.travelplanner.service.TransportNoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transport")
public class TransportNoteController {

    private final TransportNoteService service;

    public TransportNoteController(TransportNoteService service) {
        this.service = service;
    }

    // ✅ ADD NOTE
    @PostMapping("/{tripId}")
    public TransportNote addNote(
            @PathVariable Long tripId,
            @RequestBody TransportNoteRequest request
    ) {
        return service.addNote(
                tripId,
                request.getTransportType(),
                request.getDetails()
        );
    }

    // ✅ GET NOTES
    @GetMapping("/{tripId}")
    public List<TransportNote> getNotes(@PathVariable Long tripId) {
        return service.getNotes(tripId);
    }

    // ✅ DELETE NOTE
    @DeleteMapping("/note/{noteId}")
    public void delete(@PathVariable Long noteId) {
        service.delete(noteId);
    }
}
