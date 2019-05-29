package pl.workout.payload;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class ExerciseRequest {

    @NotBlank
    private String category;

    @NotBlank
    private String name;

    @NotBlank
    private Integer numberOfSeries;

    @NotBlank
    private List<Integer> numberOfReiteration;

    @NotBlank
    private List<Integer> weights;

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
