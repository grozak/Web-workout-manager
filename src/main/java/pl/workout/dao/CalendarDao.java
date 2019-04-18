package pl.workout.dao;

import pl.workout.model.Calendar;

public interface CalendarDao {
    void addCalendar(Calendar calendar);
    void removeCalendar(int id);
    Calendar getCalendarById(int id);


}
