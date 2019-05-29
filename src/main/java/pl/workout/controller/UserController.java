package pl.workout.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.workout.model.User;
import pl.workout.security.CurrentUser;
import pl.workout.security.UserPrincipal;
import pl.workout.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {  //TODO leaving this as a example

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getById(userPrincipal.getId());
    }
}
