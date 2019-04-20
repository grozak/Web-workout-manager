package pl.workout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.workout.model.Exercise;
import pl.workout.model.User;
import pl.workout.service.ExerciseService;
import pl.workout.service.UserService;

import java.util.List;

@RestController
public class ExerciseController {
    @Autowired
    private UserService userService;

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/users/{userId}/exercises")
    public List<Exercise> getExerciseList(@PathVariable(value = "userId") Integer userId){
        return userService.getUserById(userId).getExerciseList();
    }

    @GetMapping("/users/{userId}/exercises/{exerciseId}")
    public Exercise getExercise(@PathVariable(value = "userId") Integer userId,
                                @PathVariable(value = "exerciseId") Integer exerciseId){
        return exerciseService.getExerciseById(exerciseId);
    }

    @PostMapping("/users/{userId}/exercises")
    public void addExercise(@PathVariable(value = "userId") Integer userId,
                            @RequestBody Exercise exercise){
        User user = userService.getUserById(userId);
        exercise.setUser(user);
        exerciseService.createExercise(exercise);
    }

    @DeleteMapping("/users/{userId}/exercises/{exerciseId}")
    public void deleteExercise(@PathVariable(value = "userId") Integer userId,
                               @PathVariable(value = "exerciseId") Integer exerciseId){
        exerciseService.deleteExercise(exerciseId);
    }

    @PutMapping("/users/{userId}/exercises/{exerciseId}")
    public void updateExercise(@PathVariable(value = "userId") Integer userId,
                              @PathVariable(value = "exerciseId") Integer exerciseId,
                              @RequestBody Exercise exerciseRequest){
        Exercise exercise = exerciseService.getExerciseById(exerciseId);
        exercise.setCategory(exerciseRequest.getCategory());
        exercise.setName(exerciseRequest.getName());
        exercise.setNumberOfSeries(exerciseRequest.getNumberOfSeries());
        exercise.setNumberOfReiteration(exerciseRequest.getNumberOfReiteration());
        exercise.setWeights(exerciseRequest.getWeights());
        exerciseService.updateExercise(exercise);
    }
}
