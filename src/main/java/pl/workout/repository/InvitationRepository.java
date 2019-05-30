package pl.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.workout.model.Invitation;
import pl.workout.model.User;

import java.util.List;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    List<Invitation> getAllByUser2AndIsAcceptedFalse(User user);

    Invitation getById(Long id);
}
