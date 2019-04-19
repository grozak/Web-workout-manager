package pl.workout.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.workout.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
