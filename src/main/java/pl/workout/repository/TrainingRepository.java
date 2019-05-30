package pl.workout.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.workout.model.Training;
import pl.workout.model.User;

import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
    List<Training> getAllByUser(User user);

    Training getById(Long id);

    @Query(value = "select t.user, count(t) from Training t group by t.user order by count(t) DESC")
    List<User> getMostActiveUsersWithoutLimit(Pageable pageable);

    default List<User> getMostActiveUsers(int count) {
        return getMostActiveUsersWithoutLimit(PageRequest.of(0, count));
    }

    Long countByUser(User user);
}
