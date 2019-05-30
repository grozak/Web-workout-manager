package pl.workout.payload;

import javax.validation.constraints.NotBlank;

public class TrainingCreateRequest {

    @NotBlank
    private String date;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
