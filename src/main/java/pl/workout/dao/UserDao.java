package pl.workout.dao;

import pl.workout.model.Calendar;
import pl.workout.model.User;

import java.util.Collection;

public interface UserDao {
    void addUser(User user);
    void removeUser(User user);
    User getUserById(int id);

    Collection<User> getFriendList(int id);
    void addToFriendList(int id, User friend);
    void removeFromFriendList(int id, int friendId);

    Calendar getCalendar(int id);
}
