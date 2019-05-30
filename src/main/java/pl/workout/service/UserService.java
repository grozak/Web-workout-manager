package pl.workout.service;

import org.springframework.stereotype.Service;
import pl.workout.exception.ResourceNotFoundException;
import pl.workout.model.User;
import pl.workout.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getById(Long id) {
        return userRepository.getById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    public boolean isFriend(Long id, Long friendId) {
        User user = getById(id);
        User friend = getById(friendId);
        return user.getFriendList().contains(friend);
    }

    public List<User> getAllNotFriendsById(Long id) {
        return userRepository.getAllByFriendListIsNotContaining(getById(id));
    }

    public List<User> getAllFriendsById(Long id) {
        return userRepository.getAllByFriendListContaining(getById(id));
    }

    public void deleteUserFromFriendList(Long id, Long friendId) {
        User user = getById(id);
        User friend = getById(friendId);
        user.getFriendList().remove(friend);
        friend.getFriendList().remove(user);
        userRepository.save(user);
        userRepository.save(friend);
    }
}
