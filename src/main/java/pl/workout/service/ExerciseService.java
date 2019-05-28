package pl.workout.service;

import org.springframework.stereotype.Service;
import pl.workout.repository.ExerciseRepository;

@Service
public class ExerciseService {

    private ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }
}
