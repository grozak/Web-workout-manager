package pl.workout.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.workout.model.Exercise;

@Repository
public interface ExerciseRepository extends CrudRepository<Exercise, Integer> {
}
