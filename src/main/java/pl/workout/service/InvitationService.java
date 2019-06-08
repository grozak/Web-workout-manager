package pl.workout.service;

import org.springframework.stereotype.Service;
import pl.workout.model.Invitation;
import pl.workout.model.User;
import pl.workout.payload.InvitationRequest;
import pl.workout.repository.InvitationRepository;
import pl.workout.repository.UserRepository;

import java.util.List;

@Service
public class InvitationService {

    private InvitationRepository invitationRepository;

    private UserRepository userRepository;

    public InvitationService(InvitationRepository invitationRepository, UserRepository userRepository) {
        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
    }

    public List<Invitation> getAllInvitationsByUser(User user) {
        return invitationRepository.getAllByUser1AndIsAcceptedFalse(user);
    }

    public List<Invitation> getAllPendingByUser(User user) {
        return invitationRepository.getAllByUser2AndIsAcceptedFalse(user);
    }

    public Invitation getById(Long id) {
        return invitationRepository.getById(id);
    }

    public Invitation createInvitation(User user1, User user2) {
        return invitationRepository.save(new Invitation(user1, user2, false));
    }

    public Invitation answerToInvitation(Long id, InvitationRequest invitationRequest) {
        Invitation invitation = getById(id);

        if(invitationRequest.getIsAccepted()) {
            invitation.setAccepted(true);
            User user1 = invitation.getUser1();
            User user2 = invitation.getUser2();
            user1.getFriendList().add(user2);
            user2.getFriendList().add(user1);
            userRepository.save(user1);
            userRepository.save(user2);
            return invitation;
        } else {
            invitationRepository.delete(invitation);
            return null;
        }
    }
}
