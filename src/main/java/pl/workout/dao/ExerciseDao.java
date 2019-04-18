package pl.workout.dao;

import pl.workout.model.Exercise;

public interface ExerciseDao {
    Exercise getExerciseById(int id);
    void addExercise(Exercise exercise);
    void updateExercise(Exercise exercise);
    void removeExercise(int id);
}
