package pl.workout.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomePageController {

    @GetMapping("")
    public String getHomePage() {
        return "home";
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }

    @GetMapping("/signup")
    public String getSignUpPage() {
        return "signup";
    }

    @GetMapping("/calendar")
    public String getCalendarPage() {
        return "calendar";
    }

    @GetMapping("/user")
    public String getUserPage() {
        return "user";
    }

    @GetMapping("/calendar/{id}")
    public String getFriendPage() {
        return "friend_calendar";
    }
}
