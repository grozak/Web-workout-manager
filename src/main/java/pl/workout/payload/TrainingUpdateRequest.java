package pl.workout.payload;

import pl.workout.model.Exercise;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class TrainingUpdateRequest {

    @NotBlank
    private String date;

    @NotBlank
    private List<Exercise> exerciseList;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Exercise> getExerciseList() {
        return exerciseList;
    }

    public void setExerciseList(List<Exercise> exerciseList) {
        this.exerciseList = exerciseList;
    }
}
