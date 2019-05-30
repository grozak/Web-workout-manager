package pl.workout.service;

import org.springframework.stereotype.Service;
import pl.workout.model.Invitation;
import pl.workout.model.User;
import pl.workout.repository.InvitationRepository;

import java.util.List;

@Service
public class InvitationService {

    private InvitationRepository invitationRepository;

    public InvitationService(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    public List<Invitation> getAllByUser(User user) {
        return invitationRepository.getAllByUser2(user);
    }

    public Invitation getById(Long id) {
        return invitationRepository.getById(id);
    }
}
