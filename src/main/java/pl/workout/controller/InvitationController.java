//package pl.workout.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//import pl.workout.model.Invitation;
//import pl.workout.security.CurrentUser;
//import pl.workout.security.UserPrincipal;
//import pl.workout.service.InvitationService;
//import pl.workout.service.UserService;
//import pl.workout.utility.ResponseUtil;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api")
//public class InvitationController {
//
//    private InvitationService invitationService;
//    private UserService userService;
//
//    public InvitationController(InvitationService invitationService, UserService userService) {
//        this.invitationService = invitationService;
//        this.userService = userService;
//    }
//
//    @GetMapping("/invitation/list")
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<List<Invitation>> getAllByUser(@CurrentUser UserPrincipal userPrincipal) {
//        return ResponseUtil.wrapOrNotFound(Optional.of(invitationService.getAllByUser(userService.getById(userPrincipal.getId()))));
//    }
//
//    @GetMapping("/invitation/{id}")
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<Invitation> getById(@PathVariable("id") Long id) {
//        return ResponseUtil.wrapOrNotFound(Optional.of(invitationService.getById(id)));
//    }
//}
