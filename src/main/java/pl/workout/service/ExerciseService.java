package pl.workout.service;

import org.springframework.stereotype.Service;
import pl.workout.model.Exercise;
import pl.workout.model.Training;
import pl.workout.payload.ExerciseRequest;
import pl.workout.repository.ExerciseRepository;

import java.util.List;

@Service
public class ExerciseService {

    private ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> getAllByTraining(Training training) {
        return exerciseRepository.getAllByTraining(training);
    }

    public Exercise getById(Long id) {
        return exerciseRepository.getById(id);
    }

    public Exercise createExercise(Training training, ExerciseRequest exerciseRequest) {
        return exerciseRepository.save(new Exercise(training, exerciseRequest.getCategory(), exerciseRequest.getName(), exerciseRequest.getNumberOfSeries(), exerciseRequest.getNumberOfReiteration(), exerciseRequest.getWeights()));
    }

    public Exercise updateExercise(Long id, ExerciseRequest exerciseRequest) {
        Exercise exercise = getById(id);
        exercise.setCategory(exerciseRequest.getCategory());
        exercise.setName(exerciseRequest.getName());
        exercise.setNumberOfSeries(exerciseRequest.getNumberOfSeries());
        exercise.setNumberOfReiteration(exerciseRequest.getNumberOfReiteration());
        exercise.setWeights(exerciseRequest.getWeights());
        return exerciseRepository.save(exercise);
    }

    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}
