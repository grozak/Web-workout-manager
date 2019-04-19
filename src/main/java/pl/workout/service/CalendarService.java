package pl.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.workout.model.Calendar;
import pl.workout.repository.CalendarRepository;

@Service
public class CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    public Calendar getCalendarById(int calendarId){
        return calendarRepository.findById(calendarId).get();
    }

    public synchronized void createCalendar(Calendar calendar){
        calendarRepository.save(calendar);
    }

    public synchronized void updateCalendar(Calendar calendar){
        calendarRepository.save(calendar);
    }

    public void deleteCalendar(int calendarId){
        calendarRepository.delete(getCalendarById(calendarId));
    }
}
