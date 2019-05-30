package pl.workout.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.workout.model.Exercise;
import pl.workout.payload.ApiResponse;
import pl.workout.payload.ExerciseRequest;
import pl.workout.service.ExerciseService;
import pl.workout.service.TrainingService;
import pl.workout.utility.ResponseUtil;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/training/{id}")
public class ExerciseController {

    private ExerciseService exerciseService;
    private TrainingService trainingService;

    public ExerciseController(ExerciseService exerciseService, TrainingService trainingService) {
        this.exerciseService = exerciseService;
        this.trainingService = trainingService;
    }

    @GetMapping("/exercise/list")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Exercise>> getAllByTraining(@PathVariable("id") Long trainingId) {
        return ResponseUtil.wrapOrNotFound(Optional.of(exerciseService.getAllByTraining(trainingService.getById(trainingId))));
    }

    @GetMapping("/exercise/{eid}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Exercise> getById(@PathVariable("eid") Long id) {
        return ResponseUtil.wrapOrNotFound(Optional.of(exerciseService.getById(id)));
    }

    @PostMapping("/exercise")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createExercise(@PathVariable("id") Long trainingId, @Valid @RequestBody ExerciseRequest exerciseRequest) {
        Exercise exercise = exerciseService.createExercise(trainingService.getById(trainingId), exerciseRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/training/{id}/exercise/{eid}")
                .buildAndExpand(trainingId, exercise.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Exercise created."));
    }

    @PutMapping("/exercise/{eid}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateExercise(@PathVariable("eid") Long id, @Valid @RequestBody ExerciseRequest exerciseRequest) {
        exerciseService.updateExercise(id, exerciseRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Exercise updated."));
    }

    @DeleteMapping("/exercise/{eid}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteExercise(@PathVariable("eid") Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.ok(new ApiResponse(true, "Exercise deleted."));
    }
}
