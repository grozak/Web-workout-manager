package pl.workout.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.workout.model.Invitation;
import pl.workout.payload.ApiResponse;
import pl.workout.payload.InvitationRequest;
import pl.workout.security.CurrentUser;
import pl.workout.security.UserPrincipal;
import pl.workout.service.InvitationService;
import pl.workout.service.UserService;
import pl.workout.utility.ResponseUtil;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class InvitationController {

    private InvitationService invitationService;
    private UserService userService;

    public InvitationController(InvitationService invitationService, UserService userService) {
        this.invitationService = invitationService;
        this.userService = userService;
    }

    @GetMapping("/invitation/list")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Invitation>> getAllPendingByUser(@CurrentUser UserPrincipal userPrincipal) {
        return ResponseUtil.wrapOrNotFound(Optional.of(invitationService.getAllPendingByUser(userService.getById(userPrincipal.getId()))));
    }

    @GetMapping("/invitation/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Invitation> getById(@PathVariable("id") Long id) {
        return ResponseUtil.wrapOrNotFound(Optional.of(invitationService.getById(id)));
    }

    @PostMapping("/invitation/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createInvitation(@CurrentUser UserPrincipal userPrincipal, @PathVariable("id") Long id) {
        Invitation invitation = invitationService.createInvitation(userService.getById(userPrincipal.getId()), userService.getById(id));

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/invitation/{id}")
                .buildAndExpand(invitation.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Invitation created."));
    }

    @PutMapping("/invitation/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> answerToInvitation(@PathVariable("id") Long id, @Valid @RequestBody InvitationRequest invitationRequest) {
        invitationService.answerToInvitation(id, invitationRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Invitation answered."));
    }

}
