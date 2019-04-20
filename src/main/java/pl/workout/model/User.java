package pl.workout.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer facebookId;
    @OneToMany
    private Set<User> friendList = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    @JsonManagedReference
    private List<Exercise> exerciseList = new ArrayList<>();

    public User(){
    }

    public User(int facebookId){
        this.facebookId = facebookId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFacebookId() {
        return facebookId;
    }

    public void setFacebookId(Integer facebookId) {
        this.facebookId = facebookId;
    }

    public Set<User> getFriendList() {
        return friendList;
    }

    public void setFriendList(Set<User> friendList) {
        this.friendList = friendList;
    }

    public List<Exercise> getExerciseList() {
        return exerciseList;
    }

    public void setExerciseList(List<Exercise> exerciseList) {
        this.exerciseList = exerciseList;
    }
}
