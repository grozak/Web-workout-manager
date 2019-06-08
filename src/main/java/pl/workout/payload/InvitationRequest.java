package pl.workout.payload;

import javax.validation.constraints.NotNull;

public class InvitationRequest {

    @NotNull
    private boolean isAccepted;

    public boolean getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(boolean accepted) {
        isAccepted = accepted;
    }
}
