package pl.workout.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.workout.model.Calendar;

import java.util.List;

@Repository
public interface CalendarRepository extends CrudRepository<Calendar, Integer> {
}
