package pl.workout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.workout.model.User;
import pl.workout.service.UserService;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public Iterable<User> getAllUsers(){
        userService.createUser(new User());
        return userService.getAllUsers();
    }

    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable(value = "userId") Integer userId){
        return userService.getUserById(userId);
    }

    @PostMapping("/users/{facebookId}")
    public User createUser(@PathVariable(value = "facebookId") Integer facebookId){
        return userService.createUser(new User(facebookId));
    }

    @PutMapping("/users")
    public void updateUser(@RequestBody User user){
        userService.updateUser(user);
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable(value = "userId") Integer userId){
        userService.deleteUser(userId);
    }
}
