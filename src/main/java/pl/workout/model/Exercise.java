package pl.workout.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "training_id", referencedColumnName = "id")
    @JsonBackReference
    private Training training;

    @NotNull
    private String category;

    @NotNull
    private String name;

    @NotNull
    private Integer numberOfSeries;

    @NotNull
    @ElementCollection
    private List<Integer> numberOfReiteration;

    @NotNull
    @ElementCollection
    private List<Integer> weights;

    public Exercise(){}

    public Exercise(@NotNull Training training, @NotNull String category, @NotNull String name, @NotNull Integer numberOfSeries, @NotNull List<Integer> numberOfReiteration, @NotNull List<Integer> weights) {
        this.training = training;
        this.category = category;
        this.name = name;
        this.numberOfSeries = numberOfSeries;
        this.numberOfReiteration = numberOfReiteration;
        this.weights = weights;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Training getTraining() {
        return training;
    }

    public void setTraining(Training training) {
        this.training = training;
    }

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
