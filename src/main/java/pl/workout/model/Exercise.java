package pl.workout.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(updatable = false)
    @Temporal(TemporalType.DATE)
    private java.util.Calendar calendarDate;
    private String category;
    private String name;
    private Integer numberOfSeries;
    private List<Integer> numberOfReiteration;
    private List<Integer> weights;

    public Exercise(){}

    public Exercise(String category, String name, Integer numberOfSeries, List<Integer> numberOfReiteration, List<Integer> weights) {
        this.category = category;
        this.calendarDate = java.util.Calendar.getInstance();
        this.name = name;
        this.numberOfSeries = numberOfSeries;
        this.numberOfReiteration = numberOfReiteration;
        this.weights = weights;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public java.util.Calendar getCalendarDate() {
        return calendarDate;
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
