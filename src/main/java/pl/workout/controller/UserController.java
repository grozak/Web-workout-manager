package pl.workout.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.workout.payload.ApiResponse;
import pl.workout.security.CurrentUser;
import pl.workout.security.UserPrincipal;
import pl.workout.service.UserService;
import pl.workout.utility.ResponseUtil;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUserById(@CurrentUser UserPrincipal userPrincipal, @PathVariable("id") Long friendId) {
        if(userService.isFriend(userPrincipal.getId(), friendId)){
            return ResponseUtil.wrapOrNotFound(Optional.of(userService.getById(friendId)));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse(false, "This is not your friend :("));
    }
}
