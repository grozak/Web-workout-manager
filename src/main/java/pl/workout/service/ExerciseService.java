package pl.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.workout.model.Exercise;
import pl.workout.repository.ExerciseRepository;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public Exercise getExerciseById(int exerciseId){
        return exerciseRepository.findById(exerciseId).get();
    }

    public synchronized void createExercise(Exercise exercise){
        exerciseRepository.save(exercise);
    }

    public synchronized void updateExercise(Exercise exercise){
        exerciseRepository.save(exercise);
    }

    public void deleteExercise(int exerciseId){
        exerciseRepository.delete(getExerciseById(exerciseId));
    }
}
