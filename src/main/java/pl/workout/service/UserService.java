package pl.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.workout.model.User;
import pl.workout.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(int userId){
        return userRepository.findById(userId).get();
    }

    public synchronized User createUser(User user){
        return userRepository.save(user);
    }

    public synchronized User updateUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(int userId){
        userRepository.delete(getUserById(userId));
    }
}
