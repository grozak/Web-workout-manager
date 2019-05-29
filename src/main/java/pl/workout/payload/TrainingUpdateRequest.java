package pl.workout.payload;

import pl.workout.model.Exercise;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

public class TrainingUpdateRequest {

    @NotBlank
    private Date date;

    @NotBlank
    private List<Exercise> exerciseList;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Exercise> getExerciseList() {
        return exerciseList;
    }

    public void setExerciseList(List<Exercise> exerciseList) {
        this.exerciseList = exerciseList;
    }
}
