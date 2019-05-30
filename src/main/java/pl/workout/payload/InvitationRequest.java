package pl.workout.payload;

import javax.validation.constraints.NotNull;

public class InvitationRequest {

    @NotNull
    private boolean isAccepted;

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }
}
