package pl.workout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.workout.repository.ExerciseRepository;

@RestController
public class ExerciseController {
    @Autowired
    private ExerciseRepository exerciseRepository;
}
