package pl.workout.payload;

import javax.validation.constraints.NotEmpty;

public class InvitationRequest {

    @NotEmpty
    private boolean isAccepted;

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }
}
