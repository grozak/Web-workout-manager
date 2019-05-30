package pl.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.workout.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getById(Long id);

    Optional<User> getByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> getAllByFriendListIsNotContaining(User user);

    List<User> getAllByFriendListContaining(User user);
}
