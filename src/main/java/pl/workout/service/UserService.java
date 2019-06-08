package pl.workout.service;

import org.springframework.stereotype.Service;
import pl.workout.exception.ResourceNotFoundException;
import pl.workout.model.User;
import pl.workout.payload.UserTrainingCount;
import pl.workout.repository.TrainingRepository;
import pl.workout.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;
    private TrainingRepository trainingRepository;

    public UserService(UserRepository userRepository, TrainingRepository trainingRepository) {
        this.userRepository = userRepository;
        this.trainingRepository = trainingRepository;
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
        List<User> notFriendsList =  userRepository.getAllByFriendListIsNotContaining(getById(id));
        notFriendsList.remove(getById(id));
        return notFriendsList;
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

//    public List<UserTrainingCount> getMostActiveUsers(int count) {
//        List<User> mostActiveUsers = trainingRepository.getMostActiveUsers(count);
//        List<UserTrainingCount> result = new ArrayList<>();
//        mostActiveUsers.forEach(user -> result.add(new UserTrainingCount(user, trainingRepository.countByUser(user))));
//        return result;
//    }

    public List<UserTrainingCount> getMostActiveUsers(int count) {
        List<User> users = userRepository.findAll();
        List<UserTrainingCount> results = new ArrayList<>();
        for (User user: users) {
            results.add(new UserTrainingCount(user, trainingRepository.countByUser(user)));
        }
        results.sort((UserTrainingCount utc1, UserTrainingCount utc2) -> utc2.getTrainingCount().compareTo(utc1.getTrainingCount()));
        return results.stream().limit(count).collect(Collectors.toList());
    }
}
