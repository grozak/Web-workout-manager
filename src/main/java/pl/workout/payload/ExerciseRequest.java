package pl.workout.payload;

import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class ExerciseRequest {

    @NotBlank
    private String category;

    @NotBlank
    private String name;

    @NotNull
    private Integer numberOfSeries;

    @Size(max = 15, min = 1, message = "invalid numberOfReiteration")
    private List<Integer> numberOfReiteration;

    @Size(max = 15, min = 1, message = "invalid weights")
    private List<Integer> weights;

    public ExerciseRequest() {}

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumberOfSeries() {
        return numberOfSeries;
    }

    public void setNumberOfSeries(Integer numberOfSeries) {
        this.numberOfSeries = numberOfSeries;
    }

    public List<Integer> getNumberOfReiteration() {
        return numberOfReiteration;
    }

    public void setNumberOfReiteration(List<Integer> numberOfReiteration) {
        this.numberOfReiteration = numberOfReiteration;
    }

    public List<Integer> getWeights() {
        return weights;
    }

    public void setWeights(List<Integer> weights) {
        this.weights = weights;
    }
}
