package pl.workout.payload;

import javax.validation.constraints.NotBlank;

public class InvitationRequest {

    @NotBlank
    private boolean isAccepted;

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }
}
