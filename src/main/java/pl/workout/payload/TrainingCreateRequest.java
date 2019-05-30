package pl.workout.payload;

import javax.validation.constraints.NotBlank;
import java.util.Date;

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
