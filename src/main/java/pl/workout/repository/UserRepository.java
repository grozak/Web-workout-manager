package pl.workout.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.workout.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> getById(Long id);

    Optional<User> getByEmail(String email);

    Boolean existsByEmail(String email);
}
