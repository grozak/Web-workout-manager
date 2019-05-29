package pl.workout.payload;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class TrainingCreateRequest {

    @NotBlank
    private Date date;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
