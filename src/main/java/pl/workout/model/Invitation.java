//package pl.workout.model;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotNull;
//
//@Entity
//public class Invitation {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @NotNull
//    private User user1;
//
//    @NotNull
//    private User user2;
//
//    @NotNull
//    private Boolean isAccepted = false;
//
//    public Invitation(){}
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public User getUser1() {
//        return user1;
//    }
//
//    public void setUser1(User user1) {
//        this.user1 = user1;
//    }
//
//    public User getUser2() {
//        return user2;
//    }
//
//    public void setUser2(User user2) {
//        this.user2 = user2;
//    }
//
//    public Boolean getAccepted() {
//        return isAccepted;
//    }
//
//    public void setAccepted(Boolean accepted) {
//        isAccepted = accepted;
//    }
//}
