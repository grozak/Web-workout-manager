package pl.workout.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.workout.model.Training;
import pl.workout.payload.ApiResponse;
import pl.workout.payload.TrainingCreateRequest;
import pl.workout.payload.TrainingUpdateRequest;
import pl.workout.security.CurrentUser;
import pl.workout.security.UserPrincipal;
import pl.workout.service.TrainingService;
import pl.workout.service.UserService;
import pl.workout.utility.ResponseUtil;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TrainingController {

    private TrainingService trainingService;
    private UserService userService;

    public TrainingController(TrainingService trainingService, UserService userService) {
        this.trainingService = trainingService;
        this.userService = userService;
    }

    @GetMapping("/training/list")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Training>> getAllByUser(@CurrentUser UserPrincipal userPrincipal) {
        return ResponseUtil.wrapOrNotFound(Optional.of(trainingService.getAllByUser(userService.getById(userPrincipal.getId()))));
    }

    @GetMapping("/training/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Training> getById(@PathVariable("id") Long id) {
        return ResponseUtil.wrapOrNotFound(Optional.of(trainingService.getById(id)));
    }

    @PostMapping("/training")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createTraining(@CurrentUser UserPrincipal userPrincipal, @Valid @RequestBody TrainingCreateRequest trainingCreateRequest) {
        Training training = trainingService.createTraining(userService.getById(userPrincipal.getId()), trainingCreateRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/training")
                .buildAndExpand(training.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Training created."));
    }

    @PutMapping("/training/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateTraining(@PathVariable("id") Long id, @Valid @RequestBody TrainingUpdateRequest trainingUpdateRequest) {
        trainingService.updateTraining(id, trainingUpdateRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Training updated."));
    }

    @DeleteMapping("/training/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteTraining(@PathVariable("id") Long id) {
        trainingService.deleteTraining(id);
        return ResponseEntity.ok(new ApiResponse(true, "Training deleted."));
    }

}
