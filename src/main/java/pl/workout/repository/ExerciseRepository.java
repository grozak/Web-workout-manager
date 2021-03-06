package pl.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.workout.model.Exercise;
import pl.workout.model.Training;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> getAllByTraining(Training training);

    Exercise getById(Long id);
}
