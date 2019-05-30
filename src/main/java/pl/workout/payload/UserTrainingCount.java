package pl.workout.payload;

import pl.workout.model.User;

import javax.validation.constraints.NotNull;

public class UserTrainingCount {

    @NotNull
    private User user;

    @NotNull
    private Long trainingCount;

    public UserTrainingCount(User user, Long trainingCount) {
        this.user = user;
        this.trainingCount = trainingCount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getTrainingCount() {
        return trainingCount;
    }

    public void setTrainingCount(Long trainingCount) {
        this.trainingCount = trainingCount;
    }
}
