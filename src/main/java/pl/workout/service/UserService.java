package pl.workout.service;

import org.springframework.stereotype.Service;
import pl.workout.model.User;
import pl.workout.repository.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long userId){
        return userRepository.findById(userId).get();
    }

    public synchronized User createUser(User user){
        return userRepository.save(user);
    }

    public synchronized User updateUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(Long userId){
        userRepository.delete(getUserById(userId));
    }
}
